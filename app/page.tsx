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
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* PostHog Analytics Script */}
      <Script
        id="posthog-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_cvM8JgK6STaggawSqoXz2l83uEKpEYF2dWSsIgoOGe4',{api_host:"https://sage.buildspace.so/ingest"})
          `,
        }}
      />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
          backgroundSize: '64px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 h-16 z-20 flex items-center px-6">
        <div className="w-10 h-10">
          {/* <svg viewBox="0 0 235 200" className="w-full h-full fill-black">
            <path d="m94.005 16.289 9.332-9.734c6.691-7.787 19.567-9.414 27.769-.608l98.837 106.12c8.145 8.745 6.021 22.797-4.345 28.744l-98.837 56.701c-6.811 3.907-14.546 2.957-20.123-1.067L9.325 140.618c-10.366-5.947-12.49-19.999-4.345-28.744a11.812 11.812 0 0 1 14.55-2.179l87.108 50.119v-37.648L49.802 89.674c-8.026-4.643-9.659-15.539-3.348-22.33l.012-.013.009-.01a14.441 14.441 0 0 1 17.779-2.654l42.384 24.013V52.34l-13.484-8.485c-8.26-4.77-15.716-9.779-9.215-16.758l10.066-10.808Z" />
          </svg> */}
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Left Content */}
        <div className="w-full md:w-1/3 h-1/3 md:h-full flex flex-col justify-end px-6 sm:px-8 md:px-16 py-8 md:py-12 md:border-r border-gray-800/50 order-2 md:order-1">
          <div className="max-w-md">
            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight lowercase"
              style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.04em' }}
            >
              hi. this was buildspace.
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg md:text-xl text-gray-400/60 mb-6 md:mb-8 leading-relaxed"
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}
            >
              we were the biggest school in the world for people who wanted to work on their own ideas — ty for the memories. love you.
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              {/* Primary Button */}
              <a
                href="/letter"
                className="block w-full bg-white text-black font-bold text-center py-3 sm:py-4 text-sm sm:text-base hover:bg-gray-100 transition-colors duration-200"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '20px' }}
              >
                read final letter
              </a>
            </div>
          </div>
        </div>

        {/* Right Video */}
        <div className="w-full md:w-2/3 h-2/3 md:h-full relative flex items-center justify-center p-4 md:p-0 order-1 md:order-2">
          <video
            src="https://framerusercontent.com/assets/sRXQsZpCuTpukMUfotGcRUuvg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
