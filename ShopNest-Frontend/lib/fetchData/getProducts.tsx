import qs , {StringifiableRecord} from 'query-string'

import { Product } from "@/lib/StoreTypes"
import { userInfo } from '@/lib/userInfo'

interface Query extends StringifiableRecord {
  categoryCode?:string
  colorCode?:string
  sizeCode?:string
  isFeatured?:boolean
}

const getProducts = async (query:Query): Promise<Product[]> => {
  const {storeId} = await userInfo()
  const URL = `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/products`
  const url = qs.stringifyUrl({
    url: URL,
    query
  })
  const response = await fetch(url)
  return response.json()
}

export default getProducts