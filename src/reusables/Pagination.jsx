import PropTypes from 'prop-types'
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid'

const Pagination = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRecords,
  isPageLast = false,
}) => {
  const handleRowsChange = (event) => {
    onRowsPerPageChange(Number(event.target.value))
  }

  return (
    <section className='mt-6'>
      <div className='flex justify-end items-center gap-3'>
        <div className='flex gap-2 items-center'>
          <p className='text-gray-500 text-xs'>Rows per page:</p>
          <div className='flex gap-2'>
            <select
              value={rowsPerPage}
              onChange={handleRowsChange}
              className='border-none bg-gray-100 rounded-md px-2 py-1 focus:outline-none outline-none cursor-pointer'
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
            </select>
          </div>
        </div>
        <div>
          <p>
            <span className='text-gray-500 text-xs'>
              Showing {currentPage * rowsPerPage + 1}-
              {Math.min((currentPage + 1) * rowsPerPage, totalRecords)} of{' '}
              {totalRecords} entries
            </span>
          </p>
        </div>
        {/* <div className='flex gap-2 items-center'>
          <div
            className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'
            onClick={() => onPageChange(0)}
          >
            <ChevronDoubleLeftIcon className='w-4 h-4 text-primary' />
          </div>
          <div
            className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className='w-4 h-4 text-primary ' />
          </div>
          <div
            className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRightIcon className='w-4 h-4 text-primary cursor-pointer' />
          </div>
          <div
            className='cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-full p-2'
            onClick={() => onPageChange(totalPages - 1)}
          >
            <ChevronDoubleRightIcon className='w-4 h-4 text-primary cursor-pointer' />
          </div>
        </div> */}

        <div className='flex items-center space-x-2'>
          {/* First page */}
          <div
            className={`hover:bg-gray-300 transition-colors duration-200 rounded-full p-2 ${
              currentPage === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
          >
            <ChevronDoubleLeftIcon className='w-4 h-4 text-primary' />
          </div>

          {/* Previous page */}
          <div
            className={`hover:bg-gray-300 transition-colors duration-200 rounded-full p-2 ${
              currentPage === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className='w-4 h-4 text-primary' />
          </div>

          {/* Next page */}
          <div
            className={`hover:bg-gray-300 transition-colors duration-200 rounded-full p-2 ${
            //   currentPage >= totalPages - 1
            isPageLast
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            onClick={() =>
             !isPageLast && onPageChange(currentPage + 1)
            }
            disabled={isPageLast}
          >
            <ChevronRightIcon className='w-4 h-4 text-primary' />
          </div>

          {/* Last page */}
          <div
            className={`hover:bg-gray-300 transition-colors duration-200 rounded-full p-2 ${
            isPageLast
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            onClick={() => onPageChange(totalPages - 1)}
            disabled={isPageLast}
          >
            <ChevronDoubleRightIcon className='w-4 h-4 text-primary' />
          </div>
        </div>
      </div>
    </section>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  totalRecords: PropTypes.number.isRequired,
  isPageLast: PropTypes.bool,
}

export default Pagination
