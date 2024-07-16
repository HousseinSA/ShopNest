import React from 'react'
import MainNav from './Navigation/MainNav'
import { ThemeToggler } from '../lib/Providers/theme/ThemeToggler'
import { UserButton } from '@clerk/nextjs'

const OnErrorDashboard = () => {
  return (
    <div className='border-b border'>
      <div className='flex items-center gap-4 h-16 p-4'>
        <MainNav />
        <div className='ml-auto flex items-center space-x-3'>
          <ThemeToggler/>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default OnErrorDashboard