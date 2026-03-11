import { ReactNode } from 'react'
import Link from 'next/link'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-gray-900 tracking-tight">
            Rando France
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/randonnees" className="hover:text-gray-900 transition-colors">
              Randonnées
            </Link>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">
              Blog
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-gray-100 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Rando France</span>
          <span>Données : OpenStreetMap contributors (ODbL)</span>
        </div>
      </footer>
    </div>
  )
}
