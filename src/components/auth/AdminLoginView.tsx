import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';

export default function AdminLoginView() {
  const { login } = useAuth();
  const { navigate } = useNavigation();

  // Prefilled demo credentials per user instructions
  const [email, setEmail] = useState('operations@nocturnelounge.com');
  const [password, setPassword] = useState('admin2026');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, 'admin');
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2519] flex items-center justify-center p-5 py-16 text-white">
      <div className="max-w-md w-full bg-[#1B3A2D] rounded-3xl border border-white/10 p-8 shadow-2xl space-y-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Lounge</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#C8973E]/20 text-[#DABA6E] mx-auto flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#DABA6E] font-bold block">
            Management Portal
          </span>
          <h2 className="font-display text-2xl font-bold">
            Operations Command Center
          </h2>
          <p className="text-xs text-white/70 max-w-xs mx-auto">
            Staff access for real-time Kitchen &amp; Bar KDS, table management, hotel check-ins, and guest CRM.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-3 bg-black/30 rounded-xl text-xs text-white/80 border border-white/10">
          <span className="font-bold text-[#DABA6E] block mb-0.5">Pre-filled Manager Access</span>
          <span>Operations account pre-loaded. Click authenticate to view live management screens.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-black/40 border border-white/20 text-white focus:outline-hidden focus:border-[#C8973E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              Security Pin / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-black/40 border border-white/20 text-white focus:outline-hidden focus:border-[#C8973E]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#C8973E] hover:bg-[#b5862f] text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Authenticate Staff Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

