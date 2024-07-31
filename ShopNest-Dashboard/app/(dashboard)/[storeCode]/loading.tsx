

const Loading = () => {
  return (
   
    <div className='flex-col p-8 pt-6 space-y-4'>
    {/* Section Header Skeleton */}
    <div className='skeleton-text' style={{ height: '1.2rem', width: '30%', borderRadius: '1rem' }}></div>
    <div className='skeleton-text' style={{ height: '1rem', width: '20%', borderRadius: '1rem' }}></div>
    {/* Grid for Cards */}
    <div className='grid gap-4 grid-cols-3'>
      {/* Card Skeletons */}
      <div className='skeleton space-y-4 py-4 pl-2'>
        <div className='skeleton-text' style={{ height: '1rem', width: '80%', borderRadius: '0.75rem' }}></div>
        <div className='skeleton-text' style={{ height: '1.5rem', width: '60%', borderRadius: '0.75rem' }}></div>
      </div>
      <div className='skeleton space-y-4 py-4 pl-2'>
        <div className='skeleton-text' style={{ height: '1rem', width: '80%', borderRadius: '0.75rem' }}></div>
        <div className='skeleton-text' style={{ height: '1.5rem', width: '60%', borderRadius: '0.75rem' }}></div>
      </div>
      <div className='skeleton space-y-4 py-4 pl-2'>
        <div className='skeleton-text' style={{ height: '1rem', width: '80%', borderRadius: '0.75rem' }}></div>
        <div className='skeleton-text' style={{ height: '1.5rem', width: '60%', borderRadius: '0.75rem' }}></div>
      </div>
    </div>
    
    {/* Overview Card Skeleton */}
    <div className='skeleton' style={{ height: '300px', width: '100%', borderRadius: '1rem' }}></div>
  </div>
  );
};

export default Loading;
