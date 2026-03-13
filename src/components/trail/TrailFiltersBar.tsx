'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const DIFFICULTIES = [
  { slug: 'tres_facile',    label: 'Très facile',    dot: 'bg-emerald-500' },
  { slug: 'facile',         label: 'Facile',         dot: 'bg-green-500' },
  { slug: 'moyen',          label: 'Moyen',          dot: 'bg-yellow-500' },
  { slug: 'difficile',      label: 'Difficile',      dot: 'bg-orange-500' },
  { slug: 'tres_difficile', label: 'Très difficile', dot: 'bg-red-500' },
]

const TYPES = [
  { slug: 'boucle',        label: 'Boucle' },
  { slug: 'aller_retour',  label: 'Aller-retour' },
  { slug: 'point_a_point', label: 'Point à point' },
]

interface Props {
  currentDifficulte?: string
  currentType?: string
}

export default function TrailFiltersBar({ currentDifficulte, currentType }: Props) {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.get(key) === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ''}`)
  }, [router, pathname, searchParams])

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('difficulte')
    params.delete('type')
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`)
  }, [router, pathname, searchParams])

  const hasFilters = !!(currentDifficulte || currentType)

  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* Label Difficulté */}
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest shrink-0">
        Difficulté
      </span>

      {DIFFICULTIES.map(d => (
        <button
          key={d.slug}
          onClick={() => updateFilter('difficulte', d.slug)}
          className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-all ${
            currentDifficulte === d.slug
              ? 'bg-[#025C00] text-white border-[#025C00] font-semibold'
              : 'border-[#E5E7EB] text-gray-700 hover:border-[#025C00] hover:text-[#025C00] bg-white'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            currentDifficulte === d.slug ? 'bg-white/70' : d.dot
          }`} />
          {d.label}
        </button>
      ))}

      {/* Séparateur */}
      <span className="w-px h-5 bg-[#E5E7EB] mx-1 shrink-0" />

      {/* Label Type */}
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest shrink-0">
        Type
      </span>

      {TYPES.map(t => (
        <button
          key={t.slug}
          onClick={() => updateFilter('type', t.slug)}
          className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
            currentType === t.slug
              ? 'bg-[#025C00] text-white border-[#025C00] font-semibold'
              : 'border-[#E5E7EB] text-gray-700 hover:border-[#025C00] hover:text-[#025C00] bg-white'
          }`}
        >
          {t.label}
        </button>
      ))}

      {/* Tout effacer */}
      {hasFilters && (
        <>
          <span className="w-px h-5 bg-[#E5E7EB] mx-1 shrink-0" />
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#025C00] transition-colors underline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            Tout effacer
          </button>
        </>
      )}
    </div>
  )
}
