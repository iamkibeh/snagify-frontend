import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { axiosPrivate } from '../api/axios'

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState(null)
//   useEffect(() => {
//     console.log('In auth prov --before ' + JSON.stringify(auth))
//     // Check if the user is already logged in from a previous session
//     axiosPrivate
//       .get('/users/me')
//       .then((res) => {
//         console.log(res)
//         setAuth(res.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })

//     console.log('In auth prov --after ' + JSON.stringify(auth))

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

  const login = (user) => {
    setLoading(true)
    setError(false)
    setSuccess(false)
    setMessage(null)
    axiosPrivate
      .post('/auth/login', user)
      .then((res) => {
        setAuth(res.data)
        setLoading(false)
        setSuccess(true)
        setMessage('Login successful')
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setError(true)
        setMessage(err.response.data.description)
      })
  }

  const logout = () => {
    setAuth({})
    // Reset all states on logout
    setLoading(false)
    setError(false)
    setSuccess(false)
    setMessage(null)
  }
  const register = (user) => {
    axiosPrivate
      .post('/auth/register', user)
      .then((res) => {
        setAuth(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // is authenticated, is a call to check if the user is authenticated
  const isAuthenticated = () => {
    return auth?.access_token
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        register,
        loading,
        error,
        success,
        message,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
