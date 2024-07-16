import React from 'react'

interface Cityrops {
    city:string, averagePrice:number,propertyCount:number,image:string,imageAlt:string
}
const CityCard = ({city}:Cityrops) => {
  return (
    <div>
        <div className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
            <img src={city.image} className="h-32 w-32 flex-shrink-0" alt="" />
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">{city.name}</h3>
              <p className="text-gray-600">{city.averagePrice}$ / average price </p>
              <div className="mt-4">
                <a
                  href=""
                  className="text-indigo-500 hover:text-indigo-400 font-semibold "
                >
                  Explore {city.propertyCount} properties
                </a>
              </div>
            </div>
          </div>
    </div>
  )
}

export default CityCard