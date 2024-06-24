import { NavLink } from 'react-router-dom'
import pageNotFound from '/page_not_found.svg'

function ErrorPage() {
  // const error = useRouteError()
  return (
    <div className='container flex justify-center items-center flex-col m-auto'>
      <h1 className='uppercase font-bold text-4xl tracking-wider text-center m-auto text-red-900'>
        sorry
      </h1>
      <div className='my-8 flex items-center justify-center'>
        <img src={pageNotFound} alt='page not found' width={250} height={200} />
      </div>
      <p className='text-xl font-medium'>Oops, you&apos;ve lost in space.</p>
      <p>We can&apos;t find the page that you&apos;re looking for...</p>
      <div className="mt-4">
        <NavLink to='/'>
          <button className='button-8'>
            Go Home
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default ErrorPage
