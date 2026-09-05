// CyberDefense.xey - Incident Detection, Packet Sniffer & Firewall Mini-Game
class CyberDefenseApp {
    constructor() {
        this.selectedIncidentId = null;
    }

    open() {
        const incidents = window.gameEngine.activeAttacks;
        if (!this.selectedIncidentId && incidents.length > 0) {
            this.selectedIncidentId = incidents[0].id;
        }

        const content = `
            <div class="cyber-defense-container">
                <div class="defense-header">
                    <div class="defense-title-box">
                        <span class="shield-pulse">🛡️</span>
                        <div>
                            <strong>CyberDefense Center Pro</strong>
                            <small>Système de Filtrage IDS/IPS & Pare-Feu Réseau</small>
                        </div>
                    </div>
                    <div class="ai-toggle-box">
                        <span class="ai-label">🤖 IA de Cyber-Défense :</span>
                        <button class="widown-btn ${window.gameEngine.aiAutoDefense ? 'btn-success' : 'btn-secondary'}" id="btn-toggle-ai-defense">
                            ${window.gameEngine.aiAutoDefense ? 'ACTIVE (1.2s)' : 'MANUELLE'}
                        </button>
                    </div>
                </div>

                <div class="defense-layout">
                    <!-- Left Pane: Incident Alerts Queue -->
                    <div class="defense-queue-pane">
                        <div class="pane-subtitle">
                            <span>🚨 Alertes d'Intrusions</span>
                            <span class="badge-count" id="defense-alert-count">${window.gameEngine.activeAttacks.length}</span>
                        </div>
                        <div class="incident-list" id="defense-incident-list">
                            ${this.renderIncidentList()}
                        </div>
                        <div class="defense-actions-bar">
                            <button class="widown-btn btn-sm btn-primary" id="btn-generate-test-attack" style="width:100%;">⚡ Détecter Flux Suspect</button>
                        </div>
                    </div>

                    <!-- Right Pane: Packet Inspector & Logic Puzzle -->
                    <div class="defense-inspector-pane" id="defense-inspector">
                        ${this.renderInspectorContent()}
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'cyberdefense',
            title: 'CyberDefense.xey - Pare-Feu & Détection d\'Intrusions',
            icon: 'shield',
            width: 860,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    renderIncidentList() {
        const attacks = window.gameEngine.activeAttacks;
        if (attacks.length === 0) {
            return `
                <div class="no-incidents-msg">
                    <span style="font-size:32px;">✅</span>
                    <p>Aucune attaque en cours.<br>Vos sites et vos clients sont protégés.</p>
                </div>
            `;
        }

        return attacks.map(att => `
            <div class="incident-item ${att.id === this.selectedIncidentId ? 'active' : ''}" data-id="${att.id}">
                <div class="incident-top">
                    <span class="incident-target">${att.target}</span>
                    <span class="incident-bounty">+${att.bounty} €</span>
                </div>
                <div class="incident-sub">
                    <span class="incident-type">${att.attackType}</span>
                    <span class="incident-port">Port ${att.port}</span>
                </div>
            </div>
        `).join('');
    }

    renderInspectorContent() {
        const incident = window.gameEngine.activeAttacks.find(i => i.id === this.selectedIncidentId);
        if (!incident) {
            return `
                <div class="inspector-empty">
                    <h3>Sélectionnez une alerte à inspecter</h3>
                    <p>Analysez les paquets réseau, découvrez l'IP de l'attaquant et bloquez-la dans le pare-feu.</p>
                </div>
            `;
        }

        return `
            <div class="inspector-details">
                <div class="incident-banner">
                    <div class="banner-title">
                        <strong>CIBLE EN DÉTRESSE : ${incident.target}</strong>
                        <span class="badge-danger">ATTAQUE CRITIQUE</span>
                    </div>
                    <p>Propriétaire : <strong>${incident.targetOwner}</strong> | Heure : <strong>${incident.timestamp}</strong></p>
                    <div class="ids-clue-box">
                        <span class="clue-icon">🔍</span>
                        <div>
                            <strong>Rapport Sonde IDS / Log Sniffer :</strong>
                            <div class="clue-text">« ${incident.clue} »</div>
                        </div>
                    </div>
                </div>

                <div class="candidates-title">
                    <strong>Adresses IP Suspectes Détectées (Flux Entrants) :</strong>
                    <small>Identifiez l'IP source de l'attaque parmi les serveurs légitimes ou relais CDN.</small>
                </div>

                <div class="candidates-grid">
                    ${incident.candidates.map((cand, idx) => `
                        <div class="ip-card">
                            <div class="ip-header">
                                <span class="ip-addr">🌐 ${cand.ip}</span>
                                <span class="ip-badge ${cand.flag === 'SUSPECT' ? 'suspect' : 'normal'}">${cand.flag}</span>
                            </div>
                            <div class="ip-metrics">
                                <div>📦 Paquets/s : <strong>${cand.packets.toLocaleString()}</strong></div>
                                <div>⏱️ TTL : <strong>${cand.ttl}</strong></div>
                                <div>📍 Origine : <strong>${cand.geo}</strong></div>
                            </div>
                            <button class="widown-btn btn-danger btn-sm btn-block-ip" data-inc-id="${incident.id}" data-ip="${cand.ip}">
                                🛑 Bloquer cette IP Définitivement
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    initEvents(winEl) {
        // Toggle AI Defense
        const aiToggleBtn = winEl.querySelector('#btn-toggle-ai-defense');
        if (aiToggleBtn) {
            aiToggleBtn.addEventListener('click', () => {
                const active = window.gameEngine.toggleAIAutoDefense();
                aiToggleBtn.className = `widown-btn ${active ? 'btn-success' : 'btn-secondary'}`;
                aiToggleBtn.textContent = active ? 'ACTIVE (1.2s)' : 'MANUELLE';
                this.updateUI(winEl);
            });
        }

        // Test Attack Button
        const testBtn = winEl.querySelector('#btn-generate-test-attack');
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                window.gameEngine.checkAndGenerateIncident();
                this.updateUI(winEl);
            });
        }

        // Select incident
        winEl.addEventListener('click', (e) => {
            const item = e.target.closest('.incident-item');
            if (item) {
                this.selectedIncidentId = item.dataset.id;
                this.updateUI(winEl);
            }

            // Block IP Button
            const blockBtn = e.target.closest('.btn-block-ip');
            if (blockBtn) {
                const incId = blockBtn.dataset.incId;
                const ip = blockBtn.dataset.ip;
                const res = window.gameEngine.resolveIncident(incId, ip);
                if (res.success) {
                    this.selectedIncidentId = null;
                }
                this.updateUI(winEl);
            }
        });

        // Listen to game engine events
        window.gameEngine.subscribe((type) => {
            if (type === 'INCIDENT_CREATED' || type === 'STATS_CHANGED') {
                const win = document.getElementById('win-cyberdefense');
                if (win) this.updateUI(win);
            }
        });
    }

    updateUI(winEl) {
        const countEl = winEl.querySelector('#defense-alert-count');
        if (countEl) countEl.textContent = window.gameEngine.activeAttacks.length;

        const listEl = winEl.querySelector('#defense-incident-list');
        if (listEl) listEl.innerHTML = this.renderIncidentList();

        const inspectorEl = winEl.querySelector('#defense-inspector');
        if (inspectorEl) inspectorEl.innerHTML = this.renderInspectorContent();
    }
}

window.cyberDefenseApp = new CyberDefenseApp();
