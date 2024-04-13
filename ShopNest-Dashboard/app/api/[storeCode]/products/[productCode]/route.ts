import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; productCode: string } }) {
  try {
    const { userId } = auth()

    if (!params.productCode) {
      return new NextResponse('product code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, price, images, colorCode, sizeCode, categoryCode, isFeatured, isArchived } = body
    if (!name && !price && !colorCode && !sizeCode && !categoryCode && !images) {
      return new NextResponse('No name or price provided', { status: 400 })
    }

    await prismaDB.product.update({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        price,
        colorCode: colorCode,
        sizeCode: sizeCode,
        categoryCode: categoryCode,
        isFeatured,
        isArchived,
        images: { deleteMany: {} }
      }
    })

    const product = await prismaDB.product.update({
      where: {
        id: params.productCode
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        }
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

    if (!params.productCode) {
      return new NextResponse('product code is required', { status: 400 })
    }

    const product = await prismaDB.product.findUnique({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      },
      include: { images: true, category: true, size: true, color: true }
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
