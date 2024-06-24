import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const alertTypes = {
  success: {
    icon: <CheckCircleIcon className='h-5 w-5 text-green-400' />,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-400',
  },
  error: {
    icon: <XCircleIcon className='h-5 w-5 text-red-400' />,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-400',
  },
  warning: {
    icon: <ExclamationCircleIcon className='h-5 w-5 text-yellow-400' />,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-400',
  },
  info: {
    icon: <InformationCircleIcon className='h-5 w-5 text-blue-400' />,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-400',
  },
}

const Alert = ({ type, message, onClose, duration }) => {
  const { icon, bgColor, textColor, borderColor } = alertTypes[type]

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div className={`rounded-md p-4 ${bgColor} border-l-4 ${borderColor} mb-4`}>
      <div className='flex'>
        <div className='flex-shrink-0'>{icon}</div>
        <div className='ml-3'>
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        {onClose && (
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                type='button'
                className={`${textColor} inline-flex bg-${bgColor} rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${bgColor} focus:ring-${textColor}`}
                onClick={onClose}
              >
                <span className='sr-only'>Dismiss</span>
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
}

Alert.defaultProps = {
  duration: 3000, // default duration of 3 seconds
}

export default Alert
