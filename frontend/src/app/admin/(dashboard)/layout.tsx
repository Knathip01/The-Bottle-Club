import { requireAdmin } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce admin authentication - throws redirect to /admin/login if not authenticated
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#070605] flex flex-col lg:flex-row text-stone-100 font-sans relative overflow-hidden">
      {/* High-tech Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30 z-0" />

      {/* Ambient background glows for 2027/2026 design aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-950/20 blur-[130px] pointer-events-none z-0 animate-float-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-rose-950/15 blur-[110px] pointer-events-none z-0 animate-float-2" />
      <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full bg-amber-950/5 blur-[100px] pointer-events-none z-0 animate-float-3" />

      {/* Admin Sidebar Navigation */}
      <AdminSidebar admin={admin} />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Top Header Bar */}
        <AdminHeader />

        {/* Content Viewport */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-transparent select-none pb-24 lg:pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}
