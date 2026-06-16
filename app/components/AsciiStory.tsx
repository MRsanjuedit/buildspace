'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Scene {
  id: string;
  title: string;
  art: string;
  lines: string[];
}

const SCENES: Scene[] = [
  {
    id: '01',
    title: 'the screen',
    art: `
     ┌─────────────────┐
     │                 │
     │    ░░░░░░░░░    │
     │    ░░░░░░░░░    │
     │    ░░░░░░░░░    │
     │                 │
     └────────┬────────┘
              │
           ┌──┴──┐
           └─────┘`,
    lines: [
      'you sit alone in a room.',
      'the screen glows.',
      'scroll. scroll. scroll.',
      'nothing changes.',
    ],
  },
  {
    id: '02',
    title: 'the thought',
    art: `


            ◇


     "there has to be
      more than this."


`,
    lines: [
      'a thought you can\'t shake.',
      'not a business plan.',
      'just a feeling —',
      'that you were meant to build.',
    ],
  },
  {
    id: '03',
    title: 'the noise',
    art: `
     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     ▓                   ▓
     ▓   "too early."    ▓
     ▓   "not ready."    ▓
     ▓   "be realistic." ▓
     ▓                   ▓
     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`,
    lines: [
      'everyone has an opinion.',
      'too early. too late.',
      'someone already did it.',
      'the idea almost dies.',
    ],
  },
  {
    id: '04',
    title: 'the spark',
    art: `




            ✦



`,
    lines: [
      'but it doesn\'t.',
      'small. stubborn. alive.',
      'the spark stays.',
      'waiting for you to move.',
    ],
  },
  {
    id: '05',
    title: 'the door',
    art: `
     ┌─────────────────┐
     │                 │
     │                 │
     │   b o l d       │
     │   s p a c e .   │
     │                 │
     │                 │
     └─────────────────┘`,
    lines: [
      'a place appears.',
      'not a course. not a lecture.',
      'a room full of people',
      'who think like you.',
    ],
  },
  {
    id: '06',
    title: 'the room',
    art: `
        ■ ─ ■ ─ ■
        │   │   │
        ■ ─ ■ ─ ■
        │   │   │
        ■ ─ ■ ─ ■`,
    lines: [
      'builders. makers. dreamers.',
      'strangers who become teammates.',
      'ideas shared at 2am.',
      'no spectators allowed.',
    ],
  },
  {
    id: '07',
    title: 'the ship',
    art: `

     ┌─────────────────┐
     │                 │
     │    shipped.     │
     │                 │
     └─────────────────┘

`,
    lines: [
      'you build something.',
      'it\'s rough. imperfect.',
      'but it\'s real.',
      'and people notice.',
    ],
  },
  {
    id: '08',
    title: 'the network',
    art: `
      ■ ─ ■ ─ ■ ─ ■ ─ ■
      │   │   │   │   │
      ■ ─ ■ ─ ■ ─ ■ ─ ■
      │   │   │   │   │
      ■ ─ ■ ─ ■ ─ ■ ─ ■
      │   │   │   │   │
      ■ ─ ■ ─ ■ ─ ■ ─ ■`,
    lines: [
      'one room becomes a thousand.',
      'ideas become companies.',
      'strangers become cofounders.',
      'the network grows.',
    ],
  },
  {
    id: '09',
    title: 'the invitation',
    art: `



     the internet has
     enough spectators.

     we need builders.


`,
    lines: [
      'this is boldspace.',
      'the open world for builders.',
      'your idea is waiting.',
      'enter.',
    ],
  },
];

export default function AsciiStory() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');
  const [visibleLines, setVisibleLines] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const delay = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const scene = SCENES[sceneIdx];

  useEffect(() => {
    clear();
    setPhase('enter');
    setVisibleLines(0);

    // enter → show
    delay(() => {
      setPhase('show');

      // reveal lines
      scene.lines.forEach((_, i) => {
        delay(() => setVisibleLines(i + 1), 400 + i * 600);
      });

      // exit
      const hold = 400 + scene.lines.length * 600 + 2000;
      delay(() => {
        setPhase('exit');
        delay(() => {
          setSceneIdx(p => (p + 1) % SCENES.length);
        }, 800);
      }, hold);
    }, 300);

    return clear;
  }, [sceneIdx, clear, delay]); // eslint-disable-line

  const opacity = phase === 'show' ? 1 : 0;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* ── Header bar ── */}
      <div style={{
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          opacity,
          transition: 'opacity 0.6s ease',
        }}>
          {scene.id} / {String(SCENES.length).padStart(2, '0')}
        </span>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {SCENES.map((_, i) => (
            <div key={i} style={{
              width: i === sceneIdx ? '20px' : '4px',
              height: '2px',
              backgroundColor: i === sceneIdx ? '#fff' : 'rgba(255,255,255,0.12)',
              borderRadius: '1px',
              transition: 'all 0.6s ease',
            }} />
          ))}
        </div>
      </div>

      {/* ── Scene title ── */}
      <div style={{
        padding: '24px 28px 0',
        flexShrink: 0,
      }}>
        <h2 style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 800,
          fontSize: '20px',
          letterSpacing: '-0.03em',
          color: '#fff',
          textTransform: 'lowercase',
          margin: 0,
          opacity,
          transition: 'opacity 0.7s ease 0.1s',
        }}>
          {scene.title}
        </h2>
      </div>

      {/* ── Art area ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 28px',
        opacity,
        transition: 'opacity 0.8s ease 0.2s',
      }}>
        <pre style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '12px',
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.85)',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'pre',
        }}>
          {scene.art}
        </pre>
      </div>

      {/* ── Story text ── */}
      <div style={{
        padding: '0 28px 32px',
        flexShrink: 0,
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '6px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '20px',
      }}>
        {scene.lines.map((line, i) => (
          <p key={`${sceneIdx}-${i}`} style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.45)',
            margin: 0,
            opacity: i < visibleLines ? 1 : 0,
            transform: i < visibleLines ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
