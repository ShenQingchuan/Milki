import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { CommonHeader } from '../components/common-header'
import { HomeSideBar } from '../components/home-page/home-sidebar'

export const HomePage: FC = () => {
  return (
    <div className='flex flex-col h-full'>
      <CommonHeader />

      <div className='flex items-center flex-1'>
        <HomeSideBar />
        <Outlet />
      </div>
    </div>
  )
}
