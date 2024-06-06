import { applications } from '../utils/constants'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

const TABLE_HEAD = [
  'Company Name',
  'Job Title',
  'Location',
  'Application Date',
  'Current Stage',
  'Source',
  'Actions',
]

const ApplicationsTable = () => {
  const handleDelete = (id) => {
    console.log(id)
  }

  const handleEdit = (id) => {
    console.log(id)
  }

  const handleRowClick = (id) => {
    console.log('The row with id: ' + id + ' is clicked')
  }

  return (
    <>
      <section className='h-full w-full overflow-x-auto rounded-xl'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr className='border-b border-blue-gray-200 bg-gray-300'>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className='p-4'>
                  <p className='font-normal leading-none opacity-70'>{head}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map(
              (
                {
                  companyName,
                  jobTitle,
                  applicationDate,
                  currentStage,
                  location,
                  source,
                },
                index
              ) => (
                <tr
                  key={index}
                  className='even:bg-gray-100 cursor-pointer hover:bg-gray-300 transition-colors duration-1000'
                  onClick={() => handleRowClick(index)}
                >
                  <td className='p-4'>
                    <p>{companyName}</p>
                  </td>
                  <td className='p-4'>
                    <p>{jobTitle}</p>
                  </td>
                  <td className='p-4'>
                    <p>{location}</p>
                  </td>
                  <td className='p-4'>
                    <p>{applicationDate}</p>
                  </td>
                  <td className='px-4'>
                    <p className='bg-accent  text-[10px] w-fit py-1 px-2 rounded-2xl '>
                      {' '}
                      {currentStage}
                    </p>
                  </td>
                  <td className='p-4'>
                    <p>{source}</p>
                  </td>
                  <td className='p-4 flex justify-between items-center'>
                    <PencilIcon
                      className='w-3 h-3 text-primary'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(index)
                      }}
                    />
                    <TrashIcon
                      className='w-3 h-3 text-primary'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(index)
                      }}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination Section */}
      <section className='mt-6'>
        <div className='flex justify-end items-center gap-3'>
          <div className='flex gap-2 items-center'>
            <p className='text-gray-500 text-xs'>Rows per page: </p>
            <div className='flex gap-2'>
              <select className='border-none bg-gray-100 rounded-md px-2 py-1 focus:outline-none outline-none cursor-pointer'>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
            </div>
          </div>
          <div className=''>
            <p>
              <span className='text-gray-500 text-xs'>
                Showing 1-10 of 100 entries
              </span>
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            {/* 4 arrows - first page, last page, next and previous pages */}
            <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
              <ChevronDoubleLeftIcon className='w-4 h-4 text-primary' />
            </div>

            <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
              <ChevronLeftIcon className='w-4 h-4 text-primary ' />
            </div>
            <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
              <ChevronRightIcon className='w-4 h-4 text-primary cursor-pointer' />
            </div>
            <div className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'>
              <ChevronDoubleRightIcon className='w-4 h-4 text-primary cursor-pointer' />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ApplicationsTable
