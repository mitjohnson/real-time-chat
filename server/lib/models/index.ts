import { MessageModelFactory } from "./messages.ts";
import { ChatRoomModel } from "./chatRoom.ts";
import type { DatabaseSync } from 'node:sqlite';
import type { Models } from "../../../types/index.ts";

export default function models(db: DatabaseSync): Models {
  return {
    messageModel: MessageModelFactory(db),
    chatRoomModel: ChatRoomModel(),
  }
};
