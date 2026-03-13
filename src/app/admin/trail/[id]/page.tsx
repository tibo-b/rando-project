import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTrailById } from '@/lib/db'
import ApproveRejectButtons from './ApproveRejectButtons'

// Donnée de démo pour visualiser la page sans base de données
const DEMO_TRAIL = {
  id: 1,
  slug: 'gorges-du-verdon-grand-canyon',
  name: 'Gorges du Verdon — Grand Canyon',
  status: 'pending' as const,
  distance_km: 24.5,
  elevation_gain_m: 820,
  elevation_loss_m: 650,
  elevation_max_m: 1250,
  elevation_min_m: 430,
  duration_min: 480,
  difficulty: 'difficile' as const,
  trail_type: 'boucle' as const,
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
  recommended_gear: ['Chaussures de randonnée montantes', 'Eau (minimum 2L)', 'Crème solaire', 'Bâtons de marche', 'Lampe frontale'],
  best_seasons: ['printemps', 'ete', 'automne'],
  dogs_allowed: false,
  parking_info: 'Parking gratuit à La Palud-sur-Verdon, place du village',
  public_transport: 'Bus saisonnier depuis Castellane et Moustiers-Sainte-Marie',
  source: 'osm',
  source_id: 'relation/12345678',
  meta_title: null,
  meta_description: null,
  department_name: 'Alpes-de-Haute-Provence',
  region_name: 'Provence-Alpes-Côte d\'Azur',
  department_slug: 'alpes-de-haute-provence',
  region_slug: 'provence-alpes-cote-dazur',
  created_at: new Date('2024-03-10'),
  updated_at: new Date('2024-03-10'),
  published_at: null,
}

const DIFFICULTY_LABELS: Record<string, string> = {
  tres_facile: 'Très facile',
  facile: 'Facile',
  moyen: 'Moyen',
  difficile: 'Difficile',
  tres_difficile: 'Très difficile',
}

const TRAIL_TYPE_LABELS: Record<string, string> = {
  boucle: 'Boucle',
  aller_retour: 'Aller-retour',
  point_a_point: 'Point à point',
}

function formatDuration(minutes: number | null) {
  if (!minutes) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

export default async function AdminTrailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const trailId = parseInt(id, 10)

  if (isNaN(trailId)) notFound()

  // Tentative de lecture en base, sinon données de démo
  let trail: typeof DEMO_TRAIL | null = null
  let dbConnected = false

  try {
    const dbTrail = await getTrailById(trailId)
    if (dbTrail) {
      trail = dbTrail as unknown as typeof DEMO_TRAIL
      dbConnected = true
    }
  } catch {
    // DB non disponible
  }

  // En démo on utilise la donnée exemple (seulement si id=1)
  if (!trail) {
    if (trailId === 1) {
      trail = DEMO_TRAIL
    } else {
      notFound()
    }
  }

  return (
    <div>
      {/* Navigation retour */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin/queue"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Retour à la file d&apos;attente
        </Link>
        {!dbConnected && (
          <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 rounded px-2 py-1">
            Données de démo
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne gauche : infos et stats */}
        <div className="lg:col-span-1 space-y-4">

          {/* Statut */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Statut</h2>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">
                En attente
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Importé le {new Date(trail.created_at).toLocaleDateString('fr-FR')}
              {trail.source && ` · Source : ${trail.source.toUpperCase()}`}
            </p>
          </div>

          {/* Statistiques */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Statistiques</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Distance</dt>
                <dd className="font-medium text-gray-900">
                  {trail.distance_km ? `${trail.distance_km} km` : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Dénivelé positif</dt>
                <dd className="font-medium text-gray-900">
                  {trail.elevation_gain_m ? `${trail.elevation_gain_m} m` : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Dénivelé négatif</dt>
                <dd className="font-medium text-gray-900">
                  {trail.elevation_loss_m ? `${trail.elevation_loss_m} m` : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Altitude max</dt>
                <dd className="font-medium text-gray-900">
                  {trail.elevation_max_m ? `${trail.elevation_max_m} m` : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Durée estimée</dt>
                <dd className="font-medium text-gray-900">{formatDuration(trail.duration_min)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Type</dt>
                <dd className="font-medium text-gray-900">
                  {TRAIL_TYPE_LABELS[trail.trail_type ?? ''] ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Difficulté</dt>
                <dd className="font-medium text-gray-900">
                  {DIFFICULTY_LABELS[trail.difficulty ?? ''] ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Chiens autorisés</dt>
                <dd className="font-medium text-gray-900">
                  {trail.dogs_allowed === null ? '—' : trail.dogs_allowed ? 'Oui' : 'Non'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Lieu */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Localisation</h2>
            <p className="text-sm text-gray-900">{trail.department_name ?? '—'}</p>
            <p className="text-xs text-gray-400">{trail.region_name ?? '—'}</p>
            {trail.start_lat && trail.start_lon && (
              <p className="text-xs text-gray-400 mt-1">
                {trail.start_lat.toFixed(4)}, {trail.start_lon.toFixed(4)}
              </p>
            )}
          </div>

          {/* Équipements */}
          {trail.recommended_gear && trail.recommended_gear.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Équipements conseillés</h2>
              <ul className="space-y-1">
                {trail.recommended_gear.map((gear, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-gray-300 mt-0.5">·</span>
                    {gear}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* GPX */}
          {trail.gpx_url && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Fichier GPX</h2>
              <a
                href={trail.gpx_url}
                className="text-sm text-gray-900 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Télécharger le GPX →
              </a>
            </div>
          )}
        </div>

        {/* Colonne droite : nom, description, actions */}
        <div className="lg:col-span-2 space-y-4">

          {/* Nom de la randonnée */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h1 className="text-lg font-semibold text-gray-900">{trail.name}</h1>
            {trail.short_description && (
              <p className="text-sm text-gray-500 mt-1">{trail.short_description}</p>
            )}
          </div>

          {/* Description générée par l'IA */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Description
              </h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                Générée par IA
              </span>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {trail.description ?? (
                <span className="text-gray-400 italic">Aucune description générée</span>
              )}
            </div>
          </div>

          {/* Infos pratiques */}
          {(trail.parking_info || trail.public_transport) && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Infos pratiques</h2>
              {trail.parking_info && (
                <div className="mb-2">
                  <p className="text-xs text-gray-400 uppercase mb-1">Parking</p>
                  <p className="text-sm text-gray-700">{trail.parking_info}</p>
                </div>
              )}
              {trail.public_transport && (
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Transports en commun</p>
                  <p className="text-sm text-gray-700">{trail.public_transport}</p>
                </div>
              )}
            </div>
          )}

          {/* Boutons Approuver / Rejeter */}
          <ApproveRejectButtons trailId={trail.id} dbConnected={dbConnected} />
        </div>
      </div>
    </div>
  )
}
