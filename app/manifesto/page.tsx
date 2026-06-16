'use client';

import { useEffect } from 'react';

export default function LetterPage() {
  useEffect(() => {
    // PostHog tracking
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('hit_landing_page', {
        path: window.location.pathname,
        host: window.location.host,
      });
    }

    // Track link clicks
    const trackClick = (href: string) => {
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('hit_cta_landing', {
          path: window.location.pathname,
          host: window.location.host,
          href: href,
        });
      }
    };

    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        trackClick(link.getAttribute('href') || '');
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Logo */}
      <header className="px-6 sm:px-8 md:px-16 py-6 sm:py-8">
        <a href="/" className="text-xl md:text-2xl font-black text-black lowercase" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.04em' }}>
          boldspace<span style={{
            animation: 'colorChange 8s infinite'
          }}>.</span>
        </a>
      </header>

      <style jsx>{`
        @keyframes colorChange {
          0% { color: #000; }
          25% { color: #0099ff; }
          50% { color: #ff0066; }
          75% { color: #00cc88; }
          100% { color: #000; }
        }
        .dot-animation {
          animation: colorChange 8s infinite;
        }
      `}</style>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-0 py-8 sm:py-12 lg:py-16">
        <div className="max-w-2xl lg:max-w-3xl mx-auto">
          {/* Audio Player */}
          <div className="bg-gray-200 rounded-lg p-4 sm:p-6 mb-10 sm:mb-16 flex items-center gap-4 sm:gap-6">
            <audio
              src="https://framerusercontent.com/assets/s6Kcvm0lGpVdIimLMjrCJjPgd28.mp3"
              controls
              className="w-full flex-1"
            />
          </div>

          {/* Letter Content */}
          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-gray-800 font-medium">
          <p>
            [hi play above track as you read this]
            <br />
            <br />
            by: sanju.
            <br />
            published: aug 23, 2025.
          </p>

          <p>
            so… this thing we’re building.
            <br />
            <br />
            it’s bigger than a platform to me.
            <br />
            it’s the place i wish existed when i first started.
          </p>

          <p>
            a place where people with wild ideas don’t get laughed at.
            <br />
            where builders stop overthinking and start shipping.
            <br />
            where someone sitting alone in a room can create something real and show it to the world.
          </p>

          <p>
            that’s why i started this.
            <br />
            <br />
            not to build another “startup”.
            <br />
            not to make another boring course platform.
            <br />
            not to create fake motivation content.
          </p>

          <p>
            i want to build an open world for builders.
            <br />
            <br />
            a place where people learn by doing.
            <br />
            where ideas become products.
            <br />
            where creators become founders.
            <br />
            where strangers become teams.
            <br />
            where people stop consuming and finally start creating.
          </p>

          <p>
            because honestly?
            <br />
            <br />
            the internet has enough spectators.
            <br />
            <br />
            we need more builders.
          </p>

          <p>
            for the last year, i’ve been obsessed with this vision.
            <br />
            <br />
            thinking about it every day.
            <br />
            staying awake imagining what this could become.
            <br />
            imagining thousands of people around the world building together at 2am.
            <br />
            shipping products.
            <br />
            making films.
            <br />
            training ai.
            <br />
            starting companies.
            <br />
            creating movements.
          </p>

          <p>
            not because someone told them to.
            <br />
            <br />
            but because they finally found people like them.
            <br />
            <br />
            that’s what this is about.
          </p>

          <p>
            from aug 23, 2025 onwards —
            <br />
            we’re building this from the ground up.
            <br />
            <br />
            and unlike traditional education,
            <br />
            we won’t teach people to wait for permission.
            <br />
            <br />
            we’ll teach them to build.
          </p>

          <p>
            real products.
            <br />
            real startups.
            <br />
            real systems.
            <br />
            real skills.
            <br />
            <br />
            the goal is simple:
            <br />
            <br />
            help people turn ideas into reality and publish them into the open world.
          </p>

          <p>
            i don’t care where someone comes from.
            <br />
            <br />
            college dropout.
            <br />
            developer.
            <br />
            designer.
            <br />
            editor.
            <br />
            student.
            <br />
            someone completely lost in life.
            <br />
            <br />
            if you have curiosity,
            <br />
            if you have obsession,
            <br />
            if there’s a fire in you to make something—
            <br />
            <br />
            you belong here.
          </p>

          <p>
            this won’t be easy.
            <br />
            <br />
            we’re going to experiment a lot.
            <br />
            some things will fail publicly.
            <br />
            some ideas will look insane.
            <br />
            people will doubt us.
            <br />
            <br />
            good.
            <br />
            <br />
            the internet rewards people who dare to create.
          </p>

          <p>
            i want this place to feel alive.
            <br />
            <br />
            i want people making projects together at midnight.
            <br />
            i want people meeting their future cofounders here.
            <br />
            i want someone to launch their first startup because of one random conversation inside this community.
            <br />
            i want creators to stop hiding their work.
            <br />
            i want builders to become undeniable.
          </p>

          <p>
            and most importantly—
            <br />
            <br />
            i want people to realize they are capable of building far more than they think.
          </p>

          <p>
            this is only the beginning.
            <br />
            <br />
            one day this could become:
            <br />
            - a global builder network
            <br />
            - an ai-native startup ecosystem
            <br />
            - a creator campus
            <br />
            - a place where internet people become real-world companies
            <br />
            - a launchpad for the next generation of builders
          </p>

          <p>
            but for now?
            <br />
            <br />
            we start small.
            <br />
            <br />
            one builder.
            <br />
            one idea.
            <br />
            one project at a time.
          </p>

          <p>
            to everyone joining early:
            <br />
            <br />
            thank you for believing before there was proof.
            <br />
            <br />
            thank you for taking a bet on yourself.
          </p>

          <p>
            years from now,
            <br />
            when people ask where it all started—
            <br />
            <br />
            you’ll be able to say:
            <br />
            <br />
            “i was there from the beginning.”
          </p>

          <p>
            let’s build something unforgettable.
            <br />
            <br />
            i love u all.
            <br />
            see you in the open world.
            <br />
            <br />— sanju
          </p>

          {/* Join Boldspace CTA */}
          <div className="mt-12 sm:mt-16 mb-4 flex flex-col items-start gap-3">
            <a
              href="/"
              id="join-boldspace-btn"
              className="join-boldspace-btn"
            >
              join boldspace →
            </a>
          </div>
        </div>
        </div>
      </div>

      <style jsx>{`
        .join-boldspace-btn {
          display: inline-block;
          padding: 14px 32px;
          background: #000;
          color: #fff;
          font-family: Manrope, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          border-radius: 999px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
        }
        .join-boldspace-btn:hover {
          background: #111;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .join-boldspace-btn:active {
          transform: translateY(0) scale(0.99);
        }
      `}</style>

      {/* Thank You Video Footer */}
      <div className="w-screen aspect-video md:aspect-auto md:h-screen flex items-center justify-center bg-black">
        <video
          src="/ty_viedio.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
