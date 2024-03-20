'use client'
import { Store } from '@prisma/client'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SettingsHeader from './SettingsHeader'
import StoreDeleteModal from '@/components/Modals/StoreDeleteModal'

interface storeSettingsProps {
  storeData: Store
}

const formSchema = z.object({
  username: z.string().min(2)
})
type formValues = z.infer<typeof formSchema>

// component
const StoreSettingsForm: React.FC<storeSettingsProps> = ({ storeData }) => {
  const [loading, setLoading] = useState(false)
  const route = useRouter()
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: storeData
  })
  // sending data to DB
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/stores/${storeData.id}`, values)
      if (response.data) {
        route.refresh()
        toast.success('Store update!')
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  // open store delete modal
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <StoreDeleteModal
        title='Delete Store?'
        description='Are you sure you want to delete store?'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className='flex flex-col space-y-4'>
        <SettingsHeader
          title={'Settings'}
          description={`Edit ${storeData?.storeName} store`}
          isOpen={setIsOpen}
        />
        <div className='grid md:grid-cols-3 lg:grid-cols-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='E-Commerce '
                        {...field}
                        defaultValue={storeData?.storeName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='mt-4'>
                <Button disabled={loading} className='ml-auto' type={'submit'}>
                  Update Store
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default StoreSettingsForm
