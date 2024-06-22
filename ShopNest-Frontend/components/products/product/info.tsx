import { ShoppingCart } from "lucide-react";


import { Product } from "@/lib/StoreTypes";
import Currency from "@/components/products/currency";
import {Button} from '@/components/ui/button';

interface InfoProps {
  product: Product;
}
const Info: React.FC<InfoProps> = ({ product }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-mainColor">
        {product.name}
      </h1>
      <div className="flex items-end mt-3">
        <Currency className="text-2xl text-gray-900" data={product.price} />
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-x-4">
          <h3 className="font-bold text-primary-mainColor">Size:</h3>
          <div className="font-semibold capitalize">{product.size.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-bold text-primary-mainColor">Color:</h3>
          <div
            style={{ background: product?.color?.value }}
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="mt-5 ">
        <Button className="  bg-primary-mainColor flex gap-x-2 hover:bg-primary-hoverMain ">
          <ShoppingCart/>
          Add To Cart
        </Button>`
      </div>
    </div>
  );
};

export default Info;
