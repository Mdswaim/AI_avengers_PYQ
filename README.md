# PYQ Bank

PYQ Bank is a student-focused web app for browsing engineering exam papers, practising questions, and tracking revision progress.

## Features

- Dashboard with study progress and preparation status
- Searchable and filterable question and paper libraries
- Answers, solutions, and personal notes for practice questions
- Practice tracking saved in the browser
- A review queue for up to five questions
- Light/dark theme and sound controls

## Requirements

- Python 3, to run the local web server
- A modern web browser
- Node.js, only if you want to run the verification script

The app has no npm package dependencies.

##web link
https://mdswaim.github.io/AI_avengers_PYQ/
## Run the web app

1. Download or clone this repository.
2. Open a terminal in the project folder.
3. Start the local web server:

   ```powershell
   npm start
   ```

   Alternatively, if you do not have npm installed:

   ```powershell
   python -m http.server 3000
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. To stop the server, press `Ctrl+C` in the terminal.

You can also open `index.html` directly in a browser, but using the local server is recommended.

## Verify the app logic

With Node.js installed, run the included verification script from the project folder:

```powershell
node test_verification.js
```

It checks the sample data and the filter/search, practice tracking, and five-question review queue scenarios.

## Project files

- `index.html` - app page and layout
- `styles.css` - styling and responsive presentation
- `app.js` - app behavior and interactions
- `data.js` - sample questions and papers
- `test_verification.js` - automated logic verification
- `package.json` - project metadata and the `npm start` command

Practice status, review queue, notes, and preferences are stored in the browser's local storage on the device and browser you use.
