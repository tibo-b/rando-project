'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const DIFFICULTIES = [
  { slug: 'tres_facile',    label: 'Très facile',    color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  { slug: 'facile',         label: 'Facile',         color: 'bg-green-100 text-green-700 border-green-200',       dot: 'bg-green-500' },
  { slug: 'moyen',          label: 'Moyen',          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',    dot: 'bg-yellow-500' },
  { slug: 'difficile',      label: 'Difficile',      color: 'bg-orange-100 text-orange-700 border-orange-200',    dot: 'bg-orange-500' },
  { slug: 'tres_difficile', label: 'Très difficile', color: 'bg-red-100 text-red-700 border-red-200',             dot: 'bg-red-500' },
]

const TYPES = [
  { slug: 'boucle',        label: 'Boucle' },
  { slug: 'aller_retour',  label: 'Aller-retour' },
  { slug: 'point_a_point', label: 'Point à point' },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

interface Props {
  currentDifficulte?: string
  currentType?: string
  currentRegion?: string
}

export default function TrailFilters({ currentDifficulte, currentType }: Props) {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  // Listes actives (valeurs multiples séparées par virgule)
  const activeDiffs = currentDifficulte ? currentDifficulte.split(',') : []
  const activeTypes = currentType       ? currentType.split(',')       : []

  const [openDiff, setOpenDiff] = useState(activeDiffs.length > 0)
  const [openType, setOpenType] = useState(activeTypes.length > 0)

  const toggleFilter = useCallback((key: string, value: string, current: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    if (next.length === 0) {
      params.delete(key)
    } else {
      params.set(key, next.join(','))
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ''}`)
  }, [router, pathname, searchParams])

  const hasFilters = activeDiffs.length > 0 || activeTypes.length > 0

  return (
    <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
      {/* En-tête */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <h2 className="font-bold text-[#111111] text-base">Filtres</h2>
        {hasFilters && (
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString())
              params.delete('difficulte')
              params.delete('type')
              router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`)
            }}
            className="text-sm text-gray-500 hover:text-[#025C00] transition-colors underline cursor-pointer"
          >
            Tout effacer
          </button>
        )}
      </div>

      {/* Section Difficulté */}
      <div className="border-b border-[#E5E7EB]">
        <button
          onClick={() => setOpenDiff(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
        >
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Difficulté</span>
          <div className="flex items-center gap-2">
            {activeDiffs.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#025C00]" />
            )}
            <ChevronIcon open={openDiff} />
          </div>
        </button>

        {openDiff && (
          <div className="px-4 pt-2 pb-4 flex flex-col gap-2">
            {DIFFICULTIES.map(d => {
              const active = activeDiffs.includes(d.slug)
              return (
                <button
                  key={d.slug}
                  onClick={() => toggleFilter('difficulte', d.slug, activeDiffs)}
                  className={`flex items-center gap-2.5 text-base px-3 py-2 rounded-xl border transition-all text-left cursor-pointer ${
                    active
                      ? `${d.color} font-semibold`
                      : 'border-[#E5E7EB] text-gray-700 hover:bg-[#F5F5F5]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${d.dot}`} />
                  {d.label}
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Section Type */}
      <div>
        <button
          onClick={() => setOpenType(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
        >
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Type</span>
          <div className="flex items-center gap-2">
            {activeTypes.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#025C00]" />
            )}
            <ChevronIcon open={openType} />
          </div>
        </button>

        {openType && (
          <div className="px-4 pt-2 pb-4 flex flex-col gap-2">
            {TYPES.map(t => {
              const active = activeTypes.includes(t.slug)
              return (
                <button
                  key={t.slug}
                  onClick={() => toggleFilter('type', t.slug, activeTypes)}
                  className={`flex items-center gap-2.5 text-base px-3 py-2 rounded-xl border transition-all text-left cursor-pointer ${
                    active
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
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
