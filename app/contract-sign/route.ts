import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_CONTRACT_SIGN_URL =
  'https://hxoqpapwugszehqshkox.supabase.co/functions/v1/contractSign';

function htmlShell(title: string, message: string, status = 400) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { margin: 0; background: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; }
      .wrap { max-width: 720px; margin: 0 auto; padding: 16px; }
      .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; }
      h1 { margin: 0 0 8px; font-size: 24px; }
      p { margin: 0; color: #4b5563; line-height: 1.5; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <h1>${title}</h1>
        <p>${message}</p>
      </div>
    </div>
  </body>
</html>`;

  return new NextResponse(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')?.trim();
  if (!token) {
    return htmlShell('Missing signing link', 'This contract link is missing a token.', 400);
  }

  const upstream = await fetch(`${SUPABASE_CONTRACT_SIGN_URL}?token=${encodeURIComponent(token)}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const contentType = upstream.headers.get('content-type') ?? '';
  const body = await upstream.text();

  if (!upstream.ok) {
    let message = 'This contract link is invalid, expired, or no longer available.';
    if (contentType.includes('application/json')) {
      try {
        const parsed = JSON.parse(body);
        message = (parsed?.error as string | undefined) ?? (parsed?.message as string | undefined) ?? message;
      } catch {
        // Keep fallback message.
      }
    }
    return htmlShell('Unable to sign contract', message, upstream.status);
  }

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  const upstream = await fetch(SUPABASE_CONTRACT_SIGN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    cache: 'no-store',
  });

  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
