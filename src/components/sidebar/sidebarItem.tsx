"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarItemType } from "@/types/navigation";

interface Props extends SidebarItemType {
  onNavigate?: () => void;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
  isOpen,
  onNavigate,
}: Props) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== "/dashboard" &&
      pathname.startsWith(`${href}/`));

  const handleClick = () => {
    // Close only on mobile.
    if (
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      onNavigate?.();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      title={!isOpen ? title : undefined}
      className={`app-sidebar-item ${
        active ? "app-sidebar-item-active" : ""
      }`}
    >
      <Icon className="app-sidebar-item-icon" />

      <span
        className={`app-sidebar-item-label ${
          !isOpen
            ? "app-sidebar-item-label-hidden"
            : ""
        }`}
      >
        {title}
      </span>
    </Link>
  );
}