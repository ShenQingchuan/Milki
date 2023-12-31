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
import { useIsDark } from '../hooks'
import { EditorPage } from '../pages/editor'
import { MyRecentDocs } from '../components/home-page/home-workbench/recent-docs'
import { DocView } from '../pages/doc-view'

export function MainLayout() {
  const isDarkMode = useIsDark()

  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' errorElement={<ErrorPage />} element={<ExcludeAuthGuardedRoute render={<LoginPage />} />} />
          <Route path='/sign-up' errorElement={<ErrorPage />} element={<ExcludeAuthGuardedRoute render={<SignUpPage />} />} />
          <Route path='/edit' errorElement={<ErrorPage />} element={<AuthGuardedRoute render={<EditorPage />} />} />
          <Route
            path='/'
            errorElement={<ErrorPage />}
            element={<AuthGuardedRoute render={<HomePage />} />}
          >
            <Route index element={<MyRecentDocs />} />
          </Route>
          <Route
            path='/doc'
            errorElement={<ErrorPage />}
            element={<AuthGuardedRoute render={<DocView />} />}
          />
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
