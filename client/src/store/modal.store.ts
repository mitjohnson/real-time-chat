import { create } from 'zustand';
import type { ModalStore } from '@types';

export const useModalStore = create<ModalStore>((set) => ({
  stack: [],
  open: (content) => set((state) => ({ stack: [...state.stack, content] })),
  close: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
}));
