'use client';

import { useEffect, useRef, useState } from 'react';

interface Scene {
  title: string;
  art: string[];
  lines: string[];
}

const SCENES: Scene[] = [
  {
    title: 'THE SCROLL',
    art: [
      '  ╔══════════════════╗  ',
      '  ║ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ║  ',
      '  ║ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ║  ',
      '  ║ ░░░░░░░░░░░░░░░░ ║  ',
      '  ║ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ║  ',
      '  ╚═════════╤════════╝  ',
      '            │            ',
      '     ┌──────┴──────┐     ',
      '     │  ( ◉ ─ ◉ )  │     ',
      '     │    \\_____/   │     ',
      '     └─────────────┘     ',
    ],
    lines: [
      'A dark room.',
      'One person. One screen.',
      '',
      'Endless feeds.',
      'Endless content.',
      'Endless spectators.',
      '',
      '"there has to be more than this."',
    ],
  },
  {
    title: 'THE IDEA',
    art: [
      '           ✦             ',
      '        ✦     ✦          ',
      '      ✦    ✺    ✦        ',
      '        ✦     ✦          ',
      '           ✦             ',
      '                         ',
      '  ┌─────────────────┐    ',
      '  │                 │    ',
      '  │    [ d e s k ]  │    ',
      '  │                 │    ',
      '  └─────────────────┘    ',
    ],
    lines: [
      'A tiny spark appears.',
      '',
      'Not a startup.',
      'Not a business plan.',
      '',
      'Just an idea.',
      'Small. Fragile.',
      'Impossible to ignore.',
    ],
  },
  {
    title: 'THE WALL',
    art: [
      '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ',
      '  ▓                   ▓  ',
      '  ▓  "you\'re too      ▓  ',
      '  ▓    early."        ▓  ',
      '  ▓                   ▓  ',
      '  ▓  "someone already ▓  ',
      '  ▓   built that."    ▓  ',
      '  ▓                   ▓  ',
      '  ▓  "wait until      ▓  ',
      '  ▓   you\'re ready."  ▓  ',
      '  ▓                   ▓  ',
      '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ',
    ],
    lines: [
      'The world responds.',
      '',
      'The spark flickers.',
      'The person almost lets go.',
      '',
      'But the idea refuses',
      'to disappear.',
    ],
  },
  {
    title: 'THE SEARCH',
    art: [
      '  [▪][▪][▪][▪][▪][ + ]  ',
      '  ┌──────────────────┐   ',
      '  │ > how to build_  │   ',
      '  ├──────────────────┤   ',
      '  │  Tutorial #47    │   ',
      '  │  ████████░░░░░   │   ',
      '  │  Tutorial #48    │   ',
      '  │  ████████░░░░░   │   ',
      '  │  Tutorial #49    │   ',
      '  │  ████░░░░░░░░░   │   ',
      '  └──────────────────┘   ',
    ],
    lines: [
      'Late nights.',
      'Open tabs.',
      'Half-finished projects.',
      '',
      'The person searches for',
      'others like them.',
      '',
      'Nobody nearby understands.',
    ],
  },
  {
    title: 'THE SIGNAL',
    art: [
      '                          ',
      '  ╔════════════════════╗  ',
      '  ║                    ║  ',
      '  ║  WELCOME TO        ║  ',
      '  ║  BOLDSPACE.        ║  ',
      '  ║                    ║  ',
      '  ║  BUILD IN PUBLIC.  ║  ',
      '  ║  FIND YOUR PEOPLE. ║  ',
      '  ║  START CREATING.   ║  ',
      '  ║                    ║  ',
      '  ╚════════════════════╝  ',
    ],
    lines: [
      'A message appears',
      'in the darkness.',
      '',
      'The person clicks.',
      '',
      'Lights begin turning on',
      'around the world.',
    ],
  },
  {
    title: 'THE BUILDERS',
    art: [
      '  [■]──[■]──[■]──[■]   ',
      '   |    |    |    |     ',
      '  [■]──[■]──[■]──[■]   ',
      '   |    |    |    |     ',
      '  [■]──[■]──[■]──[■]   ',
      '   |    |    |    |     ',
      '  [■]──[■]──[■]──[■]   ',
    ],
    lines: [
      'Developers writing code.',
      'Designers sketching interfaces.',
      'Creators editing videos.',
      'Founders sharing ideas.',
      '',
      'Strangers becoming teammates.',
      '',
      'No spectators. Only builders.',
    ],
  },
  {
    title: 'THE FIRST BUILD',
    art: [
      '          /\\             ',
      '         /  \\            ',
      '        / !! \\           ',
      '       /______\\          ',
      '       |      |          ',
      '   ~~~~|      |~~~~      ',
      '       |      |          ',
      '  ┌────┴──────┴────┐     ',
      '  │   S H I P P E D│     ',
      '  └────────────────┘     ',
    ],
    lines: [
      'An unfinished project ships.',
      '',
      'It\'s imperfect.',
      'People cheer anyway.',
      '',
      'Ideas become products.',
      'Products become companies.',
      'Conversations become movements.',
    ],
  },
  {
    title: 'THE OPEN WORLD',
    art: [
      '  * · * · [■] · * · *   ',
      '  · [■] ·  |  · [■] ·   ',
      '  *  |  [■]─[■]  |  *   ',
      '  · [■] ·  |  · [■] ·   ',
      '  * · * · [■] · * · *   ',
      '                         ',
      '  · · · · · · · · · · ·  ',
    ],
    lines: [
      'Thousands of lights',
      'across the globe.',
      '',
      'Builders creating together',
      'at 2 a.m.',
      '',
      'THE INTERNET HAS ENOUGH',
      'SPECTATORS.',
      '',
      'WE NEED MORE BUILDERS.',
    ],
  },
  {
    title: 'THE INVITATION',
    art: [
      '  ┌───────────────────┐  ',
      '  │                   │  ',
      '  │  ┌─────────────┐  │  ',
      '  │  │  ENTER THE  │  │  ',
      '  │  │ OPEN WORLD  │  │  ',
      '  │  └─────────────┘  │  ',
      '  │                   │  ',
      '  └──────── ──────────┘  ',
      '                         ',
      '           ▌             ',
    ],
    lines: [
      'The camera returns.',
      '',
      'The person isn\'t alone.',
      'The door is open.',
      '',
      'A cursor blinks. Waiting.',
      '',
      'BUILD SOMETHING',
      'UNFORGETTABLE.',
    ],
  },
];

export default function AsciiStory() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [artVisible, setArtVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const scene = SCENES[sceneIndex];

  const clearAll = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timersRef.current.push(t);
  };

  useEffect(() => {
    clearAll();
    setFadeOut(false);
    setArtVisible(false);
    setTitleVisible(false);
    setVisibleLines(0);

    // 1. Show title
    addTimer(() => setTitleVisible(true), 200);

    // 2. Show ASCII art
    addTimer(() => setArtVisible(true), 500);

    // 3. Type story lines
    scene.lines.forEach((_, i) => {
      addTimer(() => setVisibleLines(i + 1), 900 + i * 500);
    });

    // 4. Advance after reading time
    const totalDuration = 900 + scene.lines.length * 500 + 2800;
    addTimer(() => {
      setFadeOut(true);
      addTimer(() => {
        setSceneIndex((prev) => (prev + 1) % SCENES.length);
      }, 700);
    }, totalDuration);

    return clearAll;
  }, [sceneIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorBlink((b) => !b), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 28px',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s ease',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .ascii-line-in {
          animation: fadeInUp 0.35s ease forwards;
        }
      `}</style>

      {/* CRT scanline effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.015) 2px, rgba(0,255,136,0.015) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Scene counter */}
      <div
        style={{
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: '10px',
          color: 'rgba(0, 255, 136, 0.4)',
          letterSpacing: '0.2em',
          marginBottom: '16px',
          opacity: titleVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          zIndex: 2,
        }}
      >
        {String(sceneIndex + 1).padStart(2, '0')}/{String(SCENES.length).padStart(2, '0')}
      </div>

      {/* Scene title */}
      <div
        style={{
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: '11px',
          fontWeight: 600,
          color: '#00ff88',
          letterSpacing: '0.25em',
          marginBottom: '24px',
          opacity: titleVisible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
          zIndex: 2,
        }}
      >
        — {scene.title} —
      </div>

      {/* ASCII art */}
      <pre
        style={{
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: '12px',
          lineHeight: 1.55,
          color: '#00ff88',
          opacity: artVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          marginBottom: '28px',
          textAlign: 'center',
          userSelect: 'none',
          textShadow: '0 0 8px rgba(0,255,136,0.5)',
          zIndex: 2,
          margin: '0 0 28px 0',
        }}
      >
        {scene.art.join('\n')}
      </pre>

      {/* Story lines */}
      <div
        style={{
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: '12px',
          lineHeight: 1.9,
          color: 'rgba(255,255,255,0.65)',
          textAlign: 'center',
          maxWidth: '300px',
          minHeight: '120px',
          zIndex: 2,
        }}
      >
        {scene.lines.slice(0, visibleLines).map((line, i) =>
          line === '' ? (
            <div key={i} style={{ height: '0.6em' }} />
          ) : (
            <div key={i} className="ascii-line-in">
              {line}
              {i === visibleLines - 1 && (
                <span style={{ opacity: cursorBlink ? 1 : 0, color: '#00ff88' }}>█</span>
              )}
            </div>
          )
        )}
      </div>

      {/* Progress bar */}
      <div
        style={{
          display: 'flex',
          gap: '5px',
          marginTop: '36px',
          zIndex: 2,
        }}
      >
        {SCENES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === sceneIndex ? '24px' : '5px',
              height: '2px',
              backgroundColor: i === sceneIndex ? '#00ff88' : 'rgba(0, 255, 136, 0.2)',
              transition: 'all 0.4s ease',
              borderRadius: '1px',
              boxShadow: i === sceneIndex ? '0 0 6px rgba(0,255,136,0.6)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
