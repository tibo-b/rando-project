-- ============================================================
-- SEED — données de démonstration (6 randonnées)
-- À exécuter APRÈS neon-init.sql
-- ============================================================

-- Régions
INSERT INTO regions (name, slug, code) VALUES
  ('Provence-Alpes-Côte d''Azur', 'provence-alpes-cote-dazur', '93'),
  ('Occitanie',                   'occitanie',                  '76'),
  ('Auvergne-Rhône-Alpes',        'auvergne-rhone-alpes',       '84'),
  ('Île-de-France',               'ile-de-france',              '11');

-- Départements
INSERT INTO departments (region_id, name, slug, code) VALUES
  ((SELECT id FROM regions WHERE slug = 'provence-alpes-cote-dazur'), 'Alpes-de-Haute-Provence', 'alpes-de-haute-provence', '04'),
  ((SELECT id FROM regions WHERE slug = 'provence-alpes-cote-dazur'), 'Bouches-du-Rhône',         'bouches-du-rhone',        '13'),
  ((SELECT id FROM regions WHERE slug = 'occitanie'),                  'Hautes-Pyrénées',          'hautes-pyrenees',         '65'),
  ((SELECT id FROM regions WHERE slug = 'auvergne-rhone-alpes'),       'Puy-de-Dôme',             'puy-de-dome',             '63'),
  ((SELECT id FROM regions WHERE slug = 'auvergne-rhone-alpes'),       'Haute-Savoie',             'haute-savoie',            '74'),
  ((SELECT id FROM regions WHERE slug = 'ile-de-france'),              'Seine-et-Marne',           'seine-et-marne',          '77');

-- ============================================================
-- RANDONNÉES
-- ============================================================

-- 1. Gorges du Verdon
INSERT INTO trails (
  slug, name, region_id, department_id,
  short_description, description,
  distance_km, elevation_gain_m, elevation_loss_m, elevation_max_m, elevation_min_m, duration_min,
  difficulty, trail_type,
  start_lat, start_lon, start_point,
  cover_photo_url,
  recommended_gear, dangers, regulations,
  parking_info, start_address, municipality, postal_code, ign_map,
  waypoints,
  status, published_at
) VALUES (
  'gorges-du-verdon-grand-canyon',
  'Gorges du Verdon — Grand Canyon',
  (SELECT id FROM regions WHERE slug = 'provence-alpes-cote-dazur'),
  (SELECT id FROM departments WHERE slug = 'alpes-de-haute-provence'),
  'Le plus grand canyon d''Europe, entre falaises calcaires et eaux turquoise.',
  'Les Gorges du Verdon, surnommées le "Grand Canyon européen", constituent l''un des sites naturels les plus spectaculaires de France. Ce circuit vous entraîne le long des falaises calcaires vertigineuses qui plongent dans les eaux turquoise du Verdon.

Le départ s''effectue depuis La Palud-sur-Verdon, village provençal typique perché à 950 mètres d''altitude. Les premiers kilomètres longent le plateau avant de plonger vers les berges du lac de Sainte-Croix.

La descente vers le fond des gorges emprunte des sentiers aménagés mais exigeants. Les passages les plus techniques sont équipés de câbles de sécurité.',
  24.5, 820, 820, 1250, 535, 480,
  'difficile', 'boucle',
  43.7765, 6.3677, ST_SetSRID(ST_MakePoint(6.3677, 43.7765), 4326),
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  ARRAY['Chaussures de randonnée montantes', 'Eau (minimum 2L)', 'Coupe-vent', 'Crème solaire', 'Bâtons recommandés'],
  ARRAY['Passage technique avec câbles de sécurité au km 8', 'Descente finale sableuse et glissante', 'Exposition au soleil totale', 'Pas de réseau mobile dans le fond des gorges'],
  'Parc Naturel Régional du Verdon — chiens tenus en laisse obligatoire, feux interdits.',
  'Parking du Chalet de la Maline — gratuit, ouvert toute l''année',
  'Route des Crêtes, 04120 La Palud-sur-Verdon',
  'La Palud-sur-Verdon', '04120', '3442OT',
  '[
    {"index":1,"label":"Parking départ","description":"Du parking, prendre le sentier balisé GR4 vers le sud.","elevation_m":950,"distance_from_start_km":0},
    {"index":2,"label":"Belvédère de la Mescla","description":"Vue spectaculaire sur la confluence Verdon/Artuby.","elevation_m":870,"distance_from_start_km":3.5},
    {"index":3,"label":"Pont de l''Artuby","description":"Pont suspendu à 160 m de hauteur. Descendre vers le fond.","elevation_m":620,"distance_from_start_km":7},
    {"index":4,"label":"Fond des gorges","description":"Point le plus bas. Possible baignade.","elevation_m":535,"distance_from_start_km":12},
    {"index":5,"label":"Retour parking","description":"Rejoindre le parking par le chemin de crête.","elevation_m":950,"distance_from_start_km":24.5}
  ]',
  'approved', NOW()
);

INSERT INTO trail_elevation_profiles (trail_id, distances_km, elevations_m, point_count)
VALUES (
  (SELECT id FROM trails WHERE slug = 'gorges-du-verdon-grand-canyon'),
  ARRAY[0,2,4,6,8,10,12,14,16,18,20,22,24.5],
  ARRAY[950,920,870,750,620,535,560,590,680,780,880,930,950],
  13
);

-- 2. Calanques de Marseille
INSERT INTO trails (
  slug, name, region_id, department_id,
  short_description, description,
  distance_km, elevation_gain_m, elevation_loss_m, elevation_max_m, elevation_min_m, duration_min,
  difficulty, trail_type,
  start_lat, start_lon, start_point,
  cover_photo_url,
  recommended_gear, dangers, regulations,
  parking_info, start_address, municipality, postal_code, ign_map,
  waypoints,
  status, published_at
) VALUES (
  'calanques-de-marseille-morgiou-sormiou',
  'Calanques de Morgiou et Sormiou',
  (SELECT id FROM regions WHERE slug = 'provence-alpes-cote-dazur'),
  (SELECT id FROM departments WHERE slug = 'bouches-du-rhone'),
  'Deux des plus belles calanques de Marseille, entre mer et pinèdes.',
  'Ce circuit relie deux des calanques les plus sauvages du parc national des Calanques : Morgiou et Sormiou. La randonnée débute depuis le col de Morgiou et traverse des pinèdes odorantes avant de descendre vers les eaux cristallines.

La calanque de Morgiou est la plus préservée : accessible uniquement à pied ou en bateau, elle conserve un petit port de pêche authentique. En été, les eaux atteignent 26°C.',
  8.2, 350, 350, 320, 0, 195,
  'moyen', 'boucle',
  43.2148, 5.4317, ST_SetSRID(ST_MakePoint(5.4317, 43.2148), 4326),
  'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1200&q=80',
  ARRAY['Chaussures de randonnée', 'Eau (1.5L minimum)', 'Maillot de bain', 'Lunettes de soleil', 'Chapeau'],
  ARRAY['Sentiers très exposés au soleil', 'Terrain calcaire glissant après la pluie', 'Accès en voiture interdit juillet-août', 'Fermeture possible en cas de risque incendie'],
  'Parc National des Calanques — camping interdit, chiens interdits sur les plages de juin à septembre.',
  'Col de Morgiou — gratuit (interdit en voiture juil/août)',
  'Col de Morgiou, 13009 Marseille',
  'Marseille', '13009', '3245ET',
  '[
    {"index":1,"label":"Col de Morgiou","description":"Départ. Prendre le sentier balisé en jaune.","elevation_m":220,"distance_from_start_km":0},
    {"index":2,"label":"Calanque de Morgiou","description":"Descente vers le port de pêche. Spot baignade.","elevation_m":0,"distance_from_start_km":2.1},
    {"index":3,"label":"Crête","description":"Vue panoramique sur la Méditerranée.","elevation_m":320,"distance_from_start_km":4.5},
    {"index":4,"label":"Calanque de Sormiou","description":"Grande plage avec restaurants.","elevation_m":0,"distance_from_start_km":6.1},
    {"index":5,"label":"Retour col","description":"Remontée finale par la piste forestière.","elevation_m":220,"distance_from_start_km":8.2}
  ]',
  'approved', NOW()
);

INSERT INTO trail_elevation_profiles (trail_id, distances_km, elevations_m, point_count)
VALUES (
  (SELECT id FROM trails WHERE slug = 'calanques-de-marseille-morgiou-sormiou'),
  ARRAY[0,1,2,3,4,5,6,7,8.2],
  ARRAY[220,280,210,120,80,110,200,240,220],
  9
);

-- 3. Lac de Gaube
INSERT INTO trails (
  slug, name, region_id, department_id,
  short_description, description,
  distance_km, elevation_gain_m, elevation_loss_m, elevation_max_m, elevation_min_m, duration_min,
  difficulty, trail_type,
  start_lat, start_lon, start_point,
  cover_photo_url,
  recommended_gear, dangers, regulations,
  parking_info, start_address, municipality, postal_code, ign_map,
  waypoints,
  status, published_at
) VALUES (
  'lac-de-gaube-vignemale',
  'Lac de Gaube et vue sur le Vignemale',
  (SELECT id FROM regions WHERE slug = 'occitanie'),
  (SELECT id FROM departments WHERE slug = 'hautes-pyrenees'),
  'Un lac de montagne aux reflets émeraude face au plus haut sommet des Pyrénées françaises.',
  'Le lac de Gaube est l''un des sites les plus emblématiques des Pyrénées. Ce lac glaciaire d''altitude, perché à 1 725 mètres, offre un reflet saisissant du Vignemale (3 298 m), le plus haut sommet des Pyrénées françaises.

Le chemin débute depuis le pont d''Espagne et monte régulièrement en lacets à travers des forêts de sapins. Sur les rives du lac, la face nord du Vignemale domine de toute sa hauteur.',
  6.4, 185, 185, 1725, 1496, 150,
  'facile', 'aller_retour',
  42.8734, -0.1256, ST_SetSRID(ST_MakePoint(-0.1256, 42.8734), 4326),
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
  ARRAY['Chaussures de randonnée', 'Vêtement chaud (même l''été)', 'Eau', 'Pique-nique'],
  ARRAY['Météo changeante en altitude', 'Sentier fréquenté en haute saison', 'Névés possibles jusqu''en juillet'],
  'Parc National des Pyrénées — chiens tenus en laisse obligatoire.',
  'Parking du Pont d''Espagne — 8€/jour, ouvert mai à octobre',
  'Pont d''Espagne, 65110 Cauterets',
  'Cauterets', '65110', '1748ET',
  '[
    {"index":1,"label":"Pont d''Espagne","description":"Suivre le sentier balisé le long du gave de Gaube.","elevation_m":1496,"distance_from_start_km":0},
    {"index":2,"label":"Cascades du gave","description":"Belles cascades. Continuer la montée dans la forêt.","elevation_m":1580,"distance_from_start_km":1.2},
    {"index":3,"label":"Lac de Gaube","description":"Vue imprenable sur le Vignemale. Point de demi-tour.","elevation_m":1725,"distance_from_start_km":3.2},
    {"index":4,"label":"Retour Pont d''Espagne","description":"Retour par le même itinéraire.","elevation_m":1496,"distance_from_start_km":6.4}
  ]',
  'approved', NOW()
);

INSERT INTO trail_elevation_profiles (trail_id, distances_km, elevations_m, point_count)
VALUES (
  (SELECT id FROM trails WHERE slug = 'lac-de-gaube-vignemale'),
  ARRAY[0,0.8,1.6,2.4,3.2,4,4.8,5.6,6.4],
  ARRAY[1496,1530,1570,1620,1680,1725,1680,1560,1496],
  9
);

-- 4. Puy de Dôme
INSERT INTO trails (
  slug, name, region_id, department_id,
  short_description, description,
  distance_km, elevation_gain_m, elevation_loss_m, elevation_max_m, elevation_min_m, duration_min,
  difficulty, trail_type,
  start_lat, start_lon, start_point,
  cover_photo_url,
  recommended_gear, dangers, regulations,
  parking_info, start_address, municipality, postal_code, ign_map,
  waypoints,
  status, published_at
) VALUES (
  'puy-de-dome-chemin-des-muletiers',
  'Puy de Dôme — Chemin des Muletiers',
  (SELECT id FROM regions WHERE slug = 'auvergne-rhone-alpes'),
  (SELECT id FROM departments WHERE slug = 'puy-de-dome'),
  'L''ascension du volcan emblématique d''Auvergne par l''ancien chemin de mules.',
  'Le Puy de Dôme (1 465 m) est le volcan le plus célèbre du Massif Central. Son chemin des muletiers, tracé depuis l''Antiquité, offre l''ascension la plus authentique.

Au sommet, le panorama embrasse plus de 80 volcans de la Chaîne des Puys, classée au Patrimoine Mondial de l''UNESCO en 2018. Par temps clair, on distingue le Mont Blanc à 300 km.',
  7.2, 400, 400, 1465, 1078, 180,
  'moyen', 'aller_retour',
  45.7718, 2.9614, ST_SetSRID(ST_MakePoint(2.9614, 45.7718), 4326),
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80',
  ARRAY['Chaussures de randonnée', 'Vêtement coupe-vent (très venté au sommet)', 'Eau', 'Couche chaude'],
  ARRAY['Vent très fort et soudain au sommet', 'Orage fréquent en après-midi d''été'],
  'Site classé Grand Site de France — respect des pelouses volcaniques obligatoire.',
  'Col de Ceyssat — gratuit, ouvert toute l''année',
  'Col de Ceyssat, 63870 Orcines',
  'Orcines', '63870', '2531OT',
  '[
    {"index":1,"label":"Col de Ceyssat","description":"Prendre le sentier balisé GR441.","elevation_m":1078,"distance_from_start_km":0},
    {"index":2,"label":"Temple de Mercure","description":"Ruines du temple romain. Continuer vers le sommet.","elevation_m":1420,"distance_from_start_km":3},
    {"index":3,"label":"Sommet Puy de Dôme","description":"Panorama 360° sur 80 volcans.","elevation_m":1465,"distance_from_start_km":3.6},
    {"index":4,"label":"Retour col","description":"Descente par le même itinéraire.","elevation_m":1078,"distance_from_start_km":7.2}
  ]',
  'approved', NOW()
);

INSERT INTO trail_elevation_profiles (trail_id, distances_km, elevations_m, point_count)
VALUES (
  (SELECT id FROM trails WHERE slug = 'puy-de-dome-chemin-des-muletiers'),
  ARRAY[0,0.9,1.8,2.7,3.6,4.5,5.4,6.3,7.2],
  ARRAY[1078,1110,1160,1220,1290,1350,1400,1445,1078],
  9
);

-- 5. Forêt de Fontainebleau
INSERT INTO trails (
  slug, name, region_id, department_id,
  short_description, description,
  distance_km, elevation_gain_m, elevation_loss_m, elevation_max_m, elevation_min_m, duration_min,
  difficulty, trail_type,
  start_lat, start_lon, start_point,
  cover_photo_url,
  recommended_gear, dangers, regulations,
  parking_info, start_address, municipality, postal_code, ign_map,
  waypoints,
  status, published_at
) VALUES (
  'foret-fontainebleau-gorges-franchard',
  'Forêt de Fontainebleau — Gorges de Franchard',
  (SELECT id FROM regions WHERE slug = 'ile-de-france'),
  (SELECT id FROM departments WHERE slug = 'seine-et-marne'),
  'Un labyrinthe de rochers gréseux et de sable blanc aux portes de Paris.',
  'À moins d''une heure de Paris, la forêt de Fontainebleau cache un paysage surprenant : les gorges de Franchard, un dédale de rochers gréseux sculptés par l''érosion, de sable blanc et de landes fleuries.

Ce circuit traverse les sites les plus typiques du massif. On serpente entre des blocs de grès aux formes étranges, certains culminant à 10-15 mètres et prisés des grimpeurs du monde entier.',
  10.1, 80, 80, 144, 75, 210,
  'tres_facile', 'boucle',
  48.4012, 2.6234, ST_SetSRID(ST_MakePoint(2.6234, 48.4012), 4326),
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
  ARRAY['Chaussures de marche', 'Eau', 'Pique-nique'],
  ARRAY['Terrain sablonneux glissant sur les pentes', 'Ne pas escalader les rochers hors zones balisées'],
  'Forêt domaniale ONF — chiens tenus en laisse, bivouac interdit.',
  'Parking des Gorges de Franchard — gratuit',
  'Route des Gorges de Franchard, 77300 Fontainebleau',
  'Fontainebleau', '77300', '2417OT',
  '[
    {"index":1,"label":"Parking Franchard","description":"Prendre le sentier bleu vers les gorges.","elevation_m":100,"distance_from_start_km":0},
    {"index":2,"label":"Fond des gorges","description":"Paysage de rochers gréseux et sable blanc.","elevation_m":75,"distance_from_start_km":3},
    {"index":3,"label":"Lande de Franchard","description":"Grande lande ouverte avec vue sur la forêt.","elevation_m":144,"distance_from_start_km":7},
    {"index":4,"label":"Retour parking","description":"Descente par le sentier de crête.","elevation_m":100,"distance_from_start_km":10.1}
  ]',
  'approved', NOW()
);

INSERT INTO trail_elevation_profiles (trail_id, distances_km, elevations_m, point_count)
VALUES (
  (SELECT id FROM trails WHERE slug = 'foret-fontainebleau-gorges-franchard'),
  ARRAY[0,1.3,2.5,3.8,5,6.3,7.5,8.8,10.1],
  ARRAY[95,105,120,130,115,100,110,120,95],
  9
);

-- 6. Aiguillette des Houches
INSERT INTO trails (
  slug, name, region_id, department_id,
  short_description, description,
  distance_km, elevation_gain_m, elevation_loss_m, elevation_max_m, elevation_min_m, duration_min,
  difficulty, trail_type,
  start_lat, start_lon, start_point,
  cover_photo_url,
  recommended_gear, dangers, regulations,
  parking_info, start_address, municipality, postal_code, ign_map,
  waypoints,
  status, published_at
) VALUES (
  'aiguillette-des-houches-belvedere-mont-blanc',
  'Aiguillette des Houches — Belvédère du Mont-Blanc',
  (SELECT id FROM regions WHERE slug = 'auvergne-rhone-alpes'),
  (SELECT id FROM departments WHERE slug = 'haute-savoie'),
  'Une crête alpine avec une vue directe et imprenable sur le massif du Mont-Blanc.',
  'L''Aiguillette des Houches est l''un des meilleurs belvédères accessibles à la journée pour contempler le massif du Mont-Blanc. Depuis la crête à 2 285 mètres, la vue plonge sur la vallée de Chamonix.

En chemin, on longe plusieurs chalets d''alpage en activité. Les marmottes sont omniprésentes. En juillet, les gentianes et arnicas tapissent les pentes.',
  11.8, 1190, 1190, 2285, 1008, 360,
  'tres_difficile', 'aller_retour',
  45.8912, 6.7934, ST_SetSRID(ST_MakePoint(6.7934, 45.8912), 4326),
  'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1200&q=80',
  ARRAY['Chaussures de randonnée montantes obligatoires', 'Bâtons fortement recommandés', 'Vêtement chaud et imperméable', 'Eau (2L)', 'Crème solaire indice 50+'],
  ARRAY['Orage très fréquent en altitude l''après-midi', 'Névés possibles jusqu''en juillet sur la crête', 'Crête très exposée au vent', 'Terrain rocheux instable sur les 200 derniers mètres'],
  NULL,
  'Parking du Pont du Diable — gratuit',
  'Route du Pont du Diable, 74310 Les Houches',
  'Les Houches', '74310', '3531ET',
  '[
    {"index":1,"label":"Pont du Diable","description":"Prendre le sentier balisé en rouge vers les alpages.","elevation_m":1008,"distance_from_start_km":0},
    {"index":2,"label":"Alpage de Bourgeat","description":"Premier alpage. Vue sur la vallée de Chamonix.","elevation_m":1450,"distance_from_start_km":2.5},
    {"index":3,"label":"Col de la Forclaz","description":"Col intermédiaire. La pente s''accentue.","elevation_m":1850,"distance_from_start_km":4.5},
    {"index":4,"label":"Aiguillette des Houches","description":"Panorama 360° sur Mont-Blanc et Aiguilles Rouges.","elevation_m":2285,"distance_from_start_km":5.9},
    {"index":5,"label":"Retour Pont du Diable","description":"Descente par le même itinéraire — prudence.","elevation_m":1008,"distance_from_start_km":11.8}
  ]',
  'approved', NOW()
);

INSERT INTO trail_elevation_profiles (trail_id, distances_km, elevations_m, point_count)
VALUES (
  (SELECT id FROM trails WHERE slug = 'aiguillette-des-houches-belvedere-mont-blanc'),
  ARRAY[0,1.5,3,4.5,5.9,7.4,8.8,10.3,11.8],
  ARRAY[1008,1150,1320,1560,1780,1980,2150,2285,1008],
  9
);
