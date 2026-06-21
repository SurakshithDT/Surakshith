"use client";

import { useRef, useEffect, useState } from "react";

export default function ExplodingMeCanvas({ scrollYProgress, start, end }) {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initParticles = async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      
      const width = 1000;
      const height = 600;
      canvas.width = width;
      canvas.height = height;

      const isMobile = window.innerWidth < 768;
      const fontSize = isMobile ? 180 : 350;
      
      // Get the actual font family name injected by Next.js
      const dummy = document.createElement("span");
      dummy.className = "font-bitcount font-normal";
      dummy.style.display = "none";
      document.body.appendChild(dummy);
      const computedFont = window.getComputedStyle(dummy).fontFamily;
      document.body.removeChild(dummy);

      ctx.font = `400 ${fontSize}px ${computedFont}`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("ME", width / 2, height / 2);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      const newParticles = [];
      const step = isMobile ? 5 : 8; 
      
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const i = (y * width + x) * 4;
          const alpha = data[i + 3];
          
          if (alpha > 128) {
            const angle = Math.random() * Math.PI * 2;
            const distance = (isMobile ? 400 : 1000) + Math.random() * 800;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Default color: off-white
            let color = `rgba(${r}, ${g}, ${b}, 0.9)`;
            // Rare accented colors for NOTHING aesthetic (red/grey)
            if (Math.random() > 0.95) {
              color = `rgba(239, 47, 33, 0.9)`; // dish-red / nothing red
            } else if (Math.random() > 0.8) {
              color = `rgba(150, 150, 150, 0.8)`;
            }

            newParticles.push({
              x: x - width / 2,
              y: y - height / 2,
              targetX: Math.cos(angle) * distance,
              targetY: Math.sin(angle) * distance,
              size: isMobile ? (1.5 + Math.random() * 1) : (2 + Math.random() * 2),
              color: color,
            });
          }
        }
      }
      setParticles(newParticles);
      setIsReady(true);
    };

    initParticles();
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initParticles, 300);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    const render = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const progress = scrollYProgress.get(); 
      
      // explodeProgress logic:
      let explodeProgress = 0;
      if (progress > start) {
        explodeProgress = Math.min(1, (progress - start) / (end - start));
      }
      
      // Easing function for explosion (Cubic Out)
      const ease = 1 - Math.pow(1 - explodeProgress, 3);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      particles.forEach(p => {
        const currentX = p.x + (p.targetX - p.x) * ease;
        const currentY = p.y + (p.targetY - p.y) * ease;
        
        ctx.fillStyle = p.color;
        // Fade out significantly as it explodes
        ctx.globalAlpha = Math.max(0, 1 - (ease * 0.95));
        
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.restore();
      animationFrame = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [particles, isReady, scrollYProgress, start, end]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-10 w-full h-full pointer-events-none" 
    />
  );
}
