"use client";

import Spline from '@splinetool/react-spline';
import { useEffect, Suspense, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Navbar from '@/components/3d-remote-product-marketing-page/Navbar';
import Features from '@/components/3d-remote-product-marketing-page/Features';
import Specs from '@/components/3d-remote-product-marketing-page/Specs';
import Footer from '@/components/3d-remote-product-marketing-page/Footer';
import { ChevronDown, AlertCircle } from 'lucide-react';

export default function Home() {
  const { scrollY } = useScroll();
  const [splineApp, setSplineApp] = useState(null);
  const [heroHeight, setHeroHeight] = useState('5000vh');
  const [isTrimmed, setIsTrimmed] = useState(false);

  // Transform scroll position to opacity and scale for the hero text
  // As soon as user scrolls (0 to 150px), text fades out (1 to 0)
  const heroOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 150], [1, 0.9]);
  const heroY = useTransform(scrollY, [0, 150], [0, -50]);

  // Monitor scroll progress from Spline to dynamically trim the height
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (splineApp) {
      try {
        const progress = splineApp.getVariable('scrollProgress');

        // If animation finished (progress >= 1), trim the container height to remove empty gap
        if (progress >= 1 && !isTrimmed) {
          // Set height to current scroll position + 1.5 viewport heights
          // The extra 0.5 allows the user to scroll a bit more while seeing the loop
          setHeroHeight(`${latest + (window.innerHeight * 1.5)}px`);
          setIsTrimmed(true);
        }
        // If user scrolls back up, restore the height to allow re-scrolling
        else if (progress < 0.99 && isTrimmed) {
          setHeroHeight('5000vh');
          setIsTrimmed(false);
        }
      } catch (e) {
        // Variable might not be initialized yet
      }
    }
  });

  useEffect(() => {

    const removeWatermark = () => {
      const selectors = [
        '.spline-watermark',
        '[class*="built"][class*="with"]',
        '[class*="credit"]',
        '[data-testid*="watermark"]',
        'a[href*="spline.design"]',
        'div[style*="position"][style*="fixed"]',
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          if (
            element.textContent?.toLowerCase().includes('spline') ||
            element.textContent?.toLowerCase().includes('built with')
          ) {
            element.remove();
          }
        });
      });
    };

    removeWatermark();
    const interval = setInterval(removeWatermark, 1000);

    const observer = new MutationObserver(() => removeWatermark());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero Section with Spline */}
      <section
        className="relative w-full bg-black"
        style={{ height: heroHeight }}
      >
        <div className="sticky top-0 left-0 h-screen w-full overflow-hidden spline-root">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-black text-white">Loading Experience...</div>}>
            <Spline
              scene="/the-variable-integration.splinecode"
              onLoad={(spline) => setSplineApp(spline)}
            />
          </Suspense>

          {/* Overlay Content for Hero - Now animated to vanish on scroll */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-6"
          >
            <div className="z-10">
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4">
                CONTROL THE <span className="text-dish-red">FUTURE</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium">
                The most advanced DishTV remote ever created. Precision, voice-control, and elegance in your palm.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10"
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold mb-4">Scroll to Explore</p>
              <ChevronDown className="text-white/40 mx-auto w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mandatory Prototype Disclaimer Section */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-dish-gray/50 rounded-3xl p-8 md:p-12 border border-dish-red/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <AlertCircle size={120} className="text-dish-red" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-dish-red rounded-full flex items-center justify-center text-white">
                  <AlertCircle size={20} />
                </div>
                <h2 className="text-2xl font-bold text-dish-dark">Project Disclosure & Prototype Status</h2>
              </div>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p className="text-lg font-medium">
                  This website is a <span className="text-dish-red">sample interactive prototype</span> created for demonstration purposes only.
                </p>

                <p>
                  Please be advised that this project is not affiliated with, sponsored by, or endorsed by DishTV or any associated brands. This page does not constitute an offer to sell or a recommendation to purchase any product displayed.
                </p>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm italic text-slate-500">
                    "This is a demo prototype intended to showcase interactive web design and 3D integration. The final deliverable will feature further fine-tuned animations, highly optimized designs, and refined user experience flows. This serves as a conceptual model to illustrate the potential of modern web technologies."
                  </p>
                </div>

                <p className="text-sm text-slate-500">
                  All trademarks, logos, and brand names are the property of their respective owners. Their use here is for illustrative and portfolio purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div id="features">
        <Features />
      </div>

      <div id="specs">
        <Specs />
      </div>

      {/* Interactive CTA Section */}
      <section className="py-24 bg-dish-red relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -ml-32 -mt-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mb-48"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              READY TO UPGRADE YOUR ENTERTAINMENT?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Join millions of satisfied customers who have revolutionized their TV viewing experience with DishTV.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/surakshithdt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-dish-red px-10 py-5 rounded-2xl font-black text-lg hover:bg-dish-dark hover:text-white transition-all duration-300 shadow-xl"
              >
                CONTACT ME
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Friendly Content Area (Visually hidden but readable by bots) */}
      <section id="support" className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold mb-6">About the DishTV Universal Remote</h2>
            <p className="text-slate-600 mb-4">
              The DishTV Universal Remote is engineered to provide a seamless entertainment experience. As a leader in DTH services in India, DishTV continuously innovates to bring the best technology to your living room. This interactive prototype showcases the design and features of our latest remote control.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div>
                <h3 className="text-xl font-bold mb-4">Why choose DishTV?</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Widest range of HD channels in the industry.</li>
                  <li>Advanced Set-top boxes with recording and 4K capability.</li>
                  <li>24/7 customer support and extensive service network.</li>
                  <li>Innovative value-added services and interactive apps.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-dish-dark">How do I pair my DishTV remote with my TV?</p>
                    <p className="text-slate-600 text-sm">Most DishTV remotes can be paired using specific codes found in the user manual. Long-press the OK and MUTE buttons to enter pairing mode.</p>
                  </div>
                  <div>
                    <p className="font-bold text-dish-dark">Does this remote support voice search?</p>
                    <p className="text-slate-600 text-sm">Yes, our latest SMRT remotes feature a dedicated voice button for easy content discovery.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
