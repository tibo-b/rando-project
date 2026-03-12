'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const DIFFICULTIES = [
  { slug: 'tres_facile',    label: 'Très facile',    color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { slug: 'facile',         label: 'Facile',         color: 'bg-green-100 text-green-700 border-green-200' },
  { slug: 'moyen',          label: 'Moyen',          color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { slug: 'difficile',      label: 'Difficile',      color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { slug: 'tres_difficile', label: 'Très difficile', color: 'bg-red-100 text-red-700 border-red-200' },
]

const TYPES = [
  { slug: 'boucle',        label: 'Boucle' },
  { slug: 'aller_retour',  label: 'Aller-retour' },
  { slug: 'point_a_point', label: 'Point à point' },
]

interface Props {
  currentDifficulte?: string
  currentType?: string
  currentRegion?: string
}

export default function TrailFilters({ currentDifficulte, currentType, currentRegion }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || params.get(key) === value) {
      params.delete(key) // toggle off si même valeur
    } else {
      params.set(key, value)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ''}`)
  }, [router, pathname, searchParams])

  const hasFilters = !!(currentDifficulte || currentType)

  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[#111111] text-base">Filtres</h2>
        {hasFilters && (
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString())
              params.delete('difficulte')
              params.delete('type')
              const qs = params.toString()
              router.push(`${pathname}${qs ? `?${qs}` : ''}`)
            }}
            className="text-sm text-gray-500 hover:text-[#025C00] transition-colors underline"
          >
            Tout effacer
          </button>
        )}
      </div>

      {/* Difficulté */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Difficulté</p>
        <div className="flex flex-col gap-2">
          {DIFFICULTIES.map(d => (
            <button
              key={d.slug}
              onClick={() => updateFilter('difficulte', d.slug)}
              className={`flex items-center gap-2.5 text-base px-3 py-2 rounded-xl border transition-all text-left ${
                currentDifficulte === d.slug
                  ? `${d.color} font-semibold`
                  : 'border-[#E5E7EB] text-gray-700 hover:bg-[#F5F5F5]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${
                d.slug === 'tres_facile' ? 'bg-emerald-500' :
                d.slug === 'facile'      ? 'bg-green-500' :
                d.slug === 'moyen'       ? 'bg-yellow-500' :
                d.slug === 'difficile'   ? 'bg-orange-500' : 'bg-red-500'
              }`} />
              {d.label}
              {currentDifficulte === d.slug && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Type de parcours */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Type</p>
        <div className="flex flex-col gap-2">
          {TYPES.map(t => (
            <button
              key={t.slug}
              onClick={() => updateFilter('type', t.slug)}
              className={`flex items-center gap-2.5 text-base px-3 py-2 rounded-xl border transition-all text-left ${
                currentType === t.slug
                  ? 'border-[#025C00] bg-[#025C00]/5 text-[#025C00] font-semibold'
                  : 'border-[#E5E7EB] text-gray-700 hover:bg-[#F5F5F5]'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                {t.slug === 'boucle'
                  ? <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></>
                  : t.slug === 'aller_retour'
                  ? <><path d="M3 12h18M3 12l4-4m-4 4 4 4"/></>
                  : <><path d="M5 12h14M12 5l7 7-7 7"/></>
                }
              </svg>
              {t.label}
              {currentType === t.slug && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
