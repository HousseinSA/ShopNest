import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; productCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.productCode) {
      return new NextResponse('product code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, price } = body
    if (!name && !price) {
      return new NextResponse('No name or price provided', { status: 400 })
    }

    const product = await prismaDB.product.updateMany({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        price
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log(`PRODUCT_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string; productCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.productCode) {
      return new NextResponse('product code is required', { status: 400 })
    }

    const product = await prismaDB.product.findUnique({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log(`PRODUCT_GET`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; productCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }

    if (!params.productCode) {
      return new NextResponse('product code is required', { status: 400 })
    }

    const product = await prismaDB.product.deleteMany({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log(`PRODUCT_DELETE`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
