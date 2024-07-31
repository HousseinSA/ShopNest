const loading = () => {
  const skeletonItems = Array.from({ length: 6 })

  return (
    <div className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex gap-6">
            <div className="relative flex gap-8">
              <div className="bg-gray-300 h-48 w-48 rounded-md"></div>
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <div className="bg-gray-300 h-12 w-12 rounded-md"></div>
                <div className="bg-gray-300 h-12 w-12 rounded-md"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-6 w-full">
              <div className="h-6 bg-gray-300 w-3/4 mb-2 rounded-md"></div>
              <div className="h-6 bg-gray-300 w-2/3 mb-4 rounded-md"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-300 w-1/3 rounded-md"></div>
                <div className="h-8 bg-gray-300 w-1/4 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 h-48 w-full rounded-md"
            ></div>
          ))}
        </div>
      </div>
    </div>
  
  )
}

export default loading
