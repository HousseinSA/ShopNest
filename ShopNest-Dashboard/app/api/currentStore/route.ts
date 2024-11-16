// app/api/currentStore/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { userInfo } from '@/lib/userInfo';

export async function POST(req: Request) {
    const { userId } = await userInfo(null);

    if (!userId) {
        return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const { storeId } = await req.json();

    const db = await connectToDatabase();

    // Update or create the current store for the user
    await db.collection('currentStore').updateOne(
        { userId }, // Use userId as the identifier
        { $set: { storeId } },
        { upsert: true } // Create if it doesn't exist
    );

    return NextResponse.json({ message: 'Current store updated successfully' });
}