// src/components/AnimatedMitroxLogo.tsx
import React, { useState, useRef, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

const AnimatedMitroxLogo: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 280,
        y: Math.random() * 280,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        life: Math.random(),
      });
    }
    particlesRef.current = initialParticles;
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });

        // Create new particles on mouse move
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: ((e.clientX - rect.left) / rect.width) * 280,
          y: ((e.clientY - rect.top) / rect.height) * 280,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: 0.8,
          life: 1,
        };
        particlesRef.current.push(newParticle);
        if (particlesRef.current.length > 50) {
          particlesRef.current.shift();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      particlesRef.current = particlesRef.current.map((particle) => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;

        // Bounce off edges
        if (newX < 0 || newX > 280) particle.vx *= -1;
        if (newY < 0 || newY > 280) particle.vy *= -1;

        // Attract to mouse
        if (isHovered && mousePosition.x !== 0 && mousePosition.y !== 0) {
          const mouseX = (mousePosition.x + 1) * 140;
          const mouseY = (mousePosition.y + 1) * 140;
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < 100) {
            particle.vx += dx * 0.0001;
            particle.vy += dy * 0.0001;
          }
        }

        // Update position
        newX = Math.max(0, Math.min(280, particle.x + particle.vx));
        newY = Math.max(0, Math.min(280, particle.y + particle.vy));

        // Fade out over time
        particle.life -= 0.01;
        if (particle.life <= 0 && !isHovered) {
          particle.life = 0;
          particle.opacity = Math.max(0, particle.opacity - 0.02);
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          opacity: Math.max(0, Math.min(1, particle.opacity)),
        };
      });

      // Remove dead particles
      particlesRef.current = particlesRef.current.filter(
        (p) => p.life > 0 || p.opacity > 0
      );

      setParticles([...particlesRef.current]);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, mousePosition]);

  const rotateX = mousePosition.y * 15;
  const rotateY = mousePosition.x * -15;
  const translateZ = isHovered ? 20 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        }}
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 200 200"
          className="w-full h-full max-w-[280px] max-h-[280px]"
        >
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
                stopOpacity={isHovered ? 1 : 0.9}
              />
              <stop
                offset="100%"
                stopColor="#ffffff"
                stopOpacity={isHovered ? 0.7 : 0.5}
              />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Circle at top */}
          <circle
            cx="100"
            cy="30"
            r="8"
            fill="url(#logoGradient)"
            className="transition-all duration-500"
            style={{
              filter: isHovered ? "url(#glow)" : "none",
              transform: `translateY(${mousePosition.y * 5}px)`,
            }}
          />

          {/* Left M */}
          <path
            d="M 40 160 L 40 60 L 70 100 L 100 60 L 100 160"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
            style={{
              filter: isHovered ? "url(#glow)" : "none",
              transform: `translateX(${mousePosition.x * 3}px) translateY(${mousePosition.y * 3}px)`,
            }}
          />

          {/* Right M */}
          <path
            d="M 100 160 L 100 60 L 130 100 L 160 60 L 160 160"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
            style={{
              filter: isHovered ? "url(#glow)" : "none",
              transform: `translateX(${-mousePosition.x * 3}px) translateY(${mousePosition.y * 3}px)`,
            }}
          />

          {/* Interactive Particles */}
          {particles.map((particle) => (
            <circle
              key={particle.id}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill="white"
              opacity={particle.opacity}
            >
              <animate
                attributeName="opacity"
                values={`${particle.opacity};${particle.opacity * 0.5};${particle.opacity}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Subtle background glow */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          isHovered ? "opacity-30" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
};

export default AnimatedMitroxLogo;

