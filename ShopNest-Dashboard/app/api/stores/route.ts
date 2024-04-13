import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismaDB from '@/lib/prismaClient'
export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { storename } = body
    if (!storename) {
      return new NextResponse('username is required', { status: 400 })
    }

    const store = await prismaDB.store.create({
      data: {
        storename,
        userId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log(`STORES_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
