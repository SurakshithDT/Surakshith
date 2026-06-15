"use client";

import { motion } from "framer-motion";
import { Zap, Mic, Shield, Smartphone } from "lucide-react";

const features = [
  {
    title: "Voice-Powered Search",
    description: "Say goodbye to tedious typing. Use intuitive voice commands to find your favorite movies, sports, and channels instantly.",
    icon: Mic,
  },
  {
    title: "Universal Control",
    description: "One remote to rule them all. Seamlessly manage your DishTV box, TV, and home theater system from a single interface.",
    icon: Zap,
  },
  {
    title: "Ergonomic Precision",
    description: "Designed for the ultimate viewing marathon. Every button is strategically placed for effortless tactile feedback.",
    icon: Shield,
  },
  {
    title: "Smart Connectivity",
    description: "Advanced Bluetooth technology ensures responsive control from any angle, with no direct line-of-sight required.",
    icon: Smartphone,
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-dish-gray overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dish-dark mb-6 tracking-tight">
            Engineered for <span className="text-dish-red">Entertainment</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-balance">
            Discover a new era of television navigation. Our next-generation remote combines cutting-edge technology with human-centric design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="w-14 h-14 bg-dish-red/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-dish-red transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-dish-red group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-dish-dark mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
