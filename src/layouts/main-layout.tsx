import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HomePage } from '../pages/home'
import { ErrorPage } from '../pages/error-page'
import AuthGuardedRoute from '../components/miscs/auth-guarded-route'
import { SignUpPage } from '../pages/sign-up'
import { LoginPage } from '../pages/login'
import { useDarkMode } from '../hooks'

export function MainLayout() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' errorElement={<ErrorPage />} element={<AuthGuardedRoute render={<HomePage />} />} />
          <Route path='/login' errorElement={<ErrorPage />} element={<LoginPage />} />
          <Route path='/sign-up' errorElement={<ErrorPage />} element={<SignUpPage />} />
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
