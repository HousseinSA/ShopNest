// app/api/auth/removeUser/route.ts
import { connectToDatabase } from '@/lib/mongodb';
import {  NextResponse } from 'next/server';

export async function POST() {
  try {
    const db = await connectToDatabase();
    
     await db.collection('users').deleteMany({}); // Removes all user session data
    return NextResponse.json({ message: 'User session removed' }, { status: 200 });
  } catch (error) {
    console.error('Error removing user session:', error);
    return NextResponse.json({ message: 'Error removing user session' }, { status: 500 });
  }
}
