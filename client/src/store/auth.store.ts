import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import type { AuthState } from '../../../types';

const storedToken = localStorage.getItem('token');

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: storedToken ? (jwtDecode(storedToken) as AuthState['user']) : null,
  login: (token: string) => {
    localStorage.setItem('token', token);
    set({ token, user: jwtDecode(token) as AuthState['user'] });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));
