import Stripe from 'stripe'
import prismaDB from '@/lib/prismaClient'

import { stripe } from '@/lib/stripe'

import {NextResponse} from 'next/server'


export async function POST(req: Request, { params }: { params: { storeCode:string } }) {

}