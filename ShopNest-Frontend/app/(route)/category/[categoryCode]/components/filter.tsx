"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import qs from "query-string"
import { Size, Color } from "@/lib/StoreTypes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterProps {
  data: (Size | Color)[]
  name: string
  keyValue: string
}

const Filter: React.FC<FilterProps> = ({ data, name, keyValue }) => {
  const route = useRouter()
  const searchParams = useSearchParams()
  const selectedValue = searchParams.get(keyValue)
  console.log("search", window.location.search)
  console.log("pathname", window.location.pathname)

  const onClick = (id: string) => {
    const currentUrl = qs.parse(window.location.search)
    const query = {
      ...currentUrl,
      [keyValue]: id,
    }
    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query,
    })
    console.log("search", window.location.search)
    console.log("pathname", window.location.pathname)

    route.push(url)
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="font-bold text-lg">{name}</h3>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-2">
          {data.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Button style={{borderRadius:'50px'}}
                className={cn(
                  "border-primary-mainColor p-2 border bg-white text-black capitalize rounded-lg hover:text-white hover:bg-primary-hoverMain",
                  selectedValue === filter.id &&
                    "bg-primary-mainColor text-white"
                )}
                onClick={() => onClick(filter.id)}
              >
                {filter.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filter
