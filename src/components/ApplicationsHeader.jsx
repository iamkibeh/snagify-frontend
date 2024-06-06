import { AdjustmentsVerticalIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'

function ApplicationsHeader() {
  return (
    <div className='flex py-4'>
      <section className='flex-grow'>
        <h1 className='text-lg font-medium text-primary'>Applications</h1>{' '}
      </section>
      <section className='flex justify-center items-center gap-3'>
        <div className='flex items-center'>
          <p>Filter By: &nbsp;</p>
          <AdjustmentsVerticalIcon className='w-4 h-4 cursor-pointer' />
        </div>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search'
            className='border-none rounded-md px-2 py-1 focus:outline-none outline-none bg-gray-100 '
          />
          {/* search icon positioned at end of input  */}
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <MagnifyingGlassIcon className='w-4 h-4' />
          </div>
        </div>

        <button className='flex gap-1 justify-between items-center button-8'>
          <PlusIcon className='w-4 h-4' />
          <span>Add Application</span>
        </button>
      </section>
    </div>
  )
}

export default ApplicationsHeader
