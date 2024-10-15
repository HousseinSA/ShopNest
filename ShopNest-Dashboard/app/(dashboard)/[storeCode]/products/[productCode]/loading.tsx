import React from 'react';

const ProductFormLoading = () => {
  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="skeleton-text skeleton" style={{ height: '1.5rem', width: '40%' }}></div>
      <div className="skeleton-text skeleton" style={{ height: '1rem', width: '20%' }}></div>

      <div className="grid md:grid-cols-3 gap-8 lg:grid-cols-4 mt-4">
        {/* Product Name Field */}
        <div className="flex flex-col">
          <div className="skeleton-text skeleton" style={{ height: '1rem', width: '100%' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '2rem', width: '100%', marginTop: '0.5rem' }}></div>
        </div>

        {/* Product Price Field */}
        <div className="flex flex-col">
          <div className="skeleton-text skeleton" style={{ height: '1rem', width: '100%' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '2rem', width: '100%', marginTop: '0.5rem' }}></div>
        </div>

        {/* Product Brand Field */}
        <div className="flex flex-col">
          <div className="skeleton-text skeleton" style={{ height: '1rem', width: '100%' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '2rem', width: '100%', marginTop: '0.5rem' }}></div>
        </div>

        {/* Product Description Field */}
        <div className="flex flex-col">
          <div className="skeleton-text skeleton" style={{ height: '1rem', width: '100%' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '4rem', width: '100%', marginTop: '0.5rem' }}></div>
        </div>

        {/* Product Images Field */}
        <div className="flex gap-4 col-span-full">
          <div className="skeleton-text skeleton" style={{ height: '250px', width: '250px' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '250px', width: '250px' }}></div>
        </div>

        {/* Category Selector Field */}
        <div className="flex flex-col">
          <div className="skeleton-text skeleton" style={{ height: '1rem', width: '100%' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '2rem', width: '100%', marginTop: '0.5rem' }}></div>
        </div>

        {/* Color Selector Field */}
        <div className="flex flex-col">
          <div className="skeleton-text skeleton" style={{ height: '1rem', width: '100%' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '2rem', width: '100%', marginTop: '0.5rem' }}></div>
        </div>

        {/* Size Selector Field */}
        <div className="flex flex-col">
          <div className="skeleton-text skeleton" style={{ height: '1rem', width: '100%' }}></div>
          <div className="skeleton-text skeleton" style={{ height: '2rem', width: '100%', marginTop: '0.5rem' }}></div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="skeleton-text skeleton" style={{ height: '2rem', width: '15%', marginTop: '1rem' }}></div>
    </div>
  );
};

export default ProductFormLoading;
