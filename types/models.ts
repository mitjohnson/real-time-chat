import type { Message, User } from './index.ts';
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

export interface UserModel {
  findById(userId: number): User | null;
  findByEmail(email: string): User | null;
  create({ name, email, password }: { name: string | null, email: string, password: string }): User | null;
}

export interface Models {
  userModel: UserModel;
  messageModel: MessageModel;
  chatRoomModel: ChatRoomModel;
}
