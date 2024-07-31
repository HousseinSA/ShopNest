import React from 'react'

const Loading = () => {
  return (
    <div className='flex mt-4 flex-col space-y-4 p-8 pt-6'>
      <div className='skeleton-text skeleton' style={{ height: '1.2rem', width: '30%' ,borderRadius: '1rem' }}></div>
      <div className='skeleton' style={{ height: '1rem', width: '20%', borderRadius: '1rem' }}></div>
      <div className='mt-8 flex items-center gap-4 '>
        <div className='skeleton-text skeleton' style={{ height: '1em', width: '30%' }}></div>
        <div className='skeleton-text skeleton' style={{ height: '1rem', width: '30%' }}></div>
      </div>
      <div className='skeleton' style={{ height: '1rem', width: '30%', borderRadius: '1rem' }}></div>
    </div>
  )
}

export default Loading
