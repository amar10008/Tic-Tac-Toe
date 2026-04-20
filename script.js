let boxes = document.querySelectorAll(".box");

let music = new Audio('music/music.mp3');
let audioTurn = new Audio('music/ting.mp3');
let gameover = new Audio('music/gameov.mp3');

let turn = 'X';
let isgameover = false;

/* ---------- Background Music ---------- */

// start on load (may be blocked by browser)
window.addEventListener("load", () => {
	music.loop = true;
	music.volume = 0.3;
	music.play().catch(() => {});
});

// fallback: first click
document.addEventListener("click", () => {
	music.play().catch(() => {});
}, { once: true });

// pause/resume when tab changes
document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		music.pause();
	} else {
		if (!isMuted) music.play().catch(() => {});
	}
});

/* ---------- Mute Button ---------- */

let isMuted = false;
let muteBtn = document.getElementById("mute");

if (muteBtn) {
	muteBtn.addEventListener("click", () => {
		isMuted = !isMuted;

		music.muted = isMuted;
		audioTurn.muted = isMuted;
		gameover.muted = isMuted;

		muteBtn.innerText = isMuted ? "Unmute" : "Mute";
	});
}

/* ---------- Turn Change ---------- */

const changeTurn = () => {
	return turn === 'X' ? 'O' : 'X';
};

/* ---------- Win Check ---------- */

const checkWin = () => {
	let boxtext = document.getElementsByClassName('boxtext');

	let wins = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	wins.forEach(e => {
		if (
			boxtext[e[0]].innerText !== "" &&
			boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
			boxtext[e[1]].innerText === boxtext[e[2]].innerText
		) {
			// highlight
			boxtext[e[0]].classList.add("win");
			boxtext[e[1]].classList.add("win");
			boxtext[e[2]].classList.add("win");

			document.querySelector('.info').innerText =
				boxtext[e[0]].innerText + " Won";

			isgameover = true;

			gameover.play();

			document.getElementById("winMessage").innerText =
				"Player " + boxtext[e[0]].innerText + " Wins!";

			document.getElementById("winModal").style.display = "flex";
		}
	});
};

/* ---------- Game Logic ---------- */

boxes.forEach(box => {
	let boxtext = box.querySelector('.boxtext');

	box.addEventListener('click', () => {
		if (boxtext.innerText === "" && !isgameover) {

			let current = turn;

			boxtext.innerText = current;
			boxtext.classList.add(current === "X" ? "x" : "o");

			audioTurn.play();

			turn = changeTurn();
			checkWin();

			if (!isgameover) {
				document.querySelector('.info').innerText =
					"Turn for " + turn;
				checkDraw();
			}
		}
	});
});

/* ---------- Reset ---------- */

document.getElementById("reset").addEventListener("click", () => {
	let texts = document.querySelectorAll(".boxtext");

	texts.forEach(e => {
		e.innerText = "";
		e.classList.remove("x", "o", "win");
	});

	turn = "X";
	isgameover = false;

	document.querySelector('.info').innerText = "Turn for X";
	document.getElementById("winModal").style.display = "none";
});

/* ---------- Play Again ---------- */

document.getElementById("playAgain").addEventListener("click", () => {
	document.getElementById("reset").click();
});

/* ---------- Draw ---------- */

const checkDraw = () => {
	let boxtext = document.getElementsByClassName('boxtext');

	let draw = Array.from(boxtext).every(
		box => box.innerText !== ""
	);

	if (draw && !isgameover) {
		document.getElementById("winMessage").innerText = "It's a Draw!";
		document.getElementById("winModal").style.display = "flex";
		isgameover = true;
	}
};
