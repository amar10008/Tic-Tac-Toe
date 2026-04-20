let boxes = document.querySelectorAll(".box");
let turn = 'X';
let isgameover = false;

// change turn
const changeTurn = () => {
	return turn === 'X' ? 'O' : 'X';
};

// check win
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

			boxtext[e[0]].classList.add("win");
			boxtext[e[1]].classList.add("win");
			boxtext[e[2]].classList.add("win");

			document.querySelector('.info').innerText =
				boxtext[e[0]].innerText + " Won";

			isgameover = true;

			document.getElementById("winMessage").innerText =
				"Player " + boxtext[e[0]].innerText + " Wins!";

			document.getElementById("winModal").style.display = "flex";
		}
	});
};

// game logic
boxes.forEach(box => {
	let boxtext = box.querySelector('.boxtext');

	box.addEventListener('click', () => {
		if (boxtext.innerText === "" && !isgameover) {

			let current = turn;

			boxtext.innerText = current;
			boxtext.classList.add(current === "X" ? "x" : "o");

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

// reset
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

// play again
document.getElementById("playAgain").addEventListener("click", () => {
	document.getElementById("reset").click();
});

// draw
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