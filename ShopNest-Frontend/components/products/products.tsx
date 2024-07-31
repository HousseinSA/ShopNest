import { Product } from "@/lib/StoreTypes";
import ProductCard from "@/components/products/productCard";

interface ProductsProps { 
  products: Product[];
  title: string;
}

const Products: React.FC<ProductsProps> = ({ products, title }) => {
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h3 className="text-2xl sm:text-3xl text-primary md:text-4xl font-bold mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-6">
        {products.map((product) => (
       <ProductCard key={product.id} product={product}/>  
        ))}
      </div>
    </div>
  );
};

export default Products;
