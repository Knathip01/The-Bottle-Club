import Link from 'next/link';
import { Download, FileCode, Database, FileArchive, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';

export default function DownloadPage() {
  const downloadItems = [
    {
      title: 'ชุดไฟล์ Backend API ครบชุด (.ZIP)',
      filename: 'bottleclub-backend-api.zip',
      size: '18 KB',
      description: 'แพ็กเกจรวมทุกไฟล์: Models, Schemas, Routers, OAuth2, SQL และคู่มือการติดตั้ง',
      href: '/api/download/backend-zip',
      icon: FileArchive,
      badge: 'แนะนำสูงสุด (Recommended)',
      color: 'from-amber-500 to-red-600',
      btnColor: 'bg-[#a11a1a] hover:bg-[#851515] text-white',
    },
    {
      title: 'ไฟล์ Python รวมโค้ดทั้งหมดในไฟล์เดียว (.py)',
      filename: 'bottleclub_api_complete.py',
      size: '16 KB',
      description: 'FastAPI + SQLAlchemy + Pydantic v2 รวมทุกอย่างในไฟล์เดียว นำไปวางใน Backend แล้วรันได้ทันที',
      href: '/api/download/backend-py',
      icon: FileCode,
      badge: 'ไฟล์เดียวจบ (All-in-One)',
      color: 'from-blue-600 to-indigo-600',
      btnColor: 'bg-stone-900 hover:bg-stone-800 text-white',
    },
    {
      title: 'สคริปต์ฐานข้อมูล PostgreSQL (.SQL)',
      filename: 'schema_migrations.sql',
      size: '4 KB',
      description: 'คำสั่งสร้างตารางที่อยู่ลูกค้า, สลิปโอนเงิน, ประวัติแต้มสะสม, รีวิว, และตั้งค่าร้านค้า',
      href: '/api/download/sql',
      icon: Database,
      badge: 'Database Schema',
      color: 'from-emerald-600 to-teal-600',
      btnColor: 'bg-stone-900 hover:bg-stone-800 text-white',
    },
    {
      title: 'เอกสารแผนแม่บท Master API Plan (.MD)',
      filename: 'master-api-plan-bottleclub.md',
      size: '30 KB',
      description: 'เอกสารข้อกำหนด API ฉบับสมบูรณ์ พร้อมสเปก Request/Response และ Business Logic ละเอียด',
      href: '/api/download/master-plan',
      icon: FileText,
      badge: 'Full Specification',
      color: 'from-purple-600 to-pink-600',
      btnColor: 'bg-stone-900 hover:bg-stone-800 text-white',
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <MainHeader />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-[#a11a1a] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            <CheckCircle2 size={14} /> Backend API Package
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-stone-900">
            ดาวน์โหลดไฟล์ Backend API
          </h1>
          <p className="mt-3 text-sm text-stone-500 font-medium">
            ชุดไฟล์สำหรับ Backend Developer (FastAPI & PostgreSQL) พัฒนาระบบ The Bottle Club & Admin POS Wine
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {downloadItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.filename}
                className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-stone-100 text-stone-800">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-stone-400 font-mono mb-3">{item.filename} · {item.size}</p>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">{item.description}</p>
                </div>

                <a
                  href={item.href}
                  download={item.filename}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all ${item.btnColor}`}
                >
                  <Download size={14} />
                  ดาวน์โหลดไฟล์ ({item.size})
                </a>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="rounded-2xl border border-stone-200 bg-white p-8">
          <h2 className="text-sm font-black uppercase tracking-wider text-stone-900 mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" /> ตำแหน่งไฟล์ในคอมพิวเตอร์ของคุณ
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            ไฟล์ทั้งหมดได้ถูกบันทึกลงในโฟลเดอร์ <span className="font-bold text-stone-900">Downloads</span> ของเครื่องคุณเรียบร้อยแล้วเช่นกัน สามารถเปิดดูหรือส่งต่อให้เพื่อนได้ทันทีที่:
          </p>
          <div className="p-4 bg-stone-100 rounded-xl font-mono text-xs text-stone-800 space-y-1.5 select-all">
            <div>📂 C:\Users\dungk\Downloads\bottleclub-backend-api.zip</div>
            <div>📂 C:\Users\dungk\Downloads\bottleclub_api_complete.py</div>
            <div>📂 C:\Users\dungk\Downloads\schema_migrations.sql</div>
            <div>📂 C:\Users\dungk\Downloads\master-api-plan-bottleclub.md</div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
