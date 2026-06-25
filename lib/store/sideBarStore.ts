import { create } from "zustand";

interface SideBarState {
  sideBarIsOpen: boolean;
}

interface SideBarAction {
  closeSideBar: () => void;
  openSideBar: () => void;
}

export const useSideBarStore = create<SideBarState & SideBarAction>((set) => ({
  sideBarIsOpen: false,
  closeSideBar: () => set({ sideBarIsOpen: false }),
  openSideBar: () => set({ sideBarIsOpen: true }),
}));
