import { Color } from "@/lib/StoreTypes"
import { userInfo } from '@/lib/userInfo'


const getColors = async (): Promise<Color[]> => {
  const {storeId} = await userInfo()
  const url = `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/sizes`

  const response = await fetch(url)
  return response.json()
}

export default getColors
