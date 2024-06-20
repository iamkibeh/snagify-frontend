import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const JobApplicationContext = createContext(undefined)
export const JobApplicationProvider = ({ children }) => {
  const [jobApplications, setJobApplications] = useState([])

  return (
    <JobApplicationContext.Provider
      value={{ jobApplications, setJobApplications }}
    >
      {children}
    </JobApplicationContext.Provider>
  )
}

export default JobApplicationContext

JobApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
