import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/axios'
import Loader from '../reusables/Loader'
import NoDataComponent from '../components/NoDataComponent'
import DOMPurify from 'dompurify'
import '../assets/css/jobDescription.css'

function ApplicationDetails() {
  const navigate = useNavigate()
  const [jobApplication, setJobApplication] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const navigateBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    api
      .get(`/applications/${params.id}`)
      .then((res) => {
        setJobApplication(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [params.id])

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className='sm:container p-4 mx-auto'>
      <div
        className='flex items-center mb-4 cursor-pointer group'
        onClick={navigateBack}
      >
        <ArrowLeftIcon className='w-6 h-6 cursor-pointer mr-4 group-hover:-translate-x-4 transition-all' />
        <p>See all applications</p>
      </div>
      <div className='flex justify-between'>
        <button className='text-white bg-primary rounded-xl rounded-bl-none px-4 py-2'>
          You applied to:
        </button>
        <button className='bg-transparent outline-1 outline-primary text-gray-900 font-semibold px-4 py-2 border-primary border'>
          {jobApplication?.companyName}
        </button>
      </div>
      <hr className='mt-4 border-2 border-gray-500' />

      <div className='my-4'>
        <div className=''>
          <p className='font-semibold text-2xl capitalize'>
            {/* Senior software Engineer */}
            {jobApplication?.jobTitle}
          </p>
          <p className='text-xs'>
            {/* Nairobi - Kenya */}
            {jobApplication?.location}
          </p>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <DocumentTextIcon className='w-8 h-8' />
          <p className='text-gray- text-sm font-bold'>
            <span className='text-gray-500 font-semibold'>Current Stage:</span>
            <br />
            {jobApplication?.applicationStage}
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <CalendarDaysIcon className='w-8 h-8' />
            <p className='text-gray- text-sm font-bold'>
              <span className='text-gray-500 font-semibold'>
                Application Date:
              </span>
              <br />
              {jobApplication?.formattedApplicationDate}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <QuestionMarkCircleIcon className='w-8 h-8' />
            <p className='text-gray- text-sm font-bold'>
              <span className='text-gray-500 font-semibold'>Source:</span>
              <br />
              {jobApplication?.source}
            </p>
          </div>
        </div>
      </div>

      {/* job description section - as additional notes */}

      <div className='my-8'>
        {jobApplication?.jobDescription ? (
          <>
            <p className='font-bold text-lg mb-8'>Job Description</p>
            <section
              className='job-description-container'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobApplication.jobDescription),
              }}
            ></section>
          </>
        ) : (
          <NoDataComponent header={'Job Description unavailable'} />
        )}
      </div>
    </section>
  )
}

export default ApplicationDetails
