import { create } from 'zustand'

import { Category } from '@/lib/StoreTypes'

interface categoryProp {
  categoriesList: Category[]
  updateCategories: (list:Category[])=>void
}

const useCategoryList = create<categoryProp>((set) => ({
  categoriesList: [],
  updateCategories: (list: Category[]) =>
    set({
      categoriesList: list,
    }),
}))

export default useCategoryList
