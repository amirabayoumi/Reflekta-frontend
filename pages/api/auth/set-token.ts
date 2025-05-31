import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { Buffer } from 'buffer';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    try {
      // Decode the token
      token = Buffer.from(token, 'base64').toString('utf8');
    } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(400).json({ message: 'Invalid token encoding' });
    }

    // DO NOT include httpOnly at all
    const cookie = serialize('token', token, {
      // httpOnly: true, // Do not include this line
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ message: 'Token set' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
