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

// ----- Feature 1: show the colour-word trials -----
const trialBox = document.getElementById("trial");
const progressText = document.getElementById("progress");
const wordText = document.getElementById("word");
const colourButtons = document.querySelectorAll(".colour-button");

let trials = []; // the list of words for this go
let current = 0; // which word we are on (0 is the first)

// Mixes a list into a random order (the Fisher-Yates shuffle).
function shuffle(list) {
  for (let i = list.length - 1; i > 0; i = i - 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = list[i];
    list[i] = list[j];
    list[j] = swap;
  }
  return list;
}

// Gives back the colour code for a colour name. For "RED" it gives "#c62828".
function codeFor(name) {
  for (const colour of COLOURS) {
    if (colour.name === name) {
      return colour.code;
    }
  }
  return "#000000";
}

// Makes the list of words: some matching, some clashing.
function makeTrials() {
  const list = [];
  for (let i = 0; i < MATCHING_WORDS; i = i + 1) {
    const colour = COLOURS[i % COLOURS.length];
    list.push({ word: colour.name, ink: colour.name, matching: true });
  }
  for (let i = 0; i < CLASHING_WORDS; i = i + 1) {
    const wordColour = COLOURS[i % COLOURS.length];
    // Move 1, 2 or 3 places along the list, so the ink is never the word's own colour.
    const step = 1 + Math.floor(Math.random() * (COLOURS.length - 1));
    const inkColour = COLOURS[(i + step) % COLOURS.length];
    list.push({ word: wordColour.name, ink: inkColour.name, matching: false });
  }
  return list;
}

// Shows the word we are on.
function showTrial() {
  const trial = trials[current];
  progressText.textContent = "Word " + (current + 1) + " of " + trials.length;
  wordText.textContent = trial.word;
  wordText.style.color = codeFor(trial.ink);
  // Start the clock now, when this word appears.
  shownAt = performance.now();
}

// Runs when someone taps a colour button.
function answer(chosen) {
  if (trialBox.hidden) {
    return; // the test is not running, so ignore the tap
  }
  const trial = trials[current];
  const time = Math.round(performance.now() - shownAt);
  // Right means the tap matches the INK colour, not the word.
  const correct = chosen === trial.ink;
  results.push({ matching: trial.matching, time: time, correct: correct });
  let rightOrWrong = "wrong";
  if (correct) {
    rightOrWrong = "right";
  }
  lastAnswerText.textContent = "Last answer: " + time + " ms, " + rightOrWrong;
  current = current + 1;
  if (current < trials.length) {
    showTrial();
  } else {
    finish();
  }
}

// Runs after the last word.
function finish() {
  trialBox.hidden = true;
  // FEATURE 3 - PART C replaces this line and the next two.
  intro.hidden = false;
  message.textContent = "You did all " + trials.length + " words. Feature 3 will show your result here.";
}

// Make each colour button call answer() with its own colour.
for (const button of colourButtons) {
  button.addEventListener("click", function () {
    answer(button.dataset.colour);
  });
}

// ----- Feature 2: time each answer -----
const lastAnswerText = document.getElementById("last-answer");

let results = []; // one entry for each answer: matching or not, time, right or wrong
let shownAt = 0; // the moment the word we are on appeared

// FEATURE 3 - PART A GOES HERE

// STRETCH - PART A GOES HERE

// ----- Start -----
// This runs when someone taps Start.
function startTest() {
  trials = shuffle(makeTrials());
  current = 0;
  results = [];
  lastAnswerText.textContent = "";
  message.textContent = "";
  intro.hidden = true;
  // FEATURE 3 - PART B GOES HERE
  trialBox.hidden = false;
  showTrial();
}

startButton.addEventListener("click", startTest);
