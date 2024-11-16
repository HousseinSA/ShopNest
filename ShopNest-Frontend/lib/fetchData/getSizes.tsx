import { Size } from "@/lib/StoreTypes"
import { userInfo } from '@/lib/userInfo'


const getSizes = async (): Promise<Size[]> => {
  const {storeId} = await userInfo()
  const url = `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/sizes`

  const response = await fetch(url)
  return response.json()
}

export default getSizes
