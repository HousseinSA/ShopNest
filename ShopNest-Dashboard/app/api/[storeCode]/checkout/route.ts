import Stripe from 'stripe';
import prismaDB from '@/lib/prismaClient';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

const corsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeader });
}

export async function POST(req: Request, { params }: { params: { storeCode: string } }) {
  const { productsIds } = await req.json();

  if (!productsIds || productsIds.length === 0) {
    return new NextResponse('products ids are required', { status: 400 });
  }

  const products = await prismaDB.product.findMany({
    where: {
      id: {
        in: productsIds
      }
    }
  });

  // console.log('store code', params.storeCode)

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map((product) => ({
    quantity: 1,
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name
      },
      unit_amount: product.price * 100
    }
  }));

  const order = await prismaDB.order.create({
    data: {
      storeCode: params.storeCode,
      isPaid: false,
      orderItems: {
        create: productsIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
      ,phone: 'testing phone',
      address: 'testing address',
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.SUCCESS_URL}/cart?success=1`,
    cancel_url: `${process.env.SUCCESS_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  });

  return new NextResponse(JSON.stringify({ url: session.url }), {
    headers: corsHeader
  });
}
