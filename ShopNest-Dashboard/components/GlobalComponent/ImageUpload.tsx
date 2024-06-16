'use client'

import { CldUploadWidget, CldImage } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ImagePlus, Trash } from 'lucide-react'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  // mount on client render
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // onUpload
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <div>
      <div className='flex flex-wrap gap-4 my-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[250px] h-[250px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden'>
            <div className='absolute top-2 right-2 z-10'>
              <Button type='button' title='Delete product' onClick={() => onRemove(url)} variant='outline' className='rounded-full outline-none py-3 px-3 hover:bg-red-500 hover:opacity-100 opacity-50 group'>
                <Trash className='h-4 w-4 group-hover:text-white' />
              </Button>
            </div>
            <CldImage
              src={url}
              removeBackground
              alt={'uploaded image'}
              width={350}
              height={350}
              className='rounded-lg'
            />
          </div>
        ))}
      </div>

      <CldUploadWidget options={{
        styles:{
          palette: {
            window: "#FFF",
            windowBorder: "#90A0B3",}
        }
      }}   onUpload={onUpload} uploadPreset='q5jplcc9'>
        {({ open, }) => (
          <Button type='button' disabled={disabled} variant='secondary' onClick={() => open?.()}>
            <ImagePlus className='h-4 w-4 mr-2' />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
