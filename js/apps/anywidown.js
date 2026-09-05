// AnyWidown - Remote Connection Client with Manual/Skill Autofill & Claim Reward Transition
class AnyWidownApp {
    constructor() {
        this.protocol = 'HS';
        this.activeSession = null;
        this.commandHistory = [];
        this.historyIndex = -1;

        this.clients = [
            {
                id: 'cli_michel',
                name: 'Papy Michel (Particulier)',
                avatar: '👴',
                mac: '00:1B:44:11:3A:B7',
                port: '23',
                user: 'michel',
                pass: 'papy1952',
                protocolRequired: 'HS',
                desc: 'Nettoyer le dossier "Photos_Et_Poubelles" des fichiers temporaires .tmp et retrouver les photos de famille.',
                rewardMoney: 200,
                rewardSP: 2,
                completed: false,
                fs: {
                    '/': [
                        { name: 'Photos_Et_Poubelles', type: 'dir' },
                        { name: 'Documents_Michel', type: 'dir' },
                        { name: 'Bureau', type: 'dir' }
                    ],
                    '/Photos_Et_Poubelles': [
                        { name: 'photo_plage_1998.jpg', type: 'file', size: '2.4 Mo' },
                        { name: 'anniversaire_lucie.png', type: 'file', size: '3.1 Mo' },
                        { name: 'cache_temp_01.tmp', type: 'file', size: '512 Ko' },
                        { name: 'cache_temp_02.tmp', type: 'file', size: '1.2 Mo' },
                        { name: 'virus_faux_guide.tmp', type: 'file', size: '840 Ko' },
                        { name: 'photo_chat.png', type: 'file', size: '1.8 Mo' }
                    ],
                    '/Documents_Michel': [
                        { name: 'recette_gateau.txt', type: 'file', size: '12 Ko' },
                        { name: 'facture_edf.pdf', type: 'file', size: '420 Ko' }
                    ]
                },
                goalCheck: (session) => {
                    const files = session.fs['/Photos_Et_Poubelles'] || [];
                    const hasTmp = files.some(f => f.name.endsWith('.tmp'));
                    return !hasTmp && files.length >= 2;
                }
            },
            {
                id: 'cli_lucas',
                name: 'Lucas (Jeune Streamer / Gamer)',
                avatar: '🎮',
                mac: 'A4:83:E7:2B:9C:10',
                port: '23',
                user: 'lucas',
                pass: 'fortnite2024',
                protocolRequired: 'HS',
                desc: 'Nettoyer les fichiers temporaires et uploader votre script local tri_clips.ty dans /Scripts pour ses 50 clips de jeu.',
                rewardMoney: 450,
                rewardSP: 3,
                completed: false,
                fs: {
                    '/': [
                        { name: 'Captures_Jeux', type: 'dir' },
                        { name: 'Scripts', type: 'dir' }
                    ],
                    '/Captures_Jeux': [
                        { name: 'clip_top1_sniper.mp4', type: 'file', size: '145.0 Mo' },
                        { name: 'screen_victoire.png', type: 'file', size: '4.2 Mo' },
                        { name: 'clip_fail_moment.mp4', type: 'file', size: '88.0 Mo' },
                        { name: 'screen_score.png', type: 'file', size: '3.5 Mo' },
                        { name: 'temp_render.tmp', type: 'file', size: '250.0 Mo' }
                    ],
                    '/Scripts': []
                },
                goalCheck: (session) => {
                    const scripts = session.fs['/Scripts'] || [];
                    const hasScript = scripts.some(f => f.name === 'tri_clips.ty');
                    const temp = (session.fs['/Captures_Jeux'] || []).some(f => f.name.endsWith('.tmp'));
                    return hasScript && !temp;
                }
            },
            {
                id: 'cli_sophie',
                name: 'Sophie (Mini-Entreprise Bijoux)',
                avatar: '💍',
                mac: '5C:E9:1E:8F:D2:44',
                port: '22',
                user: 'sophie',
                pass: 'bijoux77',
                protocolRequired: 'HSS',
                desc: 'Connexion sécurisée HSS pour déployer votre script local facturation.ty dans /Securite.',
                rewardMoney: 800,
                rewardSP: 4,
                completed: false,
                fs: {
                    '/': [
                        { name: 'Commandes_Clients', type: 'dir' },
                        { name: 'Factures', type: 'dir' },
                        { name: 'Securite', type: 'dir' }
                    ],
                    '/Commandes_Clients': [
                        { name: 'commande_101.txt', type: 'file', size: '14 Ko' },
                        { name: 'commande_102.txt', type: 'file', size: '18 Ko' }
                    ],
                    '/Factures': [],
                    '/Securite': []
                },
                goalCheck: (session) => {
                    const sec = session.fs['/Securite'] || [];
                    return sec.some(f => f.name === 'facturation.ty');
                }
            },
            {
                id: 'cli_maxime',
                name: 'Maxime (Artisan Rénovation Bâtiment)',
                avatar: '🔨',
                mac: '7A:44:B2:19:9C:33',
                port: '22',
                user: 'maxime',
                pass: 'renov2024',
                protocolRequired: 'HSS',
                desc: 'Déployer le script calcul_devis.ty testé localement dans /Comptabilite pour automatiser les devis et la TVA.',
                rewardMoney: 1100,
                rewardSP: 5,
                completed: false,
                fs: {
                    '/': [
                        { name: 'Chantiers_En_Cours', type: 'dir' },
                        { name: 'Comptabilite', type: 'dir' },
                        { name: 'Fournisseurs', type: 'dir' }
                    ],
                    '/Chantiers_En_Cours': [
                        { name: 'chantier_villa_bleue.txt', type: 'file', size: '25 Ko' },
                        { name: 'plans_electricite.pdf', type: 'file', size: '3.2 Mo' }
                    ],
                    '/Comptabilite': [],
                    '/Fournisseurs': [
                        { name: 'factures_materiaux.txt', type: 'file', size: '12 Ko' }
                    ]
                },
                goalCheck: (session) => {
                    const compta = session.fs['/Comptabilite'] || [];
                    return compta.some(f => f.name === 'calcul_devis.ty');
                }
            },
            {
                id: 'cli_dark_hacker',
                name: '☠️ DARK_HACKER (Serveur Clandestin)',
                avatar: '💀',
                mac: 'DE:AD:BE:EF:13:37',
                port: '22',
                user: 'admin',
                pass: 'hacked2024',
                protocolRequired: 'HSS',
                desc: 'Infiltrer le serveur du pirate, neutraliser counter_attack.bot dans /Defenses_Parefeu et téléverser recup_fonds.ty dans /Butin_Vols.',
                rewardMoney: 2750,
                rewardSP: 6,
                completed: false,
                isHackerMission: true,
                fs: {
                    '/': [
                        { name: 'Defenses_Parefeu', type: 'dir' },
                        { name: 'Butin_Vols', type: 'dir' },
                        { name: 'Scripts_Piratage', type: 'dir' }
                    ],
                    '/Defenses_Parefeu': [
                        { name: 'counter_attack.bot', type: 'file', size: '8.4 Mo' },
                        { name: 'firewall_rules.cfg', type: 'file', size: '12 Ko' }
                    ],
                    '/Butin_Vols': [
                        { name: 'fonds_joueur_stolen.dat', type: 'file', size: '1 250 €' },
                        { name: 'prime_hacker_bonus.dat', type: 'file', size: '1 500 €' }
                    ],
                    '/Scripts_Piratage': [
                        { name: 'trojan_spammer.sh', type: 'file', size: '45 Ko' },
                        { name: 'phishing_template.html', type: 'file', size: '18 Ko' }
                    ]
                },
                goalCheck: (session) => {
                    const def = session.fs['/Defenses_Parefeu'] || [];
                    const botDead = !def.some(f => f.name === 'counter_attack.bot');
                    const loot = session.fs['/Butin_Vols'] || [];
                    const hasRecup = loot.some(f => f.name === 'recup_fonds.ty');
                    return botDead && hasRecup;
                }
            }
        ];
    }

    open() {
        let activeId = window.gameEngine.activeContractId;
        if (!activeId && window.outlockApp) {
            const accepted = window.outlockApp.emails.find(e => e.isContract && (e.contractStatus === 'en_cours' || e.contractStatus === 'a_reclamer'));
            if (accepted) activeId = accepted.contractId;
        }

        const content = `
            <div class="anywidown-container">
                <div class="anywidown-toolbar">
                    <div class="connect-protocol-tabs">
                        <button class="proto-tab active" id="tab-proto-hs">Terminal HS (Port 23)</button>
                        <button class="proto-tab ${window.typon.libraries['reseau'] || (window.clipper && window.clipper.isHackerMode) ? '' : 'locked'}" id="tab-proto-hss">
                            ${window.typon.libraries['reseau'] || (window.clipper && window.clipper.isHackerMode) ? '🔒 HSS (Port 22 SSH)' : '🔒 HSS (Verrouillé)'}
                        </button>
                    </div>
                    <div class="connection-status" id="aw-status-tag">
                        <span class="status-indicator-dot"></span>
                        <span id="aw-status-text">Non connecté</span>
                    </div>
                </div>

                <div class="anywidown-main-layout">
                    <!-- Left Sidebar : Accepted contracts list -->
                    <div class="clients-sidebar">
                        <div class="sidebar-header">CONTRAT CLIENT SUIVI</div>
                        <div class="client-cards-list" id="aw-clients-list"></div>
                    </div>

                    <!-- Right Main Content Area -->
                    <div class="remote-content-area" id="aw-screen-view">
                        <!-- Connection Form Box -->
                        <div class="connection-form-box" id="aw-conn-form"></div>

                        <!-- Active Terminal Shell -->
                        <div class="remote-shell-container" id="aw-shell-container" style="display:none;">
                            <div class="shell-header-bar">
                                <span id="shell-title-info">⚡ Session HS Active</span>
                                <button class="widown-btn btn-sm btn-danger" id="btn-disconnect-shell">Déconnecter</button>
                            </div>
                            <div class="remote-shell-output" id="aw-shell-output"></div>
                            <div class="remote-shell-input-line">
                                <span class="shell-prompt" id="shell-prompt-text">michel@mac:~$ </span>
                                <input type="text" class="shell-input" id="shell-input-field" spellcheck="false" autocomplete="off">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'anywidown',
            title: 'AnyWidown - HyperShell (HS) & Télémaintenance Client',
            icon: 'remote',
            width: 880,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl, activeId)
        });
    }

    initEvents(winEl, initialContractId) {
        this.renderSidebarAndForm(winEl, initialContractId);

        const tabHs = winEl.querySelector('#tab-proto-hs');
        const tabHss = winEl.querySelector('#tab-proto-hss');

        tabHs.addEventListener('click', () => {
            this.protocol = 'HS';
            tabHs.classList.add('active');
            tabHss.classList.remove('active');
            const portInput = winEl.querySelector('#conn-port');
            if (portInput) portInput.value = '23';
        });

        tabHss.addEventListener('click', () => {
            const hasHss = window.typon.libraries['reseau'] || (window.clipper && window.clipper.isHackerMode);
            if (!hasHss) {
                window.soundFX.playError();
                window.windowManager.showModalAlert({
                    title: '🔒 Protocole HSS Verrouillé',
                    message: "Pour utiliser <strong>HSS</strong> (Port 22 SSH), vous devez débloquer le <strong>Module Typon.Réseau</strong> dans <strong>TheTree.xey</strong> !",
                    type: 'warning'
                });
                return;
            }
            this.protocol = 'HSS';
            tabHss.classList.add('active');
            tabHs.classList.remove('active');
            const portInput = winEl.querySelector('#conn-port');
            if (portInput) portInput.value = '22';
        });

        winEl.querySelector('#btn-disconnect-shell').addEventListener('click', () => {
            this.disconnect(winEl);
        });
    }

    renderSidebarAndForm(winEl, activeContractId) {
        const listEl = winEl.querySelector('#aw-clients-list');
        const formBox = winEl.querySelector('#aw-conn-form');
        if (!listEl || !formBox) return;

        let acceptedMails = [];
        if (window.outlockApp) {
            acceptedMails = window.outlockApp.emails.filter(e => e.isContract && (e.contractStatus === 'en_cours' || e.contractStatus === 'a_reclamer' || e.contractStatus === 'termine'));
        }

        let targetClients = this.clients.filter(c => 
            acceptedMails.some(m => m.contractId === c.id) || 
            c.id === activeContractId ||
            (c.isHackerMission && window.clipper && window.clipper.isHackerMode)
        );

        if (window.clipper && window.clipper.isHackerMode && (!activeContractId || activeContractId !== 'cli_dark_hacker')) {
            const hackerTarget = targetClients.find(c => c.id === 'cli_dark_hacker');
            if (hackerTarget && !activeContractId) activeContractId = 'cli_dark_hacker';
        }

        if (targetClients.length === 0) {
            listEl.innerHTML = `
                <div style="padding:10px; font-size:11px; color:#94a3b8; text-align:center;">
                    <em>Aucun contrat accepté pour l'instant.</em>
                </div>
            `;

            formBox.innerHTML = `
                <div class="no-contract-warning">
                    <div style="font-size:42px; margin-bottom:12px;">📋</div>
                    <h3>Aucun Contrat Client Sélectionné</h3>
                    <p style="color:#94a3b8; font-size:13px; max-width:440px; margin:0 auto 18px; line-height:1.5;">
                        Pour intervenir sur la machine d'un client (Papy Michel, Lucas Streamer, Sophie...), vous devez d'abord <strong>accepter son contrat dans Outlock</strong>.
                    </p>
                    <button class="widown-btn btn-primary btn-large" id="btn-open-outlock-from-aw">
                        ✉️ Ouvrir Outlock pour Accepter un Contrat
                    </button>
                </div>
            `;

            const btnOutlock = formBox.querySelector('#btn-open-outlock-from-aw');
            if (btnOutlock) {
                btnOutlock.addEventListener('click', () => {
                    if (window.outlockApp) window.outlockApp.open();
                });
            }
            return;
        }

        const currentClient = targetClients.find(c => c.id === activeContractId) || targetClients[0];

        listEl.innerHTML = targetClients.map(c => `
            <div class="client-quick-card ${c.id === currentClient.id ? 'active' : ''} ${c.completed ? 'termine' : ''}" data-id="${c.id}">
                <div class="cqc-header">
                    <span>${c.avatar} <strong>${c.name}</strong></span>
                    <span class="cqc-badge ${c.completed ? 'termine' : ''}">${c.completed ? 'TERMINÉ' : 'EN COURS'}</span>
                </div>
                <div class="cqc-ip">MAC: <code>${c.mac}</code> (Port ${c.port})</div>
                <div class="cqc-desc">${c.desc}</div>
                <div class="cqc-reward">💰 +${c.rewardMoney} € • ⚡ +${c.rewardSP} SP</div>
            </div>
        `).join('');

        // Check if player has the Autofill skill unlocked in TheTree
        const hasAutofillSkill = window.theTreeApp && window.theTreeApp.isSkillUnlocked('skill_autofill');

        const initialMac = hasAutofillSkill ? currentClient.mac : '';
        const initialPort = hasAutofillSkill ? currentClient.port : (currentClient.protocolRequired === 'HSS' ? '22' : '23');
        const initialUser = hasAutofillSkill ? currentClient.user : '';
        const initialPass = hasAutofillSkill ? currentClient.pass : '';

        formBox.innerHTML = `
            <div class="active-contract-banner">
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:28px;">${currentClient.avatar}</span>
                    <div style="flex:1;">
                        <h3 style="color:#38bdf8; margin-bottom:2px;">Contrat en cours : ${currentClient.name}</h3>
                        <p style="color:#cbd5e1; font-size:12px;">${currentClient.desc}</p>
                    </div>
                    ${!hasAutofillSkill ? `
                        <div class="autofill-hint-badge" title="Déblocable pour 2 SP dans TheTree.xey">
                            🔒 Remplissage manuel (Autofill à débloquer dans TheTree pour 2 SP)
                        </div>
                    ` : `
                        <div class="autofill-hint-badge active">
                            ⚡ Autofill Actif
                        </div>
                    `}
                </div>
            </div>

            <div class="form-grid" style="margin-top:10px;">
                <div class="form-group">
                    <label>Adresse MAC Cible :</label>
                    <input type="text" id="conn-mac" value="${initialMac}" placeholder="ex: 00:1B:44:11:3A:B7">
                </div>
                <div class="form-group">
                    <label>Port :</label>
                    <input type="text" id="conn-port" value="${initialPort}" placeholder="23">
                </div>
                <div class="form-group">
                    <label>Nom d'utilisateur :</label>
                    <input type="text" id="conn-user" value="${initialUser}" placeholder="ex: michel">
                </div>
                <div class="form-group">
                    <label>Mot de passe :</label>
                    <input type="password" id="conn-pass" value="${initialPass}" placeholder="••••••••">
                </div>
            </div>

            <div style="margin-top:14px; display:flex; gap:12px;">
                <button class="widown-btn btn-success btn-large" id="btn-do-connect">
                    🔌 Établir la Connexion ${currentClient.protocolRequired}
                </button>
            </div>
        `;

        formBox.querySelector('#btn-do-connect').addEventListener('click', () => {
            const mac = formBox.querySelector('#conn-mac').value.trim();
            const port = formBox.querySelector('#conn-port').value.trim();
            const user = formBox.querySelector('#conn-user').value.trim();
            const pass = formBox.querySelector('#conn-pass').value.trim();

            this.attemptConnection({ mac, port, user, pass }, winEl);
        });

        listEl.querySelectorAll('.client-quick-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                window.gameEngine.setActiveContract(id);
                this.renderSidebarAndForm(winEl, id);
            });
        });
    }

    attemptConnection(creds, winEl) {
        const client = this.clients.find(c => 
            c.mac.toLowerCase() === creds.mac.toLowerCase() &&
            c.user === creds.user &&
            c.pass === creds.pass
        );

        if (!client) {
            window.soundFX.playError();
            window.windowManager.showModalAlert({
                title: '❌ Échec de la connexion',
                message: "Identifiants ou adresse MAC incorrects ! Consultez votre email Outlock pour recopier les informations.",
                type: 'danger'
            });
            return;
        }

        if (client.protocolRequired === 'HSS' && this.protocol !== 'HSS') {
            window.soundFX.playError();
            window.windowManager.showModalAlert({
                title: '⚠️ Port Refusé par le Serveur',
                message: `Ce client exige une connexion chiffrée <strong>HSS</strong> sur le port 22 ! Activez l'onglet HSS en haut.`,
                type: 'warning'
            });
            return;
        }

        window.soundFX.playSuccess();
        this.activeSession = {
            client,
            currentPath: '/',
            fs: JSON.parse(JSON.stringify(client.fs))
        };
        this.commandHistory = [];
        this.historyIndex = -1;

        const formBox = winEl.querySelector('#aw-conn-form');
        const shellBox = winEl.querySelector('#aw-shell-container');
        const output = winEl.querySelector('#aw-shell-output');
        const promptEl = winEl.querySelector('#shell-prompt-text');
        const input = winEl.querySelector('#shell-input-field');
        const statusText = winEl.querySelector('#aw-status-text');
        const statusTag = winEl.querySelector('#aw-status-tag');
        const titleInfo = winEl.querySelector('#shell-title-info');

        formBox.style.display = 'none';
        shellBox.style.display = 'flex';
        statusText.textContent = `Connecté à ${client.user}@${client.mac}`;
        statusTag.className = 'connection-status connected';
        titleInfo.textContent = `⚡ Session ${this.protocol} Active : ${client.name} (${client.mac})`;

        promptEl.textContent = `${client.user}@${client.mac.slice(0, 8)}:/$ `;
        if (client.id === 'cli_dark_hacker') {
            output.innerHTML = `
                <div class="term-line error" style="font-weight:bold; font-size:13px; color:#ff4466;">
                    ☠️ ==================================================== ☠️<br>
                    INFILTRATION RÉUSSIE DU SERVEUR CLANDESTIN DARK_HACKER<br>
                    ☠️ ==================================================== ☠️
                </div>
                <div class="term-line error" style="background:#450a0a; color:#fca5a5; padding:8px; border-left:4px solid #ef4444; margin:6px 0;">
                    ⚠️ [ALERTE CONTRE-ATTAQUE ACTIVE] Le pirate tente de vous expulser !<br>
                    Son processus de défense '<strong>counter_attack.bot</strong>' est actif dans <code>/Defenses_Parefeu</code>.<br>
                    👉 <strong>Étape 1 :</strong> Entrez dans <code>cd Defenses_Parefeu</code> et détruisez-le avec <code>rm counter_attack.bot</code> !<br>
                    👉 <strong>Étape 2 :</strong> Créez <code>recup_fonds.ty</code> dans CodeStud, puis entrez dans <code>cd /Butin_Vols</code> et tapez <code>upload recup_fonds.ty</code> pour récupérer vos 1 250 € et la prime !
                </div>
            `;
        } else {
            output.innerHTML = `
                <div class="term-line success">=== Session ${this.protocol} Connectée avec Succès ===</div>
                <div class="term-line info">Hôte distant : ${client.name} [MAC: ${client.mac}] (Port ${client.port})</div>
                <div class="term-line info">Tapez <strong>help</strong> pour la liste des commandes shell (ls, cd, rm, cat, upload, status, exit).</div>
                <div class="term-line stdout">Cahier des charges du client : ${client.desc}</div>
                <br>
            `;
        }

        input.value = '';
        input.focus();

        if (window.clipper) {
            window.clipper.sayForClient(client);
        }

        input.onkeydown = (e) => {
            const hasHistorySkill = window.theTreeApp && window.theTreeApp.isSkillUnlocked('skill_history');

            if (e.key === 'ArrowUp') {
                if (hasHistorySkill && this.commandHistory.length > 0) {
                    e.preventDefault();
                    if (this.historyIndex > 0) this.historyIndex--;
                    else this.historyIndex = this.commandHistory.length - 1;
                    input.value = this.commandHistory[this.historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                if (hasHistorySkill && this.commandHistory.length > 0) {
                    e.preventDefault();
                    if (this.historyIndex < this.commandHistory.length - 1) {
                        this.historyIndex++;
                        input.value = this.commandHistory[this.historyIndex] || '';
                    } else {
                        this.historyIndex = -1;
                        input.value = '';
                    }
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.handleTabCompletion(input);
            } else if (e.key === 'Enter') {
                const cmd = input.value.trim();
                input.value = '';
                if (cmd) {
                    this.commandHistory.push(cmd);
                    this.historyIndex = this.commandHistory.length;
                    this.handleShellCommand(cmd, output, promptEl, winEl);
                }
            }
        };
    }

    handleTabCompletion(input) {
        const val = input.value;
        const commands = ['ls', 'cd', 'cat', 'rm', 'upload', 'status', 'clear', 'help', 'exit'];
        
        if (!val.includes(' ')) {
            const match = commands.find(c => c.startsWith(val.toLowerCase()));
            if (match) {
                input.value = match + ' ';
                window.soundFX.playClick();
                return;
            }
        }

        const parts = val.split(' ');
        if (parts.length >= 2) {
            const prefix = parts[1].toLowerCase();
            const session = this.activeSession;
            if (session) {
                const items = session.fs[session.currentPath] || [];
                const match = items.find(i => i.name.toLowerCase().startsWith(prefix));
                if (match) {
                    input.value = `${parts[0]} ${match.name}`;
                    window.soundFX.playClick();
                }
            }
        }
    }

    handleShellCommand(cmd, output, promptEl, winEl) {
        const session = this.activeSession;
        if (!session) return;

        const line = document.createElement('div');
        line.className = 'shell-history-line';
        line.innerHTML = `<span class="shell-prompt">${promptEl.textContent}</span> <span>${cmd}</span>`;
        output.appendChild(line);

        const parts = cmd.split(' ').filter(Boolean);
        const action = parts[0].toLowerCase();

        switch (action) {
            case 'help':
                output.innerHTML += `
<div class="term-line info">
COMMANDES HYPERSHELL :<br>
  <strong>ls</strong>              : Liste les fichiers et dossiers (avec tailles réelles).<br>
  <strong>cd &lt;dossier&gt;</strong>     : Entre dans un dossier (ou 'cd ..' pour remonter).<br>
  <strong>cat &lt;fichier&gt;</strong>    : Affiche le contenu d'un fichier.<br>
  <strong>rm &lt;fichier&gt;</strong>     : Supprime un fichier temporaire parasite (.tmp).<br>
  <strong>upload &lt;nom.ty&gt;</strong>  : Téléverse un script d'automatisation sur la machine cliente.<br>
  <strong>status</strong>          : Vérifie si l'objectif du contrat est validé.<br>
  <strong>clear</strong>           : Nettoie l'écran du terminal.<br>
  <strong>exit</strong>            : Ferme la session distante.
</div>`;
                break;

            case 'clear':
            case 'cls':
                output.innerHTML = '';
                return;

            case 'ls':
            case 'dir':
                const cur = session.fs[session.currentPath] || [];
                let outStr = `<div class="term-line">Contenu de <strong>${session.currentPath}</strong> :<br>`;
                if (cur.length === 0) {
                    outStr += `  <em>(Dossier vide)</em><br>`;
                } else {
                    cur.forEach(item => {
                        if (item.type === 'dir') {
                            outStr += `  📁 <strong>[DIR]</strong>  ${item.name}/<br>`;
                        } else {
                            outStr += `  📄 <strong>[FILE]</strong> ${item.name.padEnd(26, ' ')} <span style="color:#38bdf8;">${item.size || '1.0 Ko'}</span><br>`;
                        }
                    });
                }
                outStr += `</div>`;
                output.innerHTML += outStr;
                break;

            case 'cd':
                const target = parts[1] || '';
                if (target === '..' || target === '/') {
                    session.currentPath = '/';
                } else if (target.startsWith('/')) {
                    if (session.fs[target]) session.currentPath = target;
                    else output.innerHTML += `<div class="term-line error">Répertoire introuvable : ${target}</div>`;
                } else {
                    const newP = `${session.currentPath === '/' ? '' : session.currentPath}/${target}`;
                    if (session.fs[newP]) session.currentPath = newP;
                    else output.innerHTML += `<div class="term-line error">Répertoire introuvable : ${target}</div>`;
                }
                promptEl.textContent = `${session.client.user}@${session.client.mac.slice(0, 8)}:${session.currentPath}$ `;
                break;

            case 'rm':
                const fileToDel = parts[1];
                if (!fileToDel) {
                    output.innerHTML += `<div class="term-line error">Usage : rm &lt;nom_fichier&gt; (ex: rm cache_temp_01.tmp)</div>`;
                    break;
                }
                const curList = session.fs[session.currentPath] || [];
                const idx = curList.findIndex(f => f.name === fileToDel);
                if (idx !== -1) {
                    const removed = curList.splice(idx, 1)[0];
                    output.innerHTML += `<div class="term-line success">✓ Fichier '${fileToDel}' (${removed.size || ''}) supprimé avec succès.</div>`;
                    window.soundFX.playClick();
                } else {
                    output.innerHTML += `<div class="term-line error">Fichier '${fileToDel}' introuvable dans ${session.currentPath}.</div>`;
                }
                break;

            case 'upload':
                const rawPath = parts[1];
                if (!rawPath) {
                    output.innerHTML += `<div class="term-line error">Usage : upload &lt;nom_ou_chemin_script.ty&gt; (ex: upload tri_clips.ty ou upload C:/Utilisateurs/Joueur/Projets/tri_clips.ty)</div>`;
                    break;
                }

                // Check local file in VFS
                let localFile = null;
                let resolvedLocalPath = '';
                const candidates = [
                    rawPath,
                    `C:/Utilisateurs/Joueur/Projets/${rawPath}`,
                    `C:/Utilisateurs/Joueur/Projets/${rawPath}.ty`,
                    `C:/Utilisateurs/Joueur/${rawPath}`,
                    `C:/Utilisateurs/Joueur/Bureau/${rawPath}`
                ];

                for (let cPath of candidates) {
                    const res = window.vfs.readFile(cPath);
                    if (res && res.success) {
                        localFile = res;
                        resolvedLocalPath = cPath;
                        break;
                    }
                }

                if (!localFile) {
                    output.innerHTML += `
<div class="term-line error">
❌ ÉCHEC DU TÉLÉVERSEMENT : Le fichier local '<strong>${rawPath}</strong>' est introuvable sur votre poste !<br>
💡 <strong>Consigne :</strong> Vous devez d'abord créer et enregistrer ce script dans <strong>CodeStud</strong> (dossier <code>C:/Utilisateurs/Joueur/Projets/</code>) avant de pouvoir l'uploader sur la machine distante.
</div>`;
                    window.soundFX.playError();
                    break;
                }

                // MANDATORY SCRIPT VALIDATION CHECK: The player must test the script in CodeStud first!
                if (resolvedLocalPath.endsWith('.ty') && session.client.id !== 'cli_dark_hacker') {
                    if (!window.vfs.isScriptTested(resolvedLocalPath)) {
                        output.innerHTML += `
<div class="term-line error" style="background:rgba(220, 38, 38, 0.15); border:1px solid #ef4444; padding:10px; border-radius:4px; margin:8px 0;">
❌ <strong>REFUS DU CLIENT : Script non testé localement !</strong><br>
💬 <strong>${session.client.name.split('(')[0].trim()} s'insurge :</strong><br>
<em>"Attendez une minute ! Vous essayez d'injecter un script directement sur mon système sans même l'avoir exécuté et testé une seule fois sur votre propre machine ? Hors de question que je prenne le risque d'un plantage ou de bugs de calcul !"</em><br><br>
👉 <strong>Obligation professionnelle :</strong> Ouvrez <strong>CodeStud</strong>, sélectionnez <code>${resolvedLocalPath.split('/').pop()}</code> et appuyez sur <strong>F5</strong> (ou cliquez sur <strong>▶ Exécuter</strong>). Dès qu'il s'exécute sans erreur, revenez ici pour retaper la commande <code>upload</code>.
</div>`;
                        window.soundFX.playError();
                        window.gameEngine.showNotification('❌ Déploiement Rejeté', 'Le client refuse un script non testé ! Exécutez-le dans CodeStud (F5).', 'danger');
                        break;
                    }
                }

                const fileName = resolvedLocalPath.split('/').pop();
                if (!session.fs[session.currentPath]) session.fs[session.currentPath] = [];
                session.fs[session.currentPath].push({ 
                    name: fileName, 
                    type: 'file', 
                    size: localFile.size || '2.4 Ko',
                    content: localFile.content || ''
                });

                output.innerHTML += `<div class="term-line success">🚀 Déploiement réussi : '${fileName}' (${localFile.size || '2.4 Ko'}) certifié testé et téléversé avec succès !</div>`;
                window.soundFX.playSuccess();

                // Specific warnings / guidance per client
                if (session.client.id === 'cli_lucas') {
                    if (session.currentPath !== '/Scripts') {
                        output.innerHTML += `<div class="term-line stdout" style="color:#f59e0b;">⚠️ Note : Lucas a demandé de déposer le script dans <strong>/Scripts</strong>. Tapez 'cd /Scripts' puis réessayez l'upload.</div>`;
                    }
                } else if (session.client.id === 'cli_sophie') {
                    if (session.currentPath !== '/Securite') {
                        output.innerHTML += `<div class="term-line stdout" style="color:#f59e0b;">⚠️ Note : Sophie a demandé de déployer le script dans <strong>/Securite</strong>. Tapez 'cd /Securite' puis réessayez l'upload.</div>`;
                    }
                } else if (session.client.id === 'cli_maxime') {
                    if (session.currentPath !== '/Comptabilite') {
                        output.innerHTML += `<div class="term-line stdout" style="color:#f59e0b;">⚠️ Note : Maxime a demandé d'installer 'calcul_devis.ty' dans <strong>/Comptabilite</strong>. Tapez 'cd /Comptabilite' puis réessayez l'upload.</div>`;
                    }
                } else if (session.client.id === 'cli_dark_hacker') {
                    if (session.currentPath !== '/Butin_Vols') {
                        output.innerHTML += `<div class="term-line stdout" style="color:#f59e0b;">⚠️ Note : Pour récupérer les fonds, déposez 'recup_fonds.ty' dans <strong>/Butin_Vols</strong> ! Tapez 'cd /Butin_Vols'.</div>`;
                    }
                }
                break;

            case 'status':
                if (session.client.goalCheck(session)) {
                    this.completeClientMission(session.client, winEl);
                } else {
                    output.innerHTML += `<div class="term-line stdout">⏳ Objectif en cours. Cahier des charges : ${session.client.desc}</div>`;
                }
                break;

            case 'exit':
                this.disconnect(winEl);
                return;

            default:
                output.innerHTML += `<div class="term-line error">'${action}' n'est pas reconnu. Tapez <strong>help</strong>.</div>`;
                break;
        }

        if (!session.client.completed && session.client.goalCheck(session)) {
            this.completeClientMission(session.client, winEl);
        }

        output.scrollTop = output.scrollHeight;
    }

    completeClientMission(client, winEl) {
        if (client.completed) return;
        client.completed = true;
        window.soundFX.playSuccess();

        if (client.id === 'cli_dark_hacker') {
            window.gameEngine.money = 2750;
            window.gameEngine.skillPoints += 6;
            window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
            
            if (window.clipper) {
                window.clipper.deactivateHackerMode();
            }

            if (window.outlockApp) {
                window.outlockApp.addCustomEmail({
                    id: 'mail_police_cyber',
                    sender: 'Brigade Cyber-Police Widown <brigade@securite-widown.gouv>',
                    subject: '🎖️ Dossier Classé : Neutralisation officielle de DARK_HACKER',
                    body: `
                        <h3>Affaire Terminée - Saisie du Réseau Clandestin</h3>
                        <p>Bonjour agent,</p>
                        <p>Grâce à votre intrusion chirurgicale et à l'élimination de <code>counter_attack.bot</code>, le pirate <strong>DARK_HACKER</strong> a été neutralisé !</p>
                        <p>Vos <strong>1 250 €</strong> dérobés ont été restitués intégralement, accompagnés d'une <strong>Prime de Cyber-Sécurité de 1 500 €</strong> et de <strong>6 Points de Compétence (SP)</strong>.</p>
                        <p>Widown OS et Clipper vous remercient pour ce tour de force !</p>
                    `
                });
            }

            const output = winEl.querySelector('#aw-shell-output');
            if (output) {
                output.innerHTML += `
<br>
<div class="term-line success" style="font-size:14px; font-weight:bold; background:rgba(34,197,94,0.2); padding:12px; border-radius:6px; border:2px solid #22c55e;">
💥 EXPLOIT SYSTÈME TERMINÉ AVEC SUCCÈS !<br>
Le bot de défense du hacker a été neutralisé et 'recup_fonds.ty' a rapatrié tous les avoirs volés !<br><br>
💰 <strong>Solde restitué : 1 250 € + Prime Pirate : 1 500 € = 2 750 € crédités !</strong><br>
⚡ <strong>+6 Points de Compétence (SP) reçus !</strong><br>
📎 Clipper quitte le mode d'urgence. Vous êtes le maître absolu du réseau !
</div><br>`;
                output.scrollTop = output.scrollHeight;
            }
            return;
        }

        // Notify Outlock that contract is ready to claim!
        if (window.outlockApp) {
            window.outlockApp.setContractReadyToClaim(client.id);
        }

        const output = winEl.querySelector('#aw-shell-output');
        if (output) {
            output.innerHTML += `
<br>
<div class="term-line success" style="font-size:14px; font-weight:bold; background:rgba(34,197,94,0.15); padding:10px; border-radius:6px; border:1px solid #22c55e;">
🎉 OBJECTIF ATTEINT AVEC SUCCÈS !<br>
👉 Rendez-vous dans <strong>Outlock</strong> pour récupérer votre récompense (+${client.rewardMoney} € & +${client.rewardSP} SP) !
</div>
<br>`;
            output.scrollTop = output.scrollHeight;
        }

        this.renderSidebarAndForm(winEl, client.id);

        if (window.clipper) {
            window.clipper.say(`🎉 Bravo ! Vous avez terminé l'objectif pour **${client.name}** ! Ouvrez **Outlock** pour encaisser votre récompense (+${client.rewardMoney} € & +${client.rewardSP} SP).`);
        }
    }

    disconnect(winEl) {
        this.activeSession = null;
        winEl.querySelector('#aw-conn-form').style.display = 'flex';
        winEl.querySelector('#aw-shell-container').style.display = 'none';
        winEl.querySelector('#aw-status-text').textContent = 'Non connecté';
        winEl.querySelector('#aw-status-tag').className = 'connection-status';
    }
}

window.anyWidownApp = new AnyWidownApp();
