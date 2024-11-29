import React from 'react';

const Loading = () => {
  const skeletons = Array(5).fill(null);

  return (
    <div className='flex flex-col space-y-4 py-4 px-0 md:p-4 lg:p-8  '>
      <div className='skeleton-text' style={{ height: '1.2rem', width: '30%' }}></div>
      <div className='skeleton-text' style={{ height: '1rem', width: '20%' }}></div>
      <div className='skeleton-text skeleton' style={{ height: '1rem', width: '30%' }}></div>
      <div className='flex flex-col w-full skeleton px-4 '> {/* Ensure this div expands */}
        {skeletons.map((_, index) => (
          <div key={index} className='grid gap-4 grid-cols-3 py-6 place-items-center w-full'>
            <div className='skeleton-text' style={{ height: '.6rem', width: '100%' }}></div> {/* Set width to 100% */}
            <div className='skeleton-text' style={{ height: '.6rem', width: '100%' }}></div> {/* Set width to 100% */}
            <div className='skeleton-text' style={{ height: '.6rem', width: '100%' }}></div> {/* Set width to 100% */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;