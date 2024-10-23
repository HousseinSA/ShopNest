import React from 'react'
import MainNav from './Navigation/MainNav'
import { ThemeToggler } from '../lib/Providers/theme/ThemeToggler'
<<<<<<< HEAD
=======
import { UserButton } from '@clerk/nextjs'
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c

const OnErrorDashboard = () => {
  return (
    <div className='border-b border'>
      <div className='flex items-center gap-4 h-16 p-4'>
        <MainNav />
<<<<<<< HEAD
=======
        <div className='ml-auto flex items-center space-x-3'>
          <ThemeToggler/>
          <UserButton afterSignOutUrl='/' />
        </div>
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
      </div>
    </div>
  )
}

export default OnErrorDashboard