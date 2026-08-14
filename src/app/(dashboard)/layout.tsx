import ProtectedLayout from "@/components/layouts/ProtectedLayout";

import CloseSidebarOnMount from "@/components/sidebar/CloseSidebarOnMount";

import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedLayout>
      <CloseSidebarOnMount />
      <div className="dashboard-layout">
        {/* Sidebar */}
        <Sidebar />

        {/* Main application */}
        <div className="dashboard-main">
          {/* Navbar */}
          <Navbar />

          {/* Scrollable page */}
          <main className="dashboard-page-content">
            <div className="dashboard-content">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
