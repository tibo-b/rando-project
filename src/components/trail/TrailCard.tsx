import Link from 'next/link'
import Image from 'next/image'
import type { DemoTrail } from '@/lib/demo-data'

const DIFFICULTY_MAP = {
  tres_facile:    { label: 'Très facile',    color: 'bg-emerald-100 text-emerald-700' },
  facile:         { label: 'Facile',         color: 'bg-green-100 text-green-700'     },
  moyen:          { label: 'Moyen',          color: 'bg-yellow-100 text-yellow-800'   },
  difficile:      { label: 'Difficile',      color: 'bg-orange-100 text-orange-700'   },
  tres_difficile: { label: 'Très difficile', color: 'bg-red-100 text-red-700'         },
}

const TYPE_LABEL: Record<string, string> = {
  boucle:        'Boucle',
  aller_retour:  'Aller-retour',
  point_a_point: 'Point à point',
}

function formatDuration(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

interface Props {
  trail: DemoTrail
  /** Affiche le département sous le nom (utile sur la page listing globale) */
  showDept?: boolean
}

export default function TrailCard({ trail, showDept = false }: Props) {
  const diff = DIFFICULTY_MAP[trail.difficulty]
  const href = `/randonnee/${trail.region_slug}/${trail.department_slug}/${trail.slug}`

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Photo */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={trail.cover_photo_url}
          alt={trail.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge difficulté */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diff.color}`}>
            {diff.label}
          </span>
        </div>
        {/* Badge type */}
        <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1">
          <span className="text-xs font-medium text-[#111111]">{TYPE_LABEL[trail.trail_type]}</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-1">
        {showDept && (
          <p className="text-sm text-gray-500 mb-1 font-medium">{trail.department_name}</p>
        )}
        <h3 className="font-bold text-[#111111] text-base leading-snug mb-2 line-clamp-2">
          {trail.name}
        </h3>
        <p className="text-base text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {trail.short_description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 pt-3 mt-4 border-t border-[#F5F5F5] text-base">
          <div className="flex items-center gap-1.5 text-[#111111] font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#025C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 12l4-4m-4 4 4 4" />
            </svg>
            {trail.distance_km} km
          </div>
          <div className="w-px h-4 bg-[#E5E7EB]" />
          <div className="flex items-center gap-1.5 text-[#111111] font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#025C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 20 5-10 4 6 3-4 5 8" />
            </svg>
            {trail.elevation_gain_m} m D+
          </div>
          <div className="w-px h-4 bg-[#E5E7EB]" />
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            {formatDuration(trail.duration_min)}
          </div>
        </div>
      </div>
    </Link>
  )
}
