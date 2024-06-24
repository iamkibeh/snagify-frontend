// ServerErrorPage.jsx
import { useEffect, useState } from 'react'
import Loader from '../reusables/Loader'
import { useNavigate } from 'react-router-dom'

const ServerErrorPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleRetry = () => {
    // history.back()
    const from = localStorage.getItem('from')
    if (from) {
      navigate(from)
      localStorage.removeItem('from')
    } else {
      navigate('/')
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-md p-4 bg-white shadow-lg rounded-lg'>
        <h1 className='text-2xl font-bold text-red-500 mb-4'>Server Error</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className='mb-4'>
              We are experiencing some technical issues. Please try again later.
            </p>
            <button
              onClick={() => handleRetry()}
              className=' bg-primary button-8 text-white rounded'
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ServerErrorPage
