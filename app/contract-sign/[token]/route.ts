import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  const params = await context.params;
  const token = params.token;
  if (!token) {
    return new NextResponse('Missing token.', { status: 400 });
  }

  const target = new URL('/contract-sign', req.url);
  target.searchParams.set('token', token);
  return NextResponse.redirect(target, 302);
}
