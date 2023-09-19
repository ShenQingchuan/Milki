import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Home } from '../pages/Home'
import { ErrorPage } from '../pages/ErrorPage'
import AuthGuardedRoute from '../components/miscs/auth-guarded-route'

export function MainLayout() {
  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            errorElement={<ErrorPage />}
            element={
              <AuthGuardedRoute
                render={<Home />}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}
