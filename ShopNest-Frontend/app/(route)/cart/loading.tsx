const Loading = () => {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <div className="px-4 py-16 sm:px-6 md:px-8 min-h-screen">
      <div className="flex items-center space-x-4">
        <div className="bg-primary rounded-full p-2">
          {/* Skeleton for cart icon */}
          <div className="skeleton" style={{ width: '24px', height: '24px', borderRadius: '50%' }}></div>
        </div>
        <h1 className="font-bold text-primary text-3xl">
          <div className="skeleton" style={{ width: '10rem', height: '1.5rem' }}></div>
        </h1>
      </div>
      <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start gap-x-10">
        <div className="lg:col-span-7">
          <p className="font-semibold text-medium text-primary">
            {/* Skeleton for empty cart message */}
            <div className="skeleton" style={{ width: '10rem', height: '1rem' }}></div>
          </p>
          <ul>
            {skeletonItems.map((_, index) => (
              <li key={index} className="flex py-6 border-b last:border-b-0 gap-x-4 sm:gap-x-6">
                {/* Skeleton for cart item image */}
                <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                  <div className="skeleton" style={{ width: '100%', height: '100%' }}></div>
                </div>
                <div className="relative flex flex-col flex-1 justify-between">
                  {/* Skeleton for item details */}
                  <div className="relative pr-9 sm:pr-0 sm:grid sm:grid-cols-2 sm:gap-x-4">
                    <div className="flex justify-between">
                      <div className="skeleton" style={{ width: '10rem', height: '1rem' }}></div>
                    </div>
                    <div className="mt-1 text-sm capitalize flex items-center gap-x-4">
                      <div className="skeleton" style={{ width: '4rem', height: '1rem' }}></div>
                      <div className="skeleton" style={{ width: '4rem', height: '1rem' }}></div>
                    </div>
                    <div className="skeleton" style={{ width: '6rem', height: '1rem' }}></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:p-8 bg-gray-50">
          {/* Skeleton for summary section */}
          <h2 className="text-lg font-medium text-primary">
            <div className="skeleton" style={{ width: '8rem', height: '1.5rem' }}></div>
          </h2>
          <div className="mt-6 space-y-4">
            {/* Skeleton for order total */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-base font-medium text-primary">
                <div className="skeleton" style={{ width: '6rem', height: '1rem' }}></div>
              </div>
              <div className="skeleton" style={{ width: '4rem', height: '1rem' }}></div>
            </div>

            {/* Skeleton for checkout button */}
            <button disabled className="w-full mt-5 rounded-lg p-3 bg-gray-300 cursor-not-allowed">
              <span className="skeleton" style={{ width: '100%', height: '2.5rem' }}></span>
            </button>

            {/* Additional skeleton elements if needed */}
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="skeleton" style={{ width: '100%', height: '2rem' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;