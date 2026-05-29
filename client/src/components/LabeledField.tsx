import { forwardRef } from 'react'

const Field = forwardRef<
  HTMLInputElement,
  { id: string; label: string; type: string; placeholder: string; autoComplete?: string }
>(({ id, label, type, placeholder, autoComplete }, ref) => {
  return (
    <div>
      <label className='mb-1.5 block text-sm'>{label}</label>
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className='w-full rounded-lg border border-black px-3 py-2 text-sm transition outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10'
      />
    </div>
  )
})

Field.displayName = 'Field'
export default Field
