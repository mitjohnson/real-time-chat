import type { Message } from './index.ts';
import type { Socket, Server } from '../server/node_modules/socket.io/dist/index.d.ts';

export interface MessageModel {
    findByRoomId(roomId: string, limit: number): Message[];
    create(message: Message): Message | null;
}

export interface ChatRoomModel {
  createChatRoom(io: Server, roomId: string): {
    join(socket: Socket): void;
    leave(socket: Socket): void;
    send(data: Message): void;
  }
};

export interface Models {
  messageModel: MessageModel;
  chatRoomModel: ChatRoomModel;
}
