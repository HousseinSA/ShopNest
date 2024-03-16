import { create } from 'zustand'

interface ModalStoreProps {
  ModalOpenState: boolean
  openModal: () => void
  closeModal: () => void
}

export const useModalStore = create<ModalStoreProps>((set) => ({
  ModalOpenState: false,
  openModal: () => set({ ModalOpenState: true }),
  closeModal: () => set({ ModalOpenState: false })
}))
