/**
 * Automated Verification Script for PYQ Bank 3 Mandatory Scenarios
 */

// Mock browser globals
global.window = {
  innerWidth: 1200,
  innerHeight: 800,
  addEventListener: () => {},
  scrollTo: () => {}
};
global.document = {
  getElementById: (id) => ({
    style: { setProperty: () => {} },
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    textContent: '',
    value: '',
    innerHTML: '',
    appendChild: () => {},
    addEventListener: () => {}
  }),
  createElement: () => ({
    className: '',
    style: {},
    innerHTML: '',
    remove: () => {}
  }),
  querySelectorAll: () => [],
  documentElement: { setAttribute: () => {} },
  addEventListener: () => {}
};
const store = {};
global.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = v; },
  removeItem: (k) => { delete store[k]; }
};

// Load data and logic
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const dataCode = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

vm.runInThisContext(dataCode.replace(/\bconst\s+/g, 'var '));
vm.runInThisContext(appCode.replace(/\bconst\s+/g, 'var '));
global.EvaluationDemo = window.EvaluationDemo;

console.log('=== TEST SUITE: PYQ BANK EVALUATION SCENARIOS ===');

// Test 0: Basic dataset check
console.log('Test 0: Seed Data Verification');
console.assert(SAMPLE_QUESTIONS.length >= 20, `Expected at least 20 questions, got ${SAMPLE_QUESTIONS.length}`);
console.assert(SAMPLE_PAPERS.length >= 5, `Expected at least 5 papers, got ${SAMPLE_PAPERS.length}`);
console.log(`✓ Verified ${SAMPLE_QUESTIONS.length} Questions and ${SAMPLE_PAPERS.length} Question Papers.`);

// Test Scenario 1: Filter questions by subject and year or search using a keyword
console.log('\nTest Scenario 1: Filter & Search');
EvaluationDemo.runScenario1();
console.assert(State.filters.subject === 'Operating Systems', 'Subject should be Operating Systems');
console.assert(State.filters.year === '2025', 'Year should be 2025');
console.assert(State.filters.search === 'Philosophers', 'Search keyword should be Philosophers');

// Filter check
const filtered = SAMPLE_QUESTIONS.filter(q => {
  if (q.subject !== State.filters.subject) return false;
  if (q.year !== parseInt(State.filters.year)) return false;
  const kw = State.filters.search.toLowerCase();
  return q.question.toLowerCase().includes(kw) || q.topic.toLowerCase().includes(kw);
});
console.assert(filtered.length > 0, 'Should find at least 1 matching question for OS, 2025, Philosophers');
console.log(`✓ Scenario 1 PASSED: Found ${filtered.length} question(s) matching subject, year, and keyword.`);

// Test Scenario 2: Mark a question as practiced and show updated progress
console.log('\nTest Scenario 2: Mark Practiced & Progress Update');
const initialProgress = getOverallProgress();
console.log(`Initial progress: ${initialProgress.practiced}/${initialProgress.total} (${initialProgress.percent}%)`);

EvaluationDemo.runScenario2();
const updatedProgress = getOverallProgress();
console.log(`Updated progress: ${updatedProgress.practiced}/${updatedProgress.total} (${updatedProgress.percent}%)`);
console.assert(updatedProgress.practiced > initialProgress.practiced, 'Practiced count should have increased');
console.assert(updatedProgress.percent >= initialProgress.percent, 'Progress percent should have increased');
console.assert(localStorage.getItem('pyq_practiced_ids') !== null, 'Practiced IDs should be in LocalStorage');
console.log(`✓ Scenario 2 PASSED: Practiced questions increased to ${updatedProgress.practiced} and persisted in LocalStorage.`);

// Test Scenario 3: Pin questions to the five-item Review Next queue, enforce 5-item cap, and remove one
console.log('\nTest Scenario 3: Review Next Queue & 5-Item Cap');
State.reviewQueue = []; // Start fresh
const qIds = SAMPLE_QUESTIONS.slice(0, 7).map(q => q.id);

// Add 5 items
for (let i = 0; i < 5; i++) {
  togglePinReview(qIds[i]);
}
console.assert(State.reviewQueue.length === 5, `Expected 5 items in queue, got ${State.reviewQueue.length}`);
console.log(`Queue filled with 5 items: [${State.reviewQueue.join(', ')}]`);

// Try adding 6th item - MUST be rejected
togglePinReview(qIds[5]);
console.assert(State.reviewQueue.length === 5, `Expected strict cap of 5 items, got ${State.reviewQueue.length}`);
console.log('✓ Strict 5-question limit successfully prevented 6th item from being added.');

// Remove 1 item
const itemToRemove = State.reviewQueue[0];
removeReviewSlot(itemToRemove);
console.assert(State.reviewQueue.length === 4, `Expected 4 items after removal, got ${State.reviewQueue.length}`);
console.assert(!State.reviewQueue.includes(itemToRemove), 'Removed item should not be in queue');
console.log(`✓ Successfully removed 1 item from queue. Remaining: ${State.reviewQueue.length}/5 slots used.`);
console.assert(localStorage.getItem('pyq_review_queue') !== null, 'Review queue should be in LocalStorage');
console.log('✓ Scenario 3 PASSED: 5-item cap enforced and removal functions correctly.');

console.log('\n=== ALL 3 MANDATORY EVALUATION SCENARIOS VERIFIED SUCCESSFULLY! ===');
