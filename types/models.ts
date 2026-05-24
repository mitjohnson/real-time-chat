import type { Message } from './index.ts';

export interface MessageModel {
    findByRoomId(roomId: string, limit: number): Message[];
    create(message: Message): Message | null;
}

export interface Models {
  messageModal: MessageModel;
}
