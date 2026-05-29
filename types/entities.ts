export type Message = {
  id?: number;
  roomId?: string;
  content: string;
  sentBy?: number;
  timestamp?: Date | number;
}

export type RawMessageRow = {
  id: number;
  room_id: string;
  content: string;
  sent_by: number;
  created_at: number;
  updated_at: number;
}

export type User = {
  id?: number;
  name: string | null;
  email?: string;
  password?: string;
}

export type RawUserRow = {
  id: number;
  name: string | null;
  email: string;
  password: string;
  created_at: number;
  updated_at: number;
}

export type AuthState = {
  token: string | null;
  user: { id: number; name: string; email: string } | null;
  login: (token: string) => void;
  logout: () => void;
}
