import prismaDB from '@/lib/prismaClient'
import { NextResponse } from 'next/server'
<<<<<<< HEAD
import { userInfo } from '@/lib/auth/userInfo'


=======

import { auth } from '@clerk/nextjs'
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c

export async function PATCH(req: Request, { params }: { params: { storeCode: string; categoryCode: string } }) 
{
  try {
<<<<<<< HEAD
    const {userId} = await userInfo(params.storeCode)
=======
    const {userId} = auth()
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
    if (!userId) {
      return new NextResponse('unauthorized user', { status: 401 })
    }
    if (!params.categoryCode) {
      return new NextResponse('category code is required', { status: 400 })
    }
    const body = await req.json()
    const { name, billboardCode } = body
    if (!name && !billboardCode) {
      return new NextResponse('Category name or billboard code is missing', { status: 400 })
    }

      // Check if a category with the same name already exists in this store
      const existingCategory = await prismaDB.category.findFirst({
        where: {
          storeCode: params.storeCode,
          name: {
            equals: name,
            mode: 'insensitive'
          },
          NOT: {
            id: params.categoryCode
          }
        }
      })
      
      if (existingCategory) {
        return new NextResponse('category  already exists', { status: 402 })
      }

    const category = await prismaDB.category.updateMany({
      where: {
        id: params.categoryCode,
        storeCode: params.storeCode
      },
      data: {
        name,
        billboardCode
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log(`CATEGORY_PATCH`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function GET(req: Request, { params }: { params: { storeCode: string; categoryCode: string } }) {
  try {
    if (!params.categoryCode) {
      return new NextResponse('category code is required', { status: 400 })
    }
    const category = await prismaDB.category.findUnique({
      where: {
        id: params.categoryCode,
        storeCode: params.storeCode
      }, include:{
        billboard:true
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log(`CATEGORY_GET`, error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeCode: string; categoryCode: string } }) {
  try {
    if (!params.categoryCode) {
      return new NextResponse('Billboard code is required', { status: 400 })
    }

    const category = await prismaDB.category.deleteMany({
      where: {
        id: params.categoryCode,
        storeCode: params.storeCode
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log(`CATEGORY_DELETE`, error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}


