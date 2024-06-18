import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth()
  const location = useLocation()
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
