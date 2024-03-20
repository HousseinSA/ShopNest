import React from 'react'
import z from 'zod'
import { Store } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/hooks/ModalStateStore'

const formSchema = z.object({
  username: z.string().min(2).max(50)
})
interface DefaultValue {
  storeData: Store
}

const StoreForm = ({ storeData }: DefaultValue | undefined) => {
  const { closeModal } = useModalStore()

  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: storeData || {
      username: ''
    }
  })

  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/stores', values)
      if (response.data) {
        const { id } = response.data
        window.location.assign(`/${id}`)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder='E-Commerce '
                  {...field}
                  value={storeData?.storeName}
                />
              </FormControl>
              {/* <FormDescription>store description</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-5 w-full flex space-x-4 items-center justify-end'>
          <Button disabled={loading} variant='destructive' onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={loading} variant='outline' type={'submit'}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default StoreForm
