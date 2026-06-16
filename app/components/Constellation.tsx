'use client';

import React, { useEffect, useRef } from 'react';

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration - Tweak these values to change the vibe
    const CONFIG = {
      particleCount: 80,          // Number of dots (reduce for mobile)
      connectionDistance: 150,    // Max distance to draw lines
      mouseDistance: 200,       // Mouse interaction radius
      particleSpeed: 0.3,         // How fast particles drift
      lineOpacity: 0.15,          // Line transparency (0-1)
      dotOpacity: 0.6,            // Dot transparency
      dotSize: 1.5,               // Dot radius
      mouseDotSize: 3,            // Dot size near mouse
      colors: {
        dot: '255, 255, 255',       // White dots
        line: '255, 255, 255',      // White lines
        accent: '120, 80, 255'      // Subtle purple accent (optional)
      }
    };

    // State
    let particles: Particle[] = [];
    let mouse = { x: null as number | null, y: null as number | null };
    let animationId: number;
    let width: number, height: number;

    // Utility: Random range
    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    // Utility: Distance between two points
    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Particle Class
    class Particle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      size!: number;
      baseSize!: number;

      constructor() {
        // Initialize with default values, then reset will overwrite them.
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = 0;
        this.baseSize = 0;
        this.reset();
        // Start at random position
        this.x = random(0, width);
        this.y = random(0, height);
      }

      reset() {
        this.x = random(0, width);
        this.y = random(0, height);
        // Velocity: slow, random direction
        this.vx = random(-CONFIG.particleSpeed, CONFIG.particleSpeed);
        this.vy = random(-CONFIG.particleSpeed, CONFIG.particleSpeed);
        this.size = random(CONFIG.dotSize * 0.5, CONFIG.dotSize * 1.5);
        this.baseSize = this.size;
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges (infinite field feel)
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;

        // Mouse interaction: particles gently repel from cursor
        if (mouse.x !== null && mouse.y !== null) {
          // Adjust mouse coordinates relative to the canvas
          const rect = canvas?.getBoundingClientRect();
          if (rect) {
            const mouseX = mouse.x - rect.left;
            const mouseY = mouse.y - rect.top;
            const dist = getDistance(this.x, this.y, mouseX, mouseY);
            if (dist < CONFIG.mouseDistance) {
              const force = (CONFIG.mouseDistance - dist) / CONFIG.mouseDistance;
              const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
              this.x += Math.cos(angle) * force * 0.5;
              this.y += Math.sin(angle) * force * 0.5;
              this.size = this.baseSize + (CONFIG.mouseDotSize - this.baseSize) * force;
            } else {
              this.size = this.baseSize;
            }
          }
        } else {
            this.size = this.baseSize;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.colors.dot}, ${CONFIG.dotOpacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    function initParticles() {
      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // Draw connections between nearby particles
    function drawConnections() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = getDistance(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );

          if (dist < CONFIG.connectionDistance) {
            // Opacity based on distance (closer = more visible)
            const opacity = (1 - dist / CONFIG.connectionDistance) * CONFIG.lineOpacity;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${CONFIG.colors.line}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Draw connections from mouse to nearby particles
    function drawMouseConnections() {
      if (mouse.x === null || mouse.y === null || !ctx) return;

      const rect = canvas?.getBoundingClientRect();
      if (!rect) return;
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

    // Main animation loop
    function animate() {
      if (!ctx || !canvas) return;

      // Robust resize check every frame (handles Next.js remounts/visibility changes perfectly)
      const parent = canvas.parentElement;
      if (parent) {
        const currentWidth = parent.clientWidth;
        const currentHeight = parent.clientHeight;
        
        if (canvas.width !== currentWidth || canvas.height !== currentHeight) {
          width = currentWidth;
          height = currentHeight;
          canvas.width = width;
          canvas.height = height;
          
          if (width > 0 && height > 0) {
            initParticles();
          }
        }
      }

      // If dimensions are invalid, skip drawing
      if (width === 0 || height === 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connection lines
      drawConnections();
      drawMouseConnections();

      animationId = requestAnimationFrame(animate);
    }

    // Mouse handlers
    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    // Touch support for mobile
    function handleTouchMove(e: TouchEvent) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }

    function handleTouchEnd() {
      mouse.x = null;
      mouse.y = null;
    }

    // Reduce particles on mobile for performance
    function optimizeForDevice() {
      const isMobile = window.matchMedia('(pointer: coarse)').matches;
      if (isMobile) {
        CONFIG.particleCount = 40;
        CONFIG.connectionDistance = 100;
      }
    }

    // Boot
    function init() {
      optimizeForDevice();
      animate();

      // Event listeners
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
    }

    // Start
    init();

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
