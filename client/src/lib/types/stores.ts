import type { User } from '@sharedTypes'
import type { Toast } from './entities.ts';
import type { ReactNode } from 'react';

export type AuthState = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export type ModalStore = {
  stack: ReactNode[];
  open: (content: React.ReactNode) => void;
  close: () => void;
};

export type ToastStore = {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
  dismiss: (id: string) => void;
}
