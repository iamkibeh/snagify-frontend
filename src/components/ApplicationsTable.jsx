import { useNavigate } from 'react-router-dom'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import JobApplicationContext from '../context/JobApplicationProvider'
import { useContext, useState } from 'react'
import ApplicationForm from '../reusables/ApplicationForm'
import NoDataComponent from './NoDataComponent'
import DeleteConfirmationModal from '../reusables/DeleteConfirmationModal'
import ApplicationRecordRow from '../reusables/ApplicationRecordRow'

const TABLE_HEAD = [
  'Company Name',
  'Job Title',
  'Location',
  'Application Date',
  'Current Stage',
  'Source',
  'Actions',
]

const ApplicationsTable = () => {
  // const [applications, setApplications] = useState(applications)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [rowsPerPage, setRowsPerPage] = useState(10)
  // const [rows, setRows] = useState([])
  // const [totalPages, setTotalPages] = useState(0)
  // const [totalRows, setTotalRows] = useState(0)
  // const [search, setSearch] = useState('')
  // const [searchResults, setSearchResults] = useState([])

  const navigate = useNavigate()
  const { jobApplications, setJobApplications } = useContext(
    JobApplicationContext
  )
  const [jobApplicationModalOpen, setJobApplicationModalOpen] = useState(false)
  const [applicationId, setApplicationId] = useState(null)
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)

  const handleJobApplicationModalOpen = (id) => {
    setJobApplicationModalOpen(true)
    setApplicationId(id)
  }

  const handleJobApplicationModalClose = () => {
    setJobApplicationModalOpen(false)
  }


  const handleDelete = (id) => {
    setApplicationId(id);
    setIsDeleteConfirmationModalOpen(true)
  }

  const handleEdit = (id) => {
    console.log(id)
    handleJobApplicationModalOpen(id)
  }

  const handleRowClick = (id) => {
    navigate('/applications/' + id)
  }

  const handleUpdateApplication = (updatedApplication) => {
    const updatedApplications = jobApplications.map((application) =>
      application.id === updatedApplication.id
        ? updatedApplication
        : application
    )
    setJobApplications(updatedApplications)
  }

  if (jobApplications.length > 0) {
    return (
      <>
        <div>
          <section className='h-full w-full overflow-x-auto rounded-xl'>
            <table className='w-full min-w-max table-auto text-left'>
              <thead>
                <tr className='border-b border-blue-gray-200 bg-gray-300'>
                  {TABLE_HEAD.map((head, index) => (
                    <th key={index} className='p-4'>
                      <p className='font-normal leading-none opacity-70'>
                        {head}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {jobApplications.map((application) => (
                  <ApplicationRecordRow
                    key={application.id}
                    {...application}
                    handleRowClick={handleRowClick}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    setIsDeleteConfirmationModalOpen={
                      setIsDeleteConfirmationModalOpen
                    }
                  />
                ))}
              </tbody>
            </table>
          </section>

          {/* Pagination Section */}
          <section className='mt-6'>
            <div className='flex justify-end items-center gap-3'>
              <div className='flex gap-2 items-center'>
                <p className='text-gray-500 text-xs'>Rows per page: </p>
                <div className='flex gap-2'>
                  <select className='border-none bg-gray-100 rounded-md px-2 py-1 focus:outline-none outline-none cursor-pointer'>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                  </select>
                </div>
              </div>
              <div className=''>
                <p>
                  <span className='text-gray-500 text-xs'>
                    Showing 1-10 of 100 entries
                  </span>
                </p>
              </div>
              <div className='flex gap-2 items-center'>
                {/* 4 arrows - first page, last page, next and previous pages */}
                <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
                  <ChevronDoubleLeftIcon className='w-4 h-4 text-primary' />
                </div>

                <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
                  <ChevronLeftIcon className='w-4 h-4 text-primary ' />
                </div>
                <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
                  <ChevronRightIcon className='w-4 h-4 text-primary cursor-pointer' />
                </div>
                <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
                  <ChevronDoubleRightIcon className='w-4 h-4 text-primary cursor-pointer' />
                </div>
              </div>
            </div>
          </section>
        </div>
        {jobApplicationModalOpen && (
          <ApplicationForm
            applicationId={applicationId}
            closeModal={handleJobApplicationModalClose}
            onUpdateSuccess={handleUpdateApplication}
          />
        )}
        {isDeleteConfirmationModalOpen && (
          <DeleteConfirmationModal
            applicationId = {applicationId}
            onClose={() => setIsDeleteConfirmationModalOpen(false)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <NoDataComponent
        header='No Applications Found'
        subHeader='There are currently no job applications to display.'
      />
    </>
  )
}

export default ApplicationsTable
