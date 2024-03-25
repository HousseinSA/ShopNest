'use client'
import Image from 'next/image'
import { ImagePlus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui/button'
interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}
const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  // mounted on first render
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  // upload image function
  const onSuccess = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className='flex items-center gap-4 '>
        {value.map((url) => {
          return (
            <div key={url} className='relative w-[200] h-[200] rounded-md overflow-hidden'>
              <div className='absolute top-2 z-10 right-2'>
                <Button variant='destructive' size='icon' onClick={() => onRemove(url)}>
                  <Trash2 className='w-5 h-5 ' />
                </Button>
              </div>
              <Image className='object-cover' width={200} height={200} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={url} alt='image' />
            </div>
          )
        })}
      </div>
      <CldUploadWidget onSuccess={onSuccess} uploadPreset='q5jplcc9'>
        {({ open }) => {
          return (
            <Button variant='secondary' disabled={disabled} onClick={() => open()}>
              <ImagePlus className='w-5 h-5 mr-2 ' /> Upload an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
