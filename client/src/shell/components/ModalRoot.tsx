import { useModalStore } from '@store/modal.store'
import { useEffect, useRef } from 'react'
import styles from './ModalRoot.module.css'

export default function ModalRoot() {
  const { stack, close } = useModalStore()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    stack.length > 0 ?
      dialogRef.current?.showModal()
    : dialogRef.current?.close()
  }, [stack.length])

  const handleOutsideClick = (e: React.MouseEvent) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return

    const isOutsideDialog =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom

    if (isOutsideDialog) close()
  }

  return (
    <dialog
      className={`fixed top-1/2 left-1/2 h-min w-min -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-700 p-5 ${styles.dialog}`}
      ref={dialogRef}
      onClose={close}
      onCancel={close}
      onClick={handleOutsideClick}
    >
      {stack.length > 0 && stack[stack.length - 1]}
    </dialog>
  )
}
