import { Billboard } from "@/lib/StoreTypes"
import { userInfo } from "@/lib/userInfo"

const getBillboard = async (): Promise<Billboard[]> => {
  const {storeId} = await userInfo()

  const url = `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/billboards`
  const response = await fetch(`${url}`)
  return response.json()
}

export default getBillboard
