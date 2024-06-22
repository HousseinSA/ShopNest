import qs , {StringifiableRecord} from 'query-string'

import { Product } from "@/lib/StoreTypes"

interface Query extends StringifiableRecord {
  categoryCode?:string
  colorCode?:string
  sizeCode?:string
  isFeatured?:boolean
}

const URL = `${process.env.NEXT_PUBLIC_STORE_URL}/products`
const getProducts = async (query:Query): Promise<Product[]> => {

  const url = qs.stringifyUrl({
    url: URL,
    query
  })
  
  const response = await fetch(`${url}`)
  return response.json()
}

export default getProducts