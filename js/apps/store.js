// Store.xey - Widown Store (Applications Mobiles, Outils de Développement & Revenus Publicitaires)
class WidownStoreApp {
    constructor() {
        this.selectedTab = 'explore'; // 'explore', 'my_apps', 'tools'
        this.installedTools = {
            'mobilesdk': false,
            'neurotensor': false,
            'netadmin': false
        };

        this.publishedApps = [
            {
                id: 'app_sample',
                name: 'CleanMaster Typon Mobile',
                category: 'Utilitaires',
                icon: '🧹',
                downloads: 1450,
                dailyRevenue: 45,
                rating: '4.8 ★'
            }
        ];

        this.storeCatalog = [
            {
                id: 'mobilesdk',
                title: 'Mobile App SDK 2016',
                icon: '📱',
                category: 'Kit Développeur',
                price: 0,
                desc: 'Permet de compiler et publier vos scripts Typon en véritables applications pour smartphones et tablettes.',
                unlocked: false
            },
            {
                id: 'neurotensor',
                title: 'NeuroTensor Studio Preview',
                icon: '🧠',
                category: 'Intelligence Artificielle',
                price: 350,
                desc: 'Environnement expérimental de deep learning et réseaux neuronaux pour préparer l\'ère de l\'IA générative.',
                unlocked: false
            },
            {
                id: 'netadmin',
                title: 'NetAdmin Pro 9',
                icon: '🌐',
                category: 'Réseaux & Sécurité',
                price: 200,
                desc: 'Outils d\'analyse de trames, scan de ports distants et supervision en temps réel des flux réseau.',
                unlocked: false
            }
        ];

        // Passive daily app revenue timer (every 25s player gets revenue from published apps)
        setInterval(() => {
            if (this.publishedApps.length > 0 && window.gameEngine) {
                let totalRev = 0;
                this.publishedApps.forEach(app => {
                    app.downloads += Math.floor(Math.random() * 12) + 2;
                    totalRev += Math.floor(app.dailyRevenue * 0.2);
                });
                if (totalRev > 0) {
                    window.gameEngine.addReward(totalRev, 0);
                    const trayMoney = document.getElementById('tray-money');
                    if (trayMoney) trayMoney.textContent = `${window.gameEngine.money} €`;
                }
            }
        }, 25000);
    }

    open() {
        const content = `
            <div class="store-container">
                <!-- Store Top Header -->
                <div class="store-header">
                    <div class="store-brand">
                        <span class="store-icon">🛍️</span>
                        <div>
                            <strong>Widown Store</strong>
                            <small>Marché d'Applications & Outils Développeurs</small>
                        </div>
                    </div>
                    <div class="store-nav-tabs">
                        <button class="store-tab-btn ${this.selectedTab === 'explore' ? 'active' : ''}" data-tab="explore">À la Une</button>
                        <button class="store-tab-btn ${this.selectedTab === 'my_apps' ? 'active' : ''}" data-tab="my_apps">Mes Applis Mobiles (${this.publishedApps.length})</button>
                        <button class="store-tab-btn ${this.selectedTab === 'tools' ? 'active' : ''}" data-tab="tools">Outils & SDKs</button>
                    </div>
                </div>

                <!-- Store Content View -->
                <div class="store-main-view" id="store-main-view"></div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'widown_store',
            title: '🛍️ Widown Store - Applications Mobiles & Outils',
            icon: 'browser',
            width: 820,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        this.renderTab(winEl);

        winEl.querySelectorAll('.store-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                winEl.querySelectorAll('.store-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedTab = btn.dataset.tab;
                this.renderTab(winEl);
            });
        });
    }

    renderTab(winEl) {
        const view = winEl.querySelector('#store-main-view');
        if (!view) return;

        if (this.selectedTab === 'explore') {
            view.innerHTML = `
                <div class="store-banner">
                    <div class="banner-text">
                        <h3>L'Ère Mobile est Arrivée sur Windown 10</h3>
                        <p>Créez vos scripts mobiles en Typon avec <code>mobile.creer_app()</code> et publiez-les directement pour générer des revenus passifs quotidiens !</p>
                    </div>
                </div>

                <div class="store-section-title">Applications Populaires du Moment</div>
                <div class="store-grid">
                    ${this.publishedApps.map(app => `
                        <div class="store-app-card">
                            <div class="app-card-icon">${app.icon}</div>
                            <div class="app-card-details">
                                <strong>${app.name}</strong>
                                <span class="app-card-cat">${app.category} • ${app.rating}</span>
                                <small>📥 ${app.downloads} téléchargements • +${app.dailyRevenue} €/j</small>
                            </div>
                            <button class="widown-btn btn-sm btn-primary">Installé</button>
                        </div>
                    `).join('')}
                    <div class="store-app-card">
                        <div class="app-card-icon">📸</div>
                        <div class="app-card-details">
                            <strong>PhotoFilter Pro</strong>
                            <span class="app-card-cat">Multimédia • 4.6 ★</span>
                            <small>📥 24 500 téléchargements</small>
                        </div>
                        <button class="widown-btn btn-sm">Gratuit</button>
                    </div>
                    <div class="store-app-card">
                        <div class="app-card-icon">⚡</div>
                        <div class="app-card-details">
                            <strong>FlashBrowser Mobile</strong>
                            <span class="app-card-cat">Navigateurs • 4.7 ★</span>
                            <small>📥 120 000 téléchargements</small>
                        </div>
                        <button class="widown-btn btn-sm">Gratuit</button>
                    </div>
                </div>
            `;
        } else if (this.selectedTab === 'my_apps') {
            const hasMobileApp = window.gameEngine && window.gameEngine.lastMobileApp;
            view.innerHTML = `
                <div class="my-apps-header">
                    <div>
                        <h3>Gestion de vos Publications Mobiles</h3>
                        <p>Vos applications génèrent des téléchargements et des revenus passifs réguliers sur votre compte en banque.</p>
                    </div>
                </div>

                ${hasMobileApp ? `
                    <div class="publish-ready-box" style="background:#f0fdf4; border:2px dashed #22c55e; padding:16px; border-radius:8px; margin-bottom:20px;">
                        <h4 style="color:#15803d; margin:0 0 6px 0;">📱 Nouvelle Application Prête à Publier : <em>"${window.gameEngine.lastMobileApp.name}"</em></h4>
                        <p style="font-size:12px; color:#166534; margin:0 0 12px 0;">
                            Ce projet a été compilé depuis CodeStud avec le module <code>mobile</code>.
                            Vues intégrées : <code>${window.gameEngine.lastMobileApp.views.join(', ') || 'Accueil'}</code>.
                        </p>
                        <button class="widown-btn btn-success" id="btn-publish-detected-app">
                            🚀 Publier sur le Widown Store (+400 € prime de sortie)
                        </button>
                    </div>
                ` : `
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px; font-size:12px; color:#64748b; margin-bottom:16px;">
                        💡 <strong>Astuce Développeur :</strong> Écrivez un script Typon avec <code>mobile.creer_app("NomDeLAppli")</code> et <code>mobile.ajouter_vue("Accueil")</code> dans CodeStud, puis exécutez-le pour pouvoir le publier ici !
                    </div>
                `}

                <div class="store-grid">
                    ${this.publishedApps.map(app => `
                        <div class="store-app-card owned">
                            <div class="app-card-icon">${app.icon}</div>
                            <div class="app-card-details">
                                <strong>${app.name}</strong>
                                <span class="app-card-cat">${app.category}</span>
                                <small>📥 ${app.downloads} téléchargements • +${app.dailyRevenue} €/jour</small>
                            </div>
                            <span class="store-status-badge">En Ligne</span>
                        </div>
                    `).join('')}
                </div>
            `;

            const pubBtn = view.querySelector('#btn-publish-detected-app');
            if (pubBtn && hasMobileApp) {
                pubBtn.addEventListener('click', () => {
                    const newApp = {
                        id: 'app_' + Date.now(),
                        name: window.gameEngine.lastMobileApp.name,
                        category: 'Applications Typon',
                        icon: '📱',
                        downloads: 120,
                        dailyRevenue: 60,
                        rating: '5.0 ★'
                    };
                    this.publishedApps.push(newApp);
                    window.gameEngine.addReward(400, 3);
                    window.gameEngine.lastMobileApp = null;
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('🎉 Application Mobile Publiée !', `"${newApp.name}" est en ligne ! +400 € et revenus passifs activés.`, 'success');
                    this.renderTab(winEl);
                });
            }
        } else if (this.selectedTab === 'tools') {
            view.innerHTML = `
                <div class="store-section-title">Kits de Développement & Outils Pro</div>
                <div class="store-grid">
                    ${this.storeCatalog.map(tool => `
                        <div class="store-app-card">
                            <div class="app-card-icon">${tool.icon}</div>
                            <div class="app-card-details">
                                <strong>${tool.title}</strong>
                                <span class="app-card-cat">${tool.category}</span>
                                <p style="font-size:11px; margin:4px 0; color:#64748b;">${tool.desc}</p>
                            </div>
                            <button class="widown-btn ${tool.unlocked ? 'btn-secondary' : 'btn-primary'} btn-sm btn-buy-tool" data-id="${tool.id}" ${tool.unlocked ? 'disabled' : ''}>
                                ${tool.unlocked ? '✔ Acquis' : (tool.price === 0 ? 'Gratuit' : `${tool.price} €`)}
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;

            view.querySelectorAll('.btn-buy-tool').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    const item = this.storeCatalog.find(t => t.id === id);
                    if (!item || item.unlocked) return;

                    if (window.gameEngine.money < item.price) {
                        alert(`Fonds insuffisants ! Il vous faut ${item.price} €.`);
                        return;
                    }

                    window.gameEngine.money -= item.price;
                    window.gameEngine.notify('STATS_CHANGED', { money: window.gameEngine.money, sp: window.gameEngine.skillPoints });
                    item.unlocked = true;
                    this.installedTools[id] = true;

                    if (id === 'neurotensor' && window.typon) {
                        window.typon.unlockLibrary('ia');
                    }

                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('🛍️ Outil Installé !', `${item.title} a été ajouté à votre station de travail.`, 'success');
                    this.renderTab(winEl);
                });
            });
        }
    }
}

window.widownStoreApp = new WidownStoreApp();
