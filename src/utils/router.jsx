import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../components/Layout'
import ErrorPage from '../pages/ErrorPage'
import Applications from '../pages/Applications'
import ApplicationDetails from '../pages/ApplicationDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ProtectedRoute from '../components/ProtectedRoute'
import RedirectIfAuthenticated from '../components/RedirectIfAuthenticated'

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
        element: (
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        ),
      },
      {
        path: '/applications/:id',
        element: (
          <ProtectedRoute>
            <ApplicationDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: '/register',
        element: <Signup />,
      },
    ],
  },
])
