

const Loading = () => {
  return (
   
    <div className='flex-col p-8 pt-6 space-y-4'>
    {/* Section Header Skeleton */}
    <div className='skeleton-text' style={{ height: '1.2rem', width: '30%', }}></div>
    <div className='skeleton-text' style={{ height: '1rem', width: '20%', }}></div>
    {/* Grid for Cards */}
    <div className='grid gap-4 grid-cols-3'>
      {/* Card Skeletons */}
      <div className='skeleton space-y-4 py-4 pl-2'>
        <div className='skeleton-text' style={{ height: '1.2rem', width: '80%',  }}></div>
        <div className='skeleton-text' style={{ height: '1rem', width: '60%',  }}></div>
      </div>
      <div className='skeleton space-y-4 py-4 pl-2'>
        <div className='skeleton-text' style={{ height: '1.2rem', width: '80%',  }}></div>
        <div className='skeleton-text' style={{ height: '1rem', width: '60%',  }}></div>
      </div>
      <div className='skeleton space-y-4 py-4 pl-2'>
        <div className='skeleton-text' style={{ height: '1.2rem', width: '80%',  }}></div>
        <div className='skeleton-text' style={{ height: '1rem', width: '60%',  }}></div>
      </div>
    </div>
    
    {/* Overview Card Skeleton */}
    <div className='skeleton' style={{ height: '300px', width: '100%', }}></div>
  </div>
  );
};

export default Loading;
