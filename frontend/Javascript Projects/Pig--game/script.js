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
const closeModalButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const displayWinner = document.getElementById("displayWinner");
let img = document.getElementById("cta--img");
let img1 = document.getElementById("cta--img1");

const imageDataURL = localStorage.getItem("player--1");
const imageDataURL1 = localStorage.getItem("player--2");
if (imageDataURL && imageDataURL1) {
  // If there is, set the src attribute of the image to the data URL
  img.src = imageDataURL;
  img1.src = imageDataURL1;
  
}

/* Game set to starting conditions on page load */

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
  init();
});

/* Each player selects image*/
const loadImage = (e) => {
  let id = e.target.id;
  let file = e.target.files[0];
  e.target.setAttribute("hidden", true);
  const fr = new FileReader();
  fr.readAsDataURL(file);
  fr.addEventListener("load", ()=>{
    const url = fr.result;
    if(id === "input1"){
      img.src = url;
      localStorage.setItem("player--1", url);
    }else{
      img1.src = url;
      localStorage.setItem("player--2", url);
    }
    
  })
 
  
};

fileInputs.forEach((input) => {
  input.addEventListener("change", loadImage);
});

let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [defaultScore, defaultScore];
  currentScore = defaultScore;
  activePlayer = defaultScore;
  playing = true;
  score0El.textContent = defaultScore;
  score1El.textContent = defaultScore;
  current0El.textContent = defaultScore;
  current1El.textContent = defaultScore;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

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
      setTimeout(() => {
        modal.style.display = "block";
        displayWinner.textContent = `Player ${activePlayer + 1} Wins!`;
      }, 1000);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
document.addEventListener("DOMContentLoaded", () => {
  init();
  // loadImage;
});
