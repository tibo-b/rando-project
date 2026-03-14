// Données de démonstration — utilisées quand la DB n'est pas connectée

export interface Waypoint {
  index: number          // numéro du point (1, 2, 3…)
  label: string          // nom court (ex: "Parking du départ")
  description: string    // instructions pour aller au point suivant
  elevation_m: number    // altitude en mètres
  distance_from_start_km: number
}

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
  municipality: string
  postal_code: string
  distance_km: number
  elevation_gain_m: number
  elevation_loss_m: number
  elevation_max_m: number   // point culminant
  elevation_min_m: number   // point le plus bas
  duration_min: number
  difficulty: 'tres_facile' | 'facile' | 'moyen' | 'difficile' | 'tres_difficile'
  trail_type: 'boucle' | 'aller_retour' | 'point_a_point'
  start_lat: number
  start_lon: number
  cover_photo_url: string
  gpx_url: string | null
  parking: string
  start_address: string
  ign_map: string           // référence carte IGN (ex: "3648OT")
  gear: string[]
  dangers: string[]         // avertissements de sécurité
  regulations: string | null // réglementation zone (parc national, etc.)
  best_seasons: string[]
  dogs_allowed: boolean | null
  public_transport: string | null
  waypoints: Waypoint[]
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
    municipality: 'La Palud-sur-Verdon',
    postal_code: '04120',
    distance_km: 24.5,
    elevation_gain_m: 820,
    elevation_loss_m: 820,
    elevation_max_m: 1250,
    elevation_min_m: 535,
    duration_min: 480,
    difficulty: 'difficile',
    trail_type: 'boucle',
    start_lat: 43.7765,
    start_lon: 6.3677,
    cover_photo_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking du Chalet de la Maline — gratuit, ouvert toute l\'année',
    start_address: 'Route des Crêtes, 04120 La Palud-sur-Verdon',
    ign_map: '3442OT',
    gear: ['Chaussures de randonnée montantes', 'Eau (minimum 2L)', 'Coupe-vent', 'Crème solaire', 'Bâtons recommandés'],
    dangers: [
      'Passage technique avec câbles de sécurité au km 8 — prudence par temps humide',
      'Descente finale sableuse et glissante — risque de chute',
      'Exposition au soleil totale — prévoir protection solaire et eau suffisante',
      'Pas de réseau mobile dans le fond des gorges',
    ],
    regulations: 'Parc Naturel Régional du Verdon — chiens tenus en laisse obligatoire, feux interdits.',
    best_seasons: ['printemps', 'automne'],
    dogs_allowed: false,
    public_transport: 'Depuis Castellane : navette estivale La Palud ↔ Castellane en juillet-août.',
    waypoints: [
      { index: 1, label: 'Parking départ', description: 'Du parking, prendre le sentier balisé GR4 en direction du sud. Longer la crête sur 2 km.', elevation_m: 950, distance_from_start_km: 0 },
      { index: 2, label: 'Belvédère de la Mescla', description: 'Vue spectaculaire sur la confluence Verdon/Artuby. Continuer sur le GR4 vers l\'ouest.', elevation_m: 870, distance_from_start_km: 3.5 },
      { index: 3, label: 'Pont de l\'Artuby', description: 'Pont suspendu à 160 m de hauteur. Traverser et descendre vers le fond des gorges.', elevation_m: 620, distance_from_start_km: 7 },
      { index: 4, label: 'Passage technique', description: 'Section équipée de câbles. Progression lente et prudente recommandée.', elevation_m: 560, distance_from_start_km: 8.5 },
      { index: 5, label: 'Fond des gorges', description: 'Point le plus bas du parcours. Possible baignade. Reprendre le sentier rive gauche.', elevation_m: 535, distance_from_start_km: 12 },
      { index: 6, label: 'Plages naturelles', description: 'Accès aux berges turquoise du Verdon. Remonter ensuite par le versant est.', elevation_m: 540, distance_from_start_km: 14 },
      { index: 7, label: 'Chalet de la Maline', description: 'Refuge avec eau potable. Dernière montée de 300 m vers le plateau.', elevation_m: 900, distance_from_start_km: 20 },
      { index: 8, label: 'Retour parking', description: 'Rejoindre le parking par le chemin de crête.', elevation_m: 950, distance_from_start_km: 24.5 },
    ],
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

Attention : l'accès en voiture est interdit de juin à septembre.`,
    region_name: 'Provence-Alpes-Côte d\'Azur',
    region_slug: 'provence-alpes-cote-dazur',
    department_name: 'Bouches-du-Rhône',
    department_slug: 'bouches-du-rhone',
    municipality: 'Marseille',
    postal_code: '13009',
    distance_km: 8.2,
    elevation_gain_m: 350,
    elevation_loss_m: 350,
    elevation_max_m: 320,
    elevation_min_m: 0,
    duration_min: 195,
    difficulty: 'moyen',
    trail_type: 'boucle',
    start_lat: 43.2148,
    start_lon: 5.4317,
    cover_photo_url: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1200&q=80',
    gpx_url: null,
    parking: 'Col de Morgiou — gratuit (interdit en voiture juil/août)',
    start_address: 'Col de Morgiou, 13009 Marseille',
    ign_map: '3245ET',
    gear: ['Chaussures de randonnée', 'Eau (1.5L minimum)', 'Maillot de bain', 'Lunettes de soleil', 'Chapeau'],
    dangers: [
      'Sentiers très exposés au soleil — risque de coup de chaleur en été, partir tôt le matin',
      'Terrain calcaire glissant après la pluie',
      'Accès en voiture interdit juillet-août — prévoir le bus ou le vélo',
      'Fermeture estivale possible en cas de risque incendie (vérifier avant départ)',
    ],
    regulations: 'Parc National des Calanques — camping interdit, chiens interdits sur les plages de juin à septembre, cueillette interdite.',
    best_seasons: ['printemps', 'automne', 'hiver'],
    dogs_allowed: false,
    public_transport: 'Bus RTM ligne 23 depuis métro Castellane. En juil-août : navette spéciale "Calanques".',
    waypoints: [
      { index: 1, label: 'Col de Morgiou', description: 'Départ du parking. Prendre le sentier balisé en jaune vers la calanque de Morgiou.', elevation_m: 220, distance_from_start_km: 0 },
      { index: 2, label: 'Calanque de Morgiou', description: 'Descente vers le port de pêche. Spot de baignade. Remonter par le sentier ouest.', elevation_m: 0, distance_from_start_km: 2.1 },
      { index: 3, label: 'Crête entre les deux calanques', description: 'Vue panoramique sur la Méditerranée. Descendre vers Sormiou.', elevation_m: 320, distance_from_start_km: 4.5 },
      { index: 4, label: 'Calanque de Sormiou', description: 'Grande plage avec restaurants. Remonter par le même chemin ou variante nord.', elevation_m: 0, distance_from_start_km: 6.1 },
      { index: 5, label: 'Retour col de Morgiou', description: 'Remontée finale par la piste forestière.', elevation_m: 220, distance_from_start_km: 8.2 },
    ],
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

Le chemin débute depuis le pont d'Espagne et monte régulièrement en lacets à travers des forêts de sapins avant d'atteindre le lac après 3 km.

Sur les rives du lac, en regardant vers le sud, la face nord du Vignemale domine de toute sa hauteur. Par beau temps, le reflet de la montagne dans les eaux calmes est spectaculaire.

Idéal en famille avec des enfants motivés. En hiver, le lac gèle partiellement.`,
    region_name: 'Occitanie',
    region_slug: 'occitanie',
    department_name: 'Hautes-Pyrénées',
    department_slug: 'hautes-pyrenees',
    municipality: 'Cauterets',
    postal_code: '65110',
    distance_km: 6.4,
    elevation_gain_m: 185,
    elevation_loss_m: 185,
    elevation_max_m: 1725,
    elevation_min_m: 1496,
    duration_min: 150,
    difficulty: 'facile',
    trail_type: 'aller_retour',
    start_lat: 42.8734,
    start_lon: -0.1256,
    cover_photo_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking du Pont d\'Espagne — 8€/jour, ouvert mai à octobre',
    start_address: 'Pont d\'Espagne, 65110 Cauterets',
    ign_map: '1748ET',
    gear: ['Chaussures de randonnée', 'Vêtement chaud (même l\'été)', 'Eau', 'Pique-nique'],
    dangers: [
      'Météo changeante en altitude — vérifier les prévisions avant le départ',
      'Sentier fréquenté en haute saison — partir tôt pour éviter la foule',
      'Névés (plaques de neige) possibles jusqu\'en juillet sur le chemin',
    ],
    regulations: 'Parc National des Pyrénées — chiens tenus en laisse obligatoire, bivouac interdit à moins de 1h des routes.',
    best_seasons: ['printemps', 'ete', 'automne'],
    dogs_allowed: false,
    public_transport: 'Navette gratuite depuis Cauterets centre (mai-oct, toutes les 30 min).',
    waypoints: [
      { index: 1, label: 'Pont d\'Espagne', description: 'Depuis le parking, suivre le sentier balisé le long du gave de Gaube vers le sud.', elevation_m: 1496, distance_from_start_km: 0 },
      { index: 2, label: 'Cascades du gave', description: 'Belles cascades sur la droite. Continuer la montée régulière dans la forêt de sapins.', elevation_m: 1580, distance_from_start_km: 1.2 },
      { index: 3, label: 'Sortie de forêt', description: 'La végétation s\'ouvre sur les pelouses d\'altitude. Le lac apparaît au loin.', elevation_m: 1680, distance_from_start_km: 2.4 },
      { index: 4, label: 'Lac de Gaube', description: 'Arrivée sur les rives du lac. Vue imprenable sur le Vignemale. Point de demi-tour.', elevation_m: 1725, distance_from_start_km: 3.2 },
      { index: 5, label: 'Retour Pont d\'Espagne', description: 'Retour par le même itinéraire.', elevation_m: 1496, distance_from_start_km: 6.4 },
    ],
    distances_km: [0, 0.8, 1.6, 2.4, 3.2, 4, 4.8, 5.6, 6.4],
    elevations_m: [1496, 1530, 1570, 1620, 1680, 1725, 1680, 1560, 1496],
    tags: ['lac', 'pyrénées', 'famille', 'montagne'],
  },
  {
    id: 4,
    slug: 'puy-de-dome-chemin-des-muletiers',
    name: 'Puy de Dôme — Chemin des Muletiers',
    short_description: 'L\'ascension du volcan emblématique d\'Auvergne par l\'ancien chemin de mules.',
    description: `Le Puy de Dôme (1 465 m) est le volcan le plus célèbre du Massif Central. Son chemin des muletiers, tracé depuis l'Antiquité, offre l'ascension la plus authentique.

Le sentier débute depuis le col de Ceyssat et monte en lacets à travers des forêts de hêtres puis des pelouses volcaniques rases balayées par le vent.

Au sommet, le panorama embrasse plus de 80 volcans de la Chaîne des Puys, classée au Patrimoine Mondial de l'UNESCO en 2018. Par temps clair, on distingue le Mont Blanc à 300 km.

Le temple romain de Mercure, partiellement restauré, trône au sommet depuis 2 000 ans.`,
    region_name: 'Auvergne-Rhône-Alpes',
    region_slug: 'auvergne-rhone-alpes',
    department_name: 'Puy-de-Dôme',
    department_slug: 'puy-de-dome',
    municipality: 'Orcines',
    postal_code: '63870',
    distance_km: 7.2,
    elevation_gain_m: 400,
    elevation_loss_m: 400,
    elevation_max_m: 1465,
    elevation_min_m: 1078,
    duration_min: 180,
    difficulty: 'moyen',
    trail_type: 'aller_retour',
    start_lat: 45.7718,
    start_lon: 2.9614,
    cover_photo_url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80',
    gpx_url: null,
    parking: 'Col de Ceyssat — gratuit, ouvert toute l\'année',
    start_address: 'Col de Ceyssat, 63870 Orcines',
    ign_map: '2531OT',
    gear: ['Chaussures de randonnée', 'Vêtement coupe-vent (très venté au sommet)', 'Eau', 'Couche chaude'],
    dangers: [
      'Vent très fort et soudain au sommet — s\'assurer que les vêtements tiennent bien',
      'Orage fréquent en après-midi d\'été — redescendre avant 14h',
      'Sentier fermé lors de la montée du Puy de Dôme (course) — vérifier le calendrier',
    ],
    regulations: 'Site classé Grand Site de France — respect des pelouses volcaniques obligatoire, ne pas sortir des sentiers balisés.',
    best_seasons: ['printemps', 'ete', 'automne'],
    dogs_allowed: true,
    public_transport: 'Panoramique des Dômes (train crémaillère) depuis Royat. Bus T2C ligne 14 jusqu\'à Orcines.',
    waypoints: [
      { index: 1, label: 'Col de Ceyssat', description: 'Départ depuis le col. Prendre le sentier balisé GR441 vers le Puy de Dôme.', elevation_m: 1078, distance_from_start_km: 0 },
      { index: 2, label: 'Forêt de hêtres', description: 'Montée régulière en sous-bois. Le sentier s\'élargit après 1 km.', elevation_m: 1160, distance_from_start_km: 1 },
      { index: 3, label: 'Limite forêt / pelouses', description: 'La végétation change. Vue sur la chaîne des Puys. Continuer la montée.', elevation_m: 1300, distance_from_start_km: 2.2 },
      { index: 4, label: 'Temple de Mercure', description: 'Ruines du temple romain au bord du sentier. Continuer vers le sommet.', elevation_m: 1420, distance_from_start_km: 3 },
      { index: 5, label: 'Sommet Puy de Dôme', description: 'Panorama 360° sur 80 volcans. Table d\'orientation. Point de demi-tour.', elevation_m: 1465, distance_from_start_km: 3.6 },
      { index: 6, label: 'Retour col de Ceyssat', description: 'Descente par le même itinéraire.', elevation_m: 1078, distance_from_start_km: 7.2 },
    ],
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

Ce circuit traverse les sites les plus typiques du massif. On serpente entre des blocs de grès aux formes étranges, certains culminant à 10-15 mètres et prisés des grimpeurs de bloc du monde entier.

La forêt abrite une biodiversité remarquable : chênes pluricentenaires, fougères géantes, et une flore de landes unique en Île-de-France. Au printemps, les bruyères fleurissent en rose.

Idéal en toutes saisons, particulièrement en automne pour les couleurs.`,
    region_name: 'Île-de-France',
    region_slug: 'ile-de-france',
    department_name: 'Seine-et-Marne',
    department_slug: 'seine-et-marne',
    municipality: 'Fontainebleau',
    postal_code: '77300',
    distance_km: 10.1,
    elevation_gain_m: 80,
    elevation_loss_m: 80,
    elevation_max_m: 144,
    elevation_min_m: 75,
    duration_min: 210,
    difficulty: 'tres_facile',
    trail_type: 'boucle',
    start_lat: 48.4012,
    start_lon: 2.6234,
    cover_photo_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking des Gorges de Franchard — gratuit',
    start_address: 'Route des Gorges de Franchard, 77300 Fontainebleau',
    ign_map: '2417OT',
    gear: ['Chaussures de marche', 'Eau', 'Pique-nique'],
    dangers: [
      'Terrain sablonneux glissant sur les pentes des gorges',
      'Ne pas escalader les rochers gréseux hors zones balisées',
    ],
    regulations: 'Forêt domaniale ONF — chiens tenus en laisse obligatoire, bivouac interdit, cueillette limitée à usage personnel.',
    best_seasons: ['printemps', 'ete', 'automne', 'hiver'],
    dogs_allowed: true,
    public_transport: 'Train Transilien R depuis Paris Gare de Lyon (40 min), puis bus Fontibus ligne 3.',
    waypoints: [
      { index: 1, label: 'Parking Franchard', description: 'Départ du parking. Prendre le sentier bleu vers les gorges.', elevation_m: 100, distance_from_start_km: 0 },
      { index: 2, label: 'Ermitage de Franchard', description: 'Ruines d\'un ancien ermitage. Continuer vers le fond des gorges.', elevation_m: 95, distance_from_start_km: 1.5 },
      { index: 3, label: 'Fond des gorges', description: 'Paysage de rochers gréseux et sable blanc. Suivre le balisage bleu.', elevation_m: 75, distance_from_start_km: 3 },
      { index: 4, label: 'Carrefour de l\'Épine', description: 'Intersection. Prendre à droite vers la lande de Franchard.', elevation_m: 120, distance_from_start_km: 5.5 },
      { index: 5, label: 'Lande de Franchard', description: 'Grande lande ouverte avec vue sur la forêt. Continuer le circuit.', elevation_m: 144, distance_from_start_km: 7 },
      { index: 6, label: 'Retour parking', description: 'Descente vers le parking par le sentier de crête.', elevation_m: 100, distance_from_start_km: 10.1 },
    ],
    distances_km: [0, 1.3, 2.5, 3.8, 5, 6.3, 7.5, 8.8, 10.1],
    elevations_m: [95, 105, 120, 130, 115, 100, 110, 120, 95],
    tags: ['forêt', 'rochers', 'île-de-france', 'famille', 'escalade'],
  },
  {
    id: 6,
    slug: 'aiguillette-des-houches-belvedere-mont-blanc',
    name: 'Aiguillette des Houches — Belvédère du Mont-Blanc',
    short_description: 'Une crête alpine avec une vue directe et imprenable sur le massif du Mont-Blanc.',
    description: `L'Aiguillette des Houches est l'un des meilleurs belvédères accessibles à la journée pour contempler le massif du Mont-Blanc. Depuis la crête à 2 285 mètres, la vue plonge sur la vallée de Chamonix.

L'ascension débute depuis les Houches et monte sans relâche à travers les alpages. La végétation alpine laisse rapidement place aux rochers et aux névés persistants en altitude.

En chemin, on longe plusieurs chalets d'alpage en activité. Les marmottes sont omniprésentes et peu farouches. En juillet, les gentianes et arnicas tapissent les pentes.

Parcours conseillé tôt le matin pour éviter les orages d'après-midi fréquents en montagne.`,
    region_name: 'Auvergne-Rhône-Alpes',
    region_slug: 'auvergne-rhone-alpes',
    department_name: 'Haute-Savoie',
    department_slug: 'haute-savoie',
    municipality: 'Les Houches',
    postal_code: '74310',
    distance_km: 11.8,
    elevation_gain_m: 1190,
    elevation_loss_m: 1190,
    elevation_max_m: 2285,
    elevation_min_m: 1008,
    duration_min: 360,
    difficulty: 'tres_difficile',
    trail_type: 'aller_retour',
    start_lat: 45.8912,
    start_lon: 6.7934,
    cover_photo_url: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1200&q=80',
    gpx_url: null,
    parking: 'Parking du Pont du Diable — gratuit',
    start_address: 'Route du Pont du Diable, 74310 Les Houches',
    ign_map: '3531ET',
    gear: ['Chaussures de randonnée montantes obligatoires', 'Bâtons fortement recommandés', 'Vêtement chaud et imperméable', 'Eau (2L)', 'Crème solaire indice 50+', 'Lunettes de soleil'],
    dangers: [
      'Orage très fréquent en altitude l\'après-midi — impératif de redescendre avant 13h',
      'Névés (neige dure) possibles jusqu\'en juillet sur la crête — crampons légers conseillés',
      'Crête très exposée au vent — vêtements chauds même en été',
      'Terrain rocheux instable sur les 200 derniers mètres — progression lente',
    ],
    regulations: null,
    best_seasons: ['ete', 'automne'],
    dogs_allowed: true,
    public_transport: 'Bus Chamonix Bus ligne 1 jusqu\'aux Houches (25 min). Train Mont-Blanc Express depuis St-Gervais.',
    waypoints: [
      { index: 1, label: 'Pont du Diable', description: 'Départ du parking. Prendre le sentier balisé en rouge vers les alpages.', elevation_m: 1008, distance_from_start_km: 0 },
      { index: 2, label: 'Alpage de Bourgeat', description: 'Premier alpage avec chalet en activité. Vue sur la vallée de Chamonix. Continuer vers le haut.', elevation_m: 1450, distance_from_start_km: 2.5 },
      { index: 3, label: 'Col de la Forclaz', description: 'Col intermédiaire. La pente s\'accentue. Rester sur le balisage rouge.', elevation_m: 1850, distance_from_start_km: 4.5 },
      { index: 4, label: 'Début de la crête', description: 'Terrain rocheux. Vue sur le massif du Mont-Blanc à gauche.', elevation_m: 2100, distance_from_start_km: 5.5 },
      { index: 5, label: 'Aiguillette des Houches', description: 'Point culminant. Panorama 360° sur Mont-Blanc, Aiguilles Rouges, vallée. Point de demi-tour.', elevation_m: 2285, distance_from_start_km: 5.9 },
      { index: 6, label: 'Retour Pont du Diable', description: 'Descente par le même itinéraire — prudence sur les névés.', elevation_m: 1008, distance_from_start_km: 11.8 },
    ],
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
