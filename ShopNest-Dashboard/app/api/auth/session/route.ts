// pages/api/sessions.js (or wherever your API routes are)

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userSession = req.body;

    // Here, you would typically process the session data,  
    // save it to your database, or handle it as needed.
    console.log('Received session data:', userSession);

    // Respond back to the client
    res.status(200).json({ message: 'Session data received successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
