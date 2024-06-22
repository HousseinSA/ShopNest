'use client'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/hooks/StoreState'
import { Modal } from './Modal'
import { Button } from '@/components/ui/button'
import { ToastError } from '../GlobalComponent/Toast'

const formSchema = z.object({
  storeName: z.string().min(2).max(50)
})

const StoreModal = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: ''
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
      ToastError('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const { ModalOpenState, closeModal } = useModalStore()

  return (
    <Modal title='Create store' isOpen={ModalOpenState} onClose={closeModal} description='Add a new store to manage products and categories '>
      <div className='space-y-2 pb-2 py-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='storeName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='E-Commerce ' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-5 w-full flex space-x-4 items-center justify-end'>
              <Button disabled={loading} variant='destructive' onClick={closeModal}>
                Cancel
              </Button>
              <Button disabled={loading} variant='outline' type={'submit'}>
                {loading === true && <ClipLoader size={4} color='#000' />} Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}

export default StoreModal
