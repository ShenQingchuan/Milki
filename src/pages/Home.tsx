import { type FC } from 'react'
import { HomeHeader } from '../components/home-header'
import { HomeSideBar } from '../components/home-sidebar'

export const HomePage: FC = () => {
  return (
    <div className='flex flex-col h-full'>
      <HomeHeader />

      <div className='flex items-center flex-1'>
        <HomeSideBar />
        {/* Workbench view */}
      </div>
    </div>
  )
}
