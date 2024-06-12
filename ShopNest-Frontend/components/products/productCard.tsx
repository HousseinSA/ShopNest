'use client'
import Image from "next/image";
import React from "react";
import { useRouter } from   "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";

import { Product as ProductData } from "@/lib/StoreTypes";
import ButtonIcon from "@/components/ui/IconButton";
import Currency from "@/components/products/currency";

interface Product {
  product: ProductData;
}

function ProductCard({product}:Product): React.ReactElement {
  const route = useRouter()
  const onClick = ()=>{
    route.push(`/product/${product.id}`)
  }
  return (
    <div onClick={onClick}  className="rounded-xl cursor-pointer bg-white group space-y-4 border p-3 shadow-md">
      <div className="aspect-square relative bg-gray-100 rounded-xl">
        <Image
          layout="fill"
          src={product.images[0].url}
          alt={product.name}
          className="aspect-square object-fit rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 ">
          <div className="flex justify-center gap-x-4">
            <ButtonIcon icon={<Expand size={15} className="text-white" />} />
            <ButtonIcon
              icon={<ShoppingCart size={15} className="text-white" />}
            />
          </div>
        </div>
      </div>
      {/* discreption */}
      <div>
        <p className="font-semibold text-lg text-[#1E421D]">
          {product.category.name}
        </p>
        <p className="text-sm text-gray-500">{product.name}</p>
      </div>
      {/* price */}
      <div className="flex justify-between">
        <Currency data={product.price} />
      </div>
    </div>
  );
};

export default ProductCard;
