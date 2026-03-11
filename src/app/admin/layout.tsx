import Link from 'next/link'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Admin — Rando',
  robots: { index: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de navigation admin */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-gray-900">Admin</span>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/admin/queue"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                File d&apos;attente
              </Link>
            </nav>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Voir le site
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
