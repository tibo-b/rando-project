'use client'

interface Props {
  distances: number[]
  elevations: number[]
}

export default function ElevationChart({ distances, elevations }: Props) {
  if (!distances.length || !elevations.length) return null

  const width = 800
  const height = 160
  const paddingX = 40
  const paddingY = 20

  const minElev = Math.min(...elevations)
  const maxElev = Math.max(...elevations)
  const maxDist = distances[distances.length - 1]

  const elevRange = maxElev - minElev || 1

  function toX(dist: number) {
    return paddingX + ((dist / maxDist) * (width - paddingX * 2))
  }

  function toY(elev: number) {
    return height - paddingY - ((elev - minElev) / elevRange) * (height - paddingY * 2)
  }

  // Construire le chemin SVG
  const points = distances.map((d, i) => `${toX(d)},${toY(elevations[i])}`)
  const linePath = `M ${points.join(' L ')}`
  const areaPath = `${linePath} L ${toX(maxDist)},${height - paddingY} L ${toX(0)},${height - paddingY} Z`

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height: '120px' }}
      >
        {/* Aire sous la courbe */}
        <path d={areaPath} fill="#f3f4f6" />
        {/* Ligne */}
        <path d={linePath} fill="none" stroke="#374151" strokeWidth="1.5" />
      </svg>

      {/* Légende sous le graphique */}
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
        <span>0 km</span>
        <span className="text-gray-600 font-medium">
          {minElev}m → {maxElev}m
        </span>
        <span>{maxDist} km</span>
      </div>
    </div>
  )
}
