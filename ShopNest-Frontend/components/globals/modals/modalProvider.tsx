'use client'

import PreviewModal from "./previewModal"
import OnlyClient from "../OnlyClient"

const ModalProvider = ()=>{
    return (
        <OnlyClient>
        <PreviewModal/>
        </OnlyClient>
    )
}

export default ModalProvider