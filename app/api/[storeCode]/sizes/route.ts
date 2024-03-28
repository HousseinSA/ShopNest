import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
    }

    const body = await req.json()
    const { name, value } = body
    if (!name && !value) {
      return new NextResponse('size name and size value is required', { status: 400 })
    }
    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }
    // checking is there is store by this user
    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeCode,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('unauthorized user', { status: 400 })
    }

    const size = await prismaDB.size.create({
      data: {
        name,
        value,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(size)
  } catch (error) {
    console.log(`SIZE_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
    }

    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }

    const sizes = await prismaDB.size.findMany({
      where: {
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(sizes)
  } catch (error) {
    console.log(`SIZE_GET`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
