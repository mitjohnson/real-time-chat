import { ChatRoomModel } from './chatroom.ts'
import type { Server, Socket } from "socket.io";
import type { Message, Models } from '../../../types/index.ts';

  
export function chatHandlers(socket: Socket, io: Server, models: Models) {
    const chatModel = ChatRoomModel();
    const { messageModal } = models;
    
      socket.on('chat:join', ({ roomId }) => {
        const room = chatModel.createChatRoom(io, roomId)
        room.join(socket);
        
        console.log(`User ${socket.id} joined room ${roomId}`);
  
        const history = messageModal.findByRoomId(roomId, 50);
        console.log(`Sending chat history to user ${socket.id} for room ${roomId}:`, history);
        socket.emit('chat:history', { roomId, messages: history });
      });

      socket.on('chat:leave', ({ roomId }) => {
        const room = chatModel.createChatRoom(io, roomId)
        room.leave(socket);
        console.log(`User ${socket.id} left room ${roomId}`);
      });

      socket.on('chat:message', (data) => {
        const { roomId, ...messageData } = data;
        const room = chatModel.createChatRoom(io, roomId)
        console.log(`User ${socket.id} sent message to room ${roomId}: ${messageData.content}`);
        
        const message: Message = {
          roomId: roomId,
          content: messageData.content,
          timestamp: messageData.timestamp,
          sent: false,
        };
        
        messageModal.create(message);
        
        room.send(messageData);
      });
};
