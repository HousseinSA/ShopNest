import { Billboard } from "@/lib/StoreTypes"

const url = `${process.env.NEXT_PUBLIC_STORE_URL}/billboards`
<<<<<<< HEAD
const getBillboard = async (): Promise<Billboard> => {
  const response = await fetch(`${url}`)
=======
const getBillboard = async (id:string): Promise<Billboard> => {
  const response = await fetch(`${url}/${id}`)
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
  return response.json()
}

export default getBillboard
