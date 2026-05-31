export type RawMessageRow = {
  id: number;
  room_id: string;
  content: string;
  sent_by: number;
  created_at: number;
  updated_at: number;
}

export type RawUserRow = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: number;
  updated_at: number;
}
