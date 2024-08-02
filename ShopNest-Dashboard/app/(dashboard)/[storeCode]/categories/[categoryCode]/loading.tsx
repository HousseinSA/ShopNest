import React from 'react'

const Loading = () => {
  return (
    <div className='p-4 flex flex-col flex-1 mt-4'>
      <div className='flex flex-col space-y-8'>
        <div className='flex flex-col item-center'>
          <div className='skeleton-text skeleton' style={{ height: '1.2rem', width: '30%' }}></div>
          <div className='skeleton' style={{ height: '1rem', width: '20%' }}></div>
        </div>
        <div className=' flex space-x-4'>
          <div className='skeleton-text skeleton' style={{ height: '1.2rem', width: '30%' }}></div>
          <div className='skeleton' style={{ height: '1.2rem', width: '30%' }}></div>
        </div>
        <div className="mt-8">
        <div className='skeleton' style={{ height: '1.5rem', width: '20%' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
