'use client'

import MainNav from '@/components/Navigation/MainNav'
import StoreSwitcher from './StoreSwitcher'
import MobileMenu from './MobileMenu'
import UserInfoWrap from './UserInfoWrap'
interface HeadProps {
  storeList: { id: string; storeName: string; userId: string; createdAt: Date; updatedAt: Date }[] | null
  customUser: { name: string; id: string; email?: string; image?: string }
}

const Head = (
  { storeList, customUser }: HeadProps

) => {
  return (
    <header className='py-4 flex items-center p-6 mx-auto transition duration-500 max-w-7xl'>
      <StoreSwitcher stores={storeList} />
      <div className='hidden lg:block ml-4'>
        <MainNav />
      </div>
      <div className='ml-auto flex items-center space-x-3'>
        <UserInfoWrap customUser={customUser} />
        <div className='block lg:hidden'>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default Head
