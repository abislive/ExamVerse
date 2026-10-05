'use strict';

/* ============================================================
   Option builder (used only by the generator path)
============================================================ */
function mk(q, correct, wrongs){
  const c = String(correct);
  const uniq = [c];

  for(const w of (wrongs || [])){
    const s = String(w);
    if(s && s !== c && uniq.indexOf(s) === -1) uniq.push(s);
    if(uniq.length >= 4) break;
  }

  if(uniq.length < 4){
    const num = Number(c);
    if(c.trim() !== '' && Number.isFinite(num)){
      let k = 1;
      while(uniq.length < 4 && k < 400){
        const cands = [num + k, num - k, num + 10 * k, num - 10 * k, num * 2, num / 2];
        for(const cand of cands){
          if(uniq.length >= 4) break;
          const s = fmt(cand);
          if(s !== c && uniq.indexOf(s) === -1) uniq.push(s);
        }
        k++;
      }
    } else {
      const muts = [
        c.toUpperCase(), c.toLowerCase(),
        c.split('').reverse().join(''),
        c.length > 2 ? c.slice(1) + c[0] : c + '·',
        c.length > 3 ? c.slice(0,2) + c.slice(3) : c + '··',
        c + ' ✕', '✕ ' + c
      ];
      for(const s of muts){
        if(uniq.length >= 4) break;
        if(s !== c && uniq.indexOf(s) === -1) uniq.push(s);
      }
      let k = 1;
      while(uniq.length < 4){
        const s = c + ' ' + '·'.repeat(k++);
        if(uniq.indexOf(s) === -1) uniq.push(s);
      }
    }
  }

  if(uniq.length < 4) return null;

  const opts = shuffle(uniq.slice(0, 4));
  return { q: q, opts: opts, ans: opts.indexOf(c) };
}

/* ============================================================
   Exam state
============================================================ */
const S = {
  level:null, subjectKey:null, bankKey:null, diff:1,
  questions:[], answers:[], marked:new Set(), cur:0,
  timeLeft:7200, timerId:null, started:false, submitted:false,
  cfg:{ numQ:100, marksPerQ:2, totalMarks:200, durationSec:7200 }
};

/* ============================================================
   DOM helpers
============================================================ */
function $(id){ return document.getElementById(id); }
function el(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html != null) e.innerHTML = html;
  return e;
}
function safeText(s){ return String(s == null ? '' : s); }

const STEP_MAP = {
  's-level':1, 's-subject':2, 's-lang':3, 's-ready':3,
  's-exam':4, 's-result':5, 's-review':5
};

function renderSteps(screenId){
  const cur = STEP_MAP[screenId] || 1;
  const wrap = $('steps');
  wrap.innerHTML = '';
  const labels = [u('step1'), u('step2'), u('step3'), u('step4'), u('step5')];
  labels.forEach(function(lab, i){
    const n = i + 1;
    const d = el('div', 'step' + (n === cur ? ' on' : n < cur ? ' done' : ''));
    d.appendChild(el('span','dot'));
    d.appendChild(el('span','', n + '. ' + lab));
    wrap.appendChild(d);
  });
}

function show(id){
  document.querySelectorAll('.screen').forEach(function(s){
    s.classList.remove('active'); s.classList.add('hidden');
  });
  const target = $(id);
  target.classList.remove('hidden');
  target.classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });
  renderSteps(id);
}

/* ============================================================
   Language
============================================================ */
function applyLanguage(){
  document.documentElement.lang = LANG;
  document.body.dir = (LANG === 'ur') ? 'rtl' : 'ltr';

  $('brandName').textContent = u('brand');
  $('tagline').textContent   = u('tagline');
  $('tLevel').textContent    = u('tLevel');
  $('sLevel').textContent    = u('sLevel');
  $('tSubject').textContent  = u('tSubject');
  $('tLang').textContent     = u('tLang');
  $('sLang').textContent     = u('sLang');
  $('tReady').textContent    = u('tReady');
  $('sReady').textContent    = u('sReady');

  $('kSubject').textContent  = u('kSubject');
  $('kLevel').textContent    = u('kLevel');
  $('kLang').textContent     = u('kLang');
  $('kQ').textContent        = u('kQ');
  $('kMarks').textContent    = u('kMarks');
  $('kTotal').textContent    = u('kTotal');
  $('kTime').textContent     = u('kTime');
  $('kPass').textContent     = u('kPass');

  $('backLevel').textContent   = u('back');
  $('backSubject').textContent = u('back');
  $('backLang').textContent    = u('back');
  $('btnReady').textContent    = u('startExam');

  $('btnPrev').textContent  = u('prev');
  $('btnNext').textContent  = u('next');
  $('btnClear').textContent = u('clear');
  $('btnMark').textContent  = u('mark');
  $('btnSubmitTop').textContent = u('submit');
  $('palTitle').textContent = u('palTitle');
  $('lgAns').textContent  = u('lgAns');
  $('lgMark').textContent = u('lgMark');
  $('lgNot').textContent  = u('lgNot');

  $('mOk').textContent     = u('mOk');
  $('mCancel').textContent = u('mCancel');

  $('ringLbl').textContent   = u('scoreLbl');
  $('btnReview').textContent = u('review');
  $('btnRetake').textContent = u('retake');
  $('btnHome').textContent   = u('home');

  $('tReview').textContent       = u('tReview');
  $('btnBackResult').textContent = u('backResult');
  $('footNote').textContent      = u('footNote');

  $('rulesList').innerHTML = ['rules','rules2','rules3','rules4','rules5']
    .map(function(k){ return '<li>' + u(k) + '</li>'; }).join('');

  refreshReadyPanel();

  const active = document.querySelector('.screen.active');
  renderSteps(active ? active.id : 's-level');
}

/* ============================================================
   Exam config — dynamic based on selected bank
============================================================ */
function computeConfig(){
  const fixed = (typeof FIXED_BANKS !== 'undefined') && FIXED_BANKS[S.bankKey];
  if(fixed && Array.isArray(fixed) && fixed.length > 0){
    const n = fixed.length;
    return {
      numQ: n,
      marksPerQ: 1,
      totalMarks: n,
      durationSec: Math.max(60, n * 60) /* 1 min per question, min 1 min */
    };
  }
  return {
    numQ: TARGET_QUESTIONS,
    marksPerQ: 2,
    totalMarks: TARGET_QUESTIONS * 2,
    durationSec: 7200
  };
}

function fmtDuration(sec){
  const m = Math.floor(sec / 60);
  return m + ' ' + u('minutes');
}

function refreshReadyPanel(){
  const c = computeConfig();
  S.cfg = c;
  if($('vQ'))     $('vQ').textContent     = c.numQ;
  if($('vMarks')) $('vMarks').textContent = c.marksPerQ;
  if($('vTotal')) $('vTotal').textContent = c.totalMarks;
  if($('vTime'))  $('vTime').textContent  = fmtDuration(c.durationSec);
}

/* ============================================================
   Screen builders
============================================================ */
function buildLevels(){
  const g = $('levelGrid');
  g.innerHTML = '';
  LEVELS.forEach(function(lv, i){
    const c = el('button','card');
    c.type = 'button';
    c.style.animationDelay = (i * 45) + 'ms';
    c.innerHTML =
      '<span class="ico">' + lv.icon + '</span>' +
      '<div class="nm">' + (lv.name[idx()] || lv.name[0]) + '</div>' +
      '<div class="meta"><span class="badge">' + lv.subjects.length + ' ' +
      u('step2').toLowerCase() + '</span></div>';
    c.onclick = function(){ S.level = lv; buildSubjects(lv); show('s-subject'); };
    g.appendChild(c);
  });
}

function buildSubjects(lv){
  $('sSubject').textContent = (lv.name[idx()] || lv.name[0]) + ' · ' + u('tSubject');
  const g = $('subjectGrid');
  g.innerHTML = '';
  lv.subjects.forEach(function(s, i){
    const c = el('button','card');
    c.type = 'button';
    c.style.animationDelay = (i * 40) + 'ms';
    const bankKey = s[1];
    const isFixed = (typeof FIXED_BANKS !== 'undefined') && FIXED_BANKS[bankKey];
    const numQ = isFixed ? FIXED_BANKS[bankKey].length : TARGET_QUESTIONS;
    const mk_ = isFixed ? 1 : 2;
    c.innerHTML =
      '<span class="ico">' + s[2] + '</span>' +
      '<div class="nm">' + sname(s[0]) + '</div>' +
      '<div class="meta"><span class="badge c">' + numQ + ' Q</span>' +
      '<span class="badge g">' + (numQ * mk_) + ' ' + u('stMarks') + '</span></div>';
    c.onclick = function(){
      g.querySelectorAll('.card').forEach(function(x){ x.classList.remove('sel'); });
      c.classList.add('sel');
      S.subjectKey = s[0];
      S.bankKey = bankKey;
      S.diff = lv.d;
      setTimeout(buildLangs, 220);
    };
    g.appendChild(c);
  });
}

function buildLangs(){
  const g = $('langGrid');
  g.innerHTML = '';
  LANG_INFO.forEach(function(L, i){
    const c = el('button','card');
    c.type = 'button';
    c.style.animationDelay = (i * 45) + 'ms';
    c.innerHTML =
      '<span class="ico">' + L.flag + '</span>' +
      '<div class="nm">' + L.native + '</div>' +
      '<div class="meta"><span class="badge">' + L.code.toUpperCase() + '</span></div>';
    c.onclick = function(){
      setLang(L.code);
      applyLanguage();
      buildLevels();
      if(S.level) buildSubjects(S.level);
      buildLangs();
      goReady();
    };
    g.appendChild(c);
  });
  show('s-lang');
}

function goReady(){
  $('vSubject').textContent = sname(S.subjectKey);
  $('vLevel').textContent   = S.level.name[idx()] || S.level.name[0];
  const li = LANG_INFO.filter(function(l){ return l.code === LANG; })[0];
  $('vLang').textContent    = li ? li.native : LANG;
  refreshReadyPanel();
  show('s-ready');
}

/* ============================================================
   Exam generation
============================================================ */
const TARGET_QUESTIONS = 100;

/* Build from FIXED_BANKS[S.bankKey] */
function buildFromFixed(bank){
  const out = [];
  bank.forEach(function(raw){
    if(!raw || !raw.question || !Array.isArray(raw.options)) return;
    const opts = raw.options.map(String);
    const ansIdx = opts.indexOf(String(raw.answer));
    if(ansIdx < 0) return;
    out.push({ q: String(raw.question), opts: opts.slice(), ans: ansIdx });
  });
  return out;
}

/* Generator path */
function buildPool(gens, diff, target){
  const seen = new Set();
  const out = [];
  let pass = 0;

  while(out.length < target && pass < 500){
    pass++;
    for(let gi = 0; gi < gens.length && out.length < target; gi++){
      let r;
      try { r = gens[gi](diff); } catch(e){ continue; }
      if(!r || !r.q) continue;
      const q = mk(r.q, r.correct, r.wrongs);
      if(!q) continue;
      if(seen.has(q.q)) continue;
      seen.add(q.q);
      out.push(q);
    }
  }
  return out;
}

function generateExam(){
  /* ---------- Fixed PDF bank ---------- */
  if(typeof FIXED_BANKS !== 'undefined' && FIXED_BANKS[S.bankKey]){
    const built = buildFromFixed(FIXED_BANKS[S.bankKey]);
    if(built.length > 0){
      /* Shuffle so retakes give a fresh order; use every question. */
      return shuffle(built.slice());
    }
  }

  /* ---------- Generator path (existing behaviour) ---------- */
  const primary = BANKS[S.bankKey] || GENERAL;
  let pool = buildPool(primary, S.diff, TARGET_QUESTIONS);

  if(pool.length < TARGET_QUESTIONS){
    const family = {
      social:  [SOCIAL, RESEARCH, ENGLISH],
      english: [ENGLISH, SOCIAL, RESEARCH],
      commerce:[COMMERCE, RESEARCH, MATH],
      research:[RESEARCH, SOCIAL, COMMERCE],
      medicine:[MEDICINE, BIOLOGY, CHEMISTRY],
      cs:      [CS, MATH, RESEARCH],
      engineering:[ENGINEERING, PHYSICS, MATH],
      general: [GENERAL, PHYSICS, CHEMISTRY, BIOLOGY, MATH],
      math:    [MATH, PHYSICS, GENERAL],
      physics: [PHYSICS, MATH, ENGINEERING],
      chemistry:[CHEMISTRY, BIOLOGY, PHYSICS],
      biology: [BIOLOGY, CHEMISTRY, MEDICINE]
    }[S.bankKey] || [GENERAL];

    const seen = new Set(pool.map(function(q){ return q.q; }));
    for(const extra of family){
      if(pool.length >= TARGET_QUESTIONS) break;
      const more = buildPool(extra, S.diff, TARGET_QUESTIONS);
      for(const q of more){
        if(pool.length >= TARGET_QUESTIONS) break;
        if(seen.has(q.q)) continue;
        seen.add(q.q);
        pool.push(q);
      }
    }
  }

  let pad = 1;
  while(pool.length < TARGET_QUESTIONS){
    const r = MATH[pool.length % MATH.length](S.diff);
    const q = mk(r.q + '  (' + pad + ')', r.correct, r.wrongs);
    if(q){ pool.push(q); pad++; } else { break; }
  }

  return pool.slice(0, TARGET_QUESTIONS);
}

/* ============================================================
   Exam UI
============================================================ */
function startExam(){
  seedRNG((Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0);

  S.cfg = computeConfig();
  S.questions = generateExam();
  S.answers = new Array(S.questions.length).fill(null);
  S.marked  = new Set();
  S.cur     = 0;
  S.timeLeft = S.cfg.durationSec;
  S.submitted = false;

  $('exSubject').textContent = sname(S.subjectKey);
  $('exLevel').textContent   = S.level.name[idx()] || S.level.name[0];

  buildPalette();
  renderQuestion();
  updateTimerUI();
  show('s-exam');

  clearInterval(S.timerId);
  S.timerId = setInterval(function(){
    S.timeLeft--;
    updateTimerUI();
    if(S.timeLeft <= 0){
      S.timeLeft = 0;
      updateTimerUI();
      clearInterval(S.timerId);
      openModal(u('timeUp'), u('timeUpMsg'), finishExam);
      setTimeout(function(){
        if($('modal').classList.contains('on')) finishExam();
      }, 2600);
    }
  }, 1000);

  S.started = true;
}

function updateTimerUI(){
  const t = Math.max(0, S.timeLeft);
  const h = String(Math.floor(t / 3600)).padStart(2,'0');
  const m = String(Math.floor((t % 3600) / 60)).padStart(2,'0');
  const s = String(t % 60).padStart(2,'0');
  const box = $('timer');
  box.textContent = h + ':' + m + ':' + s;
  box.classList.remove('warn','danger');
  if(t <= 300) box.classList.add('danger');
  else if(t <= 900) box.classList.add('warn');
}

function buildPalette(){
  const g = $('pgrid');
  g.innerHTML = '';
  S.questions.forEach(function(_, i){
    const d = el('button','pnum', String(i + 1));
    d.type = 'button';
    d.setAttribute('aria-label', 'Go to question ' + (i + 1));
    d.onclick = function(){
      S.cur = i;
      renderQuestion();
      const pal = $('palette');
      if(pal && pal.classList.contains('open')){
        pal.classList.remove('open');
        $('paletteBackdrop').classList.remove('on');
      }
    };
    g.appendChild(d);
  });
}

function refreshPalette(){
  const nodes = $('pgrid').children;
  for(let i = 0; i < nodes.length; i++){
    let cls = 'pnum';
    if(S.answers[i] != null) cls += ' ans';
    if(S.marked.has(i))      cls += ' mark';
    if(i === S.cur)          cls += ' cur';
    nodes[i].className = cls;
  }
}

function renderQuestion(){
  const q = S.questions[S.cur];
  if(!q) return;

  $('qIndex').textContent = u('qOf')
    .replace('{a}', S.cur + 1)
    .replace('{b}', S.questions.length);
  $('qMarks').textContent = '+' + S.cfg.marksPerQ + ' ' + u('stMarks');

  const qt = $('qText');
  qt.textContent = safeText(q.q);

  const box = $('options');
  box.innerHTML = '';
  const keys = ['A','B','C','D','E','F'];
  q.opts.forEach(function(o, i){
    const d = el('button','opt' + (S.answers[S.cur] === i ? ' sel' : ''));
    d.type = 'button';
    d.setAttribute('role', 'radio');
    d.setAttribute('aria-checked', S.answers[S.cur] === i ? 'true' : 'false');
    d.style.animationDelay = (i * 55) + 'ms';
    d.innerHTML = '<span class="key">' + keys[i] + '</span>' +
                  '<span class="txt">' + safeText(o) + '</span>';
    d.onclick = function(){ S.answers[S.cur] = i; renderQuestion(); };
    box.appendChild(d);
  });

  $('btnPrev').disabled = (S.cur === 0);
  $('btnNext').textContent = (S.cur === S.questions.length - 1) ? u('submit') : u('next');
  $('btnMark').textContent = S.marked.has(S.cur) ? '★ ' + u('mark') : u('mark');

  refreshPalette();
}

/* ============================================================
   Modal
============================================================ */
let modalAction = null;
function openModal(title, text, cb){
  $('mTitle').textContent = title;
  $('mText').textContent  = safeText(text);
  modalAction = cb;
  $('modal').classList.add('on');
  $('mOk').focus();
}
function closeModal(){
  $('modal').classList.remove('on');
  modalAction = null;
}

/* ============================================================
   Finish + result
============================================================ */
function finishExam(){
  if(S.submitted) return;
  S.submitted = true;

  clearInterval(S.timerId);
  closeModal();

  let correct = 0, wrong = 0, skipped = 0;
  S.questions.forEach(function(q, i){
    const a = S.answers[i];
    if(a == null) skipped++;
    else if(a === q.ans) correct++;
    else wrong++;
  });

  const mpq = S.cfg.marksPerQ;
  const total = S.questions.length * mpq;
  const marks = correct * mpq;
  const pct   = total > 0 ? Math.round((marks / total) * 1000) / 10 : 0;
  const passed = pct > 60;

  const circ = 540.35;
  $('ringPct').textContent = pct + '%';
  const ring = $('ringFg');
  ring.style.stroke = passed ? '#22c55e' : '#ef4444';
  ring.style.strokeDashoffset = circ;
  setTimeout(function(){
    ring.style.strokeDashoffset = circ * (1 - Math.min(pct, 100) / 100);
  }, 80);

  const v = $('verdict');
  v.className = 'verdict ' + (passed ? 'pass' : 'fail');
  v.textContent = passed ? u('passed') : u('failed');
  $('verdictSub').textContent = passed ? u('verdictPass') : u('verdictFail');

  const stats = [
    [correct, u('stCorrect'), '#22c55e'],
    [wrong,   u('stWrong'),   '#ef4444'],
    [skipped, u('stSkip'),    '#f59e0b'],
    [marks + '/' + total, u('stMarks'), '#22d3ee'],
    [pct + '%', u('stPct'), '#7c5cff']
  ];
  $('stats').innerHTML = stats.map(function(s, i){
    return '<div class="stat" style="animation:fadeUp .45s ' + (i * 70) + 'ms backwards">' +
             '<div class="v" style="color:' + s[2] + '">' + s[0] + '</div>' +
             '<div class="l">' + s[1] + '</div>' +
           '</div>';
  }).join('');

  show('s-result');
}

function buildReview(){
  const list = $('reviewList');
  list.innerHTML = '';
  const keys = ['A','B','C','D','E','F'];

  S.questions.forEach(function(q, i){
    const a = S.answers[i];
    const item = el('div','revItem');
    item.style.animationDelay = Math.min(i * 8, 600) + 'ms';

    let html = '<div class="rq">' + (i + 1) + '. ' + safeText(q.q) + '</div>';
    q.opts.forEach(function(o, j){
      let cls = 'neutral', tag = '';
      if(j === q.ans){ cls = 'ok'; tag = '<span class="revTag ok">' + u('correctAns') + '</span>'; }
      if(a === j && j !== q.ans){ cls = 'bad'; tag = '<span class="revTag bad">' + u('yourAns') + '</span>'; }
      if(a === j && j === q.ans){ tag = '<span class="revTag ok">' + u('yourAns') + ' ✓</span>'; }
      html += '<div class="ro ' + cls + '"><b>' + keys[j] + '.</b><span>' + safeText(o) + '</span>' + tag + '</div>';
    });
    if(a == null) html += '<div class="ro neutral">' + u('notAns') + '</div>';

    item.innerHTML = html;
    list.appendChild(item);
  });

  $('sReview').textContent = sname(S.subjectKey) + ' · ' +
    (S.level.name[idx()] || S.level.name[0]);
  show('s-review');
}

/* ============================================================
   Event wiring
============================================================ */
$('backLevel').onclick   = function(){ show('s-level'); };
$('backSubject').onclick = function(){ show('s-subject'); };
$('backLang').onclick    = function(){ show('s-lang'); };
$('btnReady').onclick    = startExam;

$('btnPrev').onclick = function(){ if(S.cur > 0){ S.cur--; renderQuestion(); } };
$('btnNext').onclick = function(){
  if(S.cur < S.questions.length - 1){ S.cur++; renderQuestion(); }
  else askSubmit();
};
$('btnClear').onclick = function(){ S.answers[S.cur] = null; renderQuestion(); };
$('btnMark').onclick  = function(){
  if(S.marked.has(S.cur)) S.marked.delete(S.cur);
  else S.marked.add(S.cur);
  renderQuestion();
};
$('btnSubmitTop').onclick = askSubmit;

if($('paletteToggle')){
  $('paletteToggle').onclick = function(){
    $('palette').classList.add('open');
    $('paletteBackdrop').classList.add('on');
  };
}
if($('paletteClose')){
  $('paletteClose').onclick = function(){
    $('palette').classList.remove('open');
    $('paletteBackdrop').classList.remove('on');
  };
}
if($('paletteBackdrop')){
  $('paletteBackdrop').onclick = function(){
    $('palette').classList.remove('open');
    $('paletteBackdrop').classList.remove('on');
  };
}

function askSubmit(){
  const un = S.answers.filter(function(a){ return a == null; }).length;
  openModal(u('mTitle'), u('mText').replace('{n}', un), finishExam);
}

$('mCancel').onclick = closeModal;
$('mOk').onclick = function(){ if(modalAction) modalAction(); };
$('modal').onclick = function(e){ if(e.target.id === 'modal') closeModal(); };

$('btnReview').onclick     = buildReview;
$('btnBackResult').onclick = function(){ show('s-result'); };
$('btnRetake').onclick     = function(){ S.cur = 0; S.submitted = false; startExam(); };
$('btnHome').onclick = function(){
  S.level = null; S.subjectKey = null; S.bankKey = null; S.submitted = false;
  show('s-level');
};

/* Keyboard shortcuts during exam */
document.addEventListener('keydown', function(e){
  const ex = document.getElementById('s-exam');
  if(!ex || !ex.classList.contains('active')) return;
  if(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  if(e.key === 'ArrowRight'){ $('btnNext').click(); }
  if(e.key === 'ArrowLeft'){ $('btnPrev').click(); }
  if(/^[1-6]$/.test(e.key)){
    const i = parseInt(e.key, 10) - 1;
    const opts = $('options').children;
    if(opts[i]) opts[i].click();
  }
});

/* ============================================================
   Init
============================================================ */
(function init(){
  applyLanguage();
  buildLevels();
  buildLangs();
  show('s-level');
})();
