'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Color } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormButton from '@/components/GlobalComponent/FormButton'
import {ToastSuccess, ToastError} from '@/components/GlobalComponent/Toast'


interface ColorFormProps {
  colorData: Color | null
  colors: Color[]
}

const ColorForm: React.FC<ColorFormProps> = ({ colorData, colors }) => {
  const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4, { message: 'add a color' })
  })
  type formValues = z.infer<typeof formSchema>
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: colorData || {
      name: '',
      value: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const route = useRouter()
  const params = useParams()

  const toastMessage = colorData ? `Color updated!` : 'Color created!'
  const action = colorData ? (loading ? 'Updating color' : 'Update color') : loading ? 'Creating color' : 'Create color'

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (colorData) {
        await axios.patch(`/api/${params.storeCode}/colors/${params.colorCode}`, values)
      } else {
        await axios.post(`/api/${params.storeCode}/colors`, values)
      }
      route.push(`/${params.storeCode}/colors`) 
      route.refresh()
      ToastSuccess(toastMessage)
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
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Color Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Value</FormLabel>
                  <FormControl>
                    <div className=' flex items-center space-x-4 '>
                      <Input disabled={loading} placeholder='Color Value' value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                      <input type='color' className='color-picker' disabled={loading} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-4'>
            <FormButton loading={loading} action={action} />
          </div>
        </form>
      </Form>
    </>
  )
}

export default ColorForm
