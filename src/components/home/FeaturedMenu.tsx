import React from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { MENU_ITEMS, formatNaira } from '../../data/mockData';
import type { MenuItem } from '../../types/hospitality';

export default function FeaturedMenu() {
  const { navigate } = useNavigation();
  const { addItem, openCart } = useCart();

  // Curate 4 standout items
  const featured = MENU_ITEMS.filter((item) =>
    item.dietaryTags.includes('chef-pick')
  ).slice(0, 4);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item, 1);
    openCart();
  };

  return (
    <section className="px-5 py-16 sm:px-8 md:py-24 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[#C8973E] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef &amp; Bar Curations</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A]">
              Signature Creations
            </h2>
            <p className="mt-2 text-[#7A7A7A] max-w-md">
              A bespoke dining and cocktail preview crafted daily by our culinary team.
            </p>
          </div>

          <button
            onClick={() => navigate('/menu')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#1B3A2D] hover:text-[#C8973E] transition-colors cursor-pointer"
          >
            <span>Explore Complete Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-[#E8E6E1]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#1B3A2D] shadow-xs">
                  {formatNaira(item.price)}
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.dietaryTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 rounded-full bg-[#1B3A2D]/10 text-[#1B3A2D]"
                      >
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-1.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#7A7A7A] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={(e) => handleQuickAdd(item, e)}
                  className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#1B3A2D] text-white hover:bg-[#2A5A44] transition-colors flex items-center justify-center gap-2 text-xs font-semibold tracking-wide cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Table Order</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

