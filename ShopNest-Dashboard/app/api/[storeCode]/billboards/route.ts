import { NextResponse } from 'next/server'

import prismaDB from '@/lib/prismaClient'
import { userInfo } from '@/lib/auth/userInfo'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  const {userId} = await userInfo(params.storeCode)
  try {
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

    const body = await req.json()
    const { label, imageUrl } = body

    if (!imageUrl || !label) {
      return new NextResponse('No imageUrl or label provided', { status: 400 })
    }

    if (!params.storeCode) {
      return new NextResponse('No store code found', { status: 400 })
    }

    // Check if a billboard with the same label already exists in this store
    const existingBillboard = await prismaDB.billboard.findFirst({
      where: {
        storeCode: params.storeCode,
        AND: {
          OR: [
            {
              label: {
                equals: label,
                mode: 'insensitive'
              }
            },
            {
              imageUrl
            }
          ]
        }
      }
    })
    if (existingBillboard) {
      return new NextResponse('Billboard already exists', { status: 402 })
    }

    // Create the new billboard
    const billboard = await prismaDB.billboard.create({
      data: {
        label,
        imageUrl,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log(`Billboard_POST`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// getting billboard 

export async function GET(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    if (!params.storeCode) {
      new NextResponse('store code is not valid.', { status: 400 })
    }

    const billboard = await prismaDB.billboard.findMany({
      where: {
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log(`CATEGORY_GET`, error)  
    return new NextResponse('Internal Error', { status: 500 })
  }
}