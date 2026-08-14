"use client";

import SidebarItem from "./sidebarItem";

import { sidebarItems } from "@/constants/navigation";

interface Props {
  isOpen: boolean;
  onNavigate?: () => void;
}

export default function SidebarContent({
  isOpen,
  onNavigate,
}: Props) {
  return (
    <nav className="app-sidebar-nav">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.href}
          {...item}
          isOpen={isOpen}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}