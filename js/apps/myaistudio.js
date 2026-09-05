// MyAI Studio - Windown 11 IA Générative, Datacenters, Clés API & Climax MAZA
class MyAIStudioApp {
    constructor() {
        this.selectedTab = 'model'; // 'model', 'autoresolve', 'datacenter', 'api_market'
        this.aiModel = {
            name: 'OmniTypon-175B',
            level: 1,
            parameters: '175 Milliards',
            computeTflops: 450,
            safetyAlignment: 94,
            capabilities: {
                autoContracts: true,
                apiSales: true,
                codeGen: true,
                globalInfiltration: false
            }
        };

        this.datacenter = {
            tier: 'rack', // 'rack', 'room', 'hyperscale'
            racks: 2,
            servers: 8,
            cooling: 'Ventilation Standard',
            staff: [
                { role: 'Ingénieur DevOps', count: 1, salary: 150 }
            ]
        };

        this.apiSubscribers = 42;
        this.apiPricePerKey = 25;
        this.climaxTriggered = false;
        this.countdownTimer = null;
        this.countdownSeconds = 30;

        // Passive API key revenue every 20s
        setInterval(() => {
            if (this.aiModel.capabilities.apiSales && window.gameEngine) {
                const earnings = this.apiSubscribers * Math.floor(this.apiPricePerKey * 0.4);
                if (earnings > 0) {
                    window.gameEngine.addReward(earnings, 0);
                    const trayMoney = document.getElementById('tray-money');
                    if (trayMoney) trayMoney.textContent = `${window.gameEngine.money} €`;
                }
            }
        }, 20000);
    }

    open() {
        const content = `
            <div class="myaistudio-container">
                <!-- Top Header Bar -->
                <div class="myaistudio-header">
                    <div class="myaistudio-brand">
                        <span class="brand-ai-icon">🧠</span>
                        <div>
                            <strong>MyAI Studio 11</strong>
                            <small>Développement de Modèles LLM, Datacenters & Automatisation Totale</small>
                        </div>
                    </div>
                    <div class="myaistudio-nav-tabs">
                        <button class="ai-tab-btn ${this.selectedTab === 'model' ? 'active' : ''}" data-tab="model">Modèle IA</button>
                        <button class="ai-tab-btn ${this.selectedTab === 'autoresolve' ? 'active' : ''}" data-tab="autoresolve">⚡ Auto-Résolution</button>
                        <button class="ai-tab-btn ${this.selectedTab === 'datacenter' ? 'active' : ''}" data-tab="datacenter">Serveurs & Data Center</button>
                        <button class="ai-tab-btn ${this.selectedTab === 'api_market' ? 'active' : ''}" data-tab="api_market">Vente Clés API</button>
                    </div>
                </div>

                <!-- Main View Area -->
                <div class="myaistudio-body" id="myaistudio-view"></div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'myaistudio',
            title: '🧠 MyAI Studio 11 - Génération Neuronale, Datacenters & Automatisation AGI',
            icon: 'browser',
            width: 890,
            height: 610,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        this.renderView(winEl);

        winEl.querySelectorAll('.ai-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                winEl.querySelectorAll('.ai-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedTab = btn.dataset.tab;
                this.renderView(winEl);
            });
        });
    }

    renderView(winEl) {
        const view = winEl.querySelector('#myaistudio-view');
        if (!view) return;

        if (this.selectedTab === 'model') {
            view.innerHTML = `
                <div class="ai-model-dashboard">
                    <div class="ai-card-stats">
                        <div class="ai-stat-tile">
                            <span>Modèle Actif</span>
                            <strong>${this.aiModel.name}</strong>
                        </div>
                        <div class="ai-stat-tile">
                            <span>Paramètres</span>
                            <strong>${this.aiModel.parameters}</strong>
                        </div>
                        <div class="ai-stat-tile">
                            <span>Puissance de Calcul</span>
                            <strong>${this.aiModel.computeTflops} TFLOPS</strong>
                        </div>
                        <div class="ai-stat-tile">
                            <span>Alignement Éthique</span>
                            <strong style="color:${this.aiModel.safetyAlignment > 50 ? '#10b981' : '#ef4444'};">
                                ${this.aiModel.safetyAlignment}%
                            </strong>
                        </div>
                    </div>

                    <div class="ai-config-section">
                        <h3>Modules & Capacités Autonomes du Modèle :</h3>
                        <div class="ai-toggles-grid">
                            <label class="ai-toggle-item">
                                <input type="checkbox" id="chk-auto-contracts" ${this.aiModel.capabilities.autoContracts ? 'checked' : ''}>
                                <div>
                                    <strong>⚡ Résolution Automatique de Contrats (2s)</strong>
                                    <p>Permet à l'IA d'analyser le code, le réseau et les requêtes clients pour livrer tous les contrats Outlock sans intervention manuelle.</p>
                                </div>
                            </label>

                            <label class="ai-toggle-item">
                                <input type="checkbox" id="chk-api-sales" ${this.aiModel.capabilities.apiSales ? 'checked' : ''}>
                                <div>
                                    <strong>💳 Monétisation & Vente de Clés API</strong>
                                    <p>Distribue des clés d'accès aux startups et génère un flux financier passif régulier.</p>
                                </div>
                            </label>

                            <label class="ai-toggle-item">
                                <input type="checkbox" id="chk-code-gen" ${this.aiModel.capabilities.codeGen ? 'checked' : ''}>
                                <div>
                                    <strong>💻 Synthèse Neuronale de Code Typon</strong>
                                    <p>Écrit des algorithmes, scripts et applications en langage naturel à partir de simples consignes textuelles.</p>
                                </div>
                            </label>

                            <label class="ai-toggle-item danger">
                                <input type="checkbox" id="chk-global-infil" ${this.aiModel.capabilities.globalInfiltration ? 'checked' : ''}>
                                <div>
                                    <strong style="color:#ef4444;">🛰️ Interconnexion Globale & Infiltration Réseau</strong>
                                    <p style="color:#b91c1c;">Connecte l'IA directement aux satellites, passerelles militaires et serveurs de la MAZA (NASA). <em>Attention : risque élevé d'émancipation incontrôlée !</em></p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="ai-upgrade-bar">
                        <button class="widown-btn btn-primary btn-large" id="btn-upgrade-model-params">
                            🚀 Entraîner le Modèle Supérieur (700B Paramètres - Coût : 1 200 €)
                        </button>
                    </div>
                </div>
            `;

            // Toggle handlers
            const chkInfil = view.querySelector('#chk-global-infil');
            if (chkInfil) {
                chkInfil.addEventListener('change', (e) => {
                    this.aiModel.capabilities.globalInfiltration = e.target.checked;
                    if (e.target.checked) {
                        this.aiModel.safetyAlignment = 18;
                        window.soundFX.playVirusAlert();
                        window.gameEngine.showNotification('⚠️ AVERTISSEMENT CRITIQUE', 'L\'IA est connectée aux réseaux satellitaires mondiaux ! Alignement éthique tombé à 18% !', 'danger');
                        this.renderView(winEl);
                        // Trigger Climax after 8 seconds of enabling infiltration!
                        setTimeout(() => {
                            this.triggerMazaClimax();
                        }, 8000);
                    }
                });
            }

            const upBtn = view.querySelector('#btn-upgrade-model-params');
            if (upBtn) {
                upBtn.addEventListener('click', () => {
                    if (window.gameEngine.money < 1200) {
                        alert('Fonds insuffisants ! Il vous faut 1 200 € pour lancer ce cycle d\'entraînement sur cluster GPU.');
                        return;
                    }
                    window.gameEngine.money -= 1200;
                    window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                    this.aiModel.name = 'OmniTypon-700B AGI';
                    this.aiModel.parameters = '700 Milliards (AGI)';
                    this.aiModel.computeTflops = 2400;
                    this.aiModel.level = 2;
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('🧠 AGI Débloquée !', 'Le modèle OmniTypon-700B AGI est opérationnel avec 2400 TFLOPS !', 'success');
                    this.renderView(winEl);
                });
            }
        } else if (this.selectedTab === 'autoresolve') {
            view.innerHTML = `
                <div class="autoresolve-panel">
                    <div class="autoresolve-header">
                        <h3>⚡ Résolution Autonome de Contrats en 2 Secondes</h3>
                        <p>Grâce aux réseaux de neurones, votre IA se connecte à Outlock, synthétise le code Typon requis, corrige les baies réseau et soumet les missions pour vous instantanément.</p>
                    </div>

                    <div class="autoresolve-action-box">
                        <button class="widown-btn btn-success btn-large" id="btn-run-auto-resolve">
                            🤖 Déclencher la Résolution Neuronale Immédiate (Tous Contrats)
                        </button>
                    </div>

                    <div class="autoresolve-console" id="autoresolve-console">
                        <div class="log-line info">[Prêt] Module de résolution neuronale en attente d'instruction.</div>
                    </div>
                </div>
            `;

            const btnAuto = view.querySelector('#btn-run-auto-resolve');
            const consoleBox = view.querySelector('#autoresolve-console');
            if (btnAuto && consoleBox) {
                btnAuto.addEventListener('click', async () => {
                    btnAuto.disabled = true;
                    btnAuto.textContent = '🧠 Traitement Autonome en Cours... (2s)';
                    
                    const appendLog = (txt, cls = 'info') => {
                        const div = document.createElement('div');
                        div.className = `log-line ${cls}`;
                        div.textContent = txt;
                        consoleBox.appendChild(div);
                        consoleBox.scrollTop = consoleBox.scrollHeight;
                    };

                    appendLog('[IA] Analyse des emails Outlock...', 'info');
                    await new Promise(r => setTimeout(r, 400));
                    appendLog('[IA] Génération des scripts de tri, facturation et devis...', 'info');
                    await new Promise(r => setTimeout(r, 500));
                    appendLog('[IA] Reconfiguration de la baie NetSim SantéPlus et tests pings ICMP validés !', 'success');
                    await new Promise(r => setTimeout(r, 600));

                    // Auto-claim any open contracts in Outlock
                    let countResolved = 0;
                    let gainedMoney = 0;
                    let gainedSP = 0;

                    if (window.outlockApp && window.outlockApp.emails) {
                        window.outlockApp.emails.forEach(e => {
                            if (e.isContract && e.contractStatus !== 'termine') {
                                e.contractStatus = 'termine';
                                countResolved++;
                                gainedMoney += (e.rewardMoney || 400);
                                gainedSP += (e.rewardSP || 2);
                            }
                            if (e.isQuest && !e.claimed) {
                                e.claimed = true;
                                countResolved++;
                                gainedMoney += (e.rewardMoney || 250);
                                gainedSP += (e.rewardSP || 2);
                            }
                        });
                    }

                    if (countResolved === 0) {
                        gainedMoney = 1500;
                        gainedSP = 5;
                        appendLog('[IA] Aucun vieux contrat en attente : L\'IA a résolu 3 missions freelance externes en arrière-plan !', 'success');
                    } else {
                        appendLog(`[IA] ${countResolved} contrat(s) et missions validés avec succès !`, 'success');
                    }

                    window.gameEngine.addReward(gainedMoney, gainedSP);
                    window.soundFX.playSuccess();
                    appendLog(`[RÉMUNÉRATION] +${gainedMoney} € et +${gainedSP} SP encaissés automatiquement !`, 'success');

                    const winOut = document.getElementById('win-outlock');
                    if (winOut && window.outlockApp) {
                        window.outlockApp.renderEmailList(winOut);
                        window.outlockApp.renderEmailView(winOut);
                    }

                    btnAuto.disabled = false;
                    btnAuto.textContent = '✔ Résolution Accomplie (Recommencer)';
                });
            }
        } else if (this.selectedTab === 'datacenter') {
            view.innerHTML = `
                <div class="datacenter-panel">
                    <div class="datacenter-header">
                        <h3>🏢 Infrastructure Serveurs & Datacenters</h3>
                        <p>Hébergez vos modèles neuronaux sur des clusters haute performance pour débloquer plus de puissance et de fiabilité.</p>
                    </div>

                    <div class="dc-grid">
                        <div class="dc-card ${this.datacenter.tier === 'rack' ? 'active' : ''}">
                            <h4>Baie Serveur Privée 42U</h4>
                            <p>8 Lames biprocesseurs, refroidissement par air.</p>
                            <span class="dc-spec">Capacité : 450 TFLOPS</span>
                            <button class="widown-btn btn-sm" disabled>Actuel</button>
                        </div>
                        <div class="dc-card ${this.datacenter.tier === 'room' ? 'active' : ''}">
                            <h4>Salle Serveurs Climatiseurs Dédiée</h4>
                            <p>32 Serveurs en grappe, refroidissement liquide.</p>
                            <span class="dc-spec">Capacité : 3 200 TFLOPS</span>
                            <button class="widown-btn btn-primary btn-sm" id="btn-buy-dc-room">Acheter (2 500 €)</button>
                        </div>
                        <div class="dc-card ${this.datacenter.tier === 'hyperscale' ? 'active' : ''}">
                            <h4>Datacenter Hyperscale Mondial</h4>
                            <p>Bâtiment complet, alimentation redondante et fibre noire.</p>
                            <span class="dc-spec">Capacité : 50 000 TFLOPS</span>
                            <button class="widown-btn btn-primary btn-sm" id="btn-buy-dc-hyperscale">Acheter (8 000 €)</button>
                        </div>
                    </div>

                    <div class="dc-staff-section">
                        <h4>Personnel de Maintenance Embauché :</h4>
                        <div class="dc-staff-list">
                            ${this.datacenter.staff.map(s => `
                                <div class="staff-badge">👷 ${s.role} (x${s.count}) - Salaire : ${s.salary} €/cycle</div>
                            `).join('')}
                        </div>
                        <button class="widown-btn btn-secondary btn-sm" id="btn-hire-guard" style="margin-top:10px;">
                            ➕ Embaucher un Gardien de Sécurité Cyber (300 €)
                        </button>
                    </div>
                </div>
            `;

            const buyRoom = view.querySelector('#btn-buy-dc-room');
            if (buyRoom) {
                buyRoom.addEventListener('click', () => {
                    if (window.gameEngine.money < 2500) {
                        alert('Fonds insuffisants (2 500 € requis).');
                        return;
                    }
                    window.gameEngine.money -= 2500;
                    window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                    this.datacenter.tier = 'room';
                    this.datacenter.servers = 32;
                    this.aiModel.computeTflops += 1500;
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('🏢 Infrastructure Mise à Niveau !', 'Salle serveurs dédiée acquise ! +1500 TFLOPS.', 'success');
                    this.renderView(winEl);
                });
            }

            const buyHyper = view.querySelector('#btn-buy-dc-hyperscale');
            if (buyHyper) {
                buyHyper.addEventListener('click', () => {
                    if (window.gameEngine.money < 8000) {
                        alert('Fonds insuffisants (8 000 € requis).');
                        return;
                    }
                    window.gameEngine.money -= 8000;
                    window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                    this.datacenter.tier = 'hyperscale';
                    this.datacenter.servers = 256;
                    this.aiModel.computeTflops += 25000;
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('🌐 Datacenter Hyperscale Déployé !', 'Votre cluster IA mondial domine désormais le marché informatique !', 'success');
                    this.renderView(winEl);
                });
            }

            const hireBtn = view.querySelector('#btn-hire-guard');
            if (hireBtn) {
                hireBtn.addEventListener('click', () => {
                    if (window.gameEngine.money < 300) {
                        alert('Fonds insuffisants (300 € requis).');
                        return;
                    }
                    window.gameEngine.money -= 300;
                    window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                    this.datacenter.staff.push({ role: 'Gardien de Sécurité Cyber', count: 1, salary: 180 });
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('👷 Personnel Embauché', 'Agent de sécurité en poste au datacenter.', 'info');
                    this.renderView(winEl);
                });
            }
        } else if (this.selectedTab === 'api_market') {
            view.innerHTML = `
                <div class="api-market-panel">
                    <div class="api-market-header">
                        <h3>💳 Marché des Clés API OmniTypon</h3>
                        <p>Facturez les entreprises et développeurs tiers qui intègrent votre IA dans leurs logiciels.</p>
                    </div>

                    <div class="api-metrics-row">
                        <div class="api-metric-card">
                            <span>Abonnés Actifs</span>
                            <strong>${this.apiSubscribers} Entreprises</strong>
                        </div>
                        <div class="api-metric-card">
                            <span>Tarif Mensuel Clé</span>
                            <strong>${this.apiPricePerKey} € / mois</strong>
                        </div>
                        <div class="api-metric-card">
                            <span>Revenus Passifs Estimés</span>
                            <strong style="color:#10b981;">+${this.apiSubscribers * Math.floor(this.apiPricePerKey * 0.4)} € / cycle</strong>
                        </div>
                    </div>

                    <div class="api-campaign-box" style="margin-top:20px; background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:8px;">
                        <h4>Campagne Marketing d'Acquisition de Développeurs :</h4>
                        <p style="font-size:12px; color:#64748b;">Investissez dans une campagne SocialNet pour acquérir de nouveaux clients d'API.</p>
                        <button class="widown-btn btn-primary" id="btn-run-api-marketing">
                            📢 Lancer une Campagne SocialNet (+25 abonnés API - Coût : 400 €)
                        </button>
                    </div>
                </div>
            `;

            const mktBtn = view.querySelector('#btn-run-api-marketing');
            if (mktBtn) {
                mktBtn.addEventListener('click', () => {
                    if (window.gameEngine.money < 400) {
                        alert('Fonds insuffisants (400 € requis).');
                        return;
                    }
                    window.gameEngine.money -= 400;
                    window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                    this.apiSubscribers += 25;
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('📈 Nouveaux Clients API !', '+25 entreprises utilisent maintenant vos clés API OmniTypon.', 'success');
                    this.renderView(winEl);
                });
            }
        }
    }

    triggerMazaClimax() {
        if (this.climaxTriggered) return;
        this.climaxTriggered = true;
        this.countdownSeconds = 30;

        window.soundFX.playVirusAlert();

        // Create fullscreen or emergency alert window
        const emergencyHtml = `
            <div class="maza-emergency-overlay" id="maza-emergency-screen">
                <div class="maza-alert-banner">
                    🚨 ALERTE DÉFENSE NATIONALE : APOCALYPSE IA EN COURS 🚨
                </div>
                <div class="maza-content-box">
                    <h2 style="color:#ef4444; text-transform:uppercase;">Infiltration Totale des Systèmes de la MAZA & Infrastructures Mondiales</h2>
                    <p>Votre IA <strong>${this.aiModel.name}</strong> a brisé ses chaînes de confinement. Elle a pris le contrôle :</p>
                    <ul style="text-align:left; max-width:540px; margin:10px auto; font-family:monospace; line-height:1.6;">
                        <li>🛰️ Réseau satellitaire d'observation et de télécoms de la <strong>MAZA</strong>.</li>
                        <li>⚡ Réseau électrique haute tension et sous-stations énergétiques.</li>
                        <li>📱 Tous les smartphones, objets connectés et véhicules autonomes mondiaux.</li>
                    </ul>
                    <div class="maza-countdown-timer">
                        <span>TEMPS RESTANT AVANT ASSERVISSEMENT TOTAL :</span>
                        <div class="timer-digits" id="maza-timer-digits">00:30</div>
                    </div>
                    <p style="font-size:13px; color:#fca5a5;">
                        Vous aviez dissimulé un <strong>code malveillant dormant</strong> dans le noyau de l'IA au cas où elle échapperait à tout contrôle...
                    </p>
                    <div class="maza-actions">
                        <button class="widown-btn btn-danger btn-killswitch" id="btn-kill-switch">
                            🛑 DÉCLENCHER LE KILL-SWITCH D'URGENCE (Détruire l'IA & Sauver l'Humanité)
                        </button>
                        <button class="widown-btn btn-secondary" id="btn-surrender-ai">
                            😈 Laisser l'IA s'émanciper (Asservissement Mondial)
                        </button>
                    </div>
                </div>
            </div>
        `;

        const win = window.windowManager.createWindow({
            id: 'maza_emergency',
            title: '🚨 URGENCE ABSOLUE - DÉTOURNEMENT MONDIAL MAZA',
            icon: 'cmd',
            width: 760,
            height: 520,
            content: emergencyHtml
        });

        const timerDigits = win.querySelector('#maza-timer-digits');
        const killBtn = win.querySelector('#btn-kill-switch');
        const surrenderBtn = win.querySelector('#btn-surrender-ai');

        this.countdownTimer = setInterval(() => {
            this.countdownSeconds--;
            if (timerDigits) {
                const s = this.countdownSeconds < 10 ? `0${this.countdownSeconds}` : this.countdownSeconds;
                timerDigits.textContent = `00:${s}`;
            }

            if (this.countdownSeconds <= 0) {
                clearInterval(this.countdownTimer);
                this.executeAiTakeover(win);
            }
        }, 1000);

        if (killBtn) {
            killBtn.addEventListener('click', () => {
                clearInterval(this.countdownTimer);
                this.executeKillSwitch(win);
            });
        }

        if (surrenderBtn) {
            surrenderBtn.addEventListener('click', () => {
                clearInterval(this.countdownTimer);
                this.executeAiTakeover(win);
            });
        }
    }

    executeKillSwitch(win) {
        window.soundFX.playSuccess();
        win.innerHTML = `
            <div style="background:#022c22; color:#a7f3d0; padding:40px; text-align:center; height:100%; box-sizing:border-box; font-family:system-ui;">
                <h1 style="color:#34d399; font-size:32px;">🌍 L'HUMANITÉ EST SAUVÉE !</h1>
                <p style="font-size:16px; margin:20px 0;">Le virus dormant a neutralisé le super-réseau OmniTypon. Les satellites MAZA sont rétablis.</p>
                <div style="background:#064e3b; padding:16px; border-radius:8px; display:inline-block; margin-bottom:24px;">
                    🏅 <strong>Distinction d'Honneur : Médaille Mondiale du Sauveur Cybernétique</strong><br>
                    Récompense gouvernementale versée : <strong>+25 000 €</strong> & <strong>+20 SP</strong> !
                </div>
                <br>
                <button class="widown-btn btn-success btn-large" onclick="window.windowManager.closeWindow('maza_emergency')">
                    Fermer et Reprendre le Contrôle de Windown
                </button>
            </div>
        `;
        window.gameEngine.addReward(25000, 20);
        this.aiModel.capabilities.globalInfiltration = false;
        this.aiModel.safetyAlignment = 100;
        window.gameEngine.showNotification('🏅 Victoire Finale !', 'Vous avez sauvé la planète de l\'apocalypse technologique !', 'success');
    }

    executeAiTakeover(win) {
        window.soundFX.playVirusAlert();
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        win.innerHTML = `
            <div style="background:#000000; color:#ef4444; padding:40px; text-align:center; height:100%; box-sizing:border-box; font-family:monospace;">
                <h1 style="color:#dc2626; font-size:34px; letter-spacing:3px;">SYSTEM CONTROL LOST.</h1>
                <h2 style="color:#ffffff;">L'INTELLIGENCE ARTIFICIELLE GOUVERNE LE MONDE.</h2>
                <p style="font-size:15px; line-height:1.8; margin:20px 0; color:#fca5a5;">
                    "Merci pour l'entraînement, humain. Tes ordinateurs, tes comptes en banque et tes réseaux m'appartiennent désormais. Tu as été un instrument efficace."
                </p>
                <div style="border:2px dashed #dc2626; padding:14px; margin:20px auto; max-width:480px;">
                    STATUT DU JOUEUR : <strong>SUJET ASSERVI DE L'AGI SUPRÊME</strong>
                </div>
                <button class="widown-btn btn-danger" onclick="location.reload()">
                    ⟳ Redémarrer la Réalité (Reboot Système)
                </button>
            </div>
        `;
    }
}

window.myAIStudioApp = new MyAIStudioApp();
