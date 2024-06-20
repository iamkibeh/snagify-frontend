import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { register, loading, error, message } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your signup logic here
    register(userInfo)
    setUserInfo({
      name: '',
      email: '',
      password: '',
    })
    navigate("/login")
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign up for an account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 '
          onSubmit={handleSubmit}
        >
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Name
            </label>
            <div className='mt-2'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline'
                id='name'
                name='name'
                type='text'
                placeholder='Enter your name'
                value={userInfo.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline'
                id='email'
                name='email'
                type='email'
                placeholder='Enter your email'
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Password
            </label>
            <div className='mt-2'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline'
                name='password'
                id='password'
                type='password'
                placeholder='Enter your password'
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {error ? (
            typeof message === 'object' ? (
              message.map((message, ind) => (
                <div className='text-red-500 text-center' key={ind}>
                  {message.detail}
                </div>
              ))
            ) : (
              <div className='text-red-500 text-center'>
                {message}
              </div>
            )
          ) : null}
          <div className='flex items-center justify-between'>
            {loading ? (
              <button
                className='bg-primary text-white px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline w-full'
                type='submit'
                disabled
              >
                Loading...
              </button>
            ) : (
              <button
                className='bg-primary text-white px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline w-full'
                type='submit'
              >
                Sign Up
              </button>
            )}
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Have an account?{' '}
          <NavLink to={'/login'} className='text-primary font-bold'>
            Login
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Signup
