export type Message = {
  roomId?: string;
  content: string;
  timestamp: Date | number;
  sent: boolean;
}
