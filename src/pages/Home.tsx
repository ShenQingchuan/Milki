import { MilkiAvatar } from '../components/miscs/avatar'
import { useUserInfo } from '../hooks/use-user-info'

export function HomePage() {
  const { user, isLoading } = useUserInfo()

  if (isLoading) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <span className="loading loading-ring loading-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='
        flex items-center
        px-4 py-2 w-screen shadow-xl
      '>
        <a
          className='ml-2 font-bold font-mono text-xl select-none outline-none'
          href="/"
        >
          MILKI
        </a>

        <MilkiAvatar user={user} />
      </div>
    </div>
  )
}
