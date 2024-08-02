import React from 'react';

const Loading = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <div className='flex flex-col space-y-4 p-8 pt-6 h-full mt-16'>
      <div className='skeleton-text skeleton' style={{ height: '1.2rem', width: '30%' , }}></div>
      <div className='skeleton-text skeleton' style={{ height: '1rem', width: '15%' ,}}></div>
      <div className='grid grid-cols-4 gap-4  place-items-center mt-10'>
        {skeletonItems.map((_, index) => (
          <div key={index} className='skeleton-text skeleton h-[1rem] rounded-md w-full'></div>
        ))}
      </div>
      <div className='skeleton' style={{ height: '1rem', width: '30%', }}></div>
    </div>
  );
};

export default Loading;
