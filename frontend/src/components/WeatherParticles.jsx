import React, { useEffect, useRef } from 'react';

const WeatherParticles = ({ weatherStatus }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  const getParticleConfig = (status) => {
    const lowerStatus = status ? status.toLowerCase() : '';
    if (lowerStatus.includes('nieve')) {
      return { count: 50, color: '#FFFFFF', size: 3, speed: 1, type: 'snow' };
    } else if (lowerStatus.includes('lluvia') || lowerStatus.includes('chubascos') || lowerStatus.includes('llovizna')) {
      return { count: 100, color: '#ADD8E6', size: 2, speed: 2, type: 'rain' };
    } else if (lowerStatus.includes('nubes') || lowerStatus.includes('nublado')) {
      return { count: 30, color: '#BDC3C7', size: 4, speed: 0.5, type: 'cloud' };
    } else {
      return { count: 0 }; // No particles for clear/other
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const config = getParticleConfig(weatherStatus);
    particles.current = [];
    for (let i = 0; i < config.count; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * config.size + 1,
        speedX: (Math.random() - 0.5) * config.speed,
        speedY: Math.random() * config.speed + 0.5,
        color: config.color,
        type: config.type,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.current.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;

        if (p.type === 'snow') {
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        } else if (p.type === 'rain') {
          ctx.rect(p.x, p.y, p.size / 2, p.size * 2);
        } else if (p.type === 'cloud') {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.arc(p.x + p.size * 0.8, p.y - p.size * 0.5, p.size * 0.7, 0, Math.PI * 2);
          ctx.arc(p.x - p.size * 0.8, p.y - p.size * 0.5, p.size * 0.7, 0, Math.PI * 2);
        }
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        // Reset particles when they go off screen
        if (p.y > height) p.y = -p.size;
        if (p.x > width) p.x = -p.size;
        if (p.x < -p.size) p.x = width + p.size;
      });

      animationFrameId.current = requestAnimationFrame(drawParticles);
    };

    animationFrameId.current = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [weatherStatus]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
};

export default WeatherParticles;
