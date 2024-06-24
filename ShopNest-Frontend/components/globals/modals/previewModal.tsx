import Modal from '@/components/globals/modals/modal'
import usePreviewModal  from '@/lib/state/ModalState'
import Gallery from '@/components/products/product/galleryComponent/gallery'
import Info from '@/components/products/product/info'

const PreviewModal = () => {
  const { product, isOpen, close } = usePreviewModal()
  if (!product) {
    return null
  }
  return <Modal open={isOpen} onClose={close}>
    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-12 items-start gap-y-6 lg:gap-x-6"  >
        <div className="sm:col-span-4 lg:col-span-5"  >
            <Gallery images={product.images}/>
        </div>
        <div className="sm:col-span-8 lg:col-span-8">
            <Info product={product} />
        </div>
    </div>
  </Modal>
}

export default PreviewModal
