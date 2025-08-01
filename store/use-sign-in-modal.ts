import { create } from 'zustand';

type SignInModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useSignInModal = create<SignInModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
