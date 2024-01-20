import { create } from "zustand";

interface FacebookUserInfo {
  fullName: string;
}

interface FacebookState {
  isLogged: boolean;
  userInfo: FacebookUserInfo | undefined;
}

interface FacbookActions {
  login: (name: string) => void;
  logout: () => void;
}

type FacebookStore = FacebookState & FacbookActions;

export const useFacebook = create<FacebookStore>()((set) => ({
  isLogged: false,
  userInfo: undefined,
  login: (name) =>
    set({
      userInfo: {
        fullName: name,
      },
      isLogged: true,
    }),
  logout: () => set({ userInfo: undefined, isLogged: false }),
}));
