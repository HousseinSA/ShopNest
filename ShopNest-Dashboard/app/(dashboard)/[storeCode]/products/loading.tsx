import React from 'react'

const Loading = () => {
  const skeletons = Array(5).fill(null) 

  return (
    <div className='flex flex-col space-y-4 p-8 pt-6'>
    <div className='skeleton-text skeleton' style={{ height: '.8rem', width: '20%' }}></div>
    <div className='skeleton-text skeleton' style={{ height: '.8rem', width: '10%' }}></div>
    <div className='skeleton-text skeleton' style={{ height: '.6rem', width: '40%' }}></div>
    <div className='flex flex-col skeleton'>
      {skeletons.map((_, index) => (
          <div key={index} className=' grid gap-4 grid-cols-3  py-6 place-items-center'>
          <div className='skeleton-text' style={{ height: '.6rem', width: '80%' }}></div>
          <div className='skeleton-text' style={{ height: '.6rem', width: '80%' }}></div>
          <div className='skeleton-text' style={{ height: '.6rem', width: '80%' }}></div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Loading
