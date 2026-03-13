import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DEMO_TRAILS } from '@/lib/demo-data'
import TrailCard from '@/components/trail/TrailCard'

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

type Params = { regionSlug: string; deptSlug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { regionSlug, deptSlug } = await params
  const trails = DEMO_TRAILS.filter(t => t.region_slug === regionSlug && t.department_slug === deptSlug)
  const regionName = REGION_NAMES[regionSlug] ?? regionSlug
  const deptName = trails[0]?.department_name ?? deptSlug

  return {
    title: `Randonnées en ${deptName} (${regionName}) — Rando France`,
    description: `${trails.length} randonnée${trails.length > 1 ? 's' : ''} en ${deptName} : fiches détaillées avec traces GPX, dénivelé et difficulté.`,
  }
}

export default async function DeptPage({ params }: { params: Promise<Params> }) {
  const { regionSlug, deptSlug } = await params

  const trails = DEMO_TRAILS.filter(
    t => t.region_slug === regionSlug && t.department_slug === deptSlug
  )

  const regionName = REGION_NAMES[regionSlug]
  const deptName = trails[0]?.department_name ?? deptSlug

  if (!regionName) notFound()

  // Stats globales du département
  const avgDistance   = trails.length ? Math.round(trails.reduce((s, t) => s + t.distance_km, 0)          / trails.length * 10) / 10 : 0
  const avgElevation  = trails.length ? Math.round(trails.reduce((s, t) => s + t.elevation_gain_m, 0)     / trails.length)       : 0
  const difficulties  = Array.from(new Set(trails.map(t => t.difficulty)))

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
            <Link href={`/randonnees/${regionSlug}`} className="hover:text-[#025C00] transition-colors">{regionName}</Link>
            <span>›</span>
            <span className="text-[#111111] font-medium">{deptName}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[#111111] mb-2">
            Randonnées dans le {deptName}
          </h1>
          <p className="text-gray-600 text-base mb-6">
            {trails.length} randonnée{trails.length > 1 ? 's' : ''} disponible{trails.length > 1 ? 's' : ''}
          </p>

          {/* Stats rapides du département */}
          {trails.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Distance moy.', value: `${avgDistance} km` },
                { label: 'D+ moyen',      value: `${avgElevation} m` },
                { label: 'Niveaux',       value: `${difficulties.length} niveau${difficulties.length > 1 ? 'x' : ''}` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</span>
                  <span className="text-base font-bold text-[#111111]">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── SIDEBAR ── */}
          <aside className="lg:w-64 shrink-0 space-y-5">

            {/* Filtres rapides par difficulté */}
            {trails.length > 0 && (
              <div className="border border-[#E5E7EB] rounded-2xl p-5">
                <h2 className="font-bold text-[#111111] text-base mb-4">Niveaux disponibles</h2>
                <ul className="space-y-1">
                  {[
                    { slug: 'tres_facile',    label: 'Très facile',    dot: 'bg-emerald-500' },
                    { slug: 'facile',         label: 'Facile',         dot: 'bg-green-500' },
                    { slug: 'moyen',          label: 'Moyen',          dot: 'bg-yellow-500' },
                    { slug: 'difficile',      label: 'Difficile',      dot: 'bg-orange-500' },
                    { slug: 'tres_difficile', label: 'Très difficile', dot: 'bg-red-500' },
                  ]
                    .filter(d => difficulties.includes(d.slug as any))
                    .map(d => {
                      const count = trails.filter(t => t.difficulty === d.slug).length
                      return (
                        <li key={d.slug} className="flex items-center justify-between text-base px-3 py-2">
                          <span className="flex items-center gap-2.5 text-gray-700">
                            <span className={`w-2 h-2 rounded-full ${d.dot}`} />
                            {d.label}
                          </span>
                          <span className="text-sm font-semibold text-gray-400">{count}</span>
                        </li>
                      )
                    })}
                </ul>
              </div>
            )}

            {/* Navigation */}
            <div className="space-y-2">
              <Link
                href={`/randonnees/${regionSlug}`}
                className="flex items-center gap-2 text-base text-gray-500 hover:text-[#025C00] transition-colors px-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {regionName}
              </Link>
              <Link
                href="/randonnees"
                className="flex items-center gap-2 text-base text-gray-500 hover:text-[#025C00] transition-colors px-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Toutes les randonnées
              </Link>
            </div>
          </aside>

          {/* ── GRILLE ── */}
          <div className="flex-1 min-w-0">
            {trails.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🗺️</p>
                <p className="text-xl font-bold text-[#111111] mb-2">Randonnées bientôt disponibles</p>
                <p className="text-gray-500 mb-6">
                  Les fiches pour ce département arrivent prochainement.
                </p>
                <Link
                  href={`/randonnees/${regionSlug}`}
                  className="inline-flex items-center gap-2 bg-[#025C00] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#014800] transition-colors"
                >
                  Voir {regionName}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trails.map(trail => (
                  <TrailCard key={trail.id} trail={trail} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
