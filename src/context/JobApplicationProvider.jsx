import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { api } from '../api/axios'
import useAlert from '../hooks/useAlert'

const JobApplicationContext = createContext(undefined)
export const JobApplicationProvider = ({ children }) => {
  const [jobApplications, setJobApplications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)

  const [totalRecords, setTotalRecords] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isPageLast, setIsPageLast] = useState(false)

  const alert = useAlert()

  const fetchJobApplications = (page, size) => {
    setIsLoading(true)
    api
      .get(`/applications?currentUser=true&page=${page}&size=${size}`)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        setJobApplications(res.data.content)
        // setTotalRows(res.data.totalElements)
        setTotalPages(res.data.totalPages)
        setTotalRecords(res.data.totalRecords)
        if (res.data.last) setIsPageLast(true)
        else setIsPageLast(false)
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

  const createApplication = (newApplication) => {
    setIsLoading(true)
    api
      .post('/applications', newApplication)
      .then((res) => {
        const createdApplication = res.data

        const newTotalRecords = totalRecords + 1
        setTotalRecords(newTotalRecords)

        const newTotalPages = Math.ceil(newTotalRecords / rowsPerPage)
        setTotalPages(newTotalPages)

        if (
          currentPage === newTotalPages - 1 ||
          currentPage === totalPages - 1
        ) {
          const updatedJobApplications = [
            createdApplication,
            ...jobApplications,
          ]
          if (updatedJobApplications.length > rowsPerPage) {
            updatedJobApplications.pop() // Remove the last item to keep the rowsPerPage limit
            setIsPageLast(false)
          }
          setJobApplications(updatedJobApplications)
        }

        if (
          currentPage !== newTotalPages - 1 &&
          currentPage !== totalPages - 1
        ) {
          // If the current page isn't the last, we might need to update the current page
          fetchJobApplications(currentPage, rowsPerPage)
        } else {
          setJobApplications([createdApplication, ...jobApplications])
        }
        alert.success(
          `Application for ${res.data.companyName} created successfully!`,
          3500
        )
      })
      .catch((err) => {
        console.error(err)
        setIsError(true)
        setError(err)
        alert.error(err.response.data.description, 3500)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const updateApplication = (updatedApplication, id) => {
    setIsLoading(true)
    api
      .put(`/applications/${id}`, updatedApplication)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        const updatedJobApplications = jobApplications.map((jobApplication) =>
          jobApplication.id === id ? res.data : jobApplication
        )
        setJobApplications(updatedJobApplications)
        alert.success(
          `Application for ${res.data.companyName} updated successfully!`,
          3500
        )
      })
      .catch((err) => {
        console.log(err.response.data)
        alert.error(err.response.data.description, 3500)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const deleteApplication = (id) => {
    setIsLoading(true)
    api
      .delete(`/applications/${id}`)
      // eslint-disable-next-line no-unused-vars
      .then((_res) => {
        const updatedJobApplications = jobApplications.filter(
          (jobApplication) => jobApplication.id !== id
        )
        setJobApplications(updatedJobApplications)

        const newTotalRecords = totalRecords - 1
        setTotalRecords(newTotalRecords)

        const newTotalPages = Math.ceil(newTotalRecords / rowsPerPage)
        setTotalPages(newTotalPages)

        // Check if the current page is now empty after the deletion
        const newCurrentPage =
          currentPage > 0 && currentPage * rowsPerPage >= newTotalRecords
            ? currentPage - 1
            : currentPage
        setCurrentPage(newCurrentPage)

        // Refetch the applications to update the view
        fetchJobApplications(newCurrentPage, rowsPerPage)
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

  const searchApplications = (searchTerm) => {
    setIsLoading(true)
    api
      .get(`/applications/search`, {
        params: {
          query: searchTerm,
        },
      })
      .then((res) => {
        setJobApplications(res.data.content)
        setTotalPages(res.data.totalPages)
        setTotalRecords(res.data.totalRecords)
        if (res.data.last) setIsPageLast(true)
        else setIsPageLast(false)
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

  // pagination logic
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage)
    setCurrentPage(0) // reset to first page
  }

  return (
    <JobApplicationContext.Provider
      value={{
        jobApplications,
        setJobApplications,
        isLoading,
        isError,
        deleteApplication,
        fetchJobApplications,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        rowsPerPage,
        setRowsPerPage,
        handlePageChange,
        handleRowsPerPageChange,
        totalRecords,
        setTotalRecords,
        isPageLast,
        setIsPageLast,
        createApplication,
        updateApplication,
        searchApplications,
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
