import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import prismaDB from '@/lib/prismaClient'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()

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
