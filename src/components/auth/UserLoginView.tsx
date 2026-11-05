import React, { useState } from 'react';
import { User, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';

export default function UserLoginView() {
  const { login } = useAuth();
  const { navigate } = useNavigation();

  // Prefilled demo credentials per user instructions
  const [email, setEmail] = useState('alex.morgan@nocturnelounge.com');
  const [password, setPassword] = useState('nocturne2026');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, 'member');
    if (success) {
      navigate('/userprofile');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-5 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8E6E1] p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8973E] font-bold block">
            Member Portal
          </span>
          <h2 className="font-display text-3xl font-bold text-[#1A1A1A]">
            Welcome Back
          </h2>
          <p className="text-xs text-[#7A7A7A] max-w-xs mx-auto">
            Access your active passes, hotel room digital keys, and accumulated loyalty points.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-3 bg-[#F5F3EE] rounded-xl text-xs text-[#4A4A4A] flex items-start gap-2.5 border border-[#E8E6E1]">
          <Sparkles className="w-4 h-4 text-[#C8973E] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#1B3A2D] block">Pre-filled Demo Access</span>
            <span>Credentials have been loaded for patron Alex Morgan. Click sign in below to enter.</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">
              Email Address
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#7A7A7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7A7A7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-[#7A7A7A] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded-sm text-[#1B3A2D]"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Demo password is: nocturne2026')}
              className="text-[#C8973E] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1B3A2D] hover:bg-[#2A5A44] text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Sign In to Member Profile</span>
            <ArrowRight className="w-4 h-4 text-[#C8973E]" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#E8E6E1] text-center">
          <p className="text-xs text-[#7A7A7A]">
            Don't have a member card?{' '}
            <button
              onClick={() => navigate('/')}
              className="font-bold text-[#1B3A2D] hover:underline cursor-pointer"
            >
              Continue as Guest
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

