import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { IMAGES } from '../../data/mockData';

export default function HomeHero() {
  const { navigate } = useNavigation();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={IMAGES.heroLounge}
        alt="Nocturne Lounge — an elegant dining and cocktail space"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#1B3A2D]/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-3xl mx-auto">
        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs tracking-[0.25em] uppercase text-[#C8973E] font-medium"
        >
          Lounge · Nightclub · Hotel · Gaming
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white"
        >
          Where Every Evening Becomes an Experience
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed"
        >
          Fine dining, handcrafted cocktails, live music, and a nightlife like no other
          — all under one roof in the heart of Lagos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => navigate('/lounge')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C8973E] text-white font-semibold text-sm tracking-wide hover:bg-[#b5862f] transition-colors cursor-pointer"
          >
            Reserve a Table
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/40 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors cursor-pointer"
          >
            Browse Menu &amp; Order
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="h-10 w-6 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-1.5 w-1.5 rounded-full bg-[#C8973E]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
