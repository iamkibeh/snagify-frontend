/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Option, Select } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { api } from '../api/axios'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ApplicationForm = ({
  closeModal,
  applicationId = null,
  onUpdateSuccess = () => {},
  onCreateSuccess = () => {},
}) => {
  const font = Quill.import('formats/font')
  font.whitelist = ['sans-serif', 'serif', 'monospace', 'Josefin Sans', 'inter']
  Quill.register(font, true)
  const [applicationData, setApplicationData] = useState({})
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: applicationData,
  })
  useEffect(() => {
    // Fetch application data
    if (applicationId === null) return
    api
      .get(`/applications/${applicationId}`)
      .then((res) => {
        setApplicationData(res.data)
        // Reset form with fetched data
        reset(res.data)
      })
      .catch((err) => {
        console.error(err.response.data)
      })
  }, [applicationId, reset])

  const onSubmit = (data) => {
    const apiCall = applicationId
      ? api.put(`/applications/${applicationId}`, data)
      : api.post('/applications', data)

    apiCall
      .then((res) => {
        closeModal()
        applicationId ? onUpdateSuccess(res.data) : onCreateSuccess(res.data)
        //   alert success
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
  return (
    <>
      <div
        className='inset-0 bg-black opacity-75 flex items-center justify-center h-[100vh] absolute'
        onClick={() => closeModal()}
      ></div>
      <div className='bg-white p-8 rounded-xl shadow-md w-[60%] max-w-4xl min-w-[300px] h-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto z-50'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>
            {applicationId ? 'Edit Job Application' : 'Add New Job Application'}
          </h2>
          <XMarkIcon
            className='w-5 h-5 bg-gray-400 cursor-pointer rounded-full p-1'
            onClick={() => closeModal()}
          />
        </div>
        <hr className='my-4 border' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='sm:flex justify-between gap-4'>
            <div className='mb-4 flex-1'>
              <label htmlFor='name' className='block font-bold mb-2'>
                Job Title
              </label>
              <input
                type='text'
                id='job-title'
                name='jobTitle'
                className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
                {...register('jobTitle', { required: true })}
              />
              {errors.jobTitle && (
                <p className='text-red-500 text-sm'>This field is required</p>
              )}
            </div>
            <div className='mb-4 flex-1'>
              <label htmlFor='company' className='block font-bold mb-2'>
                Company Name
              </label>
              <input
                type='text'
                id='companyName'
                name='companyName'
                className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
                {...register('companyName', { required: true })}
              />
              {errors.companyName && (
                <p className='text-red-500 text-sm'>This field is required</p>
              )}
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
                name='source'
                {...register('source', { required: true })}
              />
              {errors.source && (
                <p className='text-red-500 text-sm'>This field is required</p>
              )}
            </div>
            <div className='flex-1 flex flex-col '>
              <label htmlFor='location' className='block font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
                name='location'
                {...register('location')}
              />
            </div>
          </section>

          <div className='mb-4'>
            {/* make this field required */}
            <Controller
              control={control}
              name='applicationStage'
              defaultValue='APPLIED'
              render={({ field }) => (
                <Select
                  variant='standard'
                  label='Application Stage'
                  labelProps={{
                    className: 'text-gray-900 font-bold',
                  }}
                  {...field}
                  defaultValue={'APPLIED'}
                >
                  <Option value='APPLIED'>Applied</Option>
                  <Option value='SCREENING'>Screening</Option>
                  <Option value='INTERVIEW'>Interview</Option>
                  <Option value='REJECTED'>Rejected</Option>
                  <Option value='ACCEPTED'>Accepted</Option>
                </Select>
              )}
            />
            {errors.applicationStage && (
              <p className='text-red-500 text-sm'>This field is required</p>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='date' className='block font-bold mb-2'>
              Application Date
            </label>
            <input
              type='date'
              id='date'
              className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
              name='applicationDate'
              {...register('applicationDate', { required: true })}
            />
            {errors.applicationDate && (
              <p className='text-red-500 text-sm'>This field is required</p>
            )}
          </div>

          <div className='mb-4'>
            <label htmlFor='jobDescription' className='block font-bold mb-2'>
              Job Description
            </label>
            {/* <textarea
              id='jobDescription'
              className='shadow border border-gray-300 rounded w-full px-3 py-2 text-gray-700 focus:outline-secondary focus:shadow-outline'
              name='jobDescription'
              {...register('jobDescription')}
              placeholder='Enter job description here...'
            ></textarea> */}

            <Controller
              name='jobDescription'
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  theme='snow'
                  onChange={(content, delta, source, editor) =>
                    field.onChange(editor.getHTML())
                  }
                  placeholder='Enter job description here...'
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                    //   ['clean'],
                      [
                        {
                          font: [
                            // 'sans-serif',
                            'serif',
                            'inter',
                            'monospace',
                            'Josefin Sans',
                          ],
                        },
                      ],
                    ],
                  }}
                />
              )}
            />
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
