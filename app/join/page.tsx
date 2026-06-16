'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AsciiStory from '../components/AsciiStory';

export default function JoinPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen md:h-screen bg-black overflow-hidden flex flex-col md:flex-row">
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* ─── Left Panel — Form ─── */}
      <div className="relative z-10 flex flex-col justify-between w-full md:w-[45%] lg:w-[40%] md:min-w-[400px] min-h-screen md:h-full bg-black px-8 py-12 md:px-16 md:py-[80px] flex-shrink-0">
        
        {/* Logo / Home Link */}
        <div>
          <Link
            href="/"
            className="inline-block font-extrabold text-[22px] tracking-[-0.04em] text-white lowercase no-underline hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            boldspace<span className="logo-dot">.</span>
          </Link>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h1
            className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-white mb-6 leading-[1.05]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            join the waitlist.
          </h1>

          <p
            className="font-normal text-base md:text-[18px] leading-[1.6] text-white/45 mb-10 max-w-[420px]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            we're bringing something new to the internet. secure your spot early.
          </p>

          {/* Form */}
          {status === 'success' ? (
            <div className="p-6 border border-white/20 bg-white/5 animate-fade-in flex flex-col gap-2 max-w-[420px]">
              <span className="font-semibold text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                you're on the list.
              </span>
              <span className="text-white/60 text-base" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                keep an eye on your inbox. we'll be in touch soon.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-[420px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email address"
                disabled={status === 'submitting'}
                className="flex-1 px-5 py-[14px] bg-transparent border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all disabled:opacity-50"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center px-6 py-[14px] bg-white text-black font-semibold text-[16px] leading-none no-underline whitespace-nowrap cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {status === 'submitting' ? 'joining...' : 'join →'}
              </button>
            </form>
          )}
        </div>

        {/* Footer Link */}
        <div className="mt-auto">
          <Link
            href="/manifesto"
            className="inline-block font-normal text-[15px] text-white/40 hover:text-white transition-colors"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            read our manifesto instead →
          </Link>
        </div>
      </div>

      {/* ─── Right Panel — Ascii Story ─── */}
      <div className="hidden md:block relative flex-1 h-full bg-black overflow-hidden border-l border-white/10">
        <AsciiStory />
      </div>
    </div>
  );
}
