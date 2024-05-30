import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()

    const body = await req.json()
    const { name, value } = body
    if (!name && !value) {
      return new NextResponse('color name and value are required', { status: 400 })
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
      return new NextResponse('Unauthorized user', { status: 400 })
    }

  // Check if a category with the same name already exists in this store
  const existingSize = await prismaDB.color.findFirst({
    where: {
      name,
      storeCode: params.storeCode
    }
  })

  if (existingSize) {
    return new NextResponse('size with this name already exists', { status: 402 })
  }


    const color = await prismaDB.color.create({
      data: {
        name,
        value,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(color)
  } catch (error) {
    console.log(`COLOR_POST`, error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()

    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }

    const colors = await prismaDB.color.findMany({
      where: {
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(colors)
  } catch (error) {
    console.log(`CATEGORY_GET`, error)
    console.log(`CATEGORY_DELETE`, error)
    console.log(`CATEGORY_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
