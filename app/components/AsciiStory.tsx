'use client';

import { useEffect, useRef, useState } from 'react';

interface Scene {
  sceneNum: string;
  title: string;
  character: string[];
  lines: string[];
}

const SCENES: Scene[] = [
  {
    sceneNum: '01',
    title: 'the scroll',
    character: [
      '┌──────────────┐',
      '│ ─────────── │',
      '│ ─────────── │',
      '│ ─────────── │',
      '└──────┬───────┘',
      '       │',
      '      ( )',
      '      /|\\',
      '      / \\',
    ],
    lines: [
      'a dark room.',
      'one person. one screen.',
      'endless feeds. endless spectators.',
      '',
      '"there has to be more than this."',
    ],
  },
  {
    sceneNum: '02',
    title: 'the idea',
    character: [
      '        ·',
      '      · ✦ ·',
      '    ·   ✺   ·',
      '      · ✦ ·',
      '        ·',
      '',
      '  ──────────────',
      '      [ desk ]',
      '  ──────────────',
    ],
    lines: [
      'a tiny spark appears above the desk.',
      '',
      'not a startup.',
      'not a business plan.',
      '',
      'just an idea. small. fragile.',
      'impossible to ignore.',
    ],
  },
  {
    sceneNum: '03',
    title: 'the wall',
    character: [
      '████████████████',
      '█              █',
      '█  "too early" █',
      '█              █',
      '█  "wait till  █',
      '█  you\'re      █',
      '█  ready."     █',
      '█              █',
      '████████████████',
    ],
    lines: [
      'the world responds.',
      '',
      'the spark flickers.',
      'the person almost lets go.',
      '',
      'but the idea refuses to disappear.',
    ],
  },
  {
    sceneNum: '04',
    title: 'the search',
    character: [
      '[ ─ ][ ─ ][ ─ ][ + ]',
      '┌────────────────────┐',
      '│ > how to build _  │',
      '├────────────────────┤',
      '│  tutorial #47      │',
      '│  ████████░░░░      │',
      '│  tutorial #48      │',
      '│  ████░░░░░░░░      │',
      '└────────────────────┘',
    ],
    lines: [
      'late nights. open tabs.',
      'half-finished projects.',
      '',
      'the person searches for others like them.',
      'builders. creators. dreamers.',
      '',
      'nobody nearby understands.',
    ],
  },
  {
    sceneNum: '05',
    title: 'the signal',
    character: [
      '╔══════════════════╗',
      '║                  ║',
      '║  WELCOME TO      ║',
      '║  BOLDSPACE.      ║',
      '║                  ║',
      '║  BUILD IN PUBLIC ║',
      '║  FIND YOUR PEOPLE║',
      '║  START CREATING  ║',
      '║                  ║',
      '╚══════════════════╝',
    ],
    lines: [
      'a message appears in the darkness.',
      '',
      'the person clicks.',
      '',
      'lights begin turning on',
      'around the world.',
    ],
  },
  {
    sceneNum: '06',
    title: 'the builders',
    character: [
      '  [■]──[■]──[■]',
      '   |    |    |',
      '  [■]──[■]──[■]',
      '   |    |    |',
      '  [■]──[■]──[■]',
    ],
    lines: [
      'developers writing code.',
      'designers sketching interfaces.',
      'founders sharing ideas.',
      '',
      'strangers becoming teammates.',
      '',
      'no spectators. only builders.',
    ],
  },
  {
    sceneNum: '07',
    title: 'the first build',
    character: [
      '       /\\',
      '      /  \\',
      '     / !! \\',
      '    /______\\',
      '    |      |',
      '~~~~|      |~~~~',
      '┌───────────────┐',
      '│   SHIPPED.    │',
      '└───────────────┘',
    ],
    lines: [
      'an unfinished project ships.',
      '',
      "it's imperfect.",
      'people cheer anyway.',
      '',
      'ideas become products.',
      'products become companies.',
    ],
  },
  {
    sceneNum: '08',
    title: 'the open world',
    character: [
      '  ·  [■]  ·  [■]  ·',
      '    ╲    ╲  ╱    ╱',
      '  [■]──[■]──[■]──[■]',
      '    ╱    ╱  ╲    ╲',
      '  ·  [■]  ·  [■]  ·',
    ],
    lines: [
      'thousands of lights across the globe.',
      '',
      'builders creating together at 2am.',
      'no permission. no gatekeepers.',
      '',
      'the internet has enough spectators.',
      'we need more builders.',
    ],
  },
  {
    sceneNum: '09',
    title: 'the invitation',
    character: [
      '┌──────────────────┐',
      '│                  │',
      '│  ┌────────────┐  │',
      '│  │ ENTER THE  │  │',
      '│  │ OPEN WORLD │  │',
      '│  └────────────┘  │',
      '│                  │',
      '└───────────── ────┘',
      '',
      '          ▌',
    ],
    lines: [
      'the camera returns to the first room.',
      '',
      "the person isn't alone.",
      'the door is open.',
      '',
      'a cursor blinks. waiting.',
      '',
      'build something unforgettable.',
    ],
  },
];

export default function AsciiStory() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [visibleLines, setVisibleLines] = useState(0);
  const timers = useRef<NodeJS.Timeout[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  const scene = SCENES[sceneIndex];

  useEffect(() => {
    clear();
    setPhase('in');
    setVisibleLines(0);

    // reveal lines one-by-one
    scene.lines.forEach((_, i) => {
      after(() => setVisibleLines(i + 1), 600 + i * 450);
    });

    // hold → out
    const holdAt = 600 + scene.lines.length * 450 + 2400;
    after(() => setPhase('out'), holdAt);
    after(() => {
      setSceneIndex(p => (p + 1) % SCENES.length);
    }, holdAt + 700);

    return clear;
  }, [sceneIndex]); // eslint-disable-line

  const isIn = phase === 'in' || phase === 'hold';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 36px',
      backgroundColor: '#000',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes storyFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .story-line { animation: storyFadeUp 0.4s ease forwards; }
      `}</style>

      {/* Scene label */}
      <div style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 400,
        fontSize: '11px',
        letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.25)',
        textTransform: 'uppercase',
        marginBottom: '12px',
        opacity: isIn ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>
        {scene.sceneNum} / {String(SCENES.length).padStart(2, '0')}
      </div>

      {/* Scene title */}
      <div style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 800,
        fontSize: '18px',
        letterSpacing: '-0.03em',
        color: '#fff',
        textTransform: 'lowercase',
        marginBottom: '32px',
        opacity: isIn ? 1 : 0,
        transition: 'opacity 0.6s ease 0.05s',
      }}>
        {scene.title}
      </div>

      {/* Character art */}
      <pre style={{
        fontFamily: "'Instrument Sans', 'Courier New', monospace",
        fontSize: '13px',
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.9)',
        margin: '0 0 36px 0',
        textAlign: 'center',
        userSelect: 'none',
        opacity: isIn ? 1 : 0,
        transform: isIn ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        whiteSpace: 'pre',
      }}>
        {scene.character.join('\n')}
      </pre>

      {/* Story text */}
      <div style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.45)',
        textAlign: 'center',
        maxWidth: '280px',
        minHeight: '140px',
        opacity: isIn ? 1 : 0,
        transition: 'opacity 0.6s ease 0.15s',
      }}>
        {scene.lines.slice(0, visibleLines).map((line, i) =>
          line === '' ? (
            <div key={i} style={{ height: '0.5em' }} />
          ) : (
            <div key={i} className="story-line" style={{ color: i === 0 && visibleLines === 1 ? '#fff' : undefined }}>
              {line}
            </div>
          )
        )}
      </div>

      {/* Progress — thin white lines like the button border style */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginTop: '40px',
        opacity: isIn ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>
        {SCENES.map((_, i) => (
          <div key={i} style={{
            width: i === sceneIndex ? '28px' : '6px',
            height: '2px',
            backgroundColor: i === sceneIndex ? '#fff' : 'rgba(255,255,255,0.15)',
            transition: 'all 0.5s ease',
            borderRadius: '1px',
          }} />
        ))}
      </div>
    </div>
  );
}
