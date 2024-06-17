import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../components/Layout'
import ErrorPage from '../pages/ErrorPage'
import Applications from '../pages/Applications'
import ApplicationDetails from '../pages/ApplicationDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

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
      {
        path: '/login',
        element: <Login />,
      },{
        path: '/register',
        element: <Signup />,
      }
    ],
  },
])
