-- Création de la base n8n (séparée de la base principale)
CREATE DATABASE n8n_db;

-- Activation de PostGIS sur la base principale
\c rando_db;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- SCHÉMA PRINCIPAL
-- ============================================================

-- Régions (13 régions métropolitaines)
CREATE TABLE IF NOT EXISTS regions (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) UNIQUE NOT NULL,
  code        VARCHAR(3) NOT NULL,
  geom        GEOMETRY(MULTIPOLYGON, 4326),
  description TEXT,
  meta_title  VARCHAR(160),
  meta_desc   VARCHAR(320),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Départements (101 départements)
CREATE TABLE IF NOT EXISTS departments (
  id          SERIAL PRIMARY KEY,
  region_id   INTEGER REFERENCES regions(id),
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) UNIQUE NOT NULL,
  code        VARCHAR(3) NOT NULL,
  geom        GEOMETRY(MULTIPOLYGON, 4326),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Table principale : randonnées
CREATE TABLE IF NOT EXISTS trails (
  id                  SERIAL PRIMARY KEY,
  slug                VARCHAR(255) UNIQUE NOT NULL,
  name                VARCHAR(255) NOT NULL,
  department_id       INTEGER REFERENCES departments(id),
  region_id           INTEGER REFERENCES regions(id),

  -- Contenu
  description         TEXT,
  description_html    TEXT,
  short_description   VARCHAR(500),

  -- Métriques (calculées depuis le GPX à l'import)
  distance_km         DECIMAL(7,2),
  elevation_gain_m    INTEGER,
  elevation_loss_m    INTEGER,
  elevation_max_m     INTEGER,
  elevation_min_m     INTEGER,
  duration_min        INTEGER,

  -- Classification
  difficulty          VARCHAR(20) CHECK (difficulty IN ('tres_facile','facile','moyen','difficile','tres_difficile')),
  trail_type          VARCHAR(30) CHECK (trail_type IN ('boucle','aller_retour','point_a_point')),
  activity            TEXT[] DEFAULT ARRAY['randonnee_pedestre'],
  is_multi_day        BOOLEAN DEFAULT FALSE,

  -- Géolocalisation
  start_lat           DECIMAL(10,7),
  start_lon           DECIMAL(10,7),
  start_point         GEOMETRY(POINT, 4326),
  geom                GEOMETRY(MULTILINESTRINGZ, 4326),

  -- Médias
  cover_photo_url     VARCHAR(500),
  gpx_url             VARCHAR(500),

  -- Infos pratiques
  recommended_gear    TEXT[],
  best_seasons        TEXT[] DEFAULT ARRAY['printemps','ete','automne'],
  dogs_allowed        BOOLEAN,
  parking_info        TEXT,
  public_transport    TEXT,
  start_address       TEXT,
  municipality        VARCHAR(100),
  postal_code         VARCHAR(10),
  ign_map             VARCHAR(20),        -- référence carte IGN (ex: "3442OT")
  dangers             TEXT[],             -- avertissements de sécurité
  regulations         TEXT,              -- réglementation zone (parc, réserve…)
  waypoints           JSONB,             -- points de passage avec descriptions

  -- SEO
  meta_title          VARCHAR(160),
  meta_description    VARCHAR(320),

  -- Workflow
  status              VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  source              VARCHAR(50),
  source_id           VARCHAR(255),

  -- Full-text search
  search_vector       TSVECTOR,

  -- Timestamps
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  published_at        TIMESTAMPTZ
);

-- Index spatiaux et de performance
CREATE INDEX IF NOT EXISTS trails_geom_idx       ON trails USING GIST(geom);
CREATE INDEX IF NOT EXISTS trails_start_idx      ON trails USING GIST(start_point);
CREATE INDEX IF NOT EXISTS trails_dept_idx       ON trails(department_id);
CREATE INDEX IF NOT EXISTS trails_region_idx     ON trails(region_id);
CREATE INDEX IF NOT EXISTS trails_difficulty_idx ON trails(difficulty);
CREATE INDEX IF NOT EXISTS trails_status_idx     ON trails(status);
CREATE INDEX IF NOT EXISTS trails_search_idx     ON trails USING GIN(search_vector);
CREATE UNIQUE INDEX IF NOT EXISTS trails_source_idx ON trails(source, source_id) WHERE source IS NOT NULL AND source_id IS NOT NULL;

-- Déduplication : contrainte sur source + source_id
ALTER TABLE trails ADD CONSTRAINT trails_source_unique UNIQUE (source, source_id);

-- Trigger full-text search automatique
CREATE OR REPLACE FUNCTION update_trail_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('french', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('french', COALESCE(NEW.short_description, '')), 'B') ||
    setweight(to_tsvector('french', COALESCE(NEW.description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trail_search_vector_update
  BEFORE INSERT OR UPDATE ON trails
  FOR EACH ROW EXECUTE FUNCTION update_trail_search_vector();

-- Trigger updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trails_updated_at
  BEFORE UPDATE ON trails
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Photos des randonnées
CREATE TABLE IF NOT EXISTS trail_photos (
  id          SERIAL PRIMARY KEY,
  trail_id    INTEGER REFERENCES trails(id) ON DELETE CASCADE,
  url         VARCHAR(500) NOT NULL,
  caption     VARCHAR(255),
  alt_text    VARCHAR(255),
  width       INTEGER,
  height      INTEGER,
  sort_order  SMALLINT DEFAULT 0,
  taken_at    DATE,
  credit      VARCHAR(100),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS trail_photos_trail_idx ON trail_photos(trail_id);

-- Profil altimétrique (précalculé pour les graphiques)
CREATE TABLE IF NOT EXISTS trail_elevation_profiles (
  id           SERIAL PRIMARY KEY,
  trail_id     INTEGER REFERENCES trails(id) ON DELETE CASCADE UNIQUE,
  distances_km DECIMAL[] NOT NULL,
  elevations_m INTEGER[] NOT NULL,
  point_count  INTEGER
);

-- Tags thématiques
CREATE TABLE IF NOT EXISTS tags (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) UNIQUE NOT NULL,
  slug  VARCHAR(100) UNIQUE NOT NULL,
  type  VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trail_tags (
  trail_id INTEGER REFERENCES trails(id) ON DELETE CASCADE,
  tag_id   INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (trail_id, tag_id)
);

-- Avis utilisateurs (phase 2)
CREATE TABLE IF NOT EXISTS reviews (
  id          SERIAL PRIMARY KEY,
  trail_id    INTEGER REFERENCES trails(id) ON DELETE CASCADE,
  author_name VARCHAR(100),
  rating      SMALLINT CHECK (rating BETWEEN 1 AND 5),
  content     TEXT,
  visited_on  DATE,
  status      VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reviews_trail_idx ON reviews(trail_id);
