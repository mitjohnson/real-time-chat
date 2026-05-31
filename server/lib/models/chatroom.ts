import type { Socket, Server } from "socket.io";
import type { Message } from "@sharedTypes";

export function ChatRoomModel() {
  return {
    createChatRoom: (io: Server, roomId: string) => {
      if (!roomId) throw new Error('roomId is required');
      return {
        join(socket: Socket) {
          socket.join(roomId);
          io.to(roomId).emit('chat:joined', { roomId, userId: socket.id });
        },
        leave(socket: Socket) {
          socket.leave(roomId);
          io.to(roomId).emit('chat:leave', { roomId, userId: socket.id });
        },
        send(data: Message) {
          io.to(roomId).emit('chat:message', { ...data, roomId });
        },
      }    
    },
  };
}
