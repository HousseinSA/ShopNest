const loading = () => {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex gap-6">
            <div className="relative flex gap-8">
              <div className="skeleton h-48 w-48"></div>
            </div>
            <div className="flex flex-col justify-center gap-6 w-full">
              <div className="skeleton-text h-6 w-3/4 mb-2"></div>
              <div className="skeleton-text h-6 w-2/3 mb-4"></div>
              <div className="flex justify-between items-center">
                <div style={{width:'10rem'}} className="skeleton-text h-6 "></div>
                <div style={{width:'10rem'}} className="skeleton h-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="skeleton-text skeleton mb-8" style={{ height: '1.2rem', width: '30%' }}></div>
        <div className="grid grid-cols-1 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {skeletonItems.map((_, index) => (
            <div key={index} className="skeleton h-48 w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default loading
