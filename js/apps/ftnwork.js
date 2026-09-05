// FTNWork.xey - Logiciel Sécurisé d'Entreprise de Cybersécurité Fortynite
class FTNWorkApp {
    constructor() {
        this.currentTab = 'contracts';
        this.messages = [
            { from: 'Marc (Admin Réseau)', time: '09:05', text: 'Bienvenue dans l\'équipe ! Pense à toujours tester tes scripts Typon avec F5 dans CodeStud avant de les déployer.' },
            { from: 'Sarah (Analyste Cyber)', time: '09:12', text: 'Nos pare-feu surveillent le réseau en permanence. Si quelqu\'un utilise des protocoles non chiffrés, on le repère direct.' }
        ];
        this.tasks = [
            {
                id: 'ftn_task_01',
                title: '📋 Audit & Calcul automatisé des flux de connexion',
                status: 'en_cours',
                level: 'Employé de bureau (Niveau 1)',
                desc: 'Écrire un script Typon pour calculer le ratio de sécurité : déclarer <code>connexions_total = 2500</code>, <code>echecs = 125</code>, calculer le taux d\'anomalie et afficher le rapport d\'audit.',
                reward: 'Prime de bureau : 600 € + 4 SP',
                scriptRequired: 'audit_flux.ty'
            }
        ];
    }

    open() {
        const content = `
            <div class="ftn-container">
                <!-- Top Corporate Bar -->
                <div class="ftn-header">
                    <div class="ftn-brand">
                        <span class="ftn-logo">🛡️</span>
                        <div>
                            <div class="ftn-title">FORTYNITE SECURITY ENTERPRISE</div>
                            <div class="ftn-subtitle">FTNWork v3.4.1 - Station de travail sécurisée</div>
                        </div>
                    </div>
                    <div class="ftn-user-badge">
                        <div class="ftn-avatar">👤</div>
                        <div>
                            <div class="ftn-user-name">Matricule FTN-8842</div>
                            <div class="ftn-user-role">Employé de bureau • Cyber-Automatisation</div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="ftn-nav">
                    <button class="ftn-nav-btn ${this.currentTab === 'contracts' ? 'active' : ''}" id="ftn-tab-contracts">
                        💼 Missions & Tâches Entreprise
                    </button>
                    <button class="ftn-nav-btn ${this.currentTab === 'chat' ? 'active' : ''}" id="ftn-tab-chat">
                        💬 Canal Collègues & Équipe
                    </button>
                    <button class="ftn-nav-btn ${this.currentTab === 'knowledge' ? 'active' : ''}" id="ftn-tab-knowledge">
                        🌐 Recherche & Documentation
                    </button>
                </div>

                <!-- Main Workspace Area -->
                <div class="ftn-body" id="ftn-main-content">
                    ${this.renderContent()}
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'ftnwork',
            title: 'FTNWork.xey - Plateforme Sécurisée Fortynite',
            icon: 'ftnwork',
            width: 820,
            height: 540,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        const setTab = (tab) => {
            this.currentTab = tab;
            winEl.querySelectorAll('.ftn-nav-btn').forEach(btn => btn.classList.remove('active'));
            const activeBtn = winEl.querySelector(`#ftn-tab-${tab}`);
            if (activeBtn) activeBtn.classList.add('active');
            const mainBody = winEl.querySelector('#ftn-main-content');
            if (mainBody) mainBody.innerHTML = this.renderContent();
            this.bindTabEvents(winEl);
        };

        winEl.querySelector('#ftn-tab-contracts').addEventListener('click', () => setTab('contracts'));
        winEl.querySelector('#ftn-tab-chat').addEventListener('click', () => setTab('chat'));
        winEl.querySelector('#ftn-tab-knowledge').addEventListener('click', () => setTab('knowledge'));

        this.bindTabEvents(winEl);
    }

    bindTabEvents(winEl) {
        if (this.currentTab === 'contracts') {
            const btnOpenCode = winEl.querySelector('#ftn-btn-opencodestud');
            if (btnOpenCode) {
                btnOpenCode.addEventListener('click', () => {
                    if (window.codeStudApp) window.codeStudApp.open();
                });
            }
        } else if (this.currentTab === 'chat') {
            const sendBtn = winEl.querySelector('#ftn-btn-ask-colleague');
            const askSelect = winEl.querySelector('#ftn-question-select');
            if (sendBtn && askSelect) {
                sendBtn.addEventListener('click', () => {
                    const q = askSelect.value;
                    let reply = '';
                    let author = 'Marc (Admin Réseau)';
                    if (q === '1') {
                        author = 'Sarah (Analyste Cyber)';
                        reply = 'Pour calculer le taux, déclare tes variables : total = 2500, echecs = 125, taux = (echecs / total) * 100, puis affiche le résultat ! N\'oublie pas de faire F5 pour tester.';
                    } else if (q === '2') {
                        author = 'Marc (Admin Réseau)';
                        reply = 'Surveille toujours tes ports ! Le port 22 HSS est chiffré et sécurisé. Ne fais jamais de connexion en clair sinon n\'importe qui peut sniffer tes données.';
                    } else {
                        author = 'Sarah (Analyste Cyber)';
                        reply = 'Consulte Logol Lhome et tape ta recherche, la doc officielle de Typon contient tous les modèles d\'automatisation.';
                    }

                    this.messages.push({ from: 'Vous', time: 'À l\'instant', text: askSelect.options[askSelect.selectedIndex].text });
                    this.messages.push({ from: author, time: 'À l\'instant', text: reply });
                    window.soundFX.playNotification();
                    const mainBody = winEl.querySelector('#ftn-main-content');
                    if (mainBody) mainBody.innerHTML = this.renderContent();
                    this.bindTabEvents(winEl);
                });
            }
        } else if (this.currentTab === 'knowledge') {
            const btnWeb = winEl.querySelector('#ftn-btn-open-web');
            if (btnWeb) {
                btnWeb.addEventListener('click', () => {
                    if (window.logolApp) window.logolApp.open();
                });
            }
        }
    }

    renderContent() {
        if (this.currentTab === 'contracts') {
            return `
                <div class="ftn-section">
                    <h3 style="color:#38bdf8; margin-bottom:10px;">📋 Contrats d'Automatisation Sécurisés de l'Entreprise</h3>
                    <p style="font-size:12px; color:#94a3b8; margin-bottom:16px;">
                        En tant qu'<strong>Employé de bureau</strong> chez Fortynite Sécurité, réalisez les tâches ci-dessous avec l'interpréteur Typon.
                    </p>
                    
                    ${this.tasks.map(t => `
                        <div class="ftn-task-card" style="background:#0f172a; border:1px solid #1e293b; border-left:4px solid #38bdf8; padding:14px; border-radius:6px; margin-bottom:14px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <strong style="font-size:14px; color:#f1f5f9;">${t.title}</strong>
                                <span style="background:#0369a1; color:#ffffff; font-size:10px; font-weight:bold; padding:3px 8px; border-radius:12px;">${t.level}</span>
                            </div>
                            <div style="font-size:12px; color:#cbd5e1; line-height:1.5; margin-bottom:10px;">${t.desc}</div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="color:#10b981; font-weight:bold; font-size:12px;">💰 ${t.reward}</span>
                                <button class="widown-btn btn-primary btn-sm" id="ftn-btn-opencodestud">💻 Coder dans CodeStud</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (this.currentTab === 'chat') {
            return `
                <div class="ftn-section" style="display:flex; flex-direction:column; height:100%;">
                    <h3 style="color:#38bdf8; margin-bottom:6px;">💬 Canal Interne de l'Équipe Fortynite</h3>
                    <p style="font-size:11px; color:#94a3b8; margin-bottom:12px;">Échangez avec vos collègues de bureau pour résoudre vos missions d'automatisation.</p>
                    
                    <div class="ftn-chat-history" style="background:#0f172a; border:1px solid #1e293b; border-radius:6px; padding:12px; flex:1; overflow-y:auto; max-height:220px; margin-bottom:12px;">
                        ${this.messages.map(m => `
                            <div style="margin-bottom:10px; font-size:12px;">
                                <div style="display:flex; justify-content:space-between; color:#38bdf8; font-weight:bold; font-size:11px;">
                                    <span>${m.from}</span>
                                    <span style="color:#64748b;">${m.time}</span>
                                </div>
                                <div style="color:#e2e8f0; margin-top:2px; background:rgba(255,255,255,0.03); padding:6px 10px; border-radius:4px;">${m.text}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display:flex; gap:8px; align-items:center;">
                        <select id="ftn-question-select" style="flex:1; background:#0f172a; color:#f8fafc; border:1px solid #334155; padding:8px; border-radius:4px; font-size:12px;">
                            <option value="1">👉 Comment automatiser le calcul du taux d'anomalie ?</option>
                            <option value="2">👉 Pourquoi la sécurité du port 22 HSS est-elle obligatoire ?</option>
                            <option value="3">👉 Où trouver de la documentation sur les variables Typon ?</option>
                        </select>
                        <button class="widown-btn btn-primary" id="ftn-btn-ask-colleague">Envoyer la question</button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="ftn-section">
                    <h3 style="color:#38bdf8; margin-bottom:10px;">🌐 Recherche Web & Base Cyber Fortynite</h3>
                    <p style="font-size:12px; color:#94a3b8; margin-bottom:16px;">
                        Accédez aux ressources internes et aux moteurs de recherche sécurisés pour mener à bien vos tâches.
                    </p>
                    <div style="background:#0f172a; border:1px solid #1e293b; padding:16px; border-radius:6px;">
                        <h4 style="color:#e2e8f0; margin-bottom:8px;">Moteur de Recherche Logol Lhome</h4>
                        <p style="font-size:12px; color:#94a3b8; margin-bottom:12px;">
                            Utilisez le navigateur pour rechercher les syntaxes de programmation Typon et vérifier la documentation.
                        </p>
                        <button class="widown-btn btn-primary" id="ftn-btn-open-web">🌐 Ouvrir Logol Lhome</button>
                    </div>
                </div>
            `;
        }
    }
}

window.ftnWorkApp = new FTNWorkApp();
