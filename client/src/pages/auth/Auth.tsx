import { useState } from 'react'

import LoginForm from '@pages/auth/components/LoginForm'
import RegisterForm from '@pages/auth/components/RegisterFrom'
import ToastRoot from '@src/components/ToastRoot';

type Tab = 'login' | 'register'

export default function AuthTab() {
  const [tab, setTab] = useState<Tab>('login')
  const handleTabChange = (selectedTab: Tab) => setTab(selectedTab)

  return (
    <>
      <ToastRoot />
      <main className='flex min-h-screen flex-col items-center justify-center bg-gray-800'>
        <section
          aria-label='Authentication Tabs'
          className='w-full max-w-md overflow-hidden rounded-xl border border-gray-100 bg-gray-100 p-6 shadow-md'
        >
          <div
            role='tablist'
            aria-orientation='horizontal'
            className='mb-6 grid grid-cols-2 border-b border-gray-300'
          >
            {(['login', 'register'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                role='tab'
                aria-selected={t === 'login'}
                className={`font-mediuEmailm border-b-2 py-3.5 text-sm transition-colors ${
                  tab === t ?
                    'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          <div role='tabpanel' className='w-full'>
            {tab === 'login' ?
              <LoginForm
                onSwitch={() => {
                  setTab('register')
                }}
              />
            : <RegisterForm
                onSwitch={() => {
                  setTab('login')
                }}
              />
            }
          </div>
        </section>
      </main>
    </>
  )
}
