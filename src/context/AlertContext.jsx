/* eslint-disable react/prop-types */
import { createContext, useState, useCallback } from 'react'
import Alert from '../reusables/Alert'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])

  const addAlert = useCallback((type, message, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9)
    setAlerts((prevAlerts) => [...prevAlerts, { id, type, message, duration }])
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
    }, duration)
  }, [])

  const alert = {
    success: (message, duration) => addAlert('success', message, duration),
    error: (message, duration) => addAlert('error', message, duration),
    info: (message, duration) => addAlert('info', message, duration),
    warning: (message, duration) => addAlert('warning', message, duration),
  }

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
  }

  return (
    <AlertContext.Provider value={alert}>
      <div className='fixed top-0 right-0 z-50 p-4'>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
            duration={alert.duration}
          />
        ))}
      </div>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext