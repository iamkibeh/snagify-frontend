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
import ServerErrorPage from '../pages/ServerErrorPage'
import ApplicationSearch from '../pages/ApplicationSearch'

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
        path: '/applications/search', // Add this route for search
        element: (
          <ProtectedRoute>
            <ApplicationSearch />
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
      {
        path: '/*',
        element: <ErrorPage />,
      },
      {
        path: '/server-error',
        element: <ServerErrorPage />,
      },
    ],
  },
])
