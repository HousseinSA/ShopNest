import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; billboardCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.billboardCode) {
      return new NextResponse('Billboard code is required', { status: 400 })
    }

    const body = await req.json()
    const { label, imageUrl } = body
    if (!label && !imageUrl) {
      return new NextResponse('No imageUrl or label provided', { status: 400 })
    }

    const billboard = await prismaDB.billboard.updateMany({
      where: {
        id: params.billboardCode,
        storeCode: params.storeCode
      },
      data: {
        label,
        imageUrl
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log(`BILLBOARD_BATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; billboardCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.billboardCode) {
      return new NextResponse('Billboard code is required', { status: 400 })
    }

    const billboard = await prismaDB.billboard.deleteMany({
      where: {
        id: params.billboardCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log(`BILLBOARD_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
