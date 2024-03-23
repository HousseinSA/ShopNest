'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Billboard } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ImageUpload from './imageUpload'

// billBoardData props
interface BillboardFormProps {
  billBoardData: Billboard | null
}

const BillBoardForm: React.FC<BillboardFormProps> = ({ billBoardData }) => {
  // zod schema and type
  const formSchema = z.object({
    label: z.string().min(1, { message: 'Label must be at least 2 characters.' }),
    imageUrl: z.string().min(1).optional()
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: billBoardData || {
      label: '',
      imageUrl: ''
    }
  })

  // state and route
  const [loading, setLoading] = useState(false)
  const route = useRouter()

  // conditions if there is not billboardData
  const toastMessage = billBoardData ? `Billboard update!` : ' Billboard created!'
  const action = billBoardData ? `Save changes ${billBoardData?.label}` : 'Create billboard'

  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/stores/${billBoardData.id}`, values)
      if (response.data) {
        route.refresh()
        toast.success(toastMessage)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='grid md:grid-cols-3 gap-8 lg:grid-cols-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='imageUrl'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload disabled={loading} value={field.value ? [field.value] : []} onChange={(url) => field.onChange(url)} onRemove={() => field.onChange('')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='label'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard label</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='billboard name' {...field} defaultValue={billBoardData?.label} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-4'>
            <Button disabled={loading} className='ml-auto' type={'submit'}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default BillBoardForm
