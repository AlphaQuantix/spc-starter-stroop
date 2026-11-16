// Stroop test
// This file makes the test work.
// The guides in the "guide" folder tell you what to add, and where.

// ----- The colours -----
// "name" is the word we show.
// "code" is the colour code the browser uses to paint the ink.
const COLOURS = [
  { name: "RED", code: "#c62828" },
  { name: "BLUE", code: "#1565c0" },
  { name: "GREEN", code: "#2e7d32" },
  { name: "PURPLE", code: "#6a1b9a" }
];

// How many words of each kind the test shows.
const MATCHING_WORDS = 6; // the word and its ink are the same colour
const CLASHING_WORDS = 6; // the word and its ink are different colours

// ----- Parts of the page -----
const intro = document.getElementById("intro");
const startButton = document.getElementById("start-button");
const message = document.getElementById("message");

// FEATURE 1 - PART A GOES HERE

// FEATURE 2 - PART A GOES HERE

// FEATURE 3 - PART A GOES HERE

// STRETCH - PART A GOES HERE

// ----- Start -----
// This runs when someone taps Start.
function startTest() {
  message.textContent = "The test is not built yet. Open the guide folder to build it.";
}

startButton.addEventListener("click", startTest);
