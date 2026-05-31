import PlusIcon from '@src/assets/plus.svg?react'

export default function AddRoom({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <button className='flex w-full cursor-pointer items-start justify-center gap-2 border-t border-gray-800 py-3 text-white transition-colors hover:bg-gray-800'>
      <div className='h-8 w-8 flex-none rounded-full bg-gray-700'>
        <PlusIcon className='fill-white' />
      </div>
      <span
        className={`overflow-hidden whitespace-nowrap text-white transition-opacity duration-300 ${
          isCollapsed ? 'max-w-0 opacity-0' : 'mt-1 max-w-xs opacity-100'
        }`}
      >
        New
      </span>
    </button>
  )
}
