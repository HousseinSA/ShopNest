import React from 'react'

const Loading = () => {

  return (
    <div className='flex flex-col space-y-4 p-8 pt-6'>
      <div className='skeleton-text' style={{ height: '.8rem', width: '20%' }}></div>
      <div className='skeleton-text' style={{ height: '.8rem', width: '10%' }}></div>
      <div className='skeleton-text' style={{ height: '.6rem', width: '40%' }}></div>
      <div className='mt-5'>
      <div className='skeleton-text' style={{ height: '.6rem', width: '40%' }}></div>
      <div className='skeleton-text' style={{ height: '.6rem', width: '40%' }}></div>
      </div>
    </div>
  )
}

export default Loading
