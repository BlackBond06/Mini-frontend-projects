"use strict";

/* Select all elements from the DOM */
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const previewImg = document.querySelector(".player--0--img");
const fileInputs = document.querySelectorAll(".input");
const defaultScore = 0;
/* Game set to starting conditions on page load */

document.addEventListener("DOMContentLoaded", () => {
  score0El.textContent = defaultScore;
  score1El.textContent = defaultScore;
  diceEl.classList.add("hidden");
});

/* Each player selects image*/
const loadImage = (e) => {
  let id = e.target.id;
  let file = e.target.files[0];
  e.target.setAttribute("hidden", true);
  if (!file) return;
  let img = document.getElementById("cta--img");
  let img1 = document.getElementById("cta--img1");
  id === "input1"
    ? (img.src = URL.createObjectURL(file))
    : (img1.src = URL.createObjectURL(file));
};

fileInputs.forEach((input) => {
  input.addEventListener("change", loadImage);
});

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent =
    defaultScore;
  currentScore = defaultScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

/* Rolling dice functionality */
btnRoll.addEventListener("click", () => {
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    /* display dice */
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomDice}.png`;

    /* check if player rolled 1 */
    if (randomDice !== 1) {
      /* add dice to current score */
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      /* switch player */
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // Add score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player score >= 100

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", ()=>{
  diceEl.classList.add("hidden");
  score0El.textContent = defaultScore;
  score1El.textContent = defaultScore;
  scores = [0, 0];
  console.log(scores[activePlayer], activePlayer);
})



// console.log(activePlayer, currentScore);
