import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

// Pool de connexions PostgreSQL — singleton pour éviter les surcharges
const sql = postgres(connectionString, {
  max: 10,
  idle_timeout: 30,
  connect_timeout: 10,
  types: {
    numeric: {
      to: 1700,
      from: [1700],
      serialize: (x: unknown) => x,
      parse: (x: string) => parseFloat(x),
    },
  },
})

export default sql

// ============================================================
// Types TypeScript pour les entités principales
// ============================================================

export type TrailStatus = 'pending' | 'approved' | 'rejected'
export type Difficulty = 'tres_facile' | 'facile' | 'moyen' | 'difficile' | 'tres_difficile'
export type TrailType = 'boucle' | 'aller_retour' | 'point_a_point'

export interface Trail {
  id: number
  slug: string
  name: string
  department_id: number | null
  region_id: number | null
  description: string | null
  short_description: string | null
  distance_km: number | null
  elevation_gain_m: number | null
  elevation_loss_m: number | null
  elevation_max_m: number | null
  elevation_min_m: number | null
  duration_min: number | null
  difficulty: Difficulty | null
  trail_type: TrailType | null
  activity: string[]
  is_multi_day: boolean
  start_lat: number | null
  start_lon: number | null
  cover_photo_url: string | null
  gpx_url: string | null
  recommended_gear: string[]
  best_seasons: string[]
  dogs_allowed: boolean | null
  parking_info: string | null
  public_transport: string | null
  start_address: string | null
  municipality: string | null
  postal_code: string | null
  ign_map: string | null
  dangers: string[]
  regulations: string | null
  waypoints: { index: number; label: string; description: string; elevation_m: number; distance_from_start_km: number }[] | null
  meta_title: string | null
  meta_description: string | null
  status: TrailStatus
  source: string | null
  source_id: string | null
  created_at: Date
  updated_at: Date
  published_at: Date | null
}

export interface Region {
  id: number
  name: string
  slug: string
  code: string
  description: string | null
  meta_title: string | null
  meta_desc: string | null
}

export interface Department {
  id: number
  region_id: number
  name: string
  slug: string
  code: string
}

// ============================================================
// Requêtes : Queue de validation (admin)
// ============================================================

export async function getPendingTrails(limit = 20, offset = 0) {
  return sql<Trail[]>`
    SELECT
      t.id, t.slug, t.name, t.status,
      t.distance_km, t.elevation_gain_m, t.difficulty, t.trail_type,
      t.cover_photo_url, t.created_at,
      d.name AS department_name,
      r.name AS region_name
    FROM trails t
    LEFT JOIN departments d ON t.department_id = d.id
    LEFT JOIN regions r ON t.region_id = r.id
    WHERE t.status = 'pending'
    ORDER BY t.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `
}

export async function getTrailById(id: number) {
  const [trail] = await sql<Trail[]>`
    SELECT
      t.*,
      d.name AS department_name, d.slug AS department_slug,
      r.name AS region_name, r.slug AS region_slug
    FROM trails t
    LEFT JOIN departments d ON t.department_id = d.id
    LEFT JOIN regions r ON t.region_id = r.id
    WHERE t.id = ${id}
  `
  return trail ?? null
}

export async function approveTrail(id: number) {
  const [trail] = await sql<Trail[]>`
    UPDATE trails
    SET status = 'approved', published_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return trail
}

export async function rejectTrail(id: number) {
  const [trail] = await sql<Trail[]>`
    UPDATE trails
    SET status = 'rejected'
    WHERE id = ${id}
    RETURNING *
  `
  return trail
}

export async function updateTrailDescription(id: number, description: string) {
  const [trail] = await sql<Trail[]>`
    UPDATE trails
    SET description = ${description}
    WHERE id = ${id}
    RETURNING *
  `
  return trail
}

// ============================================================
// Requêtes : Site public
// ============================================================

export async function getApprovedTrailBySlug(slug: string) {
  const [trail] = await sql<Trail[]>`
    SELECT
      t.*,
      d.name AS department_name, d.slug AS department_slug,
      r.name AS region_name, r.slug AS region_slug,
      ep.distances_km, ep.elevations_m
    FROM trails t
    LEFT JOIN departments d ON t.department_id = d.id
    LEFT JOIN regions r ON t.region_id = r.id
    LEFT JOIN trail_elevation_profiles ep ON ep.trail_id = t.id
    WHERE t.slug = ${slug} AND t.status = 'approved'
  `
  return trail ?? null
}

export async function getNearbyTrails(trailId: number, lat: number, lon: number, radiusKm = 25, limit = 5) {
  return sql<Trail[]>`
    SELECT
      t.id, t.slug, t.name, t.difficulty,
      t.distance_km, t.elevation_gain_m, t.duration_min,
      t.cover_photo_url,
      d.slug AS department_slug,
      r.slug AS region_slug,
      ROUND(ST_Distance(
        t.start_point::geography,
        ST_MakePoint(${lon}, ${lat})::geography
      ) / 1000, 1) AS distance_from_here_km
    FROM trails t
    LEFT JOIN departments d ON t.department_id = d.id
    LEFT JOIN regions r ON t.region_id = r.id
    WHERE t.status = 'approved'
      AND t.id != ${trailId}
      AND t.start_point IS NOT NULL
      AND ST_DWithin(
        t.start_point::geography,
        ST_MakePoint(${lon}, ${lat})::geography,
        ${radiusKm * 1000}
      )
    ORDER BY t.start_point::geography <-> ST_MakePoint(${lon}, ${lat})::geography
    LIMIT ${limit}
  `
}

export async function getTrailsByDepartment(deptSlug: string, limit = 20, offset = 0) {
  return sql<Trail[]>`
    SELECT
      t.id, t.slug, t.name, t.difficulty, t.trail_type,
      t.distance_km, t.elevation_gain_m, t.duration_min,
      t.cover_photo_url
    FROM trails t
    JOIN departments d ON t.department_id = d.id
    WHERE d.slug = ${deptSlug} AND t.status = 'approved'
    ORDER BY t.name
    LIMIT ${limit} OFFSET ${offset}
  `
}

export async function getTrailsByRegion(regionSlug: string, limit = 20, offset = 0) {
  return sql<Trail[]>`
    SELECT
      t.id, t.slug, t.name, t.difficulty, t.trail_type,
      t.distance_km, t.elevation_gain_m, t.duration_min,
      t.cover_photo_url,
      d.name AS department_name
    FROM trails t
    JOIN regions r ON t.region_id = r.id
    LEFT JOIN departments d ON t.department_id = d.id
    WHERE r.slug = ${regionSlug} AND t.status = 'approved'
    ORDER BY t.name
    LIMIT ${limit} OFFSET ${offset}
  `
}

export async function searchTrails(query: string, limit = 20) {
  return sql<Trail[]>`
    SELECT
      t.id, t.slug, t.name, t.difficulty,
      t.distance_km, t.elevation_gain_m, t.cover_photo_url,
      ts_rank(t.search_vector, websearch_to_tsquery('french', ${query})) AS rank
    FROM trails t
    WHERE t.status = 'approved'
      AND t.search_vector @@ websearch_to_tsquery('french', ${query})
    ORDER BY rank DESC
    LIMIT ${limit}
  `
}

// ============================================================
// Requêtes : Listing public (avec filtres)
// ============================================================

export async function getTrailsForListing({
  diffs = [],
  types = [],
  regionSlug,
  limit = 60,
  offset = 0,
}: {
  diffs?: string[]
  types?: string[]
  regionSlug?: string
  limit?: number
  offset?: number
}) {
  return sql`
    SELECT
      t.id, t.slug, t.name, t.short_description,
      t.difficulty, t.trail_type,
      t.distance_km, t.elevation_gain_m, t.duration_min,
      t.cover_photo_url,
      r.slug AS region_slug,
      d.slug AS department_slug,
      d.name AS department_name
    FROM trails t
    LEFT JOIN regions r ON t.region_id = r.id
    LEFT JOIN departments d ON t.department_id = d.id
    WHERE t.status = 'approved'
      ${diffs.length > 0 ? sql`AND t.difficulty = ANY(${diffs})` : sql``}
      ${types.length > 0 ? sql`AND t.trail_type = ANY(${types})` : sql``}
      ${regionSlug ? sql`AND r.slug = ${regionSlug}` : sql``}
    ORDER BY t.name
    LIMIT ${limit} OFFSET ${offset}
  `
}

// Compte des trails en attente (pour le badge admin)
export async function getPendingCount() {
  const [{ count }] = await sql<[{ count: string }]>`
    SELECT COUNT(*)::text AS count FROM trails WHERE status = 'pending'
  `
  return parseInt(count, 10)
}
