import { NextApiRequest, NextApiResponse } from 'next';

// This endpoint is no longer needed since we're using pure localStorage token storage
// Keeping it with a deprecation notice in case there are existing references to it

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.warn('The set-token API endpoint is deprecated. Authentication now uses localStorage directly.');
    
    // Return success but do nothing
    return res.status(200).json({ 
      message: 'Authentication now uses localStorage directly. This endpoint is deprecated.' 
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
