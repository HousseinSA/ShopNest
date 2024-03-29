import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; sizeCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.sizeCode) {
      return new NextResponse('size code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, value } = body
    if (!name && !value) {
      return new NextResponse('size name or billboard is missing', { status: 400 })
    }

    const size = await prismaDB.size.updateMany({
      where: {
        id: params.sizeCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        value
      }
    })

    return NextResponse.json(size)
  } catch (error) {
      console.log(`SIZE_PATCH`, error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string; sizeCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.sizeCode) {
      return new NextResponse('size code is required', { status: 400 })
    }

    const size = await prismaDB.size.findUnique({
      where: {
        id: params.sizeCode,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log(`SIZE_GET`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; sizeCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.sizeCode) {
      return new NextResponse('size code is required', { status: 400 })
    }

    const size = await prismaDB.size.deleteMany({
      where: {
        id: params.sizeCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(size)
  } catch (error) {
      console.log(`SIZE_DELETE`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
