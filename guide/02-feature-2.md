# Feature 2: Time each answer

**Time:** about 30 minutes for a pair.

## What you will build

Each tap on a colour button now does two things.
It records how long the person took, in milliseconds.
It records whether the answer was right.
Then the next word shows, as before.
Under the buttons, a short line shows the last answer, like "Last answer: 734 ms, right".

A millisecond (ms) is one thousandth of a second. So 1000 ms is one second.

## Before you start

- Feature 1 is done and live.
- Swap jobs: the person who read the guide last time now types.
- All the changes are in one file, **script.js**. You will make one commit.

## Step 1: Open script.js

1. Go to the main page of your repository on github.com.
2. Click **script.js**, then the **pencil icon** ("Edit this file") at the top right.

## Step 2: Add the timing variables (part A)

1. Find this line (press Ctrl+F, or Cmd+F on a Mac, inside the editor):

   ```js
   // FEATURE 2 - PART A GOES HERE
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
   // ----- Feature 2: time each answer -----
   const lastAnswerText = document.getElementById("last-answer");

   let results = []; // one entry for each answer: matching or not, time, right or wrong
   let shownAt = 0; // the moment the word we are on appeared
   ```

## Step 3: Start the clock when each word appears (part B)

1. Find this line. It is inside `function showTrial()`:

   ```js
     // FEATURE 2 - PART B GOES HERE
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
     // Start the clock now, when this word appears.
     shownAt = performance.now();
   ```

`performance.now()` gives the time in milliseconds, very precisely.
We note it the moment the word shows.

## Step 4: Stop the clock and check the answer (part C)

1. Find this line. It is inside `function answer(chosen)`:

   ```js
     // FEATURE 2 - PART C GOES HERE
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
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
   ```

The time is "now" minus the moment the word appeared.
`Math.round` turns it into a whole number of milliseconds.
`results.push(...)` adds one entry to the list for this answer.

## Step 5: Empty the list at each start (part D)

1. Find this line. It is inside `function startTest()`:

   ```js
     // FEATURE 2 - PART D GOES HERE
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
     results = [];
     lastAnswerText.textContent = "";
   ```

This clears the last go, so a new go starts with an empty list.

## Step 6: Commit script.js

1. Click the green **Commit changes...** button at the top right.
2. In **Commit message**, delete the text that is there and type:

   ```text
   Feature 2: time each answer
   ```

3. Leave **Commit directly to the main branch** selected, and click **Commit changes**.

## Step 7: Check it is done

1. Click the **Actions** tab. Wait for a green tick on the top "pages build and deployment" run.
2. Open your site and refresh it (Ctrl+Shift+R, or Cmd+Shift+R on a Mac).
3. Tap **Start**. Tap the button for the **ink** colour. Under the buttons you should see "Last answer: ... ms, right".
4. On the next word, tap a wrong colour on purpose. You should see "wrong".
5. On a clashing word, tap the colour that the **word** says, not the ink. You should see "wrong".
6. Wait about five seconds before you tap a word. The time should be about 5000 ms. Then tap the next one fast. The time should be much smaller.

**Feature 2 is done when** each word has four colour buttons, a tap records the time in milliseconds and whether the answer was right, and then the next word shows.

## Watch out

**Trap 1: starting the clock in the wrong place.** If you set the start time once, when the page loads, every time gets bigger and bigger. The fifth word would include the time spent on the first four. The clock must restart each time a word appears. That is why `shownAt = performance.now();` goes inside `showTrial()`. Check 6 in Step 7 catches this trap.

**Trap 2: checking against the word.** The line `const correct = chosen === trial.ink;` compares the tap with the **ink**. If you write `trial.word` there instead, a clashing word is marked right when the person reads the word. That turns the test upside down. Check 5 in Step 7 catches this trap.

## If something goes wrong

- **"Last answer" never shows.** Check that part C is inside `function answer(chosen)`, and that you deleted the marker line.
- **Every time is 0 ms, or huge.** Check that part B is inside `function showTrial()`, not at the top of the file.
- **The page stops after one word.** Press F12, click **Console**, and read the red message. It names the line with the problem. Look for a missing `)` or `}`.

Back: [Feature 1](01-feature-1.md) · Next: [Feature 3: Show the person their result](03-feature-3.md)
