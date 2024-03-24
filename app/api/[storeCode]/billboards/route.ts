import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
    }

    const body = await req.json()
    const { label, imageUrl } = body
    if (!imageUrl && !label) {
      return new NextResponse('No imageUrl or label provided', { status: 400 })
    }
    if (!params.storeCode) {
      new NextResponse('No storeCode found', { status: 400 })
    }

    const userStore = await prismaDB.store.findFirst({
      where: {
        id: params.storeCode,
        userId
      }
    })
    if (!userStore) {
      new NextResponse('unauthorized', { status: 401 })
    }
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
