"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/store/sidebarStore";

export default function CloseSidebarOnMount() {
  const closeSidebar = useSidebarStore(
    (state) => state.closeSidebar
  );

  useEffect(() => {
    closeSidebar();
  }, [closeSidebar]);

  return null;
}