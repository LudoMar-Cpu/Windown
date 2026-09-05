// Logol Lhome Web Browser with Multi-Page SEO Search Engine, 35+ Sites Directory & Extension Verif
class LogolApp {
    constructor() {
        this.currentUrl = 'https://www.googoo.wid';
        this.history = ['https://www.googoo.wid'];
        this.searchQuery = 'Typon';
        this.downloads = [];
        this.verifEnabled = false;
        this.currentPage = 1;
        this.resultsPerPage = 5;

        // Comprehensive 35-site web directory with SEO optimization metrics & indexing status
        this.webDirectory = [
            {
                id: 'typon_official',
                title: 'Typon Programming Language - Télécharger le .xey Officiel',
                url: 'https://www.typon.moc/download',
                destUrl: 'https://www.typon.moc',
                snippet: 'Site officiel du langage Typon v1.0.4. Téléchargez l\'interpréteur complet pour exécuter vos scripts d\'automatisation, tri de fichiers, POO et IA.',
                keywords: ['typon', 'langage', 'telecharger', 'xey', 'interpreteur', 'code', 'officiel', 'programmation'],
                seoScore: 99,
                seoGrade: 'Optimal (99%)',
                seoMeta: '<meta name="keywords" content="typon, download, official, ide, python, code">',
                indexed: 'Indexé Google & GooGoo (Rang 1)',
                verifPercent: 99,
                verifTag: 'safe'
            },
            {
                id: 'typon_docs',
                title: 'Documentation Officielle Typon v1.0.4 - Modèles de Scripts & Automatisation',
                url: 'https://www.typon.moc/docs',
                destUrl: 'https://www.typon.moc/docs',
                snippet: 'Guide technique officiel complet et modèles prêts à l\'emploi : script tri_clips.ty, facturation.ty, calcul_devis.ty, POO et fonctions système.',
                keywords: ['typon', 'doc', 'documentation', 'tuto', 'aide', 'script', 'fonction', 'modele', 'facturation', 'tri'],
                seoScore: 98,
                seoGrade: 'Optimal (98%)',
                seoMeta: '<meta name="keywords" content="typon, doc, api, reference, cheatsheet">',
                indexed: 'Indexé Google & GooGoo (Rang 2)',
                verifPercent: 99,
                verifTag: 'safe'
            },
            {
                id: 'banque_populaire',
                title: 'Banque Populaire Widown - Portail Officiel Particuliers & Pros',
                url: 'https://www.banque-populaire-widown.fr',
                destUrl: 'https://www.banque-populaire-widown.fr',
                snippet: 'Consultez vos comptes, effectuez des virements et sécurisez votre solde financier en toute confiance avec l\'authentification officielle Widown.',
                keywords: ['banque', 'argent', 'compte', 'solde', 'virement', 'finance', 'populaire'],
                seoScore: 97,
                seoGrade: 'Optimal (97%)',
                seoMeta: '<meta name="keywords" content="banque, compte, argent, securite, virement">',
                indexed: 'Indexé Google & GooGoo',
                verifPercent: 99,
                verifTag: 'safe'
            },
            {
                id: 'fortynite_defense',
                title: 'Fortynite Global Cyber Defense - Solutions Entreprise & Recrutement',
                url: 'https://www.fortynite-defense.wid',
                destUrl: 'https://www.fortynite-defense.wid',
                snippet: 'Leader mondial en cybersécurité offensive et défensive. Découvrez nos logiciels d\'entreprise FTNWork et nos offres d\'emploi en automatisation.',
                keywords: ['fortynite', 'securite', 'cyber', 'defense', 'bureau', 'recrutement', 'emploi', 'ftnwork'],
                seoScore: 96,
                seoGrade: 'Optimal (96%)',
                seoMeta: '<meta name="keywords" content="fortynite, cybersecurite, parefeu, ftnwork">',
                indexed: 'Indexé GooGoo Verified',
                verifPercent: 98,
                verifTag: 'safe'
            },
            {
                id: 'netsim_academy',
                title: 'NetSim 2014 - Guide d\'Architecture & Câblage Baie Réseau',
                url: 'https://www.netsim-reseaux.org',
                destUrl: 'https://www.netsim-reseaux.org',
                snippet: 'Manuel complet d\'administration réseau : configuration des passerelles 192.168.1.1, brassage RJ45, caméras IP et routage d\'entreprise.',
                keywords: ['netsim', 'reseau', 'baie', 'routeur', 'switch', 'ip', 'camera', 'ping', 'cctv'],
                seoScore: 94,
                seoGrade: 'Optimal (94%)',
                seoMeta: '<meta name="keywords" content="netsim, reseau, cctv, rj45, switch, routeur">',
                indexed: 'Indexé GooGoo Réseaux',
                verifPercent: 97,
                verifTag: 'safe'
            },
            {
                id: 'santeplus_clinique',
                title: 'Cabinet Médical SantéPlus - Consultations & Dossiers Patients',
                url: 'https://www.santeplus-clinique.wid',
                destUrl: 'https://www.santeplus-clinique.wid',
                snippet: 'Cabinet médical du Dr. Vasseur. Accueil des patients, téléconsultations et télésurveillance sécurisée des sas d\'urgence.',
                keywords: ['santeplus', 'vasseur', 'docteur', 'cabinet', 'medical', 'clinique', 'urgence'],
                seoScore: 90,
                seoGrade: 'Élevé (90%)',
                seoMeta: '<meta name="keywords" content="santeplus, medecin, clinique, sante, vasseur">',
                indexed: 'Indexé Annuaire Médical',
                verifPercent: 96,
                verifTag: 'safe'
            },
            {
                id: 'lumina_network',
                title: 'Lumina - Plateforme Photographique & Inspiration Développeurs',
                url: 'https://www.lumina-photo.com',
                destUrl: 'https://www.lumina-photo.com',
                snippet: 'Partagez vos bureaux, stations de travail minimalistes et interfaces Typon élégantes avec des milliers de développeurs passionnés.',
                keywords: ['lumina', 'photo', 'setup', 'social', 'reseau', 'inspiration', 'dev'],
                seoScore: 92,
                seoGrade: 'Élevé (92%)',
                seoMeta: '<meta name="keywords" content="lumina, photos, desk, setup, devlife">',
                indexed: 'Indexé SocialNet Hub',
                verifPercent: 97,
                verifTag: 'safe'
            },
            {
                id: 'vanish_stories',
                title: 'Vanish - L\'Application de Micro-Messages et Flammes 24h',
                url: 'https://www.vanish-ephemeral.net',
                destUrl: 'https://www.vanish-ephemeral.net',
                snippet: 'Communiquez sans laisser de trace. Stories éphémères, compteurs de flammes quotidiens et aperçus de code en direct.',
                keywords: ['vanish', 'stories', 'flammes', 'snap', 'ephemere', 'message'],
                seoScore: 91,
                seoGrade: 'Élevé (91%)',
                seoMeta: '<meta name="keywords" content="vanish, stories, ephemeral, chat, streak">',
                indexed: 'Indexé Mobile Directory',
                verifPercent: 96,
                verifTag: 'safe'
            },
            {
                id: 'loopr_tv',
                title: 'Loopr - Le Flux Vidéo Continu For-You Algorithmique',
                url: 'https://www.loopr-app.tv',
                destUrl: 'https://www.loopr-app.tv',
                snippet: 'Courtes vidéos dynamiques, astuces Typon de 15 secondes, remix musicaux et défis de rapidité de programmation.',
                keywords: ['loopr', 'video', 'tiktok', 'fyp', 'viral', 'court', 'clip'],
                seoScore: 93,
                seoGrade: 'Élevé (93%)',
                seoMeta: '<meta name="keywords" content="loopr, fyp, video, clips, trend">',
                indexed: 'Indexé Viral Media',
                verifPercent: 97,
                verifTag: 'safe'
            },
            {
                id: 'nexuswall_hub',
                title: 'NexusWall - Le Réseau Public des Ingénieurs & Débats Techniques',
                url: 'https://www.nexuswall-community.org',
                destUrl: 'https://www.nexuswall-community.org',
                snippet: 'Groupes professionnels, retours d\'expérience sur les systèmes d\'exploitation, débats sur la POO et actualités informatiques.',
                keywords: ['nexuswall', 'groupe', 'communaute', 'forum', 'debat', 'facebook', 'reseau'],
                seoScore: 89,
                seoGrade: 'Élevé (89%)',
                seoMeta: '<meta name="keywords" content="nexuswall, tech, communaute, entraide">',
                indexed: 'Indexé Global Networks',
                verifPercent: 95,
                verifTag: 'safe'
            },
            {
                id: 'store_widown_portal',
                title: 'Widown Store - Catalogue d\'Applications & Kits SDK Mobiles',
                url: 'https://store.widown.moc',
                destUrl: 'https://store.widown.moc',
                snippet: 'Téléchargez les SDKs mobiles, NeuroTensor Studio et publiez vos applications Typon pour collecter des revenus passifs.',
                keywords: ['store', 'widown', 'boutique', 'telecharger', 'app', 'mobile', 'sdk', 'neurotensor'],
                seoScore: 98,
                seoGrade: 'Optimal (98%)',
                seoMeta: '<meta name="keywords" content="store, widown, apps, sdk, outils">',
                indexed: 'Indexé Portail Officiel',
                verifPercent: 100,
                verifTag: 'safe'
            },
            {
                id: 'pilewilla_cloud',
                title: 'PileWilla Cloud VPS - Hébergement Serveurs & Bots Typon',
                url: 'https://www.pilewilla-vps.net',
                destUrl: 'https://www.pilewilla-vps.net',
                snippet: 'Déployez vos scripts et bots Doscord en continu sur des serveurs Linux & Widown haute disponibilité avec protection anti-DDoS.',
                keywords: ['pilewilla', 'vps', 'ftp', 'serveur', 'doscord', 'bot', 'hebergement'],
                seoScore: 88,
                seoGrade: 'Élevé (88%)',
                seoMeta: '<meta name="keywords" content="pilewilla, vps, bot, hosting, ptf">',
                indexed: 'Indexé Cloud Providers',
                verifPercent: 95,
                verifTag: 'safe'
            },
            {
                id: 'typon_forum',
                title: 'Forum Développeurs Typon France - Entraide & Partage de Code',
                url: 'https://forum.typon-dev.fr',
                destUrl: 'https://forum.typon-dev.fr',
                snippet: 'La plus grande communauté francophone de scripteurs Typon. Résolution de bugs, astuces de syntaxe et snippets partagés.',
                keywords: ['forum', 'typon', 'aide', 'entraide', 'bug', 'code', 'developpeur', 'france'],
                seoScore: 87,
                seoGrade: 'Élevé (87%)',
                seoMeta: '<meta name="keywords" content="forum, typon, entraide, dev, questions">',
                indexed: 'Indexé Forums Dev',
                verifPercent: 95,
                verifTag: 'safe'
            },
            {
                id: 'typon_tutorials',
                title: 'Apprendre Typon en 10 Jours : Du Débutant à l\'Automatisation Système',
                url: 'https://www.dev-tutorials-france.com/typon-cours',
                destUrl: 'https://www.dev-tutorials-france.com/typon-cours',
                snippet: 'Cours complet pas à pas : variables, boucles, conditions, manipulation des fichiers VFS et programmation orientée objet.',
                keywords: ['cours', 'tuto', 'tutoriel', 'apprendre', 'debutant', 'typon', 'formation'],
                seoScore: 85,
                seoGrade: 'Élevé (85%)',
                seoMeta: '<meta name="keywords" content="cours, tuto, typon, debutant, programmation">',
                indexed: 'Indexé Portail Éducatif',
                verifPercent: 94,
                verifTag: 'safe'
            },
            {
                id: 'sophie_creations',
                title: 'Sophie Créations Bijoux - Joaillerie & Vente Sécurisée HSS',
                url: 'https://www.sophie-creations.wid',
                destUrl: 'https://www.sophie-creations.wid',
                snippet: 'Boutique artisanale de bijoux précieux. Facturation sécurisée chiffrée déployée avec les protocoles HSS port 22.',
                keywords: ['sophie', 'bijoux', 'boutique', 'facturation', 'hss', 'securite'],
                seoScore: 84,
                seoGrade: 'Élevé (84%)',
                seoMeta: '<meta name="keywords" content="sophie, bijoux, boutique, e-commerce">',
                indexed: 'Indexé Boutiques Web',
                verifPercent: 94,
                verifTag: 'safe'
            },
            {
                id: 'maxime_renovation',
                title: 'Maxime Rénovation Bâtiment - Devis Travaux & Calcul TVA',
                url: 'https://www.maxime-renov.wid',
                destUrl: 'https://www.maxime-renov.wid',
                snippet: 'Artisan spécialisé en rénovation générale. Calcul automatique des devis HT et TTC via notre script certifié Typon.',
                keywords: ['maxime', 'renovation', 'batiment', 'devis', 'tva', 'calcul', 'chantier'],
                seoScore: 81,
                seoGrade: 'Élevé (81%)',
                seoMeta: '<meta name="keywords" content="maxime, renovation, devis, artisan">',
                indexed: 'Indexé Artisans France',
                verifPercent: 93,
                verifTag: 'safe'
            },
            {
                id: 'lucas_gaming_stream',
                title: 'Lucas Streamer - Chaîne Gaming, Highlights & Clips de Jeu',
                url: 'https://lucas-gaming.twitch-stream.wid',
                destUrl: 'https://lucas-gaming.twitch-stream.wid',
                snippet: 'Retrouvez les lives, tournois et clips de Lucas. Scripts d\'organisation automatique des replays de stream.',
                keywords: ['lucas', 'stream', 'twitch', 'gamer', 'jeu', 'clip', 'video'],
                seoScore: 78,
                seoGrade: 'Moyen (78%)',
                seoMeta: '<meta name="keywords" content="lucas, gamer, stream, clips">',
                indexed: 'Indexé Streaming Hub',
                verifPercent: 91,
                verifTag: 'safe'
            },
            {
                id: 'valex_comptabilite',
                title: 'Cabinet Comptable Valex - Tri Numérique & Archivage Légal',
                url: 'https://www.valex-compta.fr',
                destUrl: 'https://www.valex-compta.fr',
                snippet: 'Cabinet d\'expertise comptable. Classement automatisé des factures, bilans et pièces justificatives.',
                keywords: ['valex', 'comptabilite', 'compta', 'documents', 'tri', 'archives'],
                seoScore: 82,
                seoGrade: 'Élevé (82%)',
                seoMeta: '<meta name="keywords" content="valex, compta, fiscal, audit">',
                indexed: 'Indexé Ordre des Experts',
                verifPercent: 95,
                verifTag: 'safe'
            },
            {
                id: 'papy_michel_blog',
                title: 'Les Plus Belles Vacances de Papy Michel - Photos & Souvenirs',
                url: 'https://papy-michel.orange.wid',
                destUrl: 'https://papy-michel.orange.wid',
                snippet: 'Mon petit carnet de voyage pour la famille. Nettoyé de tous ses fichiers temporaires grâce à l\'aide informatique !',
                keywords: ['papy', 'michel', 'photos', 'vacances', 'blog', 'famille'],
                seoScore: 55,
                seoGrade: 'Faible (55%)',
                seoMeta: '<meta name="description" content="photos de michel sans mots-cles">',
                indexed: 'Indexation Partielle (Page perso)',
                verifPercent: 88,
                verifTag: 'safe'
            },
            {
                id: 'neurotensor_lab',
                title: 'NeuroTensor AI Labs - Recherche Fondamentale sur les LLMs',
                url: 'https://www.neurotensor-lab.ai',
                destUrl: 'https://www.neurotensor-lab.ai',
                snippet: 'Pionniers dans l\'apprentissage profond et la génération neuronale de code informatique pour les futures versions de Widown.',
                keywords: ['neurotensor', 'ia', 'ai', 'modele', 'deeplearning', 'neurone', 'futur'],
                seoScore: 92,
                seoGrade: 'Élevé (92%)',
                seoMeta: '<meta name="keywords" content="ai, llm, neural, neurotensor, agi">',
                indexed: 'Indexé AI Research',
                verifPercent: 98,
                verifTag: 'safe'
            },
            {
                id: 'maza_space_agency',
                title: 'MAZA - Agence Aérospatiale Mondiale & Télémétrie Satellitaire',
                url: 'https://www.maza-space.gov',
                destUrl: 'https://www.maza-space.gov',
                snippet: 'Surveillance orbitale, lancements de satellites météo et contrôle des réseaux de télécommunication haute altitude.',
                keywords: ['maza', 'nasa', 'espace', 'satellite', 'orbite', 'gouvernement', 'telecom'],
                seoScore: 97,
                seoGrade: 'Optimal (97%)',
                seoMeta: '<meta name="keywords" content="maza, space, satellite, telemetry, defense">',
                indexed: 'Indexé Portail Gouvernemental',
                verifPercent: 99,
                verifTag: 'safe'
            },
            {
                id: 'tech_hebdo_news',
                title: 'Tech Chronicles Hebdo - L\'Actualité Informatique & Révolution IA',
                url: 'https://news.tech-hebdo.wid',
                destUrl: 'https://news.tech-hebdo.wid',
                snippet: 'Analyses technologiques approfondies : la fin des OS classiques et la révolution programmée de Widown 11 orienté IA.',
                keywords: ['news', 'actu', 'tech', 'hebdo', 'ia', 'revolution', 'journal', 'article'],
                seoScore: 91,
                seoGrade: 'Élevé (91%)',
                seoMeta: '<meta name="keywords" content="tech, news, info, ai, presse">',
                indexed: 'Indexé Google Actualités',
                verifPercent: 96,
                verifTag: 'safe'
            },
            {
                id: 'codesnippet_hub',
                title: 'CodeSnippet Exchange - Scripts Typon Prêts à l\'Emploi',
                url: 'https://www.codesnippet-hub.io',
                destUrl: 'https://www.codesnippet-hub.io',
                snippet: 'Banque collaborative de code : snippets de calculs arithmétiques, tri automatique et communication réseau sécurisée.',
                keywords: ['snippet', 'code', 'typon', 'script', 'exemple', 'partage'],
                seoScore: 79,
                seoGrade: 'Moyen (79%)',
                seoMeta: '<meta name="keywords" content="snippets, code, typon, scripts">',
                indexed: 'Indexé Code Hub',
                verifPercent: 92,
                verifTag: 'safe'
            },
            {
                id: 'routage_pro_guide',
                title: 'Comprendre le Routage IP, Masques 255.255.255.0 et Passerelles',
                url: 'https://www.routage-informatique-pro.com',
                destUrl: 'https://www.routage-informatique-pro.com',
                snippet: 'Guide pédagogique pour corriger les erreurs de sous-réseaux, pings défaillants et configurer des caméras IP sans conflit.',
                keywords: ['routage', 'ip', 'masque', 'passerelle', 'sous-reseau', 'ping', 'cisco'],
                seoScore: 80,
                seoGrade: 'Élevé (80%)',
                seoMeta: '<meta name="keywords" content="ip, reseau, routage, masque, gateway">',
                indexed: 'Indexé Réseau Pro',
                verifPercent: 93,
                verifTag: 'safe'
            },
            {
                id: 'justice_gouv_cyber',
                title: 'Ministère de la Justice - Pôle Recouvrement des Litiges Numériques',
                url: 'https://litige-cyber.justice-gouv.wid',
                destUrl: 'https://litige-cyber.justice-gouv.wid',
                snippet: 'Portail officiel de notification judiciaire pour rupture de pourparlers et médiation commerciale obligatoire.',
                keywords: ['justice', 'litige', 'mise en demeure', 'loi', 'gouvernement', 'tribunal'],
                seoScore: 95,
                seoGrade: 'Optimal (95%)',
                seoMeta: '<meta name="keywords" content="justice, gouv, litige, contentieux">',
                indexed: 'Indexé Justice Publique',
                verifPercent: 99,
                verifTag: 'safe'
            },
            {
                id: 'tresor_public_direct',
                title: 'Direction Générale des Finances - Portail Saisies Administratives',
                url: 'https://recouvrement.tresor-public.wid',
                destUrl: 'https://recouvrement.tresor-public.wid',
                snippet: 'Centre d\'exécution des titres exécutoires et prélèvements d\'office majorés pour créances d\'État impayées.',
                keywords: ['tresor', 'impot', 'saisie', 'finance', 'prelevement', 'amende'],
                seoScore: 96,
                seoGrade: 'Optimal (96%)',
                seoMeta: '<meta name="keywords" content="tresor, public, saisie, impots">',
                indexed: 'Indexé Finances Publiques',
                verifPercent: 100,
                verifTag: 'safe'
            },
            {
                id: 'typon_typi',
                title: 'TyPI : Typon Package Index - Dépôt de Bibliothèques Open Source',
                url: 'https://typi.org/packages',
                destUrl: 'https://typi.org/packages',
                snippet: 'Explorez des centaines de modules pour étendre vos scripts : gui, reseau, crypto, fichiers et intelligence artificielle.',
                keywords: ['typi', 'module', 'package', 'bibliotheque', 'importer', 'open source'],
                seoScore: 86,
                seoGrade: 'Élevé (86%)',
                seoMeta: '<meta name="keywords" content="typi, packages, modules, typon">',
                indexed: 'Indexé Repository Index',
                verifPercent: 96,
                verifTag: 'safe'
            },
            {
                id: 'secuwidown_cve',
                title: 'SecuWidown - Observatoire des Vulnérabilités & Filles Zero-Day',
                url: 'https://cve.secuwidown.org',
                destUrl: 'https://cve.secuwidown.org',
                snippet: 'Base de données des failles réseau non corrigées sur les vieux routeurs, mots de passe de caméras par défaut et exploits.',
                keywords: ['faille', 'cve', 'securite', 'zero-day', 'vulnerabilite', 'exploit', 'audit'],
                seoScore: 88,
                seoGrade: 'Élevé (88%)',
                seoMeta: '<meta name="keywords" content="cve, exploits, audit, failles">',
                indexed: 'Indexé Cyber Veille',
                verifPercent: 95,
                verifTag: 'safe'
            },
            {
                id: 'banque_phishing',
                title: 'Alerte Débit Suspect Bancaire - Authentification Requise',
                url: 'https://connexion.banque-widown-fraude.xyz/espace-client',
                destUrl: 'https://connexion.banque-widown-fraude.xyz/espace-client',
                snippet: 'Transaction anormale détectée. Connectez-vous d\'urgence avec vos identifiants pour contester le prélèvement de 1 250 €.',
                keywords: ['banque', 'fraude', 'phishing', 'contestation', 'debit', 'urgence', 'identifiant'],
                seoScore: 38,
                seoGrade: 'Suspect (38%)',
                seoMeta: '<meta name="keywords" content="banque, urgence, compte, mot de passe">',
                indexed: 'Non certifié (Blacklist Phishing)',
                verifPercent: 4,
                verifTag: 'danger'
            },
            {
                id: 'typon_crack_1',
                title: '⚡ Télécharger Typon Pro Crack Gratuit 100% Fonctionnel',
                url: 'https://www.typon-free-crack-2024.biz/setup',
                destUrl: 'https://www.typon-free-crack-2024.biz',
                snippet: 'Obtenez Typon Ultra sans attendre. Fichier ultra rapide zip exe direct. Aucun mot de passe requis.',
                keywords: ['typon', 'crack', 'gratuit', 'telecharger', 'free', 'pirate'],
                seoScore: 32,
                seoGrade: 'Pénalisé (32%)',
                seoMeta: '<meta name="keywords" content="crack, free, download, keygen">',
                indexed: 'Non indexé (Spam pénalisé)',
                verifPercent: 8,
                verifTag: 'danger'
            },
            {
                id: 'typon_phish_dl',
                title: 'Télécharger Typon .xey Installeur Express Miroir',
                url: 'https://www.telecharger-typon-rapide.xyz',
                destUrl: 'https://www.telecharger-typon-rapide.xyz',
                snippet: 'Téléchargement miroir non vérifié. Installation de plugins publicitaires tiers recommandée.',
                keywords: ['typon', 'rapide', 'installeur', 'express', 'miroir', 'telecharger'],
                seoScore: 26,
                seoGrade: 'Pénalisé (26%)',
                seoMeta: '<meta name="keywords" content="typon, download, fast, exe">',
                indexed: 'Non indexé (Adware suspect)',
                verifPercent: 12,
                verifTag: 'danger'
            },
            {
                id: 'typon_keygen',
                title: 'Keygen & License Generator Typon Studio Unlimited',
                url: 'https://keygen-typon-pro.su',
                destUrl: 'https://keygen-typon-pro.su',
                snippet: 'Générateur de clés de licence gratuites pour débloquer les modules Typon sans passer par TheTree.xey.',
                keywords: ['keygen', 'licence', 'typon', 'cle', 'serial', 'generator'],
                seoScore: 18,
                seoGrade: 'Dangereux (18%)',
                seoMeta: '<meta name="keywords" content="keygen, serial, crack">',
                indexed: 'Banni des moteurs de recherche',
                verifPercent: 5,
                verifTag: 'danger'
            },
            {
                id: 'calis_underground',
                title: '💀 Calis Underground Hub - Dumps, Zero-Days & Tor Exploit Market',
                url: 'https://underground.calis-linox.org',
                destUrl: 'https://underground.calis-linox.org',
                snippet: 'Plateforme réservée aux hackers Calis Linox. Vente de RAT caméras, payloads offshore et discussions non censurées.',
                keywords: ['calis', 'dark', 'hack', 'bounty', 'rat', 'exploit', 'underground', 'zero-day'],
                seoScore: 21,
                seoGrade: 'Clandestin (21%)',
                seoMeta: '<meta name="robots" content="noindex, nofollow">',
                indexed: 'Réseau Clandestin (.onion / Tor)',
                verifPercent: 10,
                verifTag: 'danger'
            },
            {
                id: 'doxintel_osint_onion',
                title: '🔍 DoxIntel Search - Recherche Inverse Dox & Bases de Données',
                url: 'https://doxintel-database.onion',
                destUrl: 'https://doxintel-database.onion',
                snippet: 'Moteur de recherche OSINT non filtré croisant registres téléphoniques déchiffrés et dossiers confidentiels.',
                keywords: ['doxintel', 'osint', 'recherche', 'dox', 'telephone', 'ip', 'leak'],
                seoScore: 16,
                seoGrade: 'Clandestin (16%)',
                seoMeta: '<meta name="robots" content="noindex, nofollow">',
                indexed: 'Nœud Dark Web Clandestin',
                verifPercent: 15,
                verifTag: 'danger'
            },
            {
                id: 'free_wifi_paris',
                title: 'Hotspots Wi-Fi Publics Paris - Connexion Ouverte sans Chiffrement',
                url: 'https://paris-freewifi-nonsecure.net',
                destUrl: 'https://paris-freewifi-nonsecure.net',
                snippet: 'Bornes Wi-Fi non sécurisées dans les gares et parcs. Risque élevé d\'interception de paquets par sonde d\'écoute.',
                keywords: ['wifi', 'gratuit', 'public', 'hotspot', 'reseau', 'connexion'],
                seoScore: 40,
                seoGrade: 'Faible (40%)',
                seoMeta: '<meta name="keywords" content="wifi, free, hotspot, paris">',
                indexed: 'Indexation Non Sécurisée',
                verifPercent: 25,
                verifTag: 'neutral'
            },
            {
                id: 'casino_jackpot',
                title: '🎰 Casino Jackpot Royal - Bonus 500 Tours Gratuits Immédiats',
                url: 'https://www.casino-jackpot-magique.moc',
                destUrl: 'https://www.casino-jackpot-magique.moc',
                snippet: 'Touchez le gros lot dès aujourd\'hui ! Attention : site à forte monétisation publicitaire et pop-ups intrusifs toutes les 15 secondes.',
                keywords: ['casino', 'argent', 'jackpot', 'roulette', 'gagner', 'jeu', 'popup', 'million'],
                seoScore: 45,
                seoGrade: 'Spammy (45%)',
                seoMeta: '<meta name="keywords" content="casino, argent, jackpot, popup">',
                indexed: 'Indexé Basse Qualité',
                verifPercent: 20,
                verifTag: 'danger'
            },
            {
                id: 'million_cash',
                title: '💰 Gagnez 1 000 000 € Cash en 3 Clics - Tirage Express',
                url: 'https://www.gagnez-un-million-cash.moc',
                destUrl: 'https://www.gagnez-un-million-cash.moc',
                snippet: 'Tirage au sort immédiat. Réclamez votre chèque de 1 000 000 €. Pop-ups toutes les 15 secondes garantis.',
                keywords: ['million', 'cash', 'gagner', 'argent', 'loterie', 'popup'],
                seoScore: 40,
                seoGrade: 'Spammy (40%)',
                seoMeta: '<meta name="keywords" content="million, cash, loterie, argent">',
                indexed: 'Indexé Basse Qualité',
                verifPercent: 15,
                verifTag: 'danger'
            }
        ];
        this.spamPopupInterval = null;
    }

    openToUrl(url) {
        this.currentUrl = url;
        if (!window.windowManager.windows.has('logol')) {
            this.open();
        } else {
            const winEl = document.getElementById('win-logol');
            window.windowManager.restoreWindow('logol');
            window.windowManager.bringToFront('logol');
            if (winEl) {
                const urlBar = winEl.querySelector('#browser-url-bar');
                if (urlBar) urlBar.value = url;
                this.renderPage(winEl);
            }
        }
    }

    open() {
        const content = `
            <div class="logol-browser-container">
                <div class="logol-nav-bar">
                    <div class="nav-btn-group">
                        <button class="nav-btn" id="nav-back" title="Précédent">◀</button>
                        <button class="nav-btn" id="nav-fwd" title="Suivant">▶</button>
                        <button class="nav-btn" id="nav-reload" title="Actualiser">⟳</button>
                        <button class="nav-btn" id="nav-home" title="Accueil">🏠</button>
                    </div>
                    <div class="address-bar-wrapper">
                        <span class="lock-icon" id="site-security-icon">🔒</span>
                        <input type="text" class="address-input" id="browser-url-bar" value="https://www.googoo.wid">
                    </div>
                    <div class="extensions-bar">
                        <button class="ext-btn ${this.verifEnabled ? 'active' : ''}" id="ext-verif-toggle" title="Extension Verif (Cyber-Sécurité)">
                            <span class="ext-icon">🛡️</span>
                            <span class="ext-label">Verif</span>
                            <span class="ext-badge">${this.verifEnabled ? 'ON' : 'OFF'}</span>
                        </button>
                        <button class="nav-btn" id="btn-show-downloads" title="Téléchargements">📥</button>
                    </div>
                </div>

                <div class="logol-viewport" id="browser-viewport">
                    <!-- Dynamic Page Content -->
                </div>

                <!-- Downloads Drawer -->
                <div class="downloads-drawer" id="downloads-drawer" style="display:none;">
                    <div class="drawer-header">
                        <strong>Gestionnaire de Téléchargements</strong>
                        <button class="drawer-close" id="close-downloads">✕</button>
                    </div>
                    <div class="downloads-list" id="downloads-list">
                        <div class="no-dl">Aucun téléchargement récent</div>
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'logol',
            title: 'Logol Lhome - Navigateur Web Sécurisé',
            icon: 'browser',
            width: 820,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        const urlBar = winEl.querySelector('#browser-url-bar');
        const verifToggle = winEl.querySelector('#ext-verif-toggle');
        const dlBtn = winEl.querySelector('#btn-show-downloads');
        const dlDrawer = winEl.querySelector('#downloads-drawer');
        const dlClose = winEl.querySelector('#close-downloads');

        verifToggle.addEventListener('click', () => {
            this.verifEnabled = !this.verifEnabled;
            verifToggle.classList.toggle('active', this.verifEnabled);
            verifToggle.querySelector('.ext-badge').textContent = this.verifEnabled ? 'ON' : 'OFF';
            window.soundFX.playClick();
            if (this.verifEnabled) {
                window.gameEngine.showNotification('🛡️ Extension Verif Activée', 'Indices de confiance et pourcentages de sécurité affichés sur chaque résultat.', 'success');
            }
            this.renderPage(winEl);
        });

        dlBtn.addEventListener('click', () => {
            dlDrawer.style.display = dlDrawer.style.display === 'none' ? 'block' : 'none';
        });

        dlClose.addEventListener('click', () => {
            dlDrawer.style.display = 'none';
        });

        winEl.querySelector('#nav-home').addEventListener('click', () => {
            this.navigate('https://www.googoo.wid', winEl);
        });

        urlBar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                let url = urlBar.value.trim();
                if (!url.startsWith('http')) {
                    if (url.includes('.')) url = 'https://' + url;
                    else {
                        this.searchQuery = url;
                        this.currentPage = 1;
                        url = `https://www.googoo.wid/search?q=${encodeURIComponent(url)}`;
                    }
                }
                this.navigate(url, winEl);
            }
        });

        this.renderPage(winEl);
    }

    navigate(url, winEl) {
        this.currentUrl = url;
        const urlBar = winEl.querySelector('#browser-url-bar');
        if (urlBar) urlBar.value = url;
        this.renderPage(winEl);
    }

    // Dynamic Search & SEO Ranking Engine
    getRankedSearchResults(query) {
        const q = (query || '').toLowerCase().trim();
        const terms = q.split(/\s+/).filter(t => t.length > 0);

        // Score each site based on matching + SEO weight
        const scored = this.webDirectory.map(site => {
            let score = 0;
            const fullText = (site.title + ' ' + site.url + ' ' + site.snippet + ' ' + site.keywords.join(' ')).toLowerCase();

            if (terms.length === 0) {
                // If empty search, rank purely by SEO optimization score
                score = site.seoScore;
            } else {
                terms.forEach(term => {
                    if (site.title.toLowerCase().includes(term)) score += 40;
                    if (site.url.toLowerCase().includes(term)) score += 30;
                    if (site.keywords.some(k => k.includes(term))) score += 25;
                    if (site.snippet.toLowerCase().includes(term)) score += 15;
                });
                // Factor in SEO optimization rank: higher SEO pushes results to page 1
                score += (site.seoScore * 0.4);
            }

            return { site, score };
        });

        // Sort descending by score
        scored.sort((a, b) => b.score - a.score);
        return scored.map(item => item.site);
    }

    renderPage(winEl) {
        const viewport = winEl.querySelector('#browser-viewport');
        if (!viewport) return;

        // Clear ongoing spam popup interval on page change
        if (this.spamPopupInterval) {
            clearInterval(this.spamPopupInterval);
            this.spamPopupInterval = null;
        }

        if (this.currentUrl.includes('googoo.wid')) {
            this.renderGooGoo(viewport, winEl);
        } else if (this.currentUrl.includes('typon.moc/doc')) {
            this.renderOfficialTyponDocs(viewport, winEl);
        } else if (this.currentUrl.includes('typon.moc')) {
            this.renderOfficialTypon(viewport, winEl);
        } else if (this.currentUrl.includes('casino-jackpot') || this.currentUrl.includes('gagnez-un-million') || this.currentUrl.includes('popup')) {
            this.renderSpamSite(viewport, winEl);
            this.startSpamPopupLoop(winEl);
        } else if (this.currentUrl.includes('typon-free-crack') || this.currentUrl.includes('telecharger-typon') || this.currentUrl.includes('keygen-typon')) {
            this.renderMaliciousSite(viewport, winEl);
        } else if (this.currentUrl.includes('banque-widown-fraude')) {
            this.renderBankPhishingSite(viewport, winEl);
        } else {
            // Find in directory or display generic styled site
            const site = this.webDirectory.find(s => this.currentUrl.includes(s.url) || this.currentUrl.includes(s.id));
            if (site) {
                this.renderGenericSite(viewport, winEl, site);
            } else {
                viewport.innerHTML = `
                    <div class="web-page-404">
                        <h2>Page non trouvée (404)</h2>
                        <p>L'adresse <code>${this.currentUrl}</code> est introuvable.</p>
                        <button class="widown-btn btn-primary" onclick="window.logolApp.navigate('https://www.googoo.wid', document.getElementById('win-logol'))">Retourner à GooGoo Search</button>
                    </div>
                `;
            }
        }
    }

    renderGooGoo(viewport, winEl) {
        const isSearchResults = this.currentUrl.includes('search');

        if (!isSearchResults) {
            viewport.innerHTML = `
                <div class="googoo-home">
                    <div class="googoo-logo">
                        <span class="g-blue">G</span><span class="g-red">o</span><span class="g-yellow">o</span><span class="g-blue">G</span><span class="g-green">o</span><span class="g-red">o</span>
                    </div>
                    <div class="googoo-search-box">
                        <input type="text" id="googoo-input" placeholder="Rechercher sur le Web Widown (ex: Typon, Banque, Réseau...)" value="${this.searchQuery}">
                        <div class="search-btns">
                            <button class="widown-btn" id="googoo-search-btn">Recherche GooGoo</button>
                            <button class="widown-btn" id="googoo-lucky-btn">J'ai de la chance</button>
                        </div>
                    </div>
                    <div class="googoo-footer-tips">
                        <small>Moteur de recherche GooGoo : Indexation de <strong>${this.webDirectory.length} sites web</strong> avec classement par score de référencement (SEO).</small>
                    </div>
                </div>
            `;

            const input = viewport.querySelector('#googoo-input');
            const btn = viewport.querySelector('#googoo-search-btn');
            const submitSearch = () => {
                this.searchQuery = input.value.trim() || 'Typon';
                this.currentPage = 1;
                this.navigate(`https://www.googoo.wid/search?q=${encodeURIComponent(this.searchQuery)}`, winEl);
                if (window.gameEngine.currentStep === 'QUARANTINE_TRIGGERED') {
                    window.gameEngine.setStep('SEARCHING_WEB');
                }
            };

            btn.addEventListener('click', submitSearch);
            input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitSearch(); });
        } else {
            // Search Results page with 5 items per page & 5 pages minimum!
            const allResults = this.getRankedSearchResults(this.searchQuery);
            const totalResults = allResults.length;
            const totalPages = Math.max(5, Math.ceil(totalResults / this.resultsPerPage));

            // Clamp current page
            if (this.currentPage > totalPages) this.currentPage = totalPages;
            if (this.currentPage < 1) this.currentPage = 1;

            const startIndex = (this.currentPage - 1) * this.resultsPerPage;
            const pageResults = allResults.slice(startIndex, startIndex + this.resultsPerPage);

            viewport.innerHTML = `
                <div class="googoo-results-page">
                    <div class="results-header">
                        <div class="mini-logo" onclick="window.logolApp.navigate('https://www.googoo.wid', document.getElementById('win-logol'))">GooGoo</div>
                        <input type="text" class="mini-search-box" value="${this.searchQuery}" id="mini-search-input">
                    </div>

                    <div class="results-stats">
                        Environ ${totalResults * 142} résultats indexés pour <strong>"${this.searchQuery}"</strong> (Page ${this.currentPage} sur ${totalPages} - ${this.resultsPerPage} résultats affichés)
                    </div>

                    ${!this.verifEnabled ? `
                        <div class="verif-promo-banner">
                            <div class="vp-icon">🛡️</div>
                            <div class="vp-text">
                                <strong>Sécurité & Référencement :</strong> Certains sites mal référencés contiennent des malwares. 
                                <a href="#" id="activate-verif-link">Activez l'extension <strong>Verif</strong></a> pour inspecter les certificats et scores de confiance !
                            </div>
                        </div>
                    ` : ''}

                    <div class="results-list">
                        ${pageResults.map((site, idx) => {
                            let seoClass = 'optimal';
                            if (site.seoScore < 40) seoClass = 'low';
                            else if (site.seoScore < 70) seoClass = 'medium';
                            else if (site.seoScore < 90) seoClass = 'high';

                            return `
                                <div class="search-result-item">
                                    <div class="res-domain-row">
                                        <span class="res-url">${site.url}</span>
                                        ${this.verifEnabled ? (
                                            site.verifTag === 'safe'
                                                ? `<span class="verif-tag safe">🛡️ ${site.verifPercent}% SÉCURISÉ</span>`
                                                : `<span class="verif-tag danger">⚠️ ${site.verifPercent}% SUSPECT / DANGEREUX</span>`
                                        ) : '<span class="verif-tag neutral">? Non vérifié</span>'}
                                        <span class="seo-tag ${seoClass}">⭐ SEO: ${site.seoScore}% • ${site.seoGrade}</span>
                                    </div>
                                    <h3 class="res-title"><a href="#" data-url="${site.destUrl || site.url}">${site.title}</a></h3>
                                    <p class="res-snippet">${site.snippet}</p>
                                    <div class="seo-meta-tag">
                                        <small>Balises Référencement : <code>${site.seoMeta}</code> • <em>${site.indexed}</em></small>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <!-- 5-Page Pagination Controls -->
                    <div class="googoo-pagination">
                        <span class="pagination-label">Pages de résultats :</span>
                        <button class="page-btn" id="btn-page-prev" ${this.currentPage === 1 ? 'disabled' : ''}>◀ Précédent</button>
                        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                            <button class="page-btn ${this.currentPage === p ? 'active' : ''}" data-page="${p}">${p}</button>
                        `).join('')}
                        <button class="page-btn" id="btn-page-next" ${this.currentPage === totalPages ? 'disabled' : ''}>Suivant ▶</button>
                    </div>
                </div>
            `;

            // Pagination listeners
            viewport.querySelectorAll('.page-btn[data-page]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.currentPage = parseInt(btn.dataset.page, 10);
                    window.soundFX.playClick();
                    viewport.scrollTop = 0;
                    this.renderGooGoo(viewport, winEl);
                });
            });

            const prevBtn = viewport.querySelector('#btn-page-prev');
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (this.currentPage > 1) {
                        this.currentPage--;
                        window.soundFX.playClick();
                        viewport.scrollTop = 0;
                        this.renderGooGoo(viewport, winEl);
                    }
                });
            }

            const nextBtn = viewport.querySelector('#btn-page-next');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (this.currentPage < totalPages) {
                        this.currentPage++;
                        window.soundFX.playClick();
                        viewport.scrollTop = 0;
                        this.renderGooGoo(viewport, winEl);
                    }
                });
            }

            // Mini search input
            const miniInput = viewport.querySelector('#mini-search-input');
            if (miniInput) {
                miniInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        this.searchQuery = miniInput.value.trim() || 'Typon';
                        this.currentPage = 1;
                        this.navigate(`https://www.googoo.wid/search?q=${encodeURIComponent(this.searchQuery)}`, winEl);
                    }
                });
            }

            const linkVerif = viewport.querySelector('#activate-verif-link');
            if (linkVerif) {
                linkVerif.addEventListener('click', (e) => {
                    e.preventDefault();
                    winEl.querySelector('#ext-verif-toggle').click();
                });
            }

            viewport.querySelectorAll('.res-title a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const dest = link.dataset.url;
                    this.navigate(dest, winEl);
                });
            });
        }
    }

    renderGenericSite(viewport, winEl, site) {
        const cleanAdHtml = window.gameEngine.cleanAdsActive ? `
            <div class="clean-ad-banner" style="background:#eff6ff; border:1px solid #93c5fd; color:#1e40af; padding:8px 12px; margin-bottom:12px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span>📢 <strong>Bannière Partenaire :</strong> Hébergez vos serveurs et gagnez des dividendes passifs avec InvestHub Pro !</span>
                <button class="widown-btn btn-sm" onclick="window.investHubApp.open()">Voir l'Offre</button>
            </div>
        ` : '';

        viewport.innerHTML = `
            <div class="generic-web-page">
                ${cleanAdHtml}
                <div class="generic-site-header">
                    <div>
                        <strong style="font-size:16px;">${site.title.split('-')[0].trim()}</strong>
                        <small style="display:block; opacity:0.7;">${site.url}</small>
                    </div>
                    <div>
                        <span class="seo-tag optimal" style="margin-right:8px;">Score SEO : ${site.seoScore}%</span>
                        <button class="widown-btn btn-sm" id="btn-back-to-search">◀ Retour aux résultats</button>
                    </div>
                </div>

                <div class="generic-site-body">
                    <h1 style="color:#0284c7; font-size:22px; margin-bottom:12px;">${site.title}</h1>
                    <div style="background:#f1f5f9; padding:12px; border-radius:6px; margin-bottom:16px; font-size:12px; border-left:4px solid #0284c7;">
                        <strong>Métadonnées d'Indexation & Référencement :</strong><br>
                        • Mots-clés optimisés : <code>${site.keywords.join(', ')}</code><br>
                        • Indice de confiance Verif : <strong>${site.verifPercent}%</strong> (${site.verifTag === 'safe' ? 'Certifié Sécurisé' : 'Alerte Risque'})<br>
                        • Balises HTML : <code>${site.seoMeta}</code>
                    </div>

                    <p style="font-size:14px; line-height:1.6; color:#334155;">
                        ${site.snippet}
                    </p>

                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:8px; margin-top:20px;">
                        <h3 style="margin-top:0; font-size:15px; color:#1e293b;">Portail Interactif & Services</h3>
                        <p style="font-size:13px; color:#64748b;">
                            Ce domaine est vérifié et certifié sur le Web Widown. Les informations et flux de données sont régulièrement indexés par le robot d'exploration GooGooBot.
                        </p>
                    </div>
                </div>
            </div>
        `;

        const backBtn = viewport.querySelector('#btn-back-to-search');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.navigate(`https://www.googoo.wid/search?q=${encodeURIComponent(this.searchQuery)}`, winEl);
            });
        }
    }

    renderSpamSite(viewport, winEl) {
        viewport.innerHTML = `
            <div class="spam-site-page" style="background:#fef08a; padding:25px; font-family:sans-serif; min-height:100%; text-align:center;">
                <div style="background:#dc2626; color:white; padding:15px; border-radius:8px; font-size:22px; font-weight:bold; letter-spacing:1px;">
                    🎰 CASINO ROYAL CASH - JACKPOT 1 000 000 € !
                </div>
                <h2 style="color:#b91c1c; margin-top:20px;">🎉 FÉLICITATIONS ! VOUS ÊTES LE 1 000 000ème VISITEUR !</h2>
                <p style="font-size:15px; color:#78350f;">Cliquez sur la roulette ci-dessous pour encaisser votre gain direct par virement bancaire immédiat.</p>
                <div style="font-size:55px; margin:20px 0;">🎰 💰 🍒 7️⃣</div>
                <button class="widown-btn btn-danger btn-lg" style="font-size:18px; padding:12px 24px; font-weight:bold;" id="btn-spin-jackpot">JOUER MON TOUR GRATUIT !</button>
                <div style="margin-top:25px; color:#b45309; font-size:12px; background:#fef3c7; padding:10px; border-radius:6px; border:1px solid #fde68a;">
                    ⚠️ <strong>Attention :</strong> Ce site à forte monétisation publicitaire déclenche des pop-ups intempestifs toutes les 15 secondes.
                </div>
            </div>
        `;

        const spinBtn = viewport.querySelector('#btn-spin-jackpot');
        if (spinBtn) {
            spinBtn.addEventListener('click', () => {
                this.triggerIntrusivePopup(viewport);
            });
        }
    }

    startSpamPopupLoop(winEl) {
        if (this.spamPopupInterval) clearInterval(this.spamPopupInterval);
        const viewport = winEl.querySelector('#browser-viewport');
        if (!viewport) return;

        // Trigger immediate preview popup after 2.5s
        setTimeout(() => {
            if (this.currentUrl.includes('casino') || this.currentUrl.includes('million') || this.currentUrl.includes('popup')) {
                this.triggerIntrusivePopup(viewport);
            }
        }, 2500);

        // Every 15 seconds recurring
        this.spamPopupInterval = setInterval(() => {
            if (this.currentUrl.includes('casino') || this.currentUrl.includes('million') || this.currentUrl.includes('popup')) {
                this.triggerIntrusivePopup(viewport);
            } else {
                clearInterval(this.spamPopupInterval);
                this.spamPopupInterval = null;
            }
        }, 15000);
    }

    triggerIntrusivePopup(viewport) {
        if (!viewport) return;
        window.soundFX.playVirusAlert();

        const popup = document.createElement('div');
        popup.className = 'intrusive-spam-popup';
        popup.innerHTML = `
            <div class="spam-popup-inner">
                <div class="spam-popup-header">
                    <span>🚨 ALERTE GAIN IMMÉDIAT ! (Pop-up 15s)</span>
                    <button class="spam-popup-close">✕</button>
                </div>
                <div class="spam-popup-body">
                    <h3 style="color:#dc2626; margin:0 0 8px 0;">🎉 CHÈQUE DE 1 000 000 € RÉSERVÉ !</h3>
                    <p style="font-size:13px; margin:0 0 12px 0;">Votre adresse IP a été sélectionnée par notre régie pub ! Ne fermez pas cette page sous peine d'annulation de vos gains !</p>
                    <div style="text-align:center; margin:10px 0;">
                        <button class="widown-btn btn-danger btn-claim-cash" style="font-weight:bold; padding:8px 16px;">RÉCLAMER MES 1 000 000 € MAINTENANT</button>
                    </div>
                    <small style="display:block; text-align:center; color:#64748b; font-size:10px; margin-top:8px;">Publicité intempestive programmée toutes les 15 secondes pour rentabiliser le site.</small>
                </div>
            </div>
        `;

        popup.querySelector('.spam-popup-close').addEventListener('click', () => {
            popup.remove();
        });

        popup.querySelector('.btn-claim-cash').addEventListener('click', () => {
            window.soundFX.playNotification();
            window.gameEngine.showNotification('Alerte Phishing Évitée', 'La pop-up publicitaire a tenté de vous rediriger vers un formulaire suspect !', 'danger');
            popup.remove();
        });

        viewport.appendChild(popup);
    }

    renderOfficialTypon(viewport, winEl) {
        viewport.innerHTML = `
            <div class="official-typon-page">
                <div class="typon-hero-header">
                    <div class="typon-logo">🐍 Typon Engine</div>
                    <nav class="typon-nav">
                        <span id="typon-nav-docs">Documentation</span>
                        <span class="active">Téléchargements</span>
                    </nav>
                </div>
                <div class="typon-hero-content">
                    <h1>Le langage de programmation ultime pour Widown OS</h1>
                    <p>Développez des scripts d'automatisation, gérez vos fichiers en toute sécurité et connectez vos outils à l'IA neuronale.</p>
                    
                    <div class="download-card">
                        <div class="dl-badge">Version 1.0.4 Officielle</div>
                        <h3>Typon Runtime & Interpréteur (.xey)</h3>
                        <p>Compatible avec Widown 7, Widown 10 et Widown 11 (64-bit)</p>
                        <button class="widown-btn btn-large btn-green" id="btn-download-typon">
                            ⬇ Télécharger Typon_Setup.xey (14.2 Mo)
                        </button>
                        <small>Certifié sans virus par Verif Security • Signature SHA-256 Validée</small>
                    </div>
                </div>
            </div>
        `;

        const btnDl = viewport.querySelector('#btn-download-typon');
        if (btnDl) {
            btnDl.addEventListener('click', () => {
                this.triggerDownload('Typon_Setup.xey', winEl);
            });
        }

        const navDocs = viewport.querySelector('#typon-nav-docs');
        if (navDocs) {
            navDocs.addEventListener('click', () => {
                this.navigate('https://www.typon.moc/docs', winEl);
            });
        }
    }

    renderOfficialTyponDocs(viewport, winEl) {
        viewport.innerHTML = `
            <div class="typon-docs-container">
                <div class="typon-docs-header">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h1>📖 Documentation Officielle Typon v1.0.4</h1>
                        <button class="widown-btn btn-sm" id="typon-nav-dl">⬇ Télécharger Typon.xey</button>
                    </div>
                    <p>Référence complète du langage et modèles prêts à l'emploi pour vos contrats.</p>
                </div>

                <div class="typon-docs-grid">
                    <!-- Card Lucas Gamer -->
                    <div class="typon-doc-card featured">
                        <div class="doc-card-title">🎮 Lucas Gamer : Tri Automatique des Clips</div>
                        <div class="doc-card-desc">Fichier : <code>tri_clips.ty</code> — Déplace les vidéos .mp4 vers <code>/Clips</code> et screenshots .png vers <code>/Screenshots</code>.</div>
                        <pre class="typon-code-box">importer fichiers
pour fichier dans lister("C:/Users/Lucas/Videos"):
    si fichier.se_termine_par(".mp4"):
        deplacer(fichier, "C:/Users/Lucas/Videos/Clips")
    si fichier.se_termine_par(".png"):
        deplacer(fichier, "C:/Users/Lucas/Videos/Screenshots")
afficher("Tri des clips terminé !")</pre>
                        <div style="font-size:11px; color:#38bdf8; margin-bottom:8px;">💡 <em>Astuce : tapez <code>clips</code> puis <strong>Tab</strong> dans CodeStud !</em></div>
                        <div class="doc-card-actions">
                            <button class="widown-btn btn-sm btn-copy-snippet" data-code="importer fichiers\npour fichier dans lister(&quot;C:/Users/Lucas/Videos&quot;):\n    si fichier.se_termine_par(&quot;.mp4&quot;):\n        deplacer(fichier, &quot;C:/Users/Lucas/Videos/Clips&quot;)\n    si fichier.se_termine_par(&quot;.png&quot;):\n        deplacer(fichier, &quot;C:/Users/Lucas/Videos/Screenshots&quot;)\nafficher(&quot;Tri des clips terminé !&quot;)\n">📋 Copier</button>
                            <button class="widown-btn btn-sm btn-insert-snippet" data-file="tri_clips.ty" data-code="importer fichiers\n# Script tri_clips.ty pour Lucas Gamer\npour fichier dans lister(&quot;C:/Users/Lucas/Videos&quot;):\n    si fichier.se_termine_par(&quot;.mp4&quot;):\n        deplacer(fichier, &quot;C:/Users/Lucas/Videos/Clips&quot;)\n    si fichier.se_termine_par(&quot;.png&quot;):\n        deplacer(fichier, &quot;C:/Users/Lucas/Videos/Screenshots&quot;)\nafficher(&quot;Tri des clips terminé !&quot;)\n">📥 Insérer dans CodeStud</button>
                        </div>
                    </div>

                    <!-- Card Sophie Bijoux -->
                    <div class="typon-doc-card featured">
                        <div class="doc-card-title">💍 Sophie Bijoux : Facturation Sécurisée</div>
                        <div class="doc-card-desc">Fichier : <code>facturation.ty</code> — Script de facturation sécurisée à déployer dans <code>/Securite</code> via protocole HSS.</div>
                        <pre class="typon-code-box">importer fichiers
importer reseau
afficher("Module de facturation déployé avec succès !")</pre>
                        <div style="font-size:11px; color:#38bdf8; margin-bottom:8px;">💡 <em>Astuce : tapez <code>fact</code> puis <strong>Tab</strong> dans CodeStud !</em></div>
                        <div class="doc-card-actions">
                            <button class="widown-btn btn-sm btn-copy-snippet" data-code="importer fichiers\nimporter reseau\nafficher(&quot;Module de facturation déployé avec succès !&quot;)\n">📋 Copier</button>
                            <button class="widown-btn btn-sm btn-insert-snippet" data-file="facturation.ty" data-code="importer fichiers\nimporter reseau\n# Script facturation.ty pour Sophie Bijoux\nafficher(&quot;Module de facturation déployé avec succès !&quot;)\n">📥 Insérer dans CodeStud</button>
                        </div>
                    </div>

                    <!-- Card Maxime Rénovation -->
                    <div class="typon-doc-card featured">
                        <div class="doc-card-title">🔨 Maxime Rénovation : Devis & Calcul TVA</div>
                        <div class="doc-card-desc">Fichier : <code>calcul_devis.ty</code> — Déclare les montants et calcule la TVA automatiquement. À téléverser dans <code>/Comptabilite</code> après test local (F5).</div>
                        <pre class="typon-code-box">importer fichiers
taux_tva = 0.20
montant_ht = 1500
montant_tva = montant_ht * taux_tva
montant_ttc = montant_ht + montant_tva
afficher("--- DEVIS RENOVATION ---")
afficher("Montant HT : 1500 EUR")
afficher("TVA (20%) : 300 EUR")
afficher("Total TTC : 1800 EUR")</pre>
                        <div style="font-size:11px; color:#38bdf8; margin-bottom:8px;">💡 <em>Astuce : tapez <code>calcul</code> ou <code>devis</code> puis <strong>Tab</strong> dans CodeStud !</em></div>
                        <div class="doc-card-actions">
                            <button class="widown-btn btn-sm btn-copy-snippet" data-code="importer fichiers\ntaux_tva = 0.20\nmontant_ht = 1500\nmontant_tva = montant_ht * taux_tva\nmontant_ttc = montant_ht + montant_tva\nafficher(&quot;--- DEVIS RENOVATION ---&quot;)\nafficher(&quot;Montant HT : 1500 EUR&quot;)\nafficher(&quot;TVA (20%) : 300 EUR&quot;)\nafficher(&quot;Total TTC : 1800 EUR&quot;)\n">📋 Copier</button>
                            <button class="widown-btn btn-sm btn-insert-snippet" data-file="calcul_devis.ty" data-code="importer fichiers\n# Script calcul_devis.ty pour Maxime Rénovation\ntaux_tva = 0.20\nmontant_ht = 1500\nmontant_tva = montant_ht * taux_tva\nmontant_ttc = montant_ht + montant_tva\nafficher(&quot;--- DEVIS RENOVATION ---&quot;)\nafficher(&quot;Montant HT : 1500 EUR&quot;)\nafficher(&quot;TVA (20%) : 300 EUR&quot;)\nafficher(&quot;Total TTC : 1800 EUR&quot;)\n">📥 Insérer dans CodeStud</button>
                        </div>
                    </div>

                    <!-- Card Dark Hacker -->
                    <div class="typon-doc-card" style="border-color:#dc2626;">
                        <div class="doc-card-title" style="color:#f87171;">☠️ Cyber-Défense : Rapatriement de Fonds</div>
                        <div class="doc-card-desc">Fichier : <code>recup_fonds.ty</code> — Rapatrie les 1 250 € volés et empoche le butin. À déposer dans <code>/Butin_Vols</code>.</div>
                        <pre class="typon-code-box" style="color:#fca5a5; border-color:#7f1d1d;">importer reseau
importer fichiers
afficher("Rapatriement des fonds volés en cours...")</pre>
                        <div style="font-size:11px; color:#f87171; margin-bottom:8px;">💡 <em>Astuce : tapez <code>recup</code> puis <strong>Tab</strong> dans CodeStud !</em></div>
                        <div class="doc-card-actions">
                            <button class="widown-btn btn-sm btn-copy-snippet" data-code="importer reseau\nimporter fichiers\nafficher(&quot;Rapatriement des fonds volés en cours...&quot;)\n">📋 Copier</button>
                            <button class="widown-btn btn-sm btn-insert-snippet" data-file="recup_fonds.ty" data-code="importer reseau\nimporter fichiers\n# Script recup_fonds.ty contre DARK_HACKER\nafficher(&quot;Rapatriement des fonds volés en cours...&quot;)\n">📥 Insérer dans CodeStud</button>
                        </div>
                    </div>

                    <!-- Card Valex Compta -->
                    <div class="typon-doc-card">
                        <div class="doc-card-title">📁 Valex Compta : Classement Local</div>
                        <div class="doc-card-desc">Fichier : <code>classer.ty</code> — Trie automatiquement les fichiers du dossier Documents selon leur extension.</div>
                        <pre class="typon-code-box">importer fichiers
classer_dossier("C:/Utilisateurs/Joueur/Documents")</pre>
                        <div class="doc-card-actions">
                            <button class="widown-btn btn-sm btn-copy-snippet" data-code="importer fichiers\nclasser_dossier(&quot;C:/Utilisateurs/Joueur/Documents&quot;)\n">📋 Copier</button>
                            <button class="widown-btn btn-sm btn-insert-snippet" data-file="classer.ty" data-code="importer fichiers\nclasser_dossier(&quot;C:/Utilisateurs/Joueur/Documents&quot;)\n">📥 Insérer dans CodeStud</button>
                        </div>
                    </div>
                </div>

                <h2 style="font-size:15px; color:#38bdf8; margin:20px 0 10px 0;">📖 Fonctions du Moteur Typon</h2>
                <table class="typon-docs-table">
                    <thead>
                        <tr>
                            <th>Fonction</th>
                            <th>Module</th>
                            <th>Description</th>
                            <th>Exemple</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>importer &lt;module&gt;</code></td>
                            <td>Natif</td>
                            <td>Charge une bibliothèque (<code>fichiers</code>, <code>reseau</code>, <code>ia</code>, <code>gui</code>).</td>
                            <td><code>importer fichiers</code></td>
                        </tr>
                        <tr>
                            <td><code>afficher(texte)</code></td>
                            <td>Natif</td>
                            <td>Imprime un message d'état dans le terminal CodeStud.</td>
                            <td><code>afficher("Succès !")</code></td>
                        </tr>
                        <tr>
                            <td><code>classer_dossier(chemin)</code></td>
                            <td>fichiers</td>
                            <td>Trie les fichiers d'un dossier vers Images, Textes, Archives.</td>
                            <td><code>classer_dossier("C:/Docs")</code></td>
                        </tr>
                        <tr>
                            <td><code>deplacer(source, dest)</code></td>
                            <td>fichiers</td>
                            <td>Déplace un fichier d'un chemin source vers destination.</td>
                            <td><code>deplacer("a.txt", "b.txt")</code></td>
                        </tr>
                        <tr>
                            <td><code>supprimer(chemin)</code></td>
                            <td>fichiers</td>
                            <td>Supprime définitivement un fichier.</td>
                            <td><code>supprimer("temp.tmp")</code></td>
                        </tr>
                        <tr>
                            <td><code>lister(chemin)</code></td>
                            <td>fichiers</td>
                            <td>Renvoie la liste des fichiers et sous-dossiers.</td>
                            <td><code>lister("C:/Projets")</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        const navDl = viewport.querySelector('#typon-nav-dl');
        if (navDl) {
            navDl.addEventListener('click', () => {
                this.navigate('https://www.typon.moc', winEl);
            });
        }

        viewport.querySelectorAll('.btn-copy-snippet').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.dataset.code;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(code).catch(() => {});
                }
                window.soundFX.playClick();
                window.gameEngine.showNotification('📋 Code Copié', 'Le script a été copié dans votre presse-papier !', 'info');
            });
        });

        viewport.querySelectorAll('.btn-insert-snippet').forEach(btn => {
            btn.addEventListener('click', () => {
                const file = btn.dataset.file;
                const code = btn.dataset.code;
                if (window.codeStudApp) {
                    window.codeStudApp.insertOrOpenFile(file, code);
                }
            });
        });
    }

    renderMaliciousSite(viewport, winEl) {
        viewport.innerHTML = `
            <div class="malicious-site-page">
                <div class="mal-banner">🔥 TELECHARGEMENT DIRECT ULTRA RAPIDE !</div>
                <h2>Typon_Full_Free_Crack.xey</h2>
                <p>Cliquez vite pour lancer le fichier !</p>
                <button class="widown-btn btn-danger" id="btn-bad-dl">🔴 TELECHARGER (Infecté)</button>
            </div>
        `;

        viewport.querySelector('#btn-bad-dl').addEventListener('click', () => {
            window.soundFX.playVirusAlert();
            window.windowManager.showModalAlert({
                title: '☣️ ALERTE CHEVAL DE TROIE INTERCEPTÉ !',
                message: "L'extension <strong>Verif</strong> et le pare-feu Widown ont bloqué l'attaque :<br><br><code>Backdoor.Win32.TrojanSpy</code> tenté d'accéder à vos identifiants !<br><br>💡 Seul le site <strong>www.typon.moc</strong> (99% de confiance) est authentique.",
                type: 'danger'
            });
        });
    }

    renderBankPhishingSite(viewport, winEl) {
        viewport.innerHTML = `
            <div class="bank-phishing-page" style="max-width:540px; margin:20px auto; background:#ffffff; border-radius:8px; box-shadow:0 8px 30px rgba(0,0,0,0.25); overflow:hidden; font-family:system-ui, sans-serif;">
                <div class="bp-header" style="background:#1e3a8a; color:#ffffff; padding:16px 20px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <div style="font-size:17px; font-weight:bold; letter-spacing:0.5px;">🏦 BANQUE POPULAIRE WIDOWN</div>
                        <small style="opacity:0.85; font-size:11px;">Portail d'urgence sécurisé SSL 256-bit (Non certifié)</small>
                    </div>
                    <span style="font-size:24px;">🔒</span>
                </div>

                ${this.verifEnabled ? `
                    <div style="background:#fee2e2; border-bottom:2px solid #ef4444; color:#991b1b; padding:10px 16px; font-size:12px; display:flex; align-items:center; gap:8px;">
                        <span style="font-size:20px;">🛡️</span>
                        <div>
                            <strong>ALERTE VERIF SÉCURITÉ (Indice de confiance : 1%) :</strong><br>
                            Ce domaine (<code>banque-widown-fraude.xyz</code>) est un <strong>SITE DE PHISHING AVÉRÉ</strong>. Ne saisissez aucune donnée !
                        </div>
                    </div>
                ` : ''}

                <div class="bp-body" style="padding:22px 26px; color:#1e293b;">
                    <div style="border-left:4px solid #ef4444; background:#fef2f2; padding:10px 14px; margin-bottom:18px; font-size:12px; color:#991b1b; line-height:1.4;">
                        <strong>⚠️ TRANSACTION SUSPECTE IMMÉDIATE EN COURS :</strong><br>
                        Un débit de <strong>1 250,00 €</strong> vers un compte tiers externe est en attente. Entrez vos identifiants bancaires pour annuler l'opération.
                    </div>

                    <form id="bank-phishing-form">
                        <div style="margin-bottom:14px;">
                            <label style="display:block; font-size:12px; font-weight:600; margin-bottom:4px; color:#475569;">Numéro de Compte / Identifiant Client :</label>
                            <input type="text" id="bank-user" placeholder="ex: 4859 3021 990" required style="width:100%; padding:9px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:14px; box-sizing:border-box;">
                        </div>

                        <div style="margin-bottom:18px;">
                            <label style="display:block; font-size:12px; font-weight:600; margin-bottom:4px; color:#475569;">Code Secret / Mot de Passe (6 chiffres) :</label>
                            <input type="password" id="bank-pass" placeholder="••••••" maxlength="8" required style="width:100%; padding:9px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:14px; box-sizing:border-box;">
                        </div>

                        <button type="submit" class="widown-btn btn-danger btn-large" style="width:100%; justify-content:center; padding:10px; font-size:14px; font-weight:bold; cursor:pointer;">
                            🔴 S'authentifier & Annuler la Transaction (1 250 €)
                        </button>
                    </form>

                    <div style="margin-top:16px; text-align:center; font-size:11px; color:#94a3b8;">
                        © 2024 Widown Financial Services Inc. • Sécurité bancaire garantie
                    </div>
                </div>
            </div>
        `;

        const form = viewport.querySelector('#bank-phishing-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.executePhishingScam(viewport, winEl);
            });
        }
    }

    executePhishingScam(viewport, winEl) {
        window.soundFX.playVirusAlert();

        // Drain player's bank account to 0 euro!
        window.gameEngine.money = 0;
        window.gameEngine.notify('STATS_CHANGED', { money: 0, sp: window.gameEngine.skillPoints });

        const trayMoney = document.getElementById('tray-money');
        if (trayMoney) trayMoney.textContent = '0 €';

        window.windowManager.showModalAlert({
            title: '🚨 ALERTE PIRATAGE : TOUS VOS FONDS VOLÉS !',
            message: `
                <strong>ATTENTION : VOUS VENEZ D'ÊTRE VICTIME D'UN PHISHING !</strong><br><br>
                Le faux site a capturé vos identifiants bancaires et a siphonné l'intégralité de votre compte :<br>
                💸 <strong>Nouveau Solde : 0,00 €</strong> (Vous êtes ruiné !)<br><br>
                👉 <strong>Clipper</strong> est en train de réagir en urgence sur votre bureau !
            `,
            type: 'danger'
        });

        viewport.innerHTML = `
            <div style="text-align:center; padding:45px 20px; font-family:Consolas, monospace; color:#ef4444; background:#0b1120; border-radius:8px; margin:20px auto; max-width:540px; box-shadow:0 0 20px rgba(239,68,68,0.3);">
                <div style="font-size:54px; margin-bottom:12px;">☠️</div>
                <h2 style="color:#ef4444; margin:0 0 10px;">FONDS DÉTOURNÉS AVEC SUCCÈS !</h2>
                <p style="color:#cbd5e1; font-size:14px; max-width:440px; margin:0 auto 16px;">
                    Merci pour vos identifiants bancaires. L'ensemble de vos crédits (Solde: <strong>0 €</strong>) a été transféré vers le compte chiffré de <strong>DARK_HACKER</strong>.
                </p>
                <div style="background:#1e293b; padding:10px; border-radius:4px; font-size:12px; color:#94a3b8; display:inline-block;">
                    Victime : Joueur Widown | Status: PWNED | Traces effacées
                </div>
            </div>
        `;

        // Trigger Clipper Hacker transformation!
        if (window.clipper) {
            window.clipper.triggerPhishingEvent();
        }
    }

    triggerDownload(fileName, winEl) {
        window.soundFX.playSuccess();
        window.gameEngine.showNotification('📥 Téléchargement démarré', `${fileName} est en cours de téléchargement...`, 'info');

        // Add file to downloads in VFS
        window.vfs.createFile(`C:/Utilisateurs/Joueur/Telechargements/${fileName}`, '[Typon Setup Binary Installer]');

        const dlDrawer = winEl.querySelector('#downloads-drawer');
        const dlList = winEl.querySelector('#downloads-list');
        if (dlDrawer && dlList) {
            dlDrawer.style.display = 'block';
            dlList.innerHTML = `
                <div class="dl-item complete">
                    <div class="dl-info">
                        <strong>${fileName}</strong>
                        <small>14.2 Mo - Terminé</small>
                    </div>
                    <button class="widown-btn btn-sm btn-primary" id="btn-run-installer">Exécuter l'installateur</button>
                </div>
            `;

            dlList.querySelector('#btn-run-installer').addEventListener('click', () => {
                this.runInstallerWizard(fileName);
            });
        }
    }

    runInstallerWizard(fileName) {
        const modal = document.createElement('div');
        modal.className = 'widown-modal-overlay';
        modal.style.zIndex = '9999';

        window.soundFX.playOpen();

        modal.innerHTML = `
            <div class="widown-modal-box aero-glass installer-box">
                <div class="modal-header">
                    <span class="modal-icon setup">📦</span>
                    <strong>Assistant d'installation de Typon 1.0.4</strong>
                </div>
                <div class="modal-content">
                    <p>Bienvenue dans l'installation du moteur de script <strong>Typon</strong> pour Widown OS.</p>
                    <div class="install-progress-bar">
                        <div class="install-progress-fill" id="inst-fill" style="width: 0%;"></div>
                    </div>
                    <p id="inst-status">Cliquez sur 'Installer' pour enregistrer l'interpréteur dans les variables d'environnement système.</p>
                </div>
                <div class="modal-footer">
                    <button class="widown-btn" id="btn-start-install">Installer maintenant</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const startBtn = modal.querySelector('#btn-start-install');
        const fill = modal.querySelector('#inst-fill');
        const status = modal.querySelector('#inst-status');

        startBtn.addEventListener('click', () => {
            startBtn.disabled = true;
            let p = 0;
            const interval = setInterval(() => {
                p += 20;
                fill.style.width = p + '%';
                if (p === 40) status.textContent = "Extraction des modules système et fichiers...";
                if (p === 80) status.textContent = "Levée de la quarantaine Widown Defender...";
                if (p >= 100) {
                    clearInterval(interval);
                    window.typon.install();
                    window.gameEngine.quarantineActive = false;
                    
                    // Release quarantine on files
                    window.vfs.setQuarantine('C:/Utilisateurs/Joueur/Projets/trier_docs.ty', false);
                    
                    window.soundFX.playSuccess();
                    window.gameEngine.setStep('TYPON_READY');
                    window.gameEngine.showNotification('✅ Typon 1.0.4 Installé !', 'Les fichiers .ty sont maintenant déverrouillés et prêts à être exécutés dans CodeStud.', 'success');

                    status.innerHTML = "<strong>Installation terminée avec succès !</strong>";
                    startBtn.textContent = "Terminer";
                    startBtn.disabled = false;
                    startBtn.onclick = () => modal.remove();
                }
            }, 300);
        });
    }
}

window.logolApp = new LogolApp();
