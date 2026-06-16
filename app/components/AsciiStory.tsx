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
    frameDuration: 900,
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
          '    [  there has  ] ',
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
    frameDuration: 850,
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
    frameDuration: 850,
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
        subtitle: '"you\'re too early. wait until you\'re ready."',
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
    frameDuration: 900,
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
        subtitle: 'late nights. open tabs.',
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
    frameDuration: 800,
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
          '   ████████████     ',
          '                    ',
          '         ___        ',
          '        /o o\\       ',
          '        | ‿ |       ',
          '                    ',
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
          '   ║ BUILD PUBLIC ║  ',
          '   ║ FIND PEOPLE  ║  ',
          '   ║              ║  ',
          '   ╚══════════════╝  ',
          '         ___        ',
          '        /*_*\\       ',
          '                    ',
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
    frameDuration: 850,
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
          '   |\\   |   |   /|  ',
          '  [■]──[■]──[■]──[■]',
          '   |   \\|   |/   |  ',
          '  [■]──[■]──[■]──[■]',
          '   |  / |   | \\  |  ',
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
    frameDuration: 800,
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
          '                    ',
          '         /\\         ',
          '        /  \\        ',
          '       / !! \\       ',
          '      /______\\      ',
          '      |      |      ',
          '  ~~~~|      |~~~~  ',
          '   ┌──┴──────┴──┐   ',
          '   │  SHIPPED.  │   ',
          '   └────────────┘   ',
          '                    ',
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
          '                    ',
          '   ✦ CONGRATS! ✦    ',
          '  ✦ FIRST BUILD ✦   ',
          '   ✦ SHIPPED!  ✦    ',
          '                    ',
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
    frameDuration: 800,
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
    frameDuration: 900,
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
          '  │  ENTER   │      ',
          '  │   THE    │      ',
          '  │  OPEN    │      ',
          '  │  WORLD   │      ',
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
          '  │    ░ ENTER ░│   ',
          '  │    ░  THE  ░│   ',
          '  │    ░  OPEN ░│   ',
          '  │    ░ WORLD ░│   ',
          '  │    ░░░░░░░  │   ',
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

const FADE_DURATION = 200; // ms for crossfade

export default function AsciiStory() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [artOpacity, setArtOpacity] = useState(1);
  const [subtitleOpacity, setSubtitleOpacity] = useState(1);
  const [sceneOpacity, setSceneOpacity] = useState(1);

  // Store displayed content separately so we swap AFTER fade-out
  const [displayedArt, setDisplayedArt] = useState(SCENES[0].frames[0].art);
  const [displayedSubtitle, setDisplayedSubtitle] = useState(SCENES[0].frames[0].subtitle);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const frameTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (frameTimer.current) clearInterval(frameTimer.current);
  };

  const after = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  // Smooth crossfade to a new frame
  const crossfadeToFrame = (newArt: string[], newSubtitle: string) => {
    // fade out
    setArtOpacity(0);
    setSubtitleOpacity(0);
    after(() => {
      // swap content while invisible
      setDisplayedArt(newArt);
      setDisplayedSubtitle(newSubtitle);
      // fade in
      setArtOpacity(1);
      setSubtitleOpacity(1);
    }, FADE_DURATION);
  };

  useEffect(() => {
    clear();

    const scene = SCENES[sceneIndex];
    let fi = 0;

    // show first frame immediately
    crossfadeToFrame(scene.frames[0].art, scene.frames[0].subtitle);
    setFrameIndex(0);

    // cycle frames
    frameTimer.current = setInterval(() => {
      fi = (fi + 1) % scene.frames.length;
      setFrameIndex(fi);
      crossfadeToFrame(scene.frames[fi].art, scene.frames[fi].subtitle);
    }, scene.frameDuration);

    // advance scene
    const totalDuration = scene.frameDuration * scene.frames.length * 3 + 1000;
    after(() => {
      // fade out whole scene
      setSceneOpacity(0);
      after(() => {
        setSceneIndex(p => (p + 1) % SCENES.length);
        setSceneOpacity(1);
      }, 500);
    }, totalDuration);

    return clear;
  }, [sceneIndex]); // eslint-disable-line

  const scene = SCENES[sceneIndex];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      opacity: sceneOpacity,
      transition: `opacity 0.5s ease`,
    }}>

      {/* ── Top bar */}
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
        }}>
          {scene.title}
        </span>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {SCENES.map((_, i) => (
            <div key={i} style={{
              width: i === sceneIndex ? '16px' : '4px',
              height: '2px',
              backgroundColor: i === sceneIndex ? '#fff' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.5s ease',
              borderRadius: '1px',
            }} />
          ))}
        </div>
      </div>

      {/* ── Main frame */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
      }}>
        <pre style={{
          fontFamily: "'Courier New', 'Lucida Console', monospace",
          fontSize: '13px',
          lineHeight: 1.65,
          color: '#fff',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'pre',
          opacity: artOpacity,
          transition: `opacity ${FADE_DURATION}ms ease`,
        }}>
          {displayedArt.join('\n')}
        </pre>
      </div>

      {/* ── Bottom subtitle bar */}
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
        <p style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: '13px',
          lineHeight: 1.5,
          color: 'rgba(255,255,255,0.55)',
          textAlign: 'center',
          margin: 0,
          opacity: subtitleOpacity,
          transition: `opacity ${FADE_DURATION}ms ease`,
        }}>
          {displayedSubtitle}
        </p>
      </div>
    </div>
  );
}
