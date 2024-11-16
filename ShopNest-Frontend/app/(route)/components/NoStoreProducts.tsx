// components/NoStoreProducts.tsx
import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button'


const NoStoreProducts: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-100 rounded-lg shadow-md">
            <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">No Products Available</h2>
            <p className="text-gray-500">This store currently has no products.</p>
            <Link href={process.env.NEXT_PUBLIC_DASHBOARD_URL || '/'} passHref>
                <Button className="mt-4 px-4 py-2 bg-primary text-white rounded  transition duration-200">
                    Go to Dashboard
                </Button>
            </Link>
        </div>
    );
};

export default NoStoreProducts;