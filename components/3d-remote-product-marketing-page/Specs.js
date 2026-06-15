"use client";

import { motion } from "framer-motion";

const specs = [
  { label: "Connectivity", value: "Bluetooth LE & IR" },
  { label: "Battery Life", value: "Up to 12 Months" },
  { label: "Range", value: "Up to 30 Feet" },
  { label: "Compatibility", value: "All DishTV DTH Boxes" },
  { label: "Special Keys", value: "Netflix, YouTube, Prime Video" },
  { label: "Build Material", value: "High-grade ABS Plastic" },
];

export default function Specs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold text-dish-dark mb-8 tracking-tight">
              Technical <span className="text-dish-red">Specifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
              {specs.map((spec, index) => (
                <div key={index} className="border-b border-slate-100 pb-4">
                  <p className="text-sm font-semibold text-dish-red uppercase tracking-wider mb-1">{spec.label}</p>
                  <p className="text-lg font-medium text-slate-800">{spec.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 bg-dish-gray rounded-[2.5rem] p-12 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-dish-red/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 text-center">
              <span className="inline-block px-4 py-1 bg-dish-red text-white text-xs font-bold rounded-full mb-6">PREMIUM BUILD</span>
              <h3 className="text-3xl font-bold text-dish-dark mb-4 text-balance">Built for the Ultimate Experience</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Our hardware undergoes rigorous testing to ensure durability and precision in every click.
              </p>
              <a 
                href="https://www.linkedin.com/in/surakshithdt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-dish-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-dish-red transition-colors duration-300"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
