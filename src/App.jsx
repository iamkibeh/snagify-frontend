import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router'
import { JobApplicationProvider } from './context/JobApplicationProvider'

function App() {
  return (
    <>
      <JobApplicationProvider>
        <RouterProvider router={router} />
      </JobApplicationProvider>
    </>
  )
}

export default App
