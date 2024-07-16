import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import MainNav from '@/components/Navigation/MainNav'
import prismaDB from '@/lib/prismaClient'
import StoreSwitcher from './StoreSwitcher'
import { ThemeToggler } from '@/lib/Providers/theme/ThemeToggler'

const Head = async () => {
  const { userId} = auth()
  if (!userId) {
    redirect('/')
  }
  const storeList = await prismaDB.store.findMany({ where: { userId } })

  return (
    <div className='border-b border'>
      <div className='flex items-center gap-4 h-16 p-4'>
        <StoreSwitcher stores={storeList } />
        <MainNav />
        <div className='ml-auto flex items-center space-x-3'>
          <ThemeToggler/>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default Head


