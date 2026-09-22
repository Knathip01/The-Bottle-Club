'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Tag, Plus, Edit2, Trash2, CheckCircle2, AlertCircle,
  ExternalLink, Sparkles, Image as ImageIcon, Eye, EyeOff,
  Clock, Gift, ArrowRight, Loader2, RefreshCw
} from 'lucide-react';
import type { PromotionItem } from '@/lib/promotions';

const PRESET_IMAGES = [
  { label: 'Wine Cellar (แบนเนอร์ห้องเก็บไวน์)', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Wine Pouring (รินไวน์แดง)', url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop' },
  { label: 'Wine & Food Pairing (ไวน์คู่ดินเนอร์)', url: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?q=80&w=800&auto=format&fit=crop' },
  { label: 'Wine Box / Cellar (ลังไม้ไวน์พรีเมียม)', url: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?q=80&w=800&auto=format&fit=crop' },
  { label: 'Champagne / Sparkling (สปาร์กลิ้ง/แชมเปญ)', url: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?q=80&w=800&auto=format&fit=crop' },
  { label: 'Vineyard (ไร่องุ่นธรรมชาติ)', url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop' },
];

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modal form states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromotionItem | null>(null);

  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formBadge, setFormBadge] = useState('PROMOTION');
  const [formDiscountTag, setFormDiscountTag] = useState('');
  const [formValidUntil, setFormValidUntil] = useState('');
  const [formLinkUrl, setFormLinkUrl] = useState('/#products');
  const [formCtaText, setFormCtaText] = useState('ดูสินค้าโปรโมชั่น');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/promotions');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPromotions(data.data);
      }
    } catch {
      setErrorMsg('ไม่สามารถโหลดข้อมูลโปรโมชั่นได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const openCreateModal = () => {
    setEditingPromo(null);
    setFormId(`promo-${Date.now()}`);
    setFormTitle('');
    setFormSubtitle('');
    setFormDescription('');
    setFormImageUrl(PRESET_IMAGES[0].url);
    setFormBadge('PROMOTION');
    setFormDiscountTag('');
    setFormValidUntil('จำกัดเวลาสิทธิพิเศษ');
    setFormLinkUrl('/#products');
    setFormCtaText('ดูสินค้าโปรโมชั่น');
    setFormIsFeatured(false);
    setFormIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (p: PromotionItem) => {
    setEditingPromo(p);
    setFormId(p.id);
    setFormTitle(p.title);
    setFormSubtitle(p.subtitle || '');
    setFormDescription(p.description || '');
    setFormImageUrl(p.imageUrl);
    setFormBadge(p.badge || 'PROMOTION');
    setFormDiscountTag(p.discountTag || '');
    setFormValidUntil(p.validUntil || '');
    setFormLinkUrl(p.linkUrl || '/#products');
    setFormCtaText(p.ctaText || 'ดูสินค้าโปรโมชั่น');
    setFormIsFeatured(!!p.isFeatured);
    setFormIsActive(p.isActive !== false);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formImageUrl.trim()) {
      setErrorMsg('กรุณาระบุชื่อโปรโมชั่นและรูปภาพ');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    const payload: PromotionItem = {
      id: formId,
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
      description: formDescription.trim(),
      imageUrl: formImageUrl.trim(),
      badge: formBadge.trim() || 'PROMOTION',
      discountTag: formDiscountTag.trim(),
      validUntil: formValidUntil.trim(),
      linkUrl: formLinkUrl.trim() || '/#products',
      ctaText: formCtaText.trim() || 'ดูสินค้าโปรโมชั่น',
      isFeatured: formIsFeatured,
      isActive: formIsActive,
    };

    try {
      const res = await fetch('/api/admin/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        setSuccessMsg(editingPromo ? 'บันทึกการแก้ไขโปรโมชั่นสำเร็จ' : 'เพิ่มโปรโมชั่นใหม่สำเร็จ');
        setModalOpen(false);
        fetchPromotions();
        setTimeout(() => setSuccessMsg(null), 3500);
      } else {
        setErrorMsg(result.message || 'บันทึกไม่สำเร็จ');
      }
    } catch {
      setErrorMsg('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโปรโมชั่นนี้?')) return;

    try {
      const res = await fetch(`/api/admin/promotions?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setSuccessMsg('ลบโปรโมชั่นสำเร็จ');
        fetchPromotions();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch {
      setErrorMsg('ไม่สามารถลบโปรโมชั่นได้');
    }
  };

  const featuredCount = promotions.filter((p) => p.isFeatured).length;
  const activeCount = promotions.filter((p) => p.isActive !== false).length;

  return (
    <div className="space-y-6 max-w-6xl select-none font-sans mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-100 flex items-center gap-2.5">
            <Tag className="w-5 h-5 text-red-500" /> จัดการโปรโมชั่นและแบนเนอร์ (Promotions)
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            เพิ่ม แก้ไข และเปลี่ยนรูปภาพโปรโมทสินค้าที่จะแสดงในหน้าร้าน The Bottle Club
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchPromotions}
            className="p-2.5 rounded-xl border border-white/10 bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 transition"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-4 py-2.5 shadow-lg shadow-red-950/40 transition"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มโปรโมชั่นใหม่</span>
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* KPI STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-stone-900/90 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">โปรโมชั่นทั้งหมด</span>
            <strong className="text-2xl font-black text-white mt-1 block">{promotions.length}</strong>
          </div>
          <span className="p-3 rounded-xl bg-red-950/40 text-red-400 border border-red-900/20">
            <Tag className="w-5 h-5" />
          </span>
        </div>

        <div className="bg-stone-900/90 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">กำลังแสดงผล (Active)</span>
            <strong className="text-2xl font-black text-emerald-400 mt-1 block">{activeCount}</strong>
          </div>
          <span className="p-3 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-900/20">
            <Eye className="w-5 h-5" />
          </span>
        </div>

        <div className="bg-stone-900/90 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">แบนเนอร์หลัก (Featured)</span>
            <strong className="text-2xl font-black text-amber-400 mt-1 block">{featuredCount}</strong>
          </div>
          <span className="p-3 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-900/20">
            <Sparkles className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* PROMOTION LIST */}
      <div className="bg-stone-900/90 border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
            <span>รายการโปรโมชั่นที่แสดงในหน้าร้าน</span>
          </h3>
          <span className="text-xs text-stone-400">เรียงตามลำดับและประเภท</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-stone-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-red-500" />
            <span className="text-xs">กำลังโหลดข้อมูลโปรโมชั่น...</span>
          </div>
        ) : promotions.length === 0 ? (
          <div className="py-16 text-center text-stone-500 flex flex-col items-center justify-center gap-3">
            <Tag className="w-8 h-8 text-stone-600" />
            <p className="text-sm font-medium">ยังไม่มีโปรโมชั่น</p>
            <button
              type="button"
              onClick={openCreateModal}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              คลิกที่นี่เพื่อเพิ่มโปรโมชั่นแรก
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  promo.isFeatured
                    ? 'bg-stone-950/80 border-amber-500/30 shadow-lg shadow-amber-950/10'
                    : 'bg-stone-950/40 border-white/5 hover:border-white/10'
                }`}
              >
                {/* Thumbnail & Info */}
                <div className="flex items-start sm:items-center gap-4 w-full md:w-auto">
                  <div className="relative w-28 sm:w-36 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-stone-900">
                    <Image
                      src={promo.imageUrl}
                      alt={promo.title}
                      fill
                      className="object-cover"
                    />
                    {promo.isFeatured && (
                      <span className="absolute top-1 left-1 bg-amber-500 text-stone-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-stone-300 uppercase tracking-wider">
                        {promo.badge}
                      </span>
                      {promo.discountTag && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-900/60 text-red-200 border border-red-800/40 uppercase tracking-wider">
                          {promo.discountTag}
                        </span>
                      )}
                      {promo.isActive === false && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-400 flex items-center gap-1">
                          <EyeOff className="w-2.5 h-2.5" /> ซ่อนอยู่
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-stone-100">{promo.title}</h4>
                    {promo.subtitle && <p className="text-xs text-amber-200/80">{promo.subtitle}</p>}
                    <p className="text-xs text-stone-400 line-clamp-1 max-w-md">{promo.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-0.5">
                      <span>ลิงก์: <code className="text-stone-400">{promo.linkUrl}</code></span>
                      <span>• ปุ่ม: <span className="text-stone-300">{promo.ctaText}</span></span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                  <button
                    type="button"
                    onClick={() => openEditModal(promo)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-stone-400" />
                    <span>แก้ไข</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(promo.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-400 text-xs font-medium border border-red-900/30 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ลบ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-500" />
                {editingPromo ? 'แก้ไขข้อมูลโปรโมชั่น' : 'เพิ่มโปรโมชั่นใหม่'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* IMAGE URL & PREVIEW */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300 block flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> URL รูปภาพโปรโมชั่น (Image URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... หรือ /images/wine_banner.png"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-stone-400">รูปตัวอย่างรวดเร็ว:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormImageUrl(preset.url)}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 border border-white/5 transition"
                    >
                      {preset.label.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Live Preview */}
                {formImageUrl && (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-stone-950 mt-2">
                    <Image
                      src={formImageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-white">
                      ตัวอย่างรูปภาพที่แสดงผล
                    </div>
                  </div>
                )}
              </div>

              {/* TITLE & SUBTITLE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">หัวข้อโปรโมชั่น (Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น GRAND CRU & VINTAGE SELECTION"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">คำโปรยรอง (Subtitle)</label>
                  <input
                    type="text"
                    placeholder="เช่น คอลเลกชันไวน์วินเทจระดับพรีเมียม"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-300 block">รายละเอียดและเงื่อนไขโปรโมชั่น (Description)</label>
                <textarea
                  rows={2}
                  placeholder="อธิบายข้อเสนอ สิทธิพิเศษ หรือเงื่อนไขของโปรโมชั่น..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition resize-none"
                />
              </div>

              {/* BADGES & TAGS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">ป้ายสถานะ (Badge)</label>
                  <input
                    type="text"
                    placeholder="FEATURED / NEW MEMBER"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">แท็กส่วนลด (Discount Tag)</label>
                  <input
                    type="text"
                    placeholder="UP TO 30% OFF / ลด 500฿"
                    value={formDiscountTag}
                    onChange={(e) => setFormDiscountTag(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">ระยะเวลา (Valid Until)</label>
                  <input
                    type="text"
                    placeholder="ถึงสิ้นเดือนนี้"
                    value={formValidUntil}
                    onChange={(e) => setFormValidUntil(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>

              {/* LINK & CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">ลิงก์ปลายทางเมื่อคลิก (Link URL)</label>
                  <input
                    type="text"
                    placeholder="/#products หรือ /register"
                    value={formLinkUrl}
                    onChange={(e) => setFormLinkUrl(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">ข้อความบนปุ่ม (CTA Text)</label>
                  <input
                    type="text"
                    placeholder="ดูสินค้าโปรโมชั่น / สมัครรับสิทธิ์"
                    value={formCtaText}
                    onChange={(e) => setFormCtaText(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>

              {/* OPTIONS TOGGLES */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-200">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 h-4 w-4 bg-stone-950 border-white/20"
                  />
                  <span>ตั้งเป็นแบนเนอร์หลักขนาดใหญ่ (Featured Hero Banner)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-200">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 bg-stone-950 border-white/20"
                  />
                  <span>เปิดใช้งานการแสดงผล (Active)</span>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-stone-300 hover:text-white text-xs font-bold transition"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 disabled:bg-stone-700 text-white text-xs font-bold shadow-lg transition"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingPromo ? 'บันทึกการแก้ไข' : 'เพิ่มโปรโมชั่น'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
