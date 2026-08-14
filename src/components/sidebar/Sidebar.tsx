"use client";

import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";

import { useSidebarStore } from "@/store/sidebarStore";

export default function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const closeSidebar = useSidebarStore(
    (state) => state.closeSidebar
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${
          isOpen ? "sidebar-overlay-visible" : ""
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        className={`app-sidebar ${
          isOpen
            ? "app-sidebar-open"
            : "app-sidebar-collapsed"
        }`}
      >
        {/* Header */}
        <SidebarHeader isOpen={isOpen} />

        {/* Navigation */}
        <div className="app-sidebar-content">
          <SidebarContent
            isOpen={isOpen}
            onNavigate={closeSidebar}
          />
        </div>

        {/* Footer */}
        <SidebarFooter isOpen={isOpen} />
      </aside>
    </>
  );
}