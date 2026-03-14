import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getApprovedTrailBySlug } from '@/lib/db'
import TrailMap from '@/components/map/TrailMap'
import ElevationChart from '@/components/trail/ElevationChart'
import NearbyTrails from '@/components/trail/NearbyTrails'
import { DEMO_TRAILS, getDemoTrailBySlug, type DemoTrail } from '@/lib/demo-data'
import { buildMetadata, SITE_URL } from '@/lib/seo'

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
  const { regionSlug, deptSlug, trailSlug } = await params
  let name = ''; let desc = ''; let image = ''
  try {
    const t = await getApprovedTrailBySlug(trailSlug)
    if (t) { name = t.name; desc = t.short_description ?? ''; image = t.cover_photo_url ?? '' }
  } catch { /* DB non dispo */ }

  if (!name) {
    const demo = getDemoTrailBySlug(trailSlug)
    if (demo) { name = demo.name; desc = demo.short_description; image = demo.cover_photo_url }
  }

  if (!name) return { title: 'Randonnée introuvable' }
  return buildMetadata({
    title: name,
    description: desc,
    path: `/randonnee/${regionSlug}/${deptSlug}/${trailSlug}`,
    image: image || undefined,
  })
}

export default async function TrailPage({ params }: { params: Promise<Params> }) {
  const { trailSlug } = await params

  let trail: DemoTrail | null = null

  try {
    const dbTrail = await getApprovedTrailBySlug(trailSlug)
    if (dbTrail) {
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
        municipality: (dbTrail as any).municipality ?? '',
        postal_code: (dbTrail as any).postal_code ?? '',
        distance_km: dbTrail.distance_km ?? 0,
        elevation_gain_m: dbTrail.elevation_gain_m ?? 0,
        elevation_loss_m: dbTrail.elevation_loss_m ?? 0,
        elevation_max_m: dbTrail.elevation_max_m ?? 0,
        elevation_min_m: dbTrail.elevation_min_m ?? 0,
        duration_min: dbTrail.duration_min ?? 0,
        difficulty: (dbTrail.difficulty as DemoTrail['difficulty']) ?? 'moyen',
        trail_type: (dbTrail.trail_type as DemoTrail['trail_type']) ?? 'boucle',
        start_lat: dbTrail.start_lat ?? 46.5,
        start_lon: dbTrail.start_lon ?? 2.5,
        cover_photo_url: dbTrail.cover_photo_url ?? '',
        gpx_url: dbTrail.gpx_url ?? null,
        parking: (dbTrail as any).parking_info ?? '',
        start_address: (dbTrail as any).start_address ?? '',
        ign_map: (dbTrail as any).ign_map ?? '',
        gear: (dbTrail as any).recommended_gear ?? [],
        dangers: (dbTrail as any).dangers ?? [],
        regulations: (dbTrail as any).regulations ?? null,
        best_seasons: (dbTrail as any).best_seasons ?? [],
        dogs_allowed: (dbTrail as any).dogs_allowed ?? null,
        public_transport: (dbTrail as any).public_transport ?? null,
        waypoints: (dbTrail as any).waypoints ?? [],
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

  // JSON-LD schema.org
  const trailUrl = `${SITE_URL}/randonnee/${trail.region_slug}/${trail.department_slug}/${trail.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: trail.name,
    description: trail.short_description,
    url: trailUrl,
    image: trail.cover_photo_url || undefined,
    address: {
      '@type': 'PostalAddress',
      addressRegion: trail.region_name,
      addressLocality: trail.department_name,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: trail.start_lat,
      longitude: trail.start_lon,
    },
    // Breadcrumb
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil',     item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Randonnées',  item: `${SITE_URL}/randonnees` },
        { '@type': 'ListItem', position: 3, name: trail.region_name,     item: `${SITE_URL}/randonnees/${trail.region_slug}` },
        { '@type': 'ListItem', position: 4, name: trail.department_name, item: `${SITE_URL}/randonnees/${trail.region_slug}/${trail.department_slug}` },
        { '@type': 'ListItem', position: 5, name: trail.name,   item: trailUrl },
      ],
    },
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO PHOTO ── */}
      <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
        {trail.cover_photo_url ? (
          <Image src={trail.cover_photo_url} alt={trail.name} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-[#F5F5F5]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Fil d'Ariane */}
        <div className="absolute top-24 left-0 right-0 px-6">
          <div className="max-w-[1440px] mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-white/70 flex-wrap">
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
          <div className="max-w-[1440px] mx-auto">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${diff.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
              {diff.label}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">{trail.name}</h1>
            <p className="text-white/80 text-base max-w-xl mb-5">{trail.short_description}</p>

            {/* Stats clés — visibles immédiatement sans scroller */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 12l4-4m-4 4 4 4"/></svg>, label: 'Distance',   value: `${trail.distance_km} km` },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, label: 'Dénivelé +',  value: `${trail.elevation_gain_m} m` },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>, label: 'Dénivelé −',  value: `${trail.elevation_loss_m} m` },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, label: 'Durée',       value: formatDuration(trail.duration_min) },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 20 5-10 4 6 3-4 5 8"/></svg>, label: 'Point haut',  value: `${trail.elevation_max_m} m` },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 4 5 10 4-6 3 4 5-8"/></svg>, label: 'Point bas',   value: `${trail.elevation_min_m} m` },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>, label: 'Type',        value: TYPE_LABEL[trail.trail_type] },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2.5 flex items-center gap-2.5">
                  <span className="shrink-0 opacity-90">{icon}</span>
                  <div>
                    <p className="text-[11px] text-white/70 leading-none mb-1 uppercase tracking-wide">{label}</p>
                    <p className="text-base font-bold text-white leading-none">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── AVERTISSEMENTS DE SÉCURITÉ ── affiché en haut si dangers présents */}
      {trail.dangers.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-[1440px] mx-auto px-6 py-4">
            <div className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <path d="m10.29 3.86-8.6 14.9A2 2 0 0 0 3.41 22h17.18a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <div>
                <p className="text-base font-bold text-amber-800 mb-2">Points de vigilance</p>
                <ul className="space-y-1">
                  {trail.dangers.map((d, i) => (
                    <li key={i} className="text-base text-amber-700 flex items-start gap-2">
                      <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENU ── */}
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Colonne principale ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Carte interactive */}
            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4 pl-4 border-l-4 border-[#025C00]">Carte du parcours</h2>
              <div className="rounded-2xl overflow-hidden border border-[#E5E7EB]">
                <TrailMap lat={trail.start_lat} lon={trail.start_lon} gpxUrl={trail.gpx_url} />
              </div>
            </section>

            {/* Profil altimétrique */}
            {trail.distances_km.length > 0 && trail.elevations_m.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#111111] mb-4 pl-4 border-l-4 border-[#025C00]">Profil altimétrique</h2>
                <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100">
                  <ElevationChart distances={trail.distances_km} elevations={trail.elevations_m} />
                </div>
              </section>
            )}

            {/* Points de passage */}
            {trail.waypoints.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#111111] mb-5 pl-4 border-l-4 border-[#025C00]">Itinéraire étape par étape</h2>
                <ol className="space-y-0">
                  {trail.waypoints.map((wp, i) => (
                    <li key={wp.index} className="flex gap-3">
                      {/* Colonne gauche : ligne haute + cercle centré + ligne basse */}
                      <div className="flex flex-col items-center shrink-0 w-7">
                        <div className={`w-0.5 flex-1 min-h-[8px] ${i > 0 ? 'bg-[#E5E7EB]' : ''}`} />
                        <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${i === 0 || i === trail!.waypoints.length - 1 ? 'bg-[#025C00] text-white' : 'bg-white text-[#025C00] border-2 border-[#025C00]'}`}>
                          {wp.index}
                        </span>
                        <div className={`w-0.5 flex-1 min-h-[8px] ${i < trail!.waypoints.length - 1 ? 'bg-[#E5E7EB]' : ''}`} />
                      </div>
                      {/* Carte */}
                      <div className="flex-1 min-w-0 py-2">
                        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:border-[#025C00]/30 transition-colors">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <p className="font-bold text-[#111111] text-base">{wp.label}</p>
                            <div className="flex items-center gap-3 shrink-0 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                                </svg>
                                {wp.elevation_m} m
                              </span>
                              <span className="flex items-center gap-1">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                                </svg>
                                {wp.distance_from_start_km} km
                              </span>
                            </div>
                          </div>
                          <p className="text-base text-gray-600 leading-relaxed">{wp.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Description */}
            {trail.description && (
              <section>
                <h2 className="text-2xl font-bold text-[#111111] mb-5 pl-4 border-l-4 border-[#025C00]">Description</h2>
                <div className="space-y-4">
                  {trail.description.split(/\r?\n\r?\n/).filter(Boolean).map((para: string, i: number) => (
                    i === 0 ? (
                      <p key={i} className="text-gray-800 leading-relaxed text-base font-medium bg-emerald-50/60 border-l-4 border-[#025C00] pl-4 py-3 rounded-r-lg">
                        {para.trim()}
                      </p>
                    ) : (
                      <p key={i} className="text-gray-700 leading-relaxed text-base">
                        {para.trim()}
                      </p>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Infos pratiques */}
            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-4 pl-4 border-l-4 border-[#025C00]">Infos pratiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trail.parking && (
                  <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#025C00] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-1.5">Parking</p>
                    <p className="text-base text-gray-700 leading-relaxed">{trail.parking}</p>
                  </div>
                )}
                {trail.start_address && (
                  <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#025C00] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-1.5">Point de départ</p>
                    <p className="text-base text-gray-700 leading-relaxed">{trail.start_address}</p>
                    {trail.municipality && (
                      <p className="text-sm text-gray-500 mt-1">{trail.municipality} {trail.postal_code}</p>
                    )}
                  </div>
                )}
                {trail.ign_map && (
                  <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#025C00] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-1.5">Carte IGN</p>
                    <p className="text-base text-gray-700 font-mono font-bold">{trail.ign_map}</p>
                    <p className="text-sm text-gray-500 mt-1">Série Bleue / Top 25</p>
                  </div>
                )}
                <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#025C00] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-2">Coordonnées GPS</p>
                  <p className="text-base text-gray-700 font-mono">N {trail.start_lat.toFixed(5)}°</p>
                  <p className="text-base text-gray-700 font-mono">E {trail.start_lon.toFixed(5)}°</p>
                </div>
                {trail.regulations && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 sm:col-span-2">
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-1.5">Réglementation</p>
                    <p className="text-base text-amber-800 leading-relaxed">{trail.regulations}</p>
                  </div>
                )}
                {trail.public_transport && (
                  <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#025C00] rounded-xl p-4 sm:col-span-2">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-1.5">Transports en commun</p>
                    <p className="text-base text-gray-700 leading-relaxed">{trail.public_transport}</p>
                  </div>
                )}
                {trail.best_seasons && trail.best_seasons.length > 0 && (
                  <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#025C00] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-2">Meilleures saisons</p>
                    <div className="flex flex-wrap gap-2">
                      {trail.best_seasons.map((s: string) => {
                        const labels: Record<string, string> = { printemps: '🌸 Printemps', ete: '☀️ Été', automne: '🍂 Automne', hiver: '❄️ Hiver' }
                        return <span key={s} className="text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full">{labels[s] ?? s}</span>
                      })}
                    </div>
                  </div>
                )}
                {trail.dogs_allowed !== null && trail.dogs_allowed !== undefined && (
                  <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#025C00] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-1.5">Chiens acceptés</p>
                    <p className="text-base text-gray-700">{trail.dogs_allowed ? '✅ Oui (tenus en laisse)' : '❌ Non autorisés'}</p>
                  </div>
                )}
                {trail.tags.length > 0 && (
                  <div className="bg-[#F5F5F5] rounded-xl p-4 sm:col-span-2">
                    <p className="text-xs font-semibold text-[#025C00] uppercase tracking-widest mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {trail.tags.map(tag => (
                        <span key={tag} className="text-sm bg-white border border-[#E5E7EB] text-gray-600 px-3 py-1 rounded-full">#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ── Colonne latérale ── */}
          <div className="space-y-5">

            {/* GPX */}
            <div className={`rounded-2xl p-5 ${trail.gpx_url ? 'bg-[#025C00] text-white' : 'border border-[#E5E7EB]'}`}>
              <h3 className={`text-lg font-bold mb-1 ${trail.gpx_url ? 'text-white' : 'text-[#111111]'}`}>Trace GPS</h3>
              <p className={`text-sm mb-4 ${trail.gpx_url ? 'text-white/70' : 'text-gray-500'}`}>Compatible Garmin, Suunto, Komoot, AllTrails…</p>
              {trail.gpx_url ? (
                <a href={trail.gpx_url} download className="flex items-center justify-center gap-2 w-full bg-white/20 hover:bg-white/30 text-white text-base font-semibold px-4 py-3 rounded-xl transition-colors border border-white/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Télécharger le GPX
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-400 text-base font-medium px-4 py-3 rounded-xl cursor-not-allowed">
                  GPX bientôt disponible
                </div>
              )}
            </div>

            {/* Récap chiffres clés */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-[#111111] mb-4">Chiffres clés</h3>
              <dl className="space-y-3">
                {[
                  { label: 'Distance',      value: `${trail.distance_km} km` },
                  { label: 'Dénivelé +',    value: `${trail.elevation_gain_m} m` },
                  { label: 'Dénivelé −',    value: `${trail.elevation_loss_m} m` },
                  { label: 'Point haut',    value: `${trail.elevation_max_m} m` },
                  { label: 'Point bas',     value: `${trail.elevation_min_m} m` },
                  { label: 'Durée moy.',    value: formatDuration(trail.duration_min) },
                  { label: 'Difficulté',    value: DIFFICULTY_MAP[trail.difficulty]?.label ?? '—' },
                  { label: 'Type',          value: TYPE_LABEL[trail.trail_type] },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-base border-b border-emerald-100 pb-2 last:border-0 last:pb-0">
                    <dt className="text-gray-600">{label}</dt>
                    <dd className="font-bold text-[#025C00]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Équipements */}
            {trail.gear.length > 0 && (
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-[#111111] mb-4">Équipements conseillés</h3>
                <ul className="space-y-2.5">
                  {trail.gear.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-[#025C00]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Randonnées à proximité (DB) */}
            <NearbyTrails trailId={trail.id} lat={trail.start_lat} lon={trail.start_lon} />

            {/* Autres randonnées de la région (démo) */}
            {DEMO_TRAILS.filter(t => t.region_slug === trail!.region_slug && t.slug !== trail!.slug).length > 0 && (
              <div className="border border-[#E5E7EB] rounded-2xl p-5">
                <h3 className="text-lg font-bold text-[#111111] mb-4">Dans la même région</h3>
                <ul className="space-y-3">
                  {DEMO_TRAILS.filter(t => t.region_slug === trail!.region_slug && t.slug !== trail!.slug).slice(0, 3).map(t => (
                    <li key={t.id}>
                      <Link href={`/randonnee/${t.region_slug}/${t.department_slug}/${t.slug}`} className="group flex items-start gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image src={t.cover_photo_url} alt={t.name} fill className="object-cover transition-transform group-hover:scale-110 duration-300" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-medium text-[#111111] group-hover:text-[#025C00] transition-colors line-clamp-2 leading-snug">{t.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{t.distance_km} km · {t.elevation_gain_m} m D+</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
