// Données de démonstration — utilisées quand la DB n'est pas connectée

export interface DemoTrail {
  id: number
  slug: string
  name: string
  short_description: string
  description: string
  region_name: string
  region_slug: string
  department_name: string
  department_slug: string
  distance_km: number
  elevation_gain_m: number
  elevation_loss_m: number
  duration_min: number
  difficulty: 'tres_facile' | 'facile' | 'moyen' | 'difficile' | 'tres_difficile'
  trail_type: 'boucle' | 'aller_retour' | 'point_a_point'
  start_lat: number
  start_lon: number
  cover_photo_url: string
  gpx_url: string | null
  parking: string
  start_address: string
  gear: string[]
  distances_km: number[]
  elevations_m: number[]
  tags: string[]
}

export const DEMO_TRAILS: DemoTrail[] = [
  {
    id: 1,
    slug: 'gorges-du-verdon-grand-canyon',
    name: 'Gorges du Verdon — Grand Canyon',
    short_description: 'Le plus grand canyon d\'Europe, entre falaises calcaires et eaux turquoise.',
    description: `Les Gorges du Verdon, surnommées le "Grand Canyon européen", constituent l'un des sites naturels les plus spectaculaires de France. Ce circuit vous entraîne le long des falaises calcaires vertigineuses qui plongent dans les eaux turquoise du Verdon.

Le départ s'effectue depuis La Palud-sur-Verdon, village provençal typique perché à 950 mètres d'altitude. Les premiers kilomètres longent le plateau avant de plonger vers les berges du lac de Sainte-Croix, où la lumière du matin illumine les parois ocre et blanches des falaises.

La descente vers le fond des gorges emprunte des sentiers aménagés mais exigeants. Les passages les plus techniques sont équipés de câbles de sécurité. La remontée s'effectue par le versant est, moins fréquenté et plus sauvage.

Points d'intérêt majeurs : le Belvédère de la Mescla, le pont de l'Artuby (160 m de haut), les plages naturelles accessibles uniquement à pied.`,
    region_name: 'Provence-Alpes-Côte d\'Azur',
    region_slug: 'provence-alpes-cote-dazur',
    department_name: 'Alpes-de-Haute-Provence',
    department_slug: 'alpes-de-haute-provence',
    distance_km: 24.5,
    elevation_gain_m: 820,
    elevation_loss_m: 820,
    duration_min: 480,
    difficulty: 'difficile',
    trail_type: 'boucle',
    start_lat: 43.7765,
    start_lon: 6.3677,
    cover_photo_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking du Chalet de la Maline — gratuit, ouvert toute l\'année',
    start_address: 'Route des Crêtes, 04120 La Palud-sur-Verdon',
    gear: ['Chaussures de randonnée montantes', 'Eau (minimum 2L)', 'Coupe-vent', 'Crème solaire', 'Bâtons recommandés'],
    distances_km: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24.5],
    elevations_m: [950, 920, 870, 750, 620, 535, 560, 590, 680, 780, 880, 930, 950],
    tags: ['canyon', 'eau', 'vertige', 'provence'],
  },
  {
    id: 2,
    slug: 'calanques-de-marseille-morgiou-sormiou',
    name: 'Calanques de Morgiou et Sormiou',
    short_description: 'Deux des plus belles calanques de Marseille, entre mer et pinèdes.',
    description: `Ce circuit relie deux des calanques les plus sauvages du parc national des Calanques : Morgiou et Sormiou. La randonnée débute depuis le col de Morgiou et traverse des pinèdes odorantes avant de descendre vers les eaux cristallines.

La calanque de Morgiou est la plus préservée : accessible uniquement à pied ou en bateau, elle conserve un petit port de pêche authentique avec quelques cabanons colorés. En été, les eaux atteignent 26°C.

La montée vers la crête offre un panorama à 180° sur la Méditerranée. Par temps clair, on aperçoit les îles du Frioul et, au loin, l'île de Porquerolles.

Attention : l'accès en voiture est interdit de juin à septembre. Prévoir le départ depuis le bus ou le vélo.`,
    region_name: 'Provence-Alpes-Côte d\'Azur',
    region_slug: 'provence-alpes-cote-dazur',
    department_name: 'Bouches-du-Rhône',
    department_slug: 'bouches-du-rhone',
    distance_km: 8.2,
    elevation_gain_m: 350,
    elevation_loss_m: 350,
    duration_min: 195,
    difficulty: 'moyen',
    trail_type: 'boucle',
    start_lat: 43.2148,
    start_lon: 5.4317,
    cover_photo_url: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1200&q=80',
    gpx_url: null,
    parking: 'Col de Morgiou — gratuit (interdit en voiture juil/août)',
    start_address: 'Col de Morgiou, 13009 Marseille',
    gear: ['Chaussures de randonnée', 'Eau (1.5L minimum)', 'Maillot de bain', 'Lunettes de soleil', 'Chapeau'],
    distances_km: [0, 1, 2, 3, 4, 5, 6, 7, 8.2],
    elevations_m: [220, 280, 210, 120, 80, 110, 200, 240, 220],
    tags: ['mer', 'calanques', 'marseille', 'méditerranée'],
  },
  {
    id: 3,
    slug: 'lac-de-gaube-vignemale',
    name: 'Lac de Gaube et vue sur le Vignemale',
    short_description: 'Un lac de montagne aux reflets émeraude face au plus haut sommet des Pyrénées françaises.',
    description: `Le lac de Gaube est l'un des sites les plus emblématiques des Pyrénées. Ce lac glaciaire d'altitude, perché à 1 725 mètres, offre un reflet saisissant du Vignemale (3 298 m), le plus haut sommet des Pyrénées françaises.

Le chemin débute depuis le pont d'Espagne, haut lieu du tourisme pyrénéen. On longe le gave de Gaube entre cascades et forêts de sapins avant d'atteindre le lac après 3 km de montée régulière.

Sur les rives du lac, en regardant vers le sud, la face nord du Vignemale domine de toute sa hauteur. Par beau temps, le reflet de la montagne dans les eaux calmes est spectaculaire.

Idéal en famille avec des enfants motivés. En hiver, le lac gèle partiellement et le paysage devient féerique.`,
    region_name: 'Occitanie',
    region_slug: 'occitanie',
    department_name: 'Hautes-Pyrénées',
    department_slug: 'hautes-pyrenees',
    distance_km: 6.4,
    elevation_gain_m: 185,
    elevation_loss_m: 185,
    duration_min: 150,
    difficulty: 'facile',
    trail_type: 'aller_retour',
    start_lat: 42.8734,
    start_lon: -0.1256,
    cover_photo_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking du Pont d\'Espagne — 8€/jour, ouvert mai à octobre',
    start_address: 'Pont d\'Espagne, 65110 Cauterets',
    gear: ['Chaussures de randonnée', 'Vêtement chaud (même l\'été)', 'Eau', 'Pique-nique'],
    distances_km: [0, 0.8, 1.6, 2.4, 3.2, 4, 4.8, 5.6, 6.4],
    elevations_m: [1496, 1530, 1570, 1620, 1680, 1725, 1680, 1560, 1496],
    tags: ['lac', 'pyrénées', 'famille', 'montagne'],
  },
  {
    id: 4,
    slug: 'puy-de-dome-chemin-des-muletiers',
    name: 'Puy de Dôme — Chemin des Muletiers',
    short_description: 'L\'ascension du volcan emblématique d\'Auvergne par l\'ancien chemin de mules.',
    description: `Le Puy de Dôme (1 465 m) est le volcan le plus célèbre du Massif Central. Son chemin des muletiers, tracé depuis l'Antiquité, offre l'ascension la plus authentique pour atteindre le sommet sans emprunter la route.

Le sentier débute depuis le col de Ceyssat et monte régulièrement en lacets à travers des prairies d'altitude. La végétation change au fur et à mesure de l'ascension : d'abord des forêts de hêtres, puis des pelouses volcaniques rases balayées par le vent.

Au sommet, le panorama embrasse plus de 80 volcans de la Chaîne des Puys, classée au Patrimoine Mondial de l'UNESCO en 2018. Par temps clair, on distingue le Mont Blanc à 300 km.

Le temple romain de Mercure, partiellement restauré, trône au sommet depuis 2 000 ans.`,
    region_name: 'Auvergne-Rhône-Alpes',
    region_slug: 'auvergne-rhone-alpes',
    department_name: 'Puy-de-Dôme',
    department_slug: 'puy-de-dome',
    distance_km: 7.2,
    elevation_gain_m: 400,
    elevation_loss_m: 400,
    duration_min: 180,
    difficulty: 'moyen',
    trail_type: 'aller_retour',
    start_lat: 45.7718,
    start_lon: 2.9614,
    cover_photo_url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80',
    gpx_url: null,
    parking: 'Col de Ceyssat — gratuit, ouvert toute l\'année',
    start_address: 'Col de Ceyssat, 63870 Orcines',
    gear: ['Chaussures de randonnée', 'Vêtement coupe-vent (très venté au sommet)', 'Eau', 'Couche chaude'],
    distances_km: [0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4, 6.3, 7.2],
    elevations_m: [1078, 1110, 1160, 1220, 1290, 1350, 1400, 1445, 1078],
    tags: ['volcan', 'auvergne', 'patrimoine', 'panorama'],
  },
  {
    id: 5,
    slug: 'foret-fontainebleau-gorges-franchard',
    name: 'Forêt de Fontainebleau — Gorges de Franchard',
    short_description: 'Un labyrinthe de rochers gréseux et de sable blanc aux portes de Paris.',
    description: `À moins d'une heure de Paris, la forêt de Fontainebleau cache un paysage surprenant : les gorges de Franchard, un dédale de rochers gréseux sculptés par l'érosion, de sable blanc et de landes fleuries.

Ce circuit traverse les sites les plus typiques du massif. On serpente entre des blocs de grès aux formes étranges, certains culminant à 10-15 mètres et prisés des grimpeurs de bloc du monde entier (Fontainebleau est la mecque internationale de l'escalade de bloc).

La forêt abrite une biodiversité remarquable : chênes pluricentenaires, fougères géantes, et une flore de landes unique en Île-de-France. Au printemps, les bruyères fleurissent en rose et les fougères déploient leurs crosses.

Idéal en toutes saisons, particulièrement en automne pour les couleurs.`,
    region_name: 'Île-de-France',
    region_slug: 'ile-de-france',
    department_name: 'Seine-et-Marne',
    department_slug: 'seine-et-marne',
    distance_km: 10.1,
    elevation_gain_m: 80,
    elevation_loss_m: 80,
    duration_min: 210,
    difficulty: 'tres_facile',
    trail_type: 'boucle',
    start_lat: 48.4012,
    start_lon: 2.6234,
    cover_photo_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking des Gorges de Franchard — gratuit',
    start_address: 'Route des Gorges de Franchard, 77300 Fontainebleau',
    gear: ['Chaussures de marche', 'Eau', 'Pique-nique'],
    distances_km: [0, 1.3, 2.5, 3.8, 5, 6.3, 7.5, 8.8, 10.1],
    elevations_m: [95, 105, 120, 130, 115, 100, 110, 120, 95],
    tags: ['forêt', 'rochers', 'île-de-france', 'famille', 'escalade'],
  },
  {
    id: 6,
    slug: 'aiguillette-des-houches-belvedere-mont-blanc',
    name: 'Aiguillette des Houches — Belvédère du Mont-Blanc',
    short_description: 'Une crête alpine avec une vue directe et imprenable sur le massif du Mont-Blanc.',
    description: `L'Aiguillette des Houches est l'un des meilleurs belvédères accessibles à la journée pour contempler le massif du Mont-Blanc. Depuis la crête à 2 285 mètres, la vue plonge sur la vallée de Chamonix et s'élève jusqu'aux 4 808 mètres du Toit de l'Europe.

L'ascension débute depuis les Houches et monte sans relâche à travers les alpages. La végétation alpine laisse rapidement place aux rochers et aux névés persistants en altitude. La progression sur la crête finale, exposée des deux côtés, nécessite vigilance et équilibre.

En chemin, on longe plusieurs chalets d'alpage en activité. Les marmottes sont omniprésentes et peu farouches. En juillet, les gentianes et arnicas tapissent les pentes de jaune et de bleu.

Parcours conseillé tôt le matin pour éviter les orages d'après-midi fréquents en montagne.`,
    region_name: 'Auvergne-Rhône-Alpes',
    region_slug: 'auvergne-rhone-alpes',
    department_name: 'Haute-Savoie',
    department_slug: 'haute-savoie',
    distance_km: 11.8,
    elevation_gain_m: 1190,
    elevation_loss_m: 1190,
    duration_min: 360,
    difficulty: 'tres_difficile',
    trail_type: 'aller_retour',
    start_lat: 45.8912,
    start_lon: 6.7934,
    cover_photo_url: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking du Pont du Diable — gratuit',
    start_address: 'Route du Pont du Diable, 74310 Les Houches',
    gear: ['Chaussures de randonnée montantes obligatoires', 'Bâtons fortement recommandés', 'Vêtement chaud et imperméable', 'Eau (2L)', 'Crème solaire indice 50+', 'Lunettes de soleil'],
    distances_km: [0, 1.5, 3, 4.5, 5.9, 7.4, 8.8, 10.3, 11.8],
    elevations_m: [1008, 1150, 1320, 1560, 1780, 1980, 2150, 2285, 1008],
    tags: ['alpes', 'mont-blanc', 'crête', 'technique', 'panorama'],
  },
]

export function getDemoTrailBySlug(slug: string): DemoTrail | null {
  return DEMO_TRAILS.find(t => t.slug === slug) ?? null
}

export function getDemoTrailById(id: number): DemoTrail | null {
  return DEMO_TRAILS.find(t => t.id === id) ?? null
}
