'use client';

import { useEffect } from 'react';
import Script from 'next/script';

import Constellation from './components/Constellation';

export default function Home() {
  useEffect(() => {
    // PostHog tracking
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('hit_landing_page', {
        path: window.location.pathname,
        host: window.location.host,
      });
    }

    // Track link clicks
    const handleLinkClick = (href: string) => {
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('hit_cta_landing', {
          path: window.location.pathname,
          host: window.location.host,
          href: href,
        });
      }
    };

    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        handleLinkClick(link.href);
      });
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen md:h-screen bg-black overflow-hidden flex flex-col md:flex-row">
      {/* PostHog Analytics Script */}
      <Script
        id="posthog-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_cvM8JgK6STaggawSqoXz2l83uEKpEYF2dWSsIgoOGe4',{api_host:"https://sage.boldspace.so/ingest"})
          `,
        }}
      />

      {/* ─── Left Panel ─── */}
      <div className="relative z-10 flex flex-col justify-between w-full md:w-[35%] md:min-w-[320px] min-h-screen md:h-full bg-black px-6 py-10 md:px-10 md:py-[60px] md:pt-[30px] flex-shrink-0">
        {/* Logo — top left */}
        <div>
          <style>{`
            @keyframes dotColorCycle {
              0%   { color: #fff; }
              25%  { color: #0099ff; }
              50%  { color: #ff0066; }
              75%  { color: #00cc88; }
              100% { color: #fff; }
            }
            .logo-dot {
              animation: dotColorCycle 4s steps(1, end) infinite;
            }
          `}</style>
          <span
            className="font-extrabold text-[22px] tracking-[-0.04em] text-white lowercase"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            boldspace<span className="logo-dot">.</span>
          </span>
        </div>

        {/* Bottom content block */}
        <div className="mt-12 md:mt-0">
          {/* Heading */}
          <h1
            className="font-extrabold text-5xl md:text-[64px] leading-[1.1] tracking-[-0.04em] text-white mb-4 lowercase"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            hi. this was boldspace.
          </h1>

          {/* Description */}
          <p
            className="font-normal text-base md:text-[18px] leading-[1.6] text-white/45 mb-8 max-w-[420px]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            we were the biggest school in the world for people who wanted to work on their own ideas — ty for the memories. love you.
          </p>

          {/* Buttons — inline, side by side */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary button — white fill */}
            <a
              href="/manifesto"
              id="read-manifesto-btn"
              className="inline-flex items-center justify-center px-6 py-[14px] bg-white text-black font-semibold text-[16px] leading-none no-underline whitespace-nowrap cursor-pointer hover:bg-gray-200 transition-colors"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              read our manifesto
            </a>

            {/* Secondary button — outline */}
            <a
              href="https://boldspace.so"
              id="join-boldspace-home-btn"
              className="inline-flex items-center justify-center px-6 py-[14px] bg-white/5 text-white font-semibold text-[16px] leading-none no-underline whitespace-nowrap border border-white/15 cursor-pointer hover:bg-white/10 transition-colors"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              join boldspace →
            </a>
          </div>
        </div>
      </div>

      {/* ─── Right Panel — Constellation Canvas ─── */}
      <div className="hidden md:block relative flex-1 h-full bg-black overflow-hidden border-l border-white/10">
        <Constellation />
      </div>
    </div>
  );
}
