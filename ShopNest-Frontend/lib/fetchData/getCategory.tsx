import { Category } from "@/lib/StoreTypes"


const URL = `${process.env.NEXT_PUBLIC_STORE_URL}/categories`
const getCategory = async (categoryId:string): Promise<Category> => {
  const response = await fetch(`${URL}/${categoryId}`)
  return response.json()
}

export default getCategory