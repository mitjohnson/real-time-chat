import type Message from "@pages/chat/components/message";

export function formatMessage(message: Record<string, any>): Message {
  return {
    id: Number(message.id),
    roomId: message.roomId,
    content: message?.content,
    timestamp: new Date(message?.timestamp),
    sentBy: message.sentBy,
  }
}
