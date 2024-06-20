/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Option, Select } from '@material-tailwind/react'
import { useEffect } from 'react'

const ApplicationForm = ({ closeModal, applicationId }) => {
  useEffect(() => {
    console.log(applicationId)
  }, [applicationId])

  return (
    <>
      <div
        className='fixed inset-0 bg-black opacity-75 flex items-center justify-center'
        onClick={() => closeModal()}
      ></div>
      <div className='bg-white p-8 rounded-xl shadow-md w-[60%] max-w-4xl min-w-[300px] h-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Add New Job Application</h2>
          <XMarkIcon
            className='w-5 h-5 bg-gray-400 cursor-pointer rounded-full p-1'
            onClick={() => closeModal()}
          />
        </div>
        <hr className='my-4 border' />
        <form>
          <section className='sm:flex justify-between gap-4'>
            <div className='mb-4 flex-1'>
              <label htmlFor='name' className='block font-bold mb-2'>
                Job Title
              </label>
              <input
                type='text'
                id='job-title'
                className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
                required
              />
            </div>
            <div className='mb-4 flex-1'>
              <label htmlFor='company' className='block font-bold mb-2'>
                Company Name
              </label>
              <input
                type='text'
                id='company'
                className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
                required
              />
            </div>
          </section>

          <section className='sm:flex justify-between gap-4'>
            <div className='mb-4 flex-1'>
              <label htmlFor='source' className='block font-bold mb-2'>
                Source
              </label>
              <input
                type='text'
                id='source'
                className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
                required
              />
            </div>
            <div className='flex-1 flex flex-col '>
              <label htmlFor='location' className='block font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
              />
            </div>
          </section>

          <div className='mb-4'>
            <Select
              variant='standard'
              label='Application Stage'
              labelProps={{
                className: 'text-gray-900 font-bold',
              }}
            >
              <Option value='applied' defaultChecked={true}>
                Applied
              </Option>
              <Option value='screening'>Screening</Option>
              <Option value='interview'>Interview</Option>
              <Option value='rejected'>Rejected</Option>
              <Option value='accepted'>Accepted</Option>
            </Select>
          </div>
          <div className='mb-4'>
            <label htmlFor='date' className='block font-bold mb-2'>
              Application Date
            </label>
            <input
              type='date'
              id='date'
              className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='notes' className='block font-bold mb-2'>
              Notes
            </label>
            <textarea
              id='notes'
              className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
            ></textarea>
          </div>
          <section className='flex justify-between items-center'>
            <button
              type='reset'
            className='flex px-8 py-2 rounded-md transition-colors duration-300 items-center bg-transparent hover:!bg-red-300 hover:!text-white'
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button type='submit' className='flex !px-8 items-center button-8'>
              Submit
            </button>
          </section>
        </form>
      </div>
    </>
  )
}

export default ApplicationForm
