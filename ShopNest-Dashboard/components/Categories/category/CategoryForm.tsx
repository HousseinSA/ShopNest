'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { Category, Billboard } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'


import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormButton from '@/components/GlobalComponent/FormButton'

import ItemsSelector from '@/components/GlobalComponent/ItemsSelector'
import {ToastSuccess, ToastError} from '@/components/GlobalComponent/Toast'


// billBoardData props
interface categoryFormProps {
  categoryData: Category | null
  billboards: Billboard[] 
}

const CategoryForm: React.FC<categoryFormProps> = ({ categoryData, billboards }) => {
  // zod schema and type
  const formSchema = z.object({ 
    name: z.string().min(1),
    billboardCode: z.string().min(1, { message: "select a billboard" })
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: categoryData || {
      name: '',
      billboardCode: ''
    }
  })

  // state and route
  const [loading, setLoading] = useState(false)
  const route = useRouter()
  const params = useParams()

  // conditions if there is not billboardData
  const toastMessage = categoryData ? `Category updated!` : ' Category created!'
const action  = categoryData ?(loading? "Updating category": "Update category"):(loading? 'Creating category':'Create category')
  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (categoryData) {
        await axios.patch(`/api/${params.storeCode}/categories/${params.categoryCode}`, values)
      } else {
        await axios.post(`/api/${params.storeCode}/categories`, values)
      }
      // Route refresh and success message
      route.push(`/${params.storeCode}/categories`)
      ToastSuccess(toastMessage)
      route.refresh()
    } catch (error) {
      if (error.response?.status === 402) {
        ToastError(error.response.data)
      } else {
        ToastError('Something went wrong')
      }
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
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='category name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='billboardCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <ItemsSelector items={billboards} itemType='billboard' value={field.value} defaultValue={field.value} valueChange={field.onChange} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-4'>
          <FormButton loading={loading} action={action}/>

          </div>
        </form>
      </Form>
    </>
  )
}

export default CategoryForm
