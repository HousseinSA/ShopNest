import { Product } from "@/lib/StoreTypes"
import { userInfo } from '@/lib/userInfo'

const getProduct = async (productId:string): Promise<Product> => {
  const {storeId} = await userInfo()
  const URL = `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/products`
  const response = await fetch(`${URL}/${productId}`)

  return response.json()
}


export default getProduct