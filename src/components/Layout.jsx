import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from '../reusables/Loader'
import useLoading from '../hooks/useLoading'

function Layout() {
  const { isLoading } = useLoading()
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl m-auto text-sm min-h-[75vh]'>
        {isLoading ? <Loader /> : <Outlet />}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
