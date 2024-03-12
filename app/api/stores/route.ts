import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismaDB from '@/lib/prismaClient'

export async function POST(req: Request) {
  const { userId } = auth()
  console.log(userId)
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
    }
    const body = await req.json()
    const { username: name } = body
    if (!name) {
      return new NextResponse('username is required', { status: 400 })
    }
    console.log(name)
    const store = await prismaDB.store.create({
      data: {
        username: name,
        userId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log(`[STORES_POST]`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
