// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}

export async function createUser() {
  const res = await fetch('http://localhost:4000/auth', {
    method: 'POST',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}
