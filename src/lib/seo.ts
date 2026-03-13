import { Metadata } from 'next'

export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rando-france.fr'
export const SITE_NAME = 'Rando France'
export const SITE_DESC = "L'encyclopédie de la randonnée en France. Fiches détaillées, traces GPX, dénivelé et difficulté pour toutes les régions."

/** Construit un objet Metadata Next.js complet avec Open Graph et Twitter Card */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
}: {
  title: string
  description: string
  path?: string
  image?: string
}): Metadata {
  const url      = `${SITE_URL}${path}`
  const ogImage  = image ?? `${SITE_URL}/og-default.jpg`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}
