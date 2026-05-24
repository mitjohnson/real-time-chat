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
  timestamp: number;
}
