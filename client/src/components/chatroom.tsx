import { useState, useEffect, useRef } from 'react'
import { useSocket } from './chatroom.hooks.ts'

import type { Message } from '../../../types'
import MessageComponent from './message'
import './chatroom.scss'

function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const {isConnected, on, emit } = useSocket(import.meta.env.VITE_SOCKET_URL || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isConnected) return;

    emit('chat:join', { roomId });
    const offHistory = on('chat:history', ({ messages }: { messages: Message[] }) => {
      const formattedMessages: Message[] = messages.map((message) => ({
        id: Number(message.id),
        roomId: message.roomId,
        content: message.content,
        timestamp: new Date(message.timestamp),
        sent: false
      }));
      setMessages(formattedMessages);
    });
    
    const offMessage = on('chat:message', (message: Message) => {
      const messageObj: Message = {
        id: Number(message.id),
        roomId: message.roomId,
        content: message?.content,
        timestamp: new Date(message?.timestamp),
        sent: false
      }
      if (!messageObj.content || !messageObj.timestamp) return;

      setMessages(prev => [...prev, { ...messageObj }])
    });

    return () => { 
      emit('chat:leave', { roomId });
      offHistory();
      offMessage();
    }
  }, [isConnected, roomId]);

  const sendMessage = () => {
    const message: Message= { 
      content: inputRef.current?.value ?? '', 
      timestamp: Date.now(),
      sent: true
    }
    if (message.content.trim() !== '') {
      message.roomId = roomId 
      emit('chat:message', { ...message });
    }
    if (inputRef.current) inputRef.current.value = '';
  };
  
  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') sendMessage();
  };

  return ( 
    <main id="chat">
      <section id="window">
        {[...messages].map((message) => 
          <MessageComponent 
            content={message.content} 
            timestamp={message.timestamp} 
            sent={message.sent} 
            key={message.id} 
          />
        )}
      </section>

      <section id="input-area">
        <input ref={inputRef} onKeyDown={handleKeydown} id="input"/>
        <button onClick={sendMessage}> SEND </button>
      </section>
    </main>
  );
};

export default ChatRoom
