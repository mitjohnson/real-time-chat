import { useState, useEffect, useRef } from 'react'
import { useSocket } from '@pages/chat/hooks/chatroom.hooks'

import type { Message, createMessageDTO } from '@sharedTypes'
import MessageComponent from '@pages/chat/components/message'

function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const { isConnected, on, emit } = useSocket(
    import.meta.env.VITE_SOCKET_URL || ''
  )
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isConnected) return

    emit('chat:join', { roomId })
    const offHistory = on(
      'chat:history',
      ({ messages }: { messages: Message[] }) => {
        setMessages(messages.map(message => message))
      }
    )

    const offMessage = on('chat:message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    return () => {
      emit('chat:leave', { roomId })
      offHistory()
      offMessage()
    }
  }, [isConnected, roomId])

  const sendMessage = () => {
    const message: createMessageDTO = {
      roomId: roomId,
      content: inputRef.current?.value ?? '',
    }
    if (message.content.trim() !== '') {
      emit('chat:message', message)
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') sendMessage()
  }

  return (
  <div className='flex h-full w-full flex-col rounded-lg bg-gray-800 text-white overflow-hidden'>
    <section className='flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-2'>
      {[...messages].map(message => (
        <MessageComponent
          content={message.content}
          timestamp={message.timestamp}
          sentBy={message.sentBy}
          key={message.id}
        />
      ))}
    </section>
    <section className='shrink-0 flex gap-2 p-4 border-t border-gray-700'>
      <input
        className='flex-1 rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500'
        ref={inputRef}
        onKeyDown={handleKeydown}
        placeholder='Message...'
      />
      <button
        onClick={sendMessage}
        className='shrink-0 rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 transition-colors'
      >
        Send
      </button>
    </section>
  </div>
)}

export default ChatRoom
