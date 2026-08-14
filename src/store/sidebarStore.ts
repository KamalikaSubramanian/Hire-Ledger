import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;

  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  // Desktop starts open
  isOpen: true,

  toggleSidebar: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  openSidebar: () =>
    set({
      isOpen: true,
    }),

  closeSidebar: () =>
    set({
      isOpen: false,
    }),
}));