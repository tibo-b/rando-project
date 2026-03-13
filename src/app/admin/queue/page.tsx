import Link from 'next/link'
import { getPendingTrails, getPendingCount } from '@/lib/db'

// Données de démo quand la base de données n'est pas encore lancée
const DEMO_TRAILS = [
  {
    id: 1,
    slug: 'gorges-du-verdon-grand-canyon',
    name: 'Gorges du Verdon — Grand Canyon',
    status: 'pending',
    distance_km: 24.5,
    elevation_gain_m: 820,
    difficulty: 'difficile',
    trail_type: 'boucle',
    cover_photo_url: null,
    created_at: new Date('2024-03-10'),
    department_name: 'Alpes-de-Haute-Provence',
    region_name: 'Provence-Alpes-Côte d\'Azur',
  },
  {
    id: 2,
    slug: 'mont-blanc-refuge-du-gouter',
    name: 'Mont Blanc — Refuge du Goûter',
    status: 'pending',
    distance_km: 12.8,
    elevation_gain_m: 1560,
    difficulty: 'tres_difficile',
    trail_type: 'aller_retour',
    cover_photo_url: null,
    created_at: new Date('2024-03-11'),
    department_name: 'Haute-Savoie',
    region_name: 'Auvergne-Rhône-Alpes',
  },
  {
    id: 3,
    slug: 'calanques-marseille-morgiou',
    name: 'Calanques de Marseille — Morgiou',
    status: 'pending',
    distance_km: 9.2,
    elevation_gain_m: 350,
    difficulty: 'moyen',
    trail_type: 'boucle',
    cover_photo_url: null,
    created_at: new Date('2024-03-11'),
    department_name: 'Bouches-du-Rhône',
    region_name: 'Provence-Alpes-Côte d\'Azur',
  },
]

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  tres_facile:  { label: 'Très facile', color: 'bg-emerald-100 text-emerald-700' },
  facile:       { label: 'Facile',      color: 'bg-green-100 text-green-700' },
  moyen:        { label: 'Moyen',       color: 'bg-yellow-100 text-yellow-700' },
  difficile:    { label: 'Difficile',   color: 'bg-orange-100 text-orange-700' },
  tres_difficile: { label: 'Très difficile', color: 'bg-red-100 text-red-700' },
}

const TRAIL_TYPE_LABELS: Record<string, string> = {
  boucle:        'Boucle',
  aller_retour:  'Aller-retour',
  point_a_point: 'Point à point',
}

export default async function AdminQueuePage() {
  // Tentative de connexion à la base de données
  // Si la DB n'est pas lancée, on affiche les données de démo
  let trails: typeof DEMO_TRAILS = []
  let pendingCount = 0
  let dbConnected = false

  try {
    const [dbTrails, count] = await Promise.all([
      getPendingTrails(50),
      getPendingCount(),
    ])
    trails = dbTrails as unknown as typeof DEMO_TRAILS
    pendingCount = count
    dbConnected = true
  } catch {
    trails = DEMO_TRAILS
    pendingCount = DEMO_TRAILS.length
  }

  return (
    <div>
      {/* En-tête de la page */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            File d&apos;attente
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {pendingCount} randonnée{pendingCount !== 1 ? 's' : ''} en attente de validation
          </p>
        </div>

        {/* Indicateur de connexion à la base */}
        {!dbConnected && (
          <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-700 border border-amber-200 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
            Données de démo — base de données non connectée
          </div>
        )}
        {dbConnected && (
          <div className="flex items-center gap-2 text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            Base de données connectée
          </div>
        )}
      </div>

      {/* Tableau des randonnées en attente */}
      {trails.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Aucune randonnée en attente</p>
          <p className="text-sm mt-1">Les nouvelles randonnées importées apparaîtront ici</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Nom</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Lieu</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Distance</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">D+</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Difficulté</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Importé le</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {trails.map((trail, i) => {
                const diff = DIFFICULTY_LABELS[trail.difficulty ?? ''] ?? { label: '—', color: 'bg-gray-100 text-gray-500' }
                return (
                  <tr
                    key={trail.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i === trails.length - 1 ? 'border-0' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-xs">
                      <span className="block truncate">{trail.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <span className="block">{trail.department_name ?? '—'}</span>
                      <span className="text-xs text-gray-400">{trail.region_name ?? ''}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {trail.distance_km ? `${trail.distance_km} km` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {trail.elevation_gain_m ? `${trail.elevation_gain_m} m` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {TRAIL_TYPE_LABELS[trail.trail_type ?? ''] ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${diff.color}`}>
                        {diff.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(trail.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/trail/${trail.id}`}
                        className="text-sm font-medium text-gray-900 hover:underline"
                      >
                        Valider →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
