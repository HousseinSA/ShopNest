'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Category, Color, Image, Product, Size } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { PulseLoader } from 'react-spinners'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ImageUpload from '@/components/GlobalComponent/ImageUpload'
import ItemsSelector from '@/components/GlobalComponent/ItemsSelector'

// productData props
interface StoreProductProps {
  productData: (Product & { images: Image[] }) | undefined
  sizes: Size[]
  colors: Color[]
  categories: Category[]
}

const ProductForm: React.FC<StoreProductProps> = ({ productData, sizes, colors, categories }) => {
  // zod schema and type
  const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 character long.' }),
    price: z.coerce.number().min(1, { message: 'Price must be at least 1.' }),
    images: z.object({ url: z.string().min(2, { message: 'Image URL must be provided' }) }).array(),
    colorCode: z.string().min(2, { message: 'Color must be provided.' }),
    sizeCode: z.string().min(2, { message: 'Size must be provided.' }),
    categoryCode: z.string().min(2, { message: 'Category must be provided.' }),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
  })
  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: productData
      ? { ...productData, price: parseFloat(String(productData?.price)) }
      : {
          name: '',
          price: 0,
          colorCode: '',
          sizeCode: '',
          categoryCode: '',
          images: [],
          isFeatured: false,
          isArchived: false
        }
  })

  // state and route
  const [loading, setLoading] = useState(false)
  const route = useRouter()
  const params = useParams()

  // conditions if there is not productData
  const toastMessage = productData ? `product updated!` : ' product Created!'
  const action = productData ? `Update product` : 'Create product'
  //d sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (productData) {
        await axios.patch(`/api/${params.storeCode}/products/${params.productCode}`, values)
      } else {
        await axios.post(`/api/${params.storeCode}/products`, values)
      }
      // route refresh and message
      route.push(`/${params.storeCode}/products`)
      route.refresh()
      toast.success(toastMessage)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid md:grid-cols-3 gap-8 lg:grid-cols-4'>
            <FormField
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product price</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Product price' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem className={`${field.value.length !== 0 && 'col-span-full'}`}>
                  <FormLabel>Images</FormLabel>
                  <FormControl className='col-span-4 m-0'>
                    <ImageUpload value={field.value.map((image) => image.url)} disabled={loading} onChange={(url) => field.onChange([...field.value, { url }])} onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='categoryCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product category</FormLabel>
                  <FormControl>
                    <ItemsSelector items={categories} itemType='category' value={field.value} defaultValue={field.value} valueChange={field.onChange} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='colorCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product color</FormLabel>
                  <FormControl>
                    <ItemsSelector items={colors} itemType='color' value={field.value} defaultValue={field.value} valueChange={field.onChange} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='sizeCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product size</FormLabel>
                  <FormControl>
                    <ItemsSelector items={sizes} itemType='size' value={field.value} defaultValue={field.value} valueChange={field.onChange} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='isFeatured'
              render={({ field }) => (
                <FormItem className='flex space-x-5 space-y-0 rounded-md p-4 border bg-slate-100'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-0'>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>Product will show in home page</FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='isArchived'
              render={({ field }) => (
                <FormItem className='flex space-x-5 space-y-0 rounded-md p-4 border bg-slate-100'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-0'>
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>Product will not show anywhere in store</FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-4'>
            <Button disabled={loading} className='flex items-center gap-2' type={'submit'}>
              {loading === true && <PulseLoader size={4} color='#fff' />} {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default ProductForm
