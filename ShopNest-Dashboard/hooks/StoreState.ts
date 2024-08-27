import { create } from 'zustand'
// modal_state
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

// action state

interface ActionState {
  openProductId: string | null
  toggleDropDown: (productId: string) => void
  closeDropDown: () => void
}

export const useActionState = create<ActionState>((set, get) => ({
  openProductId: null,
  toggleDropDown: (productId: string) => {
    const { openProductId } = get()
    set({ openProductId: openProductId === productId ? null : productId })
  },
  closeDropDown: () => set({ openProductId: null })
}))



// mobile Menu state 

interface MobileMenuState {
  isOpen:boolean
  setIsOpen:()=>void
}

export const useMobileMenuState = create<MobileMenuState>((set, get)=>({
  isOpen:false, 
  setIsOpen:()=> set({ isOpen:!get().isOpen })
}))