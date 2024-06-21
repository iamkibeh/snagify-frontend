import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router'
import { JobApplicationProvider } from './context/JobApplicationProvider'
import NavigationProvider from './context/NavigationProvider'

function App() {
  return (
    <>
      <JobApplicationProvider>
        <RouterProvider router={router}>
          <NavigationProvider />
        </RouterProvider>
      </JobApplicationProvider>
    </>
  )
}

export default App
