import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user } = req.body;

    try {
      const db = await connectToDatabase();
      const existingUser = await db.collection('users').findOne({ email: user.email });

      if (!existingUser) {
        await db.collection('users').insertOne(user);
        res.status(200).json({ message: 'User saved' });
      } else {
        res.status(200).json({ message: 'User already exists' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to save user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
