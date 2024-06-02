'use client'

import { CldUploadWidget } from 'next-cloudinary'
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
  const widgetOptions = {
    uploadPreset: 'q5jplcc9',
    clientAllowedFormats: ['image'],
    cropping: true,
    showAdvancedOptions: true,
    multiple: false,
    theme: 'white',
    styles: {
      palette: {
        window: "#FFFFFF",
        windowBorder: "#90A0B3",
        tabIcon: "#0078FF",
        menuIcons: "#5A616A",
        textDark: "#000000",
        textLight: "#FFFFFF",
        link: "#0078FF",
        action: "#FF620C",
        inactiveTabIcon: "#0E2F5A",
        error: "#F44235",
        inProgress: "#0078FF",
        complete: "#20B832",
        sourceBg: "#E4EBF1"
      },
      fonts: {
        default: null,
        "'Fira Sans', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Fira+Sans",
          active: true
        }
      },
      // Custom dimensions for the modal
      window: {
        height: '400px', // Set your desired height
        width: '600px', // Set your desired width
      },
    }
  }

  // onUpload
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <div>
      <div className=' flex items-center gap-4 my-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button type='button' onClick={() => onRemove(url)} variant='outline' className='rounded-full outline-none py-3 px-3 hover:bg-red-500 hover:opacity-100 opacity-50 group'>
                <Trash className=' h-4 w-4 group-hover:text-white' />
              </Button>
            </div>
            <Image fill className='object-cover' alt='Image' src={url} />
          </div>
        ))}
      </div>
  

      <CldUploadWidget   onUpload={onUpload} uploadPreset='q5jplcc9'>
        {({ open }) => {
          const handleClick = () => {
            if (typeof open === 'function') {
              open()
            } else {
              console.error('Open function is undefined or not a function')
            }
          }
          return (
            <Button type='button' disabled={disabled} variant='secondary' onClick={handleClick}>
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
