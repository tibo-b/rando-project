import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getApprovedTrailBySlug } from '@/lib/db'
import TrailStats from '@/components/trail/TrailStats'
import TrailMap from '@/components/map/TrailMap'
import ElevationChart from '@/components/trail/ElevationChart'
import NearbyTrails from '@/components/trail/NearbyTrails'

// Données de démo pour visualiser la page sans base de données
const DEMO_TRAIL = {
  id: 1,
  slug: 'gorges-du-verdon-grand-canyon',
  name: 'Gorges du Verdon — Grand Canyon',
  status: 'approved',
  distance_km: 24.5,
  elevation_gain_m: 820,
  elevation_loss_m: 650,
  elevation_max_m: 1250,
  elevation_min_m: 430,
  duration_min: 480,
  difficulty: 'difficile',
  trail_type: 'boucle',
  activity: ['randonnee_pedestre'],
  is_multi_day: false,
  start_lat: 43.769,
  start_lon: 6.342,
  cover_photo_url: null,
  gpx_url: null,
  description: `Les Gorges du Verdon, surnommées le "Grand Canyon européen", constituent l'un des sites naturels les plus spectaculaires de France. Ce circuit vous entraîne le long des falaises calcaires vertigineuses qui plongent dans les eaux turquoise du Verdon, offrant des panoramas à couper le souffle à chaque virage.

Le départ s'effectue depuis La Palud-sur-Verdon, village provençal typique perché à 950 mètres d'altitude. Les premiers kilomètres longent le plateau avant de plonger vers les berges du lac de Sainte-Croix, où la lumière du matin illumine les parois ocre et blanches des falaises.

La descente vers le fond des gorges emprunte des sentiers aménagés mais exigeants, nécessitant une bonne condition physique et des chaussures adaptées. Les passages les plus techniques sont équipés de câbles de sécurité. La remontée s'effectue par le versant est, moins fréquenté et sauvage.

Points d'intérêt majeurs : le Belvédère de la Mescla, le pont de l'Artuby (160 m de haut), les plages naturelles accessibles uniquement à pied.`,
  short_description: 'Le plus grand canyon d\'Europe, entre falaises calcaires et eaux turquoise.',
  recommended_gear: ['Chaussures de randonnée montantes', 'Eau (minimum 2L)', 'Crème solaire', 'Bâtons de marche'],
  best_seasons: ['printemps', 'ete', 'automne'],
  dogs_allowed: false,
  parking_info: 'Parking gratuit à La Palud-sur-Verdon, place du village',
  public_transport: 'Bus saisonnier depuis Castellane et Moustiers-Sainte-Marie',
  department_name: 'Alpes-de-Haute-Provence',
  region_name: 'Provence-Alpes-Côte d\'Azur',
  department_slug: 'alpes-de-haute-provence',
  region_slug: 'provence-alpes-cote-dazur',
  distances_km: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24.5],
  elevations_m: [950,940,920,880,820,750,680,620,580,550,540,535,540,560,600,660,730,800,870,940,1000,1080,1150,1210,1240,1250],
  meta_title: null,
  meta_description: null,
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  tres_facile:    { label: 'Très facile',    color: 'bg-emerald-100 text-emerald-700' },
  facile:         { label: 'Facile',         color: 'bg-green-100 text-green-700' },
  moyen:          { label: 'Moyen',          color: 'bg-yellow-100 text-yellow-700' },
  difficile:      { label: 'Difficile',      color: 'bg-orange-100 text-orange-700' },
  tres_difficile: { label: 'Très difficile', color: 'bg-red-100 text-red-700' },
}

const SEASON_LABELS: Record<string, string> = {
  printemps: 'Printemps',
  ete: 'Été',
  automne: 'Automne',
  hiver: 'Hiver',
}

type Params = { regionSlug: string; deptSlug: string; trailSlug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { trailSlug } = await params
  let trail = null
  try {
    trail = await getApprovedTrailBySlug(trailSlug)
  } catch { /* DB non dispo */ }

  if (!trail && trailSlug === DEMO_TRAIL.slug) trail = DEMO_TRAIL as typeof trail

  if (!trail) return { title: 'Randonnée introuvable' }

  return {
    title: trail.meta_title ?? `${trail.name} — Randonnée ${trail.distance_km}km`,
    description: trail.meta_description ?? trail.short_description ?? undefined,
  }
}

export default async function TrailPage({ params }: { params: Promise<Params> }) {
  const { trailSlug } = await params

  let trail: typeof DEMO_TRAIL | null = null
  try {
    const dbTrail = await getApprovedTrailBySlug(trailSlug)
    if (dbTrail) trail = dbTrail as typeof DEMO_TRAIL
  } catch { /* DB non dispo */ }

  if (!trail) {
    if (trailSlug === DEMO_TRAIL.slug) {
      trail = DEMO_TRAIL
    } else {
      notFound()
    }
  }

  const diff = DIFFICULTY_LABELS[trail.difficulty ?? ''] ?? { label: '—', color: 'bg-gray-100 text-gray-500' }

  return (
    <article>
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Fil d'Ariane (= chemin de navigation) */}
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
            <a href="/" className="hover:text-gray-600">Accueil</a>
            <span>›</span>
            <a href="/randonnees" className="hover:text-gray-600">Randonnées</a>
            <span>›</span>
            <span className="hover:text-gray-600">{trail.region_name}</span>
            <span>›</span>
            <span className="hover:text-gray-600">{trail.department_name}</span>
            <span>›</span>
            <span className="text-gray-600">{trail.name}</span>
          </nav>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {trail.name}
          </h1>

          {trail.short_description && (
            <p className="text-gray-500 mb-5 max-w-2xl">{trail.short_description}</p>
          )}

          {/* Stats clés */}
          <TrailStats trail={trail} difficultyBadge={diff} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">

            {/* Carte interactive */}
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Carte du parcours</h2>
              <TrailMap
                lat={trail.start_lat ?? 46.5}
                lon={trail.start_lon ?? 2.5}
                gpxUrl={trail.gpx_url}
              />
            </section>

            {/* Profil altimétrique */}
            {trail.distances_km && trail.elevations_m && (
              <section>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Profil altimétrique</h2>
                <ElevationChart
                  distances={trail.distances_km as number[]}
                  elevations={trail.elevations_m as number[]}
                />
              </section>
            )}

            {/* Description */}
            {trail.description && (
              <section>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Description</h2>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {trail.description}
                </div>
              </section>
            )}

            {/* Infos pratiques */}
            {(trail.parking_info || trail.public_transport) && (
              <section>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Infos pratiques</h2>
                <div className="space-y-3">
                  {trail.parking_info && (
                    <div className="flex gap-3 text-sm">
                      <span className="text-gray-400 w-28 shrink-0">Parking</span>
                      <span className="text-gray-700">{trail.parking_info}</span>
                    </div>
                  )}
                  {trail.public_transport && (
                    <div className="flex gap-3 text-sm">
                      <span className="text-gray-400 w-28 shrink-0">Transports</span>
                      <span className="text-gray-700">{trail.public_transport}</span>
                    </div>
                  )}
                  {trail.dogs_allowed !== null && (
                    <div className="flex gap-3 text-sm">
                      <span className="text-gray-400 w-28 shrink-0">Chiens</span>
                      <span className="text-gray-700">{trail.dogs_allowed ? 'Autorisés' : 'Non autorisés'}</span>
                    </div>
                  )}
                  {trail.best_seasons && trail.best_seasons.length > 0 && (
                    <div className="flex gap-3 text-sm">
                      <span className="text-gray-400 w-28 shrink-0">Meilleures saisons</span>
                      <span className="text-gray-700">
                        {trail.best_seasons.map(s => SEASON_LABELS[s] ?? s).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-4">

            {/* Télécharger GPX */}
            {trail.gpx_url && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Trace GPS</h3>
                <a
                  href={trail.gpx_url}
                  download
                  className="block w-full text-center bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Télécharger le GPX
                </a>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Compatible Garmin, Suunto, Komoot…
                </p>
              </div>
            )}

            {/* Équipements conseillés */}
            {trail.recommended_gear && trail.recommended_gear.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Équipements conseillés</h3>
                <ul className="space-y-1.5">
                  {trail.recommended_gear.map((gear, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5 shrink-0">·</span>
                      {gear}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Randonnées à proximité */}
            {trail.start_lat && trail.start_lon && (
              <NearbyTrails
                trailId={trail.id}
                lat={trail.start_lat}
                lon={trail.start_lon}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
