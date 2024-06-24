import { Color } from "@/lib/StoreTypes"

const url = `${process.env.NEXT_PUBLIC_STORE_URL}/colors`
const getColors = async (): Promise<Color[]> => {
  const response = await fetch(url)
  return response.json()
}

export default getColors
