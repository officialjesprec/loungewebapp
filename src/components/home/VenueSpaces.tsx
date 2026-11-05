import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { IMAGES } from '../../data/mockData';
import type { RoutePath } from '../../types/hospitality';

interface VenueCard {
  title: string;
  tagline: string;
  highlights: string[];
  image: string;
  path: RoutePath;
  primary?: boolean;
}

const venues: VenueCard[] = [
  {
    title: 'The Lounge',
    tagline: 'Fine dining, craft cocktails & garden terrace',
    highlights: ['Signature Cocktails', "Chef's Tasting Menu", 'Live Jazz Evenings'],
    image: IMAGES.loungeCard,
    path: '/lounge',
    primary: true,
  },
  {
    title: 'The Nightclub',
    tagline: 'VIP booths, DJ lineups & bottle service',
    highlights: ['Resident DJs', 'VIP Mezzanine', 'Premium Bottles'],
    image: IMAGES.clubCard,
    path: '/club',
  },
  {
    title: 'The Boutique Hotel',
    tagline: 'Luxury suites & stay-and-lounge packages',
    highlights: ['Penthouse Suites', 'Butler Service', 'Late Checkout'],
    image: IMAGES.hotelCard,
    path: '/hotel',
  },
  {
    title: 'VIP Gaming Space',
    tagline: 'PS5 Pro, PC rigs, billiards & tournaments',
    highlights: ['4K OLED Pods', 'Esports Events', 'Gaming Bites Menu'],
    image: IMAGES.gamingCard,
    path: '/gaming',
  },
];

export default function VenueSpaces() {
  const { navigate } = useNavigation();

  return (
    <section className="px-5 py-16 sm:px-8 md:py-24 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-[#C8973E] font-medium mb-2">
          Explore
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A]">
          Four Worlds, One Destination
        </h2>
        <p className="mt-3 text-[#7A7A7A] max-w-lg mx-auto">
          From an intimate dinner to a night that never ends — choose your vibe and we'll set the stage.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {venues.map((v, i) => (
          <motion.button
            key={v.path}
            onClick={() => navigate(v.path)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer text-left ${
              v.primary
                ? 'col-span-1 sm:col-span-2 lg:col-span-1 min-h-[340px] sm:min-h-[400px]'
                : 'min-h-[280px] sm:min-h-[340px]'
            }`}
          >
            {/* Image */}
            <img
              src={v.image}
              alt={v.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Text */}
            <div className="relative z-10 flex flex-col justify-end h-full p-6">
              {v.primary && (
                <span className="mb-2 self-start rounded-full bg-[#C8973E]/90 px-3 py-0.5 text-[10px] font-semibold tracking-widest uppercase text-white">
                  Signature
                </span>
              )}
              <h3 className="font-display text-xl sm:text-2xl text-white">{v.title}</h3>
              <p className="mt-1 text-sm text-white/70">{v.tagline}</p>

              {/* Highlights */}
              <div className="mt-3 flex flex-wrap gap-2">
                {v.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80 backdrop-blur-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8973E] tracking-wide group-hover:gap-3 transition-all">
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
