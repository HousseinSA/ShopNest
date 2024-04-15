import prismaDB from '@/lib/prismaClient'
import { useAuth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; categoryCode: string } }) {
  const { userId } = useAuth()
  try {
    if (!userId) {
      return new NextResponse('authorized user', { status: 401 })
    }
    if (!params.categoryCode) {
      return new NextResponse('category  code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, billboardCode } = body
    if (!name && !billboardCode) {
      return new NextResponse('Category name or billboard is missing', { status: 400 })
    }

    const category = await prismaDB.category.updateMany({
      where: {
        id: params.categoryCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        billboardCode
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log(`CATEGORY_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string; categoryCode: string } }) {
  try {
    if (!params.categoryCode) {
      return new NextResponse('category code is required', { status: 400 })
    }

    const category = await prismaDB.category.findUnique({
      where: {
        id: params.categoryCode,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log(`CATEGORY_GET`, error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; categoryCode: string } }) {
  try {
    if (!params.categoryCode) {
      return new NextResponse('Billboard code is required', { status: 400 })
    }

    const category = await prismaDB.category.deleteMany({
      where: {
        id: params.categoryCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log(`CATEGORY_DELETE`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
