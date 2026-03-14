-- ============================================================
-- ENRICHISSEMENT DES 6 RANDOS DÉMO — Contenu complet
-- Style Visorando : description longue, 8-10 waypoints,
-- saisons, transports, méta SEO, chiens, transport
-- À exécuter dans Neon SQL Editor
-- ============================================================

-- ============================================================
-- 1. GORGES DU VERDON — Grand Canyon
-- ============================================================
UPDATE trails SET
  description = 'Les Gorges du Verdon, surnommées le "Grand Canyon européen", constituent l''un des sites naturels les plus spectaculaires de France et du continent. Creusées dans le calcaire sur 700 mètres de profondeur sur 25 kilomètres de longueur, elles figurent parmi les plus impressionnantes gorges d''Europe. Ce circuit emblématique vous entraîne le long des falaises calcaires vertigineuses qui plongent dans les eaux turquoise du Verdon.

Le départ s''effectue depuis le parking du Chalet de la Maline, accessible depuis la Route des Crêtes. Dès les premiers mètres, le sentier Blanc-Martel (GR4) s''engage sous les falaises et réserve des vues à couper le souffle sur les parois qui s''élèvent à plus de 300 mètres au-dessus de vous.

La descente vers le fond des gorges emprunte des sentiers aménagés mais exigeants, où de nombreux passages sont équipés de câbles et de mains-courantes métalliques. Vous traverserez les tunnels de la Baume-aux-Pigeons, véritables excavations naturelles dans la falaise calcaire, offrant une expérience unique entre lumière et pénombre.

Au fond des gorges, le Verdon révèle ses eaux d''un bleu-vert extraordinaire, colorées par les minéraux en suspension. En été, les vasques naturelles offrent des spots de baignade inoubliables dans une eau cristalline et fraîche. Ce moment de pause est indispensable avant d''attaquer la montée vers le point Sublime.

La remontée vers le plateau est la partie la plus technique du parcours. On chemine à flanc de falaise sur des vires (étroits chemins taillés dans la roche) avant d''émerger sur le Plateau de la Palud avec un panorama grandiose sur l''ensemble des gorges. La fin du circuit longe la crête avant de rejoindre le point de départ.

Cette randonnée est déconseillée en plein été (chaleur extreme dans le fond des gorges, fréquentation maximale) et après de fortes pluies (risques de glissements). Les mois d''avril-mai et septembre-octobre offrent les meilleures conditions : températures agréables, eaux turquoise et lumière photographique exceptionnelle.',

  short_description = 'Le plus grand canyon d''Europe : falaises à 300 m, eaux turquoise, tunnels dans la roche et vires spectaculaires sur 25 km.',

  waypoints = '[
    {"index":1,"label":"Parking du Chalet de la Maline","description":"Départ depuis le grand parking. Prendre le sentier balisé GR4 (blanc et rouge) vers le bord du canyon. Les premières vues sur les gorges apparaissent dès 200 mètres. Panneau d''information sur les règles du Parc Naturel Régional.","elevation_m":945,"distance_from_start_km":0},
    {"index":2,"label":"Belvédère de la Mescla","description":"Premier belvédère majeur : vue spectaculaire sur la confluence du Verdon et du torrent de l''Artuby. En contrebas, les eaux turquoise s''écoulent dans un méandre serré entre 200 mètres de falaises verticales. Site photographique exceptionnel.","elevation_m":860,"distance_from_start_km":3.2},
    {"index":3,"label":"Tunnel de la Baume-aux-Pigeons","description":"Passage à travers deux tunnels naturels creusés dans la roche calcaire. Munis d''une lampe frontale ou d''un téléphone. Le premier tunnel fait 90 mètres, le second 20 mètres. Les pigeons rupestres nichent ici depuis des siècles.","elevation_m":720,"distance_from_start_km":5.8},
    {"index":4,"label":"Escalier de la Passerelle","description":"Série de marches taillées dans la roche calcaire, certaines soutenues par des câbles métalliques. Descente finale vers le fond des gorges. Attention aux chaussures : le calcaire est glissant même sec.","elevation_m":580,"distance_from_start_km":8.1},
    {"index":5,"label":"Fond des gorges — Vasques de baignade","description":"Point le plus bas du parcours. Les vasques creusées par l''érosion dans le lit du Verdon offrent une baignade exceptionnelle (eau à 16-18°C même en été). Prévoir le maillot. Attention : aucun secours en bas en cas d''incident, et pas de réseau téléphonique.","elevation_m":535,"distance_from_start_km":11.5},
    {"index":6,"label":"Passerelle de l''Estellié","description":"Pont suspendu en bois et métal qui enjambe le Verdon. Vue vertigineuse vers l''amont. C''est le point de croisement avec le GR4 venant de l''autre rive. Le bruit de la rivière est ici assourdissant.","elevation_m":550,"distance_from_start_km":13.2},
    {"index":7,"label":"Escalade des Vires de Guègues","description":"Section la plus technique : progression sur d''étroites vires (passages taillés à flanc de falaise) avec vue plongeante sur 200 mètres. Les câbles de sécurité sont fixés en permanence. Éviter par temps de pluie ou de vent fort.","elevation_m":750,"distance_from_start_km":16.8},
    {"index":8,"label":"Belvédère de l''Imbut","description":"Panorama sur l''un des méandres les plus serrés des gorges. On aperçoit en contrebas le « chaudron de l''Imbut », une vasque naturelle de 30 mètres de diamètre. Excellent spot pour un pique-nique avec vue.","elevation_m":890,"distance_from_start_km":19.5},
    {"index":9,"label":"Plateau de la Palud — Crête de Barbin","description":"Retour sur le plateau calcaire. La végétation change radicalement : chênes pubescents, lavande sauvage et thym parfument l''air. Vue d''ensemble sur toute la longueur des gorges empruntées.","elevation_m":940,"distance_from_start_km":22.1},
    {"index":10,"label":"Retour Parking Chalet de la Maline","description":"Les 2,5 derniers kilomètres longent la Route des Crêtes sur un sentier parallèle en balcon. Vue sur les gorges une dernière fois avant le parking. Eau potable disponible au chalet.","elevation_m":945,"distance_from_start_km":24.5}
  ]',

  best_seasons = ARRAY['printemps','automne'],
  dogs_allowed = false,
  public_transport = 'Depuis Castellane (40 min de route) : navette estivale La Palud ↔ Castellane en juillet-août. Depuis Manosque : bus LER 08 jusqu''à Castellane, puis taxi ou vélo.',

  meta_title = 'Gorges du Verdon — Grand Canyon : randonnée 24 km | Sentier Blanc-Martel GR4',
  meta_description = 'Randonnée dans les Gorges du Verdon (24,5 km, 820 m D+, difficile). Sentier Blanc-Martel GR4 : falaises à 300 m, tunnels, vasques de baignade turquoise. Guide complet.'

WHERE slug = 'gorges-du-verdon-grand-canyon';

-- Profil altimétrique enrichi (20 points)
UPDATE trail_elevation_profiles SET
  distances_km = ARRAY[0,1.2,2.4,3.2,4.5,5.8,7.1,8.1,9.5,10.5,11.5,12.5,13.5,15,16.8,18.5,19.5,21,22.5,24.5],
  elevations_m = ARRAY[945,930,895,860,810,720,640,580,560,542,535,538,550,650,750,840,890,920,940,945],
  point_count = 20
WHERE trail_id = (SELECT id FROM trails WHERE slug = 'gorges-du-verdon-grand-canyon');


-- ============================================================
-- 2. CALANQUES DE MARSEILLE — Morgiou et Sormiou
-- ============================================================
UPDATE trails SET
  description = 'Le Parc National des Calanques, créé en 2012, abrite l''un des paysages les plus sauvages et les plus beaux de France métropolitaine. Ce circuit relie deux des calanques les plus préservées du massif : Morgiou, la plus sauvage, et Sormiou, la plus emblématique. Entre pinèdes parfumées, falaises calcaires blanches et eaux méditerranéennes d''un bleu limpide, cette randonnée est un chef-d''œuvre de la nature provençale.

Le départ depuis le Col de Morgiou (220 m) plonge immédiatement dans l''ambiance : pinèdes de pins d''Alep et d''Alep, odeur de thym, cigales en été. Le sentier descend régulièrement vers la calanque de Morgiou à travers un maquis dense ponctué de cistes et de romarin.

La calanque de Morgiou est la plus authentique : aucune route carrossable n''y descend (l''accès en voiture est réservé aux résidents). Un minuscule port de pêche avec une dizaine de cabanons colorés donne l''impression d''être hors du temps, à deux pas de la deuxième ville de France. En été, les eaux atteignent 26-28°C et la transparence permet de voir le fond à 8-10 mètres.

La traversée vers Sormiou emprunte la crête du massif avec des vues à 360° : d''un côté la Méditerranée à perte de vue, de l''autre les quartiers sud de Marseille. Le sentier est parfois exposé et demande de l''attention sur le calcaire fissuré.

Sormiou est la plus grande des calanques du massif marseillais. Sa plage de galets et sa plage de sable en font un lieu très fréquenté en été, mais la beauté du site reste intacte. En week-end, arriver avant 9h pour trouver une place au parking ou éviter l''affluence.

Attention : le Parc National ferme fréquemment les sentiers de juin à septembre en cas de risque incendie élevé (indice météo). Vérifiez toujours les fermetures sur le site du Parc avant de partir.',

  short_description = 'Deux calanques sauvages de Marseille reliées par la crête : port de pêche secret de Morgiou, plage de sable de Sormiou, eaux transparentes à 26°C.',

  waypoints = '[
    {"index":1,"label":"Col de Morgiou — Départ","description":"Parking situé sur la route du Col de Morgiou. En juillet-août, l''accès en voiture est interdit depuis le Col de la Gineste : navette depuis Marseille (arrêt métro Castellane) ou venir en vélo. Prendre le sentier balisé en jaune vers le sud-est.","elevation_m":220,"distance_from_start_km":0},
    {"index":2,"label":"Bifurcation Morgiou","description":"Jonction avec le sentier descendant directement à Morgiou. Prendre à droite pour continuer vers la côte. Vue sur la mer entre les pins. Le sentier devient plus rocailleux et exposé.","elevation_m":180,"distance_from_start_km":0.9},
    {"index":3,"label":"Calanque de Morgiou — Le Port","description":"Descente finale sur 300 mètres de dénivelé négatif jusqu''au port. Quelques cabanons de pêcheurs datant du XIXe siècle, une dizaine de barques. Baignade possible depuis les rochers (eau turquoise à 26°C en été). Pas de commodités — prévoir sa nourriture et son eau.","elevation_m":0,"distance_from_start_km":2.1},
    {"index":4,"label":"Remontée par le vallon de Morgiou","description":"La montée depuis le port est raide sur les 300 premiers mètres. Prendre le sentier balisé vers le nord-ouest qui remonte par le vallon. Une source (non potable) est visible sur la gauche mais ne pas s''y fier.","elevation_m":120,"distance_from_start_km":3.1},
    {"index":5,"label":"Crête de la Gardiole — Point haut","description":"Point culminant du circuit à 320 mètres. Panorama exceptionnel : au sud la Méditerranée ouverte vers le large, au nord les quartiers de Marseille, à l''est la chaîne des Calanques. Par temps clair, on aperçoit les îles du Frioul.","elevation_m":320,"distance_from_start_km":4.5},
    {"index":6,"label":"Belvédère de la Candelle","description":"Falaises calcaires plongeant à pic dans la mer. Vue sur les deux calanques simultanément. C''est l''un des spots photographiques les plus réputés du massif. Attention : aucun garde-corps — rester éloigné des bords.","elevation_m":280,"distance_from_start_km":5.2},
    {"index":7,"label":"Calanque de Sormiou — La Plage","description":"Descente vers la plage de Sormiou. La calanque est nettement plus grande que Morgiou. Deux restaurants ouverts en été (navettes bateau depuis Marseille en juillet-août). La plage comporte une zone de sable blanc et une zone de galets. Baignade et snorkeling recommandés.","elevation_m":0,"distance_from_start_km":6.1},
    {"index":8,"label":"Vallon de Sormiou — Remontée","description":"Sentier remontant par le vallon. Moins direct que par Morgiou mais le dénivelé est mieux réparti. On passe devant les ruines d''un cabanon du XIXe siècle.","elevation_m":80,"distance_from_start_km":7},
    {"index":9,"label":"Retour Col de Morgiou","description":"Dernière portion sur la piste forestière. Retour au col en longeant la falaise ouest. Vue sur la plaine marseillaise et les Calanques derrière soi.","elevation_m":220,"distance_from_start_km":8.2}
  ]',

  best_seasons = ARRAY['printemps','automne','hiver'],
  dogs_allowed = false,
  public_transport = 'Bus RTM ligne 23 depuis métro Castellane (Marseille) jusqu''au Cabanon de l''Estaque. En juillet-août : navette spéciale "Calanques" depuis métro Castellane (réservation recommandée sur le site RTM).',

  meta_title = 'Calanques Morgiou Sormiou : randonnée 8 km boucle | Parc National Calanques',
  meta_description = 'Randonnée boucle Morgiou-Sormiou (8,2 km, 350 m D+). Port de pêche secret, crête panoramique, eaux turquoise. Accès fermé juil-août — navette RTM. Guide complet.'

WHERE slug = 'calanques-de-marseille-morgiou-sormiou';

UPDATE trail_elevation_profiles SET
  distances_km = ARRAY[0,0.5,0.9,1.3,1.7,2.1,2.6,3.1,3.6,4.1,4.5,5.0,5.5,5.8,6.1,6.5,6.9,7.3,7.8,8.2],
  elevations_m = ARRAY[220,240,200,160,110,60,20,0,40,80,150,200,280,320,290,210,130,60,10,0,80,140,190,220],
  point_count = 20
WHERE trail_id = (SELECT id FROM trails WHERE slug = 'calanques-de-marseille-morgiou-sormiou');


-- ============================================================
-- 3. LAC DE GAUBE — Vue sur le Vignemale
-- ============================================================
UPDATE trails SET
  description = 'Le lac de Gaube est l''un des joyaux absolus des Pyrénées françaises. Ce lac glaciaire d''altitude (1 725 m) doit sa célébrité à son reflet : la face nord du Vignemale (3 298 m), le plus haut sommet des Pyrénées françaises côté France, se mire dans ses eaux émeraude avec une perfection qui en fait l''une des scènes les plus photographiées de la montagne française.

Le chemin débute depuis le Pont d''Espagne (1 496 m), l''un des sites touristiques les plus fréquentés des Pyrénées. En dehors de la haute saison, ce lieu conserve un charme remarquable : une cascade puissante, des forêts de sapins argentés et le grondement du gave de Gaube. En haute saison, il est préférable de partir tôt le matin (avant 8h) pour profiter du calme.

Deux options pour rejoindre le lac : le sentier pédestre (décrit ici) ou la télécabine (2,50€, ouverte de mi-juin à mi-septembre). Le sentier est nettement plus intéressant : il longe le gave de Gaube dans une forêt de pins et de sapins, traverse des prairies alpines et réserve des vues progressivement plus spectaculaires sur les sommets pyrénéens.

L''arrivée sur les rives du lac de Gaube est un moment inoubliable. Le lac mesure 800 mètres de longueur sur 400 mètres de largeur. Ses eaux sont d''un vert émeraude intense en été (dû aux minéraux glaciaires en suspension) et d''un bleu ardoise en début de saison. La baignade est autorisée mais l''eau ne dépasse jamais 15°C, même en été — il s''agit d''eau de fonte glaciaire.

Au nord du lac, le refuge des Oulettes de Gaube (2 151 m) est visible depuis les rives. Pour les randonneurs souhaitant aller plus loin, il est possible de monter jusqu''au refuge en 1h30 supplémentaire pour une vue directe sur le glacier du Vignemale — une option que l''on recommande vivement si les jambes le permettent.

Le retour s''effectue par le même itinéraire. En descendant, pensez à vous retourner pour admirer la vue sur les crêtes pyrénéennes qui se déroulent à l''est et à l''ouest — une perspective différente et tout aussi belle.',

  short_description = 'Lac glaciaire à 1 725 m reflétant le Vignemale (3 298 m), le plus haut sommet des Pyrénées françaises. Randonnée accessible et spectaculaire.',

  waypoints = '[
    {"index":1,"label":"Pont d''Espagne — Parking","description":"Parking payant (8€/jour en saison). Prendre le sentier balisé PR (jaune) qui part au nord du pont. Éviter la télécabine et choisir le sentier pédestre rive gauche pour une expérience plus authentique. Les premières cascades du Gave de Gaube sont visibles à 200 mètres.","elevation_m":1496,"distance_from_start_km":0},
    {"index":2,"label":"Cascades du Gave de Gaube","description":"Série de cascades impressionnantes formées par le torrent dans des gorges étroites. Point photographique populaire. Un pont permet de passer d''une rive à l''autre. La puissance du torrent varie considérablement selon la saison (fonte des neiges en juin vs fin d''été).","elevation_m":1535,"distance_from_start_km":0.8},
    {"index":3,"label":"Forêt de sapins — Zone de repos","description":"La forêt de sapins argentés et de pins à crochets offre une ombre bienvenue. Bancs installés par le Parc National pour se reposer. Les écureuils et les geais des montagnes sont très présents. En juin, les orchidées de montagne fleurissent au bord du sentier.","elevation_m":1580,"distance_from_start_km":1.3},
    {"index":4,"label":"Sortie de forêt — Première vue sur le lac","description":"Le sentier sort de la forêt. Première apparition du lac de Gaube et de la face nord enneigée du Vignemale au fond de la vallée. La vue se dégage progressivement. Les pentes autour sont couvertes de rhododendrons qui fleurissent en juillet.","elevation_m":1640,"distance_from_start_km":2.0},
    {"index":5,"label":"Rive sud du lac de Gaube","description":"Arrivée sur les rives du lac. Table d''orientation indiquant les sommets visibles. Vignemale (3 298 m), Pics de la Cascade (2 999 m), Pique Longue. Une cabane en pierre abrite le gardien du site en haute saison. Baignade possible depuis les rochers plats sur la rive est.","elevation_m":1725,"distance_from_start_km":2.7},
    {"index":6,"label":"Tour du lac — Rive est","description":"En suivant la rive est sur 400 mètres, on atteint la vue frontale parfaite sur le Vignemale reflété dans le lac. C''est le spot photographique iconique, particulièrement spectaculaire en début de matinée quand le lac est encore calme. Pique-nique recommandé ici.","elevation_m":1730,"distance_from_start_km":3.2},
    {"index":7,"label":"Option : montée vers les Oulettes de Gaube","description":"Pour les randonneurs qui veulent aller plus loin : sentier balisé PR montant vers le refuge des Oulettes de Gaube (2 151 m, 1h30 aller). Vue directe sur le glacier de Vignemale. Niveau : moyen à difficile. Non inclus dans les distances et dénivelés de cette fiche.","elevation_m":1750,"distance_from_start_km":3.4},
    {"index":8,"label":"Retour — Rive ouest du lac","description":"Le retour longe brièvement la rive ouest avant de reprendre le sentier de descente. Vue sur le lac de dos avec les pentes boisées derrière. Les marmottes sont très présentes dans cette zone de prairies alpines.","elevation_m":1725,"distance_from_start_km":3.8},
    {"index":9,"label":"Descente par le sentier forêt","description":"Retour par le même sentier. La descente est plus rapide mais demande d''être attentif sur les racines exposées dans la forêt (terrain glissant par temps humide).","elevation_m":1570,"distance_from_start_km":5.2},
    {"index":10,"label":"Retour Pont d''Espagne","description":"Arrivée au Pont d''Espagne. Restaurant ouvert en saison. Parking. Navette vers Cauterets toutes les 30 minutes en été.","elevation_m":1496,"distance_from_start_km":6.4}
  ]',

  best_seasons = ARRAY['printemps','ete','automne'],
  dogs_allowed = false,
  public_transport = 'Depuis Cauterets (centre-ville) : navette estivale gratuite jusqu''au Pont d''Espagne (navette "Pont d''Espagne", mai-octobre, toutes les 30 min). Cauterets est accessible depuis Lourdes en bus (Flixbus, réseau liO).',

  meta_title = 'Lac de Gaube Vignemale : randonnée 6 km | Pyrénées Hautes-Pyrénées',
  meta_description = 'Lac de Gaube (1 725 m) face au Vignemale, randonnée 6,4 km aller-retour, facile. Reflet du glacier, baignade, marmottes. Navette gratuite depuis Cauterets. Guide complet.'

WHERE slug = 'lac-de-gaube-vignemale';

UPDATE trail_elevation_profiles SET
  distances_km = ARRAY[0,0.4,0.8,1.1,1.4,1.7,2.0,2.3,2.7,3.0,3.2,3.5,3.8,4.2,4.6,5.0,5.4,5.8,6.1,6.4],
  elevations_m = ARRAY[1496,1510,1535,1552,1568,1582,1605,1630,1660,1690,1710,1725,1730,1728,1725,1710,1680,1630,1570,1496],
  point_count = 20
WHERE trail_id = (SELECT id FROM trails WHERE slug = 'lac-de-gaube-vignemale');


-- ============================================================
-- 4. PUY DE DÔME — Chemin des Muletiers
-- ============================================================
UPDATE trails SET
  description = 'Le Puy de Dôme (1 465 m) est le volcan le plus emblématique du Massif Central et de toute la Chaîne des Puys. Classé au Patrimoine Mondial de l''UNESCO en 2018 (avec les 80 volcans de la Chaîne des Puys et la Faille de Limagne), ce stratovolcan éteint depuis 11 000 ans domine la plaine auvergnate avec une majesté particulière.

Le Chemin des Muletiers est la voie historique d''ascension du Puy de Dôme, tracée depuis l''Antiquité romaine. Ce sentier pavé de pierres volcaniques sombres fut emprunté pendant des siècles par les pèlerins qui montaient au Temple de Mercure au sommet, puis par les scientifiques (Blaise Pascal y fit réaliser la première expérience sur la pression atmosphérique en 1648) et enfin par les touristes depuis le XIXe siècle.

Le départ depuis le Col de Ceyssat (1 078 m) est le plus authentique. Le sentier s''élève régulièrement à travers des prairies volcaniques d''abord, puis des landes à myrtilles et à bruyères caractéristiques des pentes du Puy. Sur votre gauche, vous apercevez rapidement d''autres cônes volcaniques alignés — un spectacle géologique unique en Europe.

Le passage à mi-hauteur révèle les ruines du Temple de Mercure romain, le plus grand temple gallo-romain de France. L''édifice mesurait 48 mètres de longueur. Les pèlerins romains venaient implorer le dieu des voyageurs depuis Lyon, Clermont et même Rome. Un panneau d''interprétation détaille son histoire.

Le sommet offre un panorama qui, par temps clair, embrasse plus de 80 volcans de la Chaîne des Puys. On distingue également le Massif du Sancy (1 886 m) au sud, les plaines d''Auvergne, et par temps exceptionnel le Mont Blanc à 300 km. Une station météo, des antennes de télévision et le bâtiment du Panoramix (restaurant) occupent le plateau sommital.

Attention : le Puy de Dôme est l''un des sites les plus venteux de France. Des rafales de 100-120 km/h sont possibles même par beau temps en plaine. Une veste coupe-vent est indispensable, même en été. Les orages de l''après-midi sont fréquents et particulièrement violents sur ce sommet isolé — partir impérativement avant 14h en été.',

  short_description = 'Ascension du volcan le plus célèbre d''Auvergne par l''ancien chemin des muletiers romains. Panorama sur 80 volcans, classé UNESCO.',

  waypoints = '[
    {"index":1,"label":"Col de Ceyssat — Départ","description":"Parking gratuit et grand. Toilettes disponibles. Prendre le sentier balisé GR441 (blanc et rouge) vers le nord-est. Panneau récapitulatif des distances et du dénivelé. Le sentier est bien visible et pavé de pierres volcaniques sombres dès le début.","elevation_m":1078,"distance_from_start_km":0},
    {"index":2,"label":"Balisage GR441 — Première vue","description":"Le sentier traverse d''abord des prairies à jonquilles et narcisses (en mai) puis des landes à bruyères et myrtilles. Première vue dégagée sur le Puy de Dôme et les cônes volcaniques voisins (Puy de Pariou, Puy Chopine). La silhouette caractéristique du Puy de Dôme se détache.","elevation_m":1120,"distance_from_start_km":0.7},
    {"index":3,"label":"Panorama sur la Chaîne des Puys","description":"Début de la vue sur l''alignement nord-sud des volcans. On compte une dizaine de cônes visibles depuis ce promontoire. La Chaîne des Puys s''étire sur 40 km — c''est l''un des champs volcaniques les mieux conservés d''Europe. Panneau d''interprétation géologique.","elevation_m":1185,"distance_from_start_km":1.4},
    {"index":4,"label":"Ruines du Temple de Mercure","description":"Premier temple gallo-romain de France en taille (48 x 20 mètres). Construit au IIe siècle après J.-C., il était visible depuis toute la plaine. La statue de Mercure en bronze mesurait 7 mètres. Aujourd''hui, seuls les fondements restent — un musée à Clermont expose les trouvailles archéologiques.","elevation_m":1410,"distance_from_start_km":2.6},
    {"index":5,"label":"Lacets sommitaux — Zone venteuse","description":"Les 200 derniers mètres de dénivelé sont les plus exposés. Le vent s''accélère notablement. Sur votre gauche, le téléphérique (Panoramique des Dômes) arrive depuis Royat. Quelques bouquetins sont parfois visibles sur les pentes rocheuses.","elevation_m":1440,"distance_from_start_km":3.1},
    {"index":6,"label":"Sommet — Panorama 360°","description":"Panorama complet sur les 80 volcans de la Chaîne des Puys, le Sancy (1 886 m), la plaine de Limagne et par grand beau temps le Mont Blanc. Table d''orientation permanente. Accès au restaurant Panoramix (pizzas, crêpes, boissons chaudes). Attention au vent qui peut dépasser 100 km/h.","elevation_m":1465,"distance_from_start_km":3.6},
    {"index":7,"label":"Observatoire météo et antennes","description":"Côté est du plateau sommital : station météo de Météo-France installée depuis 1923. Les données collectées ici alimentent les prévisions pour tout le Massif Central. Panneau explicatif sur le record de vent enregistré (220 km/h).","elevation_m":1460,"distance_from_start_km":3.9},
    {"index":8,"label":"Descente — Vue sur la Limagne","description":"En descendant, la vue se dégage sur la plaine de la Limagne vers l''est : une mer de champs à perte de vue, créée par un affaissement tectonique de plusieurs centaines de mètres. Clermont-Ferrand et sa cathédrale gothique en lave noire sont visibles par temps clair.","elevation_m":1380,"distance_from_start_km":4.5},
    {"index":9,"label":"Zone de myrtilles","description":"Les landes à myrtilles couvrent de grandes étendues sur les flancs du Puy. En août, les baies sont abondantes et comestibles. Le ramassage pour consommation personnelle est toléré (pas de cueillette commerciale).","elevation_m":1200,"distance_from_start_km":5.8},
    {"index":10,"label":"Retour Col de Ceyssat","description":"Arrivée au parking du Col de Ceyssat. Table de pique-nique disponible. Le Chalet des Muletiers (200 mètres au nord) propose des spécialités auvergnates en saison.","elevation_m":1078,"distance_from_start_km":7.2}
  ]',

  best_seasons = ARRAY['printemps','ete','automne'],
  dogs_allowed = true,
  public_transport = 'Depuis Clermont-Ferrand (Place de Jaude) : Panoramique des Dômes (train à crémaillère) depuis la gare routière de Royat-Charade jusqu''au sommet. Pour rejoindre le Col de Ceyssat : bus T2C ligne 14 jusqu''à Orcines, puis 2 km à pied.',

  meta_title = 'Puy de Dôme Chemin des Muletiers : ascension 7 km | Volcans Auvergne UNESCO',
  meta_description = 'Monter au Puy de Dôme (1 465 m) par le Chemin des Muletiers (7,2 km, 400 m D+). Temple romain, panorama 80 volcans UNESCO. Guide complet avec conseils vent et météo.'

WHERE slug = 'puy-de-dome-chemin-des-muletiers';

UPDATE trail_elevation_profiles SET
  distances_km = ARRAY[0,0.4,0.7,1.0,1.4,1.8,2.2,2.6,3.0,3.3,3.6,4.0,4.4,4.8,5.2,5.6,6.0,6.4,6.8,7.2],
  elevations_m = ARRAY[1078,1095,1120,1145,1170,1200,1230,1270,1320,1375,1420,1452,1465,1465,1460,1430,1380,1310,1220,1078],
  point_count = 20
WHERE trail_id = (SELECT id FROM trails WHERE slug = 'puy-de-dome-chemin-des-muletiers');


-- ============================================================
-- 5. FORÊT DE FONTAINEBLEAU — Gorges de Franchard
-- ============================================================
UPDATE trails SET
  description = 'À 60 kilomètres au sud de Paris, la forêt de Fontainebleau cache l''un des paysages les plus surprenants d''Île-de-France : les gorges de Franchard. Loin des images de forêt standardisée, ces gorges révèlent un vrai chaos géologique : des blocs de grès éocène (50 millions d''années) aux formes sculptées par l''érosion, du sable blanc immaculé, des landes à bruyères roses, et des pins sylvestres tordus qui accrochent leurs racines dans les fissures rocheuses.

Ce site est célèbre dans le monde entier dans la communauté de l''escalade : depuis les années 1930, les gorges de Fontainebleau sont le terrain d''entraînement de générations d''alpinistes parisiens. Les blocs gréseux, hauts de 5 à 15 mètres, offrent des milliers de voies d''escalade cotées de 3 à 9a. Les circuits de blocs colorés (circuit bleu, circuit rouge, circuit orange…) permettent de grimper en toute sécurité sur les zones balisées.

Le circuit pédestre débute depuis le parking des Gorges de Franchard et serpente d''abord dans une forêt de chênes séculaires et de hêtres avant de plonger dans le fond des gorges. Le sol sablonneux blanc, caractéristique des plateaux de Fontainebleau, contraste avec la végétation verte.

Au fond des gorges, l''ambiance change radicalement : on progresse entre des blocs de grès aux formes organiques, certains criblés de cupules creusées par les lichens, d''autres formant des arches naturelles. L''érosion par le vent (déflation éolienne) et l''eau a travaillé ces rochers pendant des millions d''années pour créer ce paysage lunaire à 60 km de Notre-Dame de Paris.

La lande de Franchard, traversée en seconde partie de circuit, est un espace ouvert et lumineux. Les callunes (bruyères) la colorent en rose-violet de juillet à septembre. Les lézards des murailles, les lapins sauvages et parfois les cerfs de la forêt fréquentent cette zone.

Ce circuit est idéal toute l''année, même en hiver : la forêt en givre et les gorges enneigées ont un charme particulier. Très accessible (enfants, seniors), il constitue une excellente initiation à la randonnée pour les Parisiens.',

  short_description = 'Chaos de rochers gréseux de 50 millions d''années, sable blanc et landes de bruyères : un dépaysement complet à 60 km de Paris.',

  waypoints = '[
    {"index":1,"label":"Parking Gorges de Franchard","description":"Grand parking gratuit avec toilettes et panneau de départ. Prendre le sentier bleu (balisage rectangulaire bleu sur les rochers et arbres) vers le sud. Le premier kilomètre traverse une hêtraie-chênaie classique avec de beaux arbres centenaires.","elevation_m":100,"distance_from_start_km":0},
    {"index":2,"label":"Entrée des Gorges","description":"Le sol sablonneux blanc apparaît et les premiers blocs de grès s''imposent. Vue sur la dépression des gorges entre les arbres. Carrefour de sentiers — garder le balisage bleu. Les champignons (cèpes, bolets) sont abondants en automne sur ce sol sablonneux.","elevation_m":95,"distance_from_start_km":0.8},
    {"index":3,"label":"Fond des Gorges — Chaos rocheux","description":"Immersion totale dans le chaos de grès. Blocs aux formes étranges : champignons, arches, tables, menhirs naturels. Certains blocs portent les marques de craie des grimpeurs (circuits de blocs). Ne pas grimper hors des zones balisées — risque de chute.","elevation_m":78,"distance_from_start_km":2.0},
    {"index":4,"label":"Blocs de l''Éléphant et de la Tortue","description":"Deux blocs emblématiques du site reconnaissables à leur forme animale. L''Éléphant (7 m de haut) est l''un des blocs les plus photographiés de la forêt. La Tortue à côté est plus petite mais la ressemblance est frappante. Aires de repos autour avec bancs.","elevation_m":82,"distance_from_start_km":2.8},
    {"index":5,"label":"Sables blancs — Zone ouverte","description":"Grande étendue de sable blanc pur, reliquat d''un ancien désert éocène. Le sable de Fontainebleau est connu pour sa pureté (utilisé historiquement pour la fabrication du verre) et sa finesse. Se balade pieds nus en été. Sensation de désert miniature.","elevation_m":88,"distance_from_start_km":3.6},
    {"index":6,"label":"Circuit de blocs orange — Belvédère","description":"En prenant le balisage orange sur 200 mètres vers la gauche, on atteint un promontoire gréseux avec vue sur l''ensemble des gorges. Vue unique sur la densité des blocs et la végétation. Retour sur le circuit bleu.","elevation_m":118,"distance_from_start_km":4.5},
    {"index":7,"label":"Lande de Franchard — Callunes","description":"Sortie des gorges vers la grande lande ouverte. De juillet à septembre, les callunes (bruyères) couvrent la lande d''un tapis rose-violet spectaculaire. Vue sur le ciel ouvert après l''intimité des gorges. Papillons, libellules et lézards des murailles omniprésents.","elevation_m":140,"distance_from_start_km":5.8},
    {"index":8,"label":"Carrefour de la Croix de Franchard","description":"Ancienne croix de grès marquant un carrefour historique. La forêt de Fontainebleau était une chasse royale — de nombreuses croix de pierre jalonnent les anciens chemins de chasse. Prendre la direction nord-ouest pour rejoindre le parking.","elevation_m":144,"distance_from_start_km":7.0},
    {"index":9,"label":"Zone humide — Mare de Franchard","description":"Petite mare forestière entourée de mousses et de fougères. Lieu de reproduction des grenouilles vertes et des tritons en printemps. La végétation change radicalement : chênes pédonculés, aulnes et saules remplacent les pins secs.","elevation_m":108,"distance_from_start_km":8.2},
    {"index":10,"label":"Retour Parking Franchard","description":"Le sentier remonte doucement vers le parking. On repasse devant les premiers blocs de grès du départ qui ont une autre allure vu de ce côté. Aire de pique-nique avec tables en bois au niveau du parking.","elevation_m":100,"distance_from_start_km":10.1}
  ]',

  best_seasons = ARRAY['printemps','ete','automne','hiver'],
  dogs_allowed = true,
  public_transport = 'Depuis Paris Gare de Lyon : train Transilien R jusqu''à Fontainebleau-Avon (40 min), puis bus Fontibus ligne 3 jusqu''à "Gorges de Franchard" (25 min, toutes les heures). Accessible en vélo depuis Fontainebleau (5 km sur piste cyclable).',

  meta_title = 'Gorges de Franchard Fontainebleau : randonnée 10 km | Forêt Île-de-France',
  meta_description = 'Boucle Gorges de Franchard (10 km, facile). Chaos de grès, sables blancs, landes de bruyères à 60 km de Paris. Accessible toute l''année, enfants bienvenus. Guide complet.'

WHERE slug = 'foret-fontainebleau-gorges-franchard';

UPDATE trail_elevation_profiles SET
  distances_km = ARRAY[0,0.5,1.0,1.5,2.0,2.5,3.0,3.6,4.2,4.8,5.4,5.8,6.3,6.8,7.3,7.8,8.4,8.9,9.5,10.1],
  elevations_m = ARRAY[100,98,95,88,82,78,80,85,90,100,110,125,140,144,138,130,118,108,100,100],
  point_count = 20
WHERE trail_id = (SELECT id FROM trails WHERE slug = 'foret-fontainebleau-gorges-franchard');


-- ============================================================
-- 6. AIGUILLETTE DES HOUCHES — Belvédère du Mont-Blanc
-- ============================================================
UPDATE trails SET
  description = 'L''Aiguillette des Houches (2 285 m) est l''un des belvédères les plus sauvages et les plus accessibles de la vallée de Chamonix pour contempler le massif du Mont-Blanc dans toute sa grandeur. Contrairement aux itinéraires bondés de la vallée en haute saison, ce sommet des Aiguilles Rouges reste un secret bien gardé des locaux et des randonneurs avertis.

Le départ s''effectue depuis le Pont du Diable (1 008 m), aux Houches, le village qui marque l''entrée de la vallée de Chamonix. On s''élève immédiatement dans une forêt d''épicéas et de mélèzes qui laissera rapidement place aux alpages.

Le premier alpage de Bourgeat (1 450 m) marque la transition entre forêt et montagne ouverte. Les chalets d''alpage sont en activité de juin à septembre : troupeaux de vaches, fromages artisanaux, et l''atmosphère caractéristique des alpages savoyards. Les marmottes sifflent à qui mieux mieux sur les pentes herbeuses.

La montée se poursuit vers le Col de la Forclaz (1 850 m), point intermédiaire où le panorama commence à s''ouvrir sur la vallée de l''Arve. Les névés (plaques de neige persistante) sont fréquents jusqu''en juillet sur cette section — des bâtons de randonnée sont indispensables.

Les 400 derniers mètres de dénivelé vers la crête sont les plus exposés et les plus spectaculaires. On progresse à flanc de rochers vers la crête sommitale. L''exposition au vent s''accentue fortement. Sur la crête de l''Aiguillette, le panorama est total et vertigineux : face nord du Mont-Blanc (4 808 m) et ses glaciers, les Grandes Jorasses, l''Aiguille Verte, les Aiguilles de Chamonix, et de l''autre côté le massif des Aiguilles Rouges.

Cette randonnée doit être abordée avec une préparation sérieuse : bonne forme physique (1 190 m de dénivelé positif), équipement adapté (chaussures de randonnée montantes, vêtements imperméables, bâtons), et surtout un départ matinal pour être en descente avant les orages habituels de l''après-midi en altitude. Les conditions changent très rapidement en montagne alpine.',

  short_description = 'Crête alpine à 2 285 m avec vue directe sur le Mont-Blanc et ses glaciers. L''un des meilleurs belvédères accessibles à la journée depuis Chamonix.',

  waypoints = '[
    {"index":1,"label":"Pont du Diable — Départ Les Houches","description":"Parking gratuit au bord du torrent de la Creuse. Prendre le sentier balisé en rouge (GR TMB — Tour du Mont-Blanc) qui monte plein nord. Les 500 premiers mètres traversent une forêt d''épicéas avec des vues fugaces sur les Aiguilles de Chamonix. Les panneaux indiquent Alpage de Bourgeat (1h) et Aiguillette des Houches (3h).","elevation_m":1008,"distance_from_start_km":0},
    {"index":2,"label":"Forêt d''épicéas — Traversée","description":"Section forestière à l''ombre bienvenue en été. Le sentier est bien tracé mais la pente soutenue dès le début (15-20%). La forêt abrite des geais des montagnes, des mésanges boréales et parfois des chouettes de Tengmalm. En automne, les champignons sont nombreux (girolles, cèpes).","elevation_m":1180,"distance_from_start_km":1.2},
    {"index":3,"label":"Alpage de Bourgeat","description":"Sortie de la forêt sur les alpages de Bourgeat. Chalet d''alpage en activité (vaches Abondance, Tarines). Vue sur la vallée de Chamonix et le Mont-Blanc qui apparaît pour la première fois. En été : dégustation de fromages possible (reblochon, tomme). Fontaine à eau potable.","elevation_m":1450,"distance_from_start_km":2.5},
    {"index":4,"label":"Alpage supérieur — Marmottes","description":"Les alpages se succèdent à mesure qu''on monte. Les marmottes des Alpes sont particulièrement nombreuses ici — on en compte souvent des dizaines. Leur sifflement d''alarme (un seul coup court = aigle, deux coups = renard, série de coups = humain) est le son caractéristique de cette zone.","elevation_m":1620,"distance_from_start_km":3.3},
    {"index":5,"label":"Col de la Forclaz","description":"Col intermédiaire à 1 850 m. Ici la randonnée bifurque : à gauche le GR TMB continue vers le Col du Tricot (direction Contamines-Montjoie), à droite le sentier monte vers l''Aiguillette des Houches. Prendre à droite. Vue sur les deux versants de la crête.","elevation_m":1850,"distance_from_start_km":4.5},
    {"index":6,"label":"Névés et terrain rocheux","description":"Au-delà du col, le terrain devient plus minéral. Des névés persistent jusqu''en juillet (parfois août). Le sentier est balisé par des cairns (petits tas de pierres) là où la neige couvre les marques peintes. Équipement bâtons indispensable. Crampons légers recommandés avant mi-juillet.","elevation_m":2050,"distance_from_start_km":5.0},
    {"index":7,"label":"Arête sommitale — Zone exposée","description":"Les 200 derniers mètres progressent sur l''arête rocheuse. Terrain instable par endroits — poser les pieds prudemment. Le vent peut être violent (rafales de 60-80 km/h même en été). Vue sur le massif des Aiguilles Rouges à l''ouest qui s''ouvre progressivement.","elevation_m":2180,"distance_from_start_km":5.5},
    {"index":8,"label":"Aiguillette des Houches — Sommet","description":"Panorama absolu à 360° : face nord du Mont-Blanc (4 808 m) et ses glaciers (Glacier des Bossons, Mer de Glace), Grandes Jorasses (4 208 m), Aiguille Verte (4 122 m), Aiguilles de Chamonix, puis les Aiguilles Rouges côté ouest. La vallée de Chamonix 1 280 mètres en contrebas. Conditions météo à surveiller attentivement — commencer la descente dès les premiers nuages.","elevation_m":2285,"distance_from_start_km":5.9},
    {"index":9,"label":"Descente — Vue sur la Vallée Blanche","description":"En descendant côté est de la crête (200 mètres), une vue sur la Vallée Blanche et les séracs du Glacier des Bossons s''ouvre. Le glacier descend jusqu''à 1 400 m d''altitude (le glacier le plus bas d''Europe). Spectaculaire. Retour sur l''itinéraire d''ascension.","elevation_m":2200,"distance_from_start_km":6.4},
    {"index":10,"label":"Retour Pont du Diable","description":"Descente par le même itinéraire. La descente est plus rapide mais plus éprouvante pour les genoux — bâtons indispensables. Sur les alpages, prévoir un arrêt pour se réhydrater et profiter une dernière fois du panorama sur le Mont-Blanc depuis les alpages de Bourgeat.","elevation_m":1008,"distance_from_start_km":11.8}
  ]',

  best_seasons = ARRAY['ete','automne'],
  dogs_allowed = true,
  public_transport = 'Depuis Chamonix : bus Chamonix Bus ligne 1 jusqu''aux Houches (25 min, toutes les 20 min en saison). Depuis Les Houches centre : 1,5 km à pied jusqu''au Pont du Diable. Train Mont-Blanc Express depuis St-Gervais jusqu''à Les Houches.',

  meta_title = 'Aiguillette des Houches : randonnée 12 km belvédère Mont-Blanc | Chamonix Haute-Savoie',
  meta_description = 'Randonnée Aiguillette des Houches (11,8 km, 1 190 m D+, difficile). Panorama 360° sur Mont-Blanc, Jorasses, glaciers. Depuis Les Houches. Prévoir départ avant 8h. Guide complet.'

WHERE slug = 'aiguillette-des-houches-belvedere-mont-blanc';

UPDATE trail_elevation_profiles SET
  distances_km = ARRAY[0,0.6,1.2,1.8,2.3,2.8,3.3,3.8,4.3,4.8,5.2,5.5,5.9,6.4,7.0,7.6,8.2,8.8,9.4,10.1,10.8,11.3,11.8],
  elevations_m = ARRAY[1008,1080,1160,1240,1320,1390,1450,1520,1590,1660,1740,1810,1870,1940,2050,2140,2200,2250,2285,2285,2180,2050,1850,1650,1450,1250,1080,1008],
  point_count = 23
WHERE trail_id = (SELECT id FROM trails WHERE slug = 'aiguillette-des-houches-belvedere-mont-blanc');
