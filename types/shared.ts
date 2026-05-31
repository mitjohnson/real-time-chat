export type createMessageDTO = {
  roomId: string;
  content: string;
  sentBy?: number | null;
};

export type Message = {
  id: number;
  roomId: string;
  content: string;
  sentBy: number;
  timestamp: number; // UTC
}

export type User = {
  id: number;
  name: string;
  email: string;
}


