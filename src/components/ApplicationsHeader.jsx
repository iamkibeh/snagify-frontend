import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'
import ApplicationForm from '../reusables/ApplicationForm'
import JobApplicationContext from '../context/JobApplicationProvider'
import { useNavigate } from 'react-router-dom'
function ApplicationsHeader() {
  const [jobApplicationModalOpen, setJobApplicationModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { searchApplications } = useContext(JobApplicationContext)
  const navigate = useNavigate()
  const closeJobApplicationModal = () => {
    setJobApplicationModalOpen(false)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    if (query) {
      setSearchQuery(query)
      searchApplications(query)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`/applications/search?query=${searchQuery}`)
    searchApplications(searchQuery)
  }
  return (
    <>
      <div className='flex py-4'>
        <section className='flex-grow'>
          <h1 className='text-lg font-medium text-primary'>Applications</h1>{' '}
        </section>
        <section className='flex justify-center items-center gap-3'>
          <div className='flex items-center'>
            <p>Filter By: &nbsp;</p>
            <AdjustmentsVerticalIcon className='w-4 h-4 cursor-pointer' />
          </div>
          <form onSubmit={handleSearchSubmit}>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search'
                className='border-none rounded-md px-2 py-1 focus:outline-none outline-none bg-gray-100 '
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {/* search icon positioned at end of input  */}
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <MagnifyingGlassIcon className='w-4 h-4' />
              </div>
            </div>
          </form>

          <button
            className='flex gap-1 justify-between items-center button-8'
            onClick={() => setJobApplicationModalOpen(true)}
          >
            <PlusIcon className='w-4 h-4' />
            <span>Add Application</span>
          </button>
        </section>
      </div>
      {jobApplicationModalOpen && (
        <ApplicationForm closeModal={closeJobApplicationModal} />
      )}
    </>
  )
}

export default ApplicationsHeader
