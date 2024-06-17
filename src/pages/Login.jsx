import { useState } from 'react';
import { NavLink } from 'react-router-dom'

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
      });

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
        setCredentials({
            email: '',
            password: '',
        });
    };

  return (
    <div>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  space-y-6'
            method='POST'
            action='#'
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline'
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a href='#' className='font-semibold text-primary'>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline'
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='bg-primary text-white px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline w-full'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Not a member?{' '}
            <NavLink to={'/register'} className='text-primary font-bold'>
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}