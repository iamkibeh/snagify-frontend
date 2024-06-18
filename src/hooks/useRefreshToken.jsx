import useAuth from './useAuth'
import axios from '../api/axios'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refreshToken = async () => {
    try {
      const response = await axios.get('/auth/refresh-token', {
        withCredentials: true,
      })

      setAuth((prev) => {
        console.log(JSON.stringify(prev))
        console.log(JSON.stringify(response.data.access_token))
        return {
          ...prev,
          access_token: response.data.access_token,
        }
      })
      return response.data.access_token
    } catch (error) {
      console.log('This is the eror in refresh token ' + error)
      if (error.response && error.response.status === 401) {
        setAuth((prev) => {
          return {
            ...prev,
            access_token: null,
          }
        })
      }
    }
  }
  return refreshToken
}

export default useRefreshToken
