import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  return new NextResponse('Missing token.', { status: 400 });
}
