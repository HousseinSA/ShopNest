import { NextResponse } from 'next/server'

import prismaDB from '@/lib/prismaClient'
import { userInfo } from '@/lib/auth/userInfo'

export async function POST(req: Request) {
  const {userId} = await userInfo(params.storeCode)
  try {
  
    const body = await req.json()
    const { storeName } = body
    if (!storeName) {
      return new NextResponse('username is required', { status: 400 })
    }

    const store = await prismaDB.store.create({
      data: {
        storeName,
        userId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log(`STORES_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
