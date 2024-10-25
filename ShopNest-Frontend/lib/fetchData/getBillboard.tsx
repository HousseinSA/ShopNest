import { Billboard } from "@/lib/StoreTypes"

const url = `${process.env.NEXT_PUBLIC_STORE_URL}/billboards`
const getBillboard = async (): Promise<Billboard[]> => {
  const response = await fetch(`${url}`)
  return response.json()
}

export default getBillboard
