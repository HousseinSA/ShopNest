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
      return new NextResponse('unauthorized user', { status: 400 })
    }
    const body = await req.json()
    const { name, price, color, size, category, image } = body
    if (!name && !price && !color && !size && !category && !image) {
      return new NextResponse('Some fields are not provided', { status: 400 })
    }
    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }

    const product = await prismaDB.product.create({
      data: {
        name,
        price,
        colorCode: color,
        sizeCode: size,
        categoryCode: category,
        storeCode: params.storeCode
      }
    })
    // const Image = await prismaDB.image.create({
    //   data: {
    //     imageUrl: image
    //   }
    // })
    return NextResponse.json(product)
  } catch (error) {
    console.log(`PRODUCT_POST`, error)
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

    const product = await prismaDB.product.findMany({
      where: {
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log(`PRODUCT_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
