import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl m-auto text-sm'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
