import { getNearbyTrails } from '@/lib/db'
import Link from 'next/link'

interface Props {
  trailId: number
  lat: number
  lon: number
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  tres_facile:    { label: 'Très facile',    color: 'bg-emerald-100 text-emerald-700' },
  facile:         { label: 'Facile',         color: 'bg-green-100 text-green-700' },
  moyen:          { label: 'Moyen',          color: 'bg-yellow-100 text-yellow-700' },
  difficile:      { label: 'Difficile',      color: 'bg-orange-100 text-orange-700' },
  tres_difficile: { label: 'Très difficile', color: 'bg-red-100 text-red-700' },
}

export default async function NearbyTrails({ trailId, lat, lon }: Props) {
  type NearbyTrail = { id: number; slug: string; name: string; difficulty: string | null; distance_km: number | null; elevation_gain_m: number | null; region_slug: string; department_slug: string }
  let trails: NearbyTrail[] = []

  try {
    trails = (await getNearbyTrails(trailId, lat, lon, 30, 4)) as unknown as NearbyTrail[]
  } catch {
    // DB non disponible — on n'affiche rien
    return null
  }

  if (trails.length === 0) return null

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Randonnées à proximité</h3>
      <ul className="space-y-3">
        {trails.map(trail => {
          const diff = DIFFICULTY_LABELS[trail.difficulty ?? '']
          const href = `/randonnee/${trail.region_slug}/${trail.department_slug}/${trail.slug}`

          return (
            <li key={trail.id}>
              <Link href={href} className="group block">
                <span className="text-sm font-medium text-gray-800 group-hover:text-gray-600 transition-colors line-clamp-1">
                  {trail.name}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  {trail.distance_km && (
                    <span className="text-xs text-gray-400">{trail.distance_km} km</span>
                  )}
                  {trail.elevation_gain_m && (
                    <span className="text-xs text-gray-400">· {trail.elevation_gain_m} m D+</span>
                  )}
                  {diff && (
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${diff.color}`}>
                      {diff.label}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
