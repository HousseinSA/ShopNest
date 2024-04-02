import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; colorCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.colorCode) {
      return new NextResponse('color code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, value } = body
    if (!name && !value) {
      return new NextResponse('color name and value are required', { status: 400 })
    }

    const color = await prismaDB.color.updateMany({
      where: {
        id: params.colorCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        value
      }
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log(`COLOR_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string; colorCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.colorCode) {
      return new NextResponse('color code is required', { status: 400 })
    }

    const color = await prismaDB.color.findUnique({
      where: {
        id: params.colorCode,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log(`COLOR_GET`, error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; colorCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.colorCode) {
      return new NextResponse('color code is required', { status: 400 })
    }

    const color = await prismaDB.color.deleteMany({
      where: {
        id: params.colorCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(color)
  } catch (error) {
    console.log(`COLOR_DELETE`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
