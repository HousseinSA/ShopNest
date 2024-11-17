import { Category } from "@/lib/StoreTypes"
import { userInfo } from '@/lib/userInfo'


const getCategory = async (categoryId:string): Promise<Category> => {
  const {storeId} = await userInfo()
  // dynamic store
  const URL = `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/categories`
  const response = await fetch(`${URL}/${categoryId}`)
  return response.json()
}

export default getCategory