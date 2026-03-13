'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {
    label: 'Randonnées',
    href: '/randonnees',
    items: [
      { label: 'Toutes les randonnées',  href: '/randonnees',                        desc: 'Parcourez toutes nos fiches détaillées' },
      { label: 'Par région',             href: '/randonnees',                        desc: 'PACA, Alpes, Bretagne, Pyrénées…' },
      { label: 'Randonnées faciles',     href: '/randonnees?difficulte=facile',      desc: 'Idéales pour débuter en famille' },
      { label: 'Randonnées difficiles',  href: '/randonnees?difficulte=difficile',   desc: 'Pour les randonneurs expérimentés' },
      { label: 'Boucles',               href: '/randonnees?type=boucle',            desc: 'Retour au point de départ' },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    items: [
      { label: 'Technique & Sécurité',  href: '/guides/technique',    desc: 'Balisage, orientation, premiers secours' },
      { label: 'Bivouac & Nuit dehors', href: '/guides/bivouac',      desc: 'Réglementation, matériel, bons plans' },
      { label: 'Météo montagne',        href: '/guides/meteo',        desc: 'Lire et anticiper les conditions' },
      { label: 'Préparation physique',  href: '/guides/preparation',  desc: 'Entraînement, nutrition, récupération' },
      { label: 'Avec des enfants',      href: '/guides/famille',      desc: 'Choisir et adapter les sorties' },
    ],
  },
  {
    label: 'Matériel',
    href: '/materiel',
    items: [
      { label: 'Chaussures de rando',  href: '/materiel/chaussures',  desc: 'Trouver la bonne paire selon terrain' },
      { label: 'Sacs à dos',           href: '/materiel/sacs',        desc: 'Du day-hike à la grande traversée' },
      { label: 'Vêtements techniques', href: '/materiel/vetements',   desc: 'Imper, polaire, base-layer' },
      { label: 'Navigation & GPS',     href: '/materiel/navigation',  desc: 'Montres, GPS, cartes IGN' },
      { label: 'Bivouac & Shelter',    href: '/materiel/bivouac',     desc: 'Tentes légères, duvets, réchauds' },
    ],
  },
]

function Header() {
  const [openMenu, setOpenMenu]     = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  // Ferme le menu au changement de page
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  // Ferme le dropdown si clic en dehors
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB]"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="transition-transform duration-300 group-hover:scale-105">
              <polygon points="14,3 26,24 2,24" fill="#025C00" />
              <polygon points="14,8 22,24 6,24" fill="white" opacity="0.25" />
            </svg>
            <span className="font-bold text-[17px] tracking-tight text-[#111111]">
              Rando <span className="text-[#025C00]">France</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, href, items }) => (
              <div key={label} className="relative">
                <button
                  onClick={() => setOpenMenu(openMenu === label ? null : label)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive(href)
                      ? 'bg-[#025C00] text-white'
                      : 'text-[#111111] hover:bg-[#F5F5F5]'
                  }`}
                >
                  {label}
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-200 ${openMenu === label ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown */}
                {openMenu === label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden">
                    <div className="p-2">
                      {items.map(item => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          className="flex flex-col px-4 py-3 rounded-xl hover:bg-[#F5F5F5] transition-colors group"
                        >
                          <span className="text-sm font-semibold text-[#111111] group-hover:text-[#025C00] transition-colors">{item.label}</span>
                          <span className="text-xs text-gray-500 mt-0.5">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-[#F5F5F5] px-4 py-3">
                      <Link href={href} className="text-xs font-semibold text-[#025C00] hover:underline flex items-center gap-1">
                        Voir tout
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full transition-colors hover:bg-[#F5F5F5] text-[#111111] cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full transition-colors hover:bg-[#F5F5F5] text-[#111111] cursor-pointer"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] py-4 space-y-1">
            {NAV.map(({ label, href, items }) => (
              <div key={label}>
                <button
                  onClick={() => setOpenMenu(openMenu === label ? null : label)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold text-[#111111] hover:bg-[#F5F5F5] transition-colors"
                >
                  {label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform ${openMenu === label ? 'rotate-180' : ''}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openMenu === label && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#E5E7EB] pl-4">
                    {items.map(item => (
                      <Link key={item.label} href={item.href} className="block py-2 text-sm text-gray-700 hover:text-[#025C00] transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-24">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <polygon points="14,3 26,24 2,24" fill="#025C00" />
                <polygon points="14,8 22,24 6,24" fill="white" opacity="0.25" />
              </svg>
              <span className="font-bold text-[16px]">Rando <span className="text-[#4ade80]">France</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              L'encyclopédie de la randonnée en France. Fiches détaillées, guides pratiques et conseils matériel pour randonner en toute sécurité.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Randonnées</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/randonnees" className="hover:text-white transition-colors">Toutes les fiches</Link></li>
                <li><Link href="/randonnees?difficulte=facile" className="hover:text-white transition-colors">Randonnées faciles</Link></li>
                <li><Link href="/randonnees?type=boucle" className="hover:text-white transition-colors">Boucles</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Guides</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/guides/technique" className="hover:text-white transition-colors">Technique</Link></li>
                <li><Link href="/guides/bivouac" className="hover:text-white transition-colors">Bivouac</Link></li>
                <li><Link href="/guides/famille" className="hover:text-white transition-colors">En famille</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Matériel</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/materiel/chaussures" className="hover:text-white transition-colors">Chaussures</Link></li>
                <li><Link href="/materiel/sacs" className="hover:text-white transition-colors">Sacs à dos</Link></li>
                <li><Link href="/materiel/navigation" className="hover:text-white transition-colors">GPS & Navigation</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">À propos</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/a-propos" className="hover:text-white transition-colors">Notre mission</Link></li>
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
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
