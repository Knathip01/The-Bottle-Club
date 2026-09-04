import { requireAdmin } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminMobileNav from '@/components/admin/AdminMobileNav';
import AdminAIChat from '@/components/admin/AdminAIChat';
import '../admin-theme.css';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row font-sans relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #080d14 0%, #0b0f1a 40%, #0d1421 100%)',
        color: '#e2e8f0',
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 admin-grid-bg"
        style={{ opacity: 0.5 }}
      />

      {/* Ambient glow — top left crimson */}
      <div
        className="absolute pointer-events-none z-0 animate-float-1"
        style={{
          top: '-10%', left: '-5%',
          width: '50%', height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,30,58,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Ambient glow — bottom right blue */}
      <div
        className="absolute pointer-events-none z-0 animate-float-2"
        style={{
          bottom: '-10%', right: '-5%',
          width: '45%', height: '45%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
      />
      {/* Ambient glow — center gold */}
      <div
        className="absolute pointer-events-none z-0 animate-float-3"
        style={{
          top: '35%', right: '15%',
          width: '35%', height: '35%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        <AdminHeader />
        <div className="flex-1 p-3 sm:p-5 lg:p-7 overflow-y-auto admin-scroll admin-content-with-floating-nav lg:pb-7">
          {children}
        </div>
        <AdminMobileNav />
      </div>

      {/* Admin AI Chat — floating assistant */}
      <AdminAIChat />
    </div>
  );
}
