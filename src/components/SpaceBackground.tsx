import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
}

interface SpaceBackgroundProps {
  starCount?: number;
  speed?: number;
  className?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({
  starCount = 200,
  speed = 0.5,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 1000 + 1,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 2 + 0.5
        });
      }
    };

    const updateStars = () => {
      starsRef.current.forEach(star => {
        star.z -= speed * star.speed;
        
        if (star.z <= 0) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
          star.z = 1000;
        }
      });
    };

    const drawStars = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach(star => {
        // Calculate star position based on z-depth
        const x = star.x + (star.x - width / 2) * (1000 - star.z) / 1000;
        const y = star.y + (star.y - height / 2) * (1000 - star.z) / 1000;
        
        // Calculate size and opacity based on distance
        const size = star.size * (1000 - star.z) / 1000;
        const opacity = star.opacity * (1000 - star.z) / 1000;

        if (x >= 0 && x <= width && y >= 0 && y <= height && size > 0) {
          // Draw simple white star
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const animate = () => {
      updateStars();
      drawStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createStars(); // Recreate stars for new dimensions
    };

    // Initialize
    resizeCanvas();
    createStars();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

export default SpaceBackground;