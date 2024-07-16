import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GhostState {
  isGhostMode: boolean;
  toggle: () => void;
}

export const useGhost = create<GhostState>()(
  persist(
    (set) => ({
      isGhostMode: false,
      toggle: () => set((state) => ({ isGhostMode: !state.isGhostMode })),
    }),
    {
      name: "app-state",
    }
  )
);
