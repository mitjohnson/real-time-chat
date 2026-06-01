import { useState, useEffect, useRef } from 'react'
import { useSocket } from '@pages/chat/hooks/chatroom.hooks'

import type { Message, CreateMessageDTO } from '@sharedTypes'
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
    const message: CreateMessageDTO = {
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
    <div className='flex h-full w-full flex-col overflow-hidden rounded-lg bg-gray-800 text-white'>
      <section className='flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4'>
        {[...messages].map(message => (
          <MessageComponent key={message.id} {...message} />
        ))}
      </section>
      <section className='flex shrink-0 gap-2 border-t border-gray-700 p-4'>
        <input
          className='flex-1 rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500'
          ref={inputRef}
          onKeyDown={handleKeydown}
          placeholder='Message...'
        />
        <button
          onClick={sendMessage}
          className='shrink-0 rounded-lg bg-blue-600 px-5 py-3 font-semibold transition-colors hover:bg-blue-500'
        >
          Send
        </button>
      </section>
    </div>
  )
}

export default ChatRoom
