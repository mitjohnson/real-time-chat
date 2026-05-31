export type CreateMessageDTO = {
  roomId: string;
  content: string;
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


