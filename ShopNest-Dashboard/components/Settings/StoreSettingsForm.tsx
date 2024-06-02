import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Store } from '@prisma/client'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// storeData props
interface StoreSettingsProps {
  storeData: Store
}

const StoreSettingsForm: React.FC<StoreSettingsProps> = ({ storeData }) => {
  // zod schema and type
  const formSchema = z.object({
    storename: z.string().min(2)
  })
  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: storeData
  })

  // state and route
  const [loading, setLoading] = useState(false)
  const route = useRouter()

  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/stores/${storeData.id}`, values)

      if (response.data) {
        toast.success('Store update!')
        route.refresh()
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='grid md:grid-cols-3 lg:grid-cols-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='storename'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='store name ' {...field} defaultValue={storeData?.storename} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-4'>
            <Button disabled={loading} className='ml-auto' type={'submit'}>
              {loading === true && <ClipLoader size={15} color='#fff' />} Update Store
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default StoreSettingsForm
