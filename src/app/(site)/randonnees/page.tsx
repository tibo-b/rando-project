import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { DEMO_TRAILS } from '@/lib/demo-data'
import TrailCard from '@/components/trail/TrailCard'
import TrailFilters from '@/components/trail/TrailFilters'

export const metadata: Metadata = {
  title: 'Toutes les randonnées en France — Rando France',
  description: 'Découvrez des milliers de randonnées en France avec fiches détaillées, traces GPX, dénivelé et difficulté. Toutes les régions et départements.',
}

const REGIONS = [
  { slug: 'provence-alpes-cote-dazur', name: 'Provence-Alpes-Côte d\'Azur' },
  { slug: 'occitanie',                 name: 'Occitanie' },
  { slug: 'auvergne-rhone-alpes',      name: 'Auvergne-Rhône-Alpes' },
  { slug: 'ile-de-france',             name: 'Île-de-France' },
  { slug: 'bretagne',                  name: 'Bretagne' },
  { slug: 'normandie',                 name: 'Normandie' },
  { slug: 'nouvelle-aquitaine',        name: 'Nouvelle-Aquitaine' },
  { slug: 'grand-est',                 name: 'Grand Est' },
  { slug: 'hauts-de-france',           name: 'Hauts-de-France' },
  { slug: 'pays-de-la-loire',          name: 'Pays de la Loire' },
  { slug: 'centre-val-de-loire',       name: 'Centre-Val de Loire' },
  { slug: 'bourgogne-franche-comte',   name: 'Bourgogne-Franche-Comté' },
  { slug: 'corse',                     name: 'Corse' },
]

type SearchParams = { difficulte?: string; type?: string; region?: string }

export default async function RandonnéesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { difficulte, type, region } = params

  // Filtrage côté serveur — valeurs multiples séparées par virgule
  const diffs   = difficulte ? difficulte.split(',') : []
  const types   = type       ? type.split(',')       : []
  let trails = DEMO_TRAILS
  if (diffs.length)   trails = trails.filter(t => diffs.includes(t.difficulty))
  if (types.length)   trails = trails.filter(t => types.includes(t.trail_type))
  if (region)         trails = trails.filter(t => t.region_slug === region)

  const activeFilters = [difficulte, type, region].filter(Boolean)
  const regionName = region ? REGIONS.find(r => r.slug === region)?.name : null

  return (
    <div className="min-h-screen">

      {/* ── EN-TÊTE ── */}
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-[#025C00] transition-colors">Accueil</Link>
            <span>›</span>
            {regionName ? (
              <>
                <Link href="/randonnees" className="hover:text-[#025C00] transition-colors">Randonnées</Link>
                <span>›</span>
                <span className="text-[#111111] font-medium">{regionName}</span>
              </>
            ) : (
              <span className="text-[#111111] font-medium">Randonnées</span>
            )}
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[#111111] mb-2">
            {regionName
              ? `Randonnées en ${regionName}`
              : 'Toutes les randonnées en France'}
          </h1>
          <p className="text-gray-600 text-base">
            {trails.length} randonnée{trails.length > 1 ? 's' : ''} trouvée{trails.length > 1 ? 's' : ''}
            {activeFilters.length > 0 ? ' avec les filtres sélectionnés' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── SIDEBAR FILTRES + RÉGIONS ── */}
          <aside className="lg:w-64 shrink-0 space-y-6">

            {/* Filtres interactifs */}
            <Suspense fallback={<div className="border border-[#E5E7EB] rounded-2xl p-5 h-64 animate-pulse bg-[#F5F5F5]" />}>
              <TrailFilters
                currentDifficulte={difficulte}
                currentType={type}
                currentRegion={region}
              />
            </Suspense>

            {/* Par région */}
            <div className="border border-[#E5E7EB] rounded-2xl p-5">
              <h2 className="font-bold text-[#111111] text-base mb-4">Par région</h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/randonnees"
                    className={`flex items-center justify-between text-base px-3 py-2 rounded-xl transition-colors ${!region ? 'bg-[#025C00] text-white' : 'text-gray-700 hover:bg-[#F5F5F5]'}`}
                  >
                    <span>Toutes les régions</span>
                    <span className={`text-sm font-semibold ${!region ? 'text-white/80' : 'text-gray-400'}`}>
                      {DEMO_TRAILS.length}
                    </span>
                  </Link>
                </li>
                {REGIONS.map(r => {
                  const count = DEMO_TRAILS.filter(t => t.region_slug === r.slug).length
                  if (count === 0) return null
                  return (
                    <li key={r.slug}>
                      <Link
                        href={`/randonnees?region=${r.slug}${difficulte ? `&difficulte=${difficulte}` : ''}${type ? `&type=${type}` : ''}`}
                        className={`flex items-center justify-between text-base px-3 py-2 rounded-xl transition-colors ${region === r.slug ? 'bg-[#025C00] text-white' : 'text-gray-700 hover:bg-[#F5F5F5]'}`}
                      >
                        <span className="line-clamp-1">{r.name}</span>
                        <span className={`text-sm font-semibold shrink-0 ml-2 ${region === r.slug ? 'text-white/80' : 'text-gray-400'}`}>
                          {count}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Lien pages région dédiées */}
            <div className="border border-[#E5E7EB] rounded-2xl p-5">
              <h2 className="font-bold text-[#111111] text-base mb-3">Pages régions</h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Chaque région a sa page dédiée avec toutes les infos locales.
              </p>
              <ul className="space-y-1">
                {REGIONS.filter(r => DEMO_TRAILS.some(t => t.region_slug === r.slug)).map(r => (
                  <li key={r.slug}>
                    <Link
                      href={`/randonnees/${r.slug}`}
                      className="flex items-center gap-2 text-base text-[#025C00] hover:underline py-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── GRILLE DE RANDONNÉES ── */}
          <div className="flex-1 min-w-0">
            {trails.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-xl font-bold text-[#111111] mb-2">Aucune randonnée trouvée</p>
                <p className="text-gray-500 mb-6">Essayez de modifier les filtres pour élargir la recherche.</p>
                <Link href="/randonnees" className="inline-flex items-center gap-2 bg-[#025C00] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#014800] transition-colors">
                  Voir toutes les randonnées
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trails.map(trail => (
                  <TrailCard key={trail.id} trail={trail} showDept />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
