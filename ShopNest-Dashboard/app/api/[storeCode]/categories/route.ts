import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'
import { userInfo } from '@/lib/userInfo'


export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const {userId} = await userInfo(params.storeCode)

    const body = await req.json()
    const { name, billboardCode } = body
    
    if (!name) {
      return new NextResponse('Category name is required', { status: 400 })
    }
    if (!params.storeCode) {
      return new NextResponse('No store code found', { status: 400 })
    }

    // Check if the store exists and belongs to the user
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
    const existingCategory = await prismaDB.category.findFirst({
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
          
          ]
        }
      }
    })

    if (existingCategory) {
      return new NextResponse('Category already exists', { status: 402 })
    }

    // Create the new category
    const category = await prismaDB.category.create({
      data: {
        name,
        billboardCode,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// getting categories 

export async function GET(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    if (!params.storeCode) {
      new NextResponse('store code is not valid.', { status: 400 })
    }

    const categories = await prismaDB.category.findMany({
      where: {
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
