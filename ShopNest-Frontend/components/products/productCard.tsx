'use client'
import React from "react";
import { useRouter } from   "next/navigation";
import { Scaling, ShoppingCart } from "lucide-react";
import {  CldImage } from 'next-cloudinary'


import { Product as ProductData } from "@/lib/StoreTypes";
import ButtonIcon from "@/components/ui/IconButton";
import Currency from "@/components/products/currency";

interface Product {
  product: ProductData;
}

const ProductCard :React.FC<Product>=({product})=> {
  const route = useRouter()
  const onClick = ()=>{
    route.push(`/product/${product.id}`)
  }
  return (
    <div onClick={onClick}  className="rounded-xl cursor-pointer bg-white group  border p-3 shadow-md">
      <div className="aspect-square relative bg-white rounded-xl">
        <CldImage
        removeBackground
        fill
          src={product.images[0].url}
          alt={product.name}
          className="aspect-square object-contain object-center rounded-xl "
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 ">
          <div className="flex justify-center gap-x-4">
            <ButtonIcon icon={<Scaling size={15} className="text-white" />} />
            <ButtonIcon
              icon={<ShoppingCart size={15} className="text-white" />}
            />
          </div>
        </div>
      </div>
      {/* discreption */}
      <div>
        <p className="font- text-lg text-primary-mainColor">
          {product.category.name}
        </p>
        <p className="text-sm font-semibold text-gray-700 m-0">{product.name}</p>
      </div>
      {/* price */}
        <Currency data={product.price} />
    </div>
  );
};

export default ProductCard;
