import { Product } from "@/lib/StoreTypes"


const URL = `${process.env.NEXT_PUBLIC_STORE_URL}/products`
const getProduct = async (productId:string): Promise<Product> => {

  const response = await fetch(`${URL}/${productId}`)
  return response.json()
}

export default getProduct