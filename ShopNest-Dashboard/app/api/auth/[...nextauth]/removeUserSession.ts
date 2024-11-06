// pages/api/auth/removeUserSession.ts
import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const db = await connectToDatabase();
      await db.collection('users').deleteMany({}); // Removes all user session data
      res.status(200).json({ message: 'User session removed' });
    } catch (error) {
      console.error('Error removing user session:', error);
      res.status(500).json({ message: 'Error removing user session' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
