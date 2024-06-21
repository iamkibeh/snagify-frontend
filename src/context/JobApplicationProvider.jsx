import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { api } from '../api/axios'

const JobApplicationContext = createContext(undefined)
export const JobApplicationProvider = ({ children }) => {
  const [jobApplications, setJobApplications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // const [totalRows, setTotalRows] = useState(0)
  // const [search, setSearch] = useState('')
  // const [searchResults, setSearchResults] = useState([])
  // const [currentPage, setCurrentPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(0)
  // const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    setIsLoading(true)
    api
      .get('/applications?currentUser=true')
      .then((res) => {
        setJobApplications(res.data)
        setIsSuccess(true)
      })
      .catch((err) => {
        console.error(err)
        setIsError(true)
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteApplication = (id) => {
    setIsLoading(true)
    api
     .delete(`/applications/${id}`)
     // eslint-disable-next-line no-unused-vars
     .then((_res) => {
        setJobApplications(jobApplications.filter((jobApplication) => jobApplication.id!== id))
      })
     .catch((err) => {
        console.error(err)
        setIsError(true)
        setError(error)
      })
     .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <JobApplicationContext.Provider
      value={{
        jobApplications,
        setJobApplications,
        isLoading,
        isError,
        isSuccess,
        deleteApplication
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  )
}

export default JobApplicationContext

JobApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
