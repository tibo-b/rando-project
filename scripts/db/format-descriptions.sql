-- ============================================================
-- FORMAT DES DESCRIPTIONS — mini-titres et listes à puces
-- ============================================================

-- 1. GORGES DU VERDON
UPDATE trails SET description =
'Les Gorges du Verdon, surnommées le "Grand Canyon européen", constituent l''un des sites naturels les plus spectaculaires de France. Creusées sur 700 mètres de profondeur dans le calcaire, elles s''étendent sur 25 kilomètres entre falaises vertigineuses et eaux turquoise.

## Le parcours

Le départ s''effectue depuis le parking du Chalet de la Maline. Dès les premiers mètres, le sentier Blanc-Martel (GR4) s''engage sous les falaises et réserve des vues à couper le souffle sur les parois qui s''élèvent à plus de 300 mètres au-dessus de vous.

La descente vers le fond des gorges emprunte des sentiers aménagés mais exigeants. Vous traverserez les tunnels de la Baume-aux-Pigeons, véritables excavations naturelles dans la falaise calcaire, offrant une expérience unique entre lumière et pénombre.

Au fond des gorges, le Verdon révèle ses eaux d''un bleu-vert extraordinaire. En été, les vasques naturelles offrent des spots de baignade inoubliables dans une eau cristalline à 16-18°C. La remontée vers le plateau emprunte d''étroites vires à flanc de falaise, les sections les plus techniques du circuit.

## Points forts

- Eaux turquoise dans les vasques naturelles au fond des gorges
- Tunnels naturels de la Baume-aux-Pigeons (90 m de longueur)
- Vires à flanc de falaise avec vue plongeante sur 200 m
- Panorama sur les méandres depuis le plateau de la Palud

## Conseils

Cette randonnée est déconseillée en plein été (chaleur extrême dans le fond des gorges) et après de fortes pluies. Les mois d''avril-mai et septembre-octobre offrent les meilleures conditions. Prévoir impérativement une lampe frontale pour les tunnels et au moins 2L d''eau.'
WHERE slug = 'gorges-du-verdon-grand-canyon';

-- 2. CALANQUES DE MARSEILLE
UPDATE trails SET description =
'Le Parc National des Calanques abrite l''un des paysages les plus sauvages de France métropolitaine. Ce circuit relie deux des calanques les plus préservées : Morgiou, la plus authentique, et Sormiou, la plus grande, entre pinèdes parfumées et eaux méditerranéennes d''un bleu limpide.

## Le parcours

Le départ depuis le Col de Morgiou plonge dans des pinèdes de pins d''Alep odorants. Le sentier descend vers la calanque de Morgiou — aucune route carrossable n''y descend, ce qui lui conserve un caractère d''une authenticité rare à deux pas de Marseille.

La traversée vers Sormiou emprunte la crête du massif avec des vues à 360° : Méditerranée au sud, Marseille au nord. La descente sur Sormiou révèle une grande plage de galets et de sable, avec deux restaurants ouverts en été.

## Points forts

- Port de pêche de Morgiou, accessible uniquement à pied
- Crête panoramique avec vue simultanée sur les deux calanques
- Eaux transparentes à 26°C en été, snorkeling exceptionnel
- Paysage calcaire blanc contrastant avec le vert des pins

## À savoir

Le Parc ferme fréquemment les sentiers de juin à septembre en cas de risque incendie — vérifier avant de partir. En juillet-août, l''accès en voiture est interdit depuis le Col de la Gineste : navette RTM obligatoire depuis Marseille.'
WHERE slug = 'calanques-de-marseille-morgiou-sormiou';

-- 3. LAC DE GAUBE
UPDATE trails SET description =
'Le lac de Gaube est l''un des joyaux absolus des Pyrénées françaises. Ce lac glaciaire (1 725 m) doit sa célébrité à son reflet : la face nord du Vignemale (3 298 m), le plus haut sommet des Pyrénées françaises, se mire dans ses eaux émeraude avec une perfection photographique incomparable.

## Le parcours

Le chemin débute depuis le Pont d''Espagne (1 496 m), longe le gave de Gaube dans une forêt de sapins argentés et monte régulièrement à travers des prairies alpines. L''arrivée sur les rives du lac est un moment inoubliable : les eaux sont d''un vert émeraude intense dû aux minéraux glaciaires en suspension.

Pour aller plus loin, le refuge des Oulettes de Gaube (2 151 m) est visible depuis les rives et accessible en 1h30 supplémentaire, avec vue directe sur le glacier du Vignemale.

## Points forts

- Reflet du Vignemale (3 298 m) dans les eaux émeraude du lac
- Forêt de sapins argentés et prairies fleuries en juillet
- Marmottes très présentes sur les rives alpines
- Accessible à tous, même avec des enfants

## Conseils

Partir avant 8h en haute saison pour profiter du calme avant l''arrivée des touristes. La navette gratuite depuis Cauterets évite le parking (payant 8€/jour). Les névés persistent jusqu''en juillet sur le haut du sentier.'
WHERE slug = 'lac-de-gaube-vignemale';

-- 4. PUY DE DÔME
UPDATE trails SET description =
'Le Puy de Dôme (1 465 m) est le volcan le plus emblématique du Massif Central. Classé au Patrimoine Mondial de l''UNESCO en 2018 avec les 80 volcans de la Chaîne des Puys, son ascension par le chemin historique des muletiers est l''une des randonnées les plus chargées d''histoire de France.

## Le parcours

Le sentier des muletiers, tracé depuis l''Antiquité romaine, monte régulièrement depuis le Col de Ceyssat à travers des landes à myrtilles et bruyères. À mi-hauteur, les ruines du Temple de Mercure romain (Ier siècle ap. J.-C.) témoignent de l''importance sacrée de ce sommet depuis 2 000 ans.

Le plateau sommital offre un panorama à 360° sur plus de 80 volcans de la Chaîne des Puys alignés sur 40 km, le Massif du Sancy et, par grand beau temps, le Mont Blanc à 300 km.

## Points forts

- Vue sur 80 volcans de la Chaîne des Puys (UNESCO)
- Ruines du Temple de Mercure romain (1er siècle ap. J.-C.)
- Panorama jusqu''au Mont Blanc par temps clair
- Landes à myrtilles et bruyères sur les pentes

## Attention au vent

Le Puy de Dôme est l''un des sites les plus venteux de France : des rafales de 100-120 km/h sont possibles même par beau temps en plaine. Une veste coupe-vent est indispensable. Les orages de l''après-midi sont fréquents et violents — partir impérativement avant 13h en été.'
WHERE slug = 'puy-de-dome-chemin-des-muletiers';

-- 5. FONTAINEBLEAU
UPDATE trails SET description =
'À 60 kilomètres de Paris, la forêt de Fontainebleau cache un paysage surprenant : les gorges de Franchard, un chaos de rochers gréseux vieux de 50 millions d''années, du sable blanc immaculé et des landes fleuries. Un dépaysement complet aux portes de la capitale.

## Le parcours

Le circuit serpente entre des blocs de grès éocène aux formes sculptées par l''érosion — champignons, arches, menhirs naturels. Ce site est mondialement célèbre dans la communauté de l''escalade : les grimpeurs du monde entier s''entraînent ici depuis les années 1930 sur des milliers de voies.

La lande de Franchard, traversée en seconde partie, est couverte de callunes (bruyères) qui se colorent en rose-violet de juillet à septembre. Une mare forestière abrite tritons et grenouilles au printemps.

## Points forts

- Chaos de grès aux formes animales (l''Éléphant, la Tortue…)
- Sable blanc pur, reliquat d''un ancien désert éocène
- Landes à bruyères roses en été
- Accessible toute l''année, idéal avec des enfants

## Pratique

Accessible en train depuis Paris Gare de Lyon (40 min) puis bus. Ouvert toute l''année, même en hiver sous la neige. Les champignons (cèpes, girolles) sont abondants en automne sur ce sol sablonneux — ramassage pour usage personnel toléré.'
WHERE slug = 'foret-fontainebleau-gorges-franchard';

-- 6. AIGUILLETTE DES HOUCHES
UPDATE trails SET description =
'L''Aiguillette des Houches (2 285 m) est l''un des belvédères les plus sauvages accessibles à la journée depuis Chamonix. Depuis la crête, le panorama sur la face nord du Mont-Blanc (4 808 m) et ses glaciers est d''une intensité rare — une expérience alpine inoubliable pour les randonneurs bien préparés.

## Le parcours

La montée depuis le Pont du Diable (1 008 m) traverse d''abord une forêt d''épicéas avant de déboucher sur les alpages de Bourgeat, en activité de juin à septembre (vaches Abondance, dégustation de fromages possible). Les marmottes sont omniprésentes sur les pentes.

Le Col de la Forclaz (1 850 m) marque la transition vers le terrain alpin. Les derniers 400 mètres de dénivelé progressent sur une arête rocheuse exposée au vent jusqu''à la crête de l''Aiguillette, avec un panorama à 360° sur tout le massif du Mont-Blanc.

## Points forts

- Vue frontale sur le Mont-Blanc (4 808 m) et ses glaciers
- Alpages en activité avec fromagerie artisanale
- Marmottes des Alpes en très grand nombre
- Gentianes et arnicas en juillet sur les pentes

## Indispensable avant de partir

- Départ impératif avant 8h — orages très fréquents l''après-midi en altitude
- Chaussures de randonnée montantes obligatoires (terrain rocheux instable)
- Bâtons fortement recommandés pour la descente (1 190 m de D−)
- Névés possibles jusqu''en juillet sur la crête — crampons légers recommandés avant mi-juillet'
WHERE slug = 'aiguillette-des-houches-belvedere-mont-blanc';
