import { create } from "zustand";

interface FacebookUserInfo {
  fullName: string;
  id: string;
  slAccessToken: string;
}

interface FacebookState {
  isLogged: boolean;
  userInfo: FacebookUserInfo | undefined;
}

interface FacbookActions {
  login: (name: string, id: string, slAccessToken: string) => void;
  logout: () => void;
}

type FacebookStore = FacebookState & FacbookActions;

export const useFacebook = create<FacebookStore>()((set) => ({
  isLogged: false,
  userInfo: undefined,
  slAccessToken: undefined,
  userId: undefined,
  login: (name, id, slAccessToken) =>
    set({
      userInfo: {
        fullName: name,
        id,
        slAccessToken,
      },
      isLogged: true,
    }),
  logout: () => set({ userInfo: undefined, isLogged: false }),
}));
