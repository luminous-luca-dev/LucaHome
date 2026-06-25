'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  onComplete: () => void;
  /** Duration in ms. Default: 2400 */
  duration?: number;
}

/**
 * LoadingScreen
 * ──────────────────────────────────────────────────────────────
 * 仕様4.2: 世界観を象徴する「おしゃれな円環状のタイムバー（Progress Indicator）」
 *
 * 3層の同心円環が異なる速度で回転しながら、
 * 外側の円環がタイムバーとして充填される。
 * 完了後はフェードアウトしてmountを解除。
 */
export default function LoadingScreen({ onComplete, duration = 2400 }: Props) {
  // 追加: ブラウザでのマウント状態を管理
  const [isMounted, setIsMounted] = useState(false);
  
  const [progress, setProgress] = useState(0);   // 0→1
  const [phase, setPhase] = useState<'loading' | 'fading'>('loading');
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // コンポーネントがマウントされたら true にする
    setIsMounted(true);

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      // Ease-in-out cubic
      const eased = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
      setProgress(eased);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Start fade-out
        setPhase('fading');
        setTimeout(() => onComplete(), 600);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onComplete]);

  // ▼▼▼ 追加: マウントされるまでは何も表示しない（または背景色だけの空のdiv） ▼▼▼
  if (!isMounted) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          backgroundColor: '#F5F0E8', // 背景色だけ合わせておくことでチラつきを防止
        }}
      />
    );
  }
  // ▲▲▲ ここまで ▲▲▲

  // SVG ring parameters
  const SIZE = 180;       // viewport size
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  // Outer progress ring
  const R_OUTER = 78;
  const CIRC_OUTER = 2 * Math.PI * R_OUTER;
  const dashOffset = CIRC_OUTER * (1 - progress);

  // Rotation angles (runs continuously via CSS, augmented by progress tilt)
  const rot1 = progress * 360 * 2;       // inner 1: 2 full rotations
  const rot2 = -progress * 360 * 1.4;   // inner 2: counter, 1.4x
  const rot3 = progress * 360 * 0.8;    // middle

  // Text: percentage
  const pct = Math.round(progress * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F0E8',
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.6s ease-out' : 'none',
        gap: '2.5rem',
      }}
    >
      {/* ── Marble texture overlay ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />

      {/* ── Ring complex ── */}
      <div style={{ position: 'relative', width: `${SIZE}px`, height: `${SIZE}px` }}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="loadGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>
            {/* Gold gradient for the progress arc */}
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8C96A" />
              <stop offset="100%" stopColor="#A07828" />
            </linearGradient>
          </defs>

          {/* Ambient glow */}
          <circle cx={CX} cy={CY} r={R_OUTER} fill="url(#loadGlow)" />

          {/* ── Track ring (static, faint) ── */}
          <circle
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1"
            opacity="0.12"
            strokeDasharray="3 10"
          />

          {/* ── Progress arc (clockwise fill) ── */}
          <circle
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={CIRC_OUTER}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CX} ${CY})`}
            opacity="0.85"
          />

          {/* ── Leading dot on arc ── */}
          {progress > 0.02 && (
            <circle
              cx={CX + R_OUTER * Math.cos((progress * 2 * Math.PI) - Math.PI / 2)}
              cy={CY + R_OUTER * Math.sin((progress * 2 * Math.PI) - Math.PI / 2)}
              r="3"
              fill="#C9A84C"
              opacity="0.9"
            />
          )}

          {/* ── Tick marks on outer ring ── */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i / 36) * 2 * Math.PI - Math.PI / 2;
            const r1 = R_OUTER + 5;
            const r2 = R_OUTER + (i % 9 === 0 ? 11 : 8);
            return (
              <line
                key={i}
                x1={CX + r1 * Math.cos(angle)}
                y1={CY + r1 * Math.sin(angle)}
                x2={CX + r2 * Math.cos(angle)}
                y2={CY + r2 * Math.sin(angle)}
                stroke="#1A1610"
                strokeWidth={i % 9 === 0 ? '1' : '0.5'}
                opacity={i % 9 === 0 ? '0.2' : '0.1'}
              />
            );
          })}

          {/* ── Middle rotating ring ── */}
          <g transform={`rotate(${rot3}, ${CX}, ${CY})`}>
            <circle
              cx={CX} cy={CY} r="56"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="0.5"
              strokeDasharray="6 20"
              opacity="0.18"
            />
          </g>

          {/* ── Inner spinning ring 1 ── */}
          <g transform={`rotate(${rot1}, ${CX}, ${CY})`}>
            <circle
              cx={CX} cy={CY} r="36"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="0.5"
              strokeDasharray="3 9"
              opacity="0.22"
            />
            {/* 4 dots at cardinal points */}
            {[0, 90, 180, 270].map(deg => {
              const rad = (deg * Math.PI) / 180;
              return (
                <circle
                  key={deg}
                  cx={CX + 36 * Math.cos(rad)}
                  cy={CY + 36 * Math.sin(rad)}
                  r="1.5"
                  fill="#C9A84C"
                  opacity="0.4"
                />
              );
            })}
          </g>

          {/* ── Inner spinning ring 2 (counter) ── */}
          <g transform={`rotate(${rot2}, ${CX}, ${CY})`}>
            <circle
              cx={CX} cy={CY} r="22"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="0.6"
              strokeDasharray="2 7"
              opacity="0.28"
            />
          </g>

          {/* ── Centre balance dot ── */}
          <circle cx={CX} cy={CY} r="3" fill="#C9A84C" opacity="0.6" />
          <circle cx={CX} cy={CY} r="1.2" fill="#C9A84C" opacity="0.9" />

          {/* ── Percentage counter ── */}
          <text
            x={CX}
            y={CY - 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#1A1610"
            fontSize="11"
            fontFamily="'Playfair Display', Georgia, serif"
            opacity="0.45"
            letterSpacing="1"
          >
            {pct}
          </text>
          <text
            x={CX}
            y={CY + 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#1A1610"
            fontSize="6"
            fontFamily="'Inter', sans-serif"
            letterSpacing="3"
            opacity="0.3"
          >
            LOADING
          </text>
        </svg>
      </div>

      {/* ── Logotype below ring ── */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1rem',
            letterSpacing: '0.35em',
            color: '#1A1610',
            opacity: 0.45,
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Portfolio
        </p>
        {/* Thin gold rule */}
        <div
          style={{
            width: `${progress * 120}px`,
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
            margin: '0.75rem auto 0',
            transition: 'width 0.1s linear',
          }}
        />
      </div>
    </div>
  );
}