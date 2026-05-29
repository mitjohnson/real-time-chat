import { useState, useEffect, useRef } from 'react'
import { useSocket } from '@pages/chat/hooks/chatroom.hooks'

import type { Message } from '@types/index'
import { formatMessage } from '@lib/utils'
import MessageComponent from './message'

function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const {isConnected, on, emit } = useSocket(import.meta.env.VITE_SOCKET_URL || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isConnected) return;

    emit('chat:join', { roomId });
    const offHistory = on('chat:history', ({ messages }: { messages: Message[] }) => {
      setMessages(messages.map(formatMessage));
    });
    
    const offMessage = on('chat:message', (message: Message) => {
      setMessages(prev => [...prev, { ...formatMessage(message)}]);
    });

    return () => { 
      emit('chat:leave', { roomId });
      offHistory();
      offMessage();
    }
  }, [isConnected, roomId]);

  const sendMessage = () => {
    const message: Message= { 
      roomId: roomId,
      content: inputRef.current?.value ?? '', 
    }
    if (message.content.trim() !== '') {
      emit('chat:message', { ...message });
    }
    if (inputRef.current) inputRef.current.value = '';
  };
  
  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') sendMessage();
  };

  return ( 
    <main>
      <section>
        {[...messages].map((message) => 
          <MessageComponent 
            content={message.content} 
            timestamp={message.timestamp} 
            sentBy={message.sentBy} 
            key={message.id} 
          />
        )}
      </section>

      <section >
        <input ref={inputRef} onKeyDown={handleKeydown} />
        <button onClick={sendMessage} > SEND </button>
      </section>
    </main>
  );
};

export default ChatRoom
