// NetSim.xey - Simulateur d'Administration & Topologie Réseau (Windown 9 Édition Réseau)
class NetSimApp {
    constructor() {
        this.currentScenario = 'santeplus';
        this.selectedDeviceId = 'cam_01';
        this.globalStatus = 'pending'; // 'pending', 'testing', 'valid'

        this.scenarios = {
            santeplus: {
                title: '🏥 Cabinet Médical SantéPlus - Réseau & Vidéosurveillance',
                client: 'Dr. Vasseur',
                subnet: '192.168.1.0/24',
                gateway: '192.168.1.1',
                rewardMoney: 1600,
                rewardSP: 6,
                devices: [
                    {
                        id: 'router_01',
                        name: 'Routeur Passerelle BBox Pro',
                        type: 'router',
                        icon: '🌐',
                        ip: '192.168.1.1',
                        mask: '255.255.255.0',
                        gateway: '192.168.1.1',
                        connected: true,
                        status: 'ok',
                        ports: [22, 80, 443, 554],
                        desc: 'Passerelle principale assurant l\'accès internet et le routage des paquets médicaux.'
                    },
                    {
                        id: 'switch_01',
                        name: 'Switch Gigabit 16 Ports',
                        type: 'switch',
                        icon: '🔀',
                        ip: '192.168.1.2',
                        mask: '255.255.255.0',
                        gateway: '192.168.1.1',
                        connected: true,
                        status: 'ok',
                        ports: [1, 2, 3, 4, 5, 6, 7, 8],
                        desc: 'Commutateur central reliant tous les équipements du cabinet.'
                    },
                    {
                        id: 'pc_secretaire',
                        name: 'PC Accueil & Rendez-vous',
                        type: 'pc',
                        icon: '💻',
                        ip: '192.168.1.10',
                        mask: '255.255.255.0',
                        gateway: '192.168.1.1',
                        connected: true,
                        status: 'ok',
                        desc: 'Poste de travail utilisé pour la saisie des cartes vitales et plannings.'
                    },
                    {
                        id: 'pc_docteur',
                        name: 'Poste Consultation Docteur',
                        type: 'pc',
                        icon: '🩺',
                        ip: '192.168.2.11', // ERREUR DE SOUS-RÉSEAU ! Doit être 192.168.1.11
                        mask: '255.255.255.0',
                        gateway: '192.168.2.1', // ERREUR ! Doit être 192.168.1.1
                        connected: true,
                        status: 'error',
                        errorMsg: 'Passerelle et IP hors sous-réseau (192.168.2.x au lieu de 192.168.1.x) !',
                        desc: 'Ordinateur du médecin. Impossible de joindre le serveur de dossiers patients !'
                    },
                    {
                        id: 'srv_medical',
                        name: 'Serveur Dossiers Patients',
                        type: 'server',
                        icon: '🗄️',
                        ip: '192.168.1.50',
                        mask: '255.255.255.0',
                        gateway: '192.168.1.1',
                        connected: true,
                        status: 'ok',
                        ports: [8080, 22],
                        desc: 'Stockage sécurisé chiffré des dossiers médicaux.'
                    },
                    {
                        id: 'cam_01',
                        name: 'Caméra IP 1 - Salle d\'Attente',
                        type: 'camera',
                        icon: '📹',
                        ip: '192.168.1.101',
                        mask: '255.255.255.0',
                        gateway: '192.168.1.1',
                        connected: true,
                        status: 'ok',
                        fps: 25,
                        zone: 'Salle d\'Attente',
                        desc: 'Surveillance HD grand angle avec flux vidéo en temps réel.'
                    },
                    {
                        id: 'cam_02',
                        name: 'Caméra IP 2 - Sas Entrée Urgences',
                        type: 'camera',
                        icon: '📹',
                        ip: '192.168.1.102',
                        mask: '255.255.255.0',
                        gateway: '192.168.1.1',
                        connected: false, // CÂBLE DÉBRANCHÉ !
                        status: 'error',
                        errorMsg: 'Câble réseau RJ45 débranché du switch !',
                        fps: 0,
                        zone: 'Sas Entrée',
                        desc: 'Caméra extérieure surveillant l\'accès principal.'
                    }
                ]
            }
        };
    }

    open() {
        const scenario = this.scenarios[this.currentScenario];
        const content = `
            <div class="netsim-container">
                <!-- Top Toolbar -->
                <div class="netsim-header">
                    <div class="netsim-title-group">
                        <span class="netsim-logo">🌐</span>
                        <div>
                            <div class="netsim-title">NetSim 2014 - Architecte Réseaux & Vidéosurveillance</div>
                            <div class="netsim-subtitle">${scenario.title}</div>
                        </div>
                    </div>
                    <div class="netsim-actions">
                        <button class="widown-btn btn-sm" id="btn-cctv-view">📹 Moniteur Caméras Live</button>
                        <button class="widown-btn btn-primary btn-sm" id="btn-test-topology">⚡ Tester la Connectivité</button>
                    </div>
                </div>

                <!-- Main Layout : Topology + Device Inspector -->
                <div class="netsim-main">
                    <!-- Left: Visual Rack & Topology -->
                    <div class="netsim-topology" id="netsim-topology">
                        <div class="topo-legend">
                            <span>Sous-réseau attendu : <code>${scenario.subnet}</code></span>
                            <span>Passerelle : <code>${scenario.gateway}</code></span>
                        </div>
                        <div class="topo-rack-grid" id="topo-devices-list">
                            ${this.renderTopologyGrid()}
                        </div>
                    </div>

                    <!-- Right: Device Inspector & Diagnostics -->
                    <div class="netsim-inspector" id="netsim-inspector">
                        ${this.renderDeviceInspector()}
                    </div>
                </div>

                <!-- Bottom Status Bar -->
                <div class="netsim-statusbar" id="netsim-statusbar">
                    <div class="status-indicator ${this.globalStatus}">
                        <span class="dot"></span>
                        <span class="status-text" id="netsim-status-text">
                            ${this.globalStatus === 'valid' ? '✔ Topologie Validée - Tous les équipements sont connectés et joignables !' : '⚠️ Topologie non conforme : Des anomalies réseau bloquent les flux.'}
                        </span>
                    </div>
                    <button class="widown-btn btn-success btn-sm" id="btn-validate-network" ${this.globalStatus === 'valid' ? '' : 'disabled'}>
                        📜 Valider la livraison au client (+${scenario.rewardMoney} €)
                    </button>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'netsim',
            title: 'NetSim.xey - Simulateur Réseau & Vidéosurveillance (Windown 9)',
            icon: 'netsim',
            width: 890,
            height: 590,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    renderTopologyGrid() {
        const scenario = this.scenarios[this.currentScenario];
        return scenario.devices.map(d => {
            const isSelected = d.id === this.selectedDeviceId;
            const hasError = !d.connected || d.status === 'error';
            return `
                <div class="topo-card ${isSelected ? 'selected' : ''} ${hasError ? 'card-error' : 'card-ok'}" data-id="${d.id}">
                    <div class="topo-card-header">
                        <span class="device-icon">${d.icon}</span>
                        <span class="device-badge ${d.connected ? 'badge-on' : 'badge-off'}">
                            ${d.connected ? (hasError ? 'ERREUR' : 'ONLINE') : 'CÂBLE COUPE'}
                        </span>
                    </div>
                    <div class="device-name">${d.name}</div>
                    <div class="device-ip">IP : <code>${d.ip}</code></div>
                    <div class="device-cable ${d.connected ? 'plugged' : 'unplugged'}">
                        ${d.connected ? '🔌 RJ45 Connecté' : '❌ Non branché'}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderDeviceInspector() {
        const scenario = this.scenarios[this.currentScenario];
        const device = scenario.devices.find(d => d.id === this.selectedDeviceId);
        if (!device) return '<div style="padding:20px; color:#64748b;">Sélectionnez un appareil sur la topologie.</div>';

        let extraView = '';
        if (device.type === 'camera') {
            extraView = `
                <div class="cctv-preview-box">
                    <div class="cctv-header">
                        <span>🔴 EN DIRECT [${device.zone}]</span>
                        <span>${device.fps} FPS • 1080p</span>
                    </div>
                    <div class="cctv-screen" id="cctv-screen-${device.id}">
                        ${device.connected ? `
                            <div class="cctv-scanlines"></div>
                            <div class="cctv-overlay-info">CAM_ID: ${device.id.toUpperCase()}<br>REC [●]</div>
                            <div class="cctv-scene">
                                <div class="cctv-motion-box"></div>
                                <span style="position:absolute; bottom:8px; left:8px; font-size:10px; color:#10b981; font-family:Consolas,monospace;">SURVEILLANCE ACTIVE • PAS D'INTRUSION</span>
                            </div>
                        ` : `
                            <div class="cctv-nosignal">
                                <span>⚠️ PAS DE SIGNAL VIDÉO</span>
                                <small>Câble RJ45 / PoE déconnecté</small>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }

        return `
            <div class="inspector-header">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:24px;">${device.icon}</span>
                    <div>
                        <h4 style="margin:0; color:#38bdf8;">${device.name}</h4>
                        <small style="color:#94a3b8;">${device.desc}</small>
                    </div>
                </div>
            </div>

            <div class="inspector-form">
                <div class="form-group-row">
                    <label>État Câblage RJ45 :</label>
                    <button class="widown-btn ${device.connected ? 'btn-danger' : 'btn-success'} btn-sm" id="btn-toggle-cable">
                        ${device.connected ? '🔌 Débrancher le câble' : '🔗 Brancher le câble RJ45'}
                    </button>
                </div>

                <div class="form-group-row">
                    <label>Adresse IPv4 :</label>
                    <input type="text" id="dev-ip-input" value="${device.ip}">
                </div>

                <div class="form-group-row">
                    <label>Masque Sous-Réseau :</label>
                    <input type="text" id="dev-mask-input" value="${device.mask}">
                </div>

                <div class="form-group-row">
                    <label>Passerelle (Gateway) :</label>
                    <input type="text" id="dev-gateway-input" value="${device.gateway}">
                </div>

                <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
                    <button class="widown-btn btn-primary btn-sm" id="btn-save-device-config">💾 Appliquer les paramètres</button>
                </div>
            </div>

            ${extraView}

            <!-- Ping Tool -->
            <div class="inspector-ping-box">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <strong style="font-size:11px; color:#cbd5e1;">Test Ping ICMP :</strong>
                    <button class="widown-btn btn-sm" id="btn-device-ping">Tester Ping vers Passerelle</button>
                </div>
                <div class="ping-output" id="device-ping-output">Prêt à tester la communication...</div>
            </div>
        `;
    }

    initEvents(winEl) {
        const updateViews = () => {
            const grid = winEl.querySelector('#topo-devices-list');
            const inspector = winEl.querySelector('#netsim-inspector');
            if (grid) grid.innerHTML = this.renderTopologyGrid();
            if (inspector) inspector.innerHTML = this.renderDeviceInspector();
            this.bindInspectorEvents(winEl);
            this.bindGridEvents(winEl);
        };

        this.bindGridEvents = (el) => {
            el.querySelectorAll('.topo-card').forEach(card => {
                card.addEventListener('click', () => {
                    this.selectedDeviceId = card.dataset.id;
                    updateViews();
                });
            });
        };

        this.bindInspectorEvents = (el) => {
            const scenario = this.scenarios[this.currentScenario];
            const device = scenario.devices.find(d => d.id === this.selectedDeviceId);
            if (!device) return;

            // Toggle Cable
            const btnCable = el.querySelector('#btn-toggle-cable');
            if (btnCable) {
                btnCable.addEventListener('click', () => {
                    device.connected = !device.connected;
                    if (device.connected && device.errorMsg && device.errorMsg.includes('Câble')) {
                        device.status = 'ok';
                        device.errorMsg = null;
                        if (device.type === 'camera') device.fps = 25;
                    } else if (!device.connected) {
                        device.status = 'error';
                        device.errorMsg = 'Câble débranché.';
                        if (device.type === 'camera') device.fps = 0;
                    }
                    window.soundFX.playClick();
                    updateViews();
                });
            }

            // Save IP config
            const btnSave = el.querySelector('#btn-save-device-config');
            if (btnSave) {
                btnSave.addEventListener('click', () => {
                    const newIp = el.querySelector('#dev-ip-input').value.trim();
                    const newMask = el.querySelector('#dev-mask-input').value.trim();
                    const newGw = el.querySelector('#dev-gateway-input').value.trim();

                    device.ip = newIp;
                    device.mask = newMask;
                    device.gateway = newGw;

                    // Validate correct subnet for doctor PC
                    if (device.id === 'pc_docteur') {
                        if (newIp.startsWith('192.168.1.') && newGw === '192.168.1.1') {
                            device.status = 'ok';
                            device.errorMsg = null;
                            window.soundFX.playSuccess();
                            window.gameEngine.showNotification('✔ Paramètres Valides', 'Le PC du Docteur est désormais dans le bon sous-réseau médical !', 'success');
                        } else {
                            device.status = 'error';
                            device.errorMsg = 'L\'adresse IP ou la passerelle n\'appartient pas au sous-réseau 192.168.1.0/24 !';
                            window.soundFX.playError();
                        }
                    } else {
                        window.soundFX.playSuccess();
                    }
                    updateViews();
                });
            }

            // Ping test for device
            const btnPing = el.querySelector('#btn-device-ping');
            const pingOut = el.querySelector('#device-ping-output');
            if (btnPing && pingOut) {
                btnPing.addEventListener('click', () => {
                    if (!device.connected) {
                        pingOut.innerHTML = '<span style="color:#ef4444;">Échec : Équipement déconnecté du réseau (câble coupé).</span>';
                        window.soundFX.playError();
                        return;
                    }
                    if (device.status === 'error') {
                        pingOut.innerHTML = `<span style="color:#ef4444;">Délai d'attente de la demande dépassé (Hôte inaccessible : ${device.errorMsg})</span>`;
                        window.soundFX.playError();
                        return;
                    }
                    pingOut.innerHTML = `<span style="color:#38bdf8;">Envoi de requêtes ICMP vers 192.168.1.1 :</span><br>
                    Réponse de 192.168.1.1 : octets=32 temps=1ms TTL=64<br>
                    Réponse de 192.168.1.1 : octets=32 temps=1ms TTL=64<br>
                    <strong style="color:#10b981;">✔ Paquets envoyés = 2, reçus = 2, perdus = 0 (0% de perte).</strong>`;
                    window.soundFX.playSuccess();
                });
            }
        };

        this.bindGridEvents(winEl);
        this.bindInspectorEvents(winEl);

        // Global Topology Test
        const btnTestAll = winEl.querySelector('#btn-test-topology');
        if (btnTestAll) {
            btnTestAll.addEventListener('click', () => {
                const scenario = this.scenarios[this.currentScenario];
                const errors = scenario.devices.filter(d => !d.connected || d.status === 'error');

                if (errors.length === 0) {
                    this.globalStatus = 'valid';
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('🎉 Réseau Opérationnel !', 'Tous les équipements communiquent sans erreur. Vous pouvez valider le contrat !', 'success');
                } else {
                    this.globalStatus = 'pending';
                    window.soundFX.playError();
                    window.gameEngine.showNotification('⚠️ Erreurs Détectées', `${errors.length} équipement(s) bloquent le réseau. Inspectez les cartes en rouge.`, 'danger');
                }

                const statusText = winEl.querySelector('#netsim-status-text');
                const valBtn = winEl.querySelector('#btn-validate-network');
                if (statusText) {
                    statusText.textContent = this.globalStatus === 'valid'
                        ? '✔ Topologie Validée - Tous les équipements sont connectés et joignables !'
                        : `⚠️ ${errors.length} problème(s) détecté(s) : Vérifiez les câbles et adresses IP.`;
                }
                if (valBtn) valBtn.disabled = this.globalStatus !== 'valid';
                updateViews();
            });
        }

        // Validate Contract Button
        const valBtn = winEl.querySelector('#btn-validate-network');
        if (valBtn) {
            valBtn.addEventListener('click', () => {
                if (this.globalStatus !== 'valid') return;
                const scenario = this.scenarios[this.currentScenario];
                window.gameEngine.addReward(scenario.rewardMoney, scenario.rewardSP);
                window.soundFX.playSuccess();
                window.gameEngine.showNotification('💰 Contrat Validé !', `Paiement de ${scenario.rewardMoney} € et ${scenario.rewardSP} SP encaissés pour SantéPlus !`, 'success');
                if (window.outlockApp) {
                    window.outlockApp.setContractReadyToClaim('cli_santeplus');
                }
                winEl.querySelector('#btn-validate-network').textContent = '✔ Livré avec Succès';
                winEl.querySelector('#btn-validate-network').disabled = true;
            });
        }

        // Live CCTV Multi-view Modal
        const cctvBtn = winEl.querySelector('#btn-cctv-view');
        if (cctvBtn) {
            cctvBtn.addEventListener('click', () => {
                this.openCctvMonitor();
            });
        }
    }

    openCctvMonitor() {
        const scenario = this.scenarios[this.currentScenario];
        const cameras = scenario.devices.filter(d => d.type === 'camera');

        const content = `
            <div class="cctv-monitor-matrix">
                <div class="cctv-matrix-header">
                    <span>📹 CENTRE DE SURVEILLANCE VIDÉO EN DIRECT - WIDOWN 9</span>
                    <span style="color:#ef4444; font-weight:bold;">● ENREGISTREMENT CONTINU</span>
                </div>
                <div class="cctv-matrix-grid">
                    ${cameras.map(c => `
                        <div class="cctv-grid-cell">
                            <div class="cctv-cell-bar">
                                <strong>${c.name}</strong>
                                <span>${c.connected ? '25 FPS • HD' : 'SIGNAL PERDU'}</span>
                            </div>
                            <div class="cctv-cell-screen">
                                ${c.connected ? `
                                    <div class="cctv-live-feed">
                                        <div class="cctv-cam-timestamp">${new Date().toLocaleTimeString()} • ${c.zone}</div>
                                        <div class="cctv-hud-center">+</div>
                                        <div class="cctv-static-lines"></div>
                                        <span class="cctv-tag">FLUX SÉCURISÉ H.264</span>
                                    </div>
                                ` : `
                                    <div class="cctv-cell-dead">
                                        <span>NO SIGNAL</span>
                                    </div>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'cctv_monitor',
            title: '📹 Centre de Télésurveillance IP - Flux Caméras en Direct',
            icon: 'camera',
            width: 720,
            height: 480,
            content: content
        });
    }

    updateDeviceConfig(deviceId, ip, mask, gateway) {
        const scenario = this.scenarios[this.currentScenario];
        const device = scenario.devices.find(d => d.id === deviceId);
        if (!device) return false;
        device.ip = ip;
        device.mask = mask;
        device.gateway = gateway;
        if (deviceId === 'pc_docteur') {
            if (ip.startsWith('192.168.1.') && gateway === '192.168.1.1') {
                device.status = 'ok';
                device.errorMsg = null;
            } else {
                device.status = 'error';
                device.errorMsg = 'Hors sous-réseau';
            }
        }
        return true;
    }

    toggleCable(deviceId) {
        const scenario = this.scenarios[this.currentScenario];
        const device = scenario.devices.find(d => d.id === deviceId);
        if (!device) return false;
        device.connected = !device.connected;
        if (device.connected && device.errorMsg && device.errorMsg.includes('Câble')) {
            device.status = 'ok';
            device.errorMsg = null;
            if (device.type === 'camera') device.fps = 25;
        } else if (!device.connected) {
            device.status = 'error';
            device.errorMsg = 'Câble débranché.';
            if (device.type === 'camera') device.fps = 0;
        }
        return device.connected;
    }

    testTopology() {
        const scenario = this.scenarios[this.currentScenario];
        const errors = scenario.devices.filter(d => !d.connected || d.status === 'error');
        this.globalStatus = errors.length === 0 ? 'valid' : 'pending';
        return errors;
    }
}

window.netSimApp = new NetSimApp();
