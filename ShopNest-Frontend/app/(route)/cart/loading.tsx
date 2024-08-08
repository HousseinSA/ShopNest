const loading = () => {
  const skeletonItems = Array.from({ length: 4 })
  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-10">
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex gap-6">
            <div className="flex  justify-between gap-6 w-full">
              <div className="flex flex-col gap-4">
                <div
                  className="skeleton-text mb-4"
                  style={{ width: '15rem', height: '1.2rem' }}
                ></div>
                <div className="flex justify-between  items-center w-full ">
                  <div
                    className="skeleton "
                    style={{
                      width: '10rem',
                      height: '10rem',
                      borderRadius: '1rem',
                    }}
                  ></div>
                  <div
                    className="skeleton-text  ml-4"
                    style={{ width: '12rem', height: '1rem' }}
                  ></div>
                </div>
              </div>
              <div className="skeleton">
                <div
                  style={{ width: '30rem', height: '15rem' }}
                  className=" skeleton p-4"
                >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-8">
          {skeletonItems.map((_, index) => (
            <div className="flex justify-between w-1/2">
              <div
                key={index}
                className="skeleton "
                style={{
                  width: '10rem',
                  height: '10rem',
                  borderRadius: '1rem',
                }}
              ></div>
              <div
                className="skeleton-text  "
                style={{ width: '12rem', height: '1rem' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default loading
