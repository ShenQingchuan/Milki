import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { HomeHeader } from '../components/home-page/home-header'
import { HomeSideBar } from '../components/home-page/home-sidebar'

export const HomePage: FC = () => {
  return (
    <div className='flex flex-col h-full'>
      <HomeHeader />

      <div className='flex items-center flex-1'>
        <HomeSideBar />
        <Outlet />
      </div>
    </div>
  )
}
