import { NavLink } from "react-router-dom"

function Footer() {
  return (
    <>
      {/* create the footer for this application */}
      <footer className='bg-accent py-8 px-4 mt-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold'>Snagify</h1>
            <p className='mt-1'>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div>
            <NavLink to='/terms'  className='hover:underline underline-offset-4'>
              Terms of Service
            </NavLink>
            <span className='mx-2'>|</span>
            <NavLink to='/privacy' className='hover:underline underline-offset-4'>
              Privacy Policy
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
