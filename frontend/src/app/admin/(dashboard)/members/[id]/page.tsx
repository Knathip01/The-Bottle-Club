'use client';

import React, { use, useEffect, useState } from 'react';
import { Users, ArrowLeft, Loader2, Award, Calendar, Mail, FileText, ToggleLeft, ToggleRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

interface MemberDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  isActive: boolean;
  createdAt: string;
}

interface MemberOrder {
  id: number;
  total: number;
  status: string;
  paymentMethod: string;
  type: string;
  date: string;
}

export default function AdminMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const memberId = parseInt(id);
  const router = useRouter();

  // States
  const [member, setMember] = useState<MemberDetail | null>(null);
  const [orders, setOrders] = useState<MemberOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Points adjustment form state
  const [pointsChange, setPointsChange] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract'>('add');
  const [adjusting, setAdjusting] = useState(false);
  
  // Status toggle state
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function loadMemberDetails() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${memberId}`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลรายละเอียดสมาชิกได้');
      }
      const json = await res.json();
      setMember(json.member);
      setOrders(json.orders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMemberDetails();
  }, [memberId]);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAdjustPoints = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member || !pointsChange) return;

    const delta = parseInt(pointsChange);
    if (isNaN(delta) || delta <= 0) {
      alert('กรุณากรอกจำนวนแต้มที่ถูกต้อง');
      return;
    }

    setAdjusting(true);
    const multiplier = adjustmentType === 'add' ? 1 : -1;
    const nextPoints = Math.max(0, member.points + delta * multiplier);

    try {
      const res = await fetch(`/api/admin/users/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: nextPoints })
      });

      if (!res.ok) {
        throw new Error('เกิดข้อผิดพลาดในการอัปเดตแต้มสะสม');
      }

      setMember({ ...member, points: nextPoints });
      setPointsChange('');
      showNotification('ปรับปรุงแต้มสะสมเรียบร้อยแล้ว!');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAdjusting(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!member) return;

    const nextStatus = !member.isActive;
    const confirmMessage = nextStatus
      ? `คุณต้องการยกเลิกการระงับใช้งานบัญชีของ ${member.firstName} ใช่หรือไม่?`
      : `คุณต้องการระงับใช้งานบัญชีของ ${member.firstName} ใช่หรือไม่?`;

    if (!confirm(confirmMessage)) return;

    setUpdatingStatus(true);

    try {
      const res = await fetch(`/api/admin/users/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: nextStatus })
      });

      if (!res.ok) {
        throw new Error('ไม่สามารถอัปเดตสถานะบัญชีได้');
      }

      setMember({ ...member, isActive: nextStatus });
      showNotification(nextStatus ? 'เปิดใช้งานบัญชีผู้ใช้เรียบร้อยแล้ว!' : 'ระงับบัญชีผู้ใช้งานเรียบร้อยแล้ว!');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse select-none max-w-5xl mx-auto">
        <div className="h-6 w-32 bg-stone-900 rounded" />
        <div className="h-24 w-full bg-stone-900 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-stone-900 rounded-2xl" />
          <div className="h-96 bg-stone-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="p-8 text-center bg-stone-900 border border-white/5 rounded-2xl text-red-400 select-none max-w-5xl mx-auto">
        <ShieldAlert className="w-12 h-12 mx-auto mb-4" />
        <p className="font-bold text-lg">ไม่พบข้อมูลสมาชิกรหัส #{memberId}</p>
        <p className="text-stone-500 text-sm mt-1">{error || 'ไม่พบสมาชิกในระบบ'}</p>
        <Link
          href="/admin/members"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition"
        >
          ← กลับสู่หน้ารายชื่อสมาชิก
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none font-sans max-w-5xl mx-auto">
      {/* Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/members"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-stone-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่รายชื่อสมาชิก
        </Link>
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2 rounded-xl flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4.5 h-4.5" /> {successMsg}
          </div>
        )}
      </div>

      {/* Profile summary header */}
      <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-red-500 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-stone-100 flex items-center gap-3">
              {member.firstName} {member.lastName}
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                member.isActive 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {member.isActive ? 'Active' : 'Suspended'}
              </span>
            </h2>
            <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {member.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> เข้าร่วม: {member.createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: User order history */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-stone-100 font-serif mb-4 flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-red-500" /> ประวัติการสั่งซื้อ (Order History)
            </h3>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold text-stone-500 uppercase tracking-widest pb-3">
                    <th className="pb-3">ออเดอร์</th>
                    <th className="pb-3 text-center">ประเภท</th>
                    <th className="pb-3 text-center">วิธีชำระ</th>
                    <th className="pb-3 text-center">ยอดสุทธิ</th>
                    <th className="pb-3 text-center">สถานะ</th>
                    <th className="pb-3 text-right">วันที่สั่งซื้อ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-stone-300">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-500">
                        ยังไม่มีประวัติการสั่งซื้อสินค้า
                      </td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id} className="hover:bg-white/2 cursor-pointer transition" onClick={() => router.push(`/admin/orders/${o.id}`)}>
                        <td className="py-4 font-bold text-stone-200">#{o.id}</td>
                        <td className="py-4 text-center uppercase text-stone-500 font-semibold">{o.type}</td>
                        <td className="py-4 text-center uppercase text-stone-500 font-semibold">{o.paymentMethod}</td>
                        <td className="py-4 text-center font-bold text-stone-200">฿{o.total.toLocaleString('th-TH')}</td>
                        <td className="py-4 text-center">
                          <OrderStatusBadge status={o.status} />
                        </td>
                        <td className="py-4 text-right text-stone-500 font-medium">{o.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Action points adjustment and Active toggle */}
        <div className="space-y-6">
          {/* Points Balance Card */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/2 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">คะแนนสะสมที่มี (Points Balance)</p>
            <h3 className="text-3xl font-black font-serif text-amber-500 mt-2">{member.points.toLocaleString()}</h3>
            <p className="text-[10px] text-stone-600 mt-1 uppercase font-semibold">The Bottle Club Points</p>
          </div>

          {/* Adjust Points Form */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-stone-100 font-serif">ปรับปรุงคะแนนสะสม</h3>
            <form onSubmit={handleAdjustPoints} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustmentType('add')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    adjustmentType === 'add'
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                      : 'bg-stone-950 text-stone-500 border-white/5 hover:text-stone-300'
                  }`}
                >
                  + เพิ่มคะแนน
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustmentType('subtract')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    adjustmentType === 'subtract'
                      ? 'bg-red-500/10 text-red-500 border-red-500/30'
                      : 'bg-stone-950 text-stone-500 border-white/5 hover:text-stone-300'
                  }`}
                >
                  - หักคะแนน
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">จำนวนแต้มคะแนน</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="เช่น 100"
                  value={pointsChange}
                  onChange={(e) => setPointsChange(e.target.value)}
                  className="w-full p-3.5 bg-stone-950 border border-white/10 rounded-xl text-stone-200 text-xs focus:outline-none focus:border-red-800 transition"
                />
              </div>

              <button
                type="submit"
                disabled={adjusting}
                className="w-full py-3.5 bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-red-950/20 hover:shadow-red-900/30 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                {adjusting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'อัปเดตคะแนน'
                )}
              </button>
            </form>
          </div>

          {/* Account Status Control */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-stone-100 font-serif">สถานะการใช้งานบัญชี</h3>
            <div className="flex items-center justify-between p-3 bg-stone-950 rounded-xl border border-white/5">
              <span className="text-xs font-bold text-stone-400">สถานะบัญชีปัจจุบัน</span>
              <button
                onClick={handleToggleStatus}
                disabled={updatingStatus}
                className="cursor-pointer text-stone-300 hover:text-white transition disabled:opacity-50"
              >
                {member.isActive ? (
                  <ToggleRight className="w-10 h-10 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-red-500" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-stone-600 leading-normal">
              * การปิดสถานะบัญชี (Suspended) จะป้องกันไม่ให้ลูกค้ารายนี้ล็อกอินเข้าสู่ระบบและไม่สามารถสั่งซื้อสินค้าบนร้านค้าได้ชั่วคราว
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
