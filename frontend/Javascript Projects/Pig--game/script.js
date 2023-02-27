/* Select all elements from the DOM */

const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const player1Score = document.getElementById("score--0");
const player2Score = document.getElementById("score--1");
const defaultScore = 0;
const dice = document.querySelector(".dice");
const player1CurrentScore = document.getElementById("current--0");

let scores = [];


/* Set game initial state  on page load*/
document.addEventListener("DOMContentLoaded", ()=>{
    player1Score.textContent = defaultScore;
    player2Score.textContent = defaultScore;  
    dice.style.display = "none";
})
/* Reset game to initial state */
newGame.addEventListener("click", ()=>{
    player1Score.textContent = defaultScore;
    player2Score.textContent = defaultScore; 
    player1CurrentScore.textContent = defaultScore;
    dice.style.display = "none";
});

/* Begin game by rolling dice. player 1 starts the game */
rollDice.addEventListener("click", ()=>{
    const randomDice = Math.trunc(Math.random()* 6) + 1;
    dice.style.display = "block";
    dice.src = `dice-${randomDice}.png`;
    player1Score.textContent = randomDice;
    player1CurrentScore.textContent = randomDice;
    scores.push(randomDice);
    const playerScore = scores.reduce((a, b)=> a + b, 0);
    player1CurrentScore.textContent = playerScore;
    // if(player1Score === 1){
    //     player2Score.textContent = defaultScore;  
    // }
})