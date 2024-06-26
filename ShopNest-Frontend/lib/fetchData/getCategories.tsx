import { Category } from "@/lib/StoreTypes"

const url = `${process.env.NEXT_PUBLIC_STORE_URL}/categories`
const getCategoriesData = async (): Promise<Category[]> => {
  const response = await fetch(url)
  return response.json()
}

export default getCategoriesData
