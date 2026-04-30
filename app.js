// ============================================================
// Election Process Assistant — App Module
// ============================================================

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape all HTML, then allow **bold** and newlines only (LLM / user chat). */
function formatChatHtml(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavbar();
  initFactsTicker();
  initTimeline();
  initBentoGrid();
  initQuiz();
  initChat();
  init2024Results();
  initScrollAnimations();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (window.innerWidth <= 768) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '64px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#fff';
      navLinks.style.padding = '16px 24px';
      navLinks.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
      navLinks.style.gap = '16px';
    }
    syncNavMenuAria();
  });

  function syncNavMenuAria() {
    if (!menuToggle || !navLinks) return;
    if (window.innerWidth > 768) {
      menuToggle.setAttribute('aria-expanded', 'false');
      return;
    }
    const open = navLinks.style.display === 'flex';
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = '';
      syncNavMenuAria();
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) navLinks.style.display = 'none';
      syncNavMenuAria();
    });
  });

  syncNavMenuAria();
}

// ===== FACTS TICKER =====
function initFactsTicker() {
  const track = document.getElementById('factsTicker');
  const facts = KEY_FACTS;
  const html = facts.map(f => `<div class="fact-item"><span class="fact-dot"></span>${escapeHtml(f)}</div>`).join('');
  track.innerHTML = html + html; // duplicate for seamless loop
}

// ===== TIMELINE =====
function initTimeline() {
  const container = document.getElementById('timelineContainer');
  let activeIndex = -1;

  ELECTION_TIMELINE.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item fade-in';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-expanded', 'false');
    el.setAttribute('aria-label', `Phase ${item.id}: ${item.phase}. Press Enter or Space to expand details.`);
    el.innerHTML = `
      <div class="timeline-dot"><i data-lucide="${escapeHtml(item.icon)}" style="width:14px;height:14px"></i></div>
      <div class="timeline-card">
        <div class="timeline-card-header">
          <span class="timeline-phase-num">Phase ${item.id}</span>
          <span class="timeline-duration">${escapeHtml(item.duration)}</span>
        </div>
        <h3>${escapeHtml(item.phase)}</h3>
        <p class="short-desc">${escapeHtml(item.shortDesc)}</p>
        <div class="timeline-details">
          <ul>${item.details.map(d => `<li>${escapeHtml(d)}</li>`).join('')}</ul>
          <div class="timeline-fun-fact"><strong>💡 Did you know?</strong> ${escapeHtml(item.funFact)}</div>
        </div>
      </div>
    `;
    el.addEventListener('click', () => {
      if (activeIndex === i) {
        el.classList.remove('active');
        el.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
      } else {
        container.querySelectorAll('.timeline-item').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-expanded', 'false');
        });
        el.classList.add('active');
        el.setAttribute('aria-expanded', 'true');
        activeIndex = i;
      }
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
    container.appendChild(el);
  });
  lucide.createIcons();
}

// ===== BENTO GRID =====
function initBentoGrid() {
  const grid = document.getElementById('bentoGrid');

  BENTO_CARDS.forEach(card => {
    const el = document.createElement('div');
    el.className = 'bento-card fade-in';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `Learn about ${card.title}. Press Enter or Space to flip the card.`);
    el.setAttribute('aria-pressed', 'false');
    const safeColor = /^#[0-9A-Fa-f]{3,8}$/.test(card.color) ? card.color : '#64748B';
    el.innerHTML = `
      <div class="bento-card-inner">
        <div class="bento-card-front">
          <div class="bento-icon" style="background:${safeColor}">
            <i data-lucide="${escapeHtml(card.icon)}" style="width:24px;height:24px"></i>
          </div>
          <h3>${escapeHtml(card.title)}</h3>
          <p class="front-desc">${escapeHtml(card.front)}</p>
          <span class="flip-hint">Tap to learn more <i data-lucide="rotate-cw" style="width:12px;height:12px"></i></span>
        </div>
        <div class="bento-card-back">
          <h4>${escapeHtml(card.title)}</h4>
          <ul>${card.back.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
        </div>
      </div>
    `;
    el.addEventListener('click', () => {
      el.classList.toggle('flipped');
      el.setAttribute('aria-pressed', el.classList.contains('flipped') ? 'true' : 'false');
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
    grid.appendChild(el);
  });
  lucide.createIcons();
}

// ===== QUIZ =====
function initQuiz() {
  let currentQ = 0;
  let score = 0;
  let answered = false;

  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const explanationEl = document.getElementById('quizExplanation');
  const nextBtn = document.getElementById('quizNextBtn');
  const progressFill = document.getElementById('quizProgressFill');
  const progressText = document.getElementById('quizProgressText');
  const resultsEl = document.getElementById('quizResults');
  const cardEl = document.getElementById('quizCard');
  const retryBtn = document.getElementById('quizRetryBtn');

  function loadQuestion() {
    answered = false;
    const q = QUIZ_QUESTIONS[currentQ];
    progressFill.style.width = `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%`;
    progressText.textContent = `${currentQ + 1}/${QUIZ_QUESTIONS.length}`;
    questionEl.textContent = q.question;
    explanationEl.classList.remove('show');
    nextBtn.classList.remove('show');

    optionsEl.innerHTML = q.options.map((opt, i) => `
      <button type="button" class="quiz-option" data-index="${i}">
        <span class="quiz-option-marker">${String.fromCharCode(65 + i)}</span>
        <span>${escapeHtml(opt)}</span>
      </button>
    `).join('');

    optionsEl.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
    });
  }

  function handleAnswer(index) {
    if (answered) return;
    answered = true;
    const q = QUIZ_QUESTIONS[currentQ];
    const options = optionsEl.querySelectorAll('.quiz-option');

    options[q.correct].classList.add('correct');
    if (index === q.correct) {
      score++;
    } else {
      options[index].classList.add('incorrect');
    }
    options.forEach(o => o.style.pointerEvents = 'none');

    explanationEl.textContent = q.explanation;
    explanationEl.classList.add('show');
    nextBtn.classList.add('show');
    nextBtn.textContent = currentQ === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question';
  }

  nextBtn.addEventListener('click', () => {
    currentQ++;
    if (currentQ >= QUIZ_QUESTIONS.length) {
      showResults();
    } else {
      loadQuestion();
    }
    lucide.createIcons();
  });

  function showResults() {
    cardEl.style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    resultsEl.classList.add('show');
    document.getElementById('quizScoreNum').textContent = score;

    const pct = score / QUIZ_QUESTIONS.length;
    const titleEl = document.getElementById('quizResultTitle');
    const msgEl = document.getElementById('quizResultMsg');

    if (pct >= 0.875) { titleEl.textContent = 'Outstanding!'; msgEl.textContent = 'You\'re an election expert! Share your knowledge with others.'; }
    else if (pct >= 0.625) { titleEl.textContent = 'Great Job!'; msgEl.textContent = 'You have a solid understanding of India\'s election process.'; }
    else if (pct >= 0.375) { titleEl.textContent = 'Good Effort!'; msgEl.textContent = 'Keep learning! Explore the timeline above for more details.'; }
    else { titleEl.textContent = 'Keep Learning!'; msgEl.textContent = 'Every vote matters! Explore our guide to learn more about the process.'; }
  }

  retryBtn.addEventListener('click', () => {
    currentQ = 0; score = 0;
    cardEl.style.display = 'block';
    document.querySelector('.quiz-progress').style.display = 'flex';
    resultsEl.classList.remove('show');
    loadQuestion();
  });

  loadQuestion();
}

// ===== CHAT WITH GEMINI API =====
function initChat() {
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const messages = document.getElementById('chatMessages');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const apiKeySaveBtn = document.getElementById('apiKeySave');
  const apiKeyArea = document.getElementById('chatApiKeyArea');

  function setChatOpen(open) {
    panel.classList.toggle('open', open);
    fab.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    fab.setAttribute('aria-label', open ? 'Close AI Assistant' : 'Open AI Assistant');
    if (open) {
      const apiHidden = getComputedStyle(apiKeyArea).display === 'none';
      const focusTarget = !apiHidden ? apiKeyInput : input;
      setTimeout(() => focusTarget.focus(), 0);
    }
  }

  let apiKey = localStorage.getItem('gemini_api_key') || '';
  if (apiKey) {
    apiKeyInput.value = '••••••••••••';
    apiKeyArea.style.display = 'none';
  }

  apiKeySaveBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key && !key.startsWith('••')) {
      apiKey = key;
      localStorage.setItem('gemini_api_key', key);
      apiKeyInput.value = '••••••••••••';
      apiKeyArea.style.display = 'none';
      addMessage('bot', 'API key saved! I\'m now powered by Google Gemini. Ask me anything about elections!');
    }
  });

  fab.addEventListener('click', () => {
    setChatOpen(!panel.classList.contains('open'));
  });
  closeBtn.addEventListener('click', () => {
    setChatOpen(false);
  });

  function addMessage(type, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.innerHTML = formatChatHtml(text);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  function showTyping() {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot typing';
    msg.id = 'typingIndicator';
    msg.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  async function sendToGemini(userMessage) {
    showTyping();

    if (!apiKey) {
      removeTyping();
      addMessage('bot', 'Please enter your **Gemini API Key** above to enable AI responses.');
      apiKeyArea.style.display = 'flex';
      return;
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: AI_SYSTEM_PROMPT }]
          },
          contents: [{
            role: 'user',
            parts: [{ text: userMessage }]
          }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 512
          }
        })
      });

      removeTyping();

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error('Gemini API Error:', errData);
        
        if (response.status === 400 || response.status === 403) {
          const errMsg = errData.error?.message || 'Check your API key.';
          addMessage('bot', `**API Error (${response.status}):** ${errMsg}`);
          apiKeyArea.style.display = 'flex';
          apiKey = '';
          localStorage.removeItem('gemini_api_key');
        } else {
          throw new Error(`API error: ${response.status} - ${errData.error?.message || ''}`);
        }
        return;
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t process that. Please try again.';
      addMessage('bot', reply);
    } catch (err) {
      removeTyping();
      // Fallback to local responses
      const lower = userMessage.toLowerCase();
      let fallback = FALLBACK_RESPONSES.default;
      for (const [key, val] of Object.entries(FALLBACK_RESPONSES)) {
        if (lower.includes(key)) { fallback = val; break; }
      }
      addMessage('bot', fallback + '\n\n*⚠️ Using offline mode. Check your API key for AI-powered responses.*');
    }
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    addMessage('user', text);
    input.value = '';
    sendToGemini(text);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
}

// ===== 2024 RESULTS DASHBOARD =====
function init2024Results() {
  if (typeof ELECTION_2024_DATA === 'undefined') return;
  const d = ELECTION_2024_DATA;

  const PARTY_COLORS = {
    'Bharatiya Janata Party': '#FF6B00',
    'Indian National Congress': '#00BFFF',
    'Samajwadi Party': '#E3242B',
    'All India Trinamool Congress': '#20C646',
    'Dravida Munnetra Kazhagam': '#DD1100',
    'Telugu Desam': '#FFED00',
    'Janata Dal (United)': '#003366',
    'Shiv Sena (Uddhav Balasaheb Thackrey)': '#FF6600',
    'Nationalist Congress Party - Sharadchandra Pawar': '#004B87',
    'Independent': '#888888',
    'Communist Party of India (Marxist)': '#CC0000',
    'Aam Aadmi Party': '#0066CC'
  };
  function getColor(party) { return PARTY_COLORS[party] || '#64748B'; }
  function shortName(p) {
    const map = {'Bharatiya Janata Party':'BJP','Indian National Congress':'INC','Samajwadi Party':'SP','All India Trinamool Congress':'TMC','Dravida Munnetra Kazhagam':'DMK','Telugu Desam':'TDP','Janata Dal (United)':'JD(U)','Shiv Sena (Uddhav Balasaheb Thackrey)':'SHS(UBT)','Nationalist Congress Party - Sharadchandra Pawar':'NCP(SP)','Communist Party of India (Marxist)':'CPI(M)','Aam Aadmi Party':'AAP','Independent':'IND'};
    return map[p] || (p.length > 12 ? p.slice(0,12)+'…' : p);
  }

  // Stats
  document.getElementById('resultsStats').innerHTML = [
    {icon:'users', color:'#2563EB', val: (d.totalVotes/1e6).toFixed(0)+'M', label:'Total Votes Cast'},
    {icon:'user-check', color:'#059669', val: d.totalCandidates.toLocaleString(), label:'Candidates'},
    {icon:'map-pin', color:'#7C3AED', val: d.totalConstituencies, label:'Constituencies'},
    {icon:'flag', color:'#DC2626', val: d.partyWiseSeats.length+'+', label:'Parties Won Seats'}
  ].map(s => `<div class="result-stat-card fade-in"><div class="stat-icon" style="background:${escapeHtml(s.color)}"><i data-lucide="${escapeHtml(s.icon)}"></i></div><div class="stat-value">${escapeHtml(s.val)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join('');

  // Bar chart
  const maxSeats = d.partyWiseSeats[0].seats;
  document.getElementById('barChart').innerHTML = d.partyWiseSeats.slice(0,10).map(p => `<div class="bar-row"><span class="bar-label" title="${escapeHtml(p.party)}">${escapeHtml(shortName(p.party))}</span><div class="bar-track"><div class="bar-fill" style="width:0%;background:${escapeHtml(getColor(p.party))}" data-target="${(p.seats/maxSeats*100).toFixed(1)}">${p.seats}</div></div><span class="bar-seats">${p.seats}</span></div>`).join('');

  // Animate bars on scroll
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.target + '%'; }, i * 80);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  barObserver.observe(document.getElementById('barChart'));

  // Closest contests
  document.getElementById('closestList').innerHTML = d.closestContests.map(c => `<div class="closest-item"><div class="contest-header"><span class="contest-name">${escapeHtml(c.constituency)}</span><span class="contest-margin">Margin: ${c.margin.toLocaleString()}</span></div><div class="contest-detail">${escapeHtml(c.winner)} (${escapeHtml(shortName(c.winnerParty))}) beat ${escapeHtml(c.runnerUp)} (${escapeHtml(shortName(c.runnerUpParty))}) · ${escapeHtml(c.state)}</div></div>`).join('');

  // Top candidates
  document.getElementById('topCandidatesList').innerHTML = d.topCandidates.map((c, i) => {
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    return `<div class="top-candidate"><span class="rank ${rankClass}">${i+1}</span><div class="cand-info"><div class="cand-name">${escapeHtml(c.name)}</div><div class="cand-party">${escapeHtml(shortName(c.party))} · ${escapeHtml(c.constituency)}</div></div><div class="cand-votes">${(c.votes/1e5).toFixed(1)}L</div></div>`;
  }).join('');

  // State grid
  document.getElementById('stateGrid').innerHTML = d.stateWise.map(s => `<div class="state-chip"><div class="state-name">${escapeHtml(s.state)}</div><div class="state-party">${escapeHtml(shortName(s.topParty))} — ${s.topPartySeats}/${s.totalSeats}</div></div>`).join('');

  lucide.createIcons();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
