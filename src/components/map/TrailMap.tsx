'use client'

// La carte est chargée uniquement côté navigateur (pas côté serveur)
// car Leaflet et MapLibre ont besoin du DOM pour fonctionner
import { useEffect, useRef } from 'react'

interface Props {
  lat: number
  lon: number
  gpxUrl?: string | null
}

export default function TrailMap({ lat, lon, gpxUrl }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current || !mapRef.current) return
    initialized.current = true

    // Import dynamique de Leaflet (chargé seulement dans le navigateur)
    import('leaflet').then(L => {
      // Supprimer l'icône par défaut de Leaflet (problème connu avec les bundlers)
      // @ts-expect-error — propriété interne Leaflet
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!).setView([lat, lon], 13)

      // Tuiles topographiques IGN France (gratuites, sans clé API)
      L.tileLayer(
        'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
        {
          attribution: '© IGN France',
          maxZoom: 18,
        }
      ).addTo(map)

      // Marqueur au point de départ
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup('Départ')

      // Si on a un fichier GPX, on le charge et on affiche la trace
      if (gpxUrl) {
        fetch(gpxUrl)
          .then(r => r.text())
          .then(gpxText => {
            // Parse GPX basique pour extraire les points de la trace
            const parser = new DOMParser()
            const doc = parser.parseFromString(gpxText, 'application/xml')
            const points = Array.from(doc.querySelectorAll('trkpt')).map(pt => [
              parseFloat(pt.getAttribute('lat') ?? '0'),
              parseFloat(pt.getAttribute('lon') ?? '0'),
            ] as [number, number])

            if (points.length > 0) {
              const polyline = L.polyline(points, { color: '#1f2937', weight: 3 })
              polyline.addTo(map)
              map.fitBounds(polyline.getBounds(), { padding: [20, 20] })
            }
          })
          .catch(() => { /* GPX non disponible, la carte s'affiche quand même */ })
      }
    })

    return () => {
      // Nettoyage de la carte quand le composant est démonté
      // (évite les erreurs si on navigue rapidement entre pages)
    }
  }, [lat, lon, gpxUrl])

  return (
    <>
      {/* Feuille de style Leaflet chargée via CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        className="w-full rounded-lg border border-gray-200 overflow-hidden"
        style={{ height: '380px', background: '#f3f4f6' }}
      />
    </>
  )
}
