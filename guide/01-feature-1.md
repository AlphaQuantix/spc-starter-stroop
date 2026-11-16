# Feature 1: Show the colour-word trials

**Time:** about 40 minutes for a pair.

## What you will build

When someone taps **Start**, the page shows 12 colour words, one at a time.
Each word is painted in a colour of ink.
In six words, the word and the ink match (RED in red ink).
In six words, they clash (RED in blue ink).
The order is random, so it is different each time.
Under each word are four colour buttons. A tap on any button shows the next word.

Feature 2 will time the taps. Feature 3 will show the result. This feature only shows the words.

## Before you start

- You have made your own copy of this repository and turned on GitHub Pages. The [README](../README.md) shows how.
- Work as a pair. One person types. The other reads this guide out loud and checks each step. Swap jobs for the next feature.
- Use a laptop or desktop for editing. The GitHub editor is hard to use on a phone.

**How to copy code from this guide.** Each grey code box has a small **Copy** button (two squares) at its top right. It shows when you move your mouse over the box. Click it, then paste with Ctrl+V (Cmd+V on a Mac).

**How to find a line in a file.** Click anywhere inside the editor. Press Ctrl+F (Cmd+F on a Mac). A search box opens. Type a few words from the line. The editor jumps to it.

## Step 1: Add the trial box to the page

The trial box is the part of the page that holds the word and the four buttons.

1. Go to the main page of your repository on github.com.
2. In the list of files, click **index.html**.
3. Click the **pencil icon** at the top right of the file. Its label is "Edit this file". The file opens in the editor.
4. Find this line:

   ```html
       <!-- FEATURE 1 - THE TRIAL BOX GOES HERE -->
   ```

5. Select the whole line with your mouse and delete it.
6. In the same place, paste this code:

   ```html
       <section id="trial" hidden>
         <p id="progress"></p>
         <p id="word"></p>
         <div id="colour-buttons">
           <button class="colour-button" type="button" data-colour="RED">Red</button>
           <button class="colour-button" type="button" data-colour="BLUE">Blue</button>
           <button class="colour-button" type="button" data-colour="GREEN">Green</button>
           <button class="colour-button" type="button" data-colour="PURPLE">Purple</button>
         </div>
         <p id="last-answer"></p>
       </section>
   ```

What this does: `hidden` keeps the box out of sight until the test starts.
Each button has a `data-colour` label. The code reads it to know which colour was tapped.
The empty `last-answer` line is for feature 2.

## Step 2: Commit index.html

A commit saves your change, with a short note that says what you did.

1. Click the green **Commit changes...** button at the top right.
2. A box opens. In **Commit message**, delete the text that is there and type:

   ```text
   Feature 1: add the trial box
   ```

3. Leave **Commit directly to the main branch** selected.
4. Click the green **Commit changes** button.

A good commit message starts with what the change does, in a few words. Your future self, and your mentor, will read it.

## Step 3: Add the code that shows the words

1. Go back to the main page of your repository. (Click the repository name at the top left.)
2. Click **script.js**, then the **pencil icon**.
3. Find this line:

   ```js
   // FEATURE 1 - PART A GOES HERE
   ```

4. Select the whole line and delete it. In the same place, paste this code:

   ```js
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
     // FEATURE 2 - PART B GOES HERE
   }

   // Runs when someone taps a colour button.
   function answer(chosen) {
     if (trialBox.hidden) {
       return; // the test is not running, so ignore the tap
     }
     // FEATURE 2 - PART C GOES HERE
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
   ```

5. Now find this line, inside `function startTest()` near the bottom:

   ```js
     message.textContent = "The test is not built yet. Open the guide folder to build it.";
   ```

6. Select the whole line and delete it. In the same place, paste this code:

   ```js
     trials = shuffle(makeTrials());
     current = 0;
     // FEATURE 2 - PART D GOES HERE
     message.textContent = "";
     intro.hidden = true;
     // FEATURE 3 - PART B GOES HERE
     trialBox.hidden = false;
     showTrial();
   ```

Leave the lines that say `FEATURE 2` and `FEATURE 3` where they are. The next guides use them.

What this does: `makeTrials()` builds six matching words and six clashing words.
`shuffle()` mixes them into a random order.
`showTrial()` shows one word and paints it in its ink colour.
Each tap calls `answer()`, which moves on to the next word.

## Step 4: Commit script.js

1. Click **Commit changes...**.
2. In **Commit message**, type:

   ```text
   Feature 1: show the colour-word trials
   ```

3. Click **Commit changes**.

## Step 5: Check it is done

GitHub Pages needs about one or two minutes to put your change live.

1. Click the **Actions** tab at the top of your repository. Wait until the top run, "pages build and deployment", has a green tick.
2. Open your site. The link is in **Settings**, then **Pages**, next to "Your site is live at".
3. Refresh the page. If you still see the old page, press Ctrl+Shift+R (Cmd+Shift+R on a Mac).
4. Tap **Start**. You should see "Word 1 of 12" and one coloured word.
5. One of you taps a colour button for each word. The other writes **M** if the word and its ink match, or **C** if they clash.
6. After the last word, you should see "You did all 12 words."

**Feature 1 is done when** pressing Start shows 12 colour words one at a time, six match their ink colour, six clash, and the order is random.
So check all three:

- You counted 12 words.
- Your list has six M and six C.
- Tap Start again and write a second list. The order is different. (Very rarely two lists look alike by chance. If so, try a third time.)

## Watch out

**Trap: the word is not the answer.** The word says one colour. The ink can be another. In this test, the right answer is always the **ink** colour. Each trial keeps both: `word` is the text, `ink` is the colour it is painted in. Feature 2 checks answers, so remember which one counts.

## If something goes wrong

- **Nothing happens when I tap Start.** Look for a typo, a missing bracket, or a marker line you did not delete. On a laptop, press F12 and click **Console**. A red message names the file and the line number with the problem.
- **The page looks the same as before.** Wait one more minute, then press Ctrl+Shift+R (Cmd+Shift+R on a Mac).
- **I broke the file and want to start again.** Click **script.js**, then **History** at the top right. You can see each commit and what it changed. Ask your mentor if you need help to undo one.

Next: [Feature 2: Time each answer](02-feature-2.md)
