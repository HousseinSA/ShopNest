'use client'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import OnlyClient from '../globals/OnlyClient'

interface OverViewProps {
  data: any[]
}
const Overview: React.FC<OverViewProps> = ({ data }) => {
  return (
    // <OnlyClient>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={data}>
          <XAxis dataKey={'name'} stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <Bar dataKey='total' fill='#16A34A' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    // </OnlyClient>
  )
}

export default Overview
