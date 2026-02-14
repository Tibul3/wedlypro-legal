import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedly Pro",
  description: "Wedding Supplier CRM for modern wedding professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="inline-flex items-center gap-3 no-underline">
              {/* Replace with /public/logo.png when final production logo is ready. */}
              <Image
                src="/logo.png"
                alt="Wedly Pro logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl border border-black/10 bg-white object-contain"
              />
              <span className="text-base font-semibold tracking-tight text-zinc-900">Wedly Pro</span>
            </Link>

            <nav className="flex items-center gap-5 text-sm text-zinc-600">
              <Link className="hover:text-zinc-900" href="/privacy">
                Privacy
              </Link>
              <Link className="hover:text-zinc-900" href="/terms">
                Terms
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</main>

        <footer className="border-t border-black/5 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 px-6 py-8 text-sm text-zinc-600 md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} Wedly Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link className="hover:text-zinc-900" href="/privacy">
                Privacy Policy
              </Link>
              <Link className="hover:text-zinc-900" href="/terms">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
