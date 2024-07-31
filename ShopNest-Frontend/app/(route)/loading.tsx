import React from 'react';

const LoadingSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
      <div className="p-4 sm:p-6 lg:p-8 overflow-hidden rounded-xl">
        <div className="relative rounded-lg overflow-hidden aspect-square h-[200px] md:h-[300px] md:aspect-[2.4/1] w-full skeleton">
        </div>
      </div>
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="skeleton-text skeleton" style={{ height: '1.5rem', width: '30%' }}></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {skeletonItems.map((_, index) => (
           <div
           key={index}
           className="bg-gray-300 h-48 w-full text-skeleton skeleton rounded-md"
         ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
