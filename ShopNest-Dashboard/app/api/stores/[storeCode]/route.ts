import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'
import { userInfo } from '@/lib/auth/userInfo'


export async function PATCH(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const {userId} = await userInfo(params.storeCode)

    if (!params.storeCode) {
      return new NextResponse('store code is required', { status: 400 })
    }

    const body = await req.json()
    const { storeName } = body
    if (!storeName) {
      return new NextResponse('store name is required', { status: 400 })
    }

    const store = await prismaDB.store.updateMany({
      where: {
        id: params.storeCode,
        userId: userId
      },
      data: {
        storeName
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log(`STORES_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string } }) {
  try {
    const {userId} = await userInfo(params.storeCode)

    if (!params.storeCode) {
      return new NextResponse('store code is required', { status: 400 })
    }

    const store = await prismaDB.store.deleteMany({
      where: {
        id: params.storeCode,
        userId: userId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log(`STORES_DELETE`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
