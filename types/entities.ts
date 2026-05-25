export type Message = {
  id?: number;
  roomId?: string;
  content: string;
  timestamp: Date | number;
  sent: boolean;
}

export type RawMessageRow = {
  id: number;
  room_id: string;
  content: string;
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
