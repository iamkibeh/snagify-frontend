import { useContext } from 'react'
import AlertContext from '../context/AlertContext'

const useAlert = () => {
  const alertContext = useContext(AlertContext)
  if (!alertContext) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return alertContext
}

export default useAlert
