import {Product} from '@/lib/StoreTypes'
interface ProductProps{
productsData :Product[]
}
const product:React.FC<ProductProps> = ({productsData}) => {
  return (
    <div>product</div>
  )
}

export default product