import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import type { AuthState } from '../../../types';

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token') || null,
  user: null,
  login: (token: string) => {
    localStorage.setItem('token', token);
    set({ user: jwtDecode(token) as AuthState['user'] });
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));
