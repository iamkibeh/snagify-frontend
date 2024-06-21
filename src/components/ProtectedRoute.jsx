import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import Loader from '../reusables/Loader'

const ProtectedRoute = ({ children }) => {
  const { auth, setAuth } = useAuth()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (auth?.access_token) {
        setLoading(false)
        return
      }
      try {
        const res = await api.get('/users/me')
        setAuth((prev) => ({ ...prev, user: res.data }))
      } catch (err) {
        console.error(err)
        setAuth(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (loading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return auth?.user ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
