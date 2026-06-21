"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ScrubbableTypewriter from "./ScrubbableTypewriter";
import ExplodingMeCanvas from "./ExplodingMeCanvas";

export default function HeroSequence() {
  const { scrollYProgress } = useScroll();

  // "WELCOME..." text fades out between 0.70 and 0.75
  const welcomeOpacity = useTransform(scrollYProgress, [0.70, 0.75], [1, 0]);
  const welcomeBlurRaw = useTransform(scrollYProgress, [0.70, 0.75], [0, 10]);
  const welcomeFilter = useTransform(welcomeBlurRaw, (b) => `blur(${b}px)`);
  const welcomeY = useTransform(scrollYProgress, [0.70, 0.75], [0, -20]);

  // "ME" canvas fades in between 0.75 and 0.85
  const meOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const meScale = useTransform(scrollYProgress, [0.75, 0.85], [0.8, 1]);
  const meBlurRaw = useTransform(scrollYProgress, [0.75, 0.85], [10, 0]);
  const meFilter = useTransform(meBlurRaw, (b) => `blur(${b}px)`);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Welcome Sequence */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ 
          opacity: welcomeOpacity, 
          filter: welcomeFilter,
          y: welcomeY
        }}
      >
        <ScrubbableTypewriter 
          lines={["WELCOME TO MY PORTFOLIO.", "WHERE YOU WILL EXPLORE..."]} 
          scrollYProgress={scrollYProgress}
          start={0.50} // Starts typing exactly when video finishes
          end={0.65}   // Finishes typing 15% later
        />
      </motion.div>

      {/* ME Sequence & Explosion */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: meOpacity,
          scale: meScale,
          filter: meFilter,
        }}
      >
        <ExplodingMeCanvas 
          scrollYProgress={scrollYProgress} 
          start={0.88} // Start explosion slightly after fade in completes
          end={1.00}   // Explode fully by the end of the page
        />
      </motion.div>
    </div>
  );
}
