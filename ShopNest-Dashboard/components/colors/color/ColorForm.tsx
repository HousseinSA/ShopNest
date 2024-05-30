'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Color } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// billBoardData props
interface ColorFormProps {
  colorData: Color | null
  colors: Color[] | null
}

const ColorForm: React.FC<ColorFormProps> = ({ colorData, colors }) => {
  // zod schema and type
  const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4)
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: colorData || {
      name: '',
      value: ''
    }
  })

  // state and route
  const [loading, setLoading] = useState(false)
  const route = useRouter()
  const params = useParams()

  // conditions if there is not billboardData
  const toastMessage = colorData ? `color updated!` : ' color created!'
  const action  = colorData ?(loading? "Updating color": "Update color"):(loading? 'Creating color':'Create color')

  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (colorData) {
        await axios.patch(`/api/${params.storeCode}/colors/${params.colorCode}`, values)
      } else {
        await axios.post(`/api/${params.storeCode}/colors`, values)
      }
      // route refresh and message
      route.push(`/${params.storeCode}/colors`)
      route.refresh()
      toast.success(toastMessage)
    } catch (error) {
      if (error.response?.status === 402) {
        toast.error('A color with this name already exists.')
      } else {
        toast.error('Something went wrong')
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
                  <FormLabel>color name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='color name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color value</FormLabel>
                  <FormControl>
                    <div className='flex items-center space-x-4'>
                      <Input disabled={loading} placeholder='color value' {...field} />
                      <input type='color' className='color-picker' disabled={loading} {...field} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-4'>
            <Button disabled={loading} className='flex items-center gap-2' type={'submit'}>
              {loading === true && <ClipLoader size={15} color='#fff' />}
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default ColorForm
