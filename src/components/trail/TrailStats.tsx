interface Props {
  trail: {
    distance_km: number | null
    elevation_gain_m: number | null
    duration_min: number | null
    trail_type: string | null
    difficulty: string | null
  }
  difficultyBadge: { label: string; color: string }
}

function formatDuration(minutes: number | null) {
  if (!minutes) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

const TRAIL_TYPE_LABELS: Record<string, string> = {
  boucle: 'Boucle',
  aller_retour: 'Aller-retour',
  point_a_point: 'Point à point',
}

export default function TrailStats({ trail, difficultyBadge }: Props) {
  const stats = [
    { label: 'Distance', value: trail.distance_km ? `${trail.distance_km} km` : null },
    { label: 'Dénivelé +', value: trail.elevation_gain_m ? `${trail.elevation_gain_m} m` : null },
    { label: 'Durée', value: formatDuration(trail.duration_min) },
    { label: 'Type', value: TRAIL_TYPE_LABELS[trail.trail_type ?? ''] ?? null },
  ].filter(s => s.value !== null)

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Badge difficulté */}
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyBadge.color}`}>
        {difficultyBadge.label}
      </span>

      {/* Séparateur */}
      <span className="text-gray-200">|</span>

      {/* Stats */}
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-1.5 text-sm">
          <span className="text-gray-400">{stat.label}</span>
          <span className="font-medium text-gray-800">{stat.value}</span>
          {i < stats.length - 1 && <span className="text-gray-200 ml-1.5">·</span>}
        </div>
      ))}
    </div>
  )
}
