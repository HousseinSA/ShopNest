import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode:string; sizeCode:string } }) {
  try {
    if (!params.sizeCode) {
      return  new NextResponse('size code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, value } = body
    if (!name|| !value) {
      return new NextResponse('size name or value are missing', { status: 400 })
    }
  // Check if a size with the same label already exists in this store
  const existingSize = await prismaDB.size.findFirst({
    where: {
      storeCode: params.storeCode,
      AND:{
        OR:[
          {name: {
            equals: name,
            mode: 'insensitive'
          }},{value}
      
        ]
      }
      ,NOT: {
        id: params.sizeCode
      }
    }
  })
  
  if (existingSize) {
    return new NextResponse('Size name or value already exists', { status: 402 })
  }

    const size = await prismaDB.size.updateMany({
      where: {
        id: params.sizeCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        value
      }
    })

    return NextResponse.json(size)
  } catch (error) {

    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string; sizeCode: string } }) {
  try {
    if (!params.sizeCode) {
      return new NextResponse('size code is required', { status: 400 })
    }

    const size = await prismaDB.size.findUnique({
      where: {
        id: params.sizeCode,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(size)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; sizeCode: string } }) {
  try {
    if (!params.sizeCode) {
      return new NextResponse('size code is required', { status: 400 })
    }

    const size = await prismaDB.size.deleteMany({
      where: {
        id: params.sizeCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(size)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
