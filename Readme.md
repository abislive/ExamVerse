# ExamVerse

> Universal online examination platform — fully static, responsive, and backend-free.

ExamVerse is a browser-based examination platform designed to support multiple education levels and question-bank types without requiring a backend or build step.

## Features

- **Multi-level exam flow** — Tally ERP 9 → Class 8 → … → PhD
- **Tally ERP 9 question banks** — 3 fixed MCQ sets with **276 implemented questions**
- **Multilingual UI** — 6 supported languages
- **Responsive and accessible** — keyboard-friendly interface designed for desktop and mobile
- **Exam timer** — automatically adjusts to the selected question bank
- **Passing score** — more than 60%
- **Question palette** — quickly jump between questions
- **Answer controls** — mark, clear, review, and retake exams
- **Static deployment** — works with GitHub Pages, Netlify, Vercel, and Cloudflare Pages
- **No backend required** — all exam logic runs in the browser

---

## Run Locally

No build step is required.

### Option 1 — Open directly

Open `index.html` in a modern browser.

### Option 2 — Use a local server

```bash
npx serve .
```

You can also use:

```bash
python -m http.server 8000
```

Then open the local address shown by the server.

---

## Question Banks

Fixed question banks are stored in:

```text
js/questions.js
```

The corresponding `bankKey` values are configured in:

```text
js/data.js
```

The keys must match between the two files:

```text
tally1
tally2
tally3
```

If a selected subject has a matching entry in `FIXED_BANKS`, ExamVerse loads that fixed question bank. Otherwise, the existing dynamic question generator is used.

---

## Tally ERP 9 Implementation

The Tally ERP 9 level is included at the top of `LEVELS` in `js/data.js` and contains three subjects mapped to the three fixed question banks.

### Current question-bank breakdown

| Bank | Source PDF | Implemented questions |
| --- | --- | ---: |
| `tally1` | `Tally ERP 9 MCQ.pdf` | 92 |
| `tally2` | `Tally ERP 9 MCQs.pdf` | 92 |
| `tally3` | `Tally ERP 9 MCQ2.pdf` | 92 |
| **Total** | **3 PDFs** | **276** |

The implemented questions preserve the available wording, answer choices, ordering, and answer keys from the source material.

---

## Exam Configuration

The ready screen automatically adapts to the selected exam.

For fixed banks, the question count, marks per question, total marks, and duration are calculated from the selected bank.

For example:

- **Tally ERP 9:** 92 questions × 1 mark = 92 marks, with a 92-minute timer
- **Generated subjects:** 100 questions × 2 marks = 200 marks, with a 120-minute timer

Answer review, retakes, navigation, the question palette, timer, modal dialogs, and keyboard shortcuts work consistently for both fixed and generated exams.

The existing **Class 8 → PhD** generator flow remains available.

---

## PDF Verification

The three supplied Tally ERP 9 PDFs contain **300 numbered questions** in total.

| Source PDF | Numbered questions | Implemented | Skipped |
| --- | ---: | ---: | ---: |
| `Tally ERP 9 MCQ.pdf` | 100 | 92 | 8 |
| `Tally ERP 9 MCQs.pdf` | 100 | 92 | 8 |
| `Tally ERP 9 MCQ2.pdf` | 100 | 92 | 8 |
| **Total** | **300** | **276** | **24** |

### Skipped questions

The 24 skipped questions were not reconstructed or guessed because the supplied source text was truncated and did not contain enough information to determine the complete question, options, or answer key.

- **`Tally ERP 9 MCQ.pdf`** — Q8, Q16, Q32, Q49, Q65, Q73, Q81, Q89
- **`Tally ERP 9 MCQs.pdf`** — Q108, Q116, Q132, Q149, Q165, Q173, Q181, Q189
- **`Tally ERP 9 MCQ2.pdf`** — Q8, Q16, Q33, Q41, Q57, Q74, Q82, Q99

For example, one truncated source question ended after only two answer choices. Rather than inventing missing options or an answer key, the incomplete question was excluded.

### Verification status

- **Questions silently dropped:** None beyond the 24 explicitly identified truncated questions
- **Answer choices:** Verified for all 276 implemented questions
- **Answer keys:** Verified for all 276 implemented questions
- **Original option order:** Preserved
- **Special characters:** Preserved, including `₹`, `&`, `/`, `−`, `.`, and `A/c`
- **Image-dependent questions:** None; all three source PDFs contain text-based MCQs

If the 24 incomplete questions become available in full, they can be added directly to the appropriate `FIXED_BANKS.tally1`, `FIXED_BANKS.tally2`, or `FIXED_BANKS.tally3` array. The application will then include them automatically.

---

## Adding More Questions

To add or extend fixed question banks:

1. Add the questions to `FIXED_BANKS` in `js/questions.js`.
2. Assign the corresponding `bankKey` in `js/data.js`.
3. Make sure both keys match exactly.
4. Reload the application and verify the exam flow.

Example bank keys:

```text
tally1
tally2
tally3
```

---

## Deployment

ExamVerse is a fully static application. There is:

- No backend
- No database
- No build step
- No server-side exam logic

The project can be deployed directly to most static hosting platforms.

### GitHub Pages

```bash
git add .
git commit -m "Add Tally ERP 9 question bank"
git push origin main
```

Then configure:

```text
Settings → Pages → Source: main / root → Save
```

### Netlify

You can drag the project folder into Netlify's deployment interface, or use the CLI:

```bash
npx netlify-cli deploy --dir=. --prod
```

### Vercel

```bash
npx vercel --prod
```

Use:

```text
Framework preset: Other
Build command: empty
Output directory: .
```

### Cloudflare Pages

Connect the repository and use:

```text
Build command: empty
Output directory: .
```

---

## Known Limitations

### 1. 24 incomplete PDF questions

Twenty-four questions are not implemented because the supplied PDF text was truncated and did not contain complete options and/or answer keys. They are listed in the PDF Verification section above.

The missing information was intentionally not guessed or reconstructed.

### 2. Tally ERP 9 content is currently English-only

The fixed Tally ERP 9 question content is stored in English and is not automatically translated into the other five UI languages.

The application's interface elements, buttons, labels, and navigation can still be localized normally.

### 3. Answer keys are client-side

Because ExamVerse is a fully static, backend-free application, the answer keys are available in the client-side JavaScript bundle.

A determined user can inspect `js/questions.js` through browser developer tools. Preventing this would require server-side validation or another trusted backend component.

### 4. Fixed-bank timer

Fixed banks currently use approximately **1 minute per question**, with a minimum of 1 minute.

For the current Tally ERP 9 banks:

```text
92 questions → 92-minute timer
```

If you want every fixed bank to use a flat 120-minute duration instead, update the `durationSec` calculation inside `computeConfig()` in `app.js`.

---

## Project Structure

The main files involved in the examination system are:

```text
.
├── index.html
├── app.js
├── js/
│   ├── data.js
│   └── questions.js
└── README.md
```

Additional assets and project files may be present depending on the repository version.

---

## Static Architecture

The application runs entirely in the browser:

```text
Browser
   │
   ├── index.html
   ├── app.js
   ├── js/data.js
   └── js/questions.js
        │
        ├── Fixed question banks
        └── Dynamic question generators
```

No API or backend service is required for the core examination flow.

---

## License

Add your project's license information here if a license has been selected.

If the repository already contains a `LICENSE` file, update this section to match that license.

---

## Status

**Ready for static deployment.**

The Tally ERP 9 integration includes three verified fixed banks containing **276 complete questions**, while the existing generated exam flow remains available for the other levels.
