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
    const { name, billboardCode } = body
    if (!name) {
      return new NextResponse('category name is required', { status: 400 })
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

    const category = await prismaDB.category.create({
      data: {
        name,
        billboardCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log(`CATEGORY_POST`, error)

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

    const categories = await prismaDB.category.findMany({
      where: {
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.log(`CATEGORY_GET`, error)
    console.log(`CATEGORY_DELETE`, error)
    console.log(`CATEGORY_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
