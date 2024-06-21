import { useNavigate } from 'react-router-dom'
import JobHuntSvg from '../components/JobHuntSvg'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='p-4 flex'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold mb-4'>Welcome to Job Tracker!</h1>
          <p className='mb-4'>
            Our application helps you keep track of all the jobs you&apos;ve
            applied to in one place. Never lose track of your applications
            again!
          </p>
          <p className='mb-4'>
            To get started, simply sign up or log in and start adding your job
            applications.
          </p>
          <button
            className='bg-primary text-white px-4 py-2 rounded'
            onClick={() =>
              navigate('/login', {
                replace: true,
              })
            }
          >
            Get Started
          </button>
        </div>
        <div className='flex-1'>
          <JobHuntSvg />
        </div>
      </div>
    </>
  )
}

export default HomePage
