import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { api } from '../api/axios'
import { useAuthNavigate } from '../hooks/useAuthNavigate'

const AuthContext = createContext(undefined)
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access_token: '',
    user: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState(null)

  const navigate = useAuthNavigate()
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await api.get('/users/me')
        setAuth((prev) => ({ ...prev, user: res.data }))
      } catch (err) {
        setAuth(null)
      }
    }
    fetchLoggedInUser()
  }, [])

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && auth?.access_token
          ? `Bearer ${auth.access_token}`
          : config.headers.Authorization
      return config
    })
    return () => api.interceptors.request.eject(authInterceptor)
  }, [auth])

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (
          (error?.response?.status === 401 || error?.response?.status === 403) &&
          originalRequest.url !== '/auth/refresh-token'
        ) {
          try {
            const res = await api.get('/auth/refresh-token')

            setAuth((prev) => ({
              ...prev,
              access_token: res.data.access_token,
            }))

            originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`
            originalRequest._retry = true
            return api(originalRequest)
          } catch (err) {
            setAuth(null)
          }
        }
        // redirect users to login if we get response from backend that refresh token has expired
        if (
          window.location.pathname !== '/login' &&
          error.response.status === 401 &&
          error.response?.data?.message &&
          error.response?.data?.message
            .toLowerCase()
            .includes('refresh token expired')
        ) {
          // log message
          setAuth(null)
          // window.location.href = '/login?message=expired'
          navigate('/login?message=expired', { replace: true })
          return Promise.reject(error)
        }
        return Promise.reject(error)
      }
    )
    return () => api.interceptors.response.eject(refreshInterceptor)
  }, [])

  const login = (user) => {
    setLoading(true)
    setError(false)
    setSuccess(false)
    setMessage(null)
    api
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
    setAuth(null)
    // Reset all states on logout
    setLoading(false)
    setError(false)
    setSuccess(false)
    setMessage(null)
  }
  const register = (user) => {
    setLoading(true)
    setError(false)
    setSuccess(false)
    api
      .post('/auth/register', user)
      .then((res) => {
        setAuth(res.data)
        setLoading(false)
        setSuccess(true)
      })
      .catch((err) => {
        console.log({err})
        setLoading(false)
        setError(true)
        err?.response?.data?.type === 'VALIDATION' ?
        setMessage(err.response.data.errors) 
        : setMessage(err.response.data.description)
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
