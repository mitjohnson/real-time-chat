import type { Server, Socket } from "socket.io";
import type { Message, User, createMessageDTO } from '@sharedTypes';
import type { Models } from "@types";
  
export function chatHandlers(socket: Socket, io: Server, models: Models) {
    const { messageModel, chatRoomModel, userModel } = models;
    const { createChatRoom } = chatRoomModel;
    
      socket.on('chat:join', ({ roomId }) => {
        const room = createChatRoom(io, roomId)
        room.join(socket);
        
        const history = messageModel.findByRoomId(roomId, 50);
        socket.emit('chat:history', { roomId, messages: history });
      });

      socket.on('chat:leave', ({ roomId }) => {
        const room = createChatRoom(io, roomId)
        room.leave(socket);
      });

      socket.on('chat:message', ({ roomId, content, sentBy = null }: createMessageDTO) => {
        if (!roomId || !content) {
          console.error('Received invalid chat:message data:', { roomId, content });
          socket.emit('error', { message: 'Missing roomId or content' });
        }

        const room = createChatRoom(io, roomId)
        
        const user = userModel.findByEmail({ email: socket.data.user.email, raw: false });
        if (!user) {
          console.error('User not found for email:', socket.data.user.email);
          socket.emit('error', { message: 'User not authenticated' });
          return;
        }

        if (sentBy && sentBy !== user.id) {
          console.warn(`Client attempted to send message with sentBy ${sentBy} that does not match authenticated user ID ${user.id}`);
        };
        
        const message: createMessageDTO = {
          roomId,
          content,
          sentBy: user.id,
        };
        
        const result = messageModel.create(message);
        if (!result) return console.error('Failed to save message to database');

        room.send(result);
      });
};
