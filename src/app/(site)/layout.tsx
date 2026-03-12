'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="transition-transform duration-300 group-hover:scale-105">
            <polygon points="14,3 26,24 2,24" fill="#025C00" />
            <polygon points="14,8 22,24 6,24" fill="white" opacity="0.25" />
          </svg>
          <span className="font-bold text-[17px] tracking-tight text-[#111111]">
            Rando <span className="text-[#025C00]">France</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: '/randonnees', label: 'Randonnées' },
            { href: '/regions', label: 'Régions' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname.startsWith(href)
                  ? 'bg-[#025C00] text-white'
                  : 'text-[#111111] hover:bg-[#F5F5F5]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA recherche mobile */}
        <button className="md:hidden p-2 rounded-full hover:bg-[#F5F5F5] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <polygon points="14,3 26,24 2,24" fill="#025C00" />
                <polygon points="14,8 22,24 6,24" fill="white" opacity="0.25" />
              </svg>
              <span className="font-bold text-[16px]">Rando <span className="text-[#4ade80]">France</span></span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Des milliers de fiches randonnées détaillées pour explorer la France à pied.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Explorer</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/randonnees" className="hover:text-white transition-colors">Toutes les randonnées</Link></li>
                <li><Link href="/regions" className="hover:text-white transition-colors">Par région</Link></li>
                <li><Link href="/randonnees?difficulte=facile" className="hover:text-white transition-colors">Randonnées faciles</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Infos</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Rando France</span>
          <span>Données cartographiques : © OpenStreetMap contributors (ODbL)</span>
        </div>
      </div>
    </footer>
  )
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
