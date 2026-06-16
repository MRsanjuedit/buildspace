'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimFrame {
  art: string[];
  subtitle: string;
}

interface Scene {
  episode: string;
  title: string;
  frameDuration: number;
  frames: AnimFrame[];
}

const SCENES: Scene[] = [
  {
    episode: 'EP. 01',
    title: 'the scroll',
    frameDuration: 700,
    frames: [
      {
        art: [
          '                    ',
          '         ___        ',
          '        /- -\\       ',
          '        |~_~|       ',
          '         \\_/        ',
          '      ---|---|---    ',
          '     /           \\  ',
          '    [  ─────────  ] ',
          '    [  ─────────  ] ',
          '    [  ─────────  ] ',
          '    [─────────────] ',
          '                    ',
        ],
        subtitle: 'a dark room. one person. one screen.',
      },
      {
        art: [
          '                    ',
          '         ___        ',
          '        /- -\\       ',
          '        |- -|       ',
          '         \\_/        ',
          '      ---|---|---    ',
          '     /           \\  ',
          '    [  ▒▒▒▒▒▒▒▒▒  ] ',
          '    [  ─────────  ] ',
          '    [  ▒▒▒▒▒▒▒▒▒  ] ',
          '    [─────────────] ',
          '                    ',
        ],
        subtitle: 'endless feeds. endless content.',
      },
      {
        art: [
          '                    ',
          '         ___        ',
          '        /x x\\       ',
          '        |─_─|       ',
          '         \\_/        ',
          '      ---|---|---    ',
          '     /           \\  ',
          '    [  ▓▓▓▓▓▓▓▓▓  ] ',
          '    [  ▓▓▓▓▓▓▓▓▓  ] ',
          '    [  ▒▒▒▒▒▒▒▒▒  ] ',
          '    [─────────────] ',
          '                    ',
        ],
        subtitle: 'hours pass. nothing changes.',
      },
      {
        art: [
          '                    ',
          '         ___        ',
          '        /- -\\       ',
          '        |~_~|       ',
          '         \\_/        ',
          '      ---|---|---    ',
          '     /           \\  ',
          '    [ ─────────── ] ',
          '    [             ] ',
          '    [  "there has ] ',
          '    [─to be more"─] ',
          '                    ',
        ],
        subtitle: '"there has to be more than this."',
      },
    ],
  },
  {
    episode: 'EP. 02',
    title: 'the idea',
    frameDuration: 550,
    frames: [
      {
        art: [
          '                    ',
          '                    ',
          '         ___        ',
          '        /o o\\       ',
          '        | ‿ |       ',
          '         \\_/        ',
          '          |         ',
          '        ──────      ',
          '        [desk]      ',
          '        ──────      ',
          '                    ',
          '                    ',
        ],
        subtitle: 'a tiny spark appears above the desk.',
      },
      {
        art: [
          '          ·         ',
          '        · ✦ ·       ',
          '         ___        ',
          '        /o o\\       ',
          '        | ‿ |       ',
          '         \\_/        ',
          '          |         ',
          '        ──────      ',
          '        [desk]      ',
          '        ──────      ',
          '                    ',
          '                    ',
        ],
        subtitle: 'not a startup. not a business plan.',
      },
      {
        art: [
          '        ✦ ✺ ✦       ',
          '       ✦  ✺  ✦      ',
          '         ___        ',
          '        /O O\\       ',
          '        | O |       ',
          '         \\_/        ',
          '          |         ',
          '        ──────      ',
          '        [desk]      ',
          '        ──────      ',
          '                    ',
          '                    ',
        ],
        subtitle: 'just an idea. small. fragile.',
      },
      {
        art: [
          '      ✦✦ ✺ ✦✦       ',
          '     ✦  ✦✺✦  ✦      ',
          '      ✦✦ ✺ ✦✦       ',
          '         ___        ',
          '        /*_*\\       ',
          '        | ‿ |       ',
          '         \\_/        ',
          '        /   \\       ',
          '        ──────      ',
          '        [desk]      ',
          '                    ',
          '                    ',
        ],
        subtitle: 'impossible to ignore.',
      },
    ],
  },
  {
    episode: 'EP. 03',
    title: 'the wall',
    frameDuration: 600,
    frames: [
      {
        art: [
          '                    ',
          '         ___        ',
          '        /o o\\       ',
          '        | ‿ |       ',
          '         \\_/        ',
          '        /   \\       ',
          '        |   |       ',
          '       →→→→→        ',
          '                    ',
          '    ████████████    ',
          '                    ',
          '                    ',
        ],
        subtitle: 'the world responds.',
      },
      {
        art: [
          '                    ',
          '         ___        ',
          '        /> <\\       ',
          '        |─_─|       ',
          '         \\_/        ',
          '    \\   /   \\       ',
          '     \\ |   |        ',
          '      ×→→→→→        ',
          '                    ',
          '    ████████████    ',
          '    █ TOO EARLY █   ',
          '    ████████████    ',
        ],
        subtitle: '"you\'re too early. someone already built that."',
      },
      {
        art: [
          '                    ',
          '       ___          ',
          '      /; ;\\         ',
          '      |T_T|         ',
          '       \\_/          ',
          '       \\ |          ',
          '        |\\          ',
          '    ←←←← \\         ',
          '                    ',
          '    ████████████    ',
          '    █ WAIT....  █   ',
          '    ████████████    ',
        ],
        subtitle: 'the spark flickers. almost gone.',
      },
      {
        art: [
          '          ·✦·       ',
          '       ___          ',
          '      /> <\\         ',
          '      | ‿ |         ',
          '       \\_/          ',
          '       / \\          ',
          '       | |          ',
          '      ──────        ',
          '                    ',
          '    ████████████    ',
          '    ████████████    ',
          '                    ',
        ],
        subtitle: 'but the idea refuses to disappear.',
      },
    ],
  },
  {
    episode: 'EP. 04',
    title: 'the search',
    frameDuration: 650,
    frames: [
      {
        art: [
          '  [▪][▪][▪][▪][+]   ',
          '  ┌──────────────┐  ',
          '  │ > how to     │  ',
          '  │   build _    │  ',
          '  ├──────────────┤  ',
          '  │ tutorial #47 │  ',
          '  │ ██████░░░░░  │  ',
          '  └──────────────┘  ',
          '         ___        ',
          '        /- -\\       ',
          '        |- -|       ',
          '                    ',
        ],
        subtitle: 'late nights. open tabs. half-finished projects.',
      },
      {
        art: [
          '  [▪][▪][▪][▪][+]   ',
          '  ┌──────────────┐  ',
          '  │ > how to     │  ',
          '  │   build _    │  ',
          '  ├──────────────┤  ',
          '  │ tutorial #48 │  ',
          '  │ ████░░░░░░░  │  ',
          '  └──────────────┘  ',
          '         ___        ',
          '        /~_~\\       ',
          '        |~_~|       ',
          '                    ',
        ],
        subtitle: 'the person searches for others like them.',
      },
      {
        art: [
          '  [▪][▪][▪][▪][+]   ',
          '  ┌──────────────┐  ',
          '  │ > nobody     │  ',
          '  │   nearby _   │  ',
          '  ├──────────────┤  ',
          '  │ 0 results    │  ',
          '  │              │  ',
          '  └──────────────┘  ',
          '         ___        ',
          '        /; ;\\       ',
          '        |T_T|       ',
          '                    ',
        ],
        subtitle: 'nobody nearby understands.',
      },
    ],
  },
  {
    episode: 'EP. 05',
    title: 'the signal',
    frameDuration: 500,
    frames: [
      {
        art: [
          '                    ',
          '   ·    ·    ·      ',
          '       ·    ·       ',
          '   ·        ·       ',
          '       ·    ·       ',
          '   ·    ·    ·      ',
          '                    ',
          '         ___        ',
          '        /- -\\       ',
          '        |─_─|       ',
          '                    ',
          '                    ',
        ],
        subtitle: 'a message appears in the darkness.',
      },
      {
        art: [
          '                    ',
          '   ████████████     ',
          '   █          █     ',
          '   █          █     ',
          '   █          █     ',
          '   █          █     ',
          '   ████████████     ',
          '                    ',
          '         ___        ',
          '        /o o\\       ',
          '        | ‿ |       ',
          '                    ',
        ],
        subtitle: 'WELCOME TO BOLDSPACE.',
      },
      {
        art: [
          '                    ',
          '   ╔══════════════╗  ',
          '   ║              ║  ',
          '   ║  BOLDSPACE.  ║  ',
          '   ║              ║  ',
          '   ║ BUILD PUBLIC ║  ',
          '   ║ FIND PEOPLE  ║  ',
          '   ║              ║  ',
          '   ╚══════════════╝  ',
          '         ___        ',
          '        /*_*\\       ',
          '                    ',
        ],
        subtitle: 'the person clicks.',
      },
      {
        art: [
          '    ·  [■]  ·  [■]  ',
          '   ╔══════════════╗  ',
          '   ║  BOLDSPACE.  ║  ',
          '   ║ BUILD PUBLIC ║  ',
          '   ╚══════════════╝  ',
          '  [■]  ·  [■]  ·    ',
          '    ·  [■]  ·  [■]  ',
          '                    ',
          '         ___        ',
          '        /*_*\\       ',
          '        \\o/         ',
          '                    ',
        ],
        subtitle: 'lights begin turning on around the world.',
      },
    ],
  },
  {
    episode: 'EP. 06',
    title: 'the builders',
    frameDuration: 600,
    frames: [
      {
        art: [
          '                    ',
          '  [■]──[■]──[■]     ',
          '   |    |    |      ',
          '  [■]──[■]──[■]     ',
          '   |    |    |      ',
          '  [■]──[■]──[■]     ',
          '                    ',
          '         ___        ',
          '        /o o\\       ',
          '        | ‿ |       ',
          '        \\o/         ',
          '                    ',
        ],
        subtitle: 'developers. designers. creators. founders.',
      },
      {
        art: [
          '                    ',
          '  [■]──[■]──[■]──[■]',
          '   |    |    |    | ',
          '  [■]──[■]──[■]──[■]',
          '   |    |    |    | ',
          '  [■]──[■]──[■]──[■]',
          '   |    |    |    | ',
          '  [■]──[■]──[■]──[■]',
          '                    ',
          '         ___        ',
          '        /*_*\\       ',
          '                    ',
        ],
        subtitle: 'strangers becoming teammates.',
      },
      {
        art: [
          '  [■]──[■]──[■]──[■]',
          '   |╲   |   |   ╱|  ',
          '  [■]──[■]──[■]──[■]',
          '   |   ╲|  |╱   |   ',
          '  [■]──[■]──[■]──[■]',
          '   |  ╱ |   | ╲  |  ',
          '  [■]──[■]──[■]──[■]',
          '                    ',
          '   NO SPECTATORS.   ',
          '   ONLY BUILDERS.   ',
          '                    ',
          '                    ',
        ],
        subtitle: 'no spectators. only builders.',
      },
    ],
  },
  {
    episode: 'EP. 07',
    title: 'the first build',
    frameDuration: 600,
    frames: [
      {
        art: [
          '                    ',
          '          /\\        ',
          '         /  \\       ',
          '        / !! \\      ',
          '       /______\\     ',
          '       |      |     ',
          '   ~~~~|      |~~~~ ',
          '       |      |     ',
          '    ┌──┴──────┴──┐  ',
          '    │  BUILDING  │  ',
          '    └────────────┘  ',
          '                    ',
        ],
        subtitle: 'an unfinished project ships.',
      },
      {
        art: [
          '    🚀              ',
          '       /\\           ',
          '      /  \\          ',
          '     / !! \\         ',
          '    /______\\        ',
          '    |      |        ',
          '~~~~|      |~~~~    ',
          '    |      |        ',
          ' ┌──┴──────┴──┐     ',
          ' │  SHIPPED.  │     ',
          ' └────────────┘     ',
          '                    ',
        ],
        subtitle: "it's imperfect. people cheer anyway.",
      },
      {
        art: [
          '         ___        ',
          '        /*_*\\       ',
          '        \\o/         ',
          '     → → → →        ',
          '       /   \\        ',
          '                    ',
          '   ✦ CONGRATS! ✦    ',
          '  ✦ FIRST BUILD ✦   ',
          '   ✦ SHIPPED!  ✦    ',
          '                    ',
          '                    ',
          '                    ',
        ],
        subtitle: 'ideas become products. products become companies.',
      },
    ],
  },
  {
    episode: 'EP. 08',
    title: 'the open world',
    frameDuration: 550,
    frames: [
      {
        art: [
          '  ·  [■]  ·  [■] ·  ',
          ' [■]  ·  [■]  ·  [■]',
          '  ·  [■]  ·  [■] ·  ',
          ' [■]  ·  [■]  ·  [■]',
          '  ·  [■]  ·  [■] ·  ',
          ' [■]  ·  [■]  ·  [■]',
          '  ·  [■]  ·  [■] ·  ',
          '                    ',
          '  BUILDERS WORLDWIDE',
          '      2:00 AM       ',
          '                    ',
          '                    ',
        ],
        subtitle: 'thousands of lights across the globe.',
      },
      {
        art: [
          ' ✦[■]✦[■]✦[■]✦[■]✦ ',
          '[■]✦[■]✦[■]✦[■]✦[■]',
          ' ✦[■]✦[■]✦[■]✦[■]✦ ',
          '[■]✦[■]✦[■]✦[■]✦[■]',
          ' ✦[■]✦[■]✦[■]✦[■]✦ ',
          '[■]✦[■]✦[■]✦[■]✦[■]',
          ' ✦[■]✦[■]✦[■]✦[■]✦ ',
          '                    ',
          ' NO PERMISSION.     ',
          ' NO GATEKEEPERS.    ',
          '                    ',
          '                    ',
        ],
        subtitle: 'no permission. no gatekeepers.',
      },
      {
        art: [
          ' ✦[■]✦[■]✦[■]✦[■]✦ ',
          '[■]✦[■]✦[■]✦[■]✦[■]',
          ' ✦[■]✦[■]✦[■]✦[■]✦ ',
          '                    ',
          ' THE INTERNET HAS   ',
          ' ENOUGH SPECTATORS. ',
          '                    ',
          ' WE NEED MORE       ',
          ' BUILDERS.          ',
          '                    ',
          '                    ',
          '                    ',
        ],
        subtitle: 'we need more builders.',
      },
    ],
  },
  {
    episode: 'EP. 09',
    title: 'the invitation',
    frameDuration: 700,
    frames: [
      {
        art: [
          '                    ',
          '  ┌────────────┐    ',
          '  │            │    ',
          '  │            │    ',
          '  │            │    ',
          '  │            │    ',
          '  │            │    ',
          '  └──── ───────┘    ',
          '                    ',
          '         ___        ',
          '        /o o\\       ',
          '        | ‿ |       ',
        ],
        subtitle: 'the camera returns to the first room.',
      },
      {
        art: [
          '         ░░░        ',
          '  ┌──────░░░──┐     ',
          '  │      ░░░  │     ',
          '  │      ░░░  │     ',
          '  │      ░░░  │     ',
          '  │      ░░░  │     ',
          '  │      ░░░  │     ',
          '  └──── ───────┘    ',
          '                    ',
          '         ___        ',
          '        /O O\\       ',
          '        | ‿ |       ',
        ],
        subtitle: "the person isn't alone. the door is open.",
      },
      {
        art: [
          '        ████        ',
          '  ┌─────████─┐      ',
          '  │     ████ │      ',
          '  │     ████ │      ',
          '  │     ████ │      ',
          '  │     ████ │      ',
          '  │     ████ │      ',
          '  └──── ───────┘    ',
          '                    ',
          '         ___        ',
          '        /*_*\\       ',
          '        \\o/         ',
        ],
        subtitle: 'a cursor blinks. waiting.',
      },
      {
        art: [
          '       ░░░░░░░      ',
          '  ┌────░░░░░░░─┐    ',
          '  │    ░ ENTER ░│    ',
          '  │    ░  THE  ░│    ',
          '  │    ░  OPEN ░│    ',
          '  │    ░ WORLD ░│    ',
          '  │    ░░░░░░░  │    ',
          '  └──── ───────┘    ',
          '                    ',
          '           ▌        ',
          '                    ',
          '                    ',
        ],
        subtitle: 'build something unforgettable.',
      },
    ],
  },
];

export default function AsciiStory() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [sceneVisible, setSceneVisible] = useState(true);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const frameInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (frameInterval.current) clearInterval(frameInterval.current);
  };

  const after = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  const scene = SCENES[sceneIndex];
  const frame = scene.frames[frameIndex];

  useEffect(() => {
    clear();
    setSceneVisible(false);
    setFrameIndex(0);
    setSubtitleVisible(false);

    after(() => {
      setSceneVisible(true);
      after(() => setSubtitleVisible(true), 300);

      // animate frames
      let fi = 0;
      frameInterval.current = setInterval(() => {
        fi = (fi + 1) % scene.frames.length;
        setFrameIndex(fi);
        setSubtitleVisible(false);
        setTimeout(() => setSubtitleVisible(true), 150);
      }, scene.frameDuration * scene.frames.length);

    }, 200);

    // advance to next scene
    const sceneDuration = scene.frameDuration * scene.frames.length * 3 + 1500;
    after(() => {
      setSceneVisible(false);
      after(() => {
        setSceneIndex(p => (p + 1) % SCENES.length);
      }, 600);
    }, sceneDuration);

    return clear;
  }, [sceneIndex]); // eslint-disable-line

  // Frame-level animation independent of scene
  useEffect(() => {
    if (!sceneVisible) return;
    const interval = setInterval(() => {
      setSubtitleVisible(false);
      setFrameIndex(p => (p + 1) % scene.frames.length);
      setTimeout(() => setSubtitleVisible(true), 150);
    }, scene.frameDuration);
    return () => clearInterval(interval);
  }, [sceneVisible, sceneIndex]); // eslint-disable-line

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
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .scene-fade { animation: fadeIn 0.5s ease forwards; }
        .sub-slide  { animation: slideUp 0.25s ease forwards; }
      `}</style>

      {/* ── Top letterbox bar */}
      <div style={{
        height: '13%',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 800,
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          opacity: sceneVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          {scene.episode}
        </span>
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 800,
          fontSize: '13px',
          letterSpacing: '-0.02em',
          color: '#fff',
          textTransform: 'lowercase',
          opacity: sceneVisible ? 1 : 0,
          transition: 'opacity 0.4s ease 0.1s',
        }}>
          {scene.title}
        </span>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {SCENES.map((_, i) => (
            <div key={i} style={{
              width: i === sceneIndex ? '16px' : '4px',
              height: '2px',
              backgroundColor: i === sceneIndex ? '#fff' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
              borderRadius: '1px',
            }} />
          ))}
        </div>
      </div>

      {/* ── Main film frame */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        opacity: sceneVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <pre
          key={`${sceneIndex}-${frameIndex}`}
          className="scene-fade"
          style={{
            fontFamily: "'Courier New', 'Lucida Console', monospace",
            fontSize: '13px',
            lineHeight: 1.65,
            color: '#fff',
            margin: 0,
            textAlign: 'center',
            userSelect: 'none',
            whiteSpace: 'pre',
          }}
        >
          {frame.art.join('\n')}
        </pre>
      </div>

      {/* ── Bottom letterbox bar — subtitles */}
      <div style={{
        height: '16%',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 28px',
        flexShrink: 0,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {subtitleVisible && sceneVisible && (
          <p
            key={`sub-${sceneIndex}-${frameIndex}`}
            className="sub-slide"
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {frame.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
