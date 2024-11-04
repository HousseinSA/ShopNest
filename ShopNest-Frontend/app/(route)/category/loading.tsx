import React from 'react'

const LoadingSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 })

  return (
    <div className="bg-white">
      <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
        {/* Billboard Skeleton */}
        <div className=" sm:p-6 lg:p-8 overflow-hidden rounded-xl">
          <div className="relative rounded-lg overflow-hidden aspect-square h-[200px] md:h-[300px] md:aspect-[2.4/1] w-full skeleton"></div>
        </div>
        {/* Filters and Products Skeleton */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6">
            {/* Mobile Filters Skeleton */}
            <div className="lg:hidden block">
              <div
                className="skeleton-text skeleton"
                style={{ height: '1.2rem', width: '30%' }}
              ></div>
            </div>
            {/* Desktop Filters Skeleton */}
            <div className="lg:block hidden">
              <div
                className="skeleton-text skeleton"
                style={{ height: '1.5rem', width: '30%' }}
              ></div>
              <div className="flex flex-wrap gap-2 mt-4">
                {skeletonItems.slice(0, 4).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-text skeleton"
                    style={{
                      height: '1.5rem',
                      width: '5rem',
                    }}
                  ></div>
                ))}
              </div>
              <div
                className="skeleton-text skeleton mt-4 "
                style={{ height: '1.5rem', width: '30%' }}
              ></div>
              <div className="flex flex-wrap gap-2 mt-4">
                {skeletonItems.slice(0, 4).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-text skeleton"
                    style={{
                      height: '1.5rem',
                      width: '5rem',
                    }}
                  ></div>
                ))}
              </div>
            </div>
            {/* Products Skeleton */}
            <div className="mt-6 lg:mt-0 lg:col-span-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {skeletonItems.map((_, index) => (
                  <div
                  key={index}
                    className="rounded-xl cursor-pointer bg-white group border p-3 shadow-md relative skeleton"
                  >
                    <div className="aspect-square relative bg-white rounded-xl skeleton"></div>
                    <div>
                      <p
                        className=" skeleton-text skeleton"
                        style={{ height: '1rem', width: '50%' }}
                      ></p>
                      <p
                        className=" m-0 skeleton-text skeleton"
                        style={{ height: '1rem', width: '70%' }}
                      ></p>
                    </div>
                    <div
                      className="skeleton-text skeleton"
                      style={{ height: '1rem', width: '30%' }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
