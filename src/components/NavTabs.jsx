import {
  BriefcaseIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

function NavTabs() {
  return (
    <>
      <div className='flex justify-center items-center gap-8 py-4 '>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 ${
              isActive ? 'text-gray-900' : 'text-gray-500'
            }`
          }
        >
          <HomeIcon className='w-5 h-5 cursor-pointer' />
          <p>Home</p>
        </NavLink>
        <NavLink
          to={'/applications'}
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 ${
              isActive ? 'text-gray-900' : 'text-gray-500'
            }`
          }
        >
          <BriefcaseIcon className='w-5 h-5 cursor-pointer' />
          <p>Applications</p>
        </NavLink>
        {/* change the pointer event once feature is ready */}
        <NavLink
          to={'/todos'}
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 pointer-events-none ${
              isActive ? 'text-gray-900' : 'text-gray-500'
            }`
          }
        >
          <ClipboardDocumentCheckIcon className='w-5 h-5 cursor-pointer' />
          <p>Todos</p>
        </NavLink>
      </div>
    </>
  )
}

export default NavTabs
