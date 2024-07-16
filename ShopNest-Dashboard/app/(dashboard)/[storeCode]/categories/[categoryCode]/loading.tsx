import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col space-y-4 p-8 pt-6'>
      <div className='skeleton-text skeleton' style={{ height: '.7rem', width: '30%' }}></div>
      <div className='skeleton-text skeleton' style={{ height: '.7rem', width: '15%' }}></div>
      <div className='mt-4 flex items-center gap-4 '>
        <div className='skeleton-text skeleton' style={{ height: '.7rem', width: '30%' }}></div>
        <div className='skeleton-text skeleton' style={{ height: '.7rem', width: '30%' }}></div>
      </div>
      <div className='skeleton' style={{ height: '.7rem', width: '30%', borderRadius: '1rem' }}></div>
    </div>
  )
}

export default Loading
