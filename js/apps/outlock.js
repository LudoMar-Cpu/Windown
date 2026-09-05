// Outlock Email Client & Mission Manager with Reward Claiming System
class OutlockApp {
    constructor() {
        this.selectedEmailId = 'mail_papy_michel';
        this.emails = [
            {
                id: 'mail_papy_michel',
                contractId: 'cli_michel',
                sender: 'Papy Michel <michel.dupont@orange.wid>',
                subject: '👴 SOS Informatique : Perdu dans mes photos de vacances',
                date: 'Aujourd\'hui 09:15',
                read: false,
                isContract: true,
                contractStatus: 'non_accepte', // 'non_accepte', 'en_cours', 'a_reclamer', 'termine'
                protocolRequired: 'HS (Port 23)',
                rewardMoney: 200,
                rewardSP: 2,
                body: `
                    <h3>Demande d'intervention à distance - Papy Michel</h3>
                    <p>Bonjour mon petit,</p>
                    <p>Je n'arrive plus à retrouver mes photos de vacances car mon dossier est pollué par plein de fichiers bizarres qui finissent par <code>.tmp</code>.</p>
                    <p>Voici les coordonnées de ma machine pour vous connecter avec <strong>AnyWidown (Terminal HS)</strong> :</p>
                    <ul>
                        <li><strong>Adresse MAC :</strong> <code>00:1B:44:11:3A:B7</code></li>
                        <li><strong>Port :</strong> <code>23</code> (HS non sécurisé)</li>
                        <li><strong>Nom d'utilisateur :</strong> <code>michel</code></li>
                        <li><strong>Mot de passe :</strong> <code>papy1952</code></li>
                    </ul>
                    <p>Supprimez les fichiers <code>.tmp</code> avec la commande <code>rm</code> dans le dossier <code>Photos_Et_Poubelles</code> s'il vous plaît !</p>
                `
            },
            {
                id: 'mail_lucas_gamer',
                contractId: 'cli_lucas',
                sender: 'Lucas_Streamer <lucas@twitch-stream.wid>',
                subject: '🎮 Contrat : Nettoyage et script auto pour mes clips de jeu',
                date: 'Aujourd\'hui 09:30',
                read: false,
                isContract: true,
                contractStatus: 'non_accepte',
                protocolRequired: 'HS (Port 23)',
                rewardMoney: 450,
                rewardSP: 3,
                body: `
                    <h3>Contrat de Télémaintenance - Lucas Gamer</h3>
                    <p>Salut ! J'ai des dizaines de gigas de vidéos de stream et screenshots sur mon PC de jeu. J'aimerais que tu te connectes en HS pour nettoyer les fichiers temporaires et uploader un script d'organisation dans <code>/Scripts</code>.</p>
                    <ul>
                        <li><strong>Adresse MAC :</strong> <code>A4:83:E7:2B:9C:10</code></li>
                        <li><strong>Port :</strong> <code>23</code></li>
                        <li><strong>User :</strong> <code>lucas</code> / <strong>Pass :</strong> <code>fortnite2024</code></li>
                    </ul>
                `
            },
            {
                id: 'mail_sophie_bijoux',
                contractId: 'cli_sophie',
                sender: 'Sophie Bijoux <contact@sophie-creations.wid>',
                subject: '💍 Contrat Entreprise : Déploiement facturation sécurisée',
                date: 'Aujourd\'hui 09:45',
                read: false,
                isContract: true,
                contractStatus: 'non_accepte',
                protocolRequired: 'HSS (Port 22 Sécurisé)',
                rewardMoney: 800,
                rewardSP: 4,
                body: `
                    <h3>Mission Réseau Sécurisé HSS</h3>
                    <p>Bonjour,</p>
                    <p>Pour notre boutique de bijoux, nous avons besoin de déployer un script de facturation dans le dossier <code>/Securite</code>.</p>
                    <p>Cette intervention nécessite une connexion <strong>HSS chiffrée sur le port 22</strong> (déblocable dans TheTree.xey).</p>
                    <ul>
                        <li><strong>Adresse MAC :</strong> <code>5C:E9:1E:8F:D2:44</code></li>
                        <li><strong>Port :</strong> <code>22</code> (HSS)</li>
                        <li><strong>User :</strong> <code>sophie</code> / <strong>Pass :</strong> <code>bijoux77</code></li>
                    </ul>
                `
            },
            {
                id: 'mail_quest_01',
                sender: 'Cabinet Comptable Valex <direction@valex-compta.fr>',
                subject: '💼 MISSION LOCALE : Automatisation urgente du tri de Documents',
                date: 'Aujourd\'hui 09:00',
                read: false,
                isQuest: true,
                questType: 'SORT_DOCUMENTS',
                rewardMoney: 250,
                rewardSP: 3,
                claimed: false,
                body: `
                    <h3>Dossier Documents en désordre - Script Typon Requis</h3>
                    <p>Bonjour,</p>
                    <p>Notre dossier <strong>Documents</strong> local est saturé de fichiers en vrac. Créez un script Typon dans <strong>CodeStud</strong> pour tout ranger automatiquement dans leurs sous-dossiers (<code>PDF</code>, <code>Images</code>, <code>Archives</code>, <code>Textes</code>).</p>
                `
            },
            {
                id: 'mail_santeplus_netsim',
                contractId: 'cli_santeplus',
                sender: 'Dr. Vasseur - SantéPlus Clinique <direction@santeplus-clinique.wid>',
                subject: '🏥 Contrat Réseau : Dépannage Baie Brassage & Vidéosurveillance IP',
                date: '14/09/2014 11:20',
                read: false,
                isContract: true,
                isNetSimContract: true,
                contractStatus: 'non_accepte',
                protocolRequired: 'NetSim.xey (Simulateur Réseau Baie & CCTV)',
                rewardMoney: 1600,
                rewardSP: 6,
                body: `
                    <div style="background:#0369a1; color:#ffffff; padding:12px; border-radius:6px; margin-bottom:12px;">
                        <div style="font-size:14px; font-weight:bold;">🏥 CABINET MÉDICAL SANTÉPLUS - SERVICE SYSTÈMES & RÉSEAUX</div>
                        <small>Intervention d'infrastructure sous Windown 9</small>
                    </div>
                    <h3>Demande d'intervention d'urgence - Baie & Caméras</h3>
                    <p>Bonjour,</p>
                    <p>Depuis ce matin, notre cabinet médical est paralysé :</p>
                    <ul>
                        <li>Le <strong>Poste de Consultation du Docteur</strong> ne parvient plus à communiquer avec le <strong>Serveur Dossiers Patients</strong>.</li>
                        <li>La <strong>Caméra IP 2</strong> du sas des urgences n'émet plus aucun flux vers la salle de surveillance.</li>
                    </ul>
                    <p>Nous vous confions l'accès à notre simulateur d'infrastructure <strong>NetSim.xey</strong>. Vous devrez :</p>
                    <ol>
                        <li>Rebrancher les câbles réseau RJ45 déconnectés.</li>
                        <li>Corriger les configurations IP / Masque / Passerelle des postes en anomalie.</li>
                        <li>Tester les pings ICMP et valider le flux en direct des caméras de sécurité.</li>
                    </ol>
                    <div style="background:#eff6ff; border:1px solid #3b82f6; padding:10px; border-radius:6px; color:#1e40af; font-size:12px; margin:10px 0;">
                        🌐 <strong>Action requise :</strong> Acceptez ce contrat ci-dessous puis ouvrez <strong>NetSim.xey</strong> depuis votre bureau.
                    </div>
                `
            }
        ];
    }

    open() {
        const content = `
            <div class="outlock-container">
                <div class="outlock-toolbar">
                    <button class="outlock-btn" id="btn-new-mail">✉ Nouveau message</button>
                    <button class="outlock-btn" id="btn-refresh-mail">⟳ Actualiser</button>
                    <div class="outlock-search">
                        <input type="text" placeholder="Rechercher dans Outlock...">
                    </div>
                </div>

                <div class="outlock-main">
                    <div class="outlock-sidebar">
                        <div class="folder-tree">
                            <div class="folder-item active">📥 Boîte de réception <span class="badge-count" id="inbox-unread-count">3</span></div>
                            <div class="folder-item">📤 Messages envoyés</div>
                            <div class="folder-item">⭐ Missions & Contrats</div>
                            <div class="folder-item">🗑 Éléments supprimés</div>
                        </div>
                    </div>

                    <div class="outlock-email-list" id="outlock-email-list"></div>
                    <div class="outlock-email-view" id="outlock-email-view"></div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'outlock',
            title: 'Outlock 2024 - Messagerie & Contrats Clients',
            icon: 'outlock',
            width: 840,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });

        this.updateGlobalBadges();
    }

    initEvents(winEl) {
        this.renderEmailList(winEl);
        this.renderEmailView(winEl);

        winEl.querySelector('#btn-refresh-mail').addEventListener('click', () => {
            window.soundFX.playClick();
            this.renderEmailList(winEl);
            this.updateGlobalBadges();
        });
    }

    renderEmailList(winEl) {
        const listEl = winEl.querySelector('#outlock-email-list');
        if (!listEl) return;

        listEl.innerHTML = this.emails.map(email => {
            let statusTag = '';
            if (email.isContract) {
                if (email.contractStatus === 'termine') statusTag = '<span class="mail-badge done">✓ Terminé</span>';
                else if (email.contractStatus === 'a_reclamer') statusTag = '<span class="mail-badge claim-ready">💰 Récompense Prête !</span>';
                else if (email.contractStatus === 'en_cours') statusTag = '<span class="mail-badge active">● Contrat Actif</span>';
                else statusTag = '<span class="mail-badge pending">Contrat Disponible</span>';
            }
            return `
                <div class="email-item ${email.id === this.selectedEmailId ? 'selected' : ''} ${!email.read ? 'unread' : ''}" data-id="${email.id}">
                    <div class="email-sender">${email.sender.split('<')[0].trim()} ${statusTag}</div>
                    <div class="email-subject">${email.subject}</div>
                    <div class="email-date">${email.date}</div>
                </div>
            `;
        }).join('');

        listEl.querySelectorAll('.email-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                this.selectedEmailId = id;
                const email = this.emails.find(e => e.id === id);
                if (email && !email.read) {
                    email.read = true;
                    this.updateGlobalBadges();
                }
                this.renderEmailList(winEl);
                this.renderEmailView(winEl);
            });
        });

        this.updateGlobalBadges();
    }

    renderEmailView(winEl) {
        const viewEl = winEl.querySelector('#outlock-email-view');
        if (!viewEl) return;

        const email = this.emails.find(e => e.id === this.selectedEmailId);
        if (!email) {
            viewEl.innerHTML = '<div class="no-email-selected">Sélectionnez un message à lire.</div>';
            return;
        }

        let contractActionHtml = '';
        
        // Remote Contract States
        if (email.isContract) {
            if (email.contractStatus === 'termine') {
                contractActionHtml = `
                    <div class="quest-status-box success">
                        ✅ Contrat validé avec succès ! Récompense de <strong>${email.rewardMoney} €</strong> et <strong>${email.rewardSP} SP</strong> encaissée.
                    </div>
                `;
            } else if (email.contractStatus === 'a_reclamer') {
                contractActionHtml = `
                    <div class="quest-status-box ready" style="background:#f0fdf4; border:2px solid #22c55e;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                            <span style="color:#15803d; font-weight:bold; font-size:14px;">🎉 Objectif client accompli sur AnyWidown !</span>
                            <span class="cqc-reward" style="font-weight:bold; font-size:13px; color:#15803d;">💰 +${email.rewardMoney} € • ⚡ +${email.rewardSP} SP</span>
                        </div>
                        <p style="color:#166534; font-size:12px; margin-bottom:12px;">Le client a validé votre travail. Cliquez ci-dessous pour encaisser votre rémunération :</p>
                        <button class="widown-btn btn-success btn-large" id="btn-claim-contract-reward">
                            💰 Récupérer ma Récompense (+${email.rewardMoney} € & +${email.rewardSP} SP)
                        </button>
                    </div>
                `;
            } else if (email.contractStatus === 'en_cours') {
                if (email.isNetSimContract) {
                    contractActionHtml = `
                        <div class="quest-status-box ready">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <span style="color:#0284c7; font-weight:bold; font-size:13px;">🟢 Ce contrat d'infrastructure est ACTIF dans NetSim.xey</span>
                                <span class="cqc-reward" style="font-weight:bold;">💰 ${email.rewardMoney} € • ⚡ ${email.rewardSP} SP</span>
                            </div>
                            <button class="widown-btn btn-primary btn-large" id="btn-launch-netsim">
                                🌐 Lancer NetSim.xey (Simulateur Réseau SantéPlus)
                            </button>
                        </div>
                    `;
                } else {
                    contractActionHtml = `
                        <div class="quest-status-box ready">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <span style="color:#0284c7; font-weight:bold; font-size:13px;">🟢 Ce contrat est actuellement ACTIF dans AnyWidown</span>
                                <span class="cqc-reward" style="font-weight:bold;">💰 ${email.rewardMoney} € • ⚡ ${email.rewardSP} SP</span>
                            </div>
                            <button class="widown-btn btn-primary btn-large" id="btn-launch-anywidown">
                                🚀 Ouvrir AnyWidown pour vous connecter à ce client
                            </button>
                        </div>
                    `;
                }
            } else {
                contractActionHtml = `
                    <div class="quest-status-box pending">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                            <span>Protocole Requis : <strong>${email.protocolRequired}</strong></span>
                            <span class="cqc-reward" style="font-weight:bold;">💰 +${email.rewardMoney} € • ⚡ +${email.rewardSP} SP</span>
                        </div>
                        <button class="widown-btn btn-success btn-large" id="btn-accept-contract">
                            ✍️ Accepter & Démarrer ce Contrat
                        </button>
                    </div>
                `;
            }
        } else if (email.isQuest) {
            // Local quest
            const isSorted = window.vfs.checkDocumentsSorted();
            if (email.claimed) {
                contractActionHtml = `
                    <div class="quest-status-box success">
                        ✅ Mission locale validée ! Récompense encaissée.
                    </div>
                `;
            } else if (isSorted) {
                contractActionHtml = `
                    <div class="quest-status-box ready">
                        <p style="color:#15803d; font-weight:bold;">🎉 Tous les documents sont classés !</p>
                        <button class="widown-btn btn-success btn-large" id="btn-claim-quest">
                            💰 Valider et Encaisser (+${email.rewardMoney} € & +${email.rewardSP} SP)
                        </button>
                    </div>
                `;
            } else {
                contractActionHtml = `
                    <div class="quest-status-box pending">
                        <p>⏳ <em>Statut : En attente du tri dans C:/Utilisateurs/Joueur/Documents.</em></p>
                        <button class="widown-btn btn-primary" id="btn-goto-codestud">💻 Ouvrir CodeStud pour écrire le script</button>
                    </div>
                `;
            }
        } else if (email.isPhishing) {
            const hasAntiPhishing = window.theTreeApp && window.theTreeApp.isSkillUnlocked('skill_security_shield');
            if (email.isSpam) {
                contractActionHtml = `
                    <div class="quest-status-box success" style="background:#eff6ff; border:2px solid #3b82f6;">
                        🛡️ <strong>Message classé dans les Spams :</strong> Faux lien neutralisé par le Pare-Feu Anti-Phishing.
                        <div style="margin-top:10px;">
                            <button class="widown-btn btn-danger btn-sm" id="btn-open-phishing-anyway">
                                ☠️ Tendre un piège : Infiltrer la page du pirate
                            </button>
                        </div>
                    </div>
                `;
            } else if (hasAntiPhishing) {
                contractActionHtml = `
                    <div class="quest-status-box ready" style="background:#eff6ff; border:2px solid #3b82f6;">
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                            <span style="font-size:20px;">🛡️</span>
                            <strong style="color:#1d4ed8;">PARE-FEU ANTI-PHISHING ACTIF</strong>
                        </div>
                        <p style="color:#1e40af; font-size:12px; margin-bottom:10px;">
                            Votre module Pare-Feu a analysé le lien : l'adresse <code>banque-widown-fraude.xyz</code> est un <strong>faux site pirate non certifié</strong> ! Il s'agit d'une tentative d'hameçonnage visant à dérober vos identifiants.
                        </p>
                        <div style="display:flex; gap:10px;">
                            <button class="widown-btn btn-warning" id="btn-move-to-spam">
                                🛡️ Déplacer dans les Spams & Bloquer
                            </button>
                            <button class="widown-btn btn-danger" id="btn-open-phishing-anyway">
                                ⚠️ Ouvrir le lien quand même (Tendre un piège)
                            </button>
                        </div>
                    </div>
                `;
            } else {
                contractActionHtml = `
                    <div class="quest-status-box pending" style="background:#fffbeb; border:1px solid #f59e0b;">
                        <p style="color:#b45309; font-size:12px; margin-bottom:8px;">
                            ⚠️ <em>Astuce de sécurité : L'adresse semble suspecte. Vous pouvez débloquer le <strong>Pare-Feu Anti-Phishing</strong> dans TheTree.xey pour analyser et filtrer automatiquement ces menaces.</em>
                        </p>
                        <button class="widown-btn btn-primary" id="btn-open-phishing-direct">
                            🌐 Ouvrir le lien de contestation dans Logol Lhome
                        </button>
                    </div>
                `;
            }
        } else if (email.isRecruitmentOffer) {
            if (email.status === 'accepte') {
                contractActionHtml = `
                    <div class="quest-status-box success" style="background:#022c22; border:2px solid #10b981; color:#a7f3d0; padding:12px; border-radius:6px;">
                        ✔ <strong>Offre Acceptée :</strong> Vous faites officiellement partie de la firme Fortynite Sécurité !
                        <div style="font-size:12px; margin-top:6px;">
                            • Système : <strong>Windown 8 Entreprise</strong><br>
                            • Logiciel : <strong>FTNWork.xey</strong> installé sur le bureau<br>
                            • Assistant Clipper : <strong>Désactivé</strong> (Règlement de sécurité)
                        </div>
                    </div>
                `;
            } else if (email.status === 'refuse') {
                contractActionHtml = `
                    <div class="quest-status-box" style="background:#450a0a; border:2px solid #ef4444; color:#fca5a5; padding:12px; border-radius:6px;">
                        ❌ <strong>Offre Déclinée :</strong> Vous avez choisi de rester Développeur Freelance Indépendant.<br>
                        ⚠️ <em>Attention : Fortynite surveille désormais vos agissements sur le réseau.</em>
                    </div>
                `;
            } else {
                contractActionHtml = `
                    <div class="quest-status-box ready" style="background:#0f172a; border:2px solid #38bdf8; color:#f8fafc; padding:14px; border-radius:6px;">
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                            <span style="font-size:22px;">🛡️</span>
                            <strong style="color:#38bdf8; font-size:14px;">DÉCISION DE CARRIÈRE : EMBOUCHE FORTYNITE</strong>
                        </div>
                        <p style="font-size:12px; color:#cbd5e1; margin-bottom:12px;">
                            En acceptant cette offre, votre système passe automatiquement sous <strong>Windown 8 Entreprise</strong> (Clipper sera retiré pour conformité) et vous recevrez le logiciel <strong>FTNWork.xey</strong>.<br>
                            Si vous refusez, vous resterez freelance mais subirez la pression juridique de la firme.
                        </p>
                        <div style="display:flex; gap:10px; flex-wrap:wrap;">
                            <button class="widown-btn btn-success btn-large" id="btn-accept-fortynite">
                                💼 Accepter l'offre d'embauche (Passer en Windown 8)
                            </button>
                            <button class="widown-btn btn-danger btn-large" id="btn-refuse-fortynite">
                                ❌ Refuser l'offre (Rester Freelance)
                            </button>
                        </div>
                    </div>
                `;
            }
        } else if (email.isGovLitigation) {
            if (email.isLitigationPaid) {
                contractActionHtml = `
                    <div class="quest-status-box success" style="background:#022c22; border:2px solid #10b981; color:#a7f3d0; padding:12px; border-radius:6px;">
                        ✔ <strong>Litige Réglé :</strong> L'indemnité forfaitaire de 500,00 € a été versée. Le dossier contentieux auprès du pôle cyber-justice est définitivement clos.
                    </div>
                `;
            } else if (email.isSpammed) {
                contractActionHtml = `
                    <div class="quest-status-box danger" style="background:#450a0a; border:2px solid #ef4444; color:#fca5a5; padding:12px; border-radius:6px;">
                        ⚠️ <strong>Courriel classé dans les Spams :</strong><br>
                        Le Pare-Feu Anti-Phishing a déplacé cette mise en demeure dans les spams. Cependant, s'agissant d'un avis légal émis par les autorités, le délai de carence de <strong>3 jours</strong> court toujours ! En l'absence de paiement, une saisie majorée de <strong>650 €</strong> sera prélevée d'office.
                    </div>
                `;
            } else {
                contractActionHtml = `
                    <div class="quest-status-box danger" style="background:#450a0a; border:2px solid #ef4444; color:#fca5a5; padding:14px; border-radius:6px;">
                        <strong style="color:#f87171; font-size:14px;">⚖️ AVIS LÉGAL DE RECOUVREMENT FORFAITAIRE (500,00 €)</strong>
                        <p style="font-size:12px; margin:8px 0 12px 0; color:#fecaca;">
                            La société Fortynite a déposé une requête exécutoire pour rupture abusive des pourparlers. Vous disposez d'un délai légal de 3 jours pour régulariser.
                        </p>
                        <div style="display:flex; gap:10px; flex-wrap:wrap;">
                            <button class="widown-btn btn-danger" id="btn-pay-gov-litigation">
                                💳 Payer l'indemnité légale (500 €)
                            </button>
                            <button class="widown-btn btn-warning" id="btn-gov-to-spam">
                                🛡️ Mettre en Spam (Considérer comme arnaque)
                            </button>
                        </div>
                    </div>
                `;
            }
        }

        viewEl.innerHTML = `
            <div class="email-view-header">
                <h2 class="email-view-title">${email.subject}</h2>
                <div class="email-meta">
                    <div><strong>De :</strong> ${email.sender}</div>
                    <div><strong>Date :</strong> ${email.date}</div>
                </div>
            </div>
            <div class="email-view-body">
                ${email.body}
                ${contractActionHtml}
            </div>
        `;

        // Claim contract reward button
        const btnClaimContract = viewEl.querySelector('#btn-claim-contract-reward');
        if (btnClaimContract) {
            btnClaimContract.addEventListener('click', () => {
                email.contractStatus = 'termine';
                window.gameEngine.addReward(email.rewardMoney, email.rewardSP);
                window.soundFX.playSuccess();
                this.renderEmailList(winEl);
                this.renderEmailView(winEl);

                this.addCustomEmail({
                    id: `mail_client_congrats_${email.contractId}`,
                    sender: `${email.sender.split('<')[0].trim()} <contact@client.wid>`,
                    subject: `⭐ Merci pour votre travail exceptionnel !`,
                    body: `
                        <h3>Mission accomplie avec succès !</h3>
                        <p>Bonjour,</p>
                        <p>Je tiens à vous remercier chaleureusement pour votre intervention. Tout fonctionne parfaitement.</p>
                        <p>Votre rémunération de <strong>${email.rewardMoney} €</strong> et <strong>${email.rewardSP} SP</strong> a été créditée sur votre compte.</p>
                        <p>Bonne continuation pour vos futurs contrats !</p>
                    `
                });

                if (window.clipper) {
                    window.clipper.say(`🎉 Bravo ! Vous avez encaissé votre rémunération pour **${email.sender.split('<')[0].trim()}** ! Vous pouvez dépenser vos SP dans **TheTree.xey**.`);
                }

                // Check if contracts completed -> trigger bank phishing email!
                const completedContracts = this.emails.filter(e => e.isContract && e.contractStatus === 'termine');
                if (completedContracts.length >= 2 && !this.emails.some(e => e.id === 'mail_bank_phishing')) {
                    setTimeout(() => {
                        this.triggerBankPhishingEmail();
                    }, 1500);
                }
            });
        }

        // Phishing link & actions
        const openPhishingUrl = () => {
            if (window.logolApp) {
                window.logolApp.open();
                const browserWin = document.getElementById('win-logol');
                window.logolApp.navigate('https://connexion.banque-widown-fraude.xyz/espace-client', browserWin);
            }
        };

        const linkPhish = viewEl.querySelector('#link-phishing-bank');
        if (linkPhish) {
            linkPhish.addEventListener('click', (e) => {
                e.preventDefault();
                openPhishingUrl();
            });
        }

        const btnPhishDirect = viewEl.querySelector('#btn-open-phishing-direct');
        if (btnPhishDirect) {
            btnPhishDirect.addEventListener('click', () => {
                openPhishingUrl();
            });
        }

        const btnPhishAnyway = viewEl.querySelector('#btn-open-phishing-anyway');
        if (btnPhishAnyway) {
            btnPhishAnyway.addEventListener('click', () => {
                openPhishingUrl();
            });
        }

        const btnSpam = viewEl.querySelector('#btn-move-to-spam');
        if (btnSpam) {
            btnSpam.addEventListener('click', () => {
                email.isSpam = true;
                window.soundFX.playSuccess();
                window.gameEngine.showNotification('🛡️ Pare-Feu Anti-Phishing', 'Tentative de phishing neutralisée et mise en Spam !', 'success');
                if (window.clipper) {
                    window.clipper.say("🛡️ **Attaque bloquée !**\nTon Pare-Feu a déjoué le faux email de la banque !\nNotre réputation commence à attirer les grandes entreprises de cybersécurité...");
                }
                this.renderEmailView(winEl);

                // Player successfully neutralised phishing -> trigger Fortynite recruitment!
                setTimeout(() => {
                    this.triggerFortyniteRecruitmentEmail();
                }, 2000);
            });
        }

        // Fortynite Recruitment Choices
        const btnAcceptFortynite = viewEl.querySelector('#btn-accept-fortynite');
        if (btnAcceptFortynite) {
            btnAcceptFortynite.addEventListener('click', () => {
                email.status = 'accepte';
                window.gameEngine.isEmployedAtFortynite = true;
                window.gameEngine.upgradeOS(8);
                this.ensureFtnWorkShortcut();
                if (window.ftnWorkApp) window.ftnWorkApp.open();
                window.soundFX.playSuccess();
                window.gameEngine.showNotification('🏢 Embauche Fortynite Confirmée !', 'Vous êtes désormais Employé de bureau chez Fortynite. Logiciel FTNWork.xey déployé !', 'success');
                this.renderEmailList(winEl);
                this.renderEmailView(winEl);
            });
        }

        const btnRefuseFortynite = viewEl.querySelector('#btn-refuse-fortynite');
        if (btnRefuseFortynite) {
            btnRefuseFortynite.addEventListener('click', () => {
                email.status = 'refuse';
                window.gameEngine.fortyniteHostile = true;
                window.soundFX.playError();
                window.gameEngine.showNotification('❌ Offre Refusée', 'Vous continuez votre aventure en développeur freelance indépendant.', 'warning');
                this.renderEmailList(winEl);
                this.renderEmailView(winEl);

                // Company gets hostile and sues player + new freelance contract arrives
                setTimeout(() => {
                    this.triggerGovLitigationEmail();
                    this.triggerMaximeContractEmail();
                }, 2000);
            });
        }

        // Government Litigation Payment & Spam
        const btnPayLitigation = viewEl.querySelector('#btn-pay-gov-litigation');
        if (btnPayLitigation) {
            btnPayLitigation.addEventListener('click', () => {
                if (window.gameEngine.money < 500) {
                    alert("Fonds insuffisants pour régler l'indemnité de 500 € ! Réalisez d'autres contrats pour obtenir les fonds nécessaires.");
                    return;
                }
                email.isLitigationPaid = true;
                window.gameEngine.money -= 500;
                window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                window.soundFX.playSuccess();
                window.gameEngine.showNotification('💳 Règlement Exécuté', 'Indemnité de 500,00 € versée au pôle litiges cyber.', 'info');
                this.renderEmailView(winEl);
            });
        }

        const btnGovToSpam = viewEl.querySelector('#btn-gov-to-spam');
        if (btnGovToSpam) {
            btnGovToSpam.addEventListener('click', () => {
                email.isSpammed = true;
                window.soundFX.playWarning();
                window.gameEngine.showNotification('⚠️ Courriel Placé en Spam', 'Mise en demeure ignorée. Attention : délai de 3 jours avant saisie majorée !', 'warning');
                this.renderEmailView(winEl);

                // Simulated 3-day penalty countdown: 35 seconds
                setTimeout(() => {
                    if (!email.isLitigationPaid) {
                        const penalty = 650;
                        window.gameEngine.money = Math.max(0, window.gameEngine.money - penalty);
                        window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                        window.soundFX.playVirusAlert();
                        window.gameEngine.showNotification('🚨 SAISIE DU TRÉSOR PUBLIC', `Délai légal de 3 jours expiré ! Saisie d'office majorée : -${penalty} € prélevés !`, 'danger');
                        this.addCustomEmail({
                            id: 'mail_tresor_public_seizure',
                            sender: 'Direction Générale des Finances Publiques <recouvrement@tresor-public.wid>',
                            subject: '🚨 AVIS DE SAISIE FORCÉE : Prélèvement majoré de 650 € exécuté',
                            body: `
                                <h3>Avis d'exécution de saisie administrative</h3>
                                <p>Bonjour,</p>
                                <p>En l'absence de contestation ou de règlement sous le délai légal de 3 jours suite à la mise en demeure Fortynite (message placé en spam), un titre exécutoire de <strong>650,00 €</strong> (dont 150 € de majoration pour refus de réponse) a été prélevé d'office sur vos avoirs bancaires.</p>
                                <p>Le contentieux est désormais clos auprès des services de l'État.</p>
                            `
                        });
                    }
                }, 35000);
            });
        }

        // Accept contract button
        const btnAccept = viewEl.querySelector('#btn-accept-contract');
        if (btnAccept) {
            btnAccept.addEventListener('click', () => {
                this.emails.forEach(e => {
                    if (e.isContract && e.contractStatus === 'en_cours') {
                        e.contractStatus = 'non_accepte';
                    }
                });
                email.contractStatus = 'en_cours';
                window.gameEngine.setActiveContract(email.contractId);
                window.soundFX.playSuccess();
                window.gameEngine.showNotification('📜 Contrat Accepté !', `Vous suivez maintenant le contrat de ${email.sender.split('<')[0].trim()}. Ouvrez AnyWidown pour intervenir.`, 'success');
                
                this.renderEmailList(winEl);
                this.renderEmailView(winEl);

                if (email.isNetSimContract) {
                    if (window.netSimApp) window.netSimApp.open();
                } else if (window.anyWidownApp) {
                    window.anyWidownApp.open();
                }
            });
        }

        // Launch AnyWidown / NetSim
        const btnLaunch = viewEl.querySelector('#btn-launch-anywidown');
        if (btnLaunch) {
            btnLaunch.addEventListener('click', () => {
                window.gameEngine.setActiveContract(email.contractId);
                if (window.anyWidownApp) {
                    window.anyWidownApp.open();
                }
            });
        }

        const btnLaunchNetSim = viewEl.querySelector('#btn-launch-netsim');
        if (btnLaunchNetSim) {
            btnLaunchNetSim.addEventListener('click', () => {
                window.gameEngine.setActiveContract(email.contractId);
                if (window.netSimApp) {
                    window.netSimApp.open();
                }
            });
        }

        // Local quest buttons
        const btnGoto = viewEl.querySelector('#btn-goto-codestud');
        if (btnGoto) {
            btnGoto.addEventListener('click', () => {
                if (window.codeStudApp) window.codeStudApp.open();
            });
        }

        const btnClaim = viewEl.querySelector('#btn-claim-quest');
        if (btnClaim) {
            btnClaim.addEventListener('click', () => {
                email.claimed = true;
                window.gameEngine.addReward(email.rewardMoney, email.rewardSP);
                this.renderEmailView(winEl);

                this.addCustomEmail({
                    id: 'mail_valex_congrats',
                    sender: 'Cabinet Comptable Valex <direction@valex-compta.fr>',
                    subject: '🌟 Félicitations et remerciements pour votre script !',
                    body: `
                        <h3>Un travail remarquable !</h3>
                        <p>Bonjour,</p>
                        <p>Nous tenons à vous féliciter pour la qualité de votre script Typon. Tous nos fichiers ont été classés sans erreur !</p>
                        <p>Votre paiement de <strong>250 €</strong> et vos <strong>3 Points de Compétence (SP)</strong> ont bien été versés sur votre compte Widown.</p>
                        <p>Consultez vos emails pour accepter les contrats de vos clients (Papy Michel, Lucas...) et les réaliser sur <strong>AnyWidown</strong> !</p>
                    `
                });
            });
        }
    }

    triggerBankPhishingEmail() {
        if (this.emails.some(e => e.id === 'mail_bank_phishing')) return;
        this.addCustomEmail({
            id: 'mail_bank_phishing',
            sender: 'Banque Populaire Widown <alerte-fraude@banque-widown-secure.xyz>',
            subject: '🚨 URGENT : Débit suspect externe détecté - Contestation requise',
            isPhishing: true,
            body: `
                <div class="bank-mail-header" style="background:#1e3a8a; color:#ffffff; padding:12px; border-radius:6px; margin-bottom:14px;">
                    <div style="font-size:15px; font-weight:bold;">🏦 BANQUE POPULAIRE WIDOWN - CELLULE SÉCURITÉ</div>
                    <small>Centre de surveillance automatisé des flux financiers</small>
                </div>
                <h3>Avis d'opération débitrice anormale</h3>
                <p>Cher(e) client(e),</p>
                <p>Notre système de surveillance a détecté une transaction suspecte sortante d'un montant de <strong>1 250,00 €</strong> vers un prestataire étranger inconnu (<code>EXTERNAL_GATEWAY_OFFSHORE</code>).</p>
                <p>Si vous n'êtes <strong>PAS</strong> à l'origine de ce virement, vous devez immédiatement vous connecter à votre espace d'urgence pour contester et bloquer le transfert avant exécution définitive :</p>
                <div style="background:#fef2f2; border:2px dashed #ef4444; padding:12px; border-radius:6px; margin:14px 0; text-align:center;">
                    <span style="display:block; font-size:12px; color:#991b1b; margin-bottom:6px;">Lien d'authentification bancaire :</span>
                    <a href="#" class="phishing-external-link" id="link-phishing-bank" style="font-size:14px; font-weight:bold; color:#dc2626; word-break:break-all;">
                        🔗 https://connexion.banque-widown-fraude.xyz/espace-client
                    </a>
                </div>
                <p style="font-size:11px; color:#64748b;">En cas d'inactivité sous 1 heure, le débit de 1 250,00 € deviendra irréversible. Merci de votre réactivité.</p>
            `
        });
    }

    triggerFortyniteRecruitmentEmail() {
        if (this.emails.some(e => e.id === 'mail_fortynite_recruitment')) return;
        this.addCustomEmail({
            id: 'mail_fortynite_recruitment',
            sender: 'Fortynite Sécurité Globale <recrutement@fortynite-defense.wid>',
            subject: '🛡️ Proposition d\'Embauche : Rejoignez l\'élite Fortynite Sécurité',
            isRecruitmentOffer: true,
            status: 'en_attente',
            body: `
                <div style="background:#0f172a; color:#38bdf8; padding:12px; border-radius:6px; margin-bottom:14px; border:1px solid #1e293b;">
                    <div style="font-size:15px; font-weight:bold;">🛡️ FORTYNITE GLOBAL CYBER DEFENSE</div>
                    <small style="color:#94a3b8;">Division Recrutement de Talents en Automatisation & Cyberdéfense</small>
                </div>
                <h3>Proposition d'embauche - Poste d'Employé de Bureau</h3>
                <p>Cher(e) spécialiste,</p>
                <p>Nos sondes de surveillance ont constaté votre réactivité exemplaire face à la tentative de phishing bancaire récente. Votre maîtrise du pare-feu et des scripts Typon démontre un potentiel rare.</p>
                <p>Nous vous proposons d'intégrer immédiatement notre équipe d'élite en qualité d'<strong>Employé de bureau en cybersécurité et automatisation</strong>.</p>
                <div style="background:#1e293b; padding:12px; border-radius:6px; margin:12px 0; font-size:12px; line-height:1.6; color:#f1f5f9;">
                    • <strong>Logiciel exclusif :</strong> Mise à disposition immédiate de <code>FTNWork.xey</code> pour gérer les missions corporate.<br>
                    • <strong>Mise à niveau système :</strong> Passage automatique sous <strong>Windown 8 Entreprise</strong>.<br>
                    • <strong>Règlement intérieur :</strong> L'assistant Clipper sera désactivé pour respecter les normes de confidentialité.<br>
                    • <strong>Avantages :</strong> Progression rapide, primes substantielles et canal de discussion avec vos collègues experts.
                </div>
                <p>Faites votre choix ci-dessous :</p>
            `
        });
    }

    triggerGovLitigationEmail() {
        if (this.emails.some(e => e.id === 'mail_gov_litigation')) return;
        this.addCustomEmail({
            id: 'mail_gov_litigation',
            sender: 'Ministère de la Justice - Cellule Cyber-Contentieux <litige-cyber@justice-gouv.wid>',
            subject: '⚖️ NOTIFICATION OFFICIELLE : Mise en demeure Fortynite - Litige commercial 500,00 €',
            isGovLitigation: true,
            isLitigationPaid: false,
            isSpammed: false,
            body: `
                <div style="background:#1e293b; color:#ef4444; padding:12px; border-radius:6px; margin-bottom:14px; border-left:4px solid #dc2626;">
                    <div style="font-size:14px; font-weight:bold; color:#ffffff;">RÉPUBLIQUE WIDOWN - MINISTÈRE DE LA JUSTICE</div>
                    <small style="color:#cbd5e1;">Pôle Spécialisé des Litiges Numériques et Ruptures de Pourparlers</small>
                </div>
                <h3>Mise en demeure préalable avant saisie administrative</h3>
                <p>Madame, Monsieur,</p>
                <p>La société <strong>Fortynite Sécurité Globale</strong> a déposé un recours officiel à votre encontre pour rupture abusive et unilatérale de pourparlers d'embauche après communication d'informations sensibles.</p>
                <p>Une indemnité forfaitaire de compensation commerciale de <strong>500,00 €</strong> est exigible.</p>
                <div style="background:#fef2f2; border:1px dashed #ef4444; color:#991b1b; padding:10px; border-radius:6px; margin:12px 0; font-size:12px;">
                    ⚠️ <strong>Délai légal de réponse : 3 jours ouvrés.</strong><br>
                    En cas de refus, d'absence de règlement ou de mise en spam de cette notification officielle, une <strong>majoration de 150 €</strong> sera automatiquement appliquée et recouvrée par prélèvement d'office du Trésor Public (soit <strong>650,00 €</strong>).
                </div>
            `
        });
    }

    triggerMaximeContractEmail() {
        if (this.emails.some(e => e.id === 'mail_maxime_renov')) return;
        this.addCustomEmail({
            id: 'mail_maxime_renov',
            contractId: 'cli_maxime',
            sender: 'Maxime Rénovation Bâtiment <contact@maxime-renov.wid>',
            subject: '🔨 Nouveau Contrat Freelance : Automatisation Devis & Calcul TVA',
            isContract: true,
            contractStatus: 'non_accepte',
            protocolRequired: 'HSS (Port 22 Sécurisé)',
            rewardMoney: 1100,
            rewardSP: 5,
            body: `
                <h3>Mission : Script de Devis Automatisé pour Chantier</h3>
                <p>Bonjour,</p>
                <p>Je gère une entreprise de rénovation bâtiment. Nous perdons un temps précieux à calculer nos devis manuellement. J'ai besoin d'un script Typon nommé <code>calcul_devis.ty</code> à déployer dans mon dossier <code>/Comptabilite</code>.</p>
                <p>Le script doit déclarer les variables :</p>
                <ul>
                    <li><code>taux_tva = 0.20</code></li>
                    <li><code>montant_ht = 1500</code></li>
                    <li>Calculer <code>montant_tva = montant_ht * taux_tva</code></li>
                    <li>Calculer <code>montant_ttc = montant_ht + montant_tva</code></li>
                    <li>Afficher le détail dans la console.</li>
                </ul>
                <div style="background:#fffbeb; border:1px solid #f59e0b; padding:10px; border-radius:6px; color:#b45309; font-size:12px; margin:10px 0;">
                    ⚠️ <strong>Exigence stricte de vérification :</strong><br>
                    Je refuse catégoriquement qu'on déploie du code non certifié sur mes serveurs ! Vous devez impérativement <strong>exécuter et tester ce script dans CodeStud (touche F5)</strong> avant de tenter de l'uploader sur AnyWidown.
                </div>
                <ul>
                    <li><strong>Adresse MAC :</strong> <code>7A:44:B2:19:9C:33</code></li>
                    <li><strong>Port :</strong> <code>22</code> (HSS)</li>
                    <li><strong>User :</strong> <code>maxime</code> / <strong>Pass :</strong> <code>renov2024</code></li>
                </ul>
            `
        });
    }

    ensureFtnWorkShortcut() {
        const desktop = document.getElementById('desktop-icons');
        if (desktop && !desktop.querySelector('[data-app="ftnwork"]')) {
            const icon = document.createElement('div');
            icon.className = 'desktop-icon';
            icon.dataset.app = 'ftnwork';
            icon.title = 'FTNWork.xey - Plateforme Sécurisée Fortynite';
            icon.innerHTML = `
                <div class="icon-img">🛡️</div>
                <span class="icon-label">FTNWork.xey</span>
            `;
            icon.addEventListener('click', () => {
                if (window.ftnWorkApp) window.ftnWorkApp.open();
            });
            desktop.appendChild(icon);
        }
    }

    onQuestCompleted(type) {
        const quest = this.emails.find(e => e.questType === type);
        if (quest && !quest.claimed) {
            window.gameEngine.showNotification('📩 Notification Outlock', 'Valex Compta : Les documents sont triés ! Enaissez votre paiement dans Outlock.', 'success');
            const win = document.getElementById('win-outlock');
            if (win) this.renderEmailView(win);
        }
    }

    setContractReadyToClaim(contractId) {
        const email = this.emails.find(e => e.contractId === contractId);
        if (email && email.contractStatus !== 'termine') {
            email.contractStatus = 'a_reclamer';
            window.soundFX.playNotification();
            window.gameEngine.showNotification('💰 Récompense Disponible !', `Le contrat de ${email.sender.split('<')[0].trim()} est prêt à être encaissé dans Outlock !`, 'success');
            
            const win = document.getElementById('win-outlock');
            if (win) {
                this.renderEmailList(win);
                this.renderEmailView(win);
            }
        }
    }

    addCustomEmail(emailData) {
        if (this.emails.some(e => e.id === emailData.id)) return;
        this.emails.unshift({
            ...emailData,
            date: 'À l\'instant',
            read: false
        });

        window.soundFX.playNotification();
        window.gameEngine.showNotification('📩 Nouvel Email Outlock', `${emailData.subject}`, 'info');
        this.updateGlobalBadges();

        const win = document.getElementById('win-outlock');
        if (win) {
            this.renderEmailList(win);
        }
    }

    getUnreadCount() {
        return this.emails.filter(e => !e.read).length;
    }

    updateGlobalBadges() {
        const count = this.getUnreadCount();

        const desktopOutlock = document.querySelector('.desktop-icon[data-app="outlock"]');
        if (desktopOutlock) {
            let badge = desktopOutlock.querySelector('.icon-unread-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'icon-unread-badge';
                desktopOutlock.appendChild(badge);
            }
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }

        const taskbarOutlock = document.querySelector('.pinned-task-btn[data-app="outlock"]');
        if (taskbarOutlock) {
            let badge = taskbarOutlock.querySelector('.taskbar-unread-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'taskbar-unread-badge';
                taskbarOutlock.appendChild(badge);
            }
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }

        const inboxCount = document.querySelector('#inbox-unread-count');
        if (inboxCount) inboxCount.textContent = count;
    }
}

window.outlockApp = new OutlockApp();
