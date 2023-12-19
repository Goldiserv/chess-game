import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await GET();
    const data = await response.json();
    res.status(response.status).json({data});
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'hello',
    },
    { status: 202 }
  );
}
