# ExamVerse

A fully static MCQ exam platform. Pick a level (Class 8 → PhD), a subject,
and a language; take a 120-minute, 100-question exam; get an instant score.
## Demo

Link - https://abislive.github.io/ExamVerse/

## Running it

### Option 1 — just open it
Double-click `index.html`. Works in Chrome, Edge, Firefox, and Safari
because the project uses **classic script tags** (no ES modules, no `fetch`).

### Option 2 — local server (recommended for development)
From inside the `examverse/` folder:

    python -m http.server 8000
    # or: npx serve .
    # or: php -S localhost:8000

Then open <http://localhost:8000>.

### Why "file://" can be blocked
Modern browsers treat every `file://` document as a **unique, isolated origin**.
That blocks ES modules, `fetch()`, and cross-origin iframes. This project avoids
all three, so `file://` works — but a local server is always the safest choice.

## Project layout

    index.html          markup only
    css/style.css       all styling + mobile rules
    js/util.js          RNG, shuffle, gcd, number formatter
    js/i18n.js          languages, UI strings, question templates, TERMS
    js/data.js          levels, subjects, reference tables
    js/generators.js    question banks (12 subjects)
    js/app.js           state machine, exam UI, scoring

## Adding a new subject

1. Add a display name to `SUBJ` in `js/data.js`.
2. Add the subject to a level's `subjects` array (`[displayKey, bankKey, icon]`).
3. Add a generator array to `BANKS` at the bottom of `js/generators.js`.
4. Reuse an existing bank key, or point to your new one.
