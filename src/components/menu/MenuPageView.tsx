import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Minus, ShoppingBag, Sparkles, Clock, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MENU_ITEMS, formatNaira } from '../../data/mockData';
import type { MenuCategory, DietaryTag, MenuItem } from '../../types/hospitality';

export default function MenuPageView() {
  const { items, addItem, updateQuantity, openCart, total, subtotal } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'starters', label: 'Starters & Tapas' },
    { id: 'mains', label: 'Chef’s Mains' },
    { id: 'signature_cocktails', label: 'Signature Cocktails' },
    { id: 'classic_cocktails', label: 'Classic Mixology' },
    { id: 'champagne_spirits', label: 'Champagne & Spirits' },
    { id: 'gaming_bites', label: 'Gaming Bites' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const dietaryFilters: { id: string; label: string }[] = [
    { id: 'all', label: 'All Diets' },
    { id: 'chef-pick', label: 'Chef’s Pick' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'spicy', label: 'Spicy' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDietary =
        selectedDietary === 'all' ||
        item.dietaryTags.includes(selectedDietary as DietaryTag);
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  const totalCartCount = items.reduce((acc, ci) => acc + ci.quantity, 0);

  const getItemQuantityInCart = (itemId: string): number => {
    const found = items.find((ci) => ci.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-32">
      {/* Header Banner */}
      <section className="bg-[#1B3A2D] text-white py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#DABA6E] font-bold block mb-1">
                Direct In-Venue Ordering
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold">
                Restaurant &amp; Bar Menu
              </h1>
              <p className="text-xs text-white/80 max-w-lg mt-2">
                Order directly to your table, booth, or room. No account required — pay with card, Apple Pay, or settle with your server.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food, cocktails..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-hidden focus:border-[#C8973E]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Categories Bar */}
      <div className="sticky top-18 z-30 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E8E6E1] py-3 px-5 sm:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-2.5">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1B3A2D] text-white'
                    : 'bg-white border border-[#E8E6E1] text-[#4A4A4A] hover:border-[#1B3A2D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary filters */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {dietaryFilters.map((df) => (
              <button
                key={df.id}
                onClick={() => setSelectedDietary(df.id)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDietary === df.id
                    ? 'bg-[#C8973E] text-white'
                    : 'bg-[#F5F3EE] text-[#7A7A7A] hover:bg-[#E8E6E1]'
                }`}
              >
                {df.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="mb-4 flex justify-between items-center text-xs text-[#7A7A7A]">
          <span>Showing {filteredItems.length} dishes and drinks</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 space-y-2">
            <h3 className="font-display text-xl text-[#1A1A1A]">No items match your criteria</h3>
            <p className="text-xs text-[#7A7A7A]">Try clearing your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qtyInCart = getItemQuantityInCart(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E8E6E1] hover:border-[#C8973E]/50 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="flex p-4 gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {item.dietaryTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-[#1B3A2D]/10 text-[#1B3A2D]"
                          >
                            {tag.replace('-', ' ')}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display text-base font-bold text-[#1A1A1A] leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#7A7A7A] line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#1B3A2D]">
                          {formatNaira(item.price)}
                        </span>
                        <span className="text-[10px] text-[#7A7A7A] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.prepTimeMinutes}m</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add / Adjust Controls */}
                  <div className="px-4 pb-4 pt-2 border-t border-[#E8E6E1] flex items-center justify-between">
                    <span className="text-[11px] text-[#7A7A7A] capitalize">
                      {item.station} station
                    </span>

                    {qtyInCart > 0 ? (
                      <div className="flex items-center gap-2 bg-[#F5F3EE] rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, qtyInCart - 1)}
                          className="p-1 text-[#7A7A7A] hover:text-[#1A1A1A] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#1A1A1A] w-5 text-center">
                          {qtyInCart}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, qtyInCart + 1)}
                          className="p-1 text-[#7A7A7A] hover:text-[#1A1A1A] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addItem(item, 1)}
                        className="px-4 py-2 rounded-xl bg-[#1B3A2D] hover:bg-[#2A5A44] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Table Order</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar (Appears when cart has items) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-18 md:bottom-6 left-4 right-4 max-w-xl mx-auto z-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1B3A2D] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-[#C8973E]/40"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8973E] flex items-center justify-center font-bold text-sm text-white">
                {totalCartCount}
              </div>
              <div>
                <span className="text-[11px] text-[#DABA6E] uppercase font-bold block">
                  Table Order Subtotal
                </span>
                <span className="font-display text-lg font-bold">
                  {formatNaira(subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={openCart}
              className="px-5 py-2.5 rounded-xl bg-[#C8973E] hover:bg-[#b5862f] text-white font-bold text-xs tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Review Order &amp; Pay</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

