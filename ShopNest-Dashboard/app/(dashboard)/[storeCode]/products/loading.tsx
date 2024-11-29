import React from 'react';

const Loading = () => {
  return (
    <div className='flex flex-col space-y-6 p-4 md:p-8'>
      {/* Title and Description Skeleton */}
      <div className='skeleton-text' style={{ height: '1.5rem', width: '40%' }}></div>
      <div className='skeleton-text' style={{ height: '1rem', width: '60%' }}></div>

      {/* Form Fields Skeletons */}
      <div className='grid md:grid-cols-3 gap-8'>
        <div className='flex flex-col'>
          <div className='skeleton-text' style={{ height: '2rem', width: '100%' }}></div>
          <div className='skeleton-text' style={{ height: '1rem', width: '100%' }}></div>
        </div>
        <div className='flex flex-col'>
          <div className='skeleton-text' style={{ height: '2rem', width: '100%' }}></div>
          <div className='skeleton-text' style={{ height: '1rem', width: '100%' }}></div>
        </div>
        <div className='flex flex-col'>
          <div className='skeleton-text' style={{ height: '2rem', width: '100%' }}></div>
          <div className='skeleton-text' style={{ height: '1rem', width: '100%' }}></div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className='flex flex-col'>
        <div className='skeleton-text' style={{ height: '2rem', width: '100%' }}></div>
        <div className='skeleton-text' style={{ height: '1rem', width: '100%' }}></div>
      </div>

      {/* Image Upload Skeleton */}
      <div className='flex flex-col'>
        <div className='skeleton-text' style={{ height: '2rem', width: '100%' }}></div>
        <div className='skeleton-text' style={{ height: '1rem', width: '100%' }}></div>
      </div>

      {/* Checkbox Skeletons */}
      <div className='flex items-center space-x-2'>
        <div className='skeleton-text' style={{ height: '1rem', width: '1rem' }}></div>
        <div className='flex flex-col'>
          <div className='skeleton-text' style={{ height: '1rem', width: '50%' }}></div>
          <div className='skeleton-text' style={{ height: '1rem', width: '70%' }}></div>
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className='skeleton-text' style={{ height: '2rem', width: '100%' }}></div>
    </div>
  );
}

export default Loading;