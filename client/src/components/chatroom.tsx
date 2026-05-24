import { useState, useEffect, useRef } from 'react'
import { useSocket } from './chatroom.hooks.ts'

import type { Message } from '../../../types'
import MessageComponent from './message'
import './chatroom.scss'

function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { on, emit } = useSocket(import.meta.env.SOCKET_URL || '');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    emit('chat:join', { roomId });

    const offHistory = () => {
      on('chat:history', ({ messages }: { messages: Message[] }) => {
        const formattedMessages = messages.map((message) => ({
          content: message.content,
          timestamp: new Date(message.timestamp),
          sent: false
        }));
        setMessages(formattedMessages);
      });
    };
    
    const offMessage = () => {
      on('chat:message', (message: any) => {
        const messageObj: Message = {
          roomId,
          content: message?.content,
          timestamp: new Date(message?.timestamp),
          sent: false
        }
        
        if (!messageObj.content || !messageObj.timestamp) return;

        setMessages(prev => [...prev, { ...messageObj }])
      });
    };

    return () => { 
      emit('chat:leave', { roomId });
      offHistory();
      offMessage();
    }
  }, [on, emit, roomId]);

  const sendMessage = () => {
    const message: Message= { 
      content: inputRef.current?.value ?? '', 
      timestamp: Date.now(),
      sent: true
    }
    if (message.content.trim() !== '') {
      message.roomId = roomId 
      emit('chat:message', { ...message });
      setMessages(prev => [...prev, { ...message, timestamp: new Date(message.timestamp) }])
    }
    inputRef.current ? (inputRef.current.value = '') : null;
  };
  
  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') sendMessage();
  };

  return ( 
    <main id="chat">
      <section id="window">
        {[...messages].reverse().map((message, index) => 
          <MessageComponent 
            content={message.content} 
            timestamp={message.timestamp} 
            sent={message.sent} 
            key={index} 
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
