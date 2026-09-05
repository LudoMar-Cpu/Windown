// DarkHackerSuite.xey - Calis Linox / Obonto Dark Hacking Suite (OSINT, VoIP Anonyme, RAT, CCTV Hijack, Dark Web)
class DarkHackerSuiteApp {
    constructor() {
        this.selectedTab = 'darkweb'; // 'darkweb', 'osint', 'burner_voip', 'cctv_hijack', 'underground'
        this.bounties = [
            {
                id: 'bounty_offshore',
                title: '🏴 Siphon de Fonds Offshore - Banque Grand Caïman',
                target: '185.220.101.5',
                rewardMoney: 3500,
                difficulty: 'Difficile',
                status: 'disponible',
                desc: 'Infiltrez la passerelle bancaire avec un payload RAT et détournez les fonds vers un wallet anonyme.'
            },
            {
                id: 'bounty_police',
                title: '🚨 Neutralisation Fichier Judiciaire Interpol',
                target: '91.198.174.192',
                rewardMoney: 5000,
                difficulty: 'Expert',
                status: 'disponible',
                desc: 'Effacez le dossier criminel d\'un client VIP dans la base de données centrale.'
            }
        ];

        this.hijackedCams = [
            {
                id: 'cam_motel',
                name: 'Caméra Discrète - Couloir Suite Privée',
                ip: '82.165.197.12',
                location: 'Hôtel Les Palmes, Monaco',
                status: 'En direct',
                fps: 28
            },
            {
                id: 'cam_bank_vault',
                name: 'Caméra Sécurité - Salle des Coffres',
                ip: '194.187.168.4',
                location: 'Banque d\'Affaires Genève',
                status: 'En direct',
                fps: 30
            }
        ];
    }

    open() {
        const content = `
            <div class="darkhacker-container">
                <!-- Top Header -->
                <div class="darkhacker-header">
                    <div class="darkhacker-brand">
                        <span class="brand-hacker-icon">💀</span>
                        <div>
                            <strong>Calis Linox Cyber Suite</strong>
                            <small>Réseau d'Infiltration Clandestin, OSINT & R.A.T.</small>
                        </div>
                    </div>
                    <div class="darkhacker-nav-tabs">
                        <button class="dh-tab-btn ${this.selectedTab === 'darkweb' ? 'active' : ''}" data-tab="darkweb">🧅 Dark Web Market</button>
                        <button class="dh-tab-btn ${this.selectedTab === 'osint' ? 'active' : ''}" data-tab="osint">🔍 OSINT DoxIntel</button>
                        <button class="dh-tab-btn ${this.selectedTab === 'burner_voip' ? 'active' : ''}" data-tab="burner_voip">📞 VoIP Intraçable</button>
                        <button class="dh-tab-btn ${this.selectedTab === 'cctv_hijack' ? 'active' : ''}" data-tab="cctv_hijack">📹 CamGhost RAT</button>
                        <button class="dh-tab-btn ${this.selectedTab === 'underground' ? 'active' : ''}" data-tab="underground">💬 Doscord Dark</button>
                    </div>
                </div>

                <!-- Main Content Pane -->
                <div class="darkhacker-body" id="darkhacker-view"></div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'dark_hacker_suite',
            title: '💀 Calis Linox - Dark Hacking & Exploitation Toolkit',
            icon: 'cmd',
            width: 880,
            height: 600,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        this.renderTab(winEl);

        winEl.querySelectorAll('.dh-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                winEl.querySelectorAll('.dh-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedTab = btn.dataset.tab;
                this.renderTab(winEl);
            });
        });
    }

    renderTab(winEl) {
        const view = winEl.querySelector('#darkhacker-view');
        if (!view) return;

        if (this.selectedTab === 'darkweb') {
            view.innerHTML = `
                <div class="dh-panel darkweb-panel">
                    <div class="dh-banner-tor">
                        <span>🧅 ACCÈS SÉCURISÉ VIA NŒUD TOR CALIS-ROUTER • ADRESSE EN .ONION</span>
                    </div>
                    <h3>Contrats Noirs & Bounties d'Infiltration Clandestine</h3>
                    <div class="dh-bounties-list">
                        ${this.bounties.map(b => `
                            <div class="dh-bounty-card">
                                <div class="bounty-head">
                                    <strong>${b.title}</strong>
                                    <span class="bounty-reward">💰 +${b.rewardMoney} €</span>
                                </div>
                                <div class="bounty-details">
                                    <span>Cible : <code>${b.target}</code></span>
                                    <span>Difficulté : <strong style="color:#ef4444;">${b.difficulty}</strong></span>
                                </div>
                                <p>${b.desc}</p>
                                <button class="widown-btn btn-danger btn-sm btn-execute-bounty" data-id="${b.id}" ${b.status === 'termine' ? 'disabled' : ''}>
                                    ${b.status === 'termine' ? '✔ Infiltration Réussie' : '☠️ Lancer l\'Exploit Zero-Day'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            view.querySelectorAll('.btn-execute-bounty').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    const b = this.bounties.find(x => x.id === id);
                    if (!b || b.status === 'termine') return;

                    btn.disabled = true;
                    btn.textContent = 'Injectant payload malveillant...';
                    window.soundFX.playVirusAlert();

                    setTimeout(() => {
                        b.status = 'termine';
                        window.gameEngine.addReward(b.rewardMoney, 5);
                        window.soundFX.playSuccess();
                        window.gameEngine.showNotification('💀 Infiltration Clandestine Validée !', `${b.title} : +${b.rewardMoney} € blanchis virés sur votre solde !`, 'danger');
                        this.renderTab(winEl);
                    }, 2200);
                });
            });
        } else if (this.selectedTab === 'osint') {
            view.innerHTML = `
                <div class="dh-panel osint-panel">
                    <h3>🔍 DoxIntel - Moteur OSINT & Recherche Inverse</h3>
                    <p style="font-size:12px; color:#94a3b8;">Interrogez les bases de données gouvernementales fuitées, opérateurs télécoms et réseaux sociaux déchiffrés.</p>
                    <div class="osint-search-bar" style="display:flex; gap:10px; margin:16px 0;">
                        <input type="text" id="osint-query" placeholder="Saisir un pseudo, numéro de téléphone (+33...), ou MAC..." style="flex:1; padding:8px 12px; background:#0f172a; border:1px solid #334155; color:#f8fafc; border-radius:4px;">
                        <button class="widown-btn btn-primary" id="btn-run-osint">🔍 Scanner les Dumps</button>
                    </div>
                    <div class="osint-results" id="osint-results-box" style="background:#020617; border:1px solid #1e293b; padding:14px; border-radius:6px; font-family:monospace; font-size:12px; min-height:160px; color:#38bdf8;">
                        En attente d'une cible à scanner...
                    </div>
                </div>
            `;

            const queryInput = view.querySelector('#osint-query');
            const runBtn = view.querySelector('#btn-run-osint');
            const resultBox = view.querySelector('#osint-results-box');

            if (runBtn && queryInput && resultBox) {
                runBtn.addEventListener('click', () => {
                    const q = queryInput.value.trim();
                    if (!q) {
                        alert('Entrez une requête !');
                        return;
                    }
                    resultBox.innerHTML = `[+] Analyse des registres de télécommunications mondiaux...<br>[+] Croisement avec les archives policières fuitées...<br><br>`;
                    setTimeout(() => {
                        resultBox.innerHTML += `
                            <strong>[DOSSIER IDENTIFIÉ POUR "${q}"] :</strong><br>
                            • Nom civil estimé : Marc A. Vasseur<br>
                            • Localisation IP géoréférencée : Nice, France (FAI : Orange Fibre)<br>
                            • Téléphone mobile : +33 6 42 ** ** 88 (VoIP non chiffré)<br>
                            • Mots de passe fuités connus : <code>santeplus2014!</code>, <code>drvasseur_admin</code><br>
                            • Vulnérabilités détectées : Port 554 RTSP exposé sans mot de passe sur caméra extérieure.
                        `;
                    }, 800);
                });
            }
        } else if (this.selectedTab === 'burner_voip') {
            view.innerHTML = `
                <div class="dh-panel voip-panel">
                    <h3>📞 AnonCall - Téléphonie Chiffrée & Masquage de Voix</h3>
                    <p style="font-size:12px; color:#94a3b8;">Passez des appels vocaux anonymes acheminés par des relais satellites étrangers pour piéger des administrateurs réseau.</p>
                    <div style="background:#0f172a; padding:18px; border-radius:8px; max-width:400px; margin:16px auto; border:1px solid #334155; text-align:center;">
                        <div style="font-size:13px; color:#38bdf8; margin-bottom:8px;">NUMÉRO VIRTUEL JETABLE : +1 (555) 019-9482</div>
                        <input type="text" id="voip-target-num" placeholder="Numéro de la cible (+33...)" style="width:100%; box-sizing:border-box; padding:8px; background:#020617; border:1px solid #475569; color:#f8fafc; border-radius:4px; margin-bottom:12px; text-align:center;">
                        <div style="margin-bottom:12px; text-align:left; font-size:12px; color:#cbd5e1;">
                            <label><input type="checkbox" checked> Masquage vocal modulateur (Voix robotique)</label><br>
                            <label><input type="checkbox" checked> Destruction automatique du journal d'appels</label>
                        </div>
                        <button class="widown-btn btn-danger btn-large" id="btn-start-voip-call">
                            📞 Déclencher l'Appel Phishing Vocal (Social Engineering)
                        </button>
                        <div id="voip-call-status" style="margin-top:14px; font-family:monospace; font-size:12px; color:#a7f3d0;"></div>
                    </div>
                </div>
            `;

            const callBtn = view.querySelector('#btn-start-voip-call');
            const statusDiv = view.querySelector('#voip-call-status');
            if (callBtn && statusDiv) {
                callBtn.addEventListener('click', () => {
                    statusDiv.innerHTML = 'Composition vers le relais chiffré... Sonnerie...';
                    setTimeout(() => {
                        statusDiv.innerHTML = `
                            <span style="color:#22c55e;">✔ CIBLE DÉCROCHÉE !</span><br>
                            "Ici le support technique... Veuillez nous confirmer votre code OTP de secours."<br>
                            <strong>RÉSULTAT : Code bancaire 2FA intercepté avec succès ! (+800 €)</strong>
                        `;
                        window.gameEngine.addReward(800, 2);
                        window.soundFX.playSuccess();
                    }, 2000);
                });
            }
        } else if (this.selectedTab === 'cctv_hijack') {
            view.innerHTML = `
                <div class="dh-panel cctv-panel">
                    <h3>📹 CamGhost RAT - Détournement de Caméras Distantes</h3>
                    <p style="font-size:12px; color:#94a3b8;">Accédez aux flux vidéo en direct de caméras privées dont les mots de passe par défaut n'ont jamais été modifiés.</p>
                    <div class="cctv-hijack-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px;">
                        ${this.hijackedCams.map(cam => `
                            <div class="hijack-cam-card" style="background:#020617; border:1px solid #1e293b; border-radius:6px; overflow:hidden;">
                                <div style="background:#0f172a; padding:8px 12px; display:flex; justify-content:space-between; font-size:12px; color:#f8fafc;">
                                    <strong>${cam.name}</strong>
                                    <span style="color:#ef4444;">● EN DIRECT</span>
                                </div>
                                <div style="height:140px; background:#000; position:relative; display:flex; align-items:center; justify-content:center; color:#22c55e; font-family:monospace; font-size:13px;">
                                    <div style="position:absolute; top:6px; left:8px; font-size:10px; color:#94a3b8;">${cam.location} • ${cam.ip}</div>
                                    <div style="position:absolute; bottom:6px; right:8px; font-size:10px; color:#ef4444;">FPS: ${cam.fps}</div>
                                    <span>[FLUX H.264 DÉTOURNÉ INTERCEPTÉ]</span>
                                </div>
                                <div style="padding:8px 12px; display:flex; gap:8px;">
                                    <button class="widown-btn btn-sm btn-secondary" onclick="alert('Capture vidéo enregistrée dans /tmp/cam_dump.mp4')">📸 Enregistrer Capture</button>
                                    <button class="widown-btn btn-sm btn-danger" onclick="alert('Caméra neutralisée temporairement.')">⛔ Couper le Flux</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (this.selectedTab === 'underground') {
            view.innerHTML = `
                <div class="dh-panel underground-panel">
                    <h3>💬 Underground Doscord (+18 Devs / BlackHat Hub)</h3>
                    <p style="font-size:12px; color:#94a3b8;">Salons de discussion non filtrés, dumps de bases de données et distribution de jeux 18+ clandestins.</p>
                    <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; height:280px; overflow-y:auto; padding:12px; font-size:13px; font-family:system-ui; color:#e2e8f0;">
                        <div style="margin-bottom:10px;">
                            <strong style="color:#f43f5e;">@ShadowNinja :</strong> Quelqu'un a le dump SQL de la boutique de bijoux Sophie ? Je veux injecter un backdoor sur AnyWidown.
                        </div>
                        <div style="margin-bottom:10px;">
                            <strong style="color:#38bdf8;">@ZeroCool_88 :</strong> Dispo sur le DarkWeb Market onglet 1, ça rapporte 3 500 balles faciles si t'as le script Typon d'attaque.
                        </div>
                        <div style="margin-bottom:10px;">
                            <strong style="color:#a855f7;">@GameCracker18 :</strong> Nouveau jeu +18 exclusif "CyberNight 2020 Uncensored" uploadé dans le salon torrents !
                        </div>
                        <div style="margin-bottom:10px;">
                            <strong style="color:#eab308;">@SysAdmin_Repenti :</strong> Faites gaffe les gars, Fortynite commence à poursuivre les devs freelance qui refusent leurs contrats...
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

window.darkHackerSuiteApp = new DarkHackerSuiteApp();
