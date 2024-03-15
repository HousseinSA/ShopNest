'use client'
import z from 'zod'
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
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/hooks/ModalStateStore'
import { Modal } from './Modal'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  username: z.string().min(2).max(50)
})

const StoreModal = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  const { isOpen, onClose } = useModalStore()

  return (
    <Modal
      title='Create store'
      isOpen={isOpen}
      onClose={onClose}
      description='Add a new store to manage products and categories '
    >
      <div className='space-y-2 pb-2 py-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='E-Commerce '
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>store description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-5 w-full flex space-x-4 items-center justify-end'>
              <Button
                disabled={loading}
                variant='destructive'
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} variant='outline' type={'submit'}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}

export default StoreModal
