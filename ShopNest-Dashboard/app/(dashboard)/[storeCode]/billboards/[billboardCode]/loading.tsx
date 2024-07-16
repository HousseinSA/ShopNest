import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col space-y-4 p-8 pt-6'>
      <div className='skeleton-text skeleton' style={{ height: '1rem', width: '30%' }}></div>
      <div className='skeleton' style={{ height: '200px', width: '200px', borderRadius: '10px' }}></div>
      <div className='skeleton-text skeleton' style={{ height: '1rem', width: '30%' }}></div>
      <div className='skeleton' style={{ height: '1.2rem', width: '30%', borderRadius: '0.5rem' }}></div> 
    </div>
  )
}

export default Loading
