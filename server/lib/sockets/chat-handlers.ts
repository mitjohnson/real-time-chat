import type { Server, Socket } from "socket.io";
import type { Message, Models } from '../../../types/index.ts';

  
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

      socket.on('chat:message', (data) => {
        const { roomId, ...messageData } = data;
        const room = createChatRoom(io, roomId)
        const user = userModel.findByEmail(socket.data.user.email);
        if (!user) {
          console.error('User not found for email:', socket.data.user.email);
          return;
        }
        
        const message: Message = {
          roomId: roomId,
          content: messageData.content,
          sentBy: user.id!,
        };
        
        const result = messageModel.create(message);
        if (!result) return console.error('Failed to save message to database');

        room.send(result);
      });
};
