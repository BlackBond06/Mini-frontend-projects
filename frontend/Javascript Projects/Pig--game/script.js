/* Select all elements from the DOM */

const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const player1Score = document.getElementById("score--0");
const player2Score = document.getElementById("score--1");
const defaultScore = 0;
const dice = document.querySelector(".dice");


/* Set game to starting point */
newGame.addEventListener("click", ()=>{
    player1Score.textContent = defaultScore;
    player2Score.textContent = defaultScore;  
    dice.style.display = "none";
});

rollDice.addEventListener("click", ()=>{
    const randomDice = Math.trunc(Math.random()* 5) + 1;
    console.log(randomDice);
    dice.style.display = "block";
    dice.src = `dice-${randomDice}.png`
})