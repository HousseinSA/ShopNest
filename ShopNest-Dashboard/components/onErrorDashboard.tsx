import React from 'react'
import MainNav from './Navigation/MainNav'
import { ThemeToggler } from '../lib/Providers/theme/ThemeToggler'

const OnErrorDashboard = () => {
  return (
    <div className='border-b border'>
      <div className='flex items-center gap-4 h-16 p-4'>
        <MainNav />
      </div>
    </div>
  )
}

export default OnErrorDashboard