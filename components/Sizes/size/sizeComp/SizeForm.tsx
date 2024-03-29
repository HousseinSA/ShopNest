'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Size } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ItemsSelector from '@/components/GlobalComponent/ItemsSelector'

// billBoardData props
interface SizeForm {
  sizeData: Size | null
  sizes: Size[] | null
}

const CategoryForm: React.FC<SizeForm> = ({ sizeData, sizes }) => {
  // zod schema and type
  const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: sizeData || {
      name: '',
      value: ''
    }
  })

  // state and route
  const [loading, setLoading] = useState(false)
  const route = useRouter()
  const params = useParams()

  // conditions if there is not billboardData
  const toastMessage = sizeData ? `size updated!` : ' size created!'
  const action = sizeData ? `Update size` : 'Create size'

  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (sizeData) {
        await axios.patch(`/api/${params.storeCode}/sizes/${params.sizeCode}`, values)
      } else {
        await axios.post(`/api/${params.storeCode}/sizes`, values)
      }
      // route refresh and message
      route.push(`/${params.storeCode}/sizes`)
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
          <div className='grid md:grid-cols-3 gap-8 lg:grid-cols-6'>
            <FormField
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>size name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='size name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>values</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='size value' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-4'>
            <Button disabled={loading} className='ml-auto' type={'submit'}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CategoryForm
