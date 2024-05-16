import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'


import prismaDB from '@/lib/prismaClient'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()

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
    const body = await req.json()
    const { label, imageUrl } = body
    if (!imageUrl && !label) {
      return new NextResponse('No imageUrl or label provided', { status: 400 })
    }
    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }

    const billboard = await prismaDB.billboard.create({
      data: {
        label,
        imageUrl,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log(`Billboard_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()

    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }

    const billboard = await prismaDB.billboard.findMany({
      where: {
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log(`Billboard_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
