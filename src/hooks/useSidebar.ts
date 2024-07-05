import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isHidden: boolean;
  toggle: () => void;
}

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isHidden: false,
      toggle: () => set((state) => ({ isHidden: !state.isHidden })),
    }),
    {
      name: "app-state",
    }
  )
);
