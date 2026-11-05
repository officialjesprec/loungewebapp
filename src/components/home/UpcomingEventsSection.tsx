import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Ticket, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { EVENTS, formatNaira } from '../../data/mockData';

export default function UpcomingEventsSection() {
  const { navigate } = useNavigation();

  // Highlight first 3 events
  const upcoming = EVENTS.slice(0, 3);

  return (
    <section className="px-5 py-16 sm:px-8 md:py-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8973E] font-medium mb-2">
            The Collective Calendar
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A]">
            Upcoming Lifestyle Events
          </h2>
          <p className="mt-2 text-[#7A7A7A] max-w-md">
            DJ residencies, live jazz tastings, and VIP tournament showcases.
          </p>
        </div>

        <button
          onClick={() => navigate('/events')}
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#1B3A2D] hover:text-[#C8973E] transition-colors cursor-pointer"
        >
          <span>View All Events</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcoming.map((evt, idx) => (
          <motion.div
            key={evt.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden border border-[#E8E6E1] flex flex-col hover:border-[#C8973E]/50 transition-all shadow-xs hover:shadow-md"
          >
            {/* Event Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#1B3A2D]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                {evt.vibe}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs text-[#DABA6E] font-medium block">
                  {evt.hostOrDj}
                </span>
                <h3 className="font-display text-lg font-bold leading-tight">
                  {evt.title}
                </h3>
              </div>
            </div>

            {/* Event Meta */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <p className="text-xs text-[#7A7A7A] line-clamp-2">
                  {evt.subtitle}
                </p>

                <div className="pt-2 border-t border-[#E8E6E1] space-y-1.5 text-xs text-[#4A4A4A]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C8973E]" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C8973E]" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C8973E]" />
                    <span className="capitalize">{evt.venue} Space</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-[#E8E6E1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#7A7A7A] uppercase block">
                    Starting from
                  </span>
                  <span className="text-sm font-bold text-[#1B3A2D]">
                    {formatNaira(evt.tiers[0]?.price || 15000)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/events')}
                  className="px-4 py-2 rounded-xl bg-[#C8973E] text-white hover:bg-[#b5862f] text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Reserve Spot</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

