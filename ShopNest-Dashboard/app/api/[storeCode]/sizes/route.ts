import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'
import { userInfo } from '@/lib/userInfo'
export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const {userId} = await userInfo(params.storeCode)

    const body = await req.json()
    const { name, value } = body
    if (!name && !value) {
      return new NextResponse('size name and size value is required', { status: 400 })
    }
    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
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

  
    // Check if a category with the same name already exists in this store
    const existingSize = await prismaDB.size.findFirst({
      where: {
        storeCode: params.storeCode,
        AND: {
          OR: [
            {
              name: {
                equals: name,
                mode: 'insensitive'
              }
            },
            {
              value
            }
          ]
        }
      }
    })

    if (existingSize) {
      return new NextResponse('Size name or value already exists', { status: 402 })
    }


    const size = await prismaDB.size.create({
      data: {
        name,
        value,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(size)
  } catch (error) {
    console.log(`SIZE_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    if (!params.storeCode) {
      new NextResponse('No store code found', { status: 400 })
    }

    const sizes = await prismaDB.size.findMany({
      where: {
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(sizes)
  } catch (error) {
    console.log(`SIZE_GET`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
