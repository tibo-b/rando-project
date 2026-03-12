'use client'

import { useMemo, useState } from 'react'

interface Props {
  distances: number[]   // en km
  elevations: number[]  // en mètres
}

const PAD = { top: 24, right: 24, bottom: 44, left: 56 }
const W = 700
const H = 220

export default function ElevationChart({ distances, elevations }: Props) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  const { points, gridY, minElev, maxElev, totalDist } = useMemo(() => {
    const minElev = Math.min(...elevations)
    const maxElev = Math.max(...elevations)
    const totalDist = distances[distances.length - 1]
    const innerW = W - PAD.left - PAD.right
    const innerH = H - PAD.top - PAD.bottom
    const elevRange = maxElev - minElev || 1

    const points = distances.map((d, i) => ({
      x: PAD.left + (d / totalDist) * innerW,
      y: PAD.top + innerH - ((elevations[i] - minElev) / elevRange) * innerH,
      dist: d,
      elev: elevations[i],
    }))

    // Lignes de grille horizontales à des altitudes rondes
    const step = elevRange <= 200 ? 50 : elevRange <= 500 ? 100 : elevRange <= 1000 ? 200 : 500
    const firstMark = Math.ceil(minElev / step) * step
    const gridY: { y: number; label: string }[] = []
    for (let alt = firstMark; alt <= maxElev; alt += step) {
      const y = PAD.top + innerH - ((alt - minElev) / elevRange) * innerH
      gridY.push({ y, label: `${alt} m` })
    }

    return { points, gridY, minElev, maxElev, totalDist }
  }, [distances, elevations])

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = linePath
    + ` L ${points[points.length - 1].x} ${H - PAD.bottom}`
    + ` L ${points[0].x} ${H - PAD.bottom} Z`

  // Graduations X
  const tickCount = Math.min(6, distances.length - 1)
  const xTicks = Array.from({ length: tickCount + 1 }, (_, i) => {
    const d = (totalDist / tickCount) * i
    return {
      x: PAD.left + (d / totalDist) * (W - PAD.left - PAD.right),
      label: `${Math.round(d * 10) / 10} km`,
    }
  })

  const hovered = hoverIdx !== null ? points[hoverIdx] : null

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
      {/* En-tête avec point haut / point bas + tooltip hover */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 min-h-[40px]">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#025C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            <span className="font-bold text-[#111111]">{maxElev} m</span>
            <span className="text-gray-400 text-xs">point haut</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
              <polyline points="17 18 23 18 23 12"/>
            </svg>
            <span className="font-bold text-[#111111]">{minElev} m</span>
            <span className="text-gray-400 text-xs">point bas</span>
          </span>
        </div>
        <div className={`text-xs tabular-nums transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-bold text-[#025C00]">{hovered?.elev} m</span>
          <span className="mx-1.5 text-gray-300">·</span>
          <span className="text-gray-500">{hovered?.dist} km</span>
        </div>
      </div>

      {/* SVG graphique */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 200 }}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#025C00" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#025C00" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grille horizontale */}
        {gridY.map(({ y, label }) => (
          <g key={label}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
              stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3" />
            <text x={PAD.left - 8} y={y + 4}
              textAnchor="end" fontSize="11" fill="#9CA3AF" fontFamily="inherit">
              {label}
            </text>
          </g>
        ))}

        {/* Ligne de base */}
        <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom}
          stroke="#E5E7EB" strokeWidth="1" />

        {/* Zone remplie */}
        <path d={areaPath} fill="url(#elevGrad)" />

        {/* Ligne principale */}
        <path d={linePath} fill="none" stroke="#025C00" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />

        {/* Zones de détection hover */}
        {points.map((p, i) => {
          const prev = points[i - 1]
          const next = points[i + 1]
          const x0 = prev ? (p.x + prev.x) / 2 : PAD.left
          const x1 = next ? (p.x + next.x) / 2 : W - PAD.right
          return (
            <rect key={i} x={x0} y={PAD.top} width={x1 - x0}
              height={H - PAD.top - PAD.bottom} fill="transparent"
              onMouseEnter={() => setHoverIdx(i)} />
          )
        })}

        {/* Indicateur de position au hover */}
        {hovered && (
          <g>
            <line x1={hovered.x} y1={PAD.top} x2={hovered.x} y2={H - PAD.bottom}
              stroke="#025C00" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
            <circle cx={hovered.x} cy={hovered.y} r="5"
              fill="#025C00" stroke="white" strokeWidth="2.5" />
          </g>
        )}

        {/* Points départ / arrivée */}
        <circle cx={points[0].x} cy={points[0].y} r="4"
          fill="white" stroke="#025C00" strokeWidth="2.5" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="4"
          fill="#025C00" stroke="white" strokeWidth="2.5" />

        {/* Labels axe X */}
        {xTicks.map(({ x, label }) => (
          <text key={label} x={x} y={H - 10}
            textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="inherit">
            {label}
          </text>
        ))}
      </svg>
    </div>
  )
}
