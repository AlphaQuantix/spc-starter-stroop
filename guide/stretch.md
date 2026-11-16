# Stretch: Add a practice round

**Time:** about 30 minutes for a pair. Do this only after features 1, 2 and 3 are done.

## What you will build

Real Stroop tests start with a few practice words. They let the person learn the buttons before the timing counts.
You will add three practice words before the real 12.
The line above each practice word says "Practice 1 of 3 (not counted)".
The practice answers are **not** counted in the result.

## Before you start

- Features 1, 2 and 3 are done and live.
- All the changes are in **script.js**. You will make one commit.
- Go to the main page of your repository. Click **script.js**, then the **pencil icon** ("Edit this file").

## Step 1: Say how many practice words

1. Find this line near the top (press Ctrl+F, or Cmd+F on a Mac, inside the editor):

   ```js
   const CLASHING_WORDS = 6; // the word and its ink are different colours
   ```

2. Select the whole line and delete it. In the same place, paste these two lines. The first one is the line you deleted. The second one is new.

   ```js
   const CLASHING_WORDS = 6; // the word and its ink are different colours
   const PRACTICE_WORDS = 3; // practice words at the start, not counted
   ```

## Step 2: Add the practice code (part A)

1. Find this line:

   ```js
   // STRETCH - PART A GOES HERE
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
   // ----- Stretch: a practice round -----
   // Makes the practice words. Each one is marked "practice", so the result skips it.
   function makePractice() {
     const list = shuffle(makeTrials()).slice(0, PRACTICE_WORDS);
     for (const trial of list) {
       trial.practice = true;
     }
     return list;
   }

   // The line above the word, like "Practice 1 of 3 (not counted)" or "Word 1 of 12".
   function progressLabel() {
     if (current < PRACTICE_WORDS) {
       return "Practice " + (current + 1) + " of " + PRACTICE_WORDS + " (not counted)";
     }
     return "Word " + (current + 1 - PRACTICE_WORDS) + " of " + (trials.length - PRACTICE_WORDS);
   }
   ```

`makePractice()` makes a fresh, mixed list and keeps the first three.
`.slice(0, PRACTICE_WORDS)` means "take items 0, 1 and 2".

## Step 3: Put the practice words first

1. Find this line. It is inside `function startTest()`:

   ```js
     trials = shuffle(makeTrials());
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
     trials = makePractice().concat(shuffle(makeTrials()));
   ```

`.concat(...)` joins two lists. The three practice words come first, then the real 12 in a random order.

## Step 4: Show "Practice" above the practice words

1. Find this line. It is inside `function showTrial()`:

   ```js
     progressText.textContent = "Word " + (current + 1) + " of " + trials.length;
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
     progressText.textContent = progressLabel();
   ```

## Step 5: Leave practice answers out of the result

1. Find this line. It is inside `function answer(chosen)`:

   ```js
     results.push({ matching: trial.matching, time: time, correct: correct });
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
     // Practice words are not counted.
     if (!trial.practice) {
       results.push({ matching: trial.matching, time: time, correct: correct });
     }
   ```

`!trial.practice` means "this is not a practice word". Only real words go into `results`, so only real words reach the result box.

## Step 6: Commit script.js

1. Click the green **Commit changes...** button.
2. In **Commit message**, delete the text that is there and type:

   ```text
   Stretch: add a practice round
   ```

3. Click **Commit changes**.

## Step 7: Check it is done

1. Wait for the green tick in the **Actions** tab. Open your site and refresh it (Ctrl+Shift+R, or Cmd+Shift+R on a Mac).
2. Tap **Start**. The first word should say "Practice 1 of 3 (not counted)" above it.
3. Answer the three practice words **wrong on purpose**.
4. The next word should say "Word 1 of 12". Answer all 12 by tapping the ink colour.
5. In the result box, "Right answers" should say **12 of 12**. The three wrong practice answers are not counted.

**The stretch is done when** three practice words come before the real 12, and they are not counted in the result.

## Watch out

The practice answers still show "Last answer: ... ms" under the buttons. That is fine. It helps the person learn. They are only left out of `results`, so they never reach the result box. And, as before, nothing is saved or sent.

Back: [Feature 3](03-feature-3.md) · [README](../README.md)
