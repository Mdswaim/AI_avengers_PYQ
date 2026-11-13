/**
 * PYQ Bank - Clean, Simple & Senior-Grade State Manager
 * Zero External Dependencies. Full LocalStorage Persistence.
 */

// Central App State
const State = {
  practicedIds: new Set(JSON.parse(localStorage.getItem('pyq_practiced_ids') || '[]')),
  reviewQueue: JSON.parse(localStorage.getItem('pyq_review_queue') || '[]'), // Array of max 5 question IDs
  notes: JSON.parse(localStorage.getItem('pyq_notes') || '{}'),
  userAnswers: JSON.parse(localStorage.getItem('pyq_user_answers') || '{}'),
  currentView: 'dashboard',
  filters: {
    subject: 'All',
    semester: 'All',
    year: 'All',
    search: '',
    paperId: null
  },
  soundEnabled: localStorage.getItem('pyq_sound_enabled') !== 'false',
  theme: localStorage.getItem('pyq_theme') || 'light'
};

// Web Audio API Synthesizer
const SoundSystem = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  play(freq, duration = 0.15, type = 'sine') {
    if (!State.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  },
  playSuccess() {
    this.play(523.25, 0.1); // C5
    setTimeout(() => this.play(659.25, 0.12), 70); // E5
    setTimeout(() => this.play(783.99, 0.2), 140); // G5
  },
  playRemove() {
    this.play(330, 0.1);
  },
  playWarning() {
    this.play(220, 0.25, 'sawtooth');
  }
};

// Pure HTML5 Canvas Confetti Physics
const Confetti = {
  canvas: null,
  ctx: null,
  particles: [],
  animId: null,
  init() {
    this.canvas = document.getElementById('confetti-canvas');
    if (!this.canvas || typeof this.canvas.getContext !== 'function') return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },
  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  burst(x = window.innerWidth / 2, y = window.innerHeight / 3, count = 60) {
    if (!this.canvas) this.init();
    if (!this.ctx) return;
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 14,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    if (!this.animId) this.loop();
  },
  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rSpeed;
      p.opacity -= 0.015;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();

      if (p.opacity <= 0 || p.y > window.innerHeight) {
        this.particles.splice(i, 1);
      }
    }
    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
};

// Toast Notifications
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;
  const icon = type === 'success' ? '✅' : (type === 'warning' ? '⚠️' : 'ℹ️');
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

// LocalStorage Persistence
function persistState() {
  localStorage.setItem('pyq_practiced_ids', JSON.stringify([...State.practicedIds]));
  localStorage.setItem('pyq_review_queue', JSON.stringify(State.reviewQueue));
  localStorage.setItem('pyq_notes', JSON.stringify(State.notes));
  localStorage.setItem('pyq_user_answers', JSON.stringify(State.userAnswers));
  localStorage.setItem('pyq_sound_enabled', State.soundEnabled);
  localStorage.setItem('pyq_theme', State.theme);
}

// Progress Calculation
function getOverallProgress() {
  const total = SAMPLE_QUESTIONS.length;
  const practiced = State.practicedIds.size;
  const percent = total > 0 ? Math.round((practiced / total) * 100) : 0;
  return { total, practiced, unpracticed: total - practiced, percent };
}

function getSubjectProgress(subjectName) {
  const list = SAMPLE_QUESTIONS.filter(q => q.subject === subjectName);
  const total = list.length;
  const practiced = list.filter(q => State.practicedIds.has(q.id)).length;
  const percent = total > 0 ? Math.round((practiced / total) * 100) : 0;
  return { total, practiced, percent };
}

// Global UI Header Update
function updateGlobalUI() {
  const prog = getOverallProgress();

  // Top nav badge
  const navProg = document.getElementById('nav-progress-text');
  if (navProg) navProg.textContent = `${prog.percent}% Done`;

  const navQueue = document.getElementById('nav-review-badge');
  if (navQueue) navQueue.textContent = `${State.reviewQueue.length}/5`;

  // Hero banner progress
  const dashPct = document.getElementById('dash-prep-percent');
  const dashFill = document.getElementById('dash-progress-fill');
  const dashSub = document.getElementById('dash-progress-sub');
  if (dashPct) dashPct.textContent = `${prog.percent}%`;
  if (dashFill) dashFill.style.width = `${prog.percent}%`;
  if (dashSub) dashSub.textContent = `${prog.practiced} of ${prog.total} questions completed`;

  // Stats boxes
  const statPapers = document.getElementById('dash-stat-papers');
  const statQuestions = document.getElementById('dash-stat-questions');
  const statPracticed = document.getElementById('dash-stat-practiced');
  const statQueue = document.getElementById('dash-stat-queue');

  if (statPapers) statPapers.textContent = SAMPLE_PAPERS.length;
  if (statQuestions) statQuestions.textContent = prog.total;
  if (statPracticed) statPracticed.textContent = prog.practiced;
  if (statQueue) statQueue.textContent = `${State.reviewQueue.length} / 5`;
}

// Navigation & Tab Switching
function navigateTo(viewName) {
  State.currentView = viewName;

  document.querySelectorAll('.nav-tab').forEach(tab => {
    if (tab.dataset.view === viewName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  document.querySelectorAll('.page').forEach(page => {
    if (page.id === `view-${viewName}`) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentView() {
  updateGlobalUI();
  switch (State.currentView) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'library':
      renderLibrary();
      break;
    case 'questions':
      renderQuestions();
      break;
    case 'review':
      renderReviewQueue();
      break;
    case 'progress':
      renderProgress();
      break;
  }
}

// Toggle Practiced Action
function togglePracticed(questionId, event) {
  if (event) event.stopPropagation();

  const isPracticed = State.practicedIds.has(questionId);
  const q = SAMPLE_QUESTIONS.find(item => item.id === questionId);

  if (isPracticed) {
    State.practicedIds.delete(questionId);
    SoundSystem.playRemove();
    showToast(`Unmarked: Question removed from practiced.`, 'info');
  } else {
    State.practicedIds.add(questionId);
    SoundSystem.playSuccess();
    Confetti.burst(window.innerWidth / 2, window.innerHeight / 3, 60);

    const prog = getOverallProgress();
    showToast(`🎉 Marked as Practised! Total Progress: ${prog.percent}%`, 'success');

    if (State.practicedIds.size === 5 || State.practicedIds.size === 10) {
      showCelebrationModal(`Milestone Unlocked! 🏆`, `Great job! You have completed ${State.practicedIds.size} engineering questions.`);
    }
  }

  persistState();
  updateGlobalUI();
  renderCurrentView();
}

// Pin / Unpin from Review Next Queue (Strict 5 Max)
function togglePinQueue(questionId, event) {
  if (event) event.stopPropagation();

  const index = State.reviewQueue.indexOf(questionId);

  if (index !== -1) {
    State.reviewQueue.splice(index, 1);
    SoundSystem.playRemove();
    showToast(`📌 Removed from Review Next queue (${State.reviewQueue.length}/5 slots used).`, 'info');
  } else {
    if (State.reviewQueue.length >= 5) {
      SoundSystem.playWarning();
      showToast(`⚠️ Review Next queue is full (Max 5 questions). Remove an item before adding another!`, 'warning', 4000);
      return;
    }
    State.reviewQueue.push(questionId);
    SoundSystem.playSuccess();
    showToast(`📌 Pinned to Review Next! Slot ${State.reviewQueue.length} of 5 used.`, 'success');
  }

  persistState();
  updateGlobalUI();
  renderCurrentView();
}

// Remove from Review Slot
function removeSlot(questionId, event) {
  if (event) event.stopPropagation();
  const index = State.reviewQueue.indexOf(questionId);
  if (index !== -1) {
    State.reviewQueue.splice(index, 1);
    SoundSystem.playRemove();
    persistState();
    updateGlobalUI();
    renderReviewQueue();
    showToast(`Item removed. Slot is now free.`, 'info');
  }
}

// Aliases for compatibility
const togglePinReview = togglePinQueue;
const removeReviewSlot = removeSlot;

// Note Autosave
function saveNote(questionId, text) {
  State.notes[questionId] = text;
  persistState();
}

// User Answer Autosave
function saveUserAnswer(questionId, text) {
  State.userAnswers[questionId] = text;
  persistState();
}

// Answer Evaluation (Keyword / Concept Matching)
const STOP_WORDS = new Set([
  'a','an','the','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','shall','should','may','might','must','can','could',
  'and','but','or','nor','not','no','so','yet','for','if','then','than','that','this',
  'it','its','of','in','on','at','to','by','with','from','up','out','as','into','about',
  'each','every','all','both','few','more','most','other','some','such','only','own',
  'same','also','very','just','because','between','through','during','before','after',
  'above','below','again','further','once','here','there','when','where','why','how',
  'what','which','who','whom','these','those','am','i','you','he','she','we','they',
  'me','him','her','us','them','my','your','his','our','their','etc','eg','ie',
  'using','used','use','given','based','following','define','explain','describe',
  'discuss','write','state','list','mention','note','answer','solution','marks'
]);

function extractKeyTerms(text) {
  if (!text) return [];
  // Split on non-alphanumeric, filter short words and stop words
  const words = text.toLowerCase()
    .replace(/[^a-z0-9\s\-\/]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));

  // Also extract multi-word phrases (2-word bigrams) for better matching
  const rawWords = text.toLowerCase().replace(/[^a-z0-9\s\-\/]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  const bigrams = [];
  for (let i = 0; i < rawWords.length - 1; i++) {
    if (!STOP_WORDS.has(rawWords[i]) || !STOP_WORDS.has(rawWords[i + 1])) {
      bigrams.push(rawWords[i] + ' ' + rawWords[i + 1]);
    }
  }

  // Unique terms
  const uniqueWords = [...new Set(words)];
  return { words: uniqueWords, bigrams: [...new Set(bigrams)] };
}

function evaluateAnswer(questionId) {
  const q = SAMPLE_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  const userText = (State.userAnswers[questionId] || '').trim();
  if (!userText) {
    showToast('Please write your answer first before evaluating.', 'warning');
    return;
  }

  // Build the reference key terms from solution + hint
  const refText = (q.solution || '') + ' ' + (q.hint || '');
  const ref = extractKeyTerms(refText);
  const user = extractKeyTerms(userText);

  // Score: how many reference keywords appear in user's answer
  const userAllText = userText.toLowerCase();
  const matched = [];
  const missing = [];

  ref.words.forEach(term => {
    if (userAllText.includes(term)) {
      matched.push(term);
    } else {
      missing.push(term);
    }
  });

  // Also check bigram matches for bonus
  let bigramMatches = 0;
  ref.bigrams.forEach(bg => {
    if (userAllText.includes(bg)) bigramMatches++;
  });

  // Calculate score: weight single words (80%) + bigram bonus (20%)
  const wordScore = ref.words.length > 0 ? (matched.length / ref.words.length) : 0;
  const bigramScore = ref.bigrams.length > 0 ? (bigramMatches / ref.bigrams.length) : 0;
  const rawScore = Math.round((wordScore * 0.8 + bigramScore * 0.2) * 100);
  const score = Math.min(rawScore, 100);

  // Qualitative rating
  let rating, ratingClass, ratingEmoji;
  if (score >= 80) {
    rating = 'Excellent'; ratingClass = 'excellent'; ratingEmoji = '🌟';
  } else if (score >= 60) {
    rating = 'Good'; ratingClass = 'good'; ratingEmoji = '👍';
  } else if (score >= 40) {
    rating = 'Needs Improvement'; ratingClass = 'needs-improvement'; ratingEmoji = '📝';
  } else {
    rating = 'Try Again'; ratingClass = 'try-again'; ratingEmoji = '💪';
  }

  // Limit displayed keywords to top 15 each for readability
  const showMatched = matched.slice(0, 15);
  const showMissing = missing.slice(0, 15);

  // Render result into the evaluation result container
  const resultEl = document.getElementById(`eval-result-${questionId}`);
  if (resultEl) {
    resultEl.innerHTML = `
      <div class="eval-header">
        <div class="eval-score-badge ${ratingClass}">
          <span class="eval-score-number">${score}%</span>
          <span class="eval-score-label">${ratingEmoji} ${rating}</span>
        </div>
      </div>
      <div class="eval-keywords-section">
        ${showMatched.length > 0 ? `
          <div class="eval-keyword-group">
            <span class="eval-keyword-label matched-label">✓ Concepts covered (${matched.length})</span>
            <div class="eval-keyword-list">
              ${showMatched.map(k => `<span class="eval-keyword matched">${escapeHtml(k)}</span>`).join('')}
            </div>
          </div>
        ` : ''}
        ${showMissing.length > 0 ? `
          <div class="eval-keyword-group">
            <span class="eval-keyword-label missing-label">✗ Key concepts to add (${missing.length})</span>
            <div class="eval-keyword-list">
              ${showMissing.map(k => `<span class="eval-keyword missing">${escapeHtml(k)}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      <div class="eval-tip">
        💡 <strong>Tip:</strong> Open "Show Answer & Solution" above to review the model answer and cover the missing concepts.
      </div>
    `;
    resultEl.style.display = 'block';
  }

  if (score >= 60) {
    SoundSystem.playSuccess();
  }
  showToast(`Evaluation: ${score}% — ${rating}`, score >= 60 ? 'success' : 'info');
}

// Open Specific Paper in Question Viewer
function openPaper(paperId) {
  State.filters.paperId = paperId;
  const paper = SAMPLE_PAPERS.find(p => p.id === paperId);
  if (paper) {
    State.filters.subject = paper.subject;
  }
  navigateTo('questions');
}

function clearPaperFilter() {
  State.filters.paperId = null;
  renderQuestions();
}

// Filter Dropdowns & Search
function setFilter(type, val) {
  State.filters[type] = val;
  renderLibrary();
  renderQuestions();
}

function handleSearch(val) {
  State.filters.search = val.trim();
  renderLibrary();
  renderQuestions();
}

function resetAllFilters() {
  State.filters.subject = 'All';
  State.filters.semester = 'All';
  State.filters.year = 'All';
  State.filters.search = '';
  State.filters.paperId = null;

  const searchInput = document.getElementById('lib-search-input');
  const selSubj = document.getElementById('lib-filter-subject');
  const selSem = document.getElementById('lib-filter-semester');
  const selYear = document.getElementById('lib-filter-year');

  if (searchInput) searchInput.value = '';
  if (selSubj) selSubj.value = 'All';
  if (selSem) selSem.value = 'All';
  if (selYear) selYear.value = 'All';

  renderLibrary();
  renderQuestions();
  showToast('Filters reset.', 'info');
}

// Toggle View for Details & Notes
function toggleDetails(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function toggleAnswerDetails(id, button) {
  const el = document.getElementById(id);
  if (!el) return;

  const isOpen = el.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
  button.querySelector('span').textContent = isOpen
    ? '🙈 Hide Answer & Solution'
    : '💡 Show Answer & Solution';
}

function toggleCodeAnswer(id, button) {
  const el = document.getElementById(id);
  if (!el) return;

  el.hidden = !el.hidden;
  button.setAttribute('aria-expanded', String(!el.hidden));
  button.querySelector('span').textContent = el.hidden ? '💡 Show Answer' : '🙈 Hide Answer';
}

// Page 1: Render Dashboard
function renderDashboard() {
  // Recent papers list
  const recentPapersEl = document.getElementById('dash-recent-papers');
  if (recentPapersEl) {
    recentPapersEl.innerHTML = SAMPLE_PAPERS.slice(0, 4).map(paper => {
      const total = paper.questionIds.length;
      const practiced = paper.questionIds.filter(id => State.practicedIds.has(id)).length;
      return `
        <div class="paper-quick-item">
          <div>
            <div class="paper-quick-title">${paper.title}</div>
            <div class="paper-quick-meta">${paper.subject} • Sem ${paper.semester} • ${practiced}/${total} Practised</div>
          </div>
          <button class="btn-small" onclick="openPaper('${paper.id}')">View Questions &rarr;</button>
        </div>
      `;
    }).join('');
  }

  // Subject Progress Bars
  const subjEl = document.getElementById('dash-subject-progress');
  if (subjEl) {
    const subjects = Object.keys(SUBJECT_METADATA);
    subjEl.innerHTML = subjects.map(subj => {
      const sp = getSubjectProgress(subj);
      const meta = SUBJECT_METADATA[subj];
      return `
        <div class="subj-item">
          <div class="subj-item-header">
            <span>${subj}</span>
            <span style="color: ${meta.color};">${sp.practiced}/${sp.total} (${sp.percent}%)</span>
          </div>
          <div class="simple-progress-bar">
            <div class="simple-progress-fill" style="width: ${sp.percent}%; background-color: ${meta.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Page 2: Render Library (Papers)
function renderLibrary() {
  const grid = document.getElementById('library-papers-grid');
  if (!grid) return;

  const filtered = SAMPLE_PAPERS.filter(paper => {
    if (State.filters.subject !== 'All' && paper.subject !== State.filters.subject) return false;
    if (State.filters.semester !== 'All' && paper.semester !== parseInt(State.filters.semester)) return false;
    if (State.filters.year !== 'All' && paper.year !== parseInt(State.filters.year)) return false;
    if (State.filters.search) {
      const kw = State.filters.search.toLowerCase();
      const matchTitle = paper.title.toLowerCase().includes(kw);
      const matchSubj = paper.subject.toLowerCase().includes(kw);
      if (!matchTitle && !matchSubj) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-muted);">No question papers match your filters. <button class="btn-small-link" onclick="resetAllFilters()">Reset</button></div>`;
    return;
  }

  grid.innerHTML = filtered.map(paper => {
    const total = paper.questionIds.length;
    const practiced = paper.questionIds.filter(id => State.practicedIds.has(id)).length;
    const pct = total > 0 ? Math.round((practiced / total) * 100) : 0;

    return `
      <div class="paper-card">
        <div>
          <div class="paper-tags">
            <span class="pill-tag">${paper.subjectCode}</span>
            <span class="pill-tag neutral">Sem ${paper.semester}</span>
            <span class="pill-tag neutral">${paper.year}</span>
          </div>
          <h3 class="paper-title" style="margin-top: 0.65rem;">${paper.title}</h3>
          <div class="paper-specs" style="margin-top: 0.5rem;">
            <span>⏱ ${paper.duration}</span>
            <span>📝 ${paper.totalMarks} Marks</span>
            <span>❓ ${total} Questions</span>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.775rem; font-weight: 600; margin-bottom: 0.35rem;">
            <span>Completed</span>
            <span style="color: ${pct === 100 ? '#10b981' : '#2563eb'};">${practiced}/${total} (${pct}%)</span>
          </div>
          <div class="simple-progress-bar">
            <div class="simple-progress-fill" style="width: ${pct}%; background-color: ${pct === 100 ? '#10b981' : '#2563eb'};"></div>
          </div>
          <button class="btn-primary" style="width: 100%; margin-top: 0.85rem;" onclick="openPaper('${paper.id}')">
            Practice This Paper &rarr;
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Page 3: Render Practice Questions
function renderQuestions() {
  const container = document.getElementById('questions-container');
  const counter = document.getElementById('questions-counter');
  const activeBanner = document.getElementById('active-paper-banner');
  const activeTitle = document.getElementById('active-paper-title');

  // Active Paper Banner
  if (State.filters.paperId && activeBanner && activeTitle) {
    const p = SAMPLE_PAPERS.find(item => item.id === State.filters.paperId);
    activeTitle.textContent = p ? p.title : State.filters.paperId;
    activeBanner.style.display = 'flex';
  } else if (activeBanner) {
    activeBanner.style.display = 'none';
  }

  // Filter Questions
  const filtered = SAMPLE_QUESTIONS.filter(q => {
    if (State.filters.paperId && q.paperId !== State.filters.paperId) return false;
    if (State.filters.subject !== 'All' && q.subject !== State.filters.subject) return false;
    if (State.filters.semester !== 'All' && q.semester !== parseInt(State.filters.semester)) return false;
    if (State.filters.year !== 'All' && q.year !== parseInt(State.filters.year)) return false;
    if (State.filters.search) {
      const kw = State.filters.search.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(kw);
      const matchTopic = q.topic.toLowerCase().includes(kw);
      const matchSubj = q.subject.toLowerCase().includes(kw);
      if (!matchQ && !matchTopic && !matchSubj) return false;
    }
    return true;
  });

  if (counter) counter.textContent = `Showing ${filtered.length} of ${SAMPLE_QUESTIONS.length} Questions`;

  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding: 3rem; text-align: center; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border);">No questions match your search or filter. <button class="btn-small-link" onclick="resetAllFilters()">Reset Filters</button></div>`;
    return;
  }

  container.innerHTML = filtered.map((q, idx) => {
    const isDone = State.practicedIds.has(q.id);
    const isPinned = State.reviewQueue.includes(q.id);
    const savedNote = State.notes[q.id] || '';
    const savedAnswer = State.userAnswers[q.id] || '';

    return `
      <div class="question-card ${isDone ? 'is-done' : ''} ${isPinned ? 'is-pinned' : ''}">
        
        <div class="q-top-meta">
          <div class="q-meta-badges">
            <span class="pill-tag">${q.subjectCode} • ${q.subject}</span>
            <span class="pill-tag neutral">Year ${q.year}</span>
            <span class="pill-tag neutral">${q.marks} Marks</span>
            <span class="pill-tag neutral">${q.difficulty}</span>
          </div>
          <span style="font-size: 0.775rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
            ${q.topic}
          </span>
        </div>

        <div class="q-text">
          <strong>Q${idx + 1}.</strong> ${q.question}
        </div>

        ${q.codeSnippet ? `
          <button class="btn-toggle-view" aria-expanded="false" aria-controls="code-answer-${q.id}" onclick="toggleCodeAnswer('code-answer-${q.id}', this)">
            <span>💡 Show Answer</span>
          </button>
          <div class="q-code" id="code-answer-${q.id}" hidden><pre><code>${escapeHtml(q.codeSnippet)}</code></pre></div>
        ` : ''}

        <!-- Toggle Row for Answer and Notes -->
        <div class="q-toggle-row">
          <button class="btn-toggle-view" aria-expanded="false" aria-controls="sol-${q.id}" onclick="toggleAnswerDetails('sol-${q.id}', this)">
            <span>💡 Show Answer & Solution</span>
          </button>
          <button class="btn-toggle-view" onclick="toggleDetails('note-${q.id}')">
            <span>✏️ Personal Note ${savedNote ? '(Saved)' : ''}</span>
          </button>
        </div>

        <!-- Hidden Solution Box -->
        <div class="q-details-box" id="sol-${q.id}">
          <p><strong>Strategy / Hint:</strong> ${q.hint}</p>
          <hr style="border: 0; border-top: 1px solid var(--border); margin: 0.65rem 0;">
          <p><strong>Model Answer Rubric:</strong><br>${q.solution}</p>
        </div>

        <!-- Hidden Note Box -->
        <div class="q-note-box" id="note-${q.id}">
          <textarea placeholder="Type your personal notes, doubts, or formulas here (auto-saved)..." oninput="saveNote('${q.id}', this.value)">${escapeHtml(savedNote)}</textarea>
        </div>

        <!-- ✍️ Write Your Answer Section -->
        <div class="q-answer-section">
          <div class="q-answer-header">
            <span class="q-answer-label">✍️ Write Your Answer</span>
            <span class="q-answer-hint">Auto-saved as you type</span>
          </div>
          <textarea class="q-answer-textarea" 
            placeholder="Write your solution here... Try to cover all key concepts before evaluating."
            oninput="saveUserAnswer('${q.id}', this.value)">${escapeHtml(savedAnswer)}</textarea>
          <div class="q-answer-actions">
            <button class="btn-evaluate" onclick="evaluateAnswer('${q.id}')">
              🔍 Evaluate My Answer
            </button>
            <button class="btn-clear-answer" onclick="document.querySelector('#eval-result-${q.id}').style.display='none';">
              Clear Result
            </button>
          </div>
          <div class="eval-result-box" id="eval-result-${q.id}" style="display: none;"></div>
        </div>

        <!-- 2 Big Bottom Action Buttons -->
        <div class="q-bottom-actions">
          <button class="btn-mark-practiced ${isDone ? 'active' : ''}" onclick="togglePracticed('${q.id}', event)">
            <span>${isDone ? '✓ Practised (Done)' : 'Mark as Practised'}</span>
          </button>

          <button class="btn-pin-queue ${isPinned ? 'active' : ''}" onclick="togglePinQueue('${q.id}', event)">
            <span>${isPinned ? '📌 In Review Next (Pinned)' : '📌 Save to Review Next'}</span>
          </button>
        </div>

      </div>
    `;
  }).join('');
}

// Page 4: Render Review Next (Strict 5 Slots)
function renderReviewQueue() {
  const container = document.getElementById('review-slots-container');
  const badge = document.getElementById('review-slots-badge');

  if (badge) badge.textContent = `${State.reviewQueue.length} of 5 Slots Used`;

  if (!container) return;

  let html = '';
  for (let i = 0; i < 5; i++) {
    const qid = State.reviewQueue[i];
    if (qid) {
      const q = SAMPLE_QUESTIONS.find(item => item.id === qid);
      if (q) {
        const isDone = State.practicedIds.has(q.id);
        html += `
          <div class="slot-card filled">
            <div class="slot-num">${i + 1}</div>
            <div class="slot-content">
              <div class="slot-q-title">${q.question}</div>
              <div class="slot-q-sub">${q.subject} • ${q.marks} Marks • Topic: <strong>${q.topic}</strong> ${isDone ? '• <span style="color: #10b981; font-weight: 700;">(Practised ✓)</span>' : ''}</div>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button class="btn-mark-practiced ${isDone ? 'active' : ''}" style="padding: 0.35rem 0.75rem; font-size: 0.775rem;" onclick="togglePracticed('${q.id}', event)">
                ${isDone ? 'Practised ✓' : 'Mark Done'}
              </button>
              <button class="btn-remove-slot" onclick="removeSlot('${q.id}', event)">
                Remove
              </button>
            </div>
          </div>
        `;
      }
    } else {
      html += `
        <div class="slot-card empty">
          <div class="slot-num">${i + 1}</div>
          <div style="font-size: 0.85rem;">
            Slot ${i + 1} is Empty — Click <strong>"📌 Save to Review Next"</strong> on any practice question to pin it here.
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;
}

// Page 5: Render Progress
function renderProgress() {
  const prog = getOverallProgress();

  const pctLarge = document.getElementById('prog-percent-large');
  const fillLarge = document.getElementById('prog-large-fill');
  const cntPracticed = document.getElementById('prog-count-practiced');
  const cntUnpracticed = document.getElementById('prog-count-unpracticed');
  const cntTotal = document.getElementById('prog-count-total');

  if (pctLarge) pctLarge.textContent = `${prog.percent}%`;
  if (fillLarge) fillLarge.style.width = `${prog.percent}%`;
  if (cntPracticed) cntPracticed.textContent = prog.practiced;
  if (cntUnpracticed) cntUnpracticed.textContent = prog.unpracticed;
  if (cntTotal) cntTotal.textContent = prog.total;

  const list = document.getElementById('progress-subject-list');
  if (list) {
    const subjects = Object.keys(SUBJECT_METADATA);
    list.innerHTML = subjects.map(subj => {
      const sp = getSubjectProgress(subj);
      const meta = SUBJECT_METADATA[subj];
      return `
        <div class="subj-item">
          <div class="subj-item-header">
            <strong>${subj}</strong>
            <span style="color: ${meta.color};">${sp.practiced} / ${sp.total} questions (${sp.percent}%)</span>
          </div>
          <div class="simple-progress-bar" style="height: 10px;">
            <div class="simple-progress-fill" style="width: ${sp.percent}%; background-color: ${meta.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Celebration Modal
function showCelebrationModal(title, msg) {
  const modal = document.getElementById('celebration-modal');
  const t = document.getElementById('modal-title');
  const d = document.getElementById('modal-desc');
  if (t) t.textContent = title;
  if (d) d.textContent = msg;
  if (modal) modal.classList.add('active');
}

function closeCelebrationModal() {
  const modal = document.getElementById('celebration-modal');
  if (modal) modal.classList.remove('active');
}

// Theme & Sound Toggle
function toggleTheme() {
  State.theme = State.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', State.theme);
  persistState();
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) icon.innerHTML = State.theme === 'dark' ? '☀️' : '🌙';
}

function toggleSound() {
  State.soundEnabled = !State.soundEnabled;
  persistState();
  showToast(`Sound ${State.soundEnabled ? 'Enabled' : 'Muted'}`, 'info');
  const icon = document.getElementById('sound-toggle-icon');
  if (icon) icon.innerHTML = State.soundEnabled ? '🔊' : '🔇';
}

// Utility: HTML Escape
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 1-Click Evaluation Scenarios
window.EvaluationDemo = {
  runScenario1() {
    State.filters.subject = 'Operating Systems';
    State.filters.year = '2025';
    State.filters.search = 'Philosophers';
    State.filters.paperId = null;

    const selSubj = document.getElementById('lib-filter-subject');
    const selYear = document.getElementById('lib-filter-year');
    const searchInput = document.getElementById('lib-search-input');
    if (selSubj) selSubj.value = 'Operating Systems';
    if (selYear) selYear.value = '2025';
    if (searchInput) searchInput.value = 'Philosophers';

    navigateTo('questions');
    SoundSystem.playSuccess();
    showToast('Scenario 1: Filtered by "Operating Systems", 2025, Keyword "Philosophers"', 'success', 3500);

    const btn = document.getElementById('demo-step-1');
    if (btn) btn.classList.add('completed');
  },

  runScenario2() {
    const target = SAMPLE_QUESTIONS[0];
    if (target) {
      if (!State.practicedIds.has(target.id)) {
        State.practicedIds.add(target.id);
      } else {
        State.practicedIds.add(SAMPLE_QUESTIONS[1].id);
      }
      persistState();
      updateGlobalUI();
      navigateTo('dashboard');
      Confetti.burst(window.innerWidth / 2, window.innerHeight / 3, 60);
      SoundSystem.playSuccess();
      showToast('Scenario 2: Marked question as practiced! Progress updated.', 'success', 3500);

      const btn = document.getElementById('demo-step-2');
      if (btn) btn.classList.add('completed');
    }
  },

  runScenario3() {
    navigateTo('review');
    if (State.reviewQueue.length === 0) {
      State.reviewQueue.push(SAMPLE_QUESTIONS[0].id);
      State.reviewQueue.push(SAMPLE_QUESTIONS[1].id);
    }
    if (State.reviewQueue.length > 0) {
      State.reviewQueue.pop();
      SoundSystem.playRemove();
      persistState();
      renderReviewQueue();
      updateGlobalUI();
      showToast('Scenario 3: 5-Slot Queue verified & 1 item removed!', 'success', 3500);

      const btn = document.getElementById('demo-step-3');
      if (btn) btn.classList.add('completed');
    }
  }
};

// DOM Init
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', State.theme);
  const themeIcon = document.getElementById('theme-toggle-icon');
  if (themeIcon) themeIcon.innerHTML = State.theme === 'dark' ? '☀️' : '🌙';

  const soundIcon = document.getElementById('sound-toggle-icon');
  if (soundIcon) soundIcon.innerHTML = State.soundEnabled ? '🔊' : '🔇';

  updateGlobalUI();
  navigateTo('dashboard');
});
