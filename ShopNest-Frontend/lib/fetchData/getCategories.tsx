  import { Category } from '@/lib/StoreTypes'
  import {userInfo} from '@/lib/userInfo'
  const getCategoriesData = async (): Promise<Category[]> => {
    const {storeId} = await userInfo()
    const url = `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/categories`
    const response = await fetch(url)
    return response.json()
  }
  export default getCategoriesData
