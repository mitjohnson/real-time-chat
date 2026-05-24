import { MessageModelFactory } from "./messages.ts";
import type { DatabaseSync } from 'node:sqlite';
import type { Models } from "../../../types/index.ts";

export default function models(db: DatabaseSync): Models {
  return {
    messageModal: MessageModelFactory(db),
  }
};
