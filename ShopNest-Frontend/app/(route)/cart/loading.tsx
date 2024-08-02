const loading = () => {
  const skeletonItems = Array.from({ length: 4 })
  return (
    <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex gap-6">
            <div className="relative flex gap-8">
              <div className="skeleton h-48 w-48"></div>
            </div>
            <div className="flex flex-col justify-center gap-6 w-full">
              <div style={{width:'10rem'}} className="skeleton-text  mb-2"></div>
              <div style={{width:'10rem'}} className="skeleton-text h-6  mb-4"></div>
              <div className="flex justify-between items-center">
                <div
                  style={{ width: '10rem' }}
                  className="skeleton-text h-6"
                ></div>
                <div style={{ width: '10rem' }} className="skeleton h-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '10rem' }} className="skeleton-text h-6"></div>
      </div>
    </div>
  )
}

export default loading
