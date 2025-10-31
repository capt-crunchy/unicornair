
import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unicorn Air — Fly the skies where legends are born',
  description: 'A modern virtual airline with a playful medieval twist. SimBrief, FsHub, and SayIntentions.AI integrated.',
  metadataBase: new URL('https://unicornair.fun'),
  openGraph: {
    title: 'Unicorn Air',
    description: 'Professional virtual aviation—with a sparkle.',
    type: 'website',
    url: 'https://unicornair.fun',
  },
  themeColor: '#5b21b6'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2 font-extrabold">
              <span className="inline-block w-6 h-6 rounded-full bg-primary" />
              Unicorn Air
            </Link>
            <nav className="flex items-center gap-2">
              <Link className="nav-link" href="/about">About</Link>
              <Link className="nav-link" href="/faq">FAQ</Link>
              <a className="nav-link" href="https://fshub.io" target="_blank" rel="noopener">FsHub</a>
              <a className="btn btn-primary" href="/crew" target="_blank" rel="noopener">Crew Portal</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container grid md:grid-cols-4 gap-4 py-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-5 h-5 rounded-full bg-primary" />
                <strong>Unicorn Air</strong>
              </div>
              <p className="text-violet-200/80">Fly the skies where legends are born—professionally, playfully.</p>
            </div>
            <nav>
              <h4 className="font-semibold mb-1">Explore</h4>
              <Link href="/" className="block">Home</Link>
              <Link href="/about" className="block">About</Link>
              <Link href="/faq" className="block">FAQ</Link>
            </nav>
            <nav>
              <h4 className="font-semibold mb-1">Integrations</h4>
              <a href="https://fshub.io" target="_blank" rel="noopener" className="block">FsHub</a>
              <a href="https://sayintentions.ai" target="_blank" rel="noopener" className="block">SayIntentions.AI</a>
            </nav>
            <div>
              <h4 className="font-semibold mb-1">Community</h4>
              <a href="#" className="block">Discord</a>
              <a href="#" className="block">X</a>
              <a href="#" className="block">Instagram</a>
            </div>
          </div>
          <div className="container py-2 text-sm text-violet-200/70 border-t border-[hsl(var(--border))]">
            © 2025 Unicorn Air • All virtual flights, real fun.
          </div>
        </footer>
      </body>
    </html>
  )
}
