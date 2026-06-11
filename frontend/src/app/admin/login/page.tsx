'use client';

import React, { useState } from 'react';
import { adminLoginAction } from '@/app/actions/admin/auth';
import { useRouter } from 'next/navigation';
import { Wine, Lock, Mail, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await adminLoginAction({ email, password });
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070605] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* High-tech Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-45" />

      {/* Decorative Drifting Neon Core Glows */}
      <div className="absolute top-[5%] left-[5%] w-[450px] h-[450px] rounded-full bg-red-950/20 blur-[130px] pointer-events-none animate-float-1" />
      <div className="absolute bottom-[5%] right-[5%] w-[550px] h-[550px] rounded-full bg-stone-900/60 blur-[140px] pointer-events-none animate-float-2" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full bg-red-900/10 blur-[120px] pointer-events-none animate-float-3" />

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Brand Logo & Cyber HUD with entrance animation */}
        <div className="flex flex-col items-center mb-6 animate-fade-in-up">
          {/* Logo with rotating tech rings */}
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute w-28 h-28 border border-dashed border-red-500/20 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute w-24 h-24 border border-dotted border-rose-500/35 rounded-full animate-spin-counter pointer-events-none" />
            
            <div className="relative group cursor-pointer z-10">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-700 via-rose-800 to-amber-600 rounded-2xl blur-md opacity-45 group-hover:opacity-75 transition duration-500" />
              <img
                src="/logos/Thebottleclub.jpg"
                alt="The Bottle Club Logo"
                className="relative w-16 h-16 rounded-2xl object-cover border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <h1 className="font-serif text-3.5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-stone-50 via-stone-200 to-stone-400 text-center uppercase select-none">
            The Bottle Club
          </h1>
          
          <div className="flex items-center gap-2 mt-2 font-mono text-[9px] tracking-[0.3em] text-red-500 text-cyber-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span>SYSTEM SECURE AI PORTAL [v2.26]</span>
          </div>
        </div>

        {/* Form Container (Futuristic HUD Panel) */}
        <div className="admin-glass-panel admin-glass-pulse w-full p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in-up [animation-delay:150ms] border border-white/10 border-cyber-glow">
          {/* Tech Corner HUD Brackets */}
          <div className="hud-bracket hud-bracket-tl" />
          <div className="hud-bracket hud-bracket-tr" />
          <div className="hud-bracket hud-bracket-bl" />
          <div className="hud-bracket hud-bracket-br" />

          {/* Active Laser Scanline */}
          <div className="ai-scanline" />

          {/* Laser scanning header effect */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-800/40 to-transparent" />
          
          {/* Heading */}
          <h2 className="text-sm font-mono font-bold text-stone-200 mb-5 flex items-center justify-between border-b border-white/5 pb-3">
            <span className="flex items-center gap-2">
              <Wine className="w-4 h-4 text-red-500 shrink-0" />
              <span>// SECURITY_INITIALIZATION</span>
            </span>
            <span className="text-[10px] text-stone-500 tracking-wider">LEVEL_3_AUTH</span>
          </h2>

          {/* Simulated AI System Parameters */}
          <div className="grid grid-cols-3 gap-2 p-2 bg-stone-950/80 rounded-xl border border-white/5 font-mono text-[9px] text-stone-400 mb-5">
            <div className="text-center border-r border-white/5">
              <div className="text-stone-500 uppercase tracking-widest text-[8px]">Core Status</div>
              <div className="text-emerald-500 font-bold tracking-wider mt-0.5">SECURE-v4</div>
            </div>
            <div className="text-center border-r border-white/5">
              <div className="text-stone-500 uppercase tracking-widest text-[8px]">Network</div>
              <div className="text-red-400 font-bold tracking-wider animate-pulse mt-0.5">AI-LINKED</div>
            </div>
            <div className="text-center">
              <div className="text-stone-500 uppercase tracking-widest text-[8px]">Crypt Auth</div>
              <div className="text-stone-300 font-bold tracking-wider mt-0.5">SHA-512</div>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-950/45 border border-red-800/30 text-red-200 font-mono text-xs flex items-start gap-3 animate-[shake_0.4s_ease-in-out_forwards] backdrop-blur-md">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <div>
                <span className="text-[9px] text-red-500 font-bold block mb-1">SYSTEM_ALERT:</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest block">
                // USERNAME_IDENTIFIER (EMAIL)
              </label>
              <div className="relative group/input">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500 group-focus-within/input:text-red-500 transition-colors duration-250">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@thebottleclub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-950/70 border border-white/10 rounded-xl text-stone-100 font-mono text-xs placeholder-stone-700 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest block">
                // ACCESS_PASS_KEY (PASSWORD)
              </label>
              <div className="relative group/input">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500 group-focus-within/input:text-red-500 transition-colors duration-250">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-stone-950/70 border border-white/10 rounded-xl text-stone-100 font-mono text-xs placeholder-stone-700 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all duration-300 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-500 hover:text-stone-300 transition-colors focus:outline-none cursor-pointer"
                  title={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-red-800 to-rose-950 hover:from-red-700 hover:to-rose-900 disabled:from-red-900/40 disabled:to-stone-900 text-white rounded-xl text-xs font-mono font-bold tracking-widest shadow-lg shadow-red-950/30 hover:shadow-red-900/40 transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed relative overflow-hidden shimmer-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                  <span className="animate-pulse">DECRYPTING USER CREDENTIALS...</span>
                </>
              ) : (
                'ENGAGE CORE ACCESS'
              )}
            </button>
          </form>

          {/* AI Terminal Telemetry Log Drawer */}
          <div className="mt-5 border-t border-white/5 pt-4">
            <div className="h-14 overflow-hidden bg-black/55 rounded-xl border border-white/5 p-2 font-mono text-[8px] text-stone-500 relative select-none">
              <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              <div className="telemetry-scroller space-y-1">
                <div>[01/SYS] INITIALIZING NEURAL BACKBONE...</div>
                <div>[02/NET] HANDSHAKE ESTABLISHED WITH CLOUD_SECURE</div>
                <div>[03/AI]  AI-CORE: MONITORING FOR SECURITY ANOMALIES</div>
                <div>[04/SEC] FIREWALL ENGAGED: PORT 443 SECURED</div>
                <div>[05/KEY] ENCRYPTING TRANSMISSION IN SHA-512...</div>
                <div>[06/SYS] CORE TEMPERATURE: 38.4°C - NORMAL</div>
                <div>[07/SYS] TERMINAL ONLINE AND READY FOR LINK</div>
                <div>[01/SYS] INITIALIZING NEURAL BACKBONE...</div>
                <div>[02/NET] HANDSHAKE ESTABLISHED WITH CLOUD_SECURE</div>
                <div>[03/AI]  AI-CORE: MONITORING FOR SECURITY ANOMALIES</div>
                <div>[04/SEC] FIREWALL ENGAGED: PORT 443 SECURED</div>
                <div>[05/KEY] ENCRYPTING TRANSMISSION IN SHA-512...</div>
                <div>[06/SYS] CORE TEMPERATURE: 38.4°C - NORMAL</div>
                <div>[07/SYS] TERMINAL ONLINE AND READY FOR LINK</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link with transition */}
        <div className="text-center mt-6 animate-fade-in-up [animation-delay:300ms]">
          <Link
            href="/"
            className="group/link text-stone-500 hover:text-stone-300 text-xs font-semibold tracking-wide transition duration-200 flex items-center justify-center gap-1.5"
          >
            <span className="transform group-hover/link:-translate-x-1 transition-transform duration-200">←</span>
            กลับสู่หน้าหลักร้านค้า
          </Link>
        </div>
      </div>
    </main>
  );
}
