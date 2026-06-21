"use client";

import { motion, useTransform } from "framer-motion";

export default function ScrubbableTypewriter({ lines, scrollYProgress, start, end }) {
  const totalLetters = lines.reduce((acc, l) => acc + l.length, 0);
  let currentIndex = 0;

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-5xl px-6 w-full">
      {lines.map((line, lineIndex) => (
        <h1 
          key={lineIndex}
          className="text-2xl md:text-4xl lg:text-5xl font-bitcount font-normal tracking-[0.2em] leading-loose text-[#f3f4f6] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-4 uppercase"
          style={{ fontWeight: 400 }}
        >
          {Array.from(line).map((letter, idx) => {
            const letterIndex = currentIndex++;
            const charStart = start + (end - start) * (letterIndex / totalLetters);
            // Slight overlap for smoother typing
            const charEnd = Math.min(end, charStart + ((end - start) / totalLetters) * 3);
            
            const opacity = useTransform(scrollYProgress, [charStart, charEnd], [0, 1]);
            const y = useTransform(scrollYProgress, [charStart, charEnd], [10, 0]);
            const blurRaw = useTransform(scrollYProgress, [charStart, charEnd], [6, 0]);
            const filter = useTransform(blurRaw, (b) => `blur(${b}px)`);

            return (
              <motion.span 
                style={{ opacity, y, filter }} 
                key={idx} 
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            );
          })}
        </h1>
      ))}
    </div>
  );
}
