// Edubull Kids & Students Interactive Landing Engine

let soundEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
  initAudioSynth();
  initSoundToggle();
  initConfetti();
  initQuizPlayzone();
  initMilestoneModals();
  initLetterTracingGame();
  initSpeechReadAloud();
  initStickyNavbar();
});

function initSoundToggle() {
  const btn = document.getElementById('soundToggleBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    btn.textContent = soundEnabled ? '🔊' : '🔇';
    btn.style.opacity = soundEnabled ? '1' : '0.6';
    if (soundEnabled) {
      playPopSound();
    }
  });
}

/* ========================================================
   WEB AUDIO SYNTHESIZER (Cheerful Kid-Friendly Sound FX)
   ======================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!soundEnabled) return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.debug(e);
  }
}

function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + (idx * 0.08);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch (e) {
    console.debug(e);
  }
}

function playWrongSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.debug(e);
  }
}

function initAudioSynth() {
  // Unlock audio on first user click anywhere
  const unlock = () => {
    getAudioContext();
    document.removeEventListener('click', unlock);
    document.removeEventListener('touchstart', unlock);
  };
  document.addEventListener('click', unlock);
  document.addEventListener('touchstart', unlock);
}

/* ========================================================
   LIGHTWEIGHT CONFETTI PARTICLE SYSTEM
   ======================================================== */
let confettiCanvas = null;
let confettiCtx = null;
let confettiParticles = [];
let confettiAnimationId = null;

function initConfetti() {
  confettiCanvas = document.getElementById('confettiCanvas');
  if (!confettiCanvas) {
    confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confettiCanvas';
    document.body.appendChild(confettiCanvas);
  }
  confettiCtx = confettiCanvas.getContext('2d');
  
  function resize() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
}

function triggerConfettiBurst(count = 60) {
  if (!confettiCanvas || !confettiCtx) return;
  
  const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#06b6d4'];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.4;
  
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    confettiParticles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      life: 1,
      decay: 0.012 + Math.random() * 0.015
    });
  }
  
  if (!confettiAnimationId) {
    updateConfetti();
  }
}

function updateConfetti() {
  if (!confettiCtx || !confettiCanvas) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2; // gravity
    p.rotation += p.vRotation;
    p.life -= p.decay;
    
    if (p.life <= 0) {
      confettiParticles.splice(i, 1);
      continue;
    }
    
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.globalAlpha = Math.max(0, p.life);
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    confettiCtx.restore();
  }
  
  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(updateConfetti);
  } else {
    confettiAnimationId = null;
  }
}

/* ========================================================
   INTERACTIVE QUIZ PLAYZONE (Live Mini Game Engine)
   ======================================================== */
const QUIZ_DATA = {
  maths: [
    {
      prompt: "How many friendly apples do you see in the basket?",
      visual: "🍎 🍎 🍎 🍎 🍎",
      audioText: "How many friendly apples do you see in the basket?",
      options: ["3 Apples", "4 Apples", "5 Apples", "6 Apples"],
      correct: 2,
      explanation: "Awesome job! Count them together: 1, 2, 3, 4, 5 shiny red apples! 🌟"
    },
    {
      prompt: "What comes next in the number line: 2, 4, 6, ___?",
      visual: "🔢 2 ➔ 4 ➔ 6 ➔ ❓",
      audioText: "What comes next in the number line: 2, 4, 6?",
      options: ["7", "8", "9", "10"],
      correct: 1,
      explanation: "Superstar! We are skipping by 2s: 2, 4, 6, and 8! 🎉"
    },
    {
      prompt: "Which shape has 3 straight sides and 3 corners?",
      visual: "🔺 📐 🔺",
      audioText: "Which shape has three straight sides and three corners?",
      options: ["Square", "Triangle", "Circle", "Star"],
      correct: 1,
      explanation: "Spot on! A triangle has exactly 3 sides and 3 joyful corners! 📐"
    }
  ],
  phonics: [
    {
      prompt: "Which letter makes the sound 'Buh' like 'Bear' & 'Ball'?",
      visual: "🐻 ⚽ 🎈",
      audioText: "Which letter makes the sound Buh like Bear and Ball?",
      options: ["Letter A", "Letter B", "Letter D", "Letter P"],
      correct: 1,
      explanation: "Hooray! 'B' is for Bear, Ball, and Balloon! B-b-bear! 🐻"
    },
    {
      prompt: "Pick the word that rhymes with 'CAT'!",
      visual: "🐱 🎩 ☀️",
      audioText: "Pick the word that rhymes with cat!",
      options: ["DOG", "HAT", "SUN", "PUP"],
      correct: 1,
      explanation: "Brilliant! Cat and Hat rhyme! C-AT and H-AT! 🎩"
    }
  ],
  shapes: [
    {
      prompt: "Find the bright yellow STAR shape!",
      visual: "🔵 🟩 ⭐ 🟣",
      audioText: "Find the bright yellow star shape!",
      options: ["Circle 🔵", "Square 🟩", "Star ⭐", "Oval 🟣"],
      correct: 2,
      explanation: "You got it! The star twinkles bright like in the sky! ⭐"
    }
  ],
  logic: [
    {
      prompt: "Which animal is the BIGGEST?",
      visual: "🐜 🐶 🐘 🐱",
      audioText: "Which animal is the biggest?",
      options: ["Ant", "Puppy", "Elephant", "Kitten"],
      correct: 2,
      explanation: "Great thinking! The friendly elephant is the biggest of all! 🐘"
    }
  ]
};

let currentCategory = 'maths';
let currentQuestionIdx = 0;
let currentSmartScore = 80;

function initQuizPlayzone() {
  const tabs = document.querySelectorAll('.topic-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-topic') || 'maths';
      currentQuestionIdx = 0;
      playPopSound();
      renderCurrentQuestion();
    });
  });

  const voiceBtn = document.getElementById('playzoneVoiceBtn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      const q = QUIZ_DATA[currentCategory][currentQuestionIdx];
      if (q && q.audioText) {
        speakText(q.audioText);
      }
    });
  }

  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const questions = QUIZ_DATA[currentCategory] || QUIZ_DATA['maths'];
  const q = questions[currentQuestionIdx % questions.length];
  
  const promptEl = document.getElementById('playzonePromptText');
  const visualEl = document.getElementById('playzoneVisualContent');
  const optionsWrap = document.getElementById('playzoneOptionsGrid');
  const feedbackEl = document.getElementById('playzoneFeedback');
  const scoreEl = document.getElementById('playzoneScoreValue');

  if (scoreEl) scoreEl.textContent = currentSmartScore;
  if (feedbackEl) {
    feedbackEl.className = 'feedback-banner';
    feedbackEl.style.display = 'none';
  }

  if (promptEl) promptEl.textContent = q.prompt;
  if (visualEl) visualEl.textContent = q.visual;

  if (optionsWrap) {
    optionsWrap.innerHTML = '';
    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${optText}</span> <span class="opt-badge">🎯</span>`;
      btn.addEventListener('click', () => handleOptionClick(btn, idx, q));
      optionsWrap.appendChild(btn);
    });
  }
}

function handleOptionClick(selectedBtn, selectedIdx, question) {
  const isCorrect = selectedIdx === question.correct;
  const feedbackEl = document.getElementById('playzoneFeedback');
  const allOptionBtns = document.querySelectorAll('.option-btn');
  
  allOptionBtns.forEach(b => b.disabled = true);

  if (isCorrect) {
    playSuccessChime();
    triggerConfettiBurst(80);
    selectedBtn.classList.add('correct');
    currentSmartScore = Math.min(100, currentSmartScore + 10);
    
    if (feedbackEl) {
      feedbackEl.className = 'feedback-banner show-correct';
      feedbackEl.innerHTML = `
        <div>
          <strong>🎉 Excellent Job!</strong>
          <p>${question.explanation}</p>
        </div>
        <button id="nextQuestionBtn" class="btn-playful btn-green-fun" style="padding:8px 18px; font-size:0.95rem;">Next Question ➔</button>
      `;
      feedbackEl.style.display = 'flex';
      
      const nextBtn = document.getElementById('nextQuestionBtn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentQuestionIdx++;
          playPopSound();
          renderCurrentQuestion();
        });
      }
    }
  } else {
    playWrongSound();
    selectedBtn.classList.add('wrong');
    allOptionBtns[question.correct].classList.add('correct');
    currentSmartScore = Math.max(0, currentSmartScore - 5);
    
    if (feedbackEl) {
      feedbackEl.className = 'feedback-banner show-wrong';
      feedbackEl.innerHTML = `
        <div>
          <strong>💡 Keep Trying!</strong>
          <p>${question.explanation}</p>
        </div>
        <button id="retryQuestionBtn" class="btn-playful btn-amber-fun" style="padding:8px 18px; font-size:0.95rem;">Try Next ➔</button>
      `;
      feedbackEl.style.display = 'flex';
      
      const retryBtn = document.getElementById('retryQuestionBtn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          currentQuestionIdx++;
          playPopSound();
          renderCurrentQuestion();
        });
      }
    }
  }

  const scoreEl = document.getElementById('playzoneScoreValue');
  if (scoreEl) scoreEl.textContent = currentSmartScore;
}

/* ========================================================
   SPEECH SYNTHESIS (VOICE READ-ALOUD)
   ======================================================== */
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.15; // friendly, gentle pitch
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}

function initSpeechReadAloud() {
  document.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToSpeak = btn.getAttribute('data-speak');
      if (textToSpeak) {
        playPopSound();
        speakText(textToSpeak);
      }
    });
  });
}

/* ========================================================
   MILESTONE INTERACTIVE MODAL PREVIEWS
   ======================================================== */
const MILESTONE_INFO = {
  alphabet: {
    title: "🔤 Alphabet & Phonics Adventure",
    subtitle: "Say letter sounds, build first words & sing cheerful ABCs!",
    badge: "Letter Sound Mastery",
    icon: "🔤",
    demoText: "The friendly Letter 'A' says 'Ah' as in Apple and Astronaut!",
    sampleSound: "Letter A says ah! Apple, Astronaut, Adventure!",
    actionLabel: "Practice Letter A to Z"
  },
  numbers: {
    title: "🔢 Numbers & Cheerful Counting",
    subtitle: "Count cheerful toys, master 1 to 100 and count along with music!",
    badge: "Math Foundation",
    icon: "🔢",
    demoText: "Count the smiling stars: 1, 2, 3, 4, 5 stars in the sky!",
    sampleSound: "One, two, three, four, five! High five!",
    actionLabel: "Practice Numbers 1 to 20"
  },
  stories: {
    title: "📚 Reading & Little Stories",
    subtitle: "Voice read-aloud tales that boost imagination, vocabulary and focus!",
    badge: "Early Reading",
    icon: "📚",
    demoText: "The cute lion cub and puppy went on a treasure hunt in the green jungle.",
    sampleSound: "The cute lion cub and puppy went on a treasure hunt!",
    actionLabel: "Read Free Story"
  },
  drawing: {
    title: "🎨 Drawing & Cheerful Colors",
    subtitle: "Mix joyful colors, recognize primary shades, and doodle fun shapes!",
    badge: "Creativity & Art",
    icon: "🎨",
    demoText: "Mix Red and Yellow to create bright warm Orange!",
    sampleSound: "Red and yellow make bright sunshine orange!",
    actionLabel: "Color the Shapes"
  },
  math: {
    title: "🚀 Fun Math & Logic Puzzles",
    subtitle: "Add with cute fruit counters, find smart patterns & solve puzzles!",
    badge: "Logic & Problem Solving",
    icon: "🚀",
    demoText: "2 apples + 3 apples = 5 delicious apples!",
    sampleSound: "Two plus three equals five!",
    actionLabel: "Play Math Puzzles"
  },
  fruits: {
    title: "🍎 Fruits & Vegetables Discovery",
    subtitle: "Learn names, vitamins, healthy habits, and vibrant food colors!",
    badge: "Health & Nutrition",
    icon: "🍎",
    demoText: "Carrots are crunchy orange vegetables that help you see well!",
    sampleSound: "Crunchy orange carrots are full of healthy vitamins!",
    actionLabel: "Explore Food Games"
  },
  body: {
    title: "🖐️ First Words & Body Parts",
    subtitle: "Discover eyes, ears, hands, everyday polite words, and manners!",
    badge: "Daily Foundations",
    icon: "🖐️",
    demoText: "Two eyes to see, two ears to listen, and two hands to clap!",
    sampleSound: "Two eyes to see, two ears to hear, and two hands to clap!",
    actionLabel: "Explore Body & Words"
  }
};

function initMilestoneModals() {
  const modal = document.getElementById('milestoneModal');
  const closeBtn = document.getElementById('closeMilestoneModal');
  const cards = document.querySelectorAll('.milestone-node-card');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-milestone');
      const data = MILESTONE_INFO[key];
      if (!data) return;

      playPopSound();

      document.getElementById('modalMilestoneIcon').textContent = data.icon;
      document.getElementById('modalMilestoneTitle').textContent = data.title;
      document.getElementById('modalMilestoneSubtitle').textContent = data.subtitle;
      document.getElementById('modalMilestoneDemo').textContent = data.demoText;
      
      const listenBtn = document.getElementById('modalMilestoneListen');
      if (listenBtn) {
        listenBtn.onclick = () => {
          speakText(data.sampleSound);
        };
      }

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      playPopSound();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ========================================================
   LETTER TRACING MINI CANVAS GAME
   ======================================================== */
function initLetterTracingGame() {
  const openTracingBtn = document.getElementById('openTracingDemoBtn');
  const tracingModal = document.getElementById('tracingModal');
  const closeTracingBtn = document.getElementById('closeTracingModal');
  const canvas = document.getElementById('tracingCanvas');
  const clearBtn = document.getElementById('clearTracingBtn');
  const checkBtn = document.getElementById('checkTracingBtn');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let strokePoints = 0;

  function drawLetterTemplate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background guide dots for letter 'B'
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([8, 12]);
    
    // Draw guide 'B'
    ctx.font = 'bold 180px "Fredoka", sans-serif';
    ctx.fillStyle = '#f1f5f9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('B', canvas.width / 2, canvas.height / 2);
    
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeText('B', canvas.width / 2, canvas.height / 2);
    ctx.setLineDash([]);
  }

  function startDraw(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    strokePoints++;
  }

  function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    strokePoints++;
  }

  function stopDraw() {
    isDrawing = false;
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDraw);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDraw(e);
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
  }, { passive: false });
  window.addEventListener('touchend', stopDraw);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      strokePoints = 0;
      drawLetterTemplate();
      playPopSound();
    });
  }

  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      if (strokePoints > 20) {
        playSuccessChime();
        triggerConfettiBurst(70);
        speakText("Spectacular writing! B is for Bear!");
      } else {
        playPopSound();
        speakText("Keep tracing along the dotted letter B!");
      }
    });
  }

  if (openTracingBtn && tracingModal) {
    openTracingBtn.addEventListener('click', () => {
      tracingModal.classList.add('active');
      drawLetterTemplate();
      playPopSound();
      speakText("Trace the letter B with your finger or mouse!");
    });
  }

  if (closeTracingBtn && tracingModal) {
    closeTracingBtn.addEventListener('click', () => {
      tracingModal.classList.remove('active');
      playPopSound();
    });
  }
}

/* ========================================================
   STICKY NAVBAR DYNAMICS
   ======================================================== */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
