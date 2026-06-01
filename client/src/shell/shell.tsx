import { Outlet } from 'react-router-dom'
import Sidebar from '@src/shell/components/Sidebar'
import ModalRoot from '@src/shell/components/ModalRoot'
import ToastRoot from '@src/components/ToastRoot'

export default function Shell() {
  return (
    <div className='flex h-screen bg-gray-950'>
      <Sidebar />
      <main className='flex flex-1 min-w-0 overflow-hidden'>
        <Outlet />
      </main>
      <ModalRoot />
      <ToastRoot />
    </div>
  )
}
