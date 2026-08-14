"use client";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

interface Props {
  isOpen: boolean;
}

export default function SidebarFooter({
  isOpen,
}: Props) {
  const { signOut } = useClerk();
  return (
    <div className="app-sidebar-footer">
      <button
        type="button"
        className="app-sidebar-logout"
        title={!isOpen ? "Logout" : undefined}
        onClick={() => signOut({ redirectUrl: "/" })}
      >
        <LogOut className="app-sidebar-logout-icon" />

        <span
          className={`app-sidebar-logout-label ${
            !isOpen
              ? "app-sidebar-logout-label-hidden"
              : ""
          }`}
        >
          Logout
        </span>
      </button>
    </div>
  );
}