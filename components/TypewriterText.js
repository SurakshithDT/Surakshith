"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function TypewriterText({ text, onComplete }) {
  const { scrollYProgress } = useScroll();
  const [start, setStart] = useState(false);

  // Trigger animation only when the user reaches the end of the video scrub
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.98) {
      setStart(true);
    } else if (latest < 0.95) {
      setStart(false);
    }
  });

  // Split into lines for better alignment (assuming ". " as a separator)
  const lines = text.split(". ");

  // Variants for container
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.03, // Faster and smoother
        delayChildren: 0.1,
      },
    },
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9], // Smooth ease out
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(4px)",
      y: 8,
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center max-w-5xl px-6"
      variants={container}
      initial="hidden"
      animate={start ? "visible" : "hidden"}
      onAnimationComplete={(definition) => {
        if (definition === "visible" && onComplete) {
          onComplete();
        }
      }}
    >
      {lines.map((line, lineIndex) => (
        <h1 
          key={lineIndex}
          className="text-2xl md:text-4xl lg:text-5xl font-bitcount font-normal tracking-[0.2em] leading-loose text-[#f3f4f6] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-4 uppercase"
          style={{ fontWeight: 400 }} // Increased weight per user request
        >
          {Array.from(line).map((letter, index) => (
            <motion.span variants={child} key={index} className="inline-block">
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          {lineIndex === 0 && lines.length > 1 && (
            <motion.span variants={child} className="inline-block">.</motion.span>
          )}
        </h1>
      ))}
    </motion.div>
  );
}
