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
  showResult();
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

// ----- Feature 3: show the person their result -----
const resultBox = document.getElementById("result");
const matchingTimeText = document.getElementById("matching-time");
const clashingTimeText = document.getElementById("clashing-time");
const gapText = document.getElementById("gap-time");
const correctText = document.getElementById("correct-count");
const sentenceText = document.getElementById("result-sentence");
const againButton = document.getElementById("again-button");

// Works out the average of a list of times. Gives back 0 for an empty list.
function average(times) {
  if (times.length === 0) {
    return 0;
  }
  let total = 0;
  for (const time of times) {
    total = total + time;
  }
  return Math.round(total / times.length);
}

// Turns the list of answers into the numbers we show.
// Only right answers count towards the average times.
function summarise(list) {
  const matchingTimes = [];
  const clashingTimes = [];
  let correctCount = 0;
  for (const result of list) {
    if (result.correct) {
      correctCount = correctCount + 1;
      if (result.matching) {
        matchingTimes.push(result.time);
      } else {
        clashingTimes.push(result.time);
      }
    }
  }
  const matching = average(matchingTimes);
  const clashing = average(clashingTimes);
  return {
    matching: matching,
    clashing: clashing,
    gap: clashing - matching,
    correct: correctCount,
    total: list.length,
    enough: matchingTimes.length > 0 && clashingTimes.length > 0
  };
}

// One plain sentence about the gap.
function resultSentence(summary) {
  if (!summary.enough) {
    return "You got too few words right to compare. Try again, and tap the colour of the ink.";
  }
  if (summary.gap > 50) {
    return "You were slower when the word and the ink clashed. This is the Stroop effect: reading the word gets in the way of naming the ink.";
  }
  if (summary.gap < -50) {
    return "You were faster on the clashing words this time. With only " + summary.total + " words, one slow tap can change the result.";
  }
  return "Your times were about the same for both kinds of word. With only " + summary.total + " words, a small gap can come from chance.";
}

// Puts the result on the screen. It is not saved or sent anywhere.
function showResult() {
  const summary = summarise(results);
  if (summary.enough) {
    matchingTimeText.textContent = summary.matching + " ms";
    clashingTimeText.textContent = summary.clashing + " ms";
    gapText.textContent = summary.gap + " ms";
  } else {
    // Too few right answers to compare, so show a dash, not a made-up number.
    matchingTimeText.textContent = "-";
    clashingTimeText.textContent = "-";
    gapText.textContent = "-";
  }
  correctText.textContent = summary.correct + " of " + summary.total;
  sentenceText.textContent = resultSentence(summary);
  resultBox.hidden = false;
}

againButton.addEventListener("click", startTest);

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
  resultBox.hidden = true;
  trialBox.hidden = false;
  showTrial();
}

startButton.addEventListener("click", startTest);
