import type { User } from '@sharedTypes'

export type AuthState = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}
