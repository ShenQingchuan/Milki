import type { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserInfo } from '../../../hooks/use-user-info'

interface MilkiAvatarProps {
  // ...
}

export const MilkiAvatar: FC<MilkiAvatarProps> = () => {
  const { user, isLoading, isError } = useUserInfo()

  if (isLoading) {
    return (
      <div className='flex items-center'>
        <span className="loading loading-ring w-10" />
      </div>
    )
  }

  if (!user || isError) {
    return <Navigate to='/login?action=redirect' />
  }

  const { avatarUrl, name } = user

  return (
    <div className='flex items-center'>
      <div className='avatar online placeholder cursor-pointer'>
        <div className='bg-neutral-focus text-neutral-content rounded-full w-10'>
          {
            avatarUrl
              ? <img className='w-10 rounded-full' src={avatarUrl} alt='avatar' />
              : (
                  <span className='select-none text-base'>
                    {name[0].toLocaleUpperCase()}
                  </span>
                )
          }
        </div>
      </div>
    </div>
  )
}
