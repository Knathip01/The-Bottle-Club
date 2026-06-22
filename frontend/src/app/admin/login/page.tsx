'use client';

import React, { useState } from 'react';
import { adminLoginAction } from '@/app/actions/admin/auth';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Loader2, Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import '../admin-theme.css';

export default function AdminLoginPage() {
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPw,      setShowPw]      = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('กรุณากรอกข้อมูลให้ครบถ้วน'); return; }
    setError(null); setLoading(true);
    try {
      const result = await adminLoginAction({ email, password });
      if (result?.error) { setError(result.error); setLoading(false); }
      else               { router.push('/admin/dashboard'); }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex font-sans select-none"
      style={{ background: 'linear-gradient(135deg, #faf9f7 0%, #f5f3f0 50%, #faf8f6 100%)', color: '#1c1917' }}
    >
      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.6 }} />

      {/* Ambient glows */}
      <div className="fixed top-[-10%] left-[-5%] w-[45%] h-[50%] rounded-full pointer-events-none z-0 animate-float-1"
        style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[45%] rounded-full pointer-events-none z-0 animate-float-2"
        style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.05) 0%, transparent 65%)', filter: 'blur(80px)' }} />

      {/* ─── Left Brand Panel ─── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] xl:w-[480px] shrink-0 p-10 relative z-10 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(32px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
          borderRight: '1px solid rgba(255,255,255,0.95)',
          boxShadow: '4px 0 32px rgba(0,0,0,0.05)',
        }}
      >
        {/* Top crimson line */}
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(to right, #c41e3a 0%, #f59e0b 50%, #c41e3a 100%)' }} />

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl opacity-60"
                style={{ background: 'linear-gradient(135deg, rgba(196,30,58,0.3), rgba(245,158,11,0.2))' }} />
              <img src="/logos/Thebottleclub.jpg" alt="The Bottle Club"
                className="relative w-10 h-10 rounded-xl object-cover"
                style={{ border: '1px solid rgba(0,0,0,0.08)' }} />
            </div>
            <div>
              <p className="font-serif font-black text-stone-800 text-sm tracking-tight">THE BOTTLE CLUB</p>
              <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Admin Portal</p>
            </div>
          </div>

          <h1 className="font-serif font-black text-4xl leading-tight mb-4" style={{ color: '#1c1917' }}>
            ระบบจัดการ<br />
            <span style={{ background: 'linear-gradient(135deg, #c41e3a, #9b1c1c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ร้านค้า</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>
            เข้าสู่ระบบเพื่อจัดการออเดอร์ สินค้า<br />
            สมาชิก และรายงานยอดขายทั้งหมด
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-2.5">
          {[
            { icon: '🛒', label: 'จัดการออเดอร์แบบ Real-time' },
            { icon: '📊', label: 'Dashboard & รายงานยอดขาย' },
            { icon: '👥', label: 'ระบบจัดการสมาชิก' },
            { icon: '🍷', label: 'คลังสินค้าและสต็อก' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <span className="text-lg">{f.icon}</span>
              <span className="text-xs font-semibold" style={{ color: '#57534e' }}>{f.label}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 pt-5" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="text-[10px] font-semibold" style={{ color: '#d1cdc9' }}>© 2026 The Bottle Club — Admin v2.26</p>
        </div>
      </div>

      {/* ─── Right Form Panel ─── */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl opacity-50"
                style={{ background: 'linear-gradient(135deg, rgba(196,30,58,0.3), rgba(245,158,11,0.2))' }} />
              <img src="/logos/Thebottleclub.jpg" alt="" className="relative w-9 h-9 rounded-xl object-cover"
                style={{ border: '1px solid rgba(0,0,0,0.08)' }} />
            </div>
            <div>
              <p className="font-serif font-black text-stone-800 text-sm">THE BOTTLE CLUB</p>
              <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Admin Portal</p>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
              border: '1px solid rgba(255,255,255,0.98)',
              borderTop: '1px solid white',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 1px 0 white inset',
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(to right, transparent, #c41e3a 40%, #f59e0b 60%, transparent)' }} />

            <div className="mb-7">
              <h2 className="text-2xl font-black font-serif leading-tight" style={{ color: '#1c1917' }}>ยินดีต้อนรับกลับ</h2>
              <p className="text-sm mt-1.5" style={{ color: '#a8a29e' }}>เข้าสู่ระบบบัญชีผู้ดูแลของคุณ</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl flex items-start gap-3 animate-fade-in-up"
                style={{ background: 'rgba(196,30,58,0.05)', border: '1px solid rgba(196,30,58,0.2)' }}>
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-600">เกิดข้อผิดพลาด</p>
                  <p className="text-xs mt-0.5" style={{ color: '#dc2626' }}>{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#78716c' }}>อีเมล</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#a8a29e' }} />
                  <input type="email" required placeholder="admin@thebottleclub.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="admin-input w-full pl-10 pr-4 py-3 rounded-xl text-sm" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#78716c' }}>รหัสผ่าน</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#a8a29e' }} />
                  <input type={showPw ? 'text' : 'password'} required placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="admin-input w-full pl-10 pr-10 py-3 rounded-xl text-sm" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute inset-y-0 right-0 px-3.5 flex items-center cursor-pointer transition-colors"
                    style={{ color: '#a8a29e' }}>
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="admin-btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2 cursor-pointer shimmer-btn">
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>กำลังเข้าสู่ระบบ...</span></>
                ) : (
                  <><Sparkles className="w-4 h-4" /><span>เข้าสู่ระบบ</span></>
                )}
              </button>
            </form>
          </div>

          {/* Back link */}
          <div className="mt-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: '#a8a29e' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#78716c')}
              onMouseLeave={e => (e.currentTarget.style.color = '#a8a29e')}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> กลับสู่หน้าร้าน
            </Link>
            <p className="text-[10px] font-semibold" style={{ color: '#d1cdc9' }}>Secure · v2.26</p>
          </div>
        </div>
      </div>
    </main>
  );
}
