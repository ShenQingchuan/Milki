import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from '../router'

export function MainLayout() {
  return (
    <div className='w-screen h-screen'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}
