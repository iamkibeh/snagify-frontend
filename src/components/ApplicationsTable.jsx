import { useLocation, useNavigate } from 'react-router-dom'
import JobApplicationContext from '../context/JobApplicationProvider'
import { useContext, useEffect, useState } from 'react'
import ApplicationForm from '../reusables/ApplicationForm'
import NoDataComponent from './NoDataComponent'
import DeleteConfirmationModal from '../reusables/DeleteConfirmationModal'
import ApplicationRecordRow from '../reusables/ApplicationRecordRow'
import Pagination from '../reusables/Pagination'
import Loader from '../reusables/Loader'

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
  const navigate = useNavigate()
  const location = useLocation()
  const {
    jobApplications,
    fetchJobApplications,
    isLoading,
    isError,
    currentPage,
    rowsPerPage,
    totalPages,
    handlePageChange,
    isPageLast,
    handleRowsPerPageChange,
    totalRecords,
    // searchApplications
  } = useContext(JobApplicationContext)
  const [jobApplicationModalOpen, setJobApplicationModalOpen] = useState(false)
  const [applicationId, setApplicationId] = useState(null)
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    if (query) {
      // searchApplications(query);
      return
    }
    fetchJobApplications(currentPage, rowsPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage])

  const handleJobApplicationModalOpen = (id) => {
    setJobApplicationModalOpen(true)
    setApplicationId(id)
  }

  const handleJobApplicationModalClose = () => {
    setJobApplicationModalOpen(false)
  }

  const handleDelete = (id) => {
    setApplicationId(id)
    setIsDeleteConfirmationModalOpen(true)
  }

  const handleEdit = (id) => {
    handleJobApplicationModalOpen(id)
  }

  const handleRowClick = (id) => {
    navigate('/applications/' + id)
  }

  if (jobApplications.length > 0) {
    return (
      <>
        <div>
          {isLoading ? (
            <div className='flex justify-center items-center h-full w-full'>
              <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary'></div>
            </div>
          ) : null}
          {isError ? (
            <div className='flex justify-center items-center h-full w-full'>
              <p className='text-red-500'>
                Failed to load job applications. Something went wrong.
              </p>
            </div>
          ) : null}
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
                {!isLoading &&
                  jobApplications.map((application) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            totalRecords={totalRecords}
            isPageLast={isPageLast}
          />
        </div>
        {jobApplicationModalOpen && (
          <ApplicationForm
            applicationId={applicationId}
            closeModal={handleJobApplicationModalClose}
          />
        )}
        {isDeleteConfirmationModalOpen && (
          <DeleteConfirmationModal
            applicationId={applicationId}
            onClose={() => setIsDeleteConfirmationModalOpen(false)}
          />
        )}
      </>
    )
  }

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <NoDataComponent
          header='No Applications Found'
          subHeader='There are currently no job applications to display.'
        />
      )}
    </>
  )
}

export default ApplicationsTable
