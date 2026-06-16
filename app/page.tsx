'use client';

import { useEffect } from 'react';
import Script from 'next/script';

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
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
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
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '35%',
          minWidth: '320px',
          height: '100%',
          backgroundColor: '#000',
          padding: '30px 40px 60px 40px',
          flexShrink: 0,
        }}
      >
        {/* Logo — top left */}
        <div>
          <svg
            viewBox="0 0 235 200"
            style={{ width: '26px', height: '26px', fill: '#fff' }}
          >
            <path d="m94.005 16.289 9.332-9.734c6.691-7.787 19.567-9.414 27.769-.608l98.837 106.12c8.145 8.745 6.021 22.797-4.345 28.744l-98.837 56.701c-6.811 3.907-14.546 2.957-20.123-1.067L9.325 140.618c-10.366-5.947-12.49-19.999-4.345-28.744a11.812 11.812 0 0 1 14.55-2.179l87.108 50.119v-37.648L49.802 89.674c-8.026-4.643-9.659-15.539-3.348-22.33l.012-.013.009-.01a14.441 14.441 0 0 1 17.779-2.654l42.384 24.013V52.34l-13.484-8.485c-8.26-4.77-15.716-9.779-9.215-16.758l10.066-10.808Z" />
          </svg>
        </div>

        {/* Bottom content block */}
        <div>
          {/* Heading */}
          <h1
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 800,
              fontSize: '64px',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#fff',
              margin: '0 0 16px 0',
              textTransform: 'lowercase',
            }}
          >
            hi. this was boldspace.
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.45)',
              margin: '0 0 32px 0',
              maxWidth: '420px',
            }}
          >
            we were the biggest school in the world for people who wanted to work on their own ideas — ty for the memories. love you.
          </p>

          {/* Buttons — inline, side by side */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            {/* Primary button — white fill */}
            <a
              href="/letter"
              id="read-manifesto-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 24px',
                backgroundColor: '#fff',
                color: '#000',
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: 1,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                border: 'none',
                borderRadius: '0',
                cursor: 'pointer',
              }}
            >
              read our manifesto
            </a>

            {/* Secondary button — outline */}
            <a
              href="https://boldspace.so"
              id="join-boldspace-home-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: 1,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '0',
                cursor: 'pointer',
              }}
            >
              join boldspace →
            </a>
          </div>
        </div>
      </div>

      {/* ─── Right Panel — Video ─── */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <video
          src="https://framerusercontent.com/assets/sRXQsZpCuTpukMUfotGcRUuvg.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
