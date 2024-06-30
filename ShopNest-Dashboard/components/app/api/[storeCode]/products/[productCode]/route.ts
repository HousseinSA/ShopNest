import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; productCode: string } }) {
  try {
    if (!params.productCode) {
      return new NextResponse('Product code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, price, images, colorCode, sizeCode, categoryCode, isFeatured, isArchived } = body

    if (!name && !price && !colorCode && !sizeCode && !categoryCode && !images) {
      return new NextResponse('No fields provided for update', { status: 400 })
    }

    // Check if a product with the same name already exists in this store, excluding the current product
    const existingProduct = await prismaDB.product.findFirst({
      where: {
        storeCode: params.storeCode,
        name: {
          equals: name,
          mode: 'insensitive'
        },
        NOT: {
          id: params.productCode
        }
      }
    })

    if (existingProduct) {
      return new NextResponse('Product with this name already exists', { status: 402 })
    }

    // Update the product
    await prismaDB.product.update({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        price,
        colorCode,
        sizeCode,
        categoryCode,
        isFeatured,
        isArchived,
        images: { deleteMany: {} } // Clear existing images
      }
    })

    // Add new images
      const product = await prismaDB.product.update({
        where: {
          id: params.productCode
        },
        data: {
          images: {
            createMany: {
              //@ts-ignore
              data: [...new Set(images.map((image: { url: string }) => image.url))].map(url => ({ url }))
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
    if (!params.productCode) {
      return new NextResponse('Product code is required', { status: 400 })
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
    if (!params.productCode) {
      return new NextResponse('Product code is required', { status: 400 })
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
