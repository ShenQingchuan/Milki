import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HomePage } from '../pages/home'
import { ErrorPage } from '../pages/error-page'
import {
  AuthGuardedRoute,
  ExcludeAuthGuardedRoute,
} from '../components/miscs/auth-guarded-route'
import { SignUpPage } from '../pages/sign-up'
import { LoginPage } from '../pages/login'
import { useIsDark } from '../providers/dark-mode'

export function MainLayout() {
  const isDarkMode = useIsDark()

  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' errorElement={<ErrorPage />} element={<AuthGuardedRoute render={<HomePage />} />} />
          <Route path='/login' errorElement={<ErrorPage />} element={<ExcludeAuthGuardedRoute render={<LoginPage />} />} />
          <Route path='/sign-up' errorElement={<ErrorPage />} element={<ExcludeAuthGuardedRoute render={<SignUpPage />} />} />
        </Routes>
      </BrowserRouter>
      <Toaster toastOptions={{
        style: {
          paddingLeft: '18px',
          background: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#333',
        },
      }} />
    </div>
  )
}
