import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
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
    const body = await req.json()
    const { name, price, images, colorCode, brand, description, sizeCode, categoryCode, isFeatured, isArchived } = body
    if (!name && !price && !colorCode && !sizeCode && !categoryCode && !images) {
      return new NextResponse('Some fields are not provided', { status: 400 })
    }
    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }
    // Check if a product with the same name already exists in this store
    const existingProduct = await prismaDB.product.findFirst({
      where: {
        storeCode: params.storeCode,
        AND: {
          OR: [
            {
              name: {
                equals: name,
                mode: 'insensitive'
              }
            }
          ]
        }
      }
    })

    if (existingProduct) {
      return new NextResponse('Product already exists', { status: 402 })
    }

    const product = await prismaDB.product.create({
      data: {
        name,
        price,
        colorCode: colorCode,
        sizeCode: sizeCode,
        brand,        
        description,
        categoryCode: categoryCode,
        storeCode: params.storeCode,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log(`PRODUCT_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string } }) {
  const { searchParams } = new URL(req.url)
  const categoryCode = searchParams.get('categoryCode') || undefined
  const sizeCode = searchParams.get('sizeCode') || undefined
  const colorCode = searchParams.get('colorCode') || undefined
  const isFeatured = searchParams.get('isFeatured')
  try {
    const { userId } = auth()

    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }

    const product = await prismaDB.product.findMany({
      where: {
        storeCode: params.storeCode,
        categoryCode,
        colorCode,
        sizeCode,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include: { images: true, category: true, size: true, color: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log(`PRODUCTS_GET`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
