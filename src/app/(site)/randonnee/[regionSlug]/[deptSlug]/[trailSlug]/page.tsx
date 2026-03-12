import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getApprovedTrailBySlug } from '@/lib/db'
import TrailMap from '@/components/map/TrailMap'
import ElevationChart from '@/components/trail/ElevationChart'
import NearbyTrails from '@/components/trail/NearbyTrails'
import { DEMO_TRAILS, getDemoTrailBySlug, type DemoTrail } from '@/lib/demo-data'

const DIFFICULTY_MAP: Record<string, { label: string; color: string; dot: string }> = {
  tres_facile:    { label: 'Très facile',    color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  facile:         { label: 'Facile',         color: 'bg-green-100 text-green-700',     dot: 'bg-green-500' },
  moyen:          { label: 'Moyen',          color: 'bg-yellow-100 text-yellow-800',   dot: 'bg-yellow-500' },
  difficile:      { label: 'Difficile',      color: 'bg-orange-100 text-orange-700',   dot: 'bg-orange-500' },
  tres_difficile: { label: 'Très difficile', color: 'bg-red-100 text-red-700',         dot: 'bg-red-500' },
}

const TYPE_LABEL: Record<string, string> = {
  boucle: 'Boucle',
  aller_retour: 'Aller-retour',
  point_a_point: 'Point à point',
}

function formatDuration(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

type Params = { regionSlug: string; deptSlug: string; trailSlug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { trailSlug } = await params
  let name = ''
  let desc = ''
  try {
    const t = await getApprovedTrailBySlug(trailSlug)
    if (t) { name = t.name; desc = t.short_description ?? '' }
  } catch { /* DB non dispo */ }

  if (!name) {
    const demo = getDemoTrailBySlug(trailSlug)
    if (demo) { name = demo.name; desc = demo.short_description }
  }

  if (!name) return { title: 'Randonnée introuvable' }
  return {
    title: `${name} — Rando France`,
    description: desc,
  }
}

export default async function TrailPage({ params }: { params: Promise<Params> }) {
  const { trailSlug } = await params

  let trail: DemoTrail | null = null

  try {
    const dbTrail = await getApprovedTrailBySlug(trailSlug)
    if (dbTrail) {
      // Adapter le format DB au format DemoTrail
      trail = {
        id: dbTrail.id,
        slug: dbTrail.slug,
        name: dbTrail.name,
        short_description: dbTrail.short_description ?? '',
        description: dbTrail.description ?? '',
        region_name: (dbTrail as any).region_name ?? '',
        region_slug: (dbTrail as any).region_slug ?? '',
        department_name: (dbTrail as any).department_name ?? '',
        department_slug: (dbTrail as any).department_slug ?? '',
        distance_km: dbTrail.distance_km ?? 0,
        elevation_gain_m: dbTrail.elevation_gain_m ?? 0,
        elevation_loss_m: dbTrail.elevation_loss_m ?? 0,
        duration_min: dbTrail.duration_min ?? 0,
        difficulty: (dbTrail.difficulty as DemoTrail['difficulty']) ?? 'moyen',
        trail_type: (dbTrail.trail_type as DemoTrail['trail_type']) ?? 'boucle',
        start_lat: dbTrail.start_lat ?? 46.5,
        start_lon: dbTrail.start_lon ?? 2.5,
        cover_photo_url: dbTrail.cover_photo_url ?? '',
        gpx_url: dbTrail.gpx_url ?? null,
        parking: (dbTrail as any).parking_info ?? '',
        start_address: '',
        gear: (dbTrail as any).recommended_gear ?? [],
        distances_km: (dbTrail as any).distances_km ?? [],
        elevations_m: (dbTrail as any).elevations_m ?? [],
        tags: [],
      }
    }
  } catch { /* DB non dispo */ }

  if (!trail) {
    trail = getDemoTrailBySlug(trailSlug)
    if (!trail) notFound()
  }

  const diff = DIFFICULTY_MAP[trail.difficulty] ?? { label: '—', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' }

  return (
    <article>
      {/* ── HERO PHOTO ── */}
      <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
        {trail.cover_photo_url ? (
          <Image
            src={trail.cover_photo_url}
            alt={trail.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#F5F5F5]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Fil d'Ariane */}
        <div className="absolute top-24 left-0 right-0 px-6">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-white/70">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>›</span>
              <Link href="/randonnees" className="hover:text-white transition-colors">Randonnées</Link>
              <span>›</span>
              <span className="text-white/90">{trail.region_name}</span>
              <span>›</span>
              <span className="text-white/90">{trail.department_name}</span>
            </nav>
          </div>
        </div>

        {/* Titre + stats sur le hero */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="max-w-6xl mx-auto">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${diff.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
              {diff.label}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              {trail.name}
            </h1>
            <p className="text-white/80 text-base max-w-xl mb-5">{trail.short_description}</p>

            {/* Stats clés — visibles immédiatement */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '📍', label: 'Distance', value: `${trail.distance_km} km` },
                { icon: '↑', label: 'Dénivelé +', value: `${trail.elevation_gain_m} m` },
                { icon: '⏱', label: 'Durée', value: formatDuration(trail.duration_min) },
                { icon: '🔄', label: 'Type', value: TYPE_LABEL[trail.trail_type] },
              ].map(({ icon, label, value }) => (
                <div key={label} className="glass-dark rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <span className="text-base leading-none">{icon}</span>
                  <div>
                    <p className="text-[10px] text-white/60 leading-none mb-0.5">{label}</p>
                    <p className="text-sm font-bold text-white leading-none">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Colonne principale ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Carte interactive */}
            <section>
              <h2 className="text-xl font-bold text-[#111111] mb-4">Carte du parcours</h2>
              <div className="rounded-2xl overflow-hidden border border-[#E5E7EB]">
                <TrailMap
                  lat={trail.start_lat}
                  lon={trail.start_lon}
                  gpxUrl={trail.gpx_url}
                />
              </div>
            </section>

            {/* Profil altimétrique */}
            {trail.distances_km.length > 0 && trail.elevations_m.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#111111] mb-4">Profil altimétrique</h2>
                <div className="bg-[#F5F5F5] rounded-2xl p-4">
                  <ElevationChart
                    distances={trail.distances_km}
                    elevations={trail.elevations_m}
                  />
                </div>
              </section>
            )}

            {/* Description */}
            {trail.description && (
              <section>
                <h2 className="text-xl font-bold text-[#111111] mb-4">Description</h2>
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {trail.description}
                </div>
              </section>
            )}

            {/* Infos pratiques */}
            <section>
              <h2 className="text-xl font-bold text-[#111111] mb-4">Infos pratiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trail.parking && (
                  <div className="bg-[#F5F5F5] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-1.5">Parking</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{trail.parking}</p>
                  </div>
                )}
                {trail.start_address && (
                  <div className="bg-[#F5F5F5] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-1.5">Départ</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{trail.start_address}</p>
                  </div>
                )}
                {trail.tags.length > 0 && (
                  <div className="bg-[#F5F5F5] rounded-xl p-4 sm:col-span-2">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {trail.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white border border-[#E5E7EB] text-gray-600 px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ── Colonne latérale ── */}
          <div className="space-y-5">

            {/* Télécharger GPX */}
            <div className="border border-[#E5E7EB] rounded-2xl p-5">
              <h3 className="font-bold text-[#111111] mb-1">Trace GPS</h3>
              <p className="text-xs text-gray-400 mb-4">Compatible Garmin, Suunto, Komoot, AllTrails…</p>
              {trail.gpx_url ? (
                <a
                  href={trail.gpx_url}
                  download
                  className="flex items-center justify-center gap-2 w-full bg-[#025C00] hover:bg-[#014800] text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Télécharger le GPX
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-400 text-sm font-medium px-4 py-3 rounded-xl cursor-not-allowed">
                  GPX bientôt disponible
                </div>
              )}
            </div>

            {/* Équipements */}
            {trail.gear.length > 0 && (
              <div className="border border-[#E5E7EB] rounded-2xl p-5">
                <h3 className="font-bold text-[#111111] mb-4">Équipements conseillés</h3>
                <ul className="space-y-2.5">
                  {trail.gear.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-[#025C00]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Randonnées à proximité */}
            <NearbyTrails
              trailId={trail.id}
              lat={trail.start_lat}
              lon={trail.start_lon}
            />

            {/* Autres randonnées de la même région (démo) */}
            <div className="border border-[#E5E7EB] rounded-2xl p-5">
              <h3 className="font-bold text-[#111111] mb-4">Dans la même région</h3>
              <ul className="space-y-3">
                {DEMO_TRAILS.filter(t => t.region_slug === trail!.region_slug && t.slug !== trail!.slug).slice(0, 3).map(t => (
                  <li key={t.id}>
                    <Link
                      href={`/randonnee/${t.region_slug}/${t.department_slug}/${t.slug}`}
                      className="group flex items-start gap-3"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <Image src={t.cover_photo_url} alt={t.name} fill className="object-cover transition-transform group-hover:scale-110 duration-300" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#111111] group-hover:text-[#025C00] transition-colors line-clamp-2 leading-snug">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{t.distance_km} km · {t.elevation_gain_m} m D+</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
