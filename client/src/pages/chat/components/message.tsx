import { useState } from 'react'
import type { Message } from '@sharedTypes'
import { useAuthStore } from '@store/auth.store'

function Message({ content, timestamp, sentBy }: Message) {
  const [showTimestamp, setShowTimestamp] = useState(false)
  const { user } = useAuthStore()

  const isUserMessage = sentBy === user?.id
  const sentTime =
    timestamp ?
      new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <div
      className={`flex flex-col gap-1 ${isUserMessage ? 'items-start' : 'items-end'}`}
    >
      <div
        className={`relative flex items-center ${isUserMessage ? 'justify-start' : 'justify-end'}`}
        onClick={() => setShowTimestamp(true)}
        onMouseLeave={() => setShowTimestamp(false)}
      >
        <span
          className={`absolute text-xs text-gray-500 transition-opacity duration-200 ${showTimestamp ? 'opacity-100' : 'opacity-0'} ${isUserMessage ? 'left-0' : 'right-0'}`}
        >
          {sentTime}
        </span>
        <div
          className={`max-w-xs cursor-pointer rounded-2xl px-4 py-2 text-sm leading-relaxed transition-transform duration-200 md:max-w-md lg:max-w-lg ${
            isUserMessage ?
              'rounded-bl-sm bg-blue-600 text-white'
            : 'rounded-br-sm bg-gray-700 text-gray-100'
          } ${
            showTimestamp ?
              isUserMessage ? 'translate-x-16'
              : '-translate-x-16'
            : ''
          }`}
        >
          {content}
        </div>
      </div>
      <span className='px-1 text-xs text-gray-500'>
        {isUserMessage ? 'You' : sentBy}
      </span>
    </div>
  )
}

export default Message
