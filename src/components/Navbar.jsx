import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Avatar, Badge } from '@material-tailwind/react'
import NavTabs from './NavTabs'
import useAuth from '../hooks/useAuth'

function Navbar() {
  const { auth } = useAuth()
  return (
    <>
      <div className='p-4 flex justify-between shadow-custom 0px 1px 4px]'>
        <div className=''>
          <h1 className='font-semibold italic'>Snagify</h1>
          {/* logo here */}
        </div>
        <div className='flex justify-center items-center gap-2'>
          <Badge placement='top-end' className='w-1 h-1 min-h-1 min-w-1'>
            <BellIcon className='w-5 h-5  cursor-pointer' />
          </Badge>
          <div className=''>
            <Avatar
              src='https://docs.material-tailwind.com/img/face-2.jpg'
              alt='avatar'
              size='xs'
            />
          </div>
          <div className='flex justify-center items-center gap-1'>
            <p className='text-xs'>{auth?.user ? auth?.user?.name : 'Guest'}</p>
            <ChevronDownIcon className='w-3 h-3 cursor-pointer' />
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <NavTabs />

      <hr className='mb-3' />
    </>
  )
}

export default Navbar
