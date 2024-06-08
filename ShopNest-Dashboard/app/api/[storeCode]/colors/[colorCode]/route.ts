import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; colorCode: string } }) {
  try {
    if (!params.colorCode) {
      return new NextResponse('color code is required', { status: 400 })
    }

    const body = await req.json()
    const { name, value } = body
    if (!name && !value) {
      return new NextResponse('color name and value are required', { status: 400 })
    }

    console.log('color value',value)
    
  // Check if a color with the same name already exists in this store
  const existingColor = await prismaDB.color.findFirst({
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
        id: params.colorCode
      }
    }
  })
  if (existingColor ) {
    return new NextResponse('color name or Hex code already exists.', { status: 402 })
  }

    const color = await prismaDB.color.updateMany({
      where: {
        id: params.colorCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        value
      }
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log(`COLOR_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string; colorCode: string } }) {
  try {
    if (!params.colorCode) {
      return new NextResponse('color code is required', { status: 400 })
    }

    const color = await prismaDB.color.findUnique({
      where: {
        id: params.colorCode,
        storeCode: params.storeCode
      }
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log(`COLOR_GET`, error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; colorCode: string } }) {
  try {
    if (!params.colorCode) {
      return new NextResponse('color code is required', { status: 400 })
    }

    const color = await prismaDB.color.deleteMany({
      where: {
        id: params.colorCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(color)
  } catch (error) {
    console.log(`COLOR_DELETE`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
