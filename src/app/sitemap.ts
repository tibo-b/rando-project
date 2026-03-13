import { MetadataRoute } from 'next'
import { DEMO_TRAILS } from '@/lib/demo-data'

// TODO: remplacer DEMO_TRAILS par une requête DB quand la base est en place
// const trails = await db.query('SELECT slug, region_slug, department_slug, updated_at FROM trails WHERE status = $1', ['approved'])

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rando-france.fr'

const REGIONS = [
  'provence-alpes-cote-dazur',
  'occitanie',
  'auvergne-rhone-alpes',
  'ile-de-france',
  'bretagne',
  'normandie',
  'nouvelle-aquitaine',
  'grand-est',
  'hauts-de-france',
  'pays-de-la-loire',
  'centre-val-de-loire',
  'bourgogne-franche-comte',
  'corse',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/randonnees`,          lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/guides/technique`,    lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/guides/bivouac`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/guides/meteo`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/guides/preparation`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/guides/famille`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/materiel/chaussures`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/materiel/sacs`,       lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/materiel/vetements`,  lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/materiel/navigation`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/materiel/bivouac`,    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Pages région
  const regionPages: MetadataRoute.Sitemap = REGIONS.map(slug => ({
    url: `${BASE_URL}/randonnees/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Pages département (déduit depuis les trails)
  const deptSlugs = Array.from(
    new Map(
      DEMO_TRAILS.map(t => [`${t.region_slug}/${t.department_slug}`, t])
    ).entries()
  )
  const deptPages: MetadataRoute.Sitemap = deptSlugs.map(([key]) => ({
    url: `${BASE_URL}/randonnees/${key}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Fiches randonnée
  const trailPages: MetadataRoute.Sitemap = DEMO_TRAILS.map(t => ({
    url: `${BASE_URL}/randonnee/${t.region_slug}/${t.department_slug}/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticPages, ...regionPages, ...deptPages, ...trailPages]
}
