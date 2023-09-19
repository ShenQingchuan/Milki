import { MilkiAvatar } from '../components/miscs/avatar'

export function HomePage() {
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

        <MilkiAvatar />
      </div>
    </div>
  )
}
