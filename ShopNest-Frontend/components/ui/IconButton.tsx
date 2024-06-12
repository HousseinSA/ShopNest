'use client'

import { useState } from "react"

interface Button {
 icon: React.ReactElement
}

const  ButtonIcon:React.FC<Button> = ({icon}) => {
    const [change, setChange] = useState(false)
  return (
    <button onClick={()=>setChange(!change)} className="rounded-full p-2 hover:scale-110 transition flex items-center justify-center border shadow-md bg-[#437e41]">
        {icon}
    </button>
  )
}

export default ButtonIcon