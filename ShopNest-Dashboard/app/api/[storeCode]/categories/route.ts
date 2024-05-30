import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()
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
        name,
        storeCode: params.storeCode
      }
    })

    if (existingCategory) {
      return new NextResponse('Category with this name already exists', { status: 402 })
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
    console.log(`CATEGORY_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
