export interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  avatar: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  experienceYears: number;
  website?: string;
  verified?: boolean;
  type?: 'cabinet' | 'avocat' | 'notaire';
  country?: 'LU' | 'FR';
  awards?: string[];
  collaboratorsCount?: number;
}

export const lawyersList: LawyerProfile[] = [
  {
    "id": "skerzolegal",
    "name": "SKERZO Avocat (skerzolegal)",
    "title": "Cabinet d’Avocats · Propriété Intellectuelle, Brevets & Nouvelles Technologies",
    "specialties": [
      "Propriété Intellectuelle (Brevets, Marques, Dessins & Modèles)",
      "Contentieux de brevets & contrefaçon",
      "Nouvelles Technologies, Logiciels & IA",
      "Valorisation, licences & contrats de R&D",
      "IP dans les opérations de M&A et Private Equity",
      "Protection des actifs immatériels & Secret des affaires"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@skerzolegal.com",
    "phone": "+33 (0)6 87 16 35 96",
    "location": "Paris, 3, Rue François Bonvin, 75015 Paris",
    "bio": "Fondé par Maître Romain Viret, avocat au Barreau de Paris fort de plus de vingt ans d’expérience au sein de cabinets d’affaires internationaux de premier plan, SKERZO Avocat est un cabinet de référence dédié à la propriété intellectuelle et aux nouvelles technologies. Le cabinet intervient en conseil stratégique et en contentieux à fort enjeu pour la protection, la valorisation et la défense des actifs immatériels (brevets, marques, droits d'auteur, contrats IT).",
    "experienceYears": 20,
    "website": "https://www.skerzolegal.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Barreau de Paris",
      "Expertise Brevets & Propriété Intellectuelle",
      "Master 2 Paris II Panthéon-Assas",
      "LL.M University College London"
    ],
    "collaboratorsCount": 4
  },
  {
    "id": "plead-avocats",
    "name": "Plead Avocats",
    "title": "Cabinet d’Avocats · Droit du Travail, Protection Sociale & Préjudices Corporels",
    "specialties": [
      "Droit du travail & Relations sociales",
      "Ruptures conventionnelles & Négociations de départ",
      "Contentieux prud’homal & Licenciements",
      "Accidents du travail & Maladies professionnelles",
      "Harcèlement au travail & Santé au travail",
      "Réparation des préjudices corporels"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@plead-avocats.com",
    "phone": "+33 (0)4 65 84 43 58",
    "location": "Lyon, 6 Rue de la Bourse, 69001 Lyon",
    "bio": "Cabinet d’avocats lyonnais fondé par des professionnels du droit social et de la défense des droits (Me Thomas Merien, Me Julie Lopez, Me Marin Jacquard, Me Amaury Cantais). Plead Avocats accompagne salariés, cadres, dirigeants et entreprises avec engagement et réactivité tant en négociation amiable qu’en contentieux devant le Conseil de Prud’hommes et les juridictions d’appel.",
    "experienceYears": 12,
    "website": "https://www.plead-avocats.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Barreau de Lyon",
      "Défense des Droits Sociaux",
      "Contentieux Prud’homal & Négociation"
    ],
    "collaboratorsCount": 5
  },
  {
    "id": "legal-oz",
    "name": "LEGAL OZ Avocats",
    "title": "Étude d’Avocats à la Cour · Droit Immobilier, Travail & Affaires",
    "specialties": [
      "Droit immobilier & Construction",
      "Droit du travail & Sécurité sociale",
      "Droit commercial & des sociétés",
      "Bail à loyer & Contentieux locatif",
      "Recouvrement de créances",
      "Droit pénal & Responsabilité",
      "Contentieux bancaire & fiscal"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@legaloz.lu",
    "phone": "+352 22 17 67",
    "location": "Luxembourg, 1, Rue du Saint-Esprit, L-1475 Luxembourg",
    "bio": "Fondé par Maître Ersan ÖZDEK, avocat à la Cour inscrit au Barreau de Luxembourg depuis 2009, le cabinet LEGAL OZ propose une assistance juridique réactive et pragmatique tant aux entreprises qu’aux particuliers. L’étude se distingue par une solide expertise en droit immobilier et de la construction, droit du travail, baux d’habitation et commerciaux, droit commercial et recouvrement de créances, avec une politique d’honoraires claire et forfaitisée.",
    "experienceYears": 16,
    "website": "https://www.legaloz.lu/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Barreau de Luxembourg",
      "Avocat à la Cour",
      "Expertise Droit Immobilier & Social"
    ],
    "collaboratorsCount": 6
  },
  {
    "id": "cerno-law-firm",
    "name": "CERNO LAW FIRM",
    "title": "Cabinet d’Avocats · Droit des Affaires, Contentieux & Immigration",
    "specialties": [
      "Droit des sociétés & Domiciliation",
      "Immigration, Asile & Nationalité luxembourgeoise",
      "Droit du travail & Sécurité sociale",
      "Contentieux civil, commercial & Pénal",
      "Droit collaboratif & Droit de la famille",
      "Droit du logement & Baux",
      "Recouvrement de créances & Faillites"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "info@cerno-law.com",
    "phone": "+352 27 99 01 63",
    "location": "Luxembourg, 142, Boulevard de la Pétrusse, L-2330 Luxembourg",
    "bio": "Fondé en 2013 par Maître Cora Maglo au Barreau de Luxembourg, CERNO LAW FIRM est une étude pluridisciplinaire et résolument multilingue (français, anglais, espagnol, arabe). Le cabinet offre un accompagnement juridique complet aux entreprises et aux particuliers en droit des affaires, droit du travail, immigration et droit d’asile (titres de séjour, regroupement familial, nationalité), recouvrement, droit immobilier et droit collaboratif.",
    "experienceYears": 13,
    "website": "https://www.cerno-law.com/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "European Immigration Lawyers Network (EILN)",
      "AEA International Lawyers",
      "Barreau de Luxembourg"
    ],
    "collaboratorsCount": 7
  },
  {
    "id": "novalians-avocats",
    "name": "Novalians Avocats",
    "title": "Réseau d’Avocats d’Affaires · Contentieux des Affaires & Conseil Stratégique",
    "specialties": [
      "Contentieux des affaires (commercial, civil, litiges d’associés)",
      "Droit des sociétés, M&A & Gouvernance d’entreprise",
      "Concurrence déloyale & Rupture de relations commerciales",
      "Baux commerciaux & Droit immobilier des affaires",
      "Entreprises en difficulté & Procédures collectives",
      "Risques industriels & Responsabilité contractuelle"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@novalians.fr",
    "phone": "+33 (0)4 78 49 74 35",
    "location": "Lyon, 6 Rue de la Bourse, 69001 Lyon",
    "bio": "Novalians est un réseau d’avocats d’affaires et de contentieux de référence en région Auvergne-Rhône-Alpes et sur l’ensemble du territoire français (regroupant notamment Me Bertrand Besnard, Me Jean Koechlin, Me Marie-Agnès Afchain, Me Gregory Vincent). Le cabinet allie conseil stratégique aux chefs d’entreprise, sécurisation des opérations corporate et défense résolue en contentieux et arbitrage.",
    "experienceYears": 22,
    "website": "https://www.novalians.fr/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Barreau de Lyon",
      "Barreau de Grenoble",
      "Réseau d’Avocats d’Affaires Rhône-Alpes",
      "Expertise Contentieux & Droit des Sociétés"
    ],
    "collaboratorsCount": 8
  },
  {
    "id": "sd-law",
    "name": "Cabinet d’avocats SD LAW",
    "title": "Étude d’Avocats à la Cour · Droit des Affaires & Immobilier",
    "specialties": [
      "Droit immobilier & Construction",
      "Droit des sociétés & M&A",
      "Droit du numérique, RGPD & Cyber",
      "Droit pénal des affaires & Faillites",
      "Droit commercial & Contrats",
      "Recouvrement & Contentieux civil"
    ],
    "avatar": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@sdlaw.lu",
    "phone": "+352 22 17 63",
    "location": "Luxembourg, 1, Rue du Saint-Esprit, L-1475 Luxembourg",
    "bio": "Fondé par Maître Saliha DEKHAR, avocat à la Cour inscrite au Barreau de Luxembourg depuis 2009, le Cabinet d’avocats SD LAW conseille et représente une clientèle exigeante d’entreprises, d’investisseurs et de particuliers. Le cabinet intervient avec agilité et rigueur en droit immobilier et de la construction, droit des affaires et des contrats, droit pénal économique, droit du numérique et de la conformité RGPD, ainsi qu’en contentieux et recouvrement de créances.",
    "experienceYears": 16,
    "website": "https://sdlaw.lu/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Barreau de Luxembourg",
      "Avocat à la Cour",
      "Expertise Immobilier & Affaires"
    ],
    "collaboratorsCount": 10
  },
  {
    "id": "brouxel-rabia",
    "name": "Brouxel & Rabia, Lawyers",
    "title": "Cabinet d’Avocats d’Affaires & Fonds d’Investissement",
    "specialties": [
      "Banking & Finance & Capital Markets",
      "Corporate, M&A & Private Equity",
      "Fonds d’investissement & AIFMs",
      "Restructuration & Droit des faillites",
      "Contentieux d’affaires & Arbitrage",
      "Droit fiscal & Structuration",
      "Droit immobilier & Financement"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "welcome@brouxelrabia.lu",
    "phone": "+352 26 20 31 29",
    "location": "Luxembourg, 8, Avenue Marie-Thérèse, L-2132 Luxembourg",
    "bio": "Fondé par François Brouxel et Samia Rabia, Brouxel & Rabia est un cabinet d’avocats d’affaires indépendant de référence à Luxembourg. Le cabinet conseille des institutions financières, des gestionnaires de fonds (AIFMs), des fonds de Private Equity / Venture Capital et des groupes multinationaux sur des opérations financières et corporate complexes. Le cabinet et ses associés fondateurs sont hautement classés par The Legal 500, Chambers & Partners Europe et IFLR1000.",
    "experienceYears": 18,
    "website": "https://brouxelrabia.lu/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "The Legal 500 EMEA",
      "Chambers Europe",
      "IFLR1000 Highly Regarded",
      "Barreau de Luxembourg"
    ],
    "collaboratorsCount": 12
  },
  {
    "id": "ltg-avocats",
    "name": "LTG Affekotengesellschaft (LTG Avocats)",
    "title": "Étude d’Avocats à la Cour · Conseil & Contentieux des Affaires",
    "specialties": [
      "Droit des sociétés & Affaires",
      "Contentieux civil & commercial",
      "Droit bancaire & financier",
      "Droit immobilier & de la construction",
      "Droit du travail & des contrats",
      "Droit pénal des affaires",
      "Droit de la famille & Successions"
    ],
    "avatar": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@ltg-avocats.lu",
    "phone": "+352 26 91 79 22",
    "location": "Luxembourg, 3, Rue de la Loge, L-1945 Luxembourg",
    "bio": "Établie au cœur historique de Luxembourg Ville-Haute, LTG Affekotengesellschaft S.à r.l. (LTG Avocats) est une étude d’avocats à la Cour indépendante alliant rigueur doctrinale, réactivité et approche sur-mesure. Le cabinet assiste les entreprises, institutions financières et particuliers en conseil comme en contentieux complexe (droit des sociétés, droit bancaire, immobilier, droit social, droit des contrats et pénal des affaires).",
    "experienceYears": 15,
    "website": "https://www.ltg-avocats.lu/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Barreau de Luxembourg",
      "Avocat à la Cour",
      "Ville-Haute Luxembourg"
    ],
    "collaboratorsCount": 15
  },
  {
    "id": "brucher-thieltgen",
    "name": "Brucher Thieltgen & Partners",
    "title": "Étude d’Avocats à la Cour · Droit des Affaires & Contentieux",
    "specialties": [
      "Droit bancaire & financier",
      "Contentieux commercial & Arbitrage",
      "Droit des sociétés & M&A",
      "Droit pénal des affaires",
      "Droit social & du travail",
      "Droit immobilier & Urbanisme",
      "Propriété intellectuelle & IT"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "info@brucherlaw.lu",
    "phone": "+352 26 02 71",
    "location": "Luxembourg, 16-18, Boulevard Emmanuel Servais, L-2535 Luxembourg",
    "bio": "Étude d’avocats multidisciplinaire et indépendante établie au Barreau de Luxembourg, Brucher Thieltgen & Partners est particulièrement réputée pour sa pratique d’excellence en contentieux complexe des affaires, droit bancaire et réglementaire, restructuring, droit social et droit pénal économique. Le cabinet et ses associés sont régulièrement distingués comme leaders par The Legal 500 et Chambers & Partners.",
    "experienceYears": 20,
    "website": "https://brucherlaw.lu/en/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "The Legal 500 Leading Firm",
      "Chambers Europe",
      "Legalink Global Network"
    ],
    "collaboratorsCount": 18
  },
  {
    "id": "krieg-stuppia",
    "name": "Krieg & Stuppia",
    "title": "Cabinet d’Avocats à la Cour · Droit Immobilier, Sociétés & Contentieux",
    "specialties": [
      "Droit immobilier, Construction & Copropriété",
      "Droit des sociétés & Droit des affaires",
      "Droit civil, Contrats & Responsabilité",
      "Baux commerciaux & Baux d’habitation",
      "Droit du travail & Droit social",
      "Contentieux civil, commercial & pénal"
    ],
    "avatar": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@krieger-avocats.lu",
    "phone": "+352 26 54 80 1",
    "location": "Luxembourg & Belval, 142, Boulevard du Jazz, L-4370 Belval",
    "bio": "Fondé par Maître Georges Krieger et Maître Fabio Stuppia, avocats à la Cour inscrits au Barreau de Luxembourg, le cabinet Krieg & Stuppia est une référence majeure au Grand-Duché de Luxembourg. Réputé pour sa haute expertise en droit immobilier, baux commerciaux, droit de la construction, droit des sociétés et contentieux d’affaires, le cabinet accompagne particuliers, promoteurs et entreprises avec une rigueur juridique et stratégique d’excellence.",
    "experienceYears": 28,
    "website": "https://www.krieger-avocats.lu/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Barreau de Luxembourg",
      "Référence Droit Immobilier LU",
      "Leaders League Luxembourg"
    ],
    "collaboratorsCount": 20
  },
  {
    "id": "thewes-reuter",
    "name": "Thewes & Reuter, Avocats à la Cour",
    "title": "Étude d’Avocats à la Cour · Contentieux des Affaires & Droit Public",
    "specialties": [
      "Contentieux complexe & Arbitrage",
      "Droit bancaire & Contentieux financier",
      "Droit administratif & Marchés publics",
      "Droit immobilier & Urbanisme",
      "Droit du travail & Droit social",
      "Propriété intellectuelle (IP/IT) & Médias",
      "Droit des sociétés & Commercial"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "info@thewes-reuter.lu",
    "phone": "+352 22 66 22 1",
    "location": "Luxembourg, 13, Breedewee (rue Large), L-1917 Luxembourg",
    "bio": "Fondé par Marc Thewes et Pierre Reuter, Thewes & Reuter est une étude d’avocats à la Cour indépendante de premier ordre à Luxembourg. Le cabinet est particulièrement reconnu pour son expertise de haut niveau en contentieux complexe et transfrontalier, contentieux financier, droit administratif et marchés publics, droit immobilier, droit du travail et propriété intellectuelle. Régulièrement classé et recommandé par Chambers & Partners et The Legal 500.",
    "experienceYears": 28,
    "website": "https://www.thewes-reuter.lu/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Chambers Europe Band Ranked",
      "The Legal 500 Recommended",
      "Barreau de Luxembourg"
    ],
    "collaboratorsCount": 22
  },
  {
    "id": "dsm-avocats",
    "name": "DSM Avocats à la Cour",
    "title": "Cabinet d’Avocats d’Affaires Indépendant",
    "specialties": [
      "Droit des affaires & M&A",
      "Droit immobilier & Construction",
      "Droit fiscal & Contentieux",
      "Droit bancaire & financier",
      "Droit du numérique & RGPD",
      "Droit social & du travail",
      "Contentieux & Arbitrage"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@dsm.legal",
    "phone": "+352 26 25 62 1",
    "location": "Luxembourg, 55A, rue de Merl, L-2146 Luxembourg",
    "bio": "Cabinet d’avocats d’affaires indépendant de référence à Luxembourg, DSM Avocats à la Cour conseille et défend des entreprises nationales et internationales, institutions financières, fonds d’investissement et dirigeants dans tous les domaines clés du droit économique, fiscal, immobilier, bancaire et numérique. Équipe d'excellence multidisciplinaire et multilingue reconnue par Chambers, Legal 500, Leaders League, IFLR1000 et World Tax.",
    "experienceYears": 22,
    "website": "https://www.dsm.legal/fr/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Chambers Europe",
      "The Legal 500",
      "Leaders League",
      "IFLR1000",
      "World Tax"
    ],
    "collaboratorsCount": 25
  },
  {
    "id": "vogel-and-vogel",
    "name": "Vogel & Vogel",
    "title": "Cabinet d’Avocats de Référence · Droit Économique, Concurrence & Distribution",
    "specialties": [
      "Droit de la concurrence (Antitrust, Ententes, Abus de position dominante)",
      "Contrôle des concentrations national & européen",
      "Droit de la distribution, Franchises & Réseaux de vente",
      "Droit de la consommation & Pratiques restrictives de concurrence",
      "Contentieux économique & Régulation sectorielle",
      "Droit européen des affaires"
    ],
    "avatar": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@vogel-vogel.com",
    "phone": "+33 (0)1 53 67 76 20",
    "location": "Paris, 30, Avenue d'Iéna, 75116 Paris",
    "bio": "Fondé par Louis et Joseph Vogel en 1990, Vogel & Vogel est le cabinet leader indépendant en France dédié exclusivement au droit économique, de la concurrence, de la distribution et de la consommation, auteur des traités de référence en la matière.",
    "experienceYears": 35,
    "website": "https://www.vogel-vogel.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe Band 1 (Concurrence/Distribution)",
      "The Legal 500 EMEA Tier 1",
      "Leaders League Incontournable"
    ],
    "collaboratorsCount": 30
  },
  {
    "id": "castegnaro-ius-laboris",
    "name": "Castegnaro, Ius Laboris Luxembourg",
    "title": "Cabinet d’Avocats à la Cour · Droit du Travail & Ressources Humaines",
    "specialties": [
      "Droit du travail individuel & collectif",
      "Contentieux prud’homal & social",
      "Restructurations & Plans de sauvegarde",
      "Droit pénal du travail & Harcèlement",
      "Fiscalité RH & Rémunérations",
      "Protection des données des salariés (RGPD)",
      "Immigration professionnelle & Détachement"
    ],
    "avatar": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@castegnaro.lu",
    "phone": "+352 26 86 82 1",
    "location": "Luxembourg, 67, Rue Ermesinde, L-1469 Luxembourg",
    "bio": "Fondé par Guy Castegnaro, Castegnaro est le cabinet de référence absolue au Luxembourg exclusivement dédié au droit du travail, à la sécurité sociale et à la gestion des ressources humaines. Membre fondateur de l’alliance internationale Ius Laboris présente dans 50 pays, le cabinet est classé Tier 1 / Band 1 sans discontinuer par Chambers & Partners et The Legal 500 pour son conseil stratégique et son accompagnement des employeurs.",
    "experienceYears": 25,
    "website": "https://castegnaro.lu/en/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Chambers Europe Band 1",
      "The Legal 500 Tier 1",
      "Ius Laboris Founding Member",
      "Barreau de Luxembourg"
    ],
    "collaboratorsCount": 32
  },
  {
    "id": "molitor-avocats",
    "name": "MOLITOR Avocats à la Cour",
    "title": "Cabinet d’Avocats d’Affaires Indépendant",
    "specialties": [
      "Droit bancaire & financier",
      "Corporate & M&A",
      "Contentieux & Résolution des litiges",
      "Droit du travail & Pensions",
      "Insolvabilité & Restructuration",
      "Droit immobilier & Construction",
      "IP/IT, Médias & Technologies"
    ],
    "avatar": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@molitorlegal.lu",
    "phone": "+352 29 72 98 1",
    "location": "Luxembourg, 8, rue Sainte-Zithe, L-2763 Luxembourg",
    "bio": "Fondé en 1996 au Barreau de Luxembourg, MOLITOR Avocats à la Cour est un cabinet d’affaires indépendant de premier plan réputé pour son conseil juridique de haute précision. Reconnu pour son expertise majeure en contentieux complexe, droit bancaire et financier, restructurations transfrontalières, droit social et IP/IT, le cabinet est régulièrement distingué aux plus hauts rangs par Chambers & Partners et The Legal 500 EMEA.",
    "experienceYears": 29,
    "website": "https://molitorlegal.lu/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Chambers Europe Top Ranked",
      "The Legal 500 EMEA",
      "Interlaw Global Elite",
      "Leaders League"
    ],
    "collaboratorsCount": 35
  },
  {
    "id": "chammas-and-marcheteau",
    "name": "Chammas & Marcheteau",
    "title": "Cabinet d’Avocats d’Affaires Indépendant · Spécialiste Tech, VC & Private Equity",
    "specialties": [
      "Private Equity & Venture Capital",
      "Fusions-Acquisitions (M&A) & Joint-ventures",
      "Création & Structuration de fonds d’investissement",
      "Droit fiscal des transactions & Management packages",
      "Propriété intellectuelle, Tech & Données personnelles",
      "Droit social & Épargne salariale"
    ],
    "avatar": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@cmd-avocats.com",
    "phone": "+33 (0)1 53 42 42 50",
    "location": "Paris, 64, Avenue Kléber, 75116 Paris",
    "bio": "Chammas & Marcheteau est un cabinet d’avocats de référence dédié au Private Equity, au Venture Capital et à l’écosystème Tech / Innovation. Il conseille fonds d’investissement, entrepreneurs et grands groupes sur leurs financements et opérations de croissance.",
    "experienceYears": 18,
    "website": "https://www.chammasmarcheteau.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Leaders League Incontournable (Venture Capital & Fonds)",
      "The Legal 500 EMEA",
      "Chambers Europe"
    ],
    "collaboratorsCount": 40
  },
  {
    "id": "dentons-luxembourg",
    "name": "Dentons Luxembourg",
    "title": "Cabinet d’Avocats d’Affaires International · Real Estate, Banking & Finance, Tax, Funds & M&A",
    "specialties": [
      "Droit Immobilier & Financement immobilier (Tier 1)",
      "Banque, Finance & Marchés de capitaux",
      "Fiscalité des entreprises & Structuration internationale",
      "Fonds d’investissement & Gestion d’actifs (AIF, Private Equity)",
      "Fusions-Acquisitions (M&A) & Droit des sociétés",
      "Restructuration & Procédures d’insolvabilité",
      "Contentieux commercial, Arbitrage & Droit du travail"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "luxembourg@dentons.com",
    "phone": "+352 46 83 83",
    "location": "Luxembourg, Atrium Vitrum Building, 33, Rue du Puits Romain, L-8070 Bertrange (Luxembourg)",
    "bio": "Implanté au cœur de la place financière luxembourgeoise au sein du complexe Atrium Vitrum à Bertrange, Dentons Luxembourg (dirigé par Me Martine Gerber-Lemaire) offre des services juridiques et fiscaux de premier plan. Reconnue Tier 1 en droit immobilier et financement, l’équipe accompagne fonds d’investissement, institutions bancaires, foncières et multinationales dans la structuration de leurs véhicules d’investissement, opérations transfrontalières de M&A et contentieux stratégiques.",
    "experienceYears": 25,
    "website": "https://www.dentons.com/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Barreau de Luxembourg",
      "The Legal 500 EMEA (Tier 1 Real Estate)",
      "Chambers Europe (Band 1 Real Estate / Star Individual)",
      "IFLR1000 Top Tier & Highly Recommended",
      "Leaders League Luxembourg"
    ],
    "collaboratorsCount": 45
  },
  {
    "id": "hughes-hubbard-paris",
    "name": "Hughes Hubbard Paris",
    "title": "Cabinet d’Avocats Franco-Américain · Arbitrage & Contentieux International",
    "specialties": [
      "Arbitrage international & Résolution des litiges",
      "Conformité, Anti-corruption & Enquêtes (FCPA/Sapin II)",
      "Corporate, M&A & Private Equity",
      "Droit aérien & Financement aéronautique",
      "Droit du travail & Restructurations",
      "Droit fiscal des affaires"
    ],
    "avatar": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@hugheshubbard.com",
    "phone": "+33 (0)1 44 21 80 00",
    "location": "Paris, 8, Rue de Presbourg, 75116 Paris",
    "bio": "Fondé en 1966, le bureau parisien de Hughes Hubbard & Reed est une référence mondiale en arbitrage international et en conformité / enquêtes internes (Sapin II, DOJ, Banque Mondiale). Il dispose également d'une expertise reconnue en financement aéronautique.",
    "experienceYears": 58,
    "website": "https://www.hugheshubbard.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "GAR 30 Leading Arbitration Firm",
      "The Legal 500 Tier 1",
      "Chambers Global"
    ],
    "collaboratorsCount": 48
  },
  {
    "id": "foley-hoag-france",
    "name": "Foley Hoag France",
    "title": "Cabinet d’Avocats International · Droit International Public & Arbitrage",
    "specialties": [
      "Droit international public & Contentieux interétatiques (CIJ, TIDM)",
      "Arbitrage d’investissement (CIRDI, CNUDCI)",
      "Contentieux commercial international",
      "Énergie, Ressources naturelles & Environnement",
      "Corporate, M&A & Private Equity",
      "Conformité internationale & Sanctions économiques"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@foleyhoag.com",
    "phone": "+33 (0)1 70 36 61 30",
    "location": "Paris, 153, Rue du Faubourg Saint-Honoré, 75008 Paris",
    "bio": "Foley Hoag Paris est mondialement réputé pour sa pratique hors pair en droit international public et arbitrage d'investissement, représentant des États souverains et institutions devant la Cour internationale de justice et les tribunaux d'arbitrage internationaux.",
    "experienceYears": 20,
    "website": "https://foleyhoag.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Global Band 1 (Public International Law)",
      "The Legal 500 Tier 1",
      "GAR 100 Leading Arbitration Firm"
    ],
    "collaboratorsCount": 50
  },
  {
    "id": "castaldipartners",
    "name": "CastaldiPartners",
    "title": "Cabinet d’Avocats d’Affaires Européen · Leader Franco-Italien",
    "specialties": [
      "Corporate / M&A & Joint-ventures transfrontalières",
      "Contentieux international & Arbitrage",
      "Droit immobilier d’entreprise & Retail",
      "Droit du travail & Relations sociales",
      "Restructuration & Entreprises en difficulté",
      "Propriété intellectuelle & Droit des marques de luxe"
    ],
    "avatar": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@castaldipartners.com",
    "phone": "+33 (0)1 44 94 95 00",
    "location": "Paris, 24, Rue Cambacérès, 75008 Paris",
    "bio": "CastaldiPartners est le cabinet d'avocats d'affaires de référence pour les relations économiques franco-italiennes et transfrontalières européennes. Présent à Paris, Milan, Bruxelles et Londres, il accompagne les grands groupes industriels, financiers et les maisons de luxe.",
    "experienceYears": 28,
    "website": "https://www.castaldipartners.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Leaders League Excellent",
      "Legalcommunity Awards",
      "Chambers Europe"
    ],
    "collaboratorsCount": 55
  },
  {
    "id": "debevoise-and-plimpton-paris",
    "name": "Debevoise & Plimpton Paris",
    "title": "Cabinet d’Avocats International d’Élite · Arbitrage & Private Equity",
    "specialties": [
      "Arbitrage international & Contentieux transfrontalier",
      "Private Equity & Fusions-Acquisitions",
      "Assurance & Réglementation financière",
      "Enquêtes internes, Anti-corruption & Compliance",
      "Droit fiscal international & Droit économique"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@debevoise.com",
    "phone": "+33 (0)1 40 73 12 12",
    "location": "Paris, 4, Place de l'Opéra, 75002 Paris",
    "bio": "Installé place de l'Opéra depuis 1964, le bureau de Paris de Debevoise & Plimpton abrite l'une des pratiques d'arbitrage international les plus prestigieuses et reconnues au monde, ainsi qu'un pôle d'excellence en fusions-acquisitions et fonds de private equity.",
    "experienceYears": 60,
    "website": "https://www.debevoise.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Global Band 1 (International Arbitration)",
      "The Legal 500 Tier 1",
      "GAR 30 Top Arbitration Practice"
    ],
    "collaboratorsCount": 60
  },
  {
    "id": "skadden-paris",
    "name": "Skadden Paris",
    "title": "Cabinet d’Avocats d’Affaires International de Premier Rang · M&A & Arbitrage",
    "specialties": [
      "Fusions-Acquisitions stratégiques & Private Equity",
      "Marchés de capitaux internationaux & Bourse",
      "Arbitrage international & Litiges transfrontaliers",
      "Droit fiscal international & Structuration",
      "Enquêtes réglementaires & Droit pénal des affaires",
      "Restructuration & Situations spéciales"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris.office@skadden.com",
    "phone": "+33 (0)1 55 27 11 00",
    "location": "Paris, 68, Rue du Faubourg Saint-Honoré, 75008 Paris",
    "bio": "Skadden, Arps, Slate, Meagher & Flom LLP est l'un des cabinets d'avocats les plus puissants au monde. À Paris, ses équipes interviennent sur les fusions-acquisitions transnationales les plus complexes, les arbitrages internationaux majeurs et les dossiers de gouvernance stratégique.",
    "experienceYears": 35,
    "website": "https://www.skadden.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Global & Europe Band 1",
      "The Legal 500 EMEA Tier 1",
      "BTI Client Service All-Star"
    ],
    "collaboratorsCount": 65
  },
  {
    "id": "franklin-avocats",
    "name": "Franklin",
    "title": "Cabinet d’Avocats d’Affaires Indépendant · Conseil Stratégique M&A & Fiscal",
    "specialties": [
      "Corporate Finance, M&A & Private Equity",
      "Droit fiscal des affaires, Fiscalité patrimoniale & Contentieux",
      "Droit immobilier, Urbanisme & Financement foncier",
      "Droit social, Mobilité internationale & Relations collectives",
      "Contentieux des affaires, Pénal des affaires & Arbitrage",
      "Droit de la concurrence & Distribution",
      "TMT, Données personnelles & Cybersécurité"
    ],
    "avatar": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@franklin-paris.com",
    "phone": "+33 (0)1 45 02 79 00",
    "location": "Paris, 26, Avenue Kléber, 75116 Paris",
    "bio": "Fondé en 2000, Franklin est un cabinet d’avocats d’affaires parisien d’excellence regroupant une centaine d’avocats reconnus. Il accompagne des groupes industriels, banques d’affaires, fonds de private equity et entrepreneurs dans la conception et l’exécution de leurs opérations stratégiques à forte valeur ajoutée en France et à l’international.",
    "experienceYears": 25,
    "website": "https://www.franklin-paris.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "The Legal 500 Recommended Firm",
      "Chambers Europe Ranked",
      "Leaders League Incontournable",
      "Best Lawyers"
    ],
    "collaboratorsCount": 75
  },
  {
    "id": "cleary-gottlieb-paris",
    "name": "Cleary Gottlieb Paris",
    "title": "Cabinet d’Avocats d’Affaires International Historique · M&A & Concurrence",
    "specialties": [
      "Fusions-Acquisitions d’envergure & OPA",
      "Droit de la concurrence & Aides d’État",
      "Marchés de capitaux & Financements souverains",
      "Contentieux d’affaires & Arbitrage international",
      "Droit fiscal transactionnel",
      "Restructurations financières complexes"
    ],
    "avatar": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "parisoffice@cgsh.com",
    "phone": "+33 (0)1 40 74 68 00",
    "location": "Paris, 12, Rue de Tilsitt, 75008 Paris",
    "bio": "Premier cabinet américain ouvert à Paris en 1949, Cleary Gottlieb Steen & Hamilton est une institution historique du droit des affaires en France. Ses avocats conseillent les grandes entreprises du CAC 40, les gouvernements et institutions sur les dossiers les plus emblématiques.",
    "experienceYears": 75,
    "website": "https://www.clearygottlieb.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe & Global Band 1",
      "The Legal 500 Tier 1",
      "IFLR1000 Top Tier Firm"
    ],
    "collaboratorsCount": 80
  },
  {
    "id": "paul-hastings-paris",
    "name": "Paul Hastings Paris",
    "title": "Cabinet d’Avocats d’Affaires International · Private Equity & Financement LBO",
    "specialties": [
      "Private Equity, M&A & Fonds d’investissement",
      "Financements à effet de levier (LBO) & Dettes privées",
      "Restructuration financière & Distressed M&A",
      "Contentieux commercial, White Collar & Compliance",
      "Droit fiscal transactionnel",
      "Droit social & Restructurations d’entreprises"
    ],
    "avatar": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "parisinquiries@paulhastings.com",
    "phone": "+33 (0)1 42 99 04 50",
    "location": "Paris, 32, Rue de Monceau, 75008 Paris",
    "bio": "Paul Hastings à Paris est reconnu comme l'un des leaders de marché en Private Equity, financement de LBO et restructuration de dettes. Ses équipes conseillent les sponsors financiers majeurs, fonds de dette et entreprises de premier rang sur leurs opérations stratégiques.",
    "experienceYears": 20,
    "website": "https://www.paulhastings.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe Band 1 (Private Equity & Financement LBO)",
      "The Legal 500 EMEA Tier 1",
      "Leaders League Incontournable"
    ],
    "collaboratorsCount": 85
  },
  {
    "id": "dechert-france",
    "name": "Dechert France",
    "title": "Cabinet d’Avocats d’Affaires International · Spécialiste Funds & Life Sciences",
    "specialties": [
      "Fonds d’investissement & Asset Management",
      "Private Equity, Corporate & M&A",
      "Sciences de la vie, Santé & Biotechnologies",
      "Financement & Droit bancaire",
      "Contentieux d’affaires & Arbitrage commercial",
      "Droit fiscal & Droit social"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris.office@dechert.com",
    "phone": "+33 (0)1 53 65 05 00",
    "location": "Paris, 32, Rue de Monceau, 75008 Paris",
    "bio": "Présent à Paris depuis 1995, Dechert est réputé pour son savoir-faire dans les services financiers, la structuration de fonds de private equity et de dette, ainsi que pour son leadership mondial dans le secteur des sciences de la vie et des biotechnologies.",
    "experienceYears": 30,
    "website": "https://www.dechert.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe & Global",
      "The Legal 500 EMEA Tier 1",
      "Leaders League Incontournable"
    ],
    "collaboratorsCount": 90
  },
  {
    "id": "bignon-lebray",
    "name": "Bignon Lebray",
    "title": "Cabinet d’Avocats d’Affaires Indépendant · Ancrage National & International",
    "specialties": [
      "Droit des sociétés, Fusions & Acquisitions",
      "Droit fiscal & Gestion patrimoniale",
      "Droit social & Ressources humaines",
      "Droit public, Immobilier & Environnement",
      "Propriété intellectuelle, Nouvelles technologies & IA",
      "Contentieux & Arbitrage"
    ],
    "avatar": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@bignonlebray.com",
    "phone": "+33 (0)1 44 17 17 44",
    "location": "Paris, 75, Rue de Tocqueville, 75017 Paris (Bureaux à Lille, Lyon, Aix, Paris)",
    "bio": "Depuis plus de 40 ans, Bignon Lebray accompagne les entreprises privées et publiques, PME et groupes internationaux dans tous les domaines du droit des affaires, fort de plus de 100 avocats répartis à Paris, Lille, Lyon, Aix-en-Provence et Paris.",
    "experienceYears": 42,
    "website": "https://www.bignonlebray.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Leaders League Excellent",
      "Palmarès du Droit Le Monde du Droit",
      "The Legal 500"
    ],
    "collaboratorsCount": 100
  },
  {
    "id": "mayer-brown-paris",
    "name": "Mayer Brown Paris",
    "title": "Cabinet d’Avocats d’Affaires International · Élite Fiscale & Financements",
    "specialties": [
      "Droit fiscal français & international (M&A Tax, Prix de transfert)",
      "Corporate / M&A & Private Equity",
      "Droit bancaire, Financement structuré & Titrisation",
      "Contentieux d’affaires, Compliance & Enquêtes",
      "Restructuration & Entreprises en difficulté",
      "Droit social stratégique"
    ],
    "avatar": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@mayerbrown.com",
    "phone": "+33 (0)1 53 53 43 43",
    "location": "Paris, 10, Avenue Hoche, 75008 Paris",
    "bio": "Le bureau parisien de Mayer Brown réunit près de 100 avocats de très haut niveau, réputés pour leur excellence dans le conseil fiscal aux multinationales et institutions financières, le Private Equity, les financements d'actifs et les contentieux complexes.",
    "experienceYears": 45,
    "website": "https://www.mayerbrown.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe & Global Band 1 (Droit Fiscal)",
      "The Legal 500 EMEA Tier 1",
      "Leaders League Incontournable"
    ],
    "collaboratorsCount": 105
  },
  {
    "id": "delsol-avocats",
    "name": "Delsol Avocats",
    "title": "Cabinet d’Avocats d’Affaires Pluridisciplinaire · Paris & Lyon",
    "specialties": [
      "Fusions-Acquisitions, Private Equity & Droit des sociétés",
      "Droit fiscal, Fiscalité patrimoniale & Contentieux",
      "Droit social & Protection sociale",
      "Organisations non lucratives (Fondations, Fonds de dotation, ESS)",
      "Droit immobilier & Construction",
      "Sciences de la vie, Santé & Technologies"
    ],
    "avatar": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@delsolavocats.com",
    "phone": "+33 (0)1 53 70 74 74",
    "location": "Paris, 4 bis, Rue de la Baume, 75008 Paris (& 12 Quai André Lassagne, 69001 Lyon)",
    "bio": "Avec plus de 130 avocats et juristes à Paris et Lyon, Delsol Avocats est un cabinet indépendant de référence offrant une expertise transversale en droit des affaires et une pratique leader incontestée dans le secteur des fondations, associations et de l'ESS.",
    "experienceYears": 35,
    "website": "https://www.delsolavocats.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Leaders League Incontournable (Organisations non lucratives)",
      "The Legal 500 EMEA",
      "Palmarès du Droit"
    ],
    "collaboratorsCount": 125
  },
  {
    "id": "dentons-france",
    "name": "Dentons France",
    "title": "Cabinet d’Avocats Mondial Polycentrique · Bureau de Paris",
    "specialties": [
      "Corporate / M&A & Private Equity",
      "Immobilier & Financement immobilier d’envergure",
      "Droit public des affaires, Énergie & Environnement",
      "Banque, Finance & Restructuring",
      "Contentieux des affaires & Arbitrage",
      "Droit fiscal & Douanes"
    ],
    "avatar": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris.office@dentons.com",
    "phone": "+33 (0)1 53 67 40 00",
    "location": "Paris, 5, Boulevard Malesherbes, 75008 Paris",
    "bio": "Premier cabinet mondial par le nombre d'avocats, le bureau de Paris de Dentons rassemble plus de 120 avocats offrant une expertise pluridisciplinaire en droit des affaires, réputé pour sa capacité d'intervention cross-border et son pôle immobilier de référence.",
    "experienceYears": 40,
    "website": "https://www.dentons.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe & Global",
      "The Legal 500 Tier 1",
      "Acritas Global Elite Law Firm"
    ],
    "collaboratorsCount": 130
  },
  {
    "id": "ao-shearman-luxembourg",
    "name": "A&O Shearman Luxembourg",
    "title": "Cabinet d’Avocats d’Affaires International · Banque, Fonds, M&A & Fiscalité",
    "specialties": [
      "Banking & Finance (Financements bancaires et structurés)",
      "Fonds d’investissement & Gestion d’actifs (UCITS, AIF, Private Equity)",
      "Corporate / M&A & Joint-Ventures transfrontalières",
      "Marchés de capitaux (Debt & Equity Capital Markets)",
      "Droit fiscal luxembourgeois & international",
      "Contentieux d’affaires, Arbitrage & Restructurations",
      "Droit des assurances & Régulation financière"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "infoluxembourg@aoshearman.com",
    "phone": "+352 44 44 55 1",
    "location": "Luxembourg (Kirchberg), 5, Avenue John F. Kennedy, L-1855 Luxembourg",
    "bio": "Né de la fusion historique entre Allen & Overy et Shearman & Sterling, A&O Shearman est un géant mondial du droit des affaires. Établi au Luxembourg depuis plus de 35 ans (Kirchberg), le bureau réunit plus de 140 avocats et 20 associés de premier plan, offrant une expertise institutionnelle de référence en fonds d’investissement, droit bancaire et financier, fusions-acquisitions et fiscalité complexe.",
    "experienceYears": 35,
    "website": "https://www.aoshearman.com/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Barreau de Luxembourg",
      "Chambers Global & Europe (Band 1)",
      "The Legal 500 EMEA (Tier 1)",
      "IFLR1000 (Top Tier)",
      "Leaders League"
    ],
    "collaboratorsCount": 140
  },
  {
    "id": "arsene-taxand",
    "name": "Arsene Taxand",
    "title": "Cabinet d’Avocats d’Affaires Leader Exclusif en Droit Fiscal",
    "specialties": [
      "Fiscalité des entreprises & Corporate Tax",
      "Fiscalité M&A, LBO & Private Equity",
      "Prix de transfert & Fiscalité internationale",
      "Contrôles, Pré-contentieux & Contentieux fiscaux",
      "Fiscalité patrimoniale & Management packages",
      "Fiscalité immobilière & Financements d’actifs",
      "TVA, Droits de douane & Fiscalité indirecte"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@arsene-taxand.com",
    "phone": "+33 (0)1 70 38 88 00",
    "location": "Paris, 32, Rue de Monceau, 75008 Paris",
    "bio": "Créé en 2004, Arsene Taxand est le cabinet d’avocats d’affaires leader en France entièrement et exclusivement dédié au conseil et au contentieux fiscal. Membre fondateur du réseau mondial Taxand présent dans 50 pays, Arsene compte plus de 160 fiscalistes dont 30 associés, accompagnant grands groupes du CAC 40 / SBF 120, ETI et fonds d’investissement sur leurs enjeux fiscaux cruciaux.",
    "experienceYears": 21,
    "website": "https://www.arsene-taxand.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe Band 1 (Tax)",
      "The Legal 500 Tier 1 (Tax)",
      "World Tax Tier 1 Leading Firm",
      "Leaders League Incontournable"
    ],
    "collaboratorsCount": 145
  },
  {
    "id": "jeantet",
    "name": "Jeantet",
    "title": "Cabinet d’Avocats d’Affaires Historique · Conseil & Contentieux Européen",
    "specialties": [
      "Fusions-Acquisitions, Private Equity & Bourse",
      "Banque, Finance & Financements structurés",
      "Contentieux des affaires & Arbitrage international",
      "Droit de la concurrence & Aides d’État",
      "Droit fiscal & Douanes",
      "Droit social & Relations sociales",
      "Énergie, Mines, Environnement & Infrastructures",
      "Droit immobilier & Baux commerciaux"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "info@jeantet.fr",
    "phone": "+33 (0)1 45 05 80 08",
    "location": "Paris, 11, Rue Galilée, 75116 Paris",
    "bio": "Fondé en 1924, Jeantet compte parmi les institutions pionnières du barreau des affaires à Paris. Fort de 150 avocats déployés en France et dans plusieurs hubs européens, Jeantet s’illustre par sa maîtrise des opérations corporate transfrontalières, des régulations de marchés, des projets énergétiques et des litiges commerciaux complexes.",
    "experienceYears": 101,
    "website": "https://www.jeantet.fr/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "The Legal 500 EMEA Recommended",
      "Chambers Europe",
      "Leaders League Incontournable",
      "IFLR1000 Leading Firm"
    ],
    "collaboratorsCount": 150
  },
  {
    "id": "hogan-lovells-france",
    "name": "Hogan Lovells France",
    "title": "Cabinet d’Avocats d’Affaires Mondial · Conseil Stratégique & Contentieux",
    "specialties": [
      "Corporate / M&A & Private Equity",
      "Propriété intellectuelle, Médias & Technologies",
      "Droit bancaire & Financement de projets",
      "Santé, Pharma & Sciences de la vie",
      "Contentieux commercial & Arbitrage",
      "Droit fiscal & Droit social"
    ],
    "avatar": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris.reception@hoganlovells.com",
    "phone": "+33 (0)1 53 67 47 47",
    "location": "Paris, 17, Avenue Matignon, 75008 Paris",
    "bio": "Avec plus de 150 avocats au bureau de Paris, Hogan Lovells allie une force de frappe globale à un ancrage profond dans l'écosystème d'affaires français, particulièrement reconnu en propriété intellectuelle, santé, corporate et contentieux complexes.",
    "experienceYears": 45,
    "website": "https://www.hoganlovells.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe Top Ranked",
      "The Legal 500 EMEA Tier 1",
      "Leaders League Incontournable"
    ],
    "collaboratorsCount": 155
  },
  {
    "id": "august-debouzy",
    "name": "August Debouzy",
    "title": "Cabinet d’Avocats d’Affaires · Innovation Juridique & Stratégie",
    "specialties": [
      "Droit social & Ressources humaines d’excellence",
      "Corporate, M&A & Private Equity",
      "Contentieux, Arbitrage & Droit pénal des affaires",
      "Propriété intellectuelle, Brevets & Technologies",
      "Données personnelles, IA & Cybersécurité",
      "Droit fiscal des entreprises & Dirigeants",
      "Droit public des affaires & Réglementation"
    ],
    "avatar": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@august-debouzy.com",
    "phone": "+33 (0)1 45 61 51 80",
    "location": "Paris, 6-8, Avenue de Messine, 75008 Paris",
    "bio": "Créé en 1995 par Gilles August et Olivier Debouzy, August Debouzy rassemble 160 avocats dont 35 associés. Réputé pour son audace stratégique, son excellence doctrinale et son agilité opérationnelle, le cabinet accompagne les grandes entreprises, licornes de la tech et institutions publiques sur les dossiers les plus complexes en droit social, M&A, contentieux et nouvelles technologies.",
    "experienceYears": 30,
    "website": "https://www.august-debouzy.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Cabinet d’Avocats de l’Année (Palmarès du Droit)",
      "The Legal 500 EMEA Tier 1",
      "Chambers Europe",
      "Leaders League"
    ],
    "collaboratorsCount": 160
  },
  {
    "id": "uggc-avocats",
    "name": "UGGC Avocats",
    "title": "Cabinet d’Avocats d’Affaires Indépendant · Droit Public & Privé des Affaires",
    "specialties": [
      "Droit public des affaires & Commande publique",
      "Corporate, M&A & Private Equity",
      "Contentieux commercial, Civil & Arbitrage",
      "Droit social & Restructurations",
      "Propriété intellectuelle, Numérique, IA & Santé",
      "Droit fiscal & Contentieux fiscal",
      "Droit économique, Concurrence & Distribution",
      "Droit immobilier & Construction"
    ],
    "avatar": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@uggc.com",
    "phone": "+33 (0)1 56 69 70 00",
    "location": "Paris, 47, Rue de Monceau, 75008 Paris",
    "bio": "Créé en 1993, UGGC Avocats est l’un des tout premiers cabinets indépendants français en droit public des affaires et en droit des affaires général. Avec plus de 170 professionnels répartis sur 4 continents (Europe, Asie, Amériques, Afrique), le cabinet intervient avec une haute technicité auprès d’entités publiques, d’investisseurs et de multinationales.",
    "experienceYears": 32,
    "website": "https://www.uggc.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "The Legal 500 Tier 1 (Droit Public & Réglementation)",
      "Chambers Europe Band Ranked",
      "Leaders League Décideurs",
      "Palmarès du Droit"
    ],
    "collaboratorsCount": 170
  },
  {
    "id": "norton-rose-fulbright-france",
    "name": "Norton Rose Fulbright France",
    "title": "Cabinet d’Avocats d’Affaires Mondial · Énergie, Transports & Financements",
    "specialties": [
      "Financement de projets & Énergie / Infrastructures",
      "Droit bancaire & Marchés de capitaux",
      "Transports, Aviation & Droit maritime",
      "Corporate / M&A & Joint-ventures",
      "Contentieux d’affaires & Compliance internationale",
      "Assurance & Risques industriels"
    ],
    "avatar": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris.info@nortonrosefulbright.com",
    "phone": "+33 (0)1 44 71 80 00",
    "location": "Paris, 25, Rue de Liège, 75009 Paris",
    "bio": "Norton Rose Fulbright dispose à Paris d'un pôle d'excellence historique en financement d'infrastructures, énergie, transports et droit bancaire, accompagnant les institutions financières et groupes industriels sur leurs opérations stratégiques.",
    "experienceYears": 35,
    "website": "https://www.nortonrosefulbright.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Global & Europe",
      "The Legal 500 EMEA Tier 1",
      "IJGlobal Global Legal Adviser of the Year"
    ],
    "collaboratorsCount": 175
  },
  {
    "id": "dla-piper-france",
    "name": "DLA Piper France",
    "title": "Cabinet d’Avocats d’Affaires Global · Présence Mondiale & Bureau Parisien",
    "specialties": [
      "Corporate, Fusions & Acquisitions & Private Equity",
      "Financement, Banque & Réglementation financière",
      "Contentieux commercial, Arbitrage & Enquêtes réglementaires",
      "Droit social & Restructurations d’envergure",
      "Propriété intellectuelle, Technologies & IA",
      "Droit fiscal français & international",
      "Immobilier d’entreprise & Financement de projets",
      "Droit de la concurrence & Affaires européennes"
    ],
    "avatar": "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contactfrance@dlapiper.com",
    "phone": "+33 (0)1 40 15 24 00",
    "location": "Paris, 27, Rue Laffitte, 75009 Paris",
    "bio": "DLA Piper est un cabinet d’avocats d’affaires mondial présent dans plus de 40 pays. Son bureau de Paris, composé de plus de 180 avocats dont près de 50 associés, conseille des entreprises leaders, institutions financières et gouvernements sur leurs transactions transfrontalières, litiges complexes et projets d’innovation technologique.",
    "experienceYears": 40,
    "website": "https://www.dlapiper.com/fr-fr/offices/france/paris",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Global & Europe Top Ranked",
      "The Legal 500 EMEA Tier 1",
      "IFLR1000 Leading Firm",
      "Leaders League Incontournable"
    ],
    "collaboratorsCount": 180
  },
  {
    "id": "white-and-case-france",
    "name": "White & Case France",
    "title": "Cabinet d’Avocats d’Affaires International de Premier Rang",
    "specialties": [
      "M&A, Private Equity & Marchés financiers",
      "Financement de projets, Énergie & Infrastructures",
      "Dette souveraine & Financements bancaires structurés",
      "Arbitrage international & Contentieux d’affaires",
      "Restructuring & Entreprises en difficulté",
      "Droit de la concurrence & Droit fiscal"
    ],
    "avatar": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@whitecase.com",
    "phone": "+33 (0)1 55 04 15 15",
    "location": "Paris, 19, Place Vendôme, 75001 Paris",
    "bio": "Implanté depuis 1926 place Vendôme à Paris, White & Case est l'un des cabinets américains les plus anciens et prestigieux en France. Ses équipes conseillent les plus grands groupes mondiaux dans leurs transactions transfrontalières, arbitrages et restructurations.",
    "experienceYears": 99,
    "website": "https://www.whitecase.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe Band 1",
      "The Legal 500 Tier 1",
      "GAR 30 Top International Arbitration Firm"
    ],
    "collaboratorsCount": 190
  },
  {
    "id": "ao-shearman-paris",
    "name": "A&O Shearman Paris",
    "title": "Cabinet d’Avocats d’Affaires International · M&A, Financement, Marchés & Contentieux",
    "specialties": [
      "Fusions-Acquisitions (M&A) & Private Equity",
      "Financement bancaire, Financement de projets & Énergie",
      "Marchés de capitaux (Actions, Dette & Produits dérivés)",
      "Contentieux commercial & Arbitrage international",
      "Droit fiscal des affaires & Structuration transfrontalière",
      "Restructuration d’entreprises & Procédures collectives",
      "Droit social, Propriété intellectuelle & Conformité / Compliance"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "info-paris@aoshearman.com",
    "phone": "+33 (0)1 40 06 54 00",
    "location": "Paris, 32, Rue François 1er, 75008 Paris",
    "bio": "Au cœur du 8e arrondissement de Paris, A&O Shearman réunit l’excellence combinée d’Allen & Overy et Shearman & Sterling. Le bureau parisien accompagne multinationales, fonds d’investissement, institutions financières et gouvernements sur les transactions transfrontalières stratégiques, les arbitrages internationaux et les dossiers réglementaires complexes.",
    "experienceYears": 40,
    "website": "https://www.aoshearman.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Barreau de Paris",
      "Chambers Europe (Band 1)",
      "The Legal 500 EMEA (Tier 1)",
      "GCR Global Elite",
      "IFLR1000 Top Tier"
    ],
    "collaboratorsCount": 195
  },
  {
    "id": "clifford-chance-france",
    "name": "Clifford Chance France",
    "title": "Cabinet d’Avocats d’Affaires International · Magic Circle",
    "specialties": [
      "Corporate / M&A & Private Equity",
      "Droit bancaire & Financements structurés",
      "Marchés de capitaux & Titrisation",
      "Contentieux commercial & Arbitrage international",
      "Droit fiscal français & international",
      "Droit de la concurrence & Antitrust",
      "Restructuration & Entreprises en difficulté"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris.contact@cliffordchance.com",
    "phone": "+33 (0)1 44 05 52 52",
    "location": "Paris, 1, Rue d'Astorg, 75008 Paris",
    "bio": "Membre du prestigieux Magic Circle, le bureau parisien de Clifford Chance compte près de 200 avocats spécialisés dans les opérations transfrontalières les plus sophistiquées, le financement structuré, les fusions-acquisitions et le contentieux stratégique.",
    "experienceYears": 60,
    "website": "https://www.cliffordchance.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe Band 1",
      "The Legal 500 EMEA Tier 1",
      "IFLR1000 Top Tier"
    ],
    "collaboratorsCount": 200
  },
  {
    "id": "bredin-prat",
    "name": "Bredin Prat",
    "title": "Cabinet d’Avocats d’Affaires Leader · Corporate, M&A & Contentieux",
    "specialties": [
      "Corporate, M&A & Private Equity",
      "Contentieux commercial & Arbitrage international",
      "Droit fiscal & Structuration d’opérations",
      "Droit de la concurrence & Droit européen",
      "Droit social & Gouvernance",
      "Financement & Marchés de capitaux",
      "Restructuration & Entreprises en difficulté"
    ],
    "avatar": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@bredinprat.com",
    "phone": "+33 (0)1 44 35 35 35",
    "location": "Paris, 53, Quai d'Orsay, 75007 Paris",
    "bio": "Fondé en 1966, Bredin Prat est l’un des cabinets d’avocats d’affaires les plus prestigieux et reconnus d’Europe. Comptant près de 200 avocats dont plus de 50 associés, le cabinet conseille des multinationales, institutions financières et fonds d’investissement dans leurs opérations stratégiques de haut de bilan (M&A, OPA, private equity) et dans leurs contentieux et arbitrages les plus sensibles.",
    "experienceYears": 59,
    "website": "https://www.bredinprat.fr/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe (Band 1 M&A / Contentieux)",
      "The Legal 500 (Tier 1)",
      "Leaders League Incontournable",
      "IFLR1000 Tier 1"
    ],
    "collaboratorsCount": 210
  },
  {
    "id": "freshfields-paris",
    "name": "Freshfields Paris",
    "title": "Cabinet d’Avocats d’Affaires International · Magic Circle",
    "specialties": [
      "Corporate / M&A & Gouvernance de sociétés cotées",
      "Arbitrage international & Contentieux complexe",
      "Droit de la concurrence & Contrôle des concentrations",
      "Droit fiscal international & Structurations",
      "Banque, Finance & Marchés de capitaux",
      "Droit social stratégique & Restructurations"
    ],
    "avatar": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@freshfields.com",
    "phone": "+33 (0)1 44 56 44 56",
    "location": "Paris, 9, Avenue de Messine, 75008 Paris",
    "bio": "Freshfields Bruckhaus Deringer Paris réunit une élite d'avocats réputés pour la gestion des crises majeures, des enquêtes internationales, des opérations de fusions-acquisitions transfrontalières et des litiges à très forts enjeux.",
    "experienceYears": 50,
    "website": "https://www.freshfields.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Global & Europe Band 1",
      "The Legal 500 Tier 1",
      "Global Arbitration Review GAR 100"
    ],
    "collaboratorsCount": 215
  },
  {
    "id": "latham-and-watkins-paris",
    "name": "Latham & Watkins Paris",
    "title": "Cabinet d’Avocats d’Affaires International · Élite M&A & Private Equity",
    "specialties": [
      "Fusions-Acquisitions & Private Equity",
      "Marchés de capitaux (Equity & Debt)",
      "Financements structurés & Financements LBO",
      "Contentieux des affaires & White Collar Crime",
      "Droit fiscal transactionnel",
      "Restructuration & Entreprises en difficulté"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris.reception@lw.com",
    "phone": "+33 (0)1 40 62 20 00",
    "location": "Paris, 45, Rue Saint-Dominique, 75007 Paris",
    "bio": "Latham & Watkins Paris figure parmi les leaders incontestés des fusions-acquisitions, du private equity et des marchés de capitaux en France. Ses associés interviennent sur les plus importantes transactions financières et opérations de LBO du marché européen.",
    "experienceYears": 25,
    "website": "https://www.lw.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Global & Europe Band 1",
      "The Legal 500 EMEA Tier 1",
      "M&A Dealmakers of the Year"
    ],
    "collaboratorsCount": 220
  },
  {
    "id": "lpa-cgr-avocats",
    "name": "LPA-CGR avocats",
    "title": "Cabinet d’Avocats d’Affaires Français & International · Réseau Énergie & Immobilier",
    "specialties": [
      "Immobilier d’entreprise & Financement immobilier",
      "Énergie, Énergies renouvelables & Environnement",
      "Corporate / M&A & Private Equity",
      "Droit public des affaires & Urbanisme",
      "Contentieux d’affaires & Risques industriels",
      "Droit social & Droit fiscal"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@lpalaw.com",
    "phone": "+33 (0)1 53 93 30 00",
    "location": "Paris, 136, Avenue des Champs-Élysées, 75008 Paris",
    "bio": "Né du rapprochement de Lefèvre Pelletier & associés et de CGR Legal, LPA-CGR réunit plus de 230 avocats et professionnels à travers 10 bureaux dans le monde, occupant une position de premier plan en immobilier, transition énergétique et corporate.",
    "experienceYears": 40,
    "website": "https://www.lpa-cgr.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "The Legal 500 EMEA Tier 1",
      "Chambers Europe",
      "Leaders League Incontournable (Immobilier & Énergies)"
    ],
    "collaboratorsCount": 230
  },
  {
    "id": "racine-avocats",
    "name": "Racine",
    "title": "Cabinet d’Avocats d’Affaires Indépendant · Multi-Barreaux",
    "specialties": [
      "Droit des sociétés & M&A",
      "Droit social & Relations collectives",
      "Droit immobilier, Urbanisme & Construction",
      "Droit fiscal & Gestion de patrimoine",
      "Contentieux d’affaires, Pénal & Arbitrage",
      "Difficultés des entreprises & Restructuration",
      "Droit économique, Distribution & Concurrence"
    ],
    "avatar": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@racine.eu",
    "phone": "+33 (0)1 44 82 43 00",
    "location": "Paris, 40, Rue de Courcelles, 75008 Paris (et Lyon, Nantes, Marseille, Bordeaux, Strasbourg)",
    "bio": "Fondé en 1969, Racine est un cabinet d’avocats d’affaires français indépendant de référence, fort de plus de 250 avocats et juristes implantés à Paris et dans les métropoles régionales clés. Le cabinet propose une approche globale et transversale en conseil et contentieux pour les ETI, grands comptes, fonds d’investissement et acteurs de l’immobilier.",
    "experienceYears": 56,
    "website": "https://www.racine.eu/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "The Legal 500 Recommended Firm",
      "Chambers Europe",
      "Leaders League Incontournable",
      "Palmarès du Droit"
    ],
    "collaboratorsCount": 250
  },
  {
    "id": "linklaters-france",
    "name": "Linklaters France",
    "title": "Cabinet d’Avocats d’Affaires International · Magic Circle",
    "specialties": [
      "M&A & Private Equity de premier plan",
      "Banque, Finance & Marchés de capitaux",
      "Régulation financière & Asset Management",
      "Droit fiscal transactionnel & Structuration",
      "Droit social & Gouvernance d’entreprise",
      "Contentieux, Arbitrage international & Compliance"
    ],
    "avatar": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "paris@linklaters.com",
    "phone": "+33 (0)1 56 43 56 43",
    "location": "Paris, 25, Rue de Marignan, 75008 Paris",
    "bio": "Établi à Paris depuis 1973, Linklaters est l'un des cabinets d'affaires internationaux de premier plan en France, intervenant sur les opérations de fusions-acquisitions, les restructurations et les financements d'envergure européenne et mondiale.",
    "experienceYears": 51,
    "website": "https://www.linklaters.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "Chambers Europe & Global Band 1",
      "The Legal 500 Tier 1",
      "Financial Times Innovative Lawyers"
    ],
    "collaboratorsCount": 260
  },
  {
    "id": "arendt-medernach",
    "name": "Arendt & Medernach",
    "title": "Cabinet d’Avocats d’Affaires Leader · Arendt House",
    "specialties": [
      "Fonds d’investissement & Asset Management",
      "Droit bancaire & financier",
      "Droit des sociétés, Private Equity & M&A",
      "Droit fiscal & Contentieux fiscal",
      "Contentieux d’affaires & Arbitrage commercial",
      "Droit social, Pensions & Emploi",
      "Droit du numérique, FinTech & RGPD"
    ],
    "avatar": "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "info@arendt.com",
    "phone": "+352 40 78 78 1",
    "location": "Luxembourg, 41A, Avenue J.F. Kennedy, L-2082 Luxembourg",
    "bio": "Premier cabinet d’avocats d’affaires indépendant au Luxembourg avec plus de 450 professionnels du droit, Arendt & Medernach conseille les institutions financières, gestionnaires de fonds, multinationales et investisseurs institutionnels dans tous les domaines du droit des affaires. Réputé pour son excellence doctrinale et son envergure internationale, le cabinet est classé Band 1 / Tier 1 incontesté par Chambers & Partners, The Legal 500, IFLR1000 et Leaders League.",
    "experienceYears": 36,
    "website": "https://www.arendt.com/",
    "verified": true,
    "type": "cabinet",
    "country": "LU",
    "awards": [
      "Chambers Global & Europe (Band 1)",
      "The Legal 500 (Tier 1)",
      "IFLR1000 (Top Tier)",
      "Leaders League"
    ],
    "collaboratorsCount": 450
  },
  {
    "id": "gide-loyrette-nouel",
    "name": "Gide Loyrette Nouel",
    "title": "Cabinet d’Avocats d’Affaires International · Référence Historique",
    "specialties": [
      "Banque, Finance & Marchés de capitaux",
      "Fusions & Acquisitions, Corporate & Private Equity",
      "Contentieux d’affaires & Arbitrage international",
      "Droit public, Énergie & Projets d’infrastructures",
      "Droit fiscal & Contentieux douanier",
      "Droit immobilier & Financement foncier",
      "Droit social & Restructurations",
      "Propriété intellectuelle, TMT & Données"
    ],
    "avatar": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "info@gide.com",
    "phone": "+33 (0)1 40 75 60 00",
    "location": "Paris, 15, Rue de Laborde, 75008 Paris",
    "bio": "Fondé à Paris en 1920, Gide Loyrette Nouel est le premier cabinet d’avocats d’affaires international d’origine française. Réunissant plus de 500 avocats répartis dans 11 bureaux dans le monde, Gide offre une assistance juridique de premier rang dans toutes les disciplines du droit des affaires et assiste institutions de premier plan, États et grands groupes industriels et financiers.",
    "experienceYears": 105,
    "website": "https://www.gide.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "The Legal 500 EMEA Top Tier",
      "Chambers Europe Band 1",
      "Décideurs / Leaders League",
      "IFLR1000"
    ],
    "collaboratorsCount": 500
  },
  {
    "id": "cms-francis-lefebvre",
    "name": "CMS Francis Lefebvre",
    "title": "Cabinet d’Avocats d’Affaires Leader · Réseau International CMS",
    "specialties": [
      "Droit fiscal, Fiscalité internationale & Contentieux",
      "Corporate, M&A & Private Equity",
      "Droit social & Protection sociale complémentaire",
      "Droit bancaire & Marchés financiers",
      "Droit immobilier, Urbanisme & Baux",
      "Droit de la concurrence & Droit européen",
      "Propriété intellectuelle, Médias & Technologies",
      "Contentieux des affaires & Arbitrage"
    ],
    "avatar": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@cms-fl.com",
    "phone": "+33 (0)1 47 38 55 00",
    "location": "Paris / Neuilly-sur-Seine, 2, Rue Ancelle, 92521 Neuilly-sur-Seine Cedex",
    "bio": "Créé en 1925, CMS Francis Lefebvre est l’un des cabinets d’avocats d’affaires majeurs en France et le membre français fondateur de CMS, organisation internationale réunissant plus de 5 000 avocats dans 45 pays. Fort de plus de 450 avocats et juristes à Paris, il est unanimement salué pour son excellence en droit fiscal, corporate, droit social et droit économique.",
    "experienceYears": 100,
    "website": "https://cms.law/fr/fra",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "The Legal 500 EMEA Top Tier 1",
      "Chambers Europe Band 1 (Droit Fiscal)",
      "Leaders League Incontournable",
      "Palmarès du Droit"
    ],
    "collaboratorsCount": 600
  },
  {
    "id": "fidal",
    "name": "Fidal",
    "title": "Premier Cabinet d’Avocats d’Affaires en France · Réseau National & Global",
    "specialties": [
      "Droit fiscal, Douanes & Prix de transfert",
      "Droit des sociétés, M&A & Restructurations",
      "Droit social, Relations individuelles & collectives",
      "Règlement des contentieux, Pénal des affaires & Arbitrage",
      "Droit commercial, Concurrence & Distribution",
      "Propriété intellectuelle, Technologies & RGPD",
      "Droit public des affaires & Environnement",
      "Droit immobilier & Financement de projets"
    ],
    "avatar": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@fidal.com",
    "phone": "+33 (0)1 55 68 15 15",
    "location": "Paris La Défense, Tour Prisma, 4-6 Avenue d’Alsace, 92400 Courbevoie (85 bureaux en France)",
    "bio": "Fondé en 1922, Fidal est le premier cabinet d’avocats d’affaires en France par sa taille et son ancrage territorial, réunissant plus de 1 300 avocats et juristes dans 85 bureaux régionaux. Fidal intervient auprès de 80 000 entreprises (TPE, PME, ETI, grands groupes et collectivités) dans tous les domaines clés du droit des affaires, de la fiscalité et de la stratégie.",
    "experienceYears": 103,
    "website": "https://www.fidal.com/",
    "verified": true,
    "type": "cabinet",
    "country": "FR",
    "awards": [
      "1er Cabinet d’Avocats d’Affaires en France",
      "The Legal 500 EMEA",
      "Leaders League / Décideurs",
      "Palmarès des Avocats"
    ],
    "collaboratorsCount": 1300
  },
  {
    "id": "linda",
    "name": "CHAIB Linda",
    "title": "Avocat",
    "specialties": [
      "Droit de la famille",
      "Droit des contrats",
      "Droit civil"
    ],
    "avatar": "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "cabinet@lindachaib-avocat.com",
    "phone": "06 17 04 36 70",
    "location": "Lyon, 28 rue Barodet, 69004 LYON",
    "bio": "Maître Linda Chaib accompagne ses clients avec rigueur et dévouement, principalement en droit des contrats, droit de la famille et résolution amiable des différends.",
    "experienceYears": 12
  },
  {
    "id": "julie",
    "name": "LOPEZ Julie",
    "title": "Avocat Associé, PLEAD",
    "specialties": [
      "Droit pénal des affaires",
      "Droit des affaires",
      "Contentieux commercial"
    ],
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "j.lopez@plead-avocats.com",
    "phone": "06 99 04 68 77",
    "location": "Lyon, 6 rue de la Bourse, 69001 LYON",
    "bio": "Spécialisée en droit pénal général et droit pénal des affaires, Maître Julie Lopez, associée du cabinet PLEAD, assure la défense et le conseil des dirigeants et des entreprises.",
    "experienceYears": 10
  },
  {
    "id": "nathalie",
    "name": "CARON Nathalie",
    "title": "Avocat",
    "specialties": [
      "Droit immobilier",
      "Droit de la construction",
      "Baux commerciaux"
    ],
    "avatar": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "contact@caronavocat.com",
    "phone": "04 78 17 23 03",
    "location": "Lyon, 19 rue Montgolfier, 69006 LYON",
    "bio": "Maître Nathalie Caron met son expertise au service des professionnels de l’immobilier et des particuliers pour toutes questions relatives au droit de la construction, de la copropriété et des baux.",
    "experienceYears": 15
  },
  {
    "id": "dania",
    "name": "Dania Al-Zubaidi",
    "title": "Avocat",
    "specialties": [
      "Droit des contrats",
      "Propriété Intellectuelle (PI)",
      "Droit des affaires"
    ],
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "d.alzubaidi@lexiia-barreau.fr",
    "phone": "+33 (0)1 47 20 18 34",
    "location": "Paris, France",
    "bio": "Forte de 8 ans d'expérience, Dania conseille les startups et grandes entreprises sur leurs accords commerciaux stratégiques et la protection de leurs innovations technologiques (brevets, logiciels, licences PI).",
    "experienceYears": 8
  },
  {
    "id": "renee",
    "name": "Renée Alberts",
    "title": "Avocat",
    "specialties": [
      "Droit commercial",
      "Litiges fournisseurs",
      "Arbitrage international"
    ],
    "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "r.alberts@lexiia-barreau.fr",
    "phone": "+33 (0)4 91 14 22 90",
    "location": "Marseille, France",
    "bio": "Renée est spécialisée dans la résolution des différends commerciaux transfrontaliers, de l'arbitrage et de la négociation de protocoles d'accords face aux inexécutions contractuelles.",
    "experienceYears": 15
  },
  {
    "id": "jesse",
    "name": "Jesse Algra",
    "title": "Avocat",
    "specialties": [
      "Droit social & du travail",
      "Ruptures conventionnelles",
      "Relations collectives"
    ],
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "j.algra@lexiia-barreau.fr",
    "phone": "+33 (0)3 20 45 61 12",
    "location": "Lille, France",
    "bio": "Jesse accompagne les services RH et les dirigeants dans la rédaction des contrats de travail complexes, la mise en œuvre de mobilités internationales et la gestion des restructurations d'équipes.",
    "experienceYears": 6
  },
  {
    "id": "iordanis",
    "name": "Iordanis Arvanitidis",
    "title": "Avocat",
    "specialties": [
      "Droit des sociétés",
      "Fusions & Acquisitions (M&A)",
      "Financement"
    ],
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "i.arvanitidis@lexiia-barreau.fr",
    "phone": "+33 (0)1 53 43 99 00",
    "location": "Lyon, France",
    "bio": "Iordanis intervient principalement sur les opérations de haut de bilan, levées de fonds de série A/B et l'élaboration de pactes d'actionnaires protecteurs des fondateurs.",
    "experienceYears": 10
  },
  {
    "id": "ward",
    "name": "Ward Aerts",
    "title": "Associé, avocat",
    "specialties": [
      "Pre-screening de conformité",
      "Gouvernance d'entreprise",
      "Audits d'acquisition"
    ],
    "avatar": "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "w.aerts@lexiia-associes.fr",
    "phone": "+33 (0)1 44 28 88 05",
    "location": "Paris, France",
    "bio": "Associé fondateur de l'alliance Lexiia, Ward possède 22 ans de pratique en gouvernance de grands groupes, conformité réglementaire de pointe et gestion de crises industrielles.",
    "experienceYears": 22
  },
  {
    "id": "inan",
    "name": "Inan Akdeniz",
    "title": "Associé, avocat",
    "specialties": [
      "Droit du numérique & RGPD",
      "Cybersécurité",
      "Intelligence Artificielle"
    ],
    "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "i.akdeniz@lexiia-associes.fr",
    "phone": "+33 (0)1 82 83 45 67",
    "location": "Strasbourg, France",
    "bio": "Membre actif des comités européens sur la gouvernance de l'IA et la protection des données personnelles, Inan conçoit les référentiels de conformité technologiques des acteurs du Web.",
    "experienceYears": 12
  },
  {
    "id": "anton",
    "name": "Anton Akimov",
    "title": "Associé, Fiscalité",
    "specialties": [
      "Fiscalité des entreprises",
      "Contrôles fiscaux",
      "Optimisation internationale"
    ],
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "a.akimov@lexiia-associes.fr",
    "phone": "+33 (0)1 58 12 34 50",
    "location": "Bordeaux, France",
    "bio": "Anton conseille les entreprises de toutes tailles sur l'ingénierie financière, la gestion du crédit d'impôt recherche (CIR) et l'assistance immédiate lors de contrôles ou de litiges avec l'administration.",
    "experienceYears": 18
  },
  {
    "id": "amir",
    "name": "Amir Al-Anany",
    "title": "Avocat",
    "specialties": [
      "Droit pénal des affaires",
      "Marchés publics",
      "Concurrence déloyale"
    ],
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    "email": "a.alanany@lexiia-barreau.fr",
    "phone": "+33 (0)4 72 10 33 44",
    "location": "Nantes, France",
    "bio": "Amir défend et accompagne les dirigeants face aux actions en concurrence déloyale, aux infractions de contrefaçon de marques et aux contentieux de rupture abusive des relations d'affaires.",
    "experienceYears": 5
  },
  {
    "id": "notaire-baden-joelle",
    "name": "Étude Notariale Joëlle Baden",
    "title": "Notaire de résidence à Luxembourg-Ville · Actes Authentiques, Droit Immobilier & Sociétés",
    "specialties": [
      "Droit notarial & Actes authentiques",
      "Droit immobilier & Ventes (VEFA)",
      "Droit des sociétés luxembourgeoises (SARL, SA, SOPARFI)",
      "Successions, Partages & Donations",
      "Régimes matrimoniaux & Contrats de mariage",
      "Fiscalité notariale & Droits d'enregistrement"
    ],
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-baden.lu",
    "phone": "+352 22 79 27 1",
    "location": "17, Rue des Bains, L-1212 Luxembourg",
    "bio": "Maître Joëlle Baden, notaire de résidence à Luxembourg-Ville, accompagne particuliers, investisseurs institutionnels et entreprises dans la rédaction et l'authentification de tous actes juridiques : transactions immobilières, constitutions et restructurations de sociétés luxembourgeoises, planification patrimoniale et règlements successoraux.",
    "experienceYears": 24,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Luxembourg-Ville",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-castel-jacques",
    "name": "Étude Notariale Jacques Castel",
    "title": "Notaire de résidence à Capellen · Immobilier, Patrimoine & Sociétés",
    "specialties": [
      "Droit immobilier & VEFA",
      "Actes authentiques & Droit notarial",
      "Droit des successions & Testaments",
      "Constitution de sociétés & Fusions",
      "Régimes matrimoniaux & Contrats de mariage"
    ],
    "avatar": "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-castel.lu",
    "phone": "+352 30 75 75 1",
    "location": "3, Route d'Olm, L-8331 Capellen",
    "bio": "Installée à Capellen dans le canton de Capellen/Mamer, l'étude de Maître Jacques Castel apporte une expertise de premier ordre pour les transactions immobilières résidentielles et commerciales, le droit sociétaire luxembourgeois ainsi que le règlement des successions patrimoniales et transfrontalières.",
    "experienceYears": 22,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Capellen",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-decker-martine",
    "name": "Étude Notariale Martine Decker",
    "title": "Notaire de résidence à Hesperange (Howald) · Actes Notariés & Droit des Affaires",
    "specialties": [
      "Droit notarial luxembourgeois",
      "Ventes immobilières & Financements hypothécaires",
      "Planification successorale & Donations",
      "Droit des sociétés & Restructurations",
      "Contrats de mariage & PACS"
    ],
    "avatar": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-decker.lu",
    "phone": "+352 40 70 30 1",
    "location": "272, Route de Thionville, L-5884 Howald-Hesperange",
    "bio": "Maître Martine Decker exerce en tant que notaire de résidence à Howald-Hesperange. L'étude conseille avec rigueur les familles et les dirigeants dans tous les aspects du droit notarial, de la transmission d'entreprises aux acquisitions immobilières complexes.",
    "experienceYears": 20,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Hesperange",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-delosch-edouard",
    "name": "Étude Notariale Edouard Delosch",
    "title": "Notaire de résidence à Luxembourg-Merl · Droit Immobilier, Sociétés & Famille",
    "specialties": [
      "Actes authentiques de vente",
      "Droit corporatif & Statuts de sociétés",
      "Successions & Donations entre vifs",
      "Crédits et garanties hypothécaires",
      "Droit fiscal notarial"
    ],
    "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-delosch.lu",
    "phone": "+352 27 18 07",
    "location": "27, Boulevard Marcel Cahen, L-1311 Luxembourg-Merl",
    "bio": "Située à Luxembourg-Merl, l'étude notariale de Maître Edouard Delosch offre une prise en charge sur mesure de vos actes authentiques, constitutions de sociétés (SARL, SA, SOPARFI), opérations immobilières privées ou professionnelles et successions complexes.",
    "experienceYears": 26,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Luxembourg-Merl",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-delvaux-cosita",
    "name": "Étude Notariale Cosita Delvaux",
    "title": "Notaire de résidence à Luxembourg-Ville · Patrimoine, Sociétés & Immobilier",
    "specialties": [
      "Droit des sociétés & Structurations corporate",
      "Transactions immobilières d'envergure",
      "Droit notarial international",
      "Successions & Transmission de patrimoine",
      "Contrats de mariage & Régimes patrimoniaux"
    ],
    "avatar": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-delvaux.lu",
    "phone": "+352 45 41 49 1",
    "location": "36, Boulevard Joseph II, L-1840 Luxembourg",
    "bio": "Maître Cosita Delvaux, notaire à Luxembourg-Ville, dispose d'une pratique réputée en droit des sociétés luxembourgeoises et internationales, en droit immobilier institutionnel ainsi qu'en gestion patrimoniale et succession familiale.",
    "experienceYears": 25,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Luxembourg-Ville",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-dostert-sandy",
    "name": "Étude Notariale Sandy Dostert",
    "title": "Notaire de résidence à Bettembourg · Actes Civils, Notariat & Entreprises",
    "specialties": [
      "Actes authentiques de vente & Baux",
      "Droit des successions & Partages",
      "Création d'entreprises (SARL, SA)",
      "Donations & Planification fiscale",
      "Droit de la famille & PACS"
    ],
    "avatar": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-dostert.lu",
    "phone": "+352 51 32 15 1",
    "location": "10, Rue de la Gare, L-3236 Bettembourg",
    "bio": "Maître Sandy Dostert, notaire de résidence à Bettembourg, assure un conseil juridique de proximité et de haute précision pour sécuriser vos acquisitions immobilières, actes familiaux et démarches sociétaires au Sud du Grand-Duché.",
    "experienceYears": 18,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Bettembourg",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-elvinger-marc",
    "name": "Étude Notariale Marc Elvinger",
    "title": "Notaire de résidence à Ettelbruck · Nord du Luxembourg & Droit Notarial",
    "specialties": [
      "Droit immobilier & Terrains à bâtir",
      "Actes authentiques & Notariat",
      "Droit rural & Transmission patrimoniale",
      "Droit des sociétés & SARL",
      "Successions & Donations"
    ],
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-elvinger.lu",
    "phone": "+352 81 21 07 1",
    "location": "2, Place de l'Hôtel de Ville, L-9087 Ettelbruck",
    "bio": "Maître Marc Elvinger, notaire à Ettelbruck, accompagne les particuliers et entrepreneurs du Nord du Grand-Duché dans l'authentification d'actes de vente, de sociétés, de baux et de règlements successoraux avec une grande expertise locale.",
    "experienceYears": 23,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Ettelbruck",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-feider-thomas",
    "name": "Étude Notariale Thomas Feider",
    "title": "Notaire de résidence à Wiltz · Conseil Notarial, Immobilier & Successions",
    "specialties": [
      "Ventes immobilières & Hypothèques",
      "Droit des successions & Testaments",
      "Régimes matrimoniaux",
      "Création de sociétés",
      "Actes notariés authentiques"
    ],
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-feider.lu",
    "phone": "+352 95 80 43 1",
    "location": "7, Rue Michel Thilges, L-9573 Wiltz",
    "bio": "Établi à Wiltz, Maître Thomas Feider met sa rigueur au service de la sécurité juridique de vos contrats et actes officiels : transactions foncières, succession de biens familiaux et immatriculation de structures sociétaires.",
    "experienceYears": 17,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Wiltz",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-foehr-anne",
    "name": "Étude Notariale Anne Foehr",
    "title": "Notaire de résidence à Echternach · Région Est & Droit Patrimonial",
    "specialties": [
      "Transactions immobilières Est & Müllerthal",
      "Actes authentiques notariés",
      "Droit de la famille & Successions",
      "Droit des sociétés",
      "Donations & Partages"
    ],
    "avatar": "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-foehr.lu",
    "phone": "+352 72 00 24 1",
    "location": "9, Rabatt, L-6475 Echternach",
    "bio": "Maître Anne Foehr, notaire de résidence à Echternach, offre une écoute attentive et des solutions juridiques certifiées pour vos projets de vie : acquisition de résidence, gestion et partage successoral, ou statuts de société.",
    "experienceYears": 19,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Echternach",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-frank-marie-claude",
    "name": "Étude Notariale Marie-Claude Frank",
    "title": "Notaire de résidence à Grevenmacher · Moselle Luxembourgeoise & Affaires",
    "specialties": [
      "Droit immobilier transfrontalier & Moselle",
      "Droit des sociétés & Fonds",
      "Actes authentiques notariés",
      "Successions & Fiscalité",
      "Contrats de mariage"
    ],
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-frank.lu",
    "phone": "+352 75 02 81 1",
    "location": "33, Route de Trèves, L-6793 Grevenmacher",
    "bio": "Située à Grevenmacher, l'étude de Maître Marie-Claude Frank intervient dans toute la région de la Moselle et au niveau national pour l'officialisation d'actes d'achat-vente, constitutions de sociétés et règlements successoraux binationaux.",
    "experienceYears": 21,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Grevenmacher",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-goedert-carlo",
    "name": "Étude Notariale Carlo Goedert",
    "title": "Notaire de résidence à Dudelange · Immobilier, Famille & Corporate",
    "specialties": [
      "Droit immobilier résidentiel & commercial",
      "Actes notariés & Authentification",
      "Droit des successions & Testaments",
      "Statuts de sociétés (SARL, SA)",
      "Donations & Fiscalité patrimoniale"
    ],
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-goedert.lu",
    "phone": "+352 51 64 62",
    "location": "61-63, Avenue G.D. Charlotte, L-3441 Dudelange",
    "bio": "Maître Carlo Goedert, notaire de résidence à Dudelange, apporte une solide expérience du droit notarial grand-ducal. Son étude accompagne particuliers et entreprises dans la conclusion sécurisée de tous leurs actes notariés.",
    "experienceYears": 27,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Dudelange",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-grethen-leonie",
    "name": "Étude Notariale Léonie Grethen",
    "title": "Notaire de résidence à Esch-sur-Alzette · Actes Authentiques & Famille",
    "specialties": [
      "Ventes immobilières & Copropriétés",
      "Actes de famille & Successions",
      "Droit des sociétés luxembourgeoises",
      "Donations & Partages successoraux",
      "Droit fiscal notarial"
    ],
    "avatar": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-grethen.lu",
    "phone": "+352 54 00 12 1",
    "location": "32a, Rue Zénon Bernard, L-4031 Esch-sur-Alzette",
    "bio": "Maître Léonie Grethen exerce à Esch-sur-Alzette au cœur du bassin minier et de la région Sud. Son étude notariale conseille familles et professionnels avec diligence sur leurs dossiers immobiliers et patrimoniaux.",
    "experienceYears": 18,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Esch-sur-Alzette",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-hames-mireille",
    "name": "Étude Notariale Mireille Hames",
    "title": "Notaire de résidence à Mersch · Centre du Grand-Duché & Entreprises",
    "specialties": [
      "Droit immobilier & Lotissements",
      "Constitution & Modifications statutaires",
      "Actes authentiques notariés",
      "Droit successoral & Testaments",
      "Régimes matrimoniaux"
    ],
    "avatar": "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-hames.lu",
    "phone": "+352 32 00 28 1",
    "location": "38-40, Rue G.D. Charlotte, L-7520 Mersch",
    "bio": "Notaire de résidence à Mersch au carrefour géographique du Luxembourg, Maître Mireille Hames intervient pour tous les actes authentiques de la vie civile et des affaires avec un accompagnement rigoureux et personnalisé.",
    "experienceYears": 20,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Mersch",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-hellinckx-henri",
    "name": "Étude Notariale Henri Hellinckx",
    "title": "Notaire de résidence à Luxembourg-Cents · Notariat d'Affaires & Immobilier",
    "specialties": [
      "Droit des sociétés & Fonds d'investissement",
      "Grandes transactions immobilières institutionnelles",
      "Actes authentiques & Notariat",
      "Planification patrimoniale internationale",
      "Successions & Donations"
    ],
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-hellinckx.lu",
    "phone": "+352 24 52 62 1",
    "location": "101, Rue Cents, L-1319 Luxembourg",
    "bio": "Maître Henri Hellinckx est l'une des figures majeures du notariat luxembourgeois, réputé pour son expertise dans les structures de sociétés complexes, fonds d'investissement, fusions-acquisitions et opérations immobilières institutionnelles.",
    "experienceYears": 30,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Luxembourg-Cents",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-hellinckx-brice",
    "name": "Étude Notariale Brice Hellinckx",
    "title": "Notaire de résidence à Mersch · Droit Notarial & Patrimonial",
    "specialties": [
      "Actes de vente immobilière & VEFA",
      "Droit des sociétés & Gouvernance",
      "Règlement de successions",
      "Donations & Contrats de mariage",
      "Authentification notariale"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-bhellinckx.lu",
    "phone": "+352 32 02 02 1",
    "location": "7, Rue Wenzel, L-7593 Mersch",
    "bio": "Maître Brice Hellinckx, notaire de résidence à Mersch, conseille particuliers et sociétés pour assurer l'efficacité juridique et fiscale de leurs actes : acquisitions immobilières, pactes successoraux et opérations corporate.",
    "experienceYears": 16,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Mersch",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-hengen-frederique",
    "name": "Étude Notariale Frédérique Hengen",
    "title": "Notaire de résidence à Redange-sur-Attert · Canton de Redange & Famille",
    "specialties": [
      "Droit immobilier & Propriétés foncières",
      "Actes authentiques notariés",
      "Droit des successions & Partages",
      "Droit des sociétés",
      "Régimes matrimoniaux"
    ],
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-hengen.lu",
    "phone": "+352 23 62 82 1",
    "location": "66, Grand-rue, L-8510 Redange-sur-Attert",
    "bio": "Maître Frédérique Hengen, notaire de résidence à Redange-sur-Attert, met à disposition des familles et entrepreneurs de l'Ouest du pays une expertise juridique pointue pour formaliser et certifier leurs actes patrimoniaux et professionnels.",
    "experienceYears": 19,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Redange-sur-Attert",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-holtz-anja",
    "name": "Étude Notariale Anja Holtz",
    "title": "Notaire de résidence à Esch-sur-Alzette · Immobilier, Affaires & Famille",
    "specialties": [
      "Ventes immobilières & Financements",
      "Création & Statuts de sociétés",
      "Actes de succession & Donations",
      "Régimes matrimoniaux & PACS",
      "Droit notarial luxembourgeois"
    ],
    "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-holtz.lu",
    "phone": "+352 54 84 54 1",
    "location": "12-14, Rue Marie Muller-Tesch, L-4250 Esch-sur-Alzette",
    "bio": "Maître Anja Holtz exerce à Esch-sur-Alzette, deuxième pôle économique du Grand-Duché. Son étude guide les clients avec écoute et précision dans toutes les formalités d'actes authentiques, transmissions et contrats.",
    "experienceYears": 21,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Esch-sur-Alzette",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-kesseler-jacques",
    "name": "Étude Notariale Jacques Kesseler",
    "title": "Notaire de résidence à Pétange · Sud-Ouest & Actes Authentiques",
    "specialties": [
      "Droit immobilier résidentiel & Promotion",
      "Actes authentiques notariés",
      "Droit des sociétés & Restructurations",
      "Successions & Planification patrimoniale",
      "Hypothèques & Baux"
    ],
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-kesseler.lu",
    "phone": "+352 28 84 55 1",
    "location": "4, Rue Robert Schuman, L-4779 Pétange",
    "bio": "Maître Jacques Kesseler, notaire à Pétange à proximité des frontières française et belge, offre un service d'authentification et de conseil juridique d'excellence pour l'immobilier, les sociétés et les questions familiales.",
    "experienceYears": 22,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Pétange",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-kolbach-danielle",
    "name": "Étude Notariale Danielle Kolbach",
    "title": "Notaire de résidence à Junglinster · Centre-Est, Immobilier & Patrimoine",
    "specialties": [
      "Ventes immobilières & VEFA",
      "Droit des successions & Partages",
      "Droit des sociétés & Statuts",
      "Contrats de mariage & Donations",
      "Actes authentiques notariés"
    ],
    "avatar": "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-kolbach.lu",
    "phone": "+352 78 82 28 1",
    "location": "34-36, Rue des Cerises, L-6113 Junglinster",
    "bio": "Installée à Junglinster, Maître Danielle Kolbach conseille une clientèle locale et internationale dans l'élaboration de tous leurs actes notariés authentiques avec un souci permanent de clarté, rigueur et réactivité.",
    "experienceYears": 23,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Junglinster",
      "Officier Public et Ministériel"
    ]
  },
  {
    "id": "notaire-krombach-yves",
    "name": "Étude Notariale Yves Krombach",
    "title": "Notaire de résidence à Luxembourg-Ville · Affaires, Immobilier & Successions",
    "specialties": [
      "Droit des sociétés (SARL, SA, SCSp) & M&A",
      "Transactions immobilières majeures",
      "Planification successorale & Patrimoine privé",
      "Droit notarial international",
      "Actes authentiques notariés"
    ],
    "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600&h=600",
    "email": "contact@notaire-krombach.lu",
    "phone": "+352 40 40 40 1",
    "location": "22, Rue Goethe, L-1637 Luxembourg",
    "bio": "Maître Yves Krombach, notaire de résidence à Luxembourg-Ville (quartier Gare/Goethe), dispose d'une pratique d'excellence au service d'entreprises, institutionnels et familles pour toutes opérations d'authentification notariée et d'actes civils.",
    "experienceYears": 25,
    "website": "https://www.notaires.lu/",
    "verified": true,
    "type": "notaire",
    "country": "LU",
    "awards": [
      "Chambre des Notaires du Luxembourg",
      "Notaire de résidence à Luxembourg-Ville",
      "Officier Public et Ministériel"
    ]
  }
];
