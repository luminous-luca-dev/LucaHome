const works = [
  ['加賀美インダストリアル非公式ファンサイト', ['VanillaJS', 'supabase'], '30,000 PV / week · 10,000 sessions', 'ファンコミュニティ向けの情報集約サイト。SEO最適化とUX設計により高トラフィックを実現。'],
  ['Browser Game', ['React', 'Canvas API'], '1,200 DAU', 'ブラウザ上で完結するリアルタイムゲーム。パフォーマンスボトルネックを特定し60fps安定稼働。'],
  ['Analytics Dashboard', ['Python', 'FastAPI', 'React'], 'Internal tool · 15 users', 'データパイプラインと可視化基盤の一気通貫実装。チームの意思決定速度を大幅に改善。'],
];
const skills = { Frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], Backend: ['Python', 'Go', 'FastAPI', 'Node.js'], Systems: ['C', 'C++', 'Supabase', 'MySQL'], Certifications: ['基本情報技術者', 'MOS Word 365&2019', 'MOS Excel 365&2019', '映像音響処理技術者'] };
const process = [
  ['Define', '課題の定義', 'ユーザー観察と定量データから「本当に解くべき問題」を絞り込む。'],
  ['Design', '設計と仮説', 'アーキテクチャを図示し、技術トレードオフを言語化して意思決定。'],
  ['Build', '実装と検証', 'MVP→計測→改善のサイクルを高速で回す。テストとCI/CDで品質担保。'],
  ['Reflect', '振り返りと改善', 'リリース後の数値変化を分析し、次のイテレーションにフィードバック。'],
];
const $ = (selector) => document.querySelector(selector);

function renderContent() {
  $('#works-grid').innerHTML = works.map(([title, tags, metrics, description]) => `<article class="work-card"><h3>${title}</h3><div class="tags">${tags.map((tag) => `<span>${tag}</span>`).join('')}</div><p class="metrics">${metrics}</p><p class="description">${description}</p></article>`).join('');
  $('#process-list').innerHTML = process.map(([step, title, description], index) => `<div class="process-step"><div class="process-label">${step}</div><div><h3>${title}</h3><p>${description}</p></div></div>`).join('');
  $('#skills-grid').innerHTML = Object.entries(skills)
    .map(([group, items]) => `<div class="skill-group"><h3>${group}</h3><ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul></div>`)
    .join('');
}

const stars = [
  [80, 120, 1.2],
  [150, 60, 0.8],
  [230, 180, 1.5],
  [310, 90, 0.9],
  [420, 50, 1.1],
  [550, 80, 0.7],
  [660, 140, 1.3],
  [740, 70, 1],
  [820, 110, 0.8],
  [900, 50, 1.4],
  [950, 200, 0.9],
  [930, 350, 1.2],
  [880, 480, 0.7],
  [940, 620, 1.1],
  [900, 750, 0.8],
  [820, 870, 1.3],
  [700, 940, 0.9],
  [560, 960, 1.2],
  [400, 920, 0.7],
  [260, 880, 1],
  [130, 800, 1.4],
  [60, 680, 0.8],
  [40, 550, 1.1],
  [70, 400, 0.9],
  [50, 260, 1.2],
  [180, 380, 0.6],
  [300, 280, 0.9],
  [450, 160, 0.7],
  [620, 220, 1],
  [770, 290, 0.8],
  [860, 380, 0.7],
  [750, 460, 0.5],
  [650, 380, 0.8],
  [340, 440, 0.6],
  [190, 500, 0.7],
];
function backgroundSvg() {
  const starMarkup = stars.map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" class="star star-${i}">`).join('');
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2,
      r1 = 378,
      r2 = i % 6 === 0 ? 368 : 373;
    return `<line x1="${500 + r1 * Math.cos(a)}" y1="${500 + r1 * Math.sin(a)}" x2="${500 + r2 * Math.cos(a)}" y2="${500 + r2 * Math.sin(a)}" class="gold-line">`;
  }).join('');
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2,
      r1 = 36,
      r2 = i % 3 === 0 ? 58 : 46;
    return `<line x1="${r1 * Math.cos(a)}" y1="${r1 * Math.sin(a)}" x2="${r2 * Math.cos(a)}" y2="${r2 * Math.sin(a)}" class="sun-ray">`;
  }).join('');
  return `<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="gold-glow"><stop offset="0" stop-color="#c9a84c" stop-opacity=".35"/><stop offset="1" stop-color="#c9a84c" stop-opacity="0"/></radialGradient><radialGradient id="day-glow" cx="50%" cy="35%" r="55%"><stop offset="0" stop-color="#fff8e7" stop-opacity=".5"/><stop offset="1" stop-color="#f5f0e8" stop-opacity="0"/></radialGradient><radialGradient id="night-glow"><stop offset="0" stop-color="#1a1535" stop-opacity=".35"/><stop offset="1" stop-color="#0d0c0a" stop-opacity="0"/></radialGradient></defs><rect width="1000" height="1000" fill="url(#day-glow)" class="day-glow"><rect width="1000" height="1000" fill="url(#night-glow)" class="night-glow"><rect width="1000" height="1000" fill="url(#gold-glow)" class="gold-glow">${starMarkup}<g class="outer-ring">${ticks}<circle cx="500" cy="500" r="380" class="gold-circle"></g><g class="middle-ring"><circle cx="500" cy="500" r="290" class="gold-circle"></g><g class="orb"><g class="sun" transform="translate(500 170)">${rays}<circle r="32" class="sun-core"/><circle r="24" class="sun-core second"/><circle r="16" class="sun-core third"/></g><g class="moon" transform="translate(500 830)"><circle r="42" class="moon-core"/><path d="M-28-20Q-55 0-28 22Q-10 32 10 28Q-30 10-28-20Z" class="crescent"/></g></g><g class="scale" transform="translate(500 500)"><line x1="0" y1="-60" x2="0" y2="60" class="gold-line"/><line x1="-90" y1="-20" x2="90" y2="-20" class="gold-line"/><line x1="-90" y1="-20" x2="-90" y2="10" class="gold-line"/><ellipse cx="-90" cy="18" rx="22" ry="5" class="gold-circle"/><line x1="90" y1="-20" x2="90" y2="10" class="gold-line"/><ellipse cx="90" cy="18" rx="22" ry="5" class="gold-circle"/><polygon points="0,55 -12,70 12,70" class="gold-circle"/><circle cy="-20" r="4" class="gold-circle"/></g><circle cx="500" cy="500" r="160" class="inner-circle"/></svg>`;
}
function loadingSvg(progress) {
  const size = 180,
    center = 90,
    radius = 78,
    circumference = 2 * Math.PI * radius,
    offset = circumference * (1 - progress),
    ticks = Array.from({ length: 36 }, (_, i) => {
      const a = (i / 36) * Math.PI * 2 - Math.PI / 2,
        r1 = 83,
        r2 = 83 + (i % 9 === 0 ? 11 : 8);
      return `<line x1="${center + r1 * Math.cos(a)}" y1="${center + r1 * Math.sin(a)}" x2="${center + r2 * Math.cos(a)}" y2="${center + r2 * Math.sin(a)}" class="loading-tick"/>`;
    }).join('');
  return `<svg viewBox="0 0 ${size} ${size}"><circle cx="90" cy="90" r="78" class="loading-track"/><circle cx="90" cy="90" r="78" class="loading-progress" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>${ticks}<circle cx="90" cy="90" r="56" class="loading-mid" transform="rotate(${progress * 288} 90 90)"/><circle cx="90" cy="90" r="36" class="loading-inner" transform="rotate(${progress * 720} 90 90)"/><circle cx="90" cy="90" r="22" class="loading-inner reverse" transform="rotate(${-progress * 504} 90 90)"/><circle cx="90" cy="90" r="3" class="loading-dot"/><text x="90" y="80" text-anchor="middle" class="loading-percent">${Math.round(progress * 100)}</text><text x="90" y="98" text-anchor="middle" class="loading-label">LOADING</text></svg>`;
}
function updateTheme() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const t = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
  const lerp = (a, b) => Math.round(a + (b - a) * t);
  const bg = `${lerp(245, 13)},${lerp(240, 12)},${lerp(232, 10)}`;
  const fg = `${lerp(26, 237)},${lerp(22, 232)},${lerp(16, 222)}`;
  document.documentElement.style.setProperty('--bg', bg);
  document.documentElement.style.setProperty('--fg', fg);
  document.documentElement.style.setProperty('--t', t);
  $('.scroll-background').style.setProperty('--rotation', `${t * 180}deg`);
  $('.scroll-background').style.setProperty('--middle-rotation', `${t * -108}deg`);
  $('.scroll-background').style.setProperty('--scale-tilt', `${Math.sin(t * Math.PI) * 8}deg`);
  $('.scroll-background .scale').style.transform = `translate(500px,500px) rotate(${Math.sin(t * Math.PI) * 8}deg)`;
}
function startLoading() {
  const screen = $('#loading-screen'),
    ring = $('#loading-ring'),
    rule = $('#loading-rule'),
    start = performance.now(),
    duration = 2400;
  function frame(now) {
    const p = Math.min((now - start) / duration, 1),
      eased = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
    ring.innerHTML = loadingSvg(eased);
    rule.style.width = `${eased * 120}px`;
    if (p < 1) requestAnimationFrame(frame);
    else {
      screen.classList.add('fade');
      setTimeout(() => screen.remove(), 600);
    }
  }
  requestAnimationFrame(frame);
}
renderContent();
$('#scroll-background').innerHTML = backgroundSvg();
window.addEventListener('scroll', updateTheme, { passive: true });
window.addEventListener('resize', updateTheme);
updateTheme();
startLoading();
