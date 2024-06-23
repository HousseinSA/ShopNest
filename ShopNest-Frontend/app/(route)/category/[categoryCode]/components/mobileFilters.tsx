import { Size, Color } from '@/lib/StoreTypes';
interface FilterProps {
 colors:Color[]
 sizes:Size[]
}



const MobileFilters:React.FC<FilterProps> = ({sizes,colors}) => {
  return (
    <div>MobileFilters</div>
  )
}

export default MobileFilters