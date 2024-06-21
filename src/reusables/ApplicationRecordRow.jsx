/* eslint-disable react/prop-types */

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const ApplicationRecordRow = ({
  id,
  companyName,
  jobTitle,
  formattedApplicationDate,
  applicationStage,
  location,
  source,
  handleRowClick,
  handleEdit,
  handleDelete,
  setIsDeleteConfirmationModalOpen,
}) => {
  return (
    <tr
      className='even:bg-gray-100 cursor-pointer hover:bg-gray-300 transition-colors duration-1000'
      onClick={() => handleRowClick(id)}
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
        <p>{formattedApplicationDate}</p>
      </td>
      <td className='px-4'>
        <p className='bg-accent  text-[10px] min-w-8 w-20 text-center py-1 px-2 rounded-2xl '>
          {' '}
          {applicationStage}
        </p>
      </td>
      <td className='p-4'>
        <p>{source}</p>
      </td>
      <td className='p-4 flex justify-between items-center'>
        <Tooltip
          content='Edit'
          placement='bottom'
          className='bg-highlight text-primary py-1 text-xs'
        >
          <PencilIcon
            className='w-3 h-3 text-primary'
            onClick={(e) => {
              e.stopPropagation()
              handleEdit(id)
            }}
          />
        </Tooltip>
        <Tooltip
          content='Delete'
          placement='bottom'
          className='bg-highlight text-primary py-1 text-xs'
        >
          <TrashIcon
            className='w-3 h-3 text-primary'
            onClick={(e) => {
              e.stopPropagation()
              setIsDeleteConfirmationModalOpen(true)
              handleDelete(id)
            }}
          />
        </Tooltip>
      </td>
    </tr>
  )
}

export default ApplicationRecordRow
