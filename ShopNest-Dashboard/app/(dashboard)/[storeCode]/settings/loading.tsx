import React from 'react'

const Loading = () => {

  return (
    <div className='flex flex-col space-y-4 p-8 pt-6'>
      <div className='skeleton-text' style={{ height: '1.2rem', width: '30%', borderRadius:'1rem' }}></div>
      <div className='skeleton-text' style={{ height: '1rem', width: '20%', borderRadius:'1rem' }}></div>
      <div className='skeleton-text' style={{ height: '1rem', width: '20%', borderRadius:'1rem' }}></div>
      <div className='mt-5'>
      <div className='skeleton-text' style={{ height: '1rem', width: '30%', borderRadius:'1rem' }}></div>
      <div className='skeleton-text' style={{ height: '1rem', width: '30%', borderRadius:'1rem' }}></div>
      </div>
    </div>
  )
}

export default Loading
