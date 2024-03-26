'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Billboard } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

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
  const action = billBoardData ? `Update billboard` : 'Create billboard'

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
      route.refresh()
      route.push(`/${params.storeCode}/billboards`)
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

// 'use client'

// import * as z from 'zod'
// import axios from 'axios'
// import React, { useState } from 'react'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { toast } from 'react-hot-toast'
// import { Trash } from 'lucide-react'
// import { Billboard } from '@prisma/client'
// import { useParams, useRouter } from 'next/navigation'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Separator } from '@/components/ui/separator'
// import AlertModal from '@/components/Modals/AlertModal'
// import ImageUpload from './imageUpload'

// const formSchema = z.object({
//   label: z.string().min(1),
//   imageUrl: z.string().min(1)
// })

// type BillboardFormValues = z.infer<typeof formSchema>

// interface billBoardData {
//   initialData: Billboard | null
// }

// export const BillBoardForm: React.FC<billBoardData> = ({ initialData }) => {
//   const params = useParams()
//   const router = useRouter()

//   const [open, setOpen] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const title = initialData ? 'Edit billboard' : 'Create billboard'
//   const description = initialData ? 'Edit a billboard.' : 'Add a new billboard'
//   const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.'
//   const action = initialData ? 'Save changes' : 'Create'

//   const form = useForm<BillboardFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData || {
//       label: '',
//       imageUrl: ''
//     }
//   })

//   const onSubmit = async (data: BillboardFormValues) => {
//     try {
//       setLoading(true)
//       if (initialData) {
//         await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
//       } else {
//         await axios.post(`/api/${params.storeId}/billboards`, data)
//       }
//       router.refresh()
//       router.push(`/${params.storeId}/billboards`)
//       toast.success(toastMessage)
//     } catch (error: any) {
//       toast.error('Something went wrong.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onDelete = async () => {
//     try {
//       setLoading(true)
//       await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
//       router.refresh()
//       router.push(`/${params.storeId}/billboards`)
//       toast.success('Billboard deleted.')
//     } catch (error: any) {
//       toast.error('Make sure you removed all categories using this billboard first.')
//     } finally {
//       setLoading(false)
//       setOpen(false)
//     }
//   }

//   return (
//     <>
//       <AlertModal title='delete' description='delete' isOpen={open} setIsOpen={() => setOpen(false)} onDelete={onDelete} loading={loading} />
//       <Separator />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
//           <FormField
//             control={form.control}
//             name='imageUrl'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Background image</FormLabel>
//                 <FormControl>
//                   <ImageUpload value={field.value ? [field.value] : []} disabled={loading} onChange={(url) => field.onChange(url)} onRemove={() => field.onChange('')} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className='md:grid md:grid-cols-3 gap-8'>
//             <FormField
//               control={form.control}
//               name='label'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Label</FormLabel>
//                   <FormControl>
//                     <Input disabled={loading} placeholder='Billboard label' {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button disabled={loading} className='ml-auto' type='submit'>
//             {action}
//           </Button>
//         </form>
//       </Form>
//     </>
//   )
// }
// export default BillBoardForm
