import React from 'react';

const Loading = () => {
  const skeletonItems = Array.from({ length: 3 }); // Number of skeleton items to display

  return (
    <div className="px-4 py-16 sm:px-6 md:px-8 min-h-screen bg-white">
      <div className="flex items-center space-x-4">
        <div className="bg-[#e0e0e0] rounded-full p-2">
          <div className="skeleton" style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0e0e0' }}></div>
        </div>
        <h1 className="font-bold text-primary text-3xl">
          <div className="skeleton" style={{ width: '10rem', height: '1.5rem', backgroundColor: '#e0e0e0' }}></div>
        </h1>
      </div>
      <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start gap-x-10">
        <div className="lg:col-span-7">
          <ul className="space-y-4">
            {skeletonItems.map((_, index) => (
              <li key={index} className="flex flex-col lg:flex-row border-b last:border-b-0 gap-x-4 pb-4">
                <div className="relative h-24 w-32 rounded-md overflow-hidden sm:h-48 bg-gray-200"> {/* Adjust width here */}
                  <div className="skeleton" style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0' }}></div>
                </div>
                <div className="relative flex flex-col flex-1 justify-between mt-4 lg:mt-0">
                  <div className="relative pr-9 sm:pr-0">
                    <div className="skeleton my-2" style={{ width: '100%', height: '1rem', backgroundColor: '#e0e0e0' }}></div>
                    <div className="mt-1 text-sm capitalize flex items-center gap-x-4">
                      <div className="skeleton my-2" style={{ width: '4rem', height: '1rem', backgroundColor: '#e0e0e0' }}></div>
                      <div className="skeleton my-2" style={{ width: '4rem', height: '1rem', backgroundColor: '#e0e0e0' }}></div>
                    </div>
                    <div className="skeleton" style={{ width: '6rem', height: '1rem', backgroundColor: '#e0e0e0' }}></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:p-8 bg-gray-50 mt-8 lg:mt-0">
          <h2 className="text-lg font-medium text-primary">
            <div className="skeleton" style={{ width: '8rem', height: '1.5rem', backgroundColor: '#e0e0e0' }}></div>
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-base font-medium text-primary">
                <div className="skeleton" style={{ width: '6rem', height: '1rem', backgroundColor: '#e0e0e0' }}></div>
              </div>
              <div className="skeleton" style={{ width: '4rem', height: '1rem', backgroundColor: '#e0e0e0' }}></div>
            </div>
            <button disabled className="w-full mt-5 rounded-lg p-3 bg-gray-300 cursor-not-allowed">
              <span className="skeleton" style={{ width: '100%', height: '2.5rem', backgroundColor: '#e0e0e0' }}></span>
            </button>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="skeleton" style={{ width: '100%', height: '2rem', backgroundColor: '#e0e0e0' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;