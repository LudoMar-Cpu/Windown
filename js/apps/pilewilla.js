// PileWilla.xey - Client de Transfert PTF / SPTF (Parodie FileZilla)
class PileWillaApp {
    constructor() {
        this.isConnected = false;
        this.protocol = 'SPTF';
        this.remotePath = '/var/www/vps_doscord';
        this.remoteFiles = [
            { name: 'config_serveur.cfg', type: 'file', size: '2.1 Ko' },
            { name: 'logs_connexions.log', type: 'file', size: '18.4 Ko' }
        ];
        this.transferQueue = [];
        this.doscordBotActive = false;
        this.doscordRevenueInterval = null;
        this.ddosTimer = null;
        this.isDdosUnderway = false;
    }

    open() {
        const localFiles = window.vfs ? window.vfs.listDir('C:/Utilisateurs/Joueur/Projets').filter(f => f.type === 'file') : [];

        const content = `
            <div class="pw-container">
                <!-- Quick Connect Bar -->
                <div class="pw-quick-bar">
                    <div class="pw-field">
                        <label>Hôte :</label>
                        <input type="text" id="pw-host" value="vps-01.widown-hosting.net">
                    </div>
                    <div class="pw-field">
                        <label>Protocole :</label>
                        <select id="pw-proto">
                            <option value="SPTF" ${this.protocol === 'SPTF' ? 'selected' : ''}>SPTF (Sécurisé Port 22)</option>
                            <option value="PTF" ${this.protocol === 'PTF' ? 'selected' : ''}>PTF (Port 21 non chiffré)</option>
                        </select>
                    </div>
                    <div class="pw-field">
                        <label>Identifiant :</label>
                        <input type="text" id="pw-user" value="root_user">
                    </div>
                    <div class="pw-field">
                        <label>Mot de passe :</label>
                        <input type="password" id="pw-pass" value="••••••••">
                    </div>
                    <button class="widown-btn btn-primary btn-sm" id="pw-btn-connect">
                        ${this.isConnected ? '⟳ Reconnecter' : '🔌 Connexion Rapide'}
                    </button>
                </div>

                <!-- Status Bar / Logs -->
                <div class="pw-log-bar" id="pw-log-bar">
                    ${this.isConnected 
                        ? '<span style="color:#10b981;">✔ Connecté au serveur VPS distant (vps-01.widown-hosting.net)</span>' 
                        : '<span style="color:#94a3b8;">État : Déconnecté. Cliquez sur Connexion Rapide pour ouvrir le serveur distant.</span>'}
                </div>

                <!-- Dual Panes (Local / Remote) -->
                <div class="pw-panes">
                    <!-- Local Pane -->
                    <div class="pw-pane">
                        <div class="pw-pane-header">
                            <span>💻 Site Local : C:/Utilisateurs/Joueur/Projets</span>
                            <button class="pw-refresh-btn" id="pw-refresh-local">⟳</button>
                        </div>
                        <div class="pw-file-list" id="pw-local-list">
                            ${localFiles.length === 0 ? '<div class="pw-empty">Aucun fichier local</div>' : ''}
                            ${localFiles.map(f => `
                                <div class="pw-file-row" data-name="${f.name}" data-path="${f.path}">
                                    <span class="pw-file-name">📄 ${f.name}</span>
                                    <span class="pw-file-size">${f.size || '2.0 Ko'}</span>
                                    <button class="pw-upload-btn" title="Téléverser vers VPS">⬆</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Remote VPS Pane -->
                    <div class="pw-pane">
                        <div class="pw-pane-header">
                            <span>🌐 Site Distant (VPS) : ${this.remotePath}</span>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <span class="pw-bot-badge ${this.doscordBotActive ? (this.isDdosUnderway ? 'ddos' : 'online') : 'offline'}" id="pw-bot-badge">
                                    ${this.doscordBotActive ? (this.isDdosUnderway ? '⚠️ DDoS EN COURS' : '🤖 BOT EN LIGNE') : '⚪ BOT ARRÊTÉ'}
                                </span>
                                <button class="pw-refresh-btn" id="pw-restart-vps" title="Redémarrer le VPS / Bot">⚡ Relancer</button>
                            </div>
                        </div>
                        <div class="pw-file-list" id="pw-remote-list">
                            ${!this.isConnected 
                                ? '<div class="pw-empty">Veuillez vous connecter au VPS pour afficher les fichiers distants.</div>' 
                                : this.remoteFiles.map(f => `
                                    <div class="pw-file-row remote">
                                        <span class="pw-file-name">${f.name.includes('.ty') ? '🤖' : '📄'} ${f.name}</span>
                                        <span class="pw-file-size">${f.size}</span>
                                    </div>
                                `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Transfer Queue -->
                <div class="pw-queue-pane">
                    <div class="pw-queue-header">
                        <span>FILE D'ATTENTE DES TRANSFERTS (PTF / SPTF)</span>
                        <span id="pw-queue-status">${this.transferQueue.length} transfert(s) en attente</span>
                    </div>
                    <div class="pw-queue-list" id="pw-queue-list">
                        ${this.transferQueue.length === 0 
                            ? '<div style="color:#64748b; font-size:11px; padding:6px;">Aucun transfert en cours. Double-cliquez sur un fichier local pour le transférer.</div>' 
                            : this.transferQueue.map(q => `
                                <div class="pw-queue-item">
                                    <span>${q.name} -> ${this.remotePath}</span>
                                    <span class="pw-progress-text">${q.status}</span>
                                </div>
                            `).join('')}
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'pilewilla',
            title: 'PileWilla 3.5 - Client de Transfert PTF / SPTF & Gestionnaire VPS',
            icon: 'pilewilla',
            width: 820,
            height: 520,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        const connectBtn = winEl.querySelector('#pw-btn-connect');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => {
                this.protocol = winEl.querySelector('#pw-proto').value;
                this.isConnected = true;
                window.soundFX.playSuccess();
                window.gameEngine.showNotification('🌐 PileWilla Connecté', `Session ${this.protocol} établie avec le VPS distant.`, 'success');
                this.renderRemoteList(winEl);
                this.renderLog(winEl, `Connexion ${this.protocol} établie avec vps-01.widown-hosting.net:22`);
            });
        }

        // Local files upload click
        winEl.querySelectorAll('.pw-file-row').forEach(row => {
            const btn = row.querySelector('.pw-upload-btn');
            const handler = () => {
                const fileName = row.dataset.name;
                const filePath = row.dataset.path;
                this.uploadToVps(fileName, filePath, winEl);
            };
            if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); handler(); });
            row.addEventListener('dblclick', handler);
        });

        // Restart VPS / Bot button
        const restartBtn = winEl.querySelector('#pw-restart-vps');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                if (!this.doscordBotActive) {
                    window.gameEngine.showNotification('🤖 PileWilla', 'Déployez un script de bot (ex: bot_doscord.ty) pour activer le bot.', 'info');
                    return;
                }
                this.isDdosUnderway = false;
                window.soundFX.playSuccess();
                window.gameEngine.showNotification('⚡ VPS Relancé', 'Le serveur VPS a été nettoyé et le bot Doscord est de nouveau en ligne !', 'success');
                this.renderRemoteList(winEl);
            });
        }
    }

    uploadToVps(fileName, filePath, winEl) {
        if (!this.isConnected) {
            window.soundFX.playError();
            alert("Veuillez d'abord vous connecter au serveur VPS avec le bouton 'Connexion Rapide'.");
            return;
        }

        window.soundFX.playClick();
        this.renderLog(winEl, `[${this.protocol}] Téléversement de '${fileName}' vers ${this.remotePath}...`);

        setTimeout(() => {
            if (!this.remoteFiles.some(f => f.name === fileName)) {
                this.remoteFiles.push({ name: fileName, type: 'file', size: '3.5 Ko' });
            }

            window.soundFX.playSuccess();
            this.renderLog(winEl, `✔ [${this.protocol}] Transfert réussi : '${fileName}' déployé sur le VPS !`);
            window.gameEngine.showNotification('🚀 Transfert Terminé', `'${fileName}' est en ligne sur le VPS.`, 'success');

            // If it's a Doscord bot script, launch the passive income engine!
            if (fileName.includes('bot') || fileName.includes('doscord')) {
                this.activateDoscordBot();
            }

            this.renderRemoteList(winEl);
        }, 800);
    }

    activateDoscordBot() {
        if (this.doscordBotActive) return;
        this.doscordBotActive = true;
        this.isDdosUnderway = false;

        window.gameEngine.showNotification('🤖 Bot Doscord Actif !', 'Le bot répond automatiquement aux clients et génère des revenus passifs réguliers !', 'success');

        // Revenue generation loop
        if (this.doscordRevenueInterval) clearInterval(this.doscordRevenueInterval);
        this.doscordRevenueInterval = setInterval(() => {
            if (this.doscordBotActive && !this.isDdosUnderway) {
                const income = Math.floor(Math.random() * 20) + 15; // 15 à 35 €
                window.gameEngine.money += income;
                window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                window.gameEngine.showNotification('💰 Revenu Doscord Bot', `+${income} € générés par les réponses automatisées du bot !`, 'info');
            }
        }, 20000); // every 20 seconds

        // DDoS Simulation loop
        if (this.ddosTimer) clearInterval(this.ddosTimer);
        this.ddosTimer = setInterval(() => {
            if (this.doscordBotActive && !this.isDdosUnderway) {
                this.isDdosUnderway = true;
                window.soundFX.playVirusAlert();
                window.gameEngine.showNotification('🚨 ATTAQUE DDOS SUR LE VPS !', 'Votre bot Doscord a été submergé et s\'est éteint ! Ouvrez PileWilla et cliquez sur ⚡ Relancer.', 'danger');
                const win = document.getElementById('win-pilewilla');
                if (win) this.renderRemoteList(win);
            }
        }, 75000); // DDoS every 75s
    }

    renderLog(winEl, msg) {
        const logBar = winEl.querySelector('#pw-log-bar');
        if (logBar) logBar.innerHTML = `<span style="color:#38bdf8;">${msg}</span>`;
    }

    renderRemoteList(winEl) {
        const remoteList = winEl.querySelector('#pw-remote-list');
        const badge = winEl.querySelector('#pw-bot-badge');
        if (remoteList) {
            remoteList.innerHTML = this.remoteFiles.map(f => `
                <div class="pw-file-row remote">
                    <span class="pw-file-name">${f.name.includes('bot') ? '🤖' : '📄'} ${f.name}</span>
                    <span class="pw-file-size">${f.size}</span>
                </div>
            `).join('');
        }
        if (badge) {
            badge.className = `pw-bot-badge ${this.doscordBotActive ? (this.isDdosUnderway ? 'ddos' : 'online') : 'offline'}`;
            badge.textContent = this.doscordBotActive ? (this.isDdosUnderway ? '⚠️ DDoS EN COURS' : '🤖 BOT EN LIGNE') : '⚪ BOT ARRÊTÉ';
        }
    }
}

window.pileWillaApp = new PileWillaApp();
