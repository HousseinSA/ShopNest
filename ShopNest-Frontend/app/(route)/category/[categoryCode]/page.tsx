import React from "react"

import getProducts from "@/lib/fetchData/getProducts"
import getSizesData from "@/lib/fetchData/getSize"
import getColorsData from "@/lib/fetchData/getColor"
import getCategory from "@/lib/fetchData/getCategory"
import Container from "@/components/ui/container"
import Billboard from "@/components/billboard"
import Filter from "./components/filter"
export const revalidate = 0

interface categoryProps {
  params: {
    categoryCode: string
  }
  searchParams: {
    colorCode: string
    sizeCode: string
  }
}
const CategoryPage: React.FC<categoryProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryCode: params.categoryCode,
    colorCode: searchParams.colorCode,
    sizeCode: searchParams.sizeCode,
  })

  const sizes = await getSizesData()
  const colors = await getColorsData()
  const category = await getCategory(params.categoryCode)

  return (
    <div className="bg-white">
      <Container>
        <Billboard billboardData={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6 ">
            <div className="lg:block hidden">
              <Filter keyValue='sizeId' name='Sizes' data={sizes}/>
              
              </div>{" "}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage
