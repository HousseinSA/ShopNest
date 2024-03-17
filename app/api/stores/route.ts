import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
    }
    const body = await req.json()
    const { username: storeName } = body
    if (!storeName) {
      return new NextResponse('username is required', { status: 400 })
    }

    const store = await prisma.store.create({
      data: {
        storeName,
        userId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log(`[STORES_POST]`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
