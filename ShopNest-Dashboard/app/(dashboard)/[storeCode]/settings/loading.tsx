import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col space-y-4 py-4 px-0 md:p-4 lg:p-8 '>
      <div className='skeleton-text' style={{ height: '1.2rem', width: '30%' }}></div>
      <div className='skeleton-text' style={{ height: '1rem', width: '20%' }}></div>
      <div className='skeleton-text' style={{ height: '1rem', width: '20%' }}></div>
      <div className='mt-5'>
        <div className='skeleton-text' style={{ height: '1rem', width: '30%' }}></div>
        <div className='skeleton-text' style={{ height: '1rem', width: '30%' }}></div>
      </div>
    </div>
  )
}

export default Loading
