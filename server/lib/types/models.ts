import type { RawUserRow } from './index.ts';
import type { Message, createMessageDTO, User } from '@sharedTypes';
import type { Socket, Server } from 'socket.io';

export interface MessageModel {
    findByRoomId(roomId: string, limit: number): Message[];
    create(message: createMessageDTO): Message | null;
}

export interface ChatRoomModel {
  createChatRoom(io: Server, roomId: string): {
    join(socket: Socket): void;
    leave(socket: Socket): void;
    send(data: Message): void;
  }
};

export interface UserModel {
  findById(args: { id: number, raw: true }): RawUserRow | null;
  findById(args: { id: number, raw?: false }): User | null;
  findById(args: { id: number, raw?: boolean }): User | RawUserRow | null;
  findByEmail({ email, raw }: { email: string, raw: true }): RawUserRow | null;
  findByEmail({ email, raw }: { email: string, raw?: false }): User | null;
  findByEmail({ email, raw }: { email: string, raw?: boolean }): User | null;
  create({ name, email, password }: { name: string | null, email: string, password: string }): User | null;
}

export interface Models {
  userModel: UserModel;
  messageModel: MessageModel;
  chatRoomModel: ChatRoomModel;
}
