'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import ScrollBackground from './ScrollBackground';

// ─── Section data ───────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Profile', href: '#profile' },
  { label: 'Works', href: '#works' },
  { label: 'Process', href: '#process' },
  { label: 'Skills', href: '#skills' },
];

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/luminous-luca-dev' },
  { label: 'X(Twitter)', href: 'https://x.com/Luca_lumitec' },
  { label: 'Contact', href: 'mailto:' },
];

const WORKS = [
  { title: '加賀美インダストリアル非公式ファンサイト', href: 'https://kagami-industrial-unofficial-fansite.pages.dev', image: '/works/kagami.png', tags: ['VanillaJS', 'supabase'], metrics: '30,000 PV / week · 10,000 sessions', desc: 'ファンコミュニティ向けの情報集約サイト。SEO最適化とUX設計により高トラフィックを実現。' },
  { title: 'Chat-NGT データ収集用チャットアプリ', href: 'https://luca-gpt-assemble.pages.dev', image: '/works/chat-ngt.png', tags: ['React', 'Canvas API'], metrics: '1,200 DAU', desc: 'ブラウザ上で完結するリアルタイムゲーム。パフォーマンスボトルネックを特定し60fps安定稼働。' },
  { title: 'VTuberボタン メーカー', href: 'https://vtuber-button-factory.pages.dev', image: '/works/vtuber-button.png', tags: ['Python', 'FastAPI', 'React'], metrics: 'Internal tool · 15 users', desc: 'データパイプラインと可視化基盤の一気通貫実装。チームの意思決定速度を大幅に改善。' },
  { title: 'Element Quest', href: 'https://element-quest.pages.dev', image: '/works/element.png', tags: ['Python', 'FastAPI', 'React'], metrics: 'Internal tool · 15 users', desc: 'データパイプラインと可視化基盤の一気通貫実装。チームの意思決定速度を大幅に改善。' },
];

const SUB_WORKS = [
  { title: '自己分析【極】', href: 'https://self-analysis-kiwami.pages.dev', tags: ['VanillaJS', 'supabase'], desc: 'ﾋﾞｼﾞﾈｽｱｲﾃﾞｱ大会で共同立案した 就活支援ツールのﾌﾟﾛﾄﾀｲﾌﾟ。のちのちハッカソンで採案され完成に至ったのがPolaris。' },
  { title: '新歓用プロフィールメーカー', href: 'https://profile-maker-4ls.pages.dev', tags: ['VanillaJS', 'Canvas API'], desc: '新入生歓迎会のとき、各人のプロフィール作成が面倒臭そうだったので作って共有したアプリ。' },
  { title: 'HTML開示だな', href: 'https://kaizi-htmler.pages.dev', tags: ['VanillaJS'], desc: 'Claude Codeにハマった友人が スマホでhtmlを起動したいと言うので作ったアプリ。LINEで手軽に共有できるようにtxtファイルとの互換性も備えている。' },
  { title: 'ESに文章貼り付けられる君', href: 'https://kanji-restorer.pages.dev', tags: ['VanillaJS'], desc: '某就活サービスにてペーストした文字Unicodeが狂い混乱を招いていたため思いついたツール。特に使用されてはいない。' },
];

const SKILLS = [
  { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Python', 'Go', 'FastAPI', 'Node.js'] },
  { group: 'Systems', items: ['C', 'C++', 'Supabase', 'PostgreSQL', 'Cloudflare Workers'] },
  { group: 'Certifications', items: ['基本情報技術者', 'MOS Word 365&2019', 'MOS Excel 365&2019', '映像音響処理技術者'] },
];

// ─── Main page ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('luca-theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  const t = isDark ? 1 : 0;
  const bgR = isDark ? 13 : 245;
  const bgG = isDark ? 12 : 240;
  const bgB = isDark ? 10 : 232;
  const fgR = isDark ? 237 : 26;
  const fgG = isDark ? 232 : 22;
  const fgB = isDark ? 222 : 16;
  const bgColor = `rgb(${bgR},${bgG},${bgB})`;
  const fgColor = `rgb(${fgR},${fgG},${fgB})`;
  const goldOpacity = 0.15 + t * 0.45; // gold accent becomes richer at night

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      window.localStorage.setItem('luca-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div style={{ backgroundColor: bgColor, color: fgColor, transition: 'background-color 0.45s ease, color 0.45s ease', minHeight: '100vh', fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}>
        {/* ── Marble texture overlay ── */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.04 + t * 0.03,
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")
            `,
            backgroundSize: '400px 400px',
          }}
        />

        {/* ── Celestial / Scroll Background ── */}
        <ScrollBackground isDark={isDark} />

        {/* ── Navigation ── */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid rgba(${fgR},${fgG},${fgB},0.08)` }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.1rem', letterSpacing: '0.12em', opacity: 0.9 }}>Luca's PORTFOLIO</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={{ color: fgColor, textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65, transition: 'opacity 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')} onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.65')}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <button type="button" className="theme-toggle" aria-label={isDark ? 'ライトモードに切り替える' : 'ダークモードに切り替える'} title={isDark ? 'Light mode' : 'Dark mode'} onClick={toggleTheme} style={themeToggleStyle(fgColor)}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </nav>

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section id="hero" style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 3rem', maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(0.75rem, 1vw, 0.85rem)', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1.5rem' }}>Luca = Taigo Nagata</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 1.05, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            Life has
            <br />
            <em style={{ fontStyle: 'italic', color: `rgba(201,168,76,${0.7 + t * 0.3})` }}>Mountains &amp; Valleys.</em>
          </h2>
          <p style={{ maxWidth: '480px', lineHeight: 1.8, fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', opacity: 0.7, marginBottom: '3rem' }}>
            永田のポートフォリオサイトへようこそ。ゆっくりしていってね。
            <br />
            Youth is not a time of life; it is a state of mind.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#works" style={primaryBtnStyle(fgColor, bgColor)}>
              Works
            </a>
            <a href="#profile" style={ghostBtnStyle(fgColor)}>
              Profile
            </a>
          </div>

          {/* Scroll indicator */}
          <div aria-hidden style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 1 }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', opacity: 0.4 }}>SCROLL</span>
            <div style={{ width: '1px', height: '40px', background: `linear-gradient(to bottom, ${fgColor}, transparent)`, opacity: 0.4 }} />
          </div>
        </section>

        {/* ════════════════════════════════════════
            PROFILE & PHILOSOPHY
        ════════════════════════════════════════ */}
        <section id="profile" style={sectionStyle}>
          <SectionEyebrow label="I." color={fgColor} />
          <h2 style={h2Style}>Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem' }}>
            <div>
              <p style={bodyTextStyle}>フルスタックエンジニアとして、フロントエンドからバックエンド、インフラまで一貫して設計・実装できます。 Next.jsとPythonを主軸に、データ基盤からUIまで「ユーザーの課題解決」を起点に技術選定を行います。</p>
              <p style={{ ...bodyTextStyle, marginTop: '1.5rem' }}>コードは手段であり、最終目標は「使われ、価値を生む」プロダクトです。 チームの中では、設計の議論を積極的に起こしつつ、合意後は迅速に実行に移す姿勢を大切にしています。</p>
            </div>
            <div>
              <h3 style={h3Style}>モノづくりの姿勢</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  ['論理的思考', '問題を分解し、仮説を立て、数値で検証する。感覚だけに頼らない意思決定。'],
                  ['自走力', 'タスクを与えられる前に自らゴールを設定し、最短経路を探索する。'],
                  ['協調性', '成果はチームで作るもの。コードレビューとドキュメントは丁寧に。'],
                ].map(([title, desc]) => (
                  <li key={title as string}>
                    <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.45, marginBottom: '0.3rem' }}>{title as string}</span>
                    <span style={{ fontSize: '0.9rem', lineHeight: 1.75, opacity: 0.75 }}>{desc as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            WORKS
        ════════════════════════════════════════ */}
        <section id="works" style={sectionStyle}>
          <SectionEyebrow label="II." color={fgColor} />
          <h2 style={h2Style}>Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {WORKS.map((w) => (
              <a key={w.title} href={w.href} target="_blank" rel="noreferrer" className="work-card" style={{ '--work-border': `rgba(${fgR},${fgG},${fgB},0.12)` } as React.CSSProperties}>
                {/* gold corner accent */}
                <div aria-hidden className="work-card-accent" style={{ background: `rgba(201,168,76,${goldOpacity})` }} />
                <div className="work-preview">{w.image ? <img src={w.image} alt={`${w.title} のプレビュー`} /> : <span>PROJECT PREVIEW</span>}</div>
                <h3 style={{ ...h3Style, marginBottom: '0.75rem' }}>{w.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {w.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '0.65rem', letterSpacing: '0.15em', padding: '0.2rem 0.6rem', border: `1px solid rgba(${fgR},${fgG},${fgB},0.2)`, borderRadius: '1px', opacity: 0.6 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: `rgba(201,168,76,${0.8 + t * 0.2})`, marginBottom: '0.75rem', fontVariantNumeric: 'tabular-nums' }}>{w.metrics}</p>
                <p style={{ ...bodyTextStyle, fontSize: '0.875rem' }}>{w.desc}</p>
              </a>
            ))}
          </div>
          <div className="sub-works-heading">
            <span className="sub-works-kicker">Side explorations</span>
            <h3>Sub Works</h3>
            <p>メインプロダクトの開発と並行して、閃き即行動で作られた雑多なアプリたち</p>
          </div>
          <div className="sub-works-grid">
            {SUB_WORKS.map((work) => (
              <a key={work.title} href={work.href} target="_blank" rel="noreferrer" className="sub-work-card">
                <div className="sub-work-topline">
                  <span>↗</span>
                  <span>EXPLORE</span>
                </div>
                <h4>{work.title}</h4>
                <p>{work.desc}</p>
                <div className="sub-work-tags">
                  {work.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            DEVELOPMENT PROCESS
        ════════════════════════════════════════ */}
        <section id="process" style={sectionStyle}>
          <SectionEyebrow label="III." color={fgColor} />
          <h2 style={h2Style}>Development Process</h2>
          <p style={{ ...bodyTextStyle, maxWidth: '560px', marginTop: '1.5rem', marginBottom: '3.5rem' }}>「なぜ作るか」から始まり、技術選定・設計・実装・改善サイクルまでの思考プロセスを公開します。 各Workの詳細ページで、意思決定の理由と学びを余すことなく記述しています。</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              ['Define', '課題の定義', 'ユーザー観察と定量データから「本当に解くべき問題」を絞り込む。'],
              ['Design', '設計と仮説', 'アーキテクチャを図示し、技術トレードオフを言語化して意思決定。'],
              ['Build', '実装と検証', 'MVP→計測→改善のサイクルを高速で回す。テストとCI/CDで品質担保。'],
              ['Reflect', '振り返りと改善', 'リリース後の数値変化を分析し、次のイテレーションにフィードバック。'],
            ].map(([step, title, desc], i, arr) => (
              <div key={step as string} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', paddingBottom: i < arr.length - 1 ? '2.5rem' : 0, marginBottom: i < arr.length - 1 ? '2.5rem' : 0, borderBottom: i < arr.length - 1 ? `1px solid rgba(${fgR},${fgG},${fgB},0.1)` : 'none' }}>
                <div style={{ textAlign: 'right', paddingTop: '0.15rem' }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.7rem', letterSpacing: '0.2em', opacity: 0.35, textTransform: 'uppercase' }}>{step as string}</span>
                </div>
                <div>
                  <h3 style={{ ...h3Style, marginBottom: '0.5rem' }}>{title as string}</h3>
                  <p style={{ ...bodyTextStyle, fontSize: '0.9rem' }}>{desc as string}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            SKILLS & CERTIFICATIONS
        ════════════════════════════════════════ */}
        <section id="skills" style={sectionStyle}>
          <SectionEyebrow label="IV." color={fgColor} />
          <h2 style={h2Style}>Skills &amp; Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
            {SKILLS.map(({ group, items }) => (
              <div key={group}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1.25rem' }}>{group}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {items.map((item) => (
                    <li key={item} style={{ fontSize: '0.9rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: `rgba(201,168,76,${0.6 + t * 0.4})`, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════ */}
        <footer style={{ position: 'relative', zIndex: 10, padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid rgba(${fgR},${fgG},${fgB},0.1)`, flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.4 }}>© 2026 Luca</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {FOOTER_LINKS.map(({ label, href }) => (
              <a key={label} href={href} style={{ color: fgColor, textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.15em', opacity: 0.45, transition: 'opacity 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.9')} onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.45')}>
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function SectionEyebrow({ label, color }: { label: string; color: string }) {
  return <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.75rem', letterSpacing: '0.3em', opacity: 0.35, marginBottom: '0.75rem', color }}>{label}</span>;
}

// ─── Shared inline styles ────────────────────────────────────────────────────
const sectionStyle: React.CSSProperties = { position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '8rem 3rem' };

const h2Style: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 400, margin: 0, letterSpacing: '-0.01em' };

const h3Style: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 500, margin: 0 };

const bodyTextStyle: React.CSSProperties = { fontSize: '0.95rem', lineHeight: 1.85, opacity: 0.7, margin: 0 };

const primaryBtnStyle = (fg: string, bg: string): React.CSSProperties => ({ display: 'inline-block', padding: '0.75rem 2rem', background: fg, color: bg, textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', borderRadius: '1px', transition: 'opacity 0.2s' });

const ghostBtnStyle = (fg: string): React.CSSProperties => ({ display: 'inline-block', padding: '0.75rem 2rem', background: 'transparent', color: fg, textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: `1px solid rgba(${fg === 'rgb(237,232,222)' ? '237,232,222' : '26,22,16'},0.2)`, borderRadius: '1px', transition: 'opacity 0.2s' });

const themeToggleStyle = (fg: string): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '2.25rem', height: '2.25rem', padding: 0, color: fg, background: 'transparent', border: `1px solid ${fg === 'rgb(237,232,222)' ? 'rgba(237,232,222,0.24)' : 'rgba(26,22,16,0.2)'}`, borderRadius: '50%', cursor: 'pointer', transition: 'color 0.45s ease, border-color 0.45s ease, transform 0.2s ease' });

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M17.5 5.5h.01M19 8h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 2.5v2M12 19.5v2M4.58 4.58l1.42 1.42M18 18l1.42 1.42M2.5 12h2M19.5 12h2M4.58 19.42 6 18M18 6l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
