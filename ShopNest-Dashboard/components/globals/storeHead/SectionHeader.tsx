import React from 'react'

interface SectionHeaderProps {
  title: string
  description: string
  children?: React.ReactNode
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, children }) => {
  return (
    <>
      <div className='flex flex-1 justify-between items-center '>
        <div className='flex flex-col item-center'>
          <h1 className='text-xl sm:text-3xl font-bold tracking-tight text-primary'>{title}</h1>
          <p className='text-sm text-secondary-foreground '>{description}</p>
        </div>
        {children}
      </div>
    </>
  )
}

export default SectionHeader
