import React from 'react'
import CityCard from './CityCard'

const Tailwind = () => {
  const places = [
    {
      name: 'miami',
      averagePrice: 120,
      propertyCount: 14,
      image: '/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg',
      imageAlt: 'Seattle skyline',
    },
    {
      name: 'toronto',
      averagePrice: 140,
      propertyCount: 60,
      image: '/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg',
      imageAlt: 'Seattle skyline',
    },
    {
      name: 'Paris',
      averagePrice: 520,
      propertyCount: 54,
      image: '/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg',
      imageAlt: 'Seattle skyline',
    },
    {
      name: 'Los Angelos',
      averagePrice: 53,
      propertyCount: 14,
      image: '/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg',
      imageAlt: 'Seattle skyline',
    },
    {
      name: 'New York',
      averagePrice: 430,
      propertyCount: 14,
      image: '/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg',
      imageAlt: 'Seattle skyline',
    },
  ]
  return (
    <div className="bg-gray-100 h-screen overflow-auto">
      <div className="grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 mx-auto xl:mr-0 max-w-md sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full 2xl:col-span-2">
          <div className="xl:max-w-xl ">
            <img src="/shopnest-logo.png" alt="logo" className="h-10" />
            <img
              src="/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg"
              className="rounded-md object-fit shadow-md lg:hidden  mt-6 sm:mt-8 sm:h-64
              sm:w-full sm:object-cover"
            />
            <h1 className=" font-bold text-2xl text-gray-900 mt-6 sm:mt-8 sm:text-4xl">
              You can work from anywhere.
              <br />
              <span className="text-blue-500">Take advantage of it.</span>
            </h1>
            <p className="text-gray-500 mt-2 sm:mt-4 sm:text-lg">
              Workcation helps you find work-friendly rentals in beautiful
              locations so you can enjoy some nice weather even when you're not
              on vacation.
            </p>
            <div className="space-x-2 flex justify-center sm:justify-start">
              <a className="mt-4 sm:mt-6  shadow-sm inline-block">
                <button className="btn btn-primary">Choose you kids</button>
              </a>
              <a className="mt-4 sm:mt-6  shadow-sm inline-block">
                <button className="btn btn-secondary">Read more</button>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative 2xl:col-span-3">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center "
            src="/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg"
          />
        </div>
      </div>
      <div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <h2 className="text-xl text-gray-900">Popular Destinations</h2>
        <p className="mt-2 text-gray-600">
          A selection of great work-friendly cities with lots to see and
          explore.
        </p>
        <div className="grid mt-6 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {places.map((city) => (
            <CityCard key={city.name} city={city} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tailwind
