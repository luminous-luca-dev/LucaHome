'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  scrollRatio: number;
  fgColor: string;
  goldOpacity: number;
}

/**
 * ScrollBackground
 * ──────────────────────────────────────────────────────────────
 * Fixed, full-viewport SVG that animates from "day" (sun + balance scale)
 * to "night" (moon + constellation ring) as the user scrolls.
 *
 * Astronomy motifs per spec: 天体・天秤・円環
 */
export default function ScrollBackground({ scrollRatio, fgColor, goldOpacity }: Props) {
  // ▼▼▼ 追加: マウント状態を管理 ▼▼▼
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // ▲▲▲ ここまで ▲▲▲

  const t = scrollRatio;

  // Central orb: rotates 180° from day-sun to night-moon position
  const orbRotation = t * 180;

  // Outer ring opacity (more visible at night)
  const ringOpacity = 0.04 + t * 0.2;

  // Gold glow grows stronger at night
  const glowOpacity = 0.06 + t * 0.35;

  // Balance scale tilt (swings gently as you scroll)
  const scaleTilt = Math.sin(t * Math.PI) * 8; // max 8deg lean at midpoint

  // Star field fades in at night
  const starOpacity = t * 0.6;

  // Sun rays fade out, moon crescent fades in
  const sunOpacity = Math.max(0, 1 - t * 3);
  const moonOpacity = Math.max(0, t * 2 - 0.8);

  // ▼▼▼ 追加: マウントされるまでは何も表示しない ▼▼▼
  if (!isMounted) {
    return null; // このコンポーネントは背景なので null でOK
  }
  // ▲▲▲ ここまで ▲▲▲

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial gold glow */}
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity={glowOpacity} />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>

          {/* Day radial gradient (warm light from center-top) */}
          <radialGradient id="dayGlow" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#FFF8E7" stopOpacity={Math.max(0, 0.5 - t * 0.5)} />
            <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0" />
          </radialGradient>

          {/* Night radial gradient (deep indigo from center) */}
          <radialGradient id="nightGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#1a1535" stopOpacity={t * 0.35} />
            <stop offset="100%" stopColor="#0D0C0A" stopOpacity="0" />
          </radialGradient>

          {/* Clippath for moon crescent */}
          <clipPath id="moonClip">
            <circle cx="520" cy="490" r="52" />
          </clipPath>
        </defs>

        {/* ── Background glow layers ── */}
        <rect x="0" y="0" width="1000" height="1000" fill="url(#dayGlow)" />
        <rect x="0" y="0" width="1000" height="1000" fill="url(#nightGlow)" />
        <rect x="0" y="0" width="1000" height="1000" fill="url(#goldGlow)" />

        {/* ── Star field (fades in at night) ── */}
        {STARS.map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="#EDE8DE"
            opacity={starOpacity * (0.4 + (i % 5) * 0.12)}
          />
        ))}

        {/* ── Outermost rotating ring ── */}
        <g
          transform={`rotate(${orbRotation}, 500, 500)`}
          opacity={ringOpacity}
        >
          <circle
            cx="500"
            cy="500"
            r="380"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.5"
            strokeDasharray="4 18"
          />
          {/* Tick marks around ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 2 * Math.PI;
            const r1 = 378;
            const r2 = i % 6 === 0 ? 368 : 373;
            return (
              <line
                key={i}
                x1={500 + r1 * Math.cos(angle)}
                y1={500 + r1 * Math.sin(angle)}
                x2={500 + r2 * Math.cos(angle)}
                y2={500 + r2 * Math.sin(angle)}
                stroke="#C9A84C"
                strokeWidth={i % 6 === 0 ? '1.2' : '0.6'}
              />
            );
          })}
        </g>

        {/* ── Middle ring (counter-rotation) ── */}
        <g
          transform={`rotate(${-orbRotation * 0.6}, 500, 500)`}
          opacity={ringOpacity * 1.5}
        >
          <circle
            cx="500"
            cy="500"
            r="290"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.4"
            strokeDasharray="2 24"
          />
        </g>

        {/* ── Celestial orb group (rotates with scroll) ── */}
        <g transform={`rotate(${orbRotation}, 500, 500)`}>
          {/* ── SUN ── */}
          <g transform="translate(500, 170)" opacity={sunOpacity}>
            {/* Sun rays */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 2 * Math.PI;
              const r1 = 36;
              const r2 = i % 3 === 0 ? 58 : 46;
              return (
                <line
                  key={i}
                  x1={r1 * Math.cos(angle)}
                  y1={r1 * Math.sin(angle)}
                  x2={r2 * Math.cos(angle)}
                  y2={r2 * Math.sin(angle)}
                  stroke="#C9A84C"
                  strokeWidth={i % 3 === 0 ? '1.2' : '0.7'}
                  opacity="0.55"
                />
              );
            })}
            {/* Sun core */}
            <circle cx="0" cy="0" r="32" fill="#C9A84C" opacity="0.15" />
            <circle cx="0" cy="0" r="24" fill="#C9A84C" opacity="0.2" />
            <circle cx="0" cy="0" r="16" fill="#C9A84C" opacity="0.35" />
          </g>

          {/* ── MOON (appears at 180° = night) ── */}
          <g transform="translate(500, 830)" opacity={moonOpacity}>
            {/* Full circle */}
            <circle cx="0" cy="0" r="42" fill="#C9A84C" opacity="0.18" />
            {/* Crescent cutout */}
            <circle cx="16" cy="-8" r="36" fill="transparent"
              style={{ mixBlendMode: 'multiply' }} />
            {/* Drawn crescent arc */}
            <path
              d="M -28,-20 Q -55,0 -28,22 Q -10,32 10,28 Q -30,10 -28,-20 Z"
              fill="#C9A84C"
              opacity="0.45"
            />
          </g>
        </g>

        {/* ── Balance / Libra scale (fixed center, tilts at midpoint) ── */}
        <g transform={`translate(500, 500) rotate(${scaleTilt})`} opacity={0.12 + t * 0.06}>
          {/* Fulcrum vertical bar */}
          <line x1="0" y1="-60" x2="0" y2="60" stroke="#C9A84C" strokeWidth="1" />
          {/* Horizontal beam */}
          <line x1="-90" y1="-20" x2="90" y2="-20" stroke="#C9A84C" strokeWidth="0.8" />
          {/* Left pan strings */}
          <line x1="-90" y1="-20" x2="-90" y2="10" stroke="#C9A84C" strokeWidth="0.5" />
          {/* Left pan */}
          <ellipse cx="-90" cy="18" rx="22" ry="5" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
          {/* Right pan strings */}
          <line x1="90" y1="-20" x2="90" y2="10" stroke="#C9A84C" strokeWidth="0.5" />
          {/* Right pan */}
          <ellipse cx="90" cy="18" rx="22" ry="5" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
          {/* Fulcrum base */}
          <polygon points="0,55 -12,70 12,70" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
          {/* Centre eye */}
          <circle cx="0" cy="-20" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
          <circle cx="0" cy="-20" r="1.5" fill="#C9A84C" opacity="0.5" />
        </g>

        {/* ── Inner circle frame around balance ── */}
        <circle
          cx="500"
          cy="500"
          r="160"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.4"
          opacity={0.08 + t * 0.1}
        />
      </svg>
    </div>
  );
}

// Pseudo-random star positions (deterministic so SSR matches)
const STARS: [number, number, number][] = [
  [80, 120, 1.2], [150, 60, 0.8], [230, 180, 1.5], [310, 90, 0.9], [420, 50, 1.1],
  [550, 80, 0.7], [660, 140, 1.3], [740, 70, 1.0], [820, 110, 0.8], [900, 50, 1.4],
  [950, 200, 0.9], [930, 350, 1.2], [880, 480, 0.7], [940, 620, 1.1], [900, 750, 0.8],
  [820, 870, 1.3], [700, 940, 0.9], [560, 960, 1.2], [400, 920, 0.7], [260, 880, 1.0],
  [130, 800, 1.4], [60, 680, 0.8], [40, 550, 1.1], [70, 400, 0.9], [50, 260, 1.2],
  [180, 380, 0.6], [300, 280, 0.9], [450, 160, 0.7], [620, 220, 1.0], [770, 290, 0.8],
  [860, 380, 0.7], [750, 460, 0.5], [650, 380, 0.8], [340, 440, 0.6], [190, 500, 0.7],
];