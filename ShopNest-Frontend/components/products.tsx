import Image from "next/image";
import { Product } from "@/lib/StoreTypes";

interface ProductsProps {
  products: Product[];
  title: string;
}

const Products: React.FC<ProductsProps> = ({ products, title }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center space-y-3">
            <Image
              width={200}
              height={200}
              loading="lazy"
              src={product.images[0].url}
              alt={product.name}
              className="rounded-md object-cover"
            />
            <div className="text-center">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg font-semibold text-[#437e41]">
                  {product.name}
                </span>
                <span className="text-gray-500">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
