import { redirect } from 'next/navigation'
<<<<<<< HEAD
=======
import { auth } from '@clerk/nextjs'
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
import React from 'react'

import validateObjectId from  '@/lib/mongodb/mongodDBValidate'

import prismaDB from '@/lib/prismaClient'
// import StoreSettingsForm from '@/components/StoreSettings/StoreSettings'
import StoreSettings from '@/components/Settings/StoreSettings'
<<<<<<< HEAD
import { userInfo } from '@/lib/auth/userInfo'
=======
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c

interface StoreSettingsProps {
  params: { storeCode: string }
}

const StorePage: React.FC<StoreSettingsProps> = async ({ params: { storeCode } }) => {
<<<<<<< HEAD
  const {userId} = await userInfo(storeCode)
=======
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
  const validateStoreCode = validateObjectId(storeCode)
  if (!validateStoreCode) {
    redirect('/')
  }

  const store = await prismaDB.store.findFirst({
    where: {
      id: storeCode,
      userId
    }
  })

  if (!store) {
    redirect('/')
  }

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreSettings storeData={store} />
    </div>
  )
}

export default StorePage
