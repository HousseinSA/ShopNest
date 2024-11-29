const Loading = () => {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
      {/* Main Skeleton Container */}
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 lg:p-8"> 
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left Image Skeleton */}
            <div className="flex justify-center sm:block">
              <div className="skeleton h-40 w-40 sm:h-48 sm:w-48 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Right Text Skeleton */}
            <div className="flex flex-col justify-center gap-4 w-full mt-4 sm:mt-0">
              <div className="skeleton-text h-4 w-3/4 mb-2 bg-gray-200 rounded"></div>
              <div className="skeleton-text h-4 w-2/3 mb-4 bg-gray-200 rounded"></div>
              <div className="flex justify-between items-center gap-4">
                <div style={{ width: '8rem' }} className="skeleton-text h-4 bg-gray-200 rounded"></div>
                <div style={{ width: '8rem' }} className="skeleton h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="skeleton-text skeleton mb-8 bg-gray-200 rounded" style={{ height: '1rem', width: '50%' }}></div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
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
  );
};

export default Loading;
