import React from 'react'

interface SectionHeaderProps {
  title: string
  description: string
  children?: React.ReactNode
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, children }) => {
  return (
    <>
      <div className='flex flex-1 justify-between items-center space-y-2'>
        <div className='flex flex-col item-center'>
          <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
          <p className='text-sm text-[#437e41]'>{description}</p>
        </div>
        {children}
      </div>
    </>
  )
}

export default SectionHeader
