import React from 'react';

interface LoadingSkeletonProps {
  productsCount?: number; // Optional count for skeleton items
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ productsCount = 8 }) => {
  const skeletonItems = Array.from({ length: productsCount });

  return (
    <div className="bg-white">
      <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-12 lg:py-12 max-w-7xl space-y-10">
        {/* Billboard Skeleton */}
        <div className="sm:p-6 lg:p-8 overflow-hidden rounded-xl">
          <div className="relative rounded-lg overflow-hidden aspect-square h-[200px] md:h-[300px] md:aspect-[2.4/1] w-full bg-gray-300 skeleton"></div>
        </div>

        {/* Title Skeleton */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div
            className="skeleton-text skeleton mb-4"
            style={{ height: '1.5rem', width: '30%' }} // Title width
          ></div>
        </div>

        {/* Products Skeleton */}
        <div className="mt-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skeletonItems.map((_, index) => (
              <div
                key={index}
                className="rounded-xl cursor-pointer bg-white group border p-3 shadow-md relative"
                style={{ width: '100%' }} // Full width to match original cards
              >
                <div className="aspect-square relative bg-gray-300 rounded-xl skeleton"></div>
                <div>
                  <p
                    className="skeleton-text skeleton mt-2"
                    style={{ height: '.8rem', width: '45%' }} // Adjusted width for text
                  ></p>
                  <p
                    className="m-0 skeleton-text skeleton"
                    style={{ height: '.8rem', width: '65%' }} // Adjusted width for text
                  ></p>
                </div>
                <div
                  className="skeleton-text skeleton"
                  style={{ height: '.8rem', width: '25%' }} // Adjusted width for price
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;