import { NextRequest, NextResponse } from 'next/server';

const SLUG_PATTERN = /^[a-z0-9-]{3,80}$/;

export async function GET(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  const params = await context.params;
  const slug = params.slug?.trim() ?? '';
  if (!slug || !SLUG_PATTERN.test(slug)) {
    return new NextResponse('Invalid slug.', { status: 400 });
  }

  const target = new URL('/enquiry', req.url);
  target.searchParams.set('slug', slug);
  return NextResponse.redirect(target, 302);
}
