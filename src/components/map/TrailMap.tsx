'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  lat: number
  lon: number
  gpxUrl?: string | null
}

// Fonds de carte IGN disponibles (tous gratuits, sans clé API)
const BASEMAPS = [
  {
    id: 'topo',
    label: 'Topo IGN',
    url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
  },
  {
    id: 'satellite',
    label: 'Satellite',
    url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
  },
  {
    id: 'hiking',
    label: 'Randonnée',
    url: 'https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png',
  },
]

export default function TrailMap({ lat, lon, gpxUrl }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const tileLayerRef = useRef<any>(null)
  const initialized = useRef(false)
  const [activeBasemap, setActiveBasemap] = useState('topo')

  useEffect(() => {
    if (initialized.current || !mapRef.current) return
    initialized.current = true

    import('leaflet').then(L => {
      // @ts-expect-error — propriété interne Leaflet
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, { zoomControl: false }).setView([lat, lon], 13)
      mapInstance.current = map

      // Contrôle zoom repositionné en bas à droite
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      // Fond de carte initial (topo IGN)
      const basemap = BASEMAPS.find(b => b.id === 'topo')!
      tileLayerRef.current = L.tileLayer(basemap.url, {
        attribution: '© IGN Géoportail',
        maxZoom: 18,
      }).addTo(map)

      // Marqueur départ stylisé
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:32px;height:32px;background:#025C00;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3)"><div style="transform:rotate(45deg);width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px">🥾</div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })
      L.marker([lat, lon], { icon })
        .addTo(map)
        .bindPopup('<strong>Point de départ</strong>')

      // Trace GPX si disponible
      if (gpxUrl) {
        fetch(gpxUrl)
          .then(r => r.text())
          .then(gpxText => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(gpxText, 'application/xml')
            const points = Array.from(doc.querySelectorAll('trkpt')).map(pt => [
              parseFloat(pt.getAttribute('lat') ?? '0'),
              parseFloat(pt.getAttribute('lon') ?? '0'),
            ] as [number, number])

            if (points.length > 0) {
              L.polyline(points, { color: '#025C00', weight: 4, opacity: 0.85 }).addTo(map)
              map.fitBounds(L.polyline(points).getBounds(), { padding: [30, 30] })
            }
          })
          .catch(() => {})
      }
    })
  }, [lat, lon, gpxUrl])

  // Changer le fond de carte au clic sur les boutons
  useEffect(() => {
    if (!mapInstance.current || !tileLayerRef.current) return

    import('leaflet').then(L => {
      const basemap = BASEMAPS.find(b => b.id === activeBasemap)
      if (!basemap) return

      mapInstance.current.removeLayer(tileLayerRef.current)
      tileLayerRef.current = L.tileLayer(basemap.url, {
        attribution: '© IGN Géoportail',
        maxZoom: 18,
      }).addTo(mapInstance.current)

      // Sur le fond satellite, ajouter les noms en overlay
      if (activeBasemap === 'satellite') {
        L.tileLayer(
          'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
          { opacity: 0.4, maxZoom: 18 }
        ).addTo(mapInstance.current)
      }
    })
  }, [activeBasemap])

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div className="relative">
        {/* Carte */}
        <div ref={mapRef} style={{ height: '420px', background: '#f3f4f6' }} className="w-full" />

        {/* Switcher fond de carte */}
        <div className="absolute top-3 left-3 z-[1000] flex gap-1 glass rounded-xl p-1 shadow-sm">
          {BASEMAPS.map(b => (
            <button
              key={b.id}
              onClick={() => setActiveBasemap(b.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                activeBasemap === b.id
                  ? 'bg-[#025C00] text-white shadow-sm'
                  : 'text-[#111111] hover:bg-gray-100'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
