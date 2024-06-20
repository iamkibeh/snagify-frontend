import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useLoading } from '../context/LoadingProvider'
import Loader from '../reusables/Loader';

function Layout() {
  const {isLoading } = useLoading();
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl m-auto text-sm'>
        {isLoading && <Loader />}
        {!isLoading && <Outlet />}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
