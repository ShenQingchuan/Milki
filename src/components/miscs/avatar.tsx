import type { FC } from 'react'
import type { IUserSchema } from '../../../server/src/schemas'

interface MilkiAvatarProps {
  user: IUserSchema | undefined
}

export const MilkiAvatar: FC<MilkiAvatarProps> = ({ user }) => {
  if (!user) {
    return null
  }

  const { name, avatarUrl } = user

  return (
    <div className='flex items-center ml-auto'>
      <div className='avatar online placeholder cursor-pointer'>
        {
          avatarUrl
            ? <img src={avatarUrl} alt='avatar' />
            : (
                <div className='bg-neutral-focus text-neutral-content rounded-full w-10'>
                  <span className='select-none text-base'>
                    {name[0].toLocaleUpperCase()}
                  </span>
                </div>
              )
        }
      </div>
    </div>
  )
}
