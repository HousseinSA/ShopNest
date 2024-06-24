import { Size } from "@/lib/StoreTypes"

const url = `${process.env.NEXT_PUBLIC_STORE_URL}/sizes`
const getSizes = async (): Promise<Size[]> => {
  const response = await fetch(url)
  return response.json()
}

export default getSizes
