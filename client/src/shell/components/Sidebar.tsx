import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@src/assets/chat_logo.svg?react'
import AddRoom from '@src/shell/components/AddRoom'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const navigate = useNavigate()

  return (
    <aside
      className='sticky shrink-0 top-0 left-0 flex h-screen w-full flex-col overflow-hidden rounded-b-xs border-r border-gray-800 bg-gray-900'
      style={{
        width: isCollapsed ? '6rem' : '16rem',
        transition: 'width 0.3s',
      }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <section
        className='flex cursor-pointer items-center justify-center gap-1 p-4'
        onClick={() => navigate('/')}
      >
        <div className='h-12 w-12 flex-none'>
          <Logo className='h-full w-full fill-white' />
        </div>
        <span
          className={`overflow-hidden text-lg font-semibold whitespace-nowrap text-white transition-opacity duration-300 ${
            isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs pl-3 opacity-100'
          }`}
        >
          ChatApp
        </span>{' '}
      </section>
      <section className='flex flex-1 flex-col overflow-y-auto'>
        <AddRoom isCollapsed={isCollapsed} />
      </section>
    </aside>
  )
}
