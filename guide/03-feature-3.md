# Feature 3: Show the person their result

**Time:** about 40 minutes for a pair.

## What you will build

After the last word, the page shows a result box with:

- the average time for **matching** words,
- the average time for **clashing** words,
- the **gap** between them (clashing minus matching),
- how many answers were right,
- one plain sentence about the gap.

Most people are slower on clashing words. This is the Stroop effect. Reading the word gets in the way of naming the ink.

The result shows **on the screen only**. The page keeps nothing. When the person closes the page, the result is gone.

## Before you start

- Features 1 and 2 are done and live.
- Swap jobs again.
- You will change two files, **index.html** and **script.js**, and make one commit for each.

## Step 1: Add the result box to the page

1. Go to the main page of your repository. Click **index.html**, then the **pencil icon** ("Edit this file").
2. Find this line (press Ctrl+F, or Cmd+F on a Mac, inside the editor):

   ```html
       <!-- FEATURE 3 - THE RESULT BOX GOES HERE -->
   ```

3. Select the whole line and delete it. In the same place, paste this code:

   ```html
       <section id="result" hidden>
         <h2>Your result</h2>
         <p>Matching words, average time: <strong id="matching-time"></strong></p>
         <p>Clashing words, average time: <strong id="clashing-time"></strong></p>
         <p>The gap (clashing minus matching): <strong id="gap-time"></strong></p>
         <p>Right answers: <strong id="correct-count"></strong></p>
         <p id="result-sentence"></p>
         <p class="small">The average times count right answers only. "ms" means milliseconds: 1000 ms is one second. This page keeps nothing. When you close it, your result is gone.</p>
         <button id="again-button" class="big-button" type="button">Try again</button>
       </section>
   ```

## Step 2: Commit index.html

1. Click the green **Commit changes...** button.
2. In **Commit message**, delete the text that is there and type:

   ```text
   Feature 3: add the result box
   ```

3. Click **Commit changes**.

## Step 3: Add the code that works out the result (part A)

1. Go back to the main page of your repository. Click **script.js**, then the **pencil icon**.
2. Find this line:

   ```js
   // FEATURE 3 - PART A GOES HERE
   ```

3. Select the whole line and delete it. In the same place, paste this code:

   ```js
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
   ```

What this does: `summarise()` sorts the right answers into two lists, matching and clashing.
`average()` works out the mean of each list.
The gap is clashing minus matching. A gap above 50 ms counts as "slower" in the sentence.
If the person got no matching words right, or no clashing words right, there is nothing to compare. Then `showResult()` shows a dash (-) instead of the times.

## Step 4: Hide the result box at each start (part B)

1. Find this line. It is inside `function startTest()`:

   ```js
     // FEATURE 3 - PART B GOES HERE
   ```

2. Select the whole line and delete it. In the same place, paste this code:

   ```js
     resultBox.hidden = true;
   ```

## Step 5: Show the result after the last word (part C)

1. Find these three lines. They are inside `function finish()`:

   ```js
     // FEATURE 3 - PART C replaces this line and the next two.
     intro.hidden = false;
     message.textContent = "You did all " + trials.length + " words. Feature 3 will show your result here.";
   ```

2. Select all three lines and delete them. Do not delete the line above them, `trialBox.hidden = true;`. In the same place, paste this code:

   ```js
     showResult();
   ```

`finish()` should now have two lines inside it: `trialBox.hidden = true;` and `showResult();`.

## Step 6: Commit script.js

1. Click **Commit changes...**.
2. In **Commit message**, type:

   ```text
   Feature 3: show the person their result
   ```

3. Click **Commit changes**.

## Step 7: Check it is done

1. Wait for the green tick in the **Actions** tab. Then open your site and refresh it (Ctrl+Shift+R, or Cmd+Shift+R on a Mac).
2. Tap **Start** and answer all 12 words. Tap the **ink** colour each time.
3. After the last word, the result box shows. Check it has: the matching average, the clashing average, the gap, the number right, and one sentence.
4. Check the sum: clashing minus matching should equal the gap.
5. Tap **Try again**. The test starts again from word 1.
6. Now check that the page keeps nothing. Close the tab and open the site again. You should see the start screen, with no old result.

**Feature 3 is done when** after the last word the page shows the average time for matching and for clashing words, the gap, and one plain sentence about it.

## Watch out

**Trap: saving or sending the result.** It is tempting to add code that saves results "to see them later", or sends them to a sheet or a form. Do not. This test must keep nothing about the people who try it. That means:

- no `localStorage` or `sessionStorage`,
- no cookies,
- no `fetch` or form that sends data to a server,
- no analytics or tracking scripts.

The result lives only in the page while it is open. If your project needs to collect data from real people, that is a research study. It needs consent and an ethics check first. Talk to your mentor.

## If something goes wrong

- **No result box after the last word.** Check that `showResult();` is inside `function finish()`, and that you made both commits.
- **The times show a dash (-).** The person got no right answers for matching words, or none for clashing words, so there is nothing to compare. The sentence will say so. Try again and tap the ink colour.
- **Try again does nothing.** Check that the HTML button has `id="again-button"`.

Back: [Feature 2](02-feature-2.md) · Next: [Stretch: add a practice round](stretch.md)
