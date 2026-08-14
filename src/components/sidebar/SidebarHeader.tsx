"use client";

import { Sparkles } from "lucide-react";

interface SidebarHeaderProps {
  isOpen: boolean;
}

export default function SidebarHeader({
  isOpen,
}: SidebarHeaderProps) {
  return (
    <header className="app-sidebar-header">
      {/* Logo */}
      <div className="app-sidebar-logo">
        <Sparkles />
      </div>

      {/* Brand */}
      <div
        className={`app-sidebar-brand ${
          !isOpen
            ? "app-sidebar-brand-hidden"
            : ""
        }`}
      >
        Hire Ledger
      </div>
    </header>
  );
}