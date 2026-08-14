"use client";

import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/sidebarStore";

export default function Navbar() {
  const toggleSidebar = useSidebarStore(
    (state) => state.toggleSidebar
  );

  return (
    <header className="app-navbar">
      {/* LEFT */}
      <div className="app-navbar-left">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="navbar-menu-button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Menu />
        </Button>

        {/* BRAND */}
        <div className="navbar-brand">
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">
              Hire<span>Ledger</span>
            </span>

            <span className="navbar-brand-tagline">
              Resume Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="app-navbar-right">
        <div className="navbar-user">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "navbar-clerk-avatar",
                userButtonPopoverCard:
                  "navbar-clerk-popover",
              },
            }}
            userProfileMode="modal"
          />
        </div>
      </div>
    </header>
  );
}