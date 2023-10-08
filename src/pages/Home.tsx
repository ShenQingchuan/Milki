import { type FC } from 'react'
import { HomeHeader } from '../components/home-page/home-header'
import { HomeSideBar } from '../components/home-page/home-sidebar'
import { Workbench } from '../components/home-page/home-workbench'

export const HomePage: FC = () => {
  return (
    <div className='flex flex-col h-full'>
      <HomeHeader />

      <div className='flex items-center flex-1'>
        <HomeSideBar />
        <Workbench />
      </div>
    </div>
  )
}
