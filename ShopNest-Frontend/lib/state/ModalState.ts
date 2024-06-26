import {create} from "zustand";
import {Product} from '@/lib/StoreTypes'

interface PreviewModal {
    product?:Product
    isOpen: boolean
    open:(product:Product)=> void
    close:()=>void
}
 const usePreviewModal = create<PreviewModal>((set) => ({
  isOpen: false,
  product: undefined,
  open: (prod) =>
    set({
      product: prod,
      isOpen: true,
    }),
  close: () =>
    set({
      isOpen: false,
    }),
}))

 export default usePreviewModal