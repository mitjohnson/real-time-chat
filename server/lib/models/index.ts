import { MessageModelFactory } from "./messages.ts";
import { ChatRoomModel } from "./chatroom.ts";
import { UserModelFactory } from "./user.ts";
import type { DatabaseSync } from 'node:sqlite';
import type { Models } from "@types";

export default function models(db: DatabaseSync): Models {
  return {
    userModel: UserModelFactory(db),
    messageModel: MessageModelFactory(db),
    chatRoomModel: ChatRoomModel(),
  }
};
