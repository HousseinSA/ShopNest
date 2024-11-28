import React from 'react';

const LoadingSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 }); // Adjust the number of skeleton items based on your layout

  return (
    <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
      {/* Skeleton for the main banner */}
      <div className="sm:p-6 lg:p-8 overflow-hidden rounded-xl">
        <div className="relative rounded-lg overflow-hidden aspect-square h-[200px] md:h-[300px] md:aspect-[2.4/1] w-full bg-gray-300"></div>
      </div>

      {/* Skeleton for the title */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div
          className="skeleton-text skeleton mb-8"
          style={{ height: '1.5rem', width: '25%', marginBottom: '1rem' }}
        ></div>
      </div>

      {/* Skeleton for product grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 h-48 w-full text-skeleton skeleton rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;