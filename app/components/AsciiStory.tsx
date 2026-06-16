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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(27.78);
  const [hasInteracted, setHasInteracted] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setHasInteracted(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 27.78);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Calculate global progress (0 to 1)
  const globalProgress = Math.min(currentTime / duration, 1);
  
  // Calculate which scene we are in
  const rawSceneIndex = globalProgress * SCENES.length;
  const sceneIdx = Math.min(Math.floor(rawSceneIndex), SCENES.length - 1);
  const scene = SCENES[sceneIdx] || SCENES[0];

  // Calculate progress *within* the current scene (0 to 1)
  const sceneProgress = rawSceneIndex - sceneIdx;

  // Determine opacity for crossfades (fade in first 10%, fade out last 10%)
  let opacity = 1;
  if (sceneProgress < 0.1) opacity = sceneProgress / 0.1;
  else if (sceneProgress > 0.9) opacity = (1 - sceneProgress) / 0.1;

  // Determine how many lines are visible (reveal sequentially)
  const lineThreshold = 0.8 / scene.lines.length; // use 80% of the scene time to reveal lines
  const visibleLines = Math.floor((sceneProgress - 0.1) / lineThreshold) + 1;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <audio ref={audioRef} src="/story-audio.webm" preload="auto" />

      {/* ── Overlay Play Button (if not interacted yet) ── */}
      {!hasInteracted && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <button 
            onClick={togglePlay}
            style={{
              padding: '16px 32px',
              backgroundColor: '#fff',
              color: '#000',
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '2px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            play audio experience
          </button>
        </div>
      )}

      {/* ── Header bar ── */}
      <div style={{
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={togglePlay} style={{
            background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', opacity: 0.5
          }}>
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <span style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            opacity: hasInteracted ? opacity : 0,
            transition: 'opacity 0.2s ease',
          }}>
            {scene.id} / {String(SCENES.length).padStart(2, '0')}
          </span>
        </div>

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
          opacity: hasInteracted ? opacity : 0,
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
        opacity: hasInteracted ? opacity : 0,
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
            opacity: hasInteracted && i < visibleLines ? 1 : 0,
            transform: hasInteracted && i < visibleLines ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
