import { create } from "zustand";

interface SidebarState {
  isHidden: boolean;
  toggle: () => void;
}

export const useSidebar = create<SidebarState>()((set) => ({
  isHidden: false,
  toggle: () => set((state) => ({ isHidden: !state.isHidden })),
}));
