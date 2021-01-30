"use strict";

// Variable definition
const startButton = document.querySelector(".btn-start");
const startMenu = document.querySelector(".start-menu");
const dashBoard = document.querySelector(".game");
const dice = document.querySelector(".dice");
const btns = document.querySelectorAll(".btn");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const resetBtn = document.querySelector(".btn-reset");
const scores = document.querySelectorAll(".total-score");
const scoreCounters = document.querySelectorAll(".score-counter");

// Start Menu
const pressStart = startButton.addEventListener("click", function () {
	startMenu.classList.add("hidden");
	dashBoard.classList.remove("hidden");
});

// Sounds
// Function handling sound
const playSound = function () {
	const sound = new Audio("sounds/button_sound.mp3");
	sound.play();
};

// Checking for clicks
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", playSound);
}

let diceRoll, currentScore, playerScore1, playerScore2, playing;
let currentPlayer = 1;

// Starting game
const gameStart = function () {
	dice.classList.add("hidden");
	document.querySelector(`.player-${currentPlayer}`).classList.remove("winner");
	document.querySelector(`.player-${currentPlayer}`).classList.remove("active");
	for (let i = 0; i < scores.length; i++) {
		scores[i].textContent = 0;
		scoreCounters[i].textContent = 0;
	}
	currentScore = 0;
	playerScore1 = 0;
	playerScore2 = 0;
	playing = true;
	diceRoll = 0;
	currentPlayer = 1;
	document.querySelector(`.player-${currentPlayer}`).classList.add("active");
};
gameStart();

// Swapping players
const playerSwap = function () {
	currentScore = 0;
	document.querySelector(`.player-${currentPlayer}`).classList.remove("active");
	currentPlayer = currentPlayer === 1 ? 2 : 1;
	document.querySelector(`.player-${currentPlayer}`).classList.add("active");
};

// Rolling dice
const roll = function () {
	if (playing) {
		// Generating dice roll
		diceRoll = Math.trunc(Math.random() * 6) + 1;

		// Displaying dice
		dice.classList.remove("hidden");
		dice.src = `images/dice-${diceRoll}.png`;

		// Adding dice rolls to current score
		currentScore += diceRoll;
		document.querySelector(
			`.score-counter-${currentPlayer}`
		).textContent = currentScore;

		// Checking if current player rolled a 1
		if (diceRoll === 1) {
			document.querySelector(`.score-counter-${currentPlayer}`).textContent = 0;
			playerSwap();
		}
	}
};
rollBtn.addEventListener("click", roll);

const addPoints = function (playerScore) {
	document.querySelector(
		`.total-score-${currentPlayer}`
	).textContent = playerScore;
};

// Holding dice
const hold = function () {
	if (playing) {
		// Adding current score to total score
		if (currentPlayer === 1) {
			playerScore1 += currentScore;
			scores[0].textContent = playerScore1;
		} else {
			playerScore2 += currentScore;
			scores[1].textContent = playerScore2;
		}

		//Check if score >= 100
		if (playerScore1 >= 100 || playerScore2 >= 100) {
			playing = false;
			document
				.querySelector(`.player-${currentPlayer}`)
				.classList.toggle("winner");
			document
				.querySelector(`.player-${currentPlayer}`)
				.classList.remove("active");
			document.querySelector(`.score-counter-${currentPlayer}`).textContent = 0;
			dice.classList.add("hidden");
		} else {
			// Switch player
			document.querySelector(`.score-counter-${currentPlayer}`).textContent = 0;
			playerSwap();
		}
	}
};
holdBtn.addEventListener("click", hold);

// Resetting Game
resetBtn.addEventListener("click", gameStart);

// About
document.querySelector(".btn-about").addEventListener("click", function () {
	document.querySelector(".about").classList.remove("hidden");
	document.querySelector(".overlay").classList.remove("hidden");
});
document
	.querySelector(".btn-close-about")
	.addEventListener("click", function () {
		document.querySelector(".about").classList.add("hidden");
		document.querySelector(".overlay").classList.add("hidden");
	});

// Keystoke handling
document.addEventListener("keydown", function (event) {
	console.log(event.key.toLowerCase());
	switch (event.key.toLowerCase()) {
		case "d":
			roll();
			playSound();
			break;
		case "f":
			hold();
			playSound();
			break;
		case "r":
			gameStart();
			playSound();
			break;
		default:
			console.log(event.key);
			break;
	}
});
