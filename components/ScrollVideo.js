"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export default function ScrollVideo({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const FRAME_COUNT = 109;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let active = true;

    const loadImages = async () => {
      const loadedImages = [];
      const promises = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const paddedIndex = i.toString().padStart(6, "0");
        const src = isMobile
          ? `/sequence/portrait/potrait-Programmer_sitting_dual_monitors__202606201012_${paddedIndex}_000001.webp`
          : `/sequence/landscape/Programmer_sitting_dual_monitors__202606201011_${paddedIndex}.png`;

        const img = new Image();
        img.src = src;
        loadedImages.push(img);

        promises.push(new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even on error
        }));
      }

      if (active) {
        setImages(loadedImages);
      }

      // Wait for at least the first frame to load so we have something to draw
      if (promises.length > 0) {
        await promises[0];
      }

      if (active) {
        setLoaded(true);
      }
    };

    setLoaded(false);
    loadImages();

    return () => { active = false; };
  }, [isMobile]);

  useEffect(() => {
    if (!loaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const render = () => {
      if (!containerRef.current || !canvas) return;

      const rect = containerRef.current.getBoundingClientRect();
      // rect.top is relative to viewport. If it's <= 0, we are scrolling inside the container.
      // Total scrollable distance within this container
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollableDistance = containerHeight - windowHeight;

      // Calculate progress from 0 to 1 over the full 800vh container
      let progress = -rect.top / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Map the first half of the scroll (0 to 0.5) to the video scrub
      let videoProgress = Math.max(0, Math.min(1, progress * 2));

      const frameIndex = Math.floor(videoProgress * (FRAME_COUNT - 1));
      const img = images[frameIndex];

      if (img && img.complete && img.naturalWidth > 0) {
        // Draw image covering the canvas (object-cover equivalent)
        const hRatio = canvas.width / img.naturalWidth;
        const vRatio = canvas.height / img.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
        const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          0, 0, img.naturalWidth, img.naturalHeight,
          centerShift_x, centerShift_y, img.naturalWidth * ratio, img.naturalHeight * ratio
        );
      }

      // Transition effects for canvas and content overlay
      if (contentRef.current) {
        // Map threshold to the halfway mark (0.5)
        const threshold = isMobile ? 0.45 : 0.48;
        const remaining = 0.5 - threshold;
        
        let contentOpacity = (progress - threshold) / remaining; 
        contentOpacity = Math.max(0, Math.min(1, contentOpacity));

        contentRef.current.style.opacity = contentOpacity;
        contentRef.current.style.transform = `scale(${0.9 + contentOpacity * 0.1}) translateY(${20 * (1 - contentOpacity)}px)`;
        contentRef.current.style.pointerEvents = contentOpacity > 0.5 ? 'auto' : 'none';

        if (canvas) {
          let blurAmount = contentOpacity * 10;
          let brightness = 1 - contentOpacity * 0.5; // darkens slightly as content appears
          canvas.style.filter = `blur(${blurAmount}px) brightness(${brightness})`;
        }
      }
    };

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", resize);
    resize(); // Initial resize and render

    // Animation loop for Lenis
    let requestRef;
    const raf = (time) => {
      lenis.raf(time);
      render(); // Render on every frame to sync with Lenis scrolling
      requestRef = requestAnimationFrame(raf);
    };
    requestRef = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(requestRef);
      lenis.destroy();
    };
  }, [loaded, images]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "800vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black text-white">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 animate-pulse tracking-widest uppercase text-sm">Loading Intro</p>
          </div>
        )}

        {/* Scroll indicator - fades out as you scroll down */}
        {loaded && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50 animate-bounce transition-opacity duration-500" style={{ opacity: "0.8" }}>
            <span className="text-sm uppercase tracking-widest mb-2">Scroll</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}

        <canvas ref={canvasRef} className="w-full h-full block absolute inset-0 z-0" />

        <div ref={contentRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full overflow-y-auto" style={{ opacity: 0, pointerEvents: 'none' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
