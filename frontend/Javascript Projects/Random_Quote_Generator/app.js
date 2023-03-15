const newQuoteBtn = document.querySelector("#new-quote");
const bodyEl = document.getElementById("body");
const linkEl = document.getElementById("tweet-quote");
const tumblrEl = document.getElementById("tumblr-quote");
const newQuote = document.getElementById("new-quote");
const quote = document.getElementById("text");
const author = document.getElementById("author");

const colorGroup = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

let quoteArray;

const fetchRandomQuotes = async () => {
  const url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
  const response = await fetch(url);
  try {
    const quotes = await response.json();
    quoteArray =[...quotes.quotes];
  } catch (error) {
    console.log(error.message);
  }

  const randomQuote = Math.trunc(Math.random() * quoteArray.length) + 1;
  quote.textContent = quoteArray[randomQuote].quote;
  author.textContent = quoteArray[randomQuote].author;
};



const getRandomQuotes = () => {
  const getRandomColors = Math.trunc(Math.random() * colorGroup.length) + 1;
  bodyEl.style.backgroundColor = colorGroup[getRandomColors];
  bodyEl.style.color = colorGroup[getRandomColors];
  linkEl.style.backgroundColor = colorGroup[getRandomColors];
  tumblrEl.style.backgroundColor = colorGroup[getRandomColors];
  newQuote.style.backgroundColor = colorGroup[getRandomColors];
  fetchRandomQuotes();
};
newQuoteBtn.addEventListener("click", getRandomQuotes);

