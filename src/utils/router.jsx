import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../components/Layout'
import ErrorPage from '../pages/ErrorPage'
import Applications from '../pages/Applications'
import ApplicationDetails from '../pages/ApplicationDetails'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/applications',
        element: <Applications />,
      },
      {
        path: '/applications/:id',
        element: <ApplicationDetails />,
      },
    ],
  },
])
