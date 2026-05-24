export type Message = {
  id?: number;
  roomId?: string;
  content: string;
  timestamp: Date | number;
  sent: boolean;
}
