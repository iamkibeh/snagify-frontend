// import { useAuth } from '../hooks/useAuth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import Loader from '../reusables/Loader'

const RedirectIfAuthenticated = ({ children }) => {
  const { auth, setAuth } = useAuth()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (auth?.access_token) {
        setIsLoading(false)
        return
      }
      try {
        const res = await api.get('/users/me')
        setAuth((prev) => ({ ...prev, user: res.data }))
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          navigate('/server-error')
        }
        setAuth(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.access_token, setAuth])

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  // If the user is authenticated, redirect them to the homepage or the previous page
  if (auth?.access_token) {
    // Redirect to the homepage or a page specified in the state
    const redirectTo = location.state?.from || '/'
    return <Navigate to={redirectTo} replace />
  }

  // If not authenticated, render the children (Login component)
  return children
}

export default RedirectIfAuthenticated

RedirectIfAuthenticated.propTypes = {
  children: PropTypes.node.isRequired,
}
