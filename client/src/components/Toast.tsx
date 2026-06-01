import type { Toast } from '@types'
import { useToastStore } from '@store/toast.store'

export default function Toast({ id, message, type, dismissing }: Toast) {
  const { remove } = useToastStore()

  const styleByType = {
    success: 'bg-green-700',
    error: 'bg-red-800',
    info: 'bg-blue-600',
  } as const

  return (
    <div
      className={[
        styleByType[type],
        'relative w-fit max-w-sm min-w-48 rounded-lg px-4 py-3',
        'text-white shadow-lg transition-opacity duration-300 hover:opacity-100',
        dismissing ? 'opacity-0' : 'opacity-70',
      ].join(' ')}
    >
      <button
        onClick={() => remove(id)}
        className='absolute top-0 right-1 text-white/70 hover:text-white'
      >
        ✕
      </button>
      <span className='pr-5'>{message}</span>
    </div>
  )
}
