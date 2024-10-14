import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prismaDB from '@/lib/prismaClient'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-signature') as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEB_HOOK)
  } catch(error:any) {
    console.error(`Webhook signature verification failed: ${error.message}`)
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
  }

  const session= event.data.object as Stripe.Checkout.Session
  const address = session?.customer_details?.address
  const addressArray = [address?.line1, address?.line2, address?.city, address?.state, address?.postal_code, address?.country]
  const addressString = addressArray.filter((loc) => loc !== null).join(',')

  if (event.type === 'checkout.session.completed') {
    try {
      const order = await prismaDB.order.update({
        where: {
          id: session?.metadata?.orderId
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || ''
        },
        include: {
          orderItems: true
        }
      })

      const productsIds = order.orderItems.map((orderItem) => orderItem?.productCode)

      await prismaDB.product.updateMany({
        where: {
          id: {
            in: [...productsIds]
          }
        },
        data: {
          isArchived: true
        }
      })

      console.log('Order updated and products archived successfully')
    } catch (error: any) {
      console.error(`Failed to update order and archive products: ${error.message}`)
      return new NextResponse(`Database error: ${error.message}`, { status: 500 })
    }
  }

  return new NextResponse(null, { status: 200 })
}
