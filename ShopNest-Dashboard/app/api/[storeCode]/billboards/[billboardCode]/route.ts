import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { storeCode: string; billboardCode: string } }) {
  try {
    if (!params.billboardCode) {
      return new NextResponse('Billboard code is required', { status: 400 })
    }

    const body = await req.json()
    const { label, imageUrl } = body
    if (!label && !imageUrl) {
      return new NextResponse('No imageUrl or label provided', { status: 400 })
    }

    // Fetch the current billboard data
    const currentBillboard = await prismaDB.billboard.findUnique({
      where: {
        id: params.billboardCode
      }
    })

    if (!currentBillboard) {
      return new NextResponse('Billboard not found', { status: 404 })
    }

    // Only check for existing billboards if label or imageUrl is different
    if ((label && label !== currentBillboard.label) || (imageUrl && imageUrl !== currentBillboard.imageUrl)) {
      const existingBillboard = await prismaDB.billboard.findFirst({
        where: {
          storeCode: params.storeCode,
          label: {
            equals: label,
            mode:'insensitive'
          },
      
          NOT: {
            id: params.billboardCode
          }
        }
      })

      if (existingBillboard) {
        return new NextResponse('Billboard already exists', { status: 402 })
      }
    }

    const updatedData = {
      label: label !== undefined ? label : currentBillboard.label,
      imageUrl: imageUrl !== undefined ? imageUrl : currentBillboard.imageUrl
    }

    const billboard = await prismaDB.billboard.update({
      where: {
        id: params.billboardCode
      },
      data: updatedData
    })

    return NextResponse.json(billboard)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(req: Request, { params }: { params: { storeCode: string; billboardCode: string } }) {
  try {
    if (!params.billboardCode) {
      return new NextResponse('Billboard code is required', { status: 400 })
    }

    const billboard = await prismaDB.billboard.findUnique({
      where: {
        id: params.billboardCode
      }
    })

    return NextResponse.json(billboard)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; billboardCode: string } }) {
  try {
    if (!params.billboardCode) {
      return new NextResponse('Billboard code is required', { status: 400 })
    }

    const billboard = await prismaDB.billboard.delete({
      where: {
        id: params.billboardCode
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
