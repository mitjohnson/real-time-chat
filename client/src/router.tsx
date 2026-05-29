import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import AuthTabs from '@pages/auth/Auth.tsx'
import Chat from '@pages/chat/chat.tsx'

function ProtectedRoute() {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to='/login' replace />
  return <Outlet />
}

function LoginRedirect() {
  const token = localStorage.getItem('token')
  if (token) return <Navigate to='/' replace />
  return <Outlet />
}

export const router = createBrowserRouter([
  { path: '/login', element: <LoginRedirect />, children: [{ path: '/login', element: <AuthTabs /> }] },
  { element: <ProtectedRoute />, children: [{ path: '/', element: <Chat /> }] },
])
