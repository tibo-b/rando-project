import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DEMO_TRAILS, type DemoTrail } from '@/lib/demo-data'
import { getTrailsForListing } from '@/lib/db'
import TrailCard from '@/components/trail/TrailCard'
import { buildMetadata } from '@/lib/seo'

// Noms affichables des régions
const REGION_NAMES: Record<string, string> = {
  'provence-alpes-cote-dazur': "Provence-Alpes-Côte d'Azur",
  'occitanie':                 'Occitanie',
  'auvergne-rhone-alpes':      'Auvergne-Rhône-Alpes',
  'ile-de-france':             'Île-de-France',
  'bretagne':                  'Bretagne',
  'normandie':                 'Normandie',
  'nouvelle-aquitaine':        'Nouvelle-Aquitaine',
  'grand-est':                 'Grand Est',
  'hauts-de-france':           'Hauts-de-France',
  'pays-de-la-loire':          'Pays de la Loire',
  'centre-val-de-loire':       'Centre-Val de Loire',
  'bourgogne-franche-comte':   'Bourgogne-Franche-Comté',
  'corse':                     'Corse',
}

type Params = { regionSlug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { regionSlug } = await params
  const name = REGION_NAMES[regionSlug]
  if (!name) return { title: 'Région introuvable' }
  return buildMetadata({
    title: `Randonnées en ${name}`,
    description: `Découvrez toutes les randonnées en ${name} : fiches détaillées, traces GPX, difficulté et itinéraires par département.`,
    path: `/randonnees/${regionSlug}`,
  })
}

export default async function RegionPage({ params }: { params: Promise<Params> }) {
  const { regionSlug } = await params
  const regionName = REGION_NAMES[regionSlug]

  let trails: DemoTrail[]
  try {
    const dbTrails = await getTrailsForListing({ regionSlug })
    trails = dbTrails as unknown as DemoTrail[]
  } catch {
    trails = DEMO_TRAILS.filter(t => t.region_slug === regionSlug)
  }

  // Page accessible uniquement si la région existe (en base ou en démo)
  if (!regionName) notFound()

  // Départements présents dans cette région
  const depts = Array.from(
    new Map(trails.map(t => [t.department_slug, t.department_name])).entries()
  ).map(([slug, name]) => ({ slug, name, count: trails.filter(t => t.department_slug === slug).length }))

  return (
    <div className="min-h-screen">

      {/* ── EN-TÊTE ── */}
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-[#025C00] transition-colors">Accueil</Link>
            <span>›</span>
            <Link href="/randonnees" className="hover:text-[#025C00] transition-colors">Randonnées</Link>
            <span>›</span>
            <span className="text-[#111111] font-medium">{regionName}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[#111111] mb-2">
            Randonnées en {regionName}
          </h1>
          <p className="text-gray-600 text-base">
            {trails.length} randonnée{trails.length > 1 ? 's' : ''} · {depts.length} département{depts.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── SIDEBAR DÉPARTEMENTS ── */}
          <aside className="lg:w-64 shrink-0 space-y-5">
            <div className="border border-[#E5E7EB] rounded-2xl p-5">
              <h2 className="font-bold text-[#111111] text-base mb-4">Départements</h2>
              {depts.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun département disponible.</p>
              ) : (
                <ul className="space-y-1">
                  {depts.map(d => (
                    <li key={d.slug}>
                      <Link
                        href={`/randonnees/${regionSlug}/${d.slug}`}
                        className="flex items-center justify-between text-base px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F5F5F5] hover:text-[#025C00] transition-colors"
                      >
                        <span>{d.name}</span>
                        <span className="text-sm font-semibold text-gray-400">{d.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Retour listing global */}
            <Link
              href="/randonnees"
              className="flex items-center gap-2 text-base text-gray-500 hover:text-[#025C00] transition-colors px-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Toutes les régions
            </Link>
          </aside>

          {/* ── CONTENU PRINCIPAL ── */}
          <div className="flex-1 min-w-0">

            {/* Si des départements → afficher les sections par département */}
            {depts.length > 0 ? (
              <div className="space-y-12">
                {depts.map(dept => {
                  const deptTrails = trails.filter(t => t.department_slug === dept.slug)
                  return (
                    <div key={dept.slug}>
                      {/* Titre département */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#111111]">{dept.name}</h2>
                        {deptTrails.length > 3 && (
                          <Link
                            href={`/randonnees/${regionSlug}/${dept.slug}`}
                            className="text-base text-[#025C00] hover:underline font-medium flex items-center gap-1"
                          >
                            Voir tout
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {deptTrails.slice(0, 6).map(trail => (
                          <TrailCard key={trail.id} trail={trail} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🗺️</p>
                <p className="text-xl font-bold text-[#111111] mb-2">Randonnées bientôt disponibles</p>
                <p className="text-gray-500">Les fiches pour cette région arrivent prochainement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
