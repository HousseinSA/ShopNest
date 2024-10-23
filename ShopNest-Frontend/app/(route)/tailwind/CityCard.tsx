import React from 'react'

interface CityProps {
  name: string
  averagePrice: number
  propertyCount: number
  image: string
  imageAlt: string
}
const CityCard = ({city}:CityProps) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={city.image}
        alt={city.name}
        className="h-32 object-fit w-32"
      />
      <div className="px-6 py-4 ">
        <h3 className="text-lg font-semibold text-gray-800 uppercase">{city.name}</h3>
        <p className="text-highlight">{city.averagePrice}$/ night average  </p>
        <div className="mt-4">
          <a
            className="font-semibold text-brand hover:text-brand-light"
            href={'/more'}
          >
            Explore {city?.propertyCount} properties
          </a>
        </div>
      </div>
    </div>
   
  )
}

export default CityCard


// <div className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
// <img src={city.image} className="h-32 w-32 " alt="" />
// <div className="px-6 py-4">
//   <h3 className="text-lg font-semibold text-gray-800">{city.name}</h3>
//   <p className="text-gray-600">{city.averagePrice}$ / average price </p>
//   <div className="mt-4">
//     <a
//       href=""
//       className="text-indigo-500 hover:text-indigo-400 font-semibold "
//     >
//       Explore {city.propertyCount} properties
//     </a>
//   </div>
// </div>
// </div>