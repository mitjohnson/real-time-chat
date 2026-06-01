import { createPortal } from 'react-dom'
import { useToastStore } from '@store/toast.store'

import Toast from './Toast'

export default function ToastRoot() {
  const { toasts } = useToastStore()
  return createPortal(
    <output
      role='status'
      aria-live='polite'
      className='fixed top-4 right-4 flex flex-col gap-2'
    >
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </output>,
    document.body
  )
}
