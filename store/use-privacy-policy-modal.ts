import { create } from 'zustand';

type PrivacyPolicyModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const usePrivacyPolicyModal = create<PrivacyPolicyModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
