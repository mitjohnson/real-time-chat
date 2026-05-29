import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@store/auth.store'
import http from '@lib/http'

import Field from '@src/components/LabeledField'

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }

    try {
      const { token = null } = await http.post('/auth/login', { email, password })
      if (!token) {
        alert('Login failed')
        return
      }

      login(token)
      navigate('/')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed')
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className='space-y-6'>
      <fieldset className='m-0 space-y-4 border-none p-0'>
        <legend className='sr-only'> Login to your account </legend>
        <Field label='Email' type='email' ref={emailRef} />
        <Field label='Password' type='password' ref={passwordRef} />
      </fieldset>

      <button
        type='submit'
        className='mt-5 w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90'
      >
        Login
      </button>

      <p className='text-center text-sm'>
        No account?{' '}
        <button type='button' onClick={onSwitch} className='font-medium text-gray-900 hover:underline'>
          Sign up
        </button>
      </p>
    </form>
  )
}
