'use client';

import React, { useEffect, useRef } from 'react';

const CONFIG = {
  particleCount: 80,
  connectionDistance: 150,
  mouseDistance: 200,
  particleSpeed: 0.3,
  lineOpacity: 0.15,
  dotOpacity: 0.6,
  dotSize: 1.5,
  mouseDotSize: 3,
  colors: {
    dot: '255, 255, 255',
    line: '255, 255, 255',
  }
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: any[] = [];
    let width = 0;
    let height = 0;
    let mouse = { x: null as number | null, y: null as number | null };

    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 40 : CONFIG.particleCount;
    const connectionDistance = isMobile ? 100 : CONFIG.connectionDistance;

    function createParticle() {
      const size = random(CONFIG.dotSize * 0.5, CONFIG.dotSize * 1.5);
      return {
        x: random(0, width || window.innerWidth),
        y: random(0, height || window.innerHeight),
        vx: random(-CONFIG.particleSpeed, CONFIG.particleSpeed),
        vy: random(-CONFIG.particleSpeed, CONFIG.particleSpeed),
        size: size,
        baseSize: size,
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function animate() {
      if (!canvas || !ctx) return;

      const parent = canvas.parentElement;
      if (parent) {
        const currentWidth = parent.clientWidth;
        const currentHeight = parent.clientHeight;
        
        if (width !== currentWidth || height !== currentHeight) {
          width = currentWidth;
          height = currentHeight;
          canvas.width = width;
          canvas.height = height;
          
          if (width > 0 && height > 0) {
            initParticles();
          }
        }
      }

      // Safety check: if particles empty but we have dimensions, populate them
      if (particles.length === 0 && width > 0 && height > 0) {
        initParticles();
      }

      // If dimensions are still 0, retry next frame
      if (width === 0 || height === 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const rect = canvas.getBoundingClientRect();
          const mouseX = mouse.x - rect.left;
          const mouseY = mouse.y - rect.top;
          const dist = getDistance(p.x, p.y, mouseX, mouseY);
          
          if (dist < CONFIG.mouseDistance) {
            const force = (CONFIG.mouseDistance - dist) / CONFIG.mouseDistance;
            const angle = Math.atan2(p.y - mouseY, p.x - mouseX);
            p.x += Math.cos(angle) * force * 0.5;
            p.y += Math.sin(angle) * force * 0.5;
            p.size = p.baseSize + (CONFIG.mouseDotSize - p.baseSize) * force;
          } else {
            p.size = p.baseSize;
          }
        } else {
          p.size = p.baseSize;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.colors.dot}, ${CONFIG.dotOpacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = getDistance(particles[i].x, particles[i].y, particles[j].x, particles[j].y);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * CONFIG.lineOpacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${CONFIG.colors.line}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mouse.x !== null && mouse.y !== null) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = mouse.x - rect.left;
        const mouseY = mouse.y - rect.top;

        particles.forEach(p => {
          const dist = getDistance(mouseX, mouseY, p.x, p.y);
          if (dist < CONFIG.mouseDistance) {
            const opacity = (1 - dist / CONFIG.mouseDistance) * CONFIG.lineOpacity * 1.5;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${CONFIG.colors.line}, ${opacity})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };
    const handleTouchMove = (e: TouchEvent) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; };
    const handleTouchEnd = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Boot
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
      }}
    />
  );
}
