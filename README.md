# A Stroop test that runs in the browser

This is the starter for project kit **PRJ-PSY-01** in the SPC Research Programme.

You will build a small test in a web page. It shows colour words, times each answer, and shows the person their result.
The site is plain HTML, CSS and JavaScript. There is nothing to install. You do all the work on github.com.

See the finished version here: https://alphaquantix.github.io/spc-starter-stroop/

## What is a Stroop test?

You see a colour word, like **BLUE**, painted in a colour of ink, like red.
You tap the colour of the ink, not the word.
Most people are slower when the word and the ink clash. This is called the Stroop effect.
Reading is so automatic that the word gets in the way.

## What is in this repository

| File | What it is |
|---|---|
| `index.html` | The page: a title, the instructions and a Start button. |
| `style.css` | How the page looks. It already has the styles for the parts you will add. |
| `script.js` | The code. It has the list of colour words and colours. You add the rest. |
| `guide/` | One guide for each feature. Follow them in order. |
| `.nojekyll` | An empty file. It tells GitHub Pages to serve the files as they are. Do not delete it. |

## Step 1: Make your own copy

Only one person in your pair does this step.

1. Sign in to github.com. If you do not have an account, click **Sign up** and make one. Use your own email.
2. Open this repository on github.com.
3. Click the green **Use this template** button near the top right. Then click **Create a new repository**.
4. Under **Owner**, pick your own account. Under **Repository name**, type a name, for example `stroop-test`.
5. Leave **Include all branches** turned off. You only need the main branch.
6. Choose **Public**. GitHub Pages is free for public repositories.
7. Click **Create repository**. After a few seconds you have your own copy.

## Step 2: Add your teammate

1. In your new repository, click the **Settings** tab (the gear icon at the top).
2. In the left menu, click **Collaborators**.
3. Click **Add people**. Type your teammate's GitHub username and pick them from the list.
4. Your teammate gets an email. They must click **Accept invitation** before they can make changes.

## Step 3: Turn on GitHub Pages

GitHub Pages puts your site on the web for free.

1. In your repository, click the **Settings** tab.
2. In the left menu, under "Code and automation", click **Pages**.
3. Under **Build and deployment**, find **Source**. Pick **Deploy from a branch**.
4. Under **Branch**, pick **main**. In the folder box next to it, pick **/ (root)**. Click **Save**.
5. Wait one or two minutes. Then refresh the page.
6. At the top you will see "Your site is live at" and a link. Click **Visit site**. Save this link: you will use it after every change.

At first, the site shows the instructions and a Start button. Tapping Start says the test is not built yet. That is right. You build it next.

## Step 4: Build the three features

Follow the guides in order. Each one takes a pair less than 45 minutes.

1. [Feature 1: Show the colour-word trials](guide/01-feature-1.md)
2. [Feature 2: Time each answer](guide/02-feature-2.md)
3. [Feature 3: Show the person their result](guide/03-feature-3.md)
4. [Stretch: Add a practice round](guide/stretch.md) (only if you have time)

Each guide tells you what to build, the exact code to add, how to check it is done, and what to type when you commit.

## One rule: keep nothing

This test must store nothing about the people who try it.
No saving in the browser, no cookies, no sending data anywhere, no analytics.
The result shows on the screen only, and is gone when the page closes.
If you ever want to collect results from real people, that is a research study. It needs consent and an ethics check first. Talk to your mentor.

## Read more

- [lab.js: A free, open, online study builder](https://pmc.ncbi.nlm.nih.gov/articles/PMC9046347/) (Behavior Research Methods, 2022). It uses a Stroop test as its example.
- [jsPsych plugins overview](https://www.jspsych.org/latest/overview/plugins/). The ready-made parts researchers use to build browser tests.
- [Stack Overflow Developer Survey 2025: Technology](https://survey.stackoverflow.co/2025/technology). Which languages developers use.

## Licence

MIT. See [LICENSE](LICENSE). Made by AlphaQuantix Analytics LLP for the SPC Research Programme.
