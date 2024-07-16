
const Loading = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden rounded-xl">
    <div className="relative rounded-lg overflow-hidden aspect-square h-[200px] md:h-[300px] md:aspect-[2.4/1] w-full skeleton"></div>
     <div className="p-4 sm:p-6 lg:p-8">
    <div className="skeleton-text w-1/2 h-8 mb-6"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="skeleton h-48"></div>
      ))}
    </div>
  </div>
  </div>  
    
  )
}

export default Loading
