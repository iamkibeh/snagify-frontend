import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

function ApplicationDetails() {
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  return (
    <section className='container p-4'>
      <div
        className='flex items-center mb-4 cursor-pointer group'
        onClick={navigateBack}
      >
        <ArrowLeftIcon className='w-6 h-6 cursor-pointer mr-4 group-hover:-translate-x-4 transition-all' />
        <p>See all applications</p>
      </div>
      <div className='flex justify-between'>
        <button className='text-white bg-primary rounded-xl rounded-bl-none px-4 py-2'>
          You applied to:
        </button>
        <button className='bg-transparent outline-1 outline-primary text-gray-900 font-semibold px-4 py-2 border-primary border'>
          Company Name
        </button>
      </div>
      <hr className='mt-4 border-2 border-gray-500' />

      <div className='my-4'>
        <div className=''>
          <p className='font-semibold text-2xl capitalize'>
            Senior software Engineer
          </p>
          <p className='text-xs'>Nairobi - Kenya</p>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <DocumentTextIcon className='w-8 h-8' />
          <p className='text-gray- text-sm font-bold'>
            <span className='text-gray-500 font-semibold'>Current Stage:</span>
            <br />
            Pending
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <CalendarDaysIcon className='w-8 h-8' />
            <p className='text-gray- text-sm font-bold'>
              <span className='text-gray-500 font-semibold'>
                Application Date:
              </span>
              <br />
              12/12/2020
            </p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <QuestionMarkCircleIcon className='w-8 h-8' />
            <p className='text-gray- text-sm font-bold'>
              <span className='text-gray-500 font-semibold'>Source:</span>
              <br />
              LinkedIn
            </p>
          </div>
        </div>
      </div>

      {/* job description section - as additional notes */}

      <div className='my-8'>
        {/* <h2 className='font-semibold text-2xl capitalize'>Notes</h2> */}
        <p className='font-bold text-lg'>What we are looking for</p>
        <div className='mt-4'>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ul className='list-disc pl-4'>
            <li className=''>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </li>
            <li className=''>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ApplicationDetails
