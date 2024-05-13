'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Billboard } from '@prisma/client'
import { ClipLoader } from 'react-spinners'
import { useParams, useRouter } from 'next/navigation'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ImageUpload from '@/components/GlobalComponent/ImageUpload'

// billBoardData props
interface BillboardFormProps {
  billBoardData: Billboard | null
}

const BillBoardForm: React.FC<BillboardFormProps> = ({ billBoardData }) => {
  // zod schema and type
  const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
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
  const params = useParams()

  // conditions if there is not billboardData
  const toastMessage = billBoardData ? `Billboard update!` : ' Billboard created!'
  const action  = billBoardData ?(loading? "Updating billboard": "Update billboard"):(loading? 'Creating billboard':'Create billboard')

  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      if (billBoardData) {
        await axios.patch(`/api/${params.storeCode}/billboards/${params.billboardCode}`, values)
      } else {
        await axios.post(`/api/${params.storeCode}/billboards`, values)
      }
      // route refresh and message
      route.push(`/${params.storeCode}/billboards`)
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
                  <Input disabled={loading} placeholder='billboard name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-4'>
            <Button disabled={loading} className='flex items-center gap-2' type={'submit'}>
              {loading === true && <ClipLoader size={15} color='#fff' />} {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default BillBoardForm
