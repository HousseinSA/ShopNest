import { CldUploadWidget } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ImagePlus, Trash } from 'lucide-react'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string[]) => void // Change to accept array of strings
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  // mount on client render
  const [isMounted, setIsMounted] = useState(false)
  console.log(value)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // onUpload
  const onUpload = (result: any) => {
    console.log(result.info)
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button type='button' onClick={() => onRemove(url)} variant='destructive' size='sm'>
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image width={200} height={200} className='object-contain' alt='Image' src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset='q5jplcc9'>
        {({ open }) => {
          const onClick = () => {
            open()
          }
          return (
            <Button type='button' disabled={disabled} variant='secondary' onClick={onClick}>
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
