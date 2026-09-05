// InvestHub.xey - Economy, Real Estate, Hardware, Licenses, Staff, Crypto & Ad Management
class InvestHubApp {
    constructor() {
        this.activeTab = 'hardware'; // 'hardware', 'licenses', 'realestate', 'staff', 'business', 'crypto', 'ads', 'bills'
    }

    open() {
        const content = `
            <div class="investhub-container">
                <!-- Navigation Tabs Header -->
                <div class="investhub-tabs">
                    <button class="ih-tab-btn ${this.activeTab === 'hardware' ? 'active' : ''}" data-tab="hardware">⚙️ Matériel PC</button>
                    <button class="ih-tab-btn ${this.activeTab === 'licenses' ? 'active' : ''}" data-tab="licenses">📜 Licences OS</button>
                    <button class="ih-tab-btn ${this.activeTab === 'realestate' ? 'active' : ''}" data-tab="realestate">🏢 Immobilier</button>
                    <button class="ih-tab-btn ${this.activeTab === 'staff' ? 'active' : ''}" data-tab="staff">👔 Salariés</button>
                    <button class="ih-tab-btn ${this.activeTab === 'business' ? 'active' : ''}" data-tab="business">💼 Entreprises</button>
                    <button class="ih-tab-btn ${this.activeTab === 'crypto' ? 'active' : ''}" data-tab="crypto">📈 WidCoin</button>
                    <button class="ih-tab-btn ${this.activeTab === 'ads' ? 'active' : ''}" data-tab="ads">📢 Pubs & Popups</button>
                    <button class="ih-tab-btn ${this.activeTab === 'bills' ? 'active' : ''}" data-tab="bills">💶 Charges & Factures</button>
                </div>

                <!-- Tab Content Viewport -->
                <div class="investhub-content" id="ih-content-pane">
                    ${this.renderActiveTab()}
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'investhub',
            title: 'InvestHub Pro 2024 - Gestion Financière & Investissements',
            icon: 'store',
            width: 890,
            height: 580,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    renderActiveTab() {
        switch (this.activeTab) {
            case 'hardware': return this.renderHardwareTab();
            case 'licenses': return this.renderLicensesTab();
            case 'realestate': return this.renderRealEstateTab();
            case 'staff': return this.renderStaffTab();
            case 'business': return this.renderBusinessTab();
            case 'crypto': return this.renderCryptoTab();
            case 'ads': return this.renderAdsTab();
            case 'bills': return this.renderBillsTab();
            default: return this.renderHardwareTab();
        }
    }

    renderHardwareTab() {
        const specs = window.gameEngine.pcSpecs;
        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Améliorations Matérielles & Capacité Serveur</h3>
                    <p>Augmentez votre mémoire vive (RAM) pour héberger davantage de machines virtuelles (VMs) en parallèle.</p>
                </div>

                <div class="ih-current-specs-banner">
                    <div>💻 CPU : <strong>${specs.cpu}</strong></div>
                    <div>⚡ RAM : <strong>${specs.ramGB} Go</strong> (Capacité : <strong>${specs.maxVMs} VM simultanées</strong>)</div>
                    <div>💾 Stockage : <strong>${specs.storage}</strong></div>
                </div>

                <div class="ih-cards-grid">
                    <!-- RAM Upgrades -->
                    <div class="ih-card">
                        <h4>⚡ Barrette RAM 8 Go DDR3</h4>
                        <p>Passe la capacité à <strong>2 VMs simultanées</strong>.</p>
                        <div class="ih-price">250 €</div>
                        <button class="widown-btn btn-primary btn-sm btn-upgrade-ram" data-gb="8" data-cost="250" ${specs.ramGB >= 8 ? 'disabled' : ''}>
                            ${specs.ramGB >= 8 ? 'Déjà Installé' : 'Acheter & Installer'}
                        </button>
                    </div>

                    <div class="ih-card">
                        <h4>⚡ Kit Mémoire 16 Go DDR4</h4>
                        <p>Passe la capacité à <strong>4 VMs simultanées</strong> et débloque le haut débit.</p>
                        <div class="ih-price">600 €</div>
                        <button class="widown-btn btn-primary btn-sm btn-upgrade-ram" data-gb="16" data-cost="600" ${specs.ramGB >= 16 ? 'disabled' : ''}>
                            ${specs.ramGB >= 16 ? 'Déjà Installé' : 'Acheter & Installer'}
                        </button>
                    </div>

                    <div class="ih-card">
                        <h4>⚡ Kit Mémoire 32 Go High-Perf</h4>
                        <p>Passe la capacité à <strong>6 VMs simultanées</strong>.</p>
                        <div class="ih-price">1 400 €</div>
                        <button class="widown-btn btn-primary btn-sm btn-upgrade-ram" data-gb="32" data-cost="3200" ${specs.ramGB >= 32 ? 'disabled' : ''}>
                            ${specs.ramGB >= 32 ? 'Déjà Installé' : 'Acheter & Installer'}
                        </button>
                    </div>

                    <div class="ih-card">
                        <h4>⚡ Station Datacenter 64 Go ECC</h4>
                        <p>Passe la capacité à <strong>10 VMs simultanées</strong>.</p>
                        <div class="ih-price">3 200 €</div>
                        <button class="widown-btn btn-primary btn-sm btn-upgrade-ram" data-gb="64" data-cost="3200" ${specs.ramGB >= 64 ? 'disabled' : ''}>
                            ${specs.ramGB >= 64 ? 'Déjà Installé' : 'Acheter & Installer'}
                        </button>
                    </div>

                    <!-- CPU Upgrades -->
                    <div class="ih-card">
                        <h4>🧠 Intel Core i7 Octa-Core (3.8 GHz)</h4>
                        <p>Compilation instantanée et vitesse d'exécution des scripts x2.</p>
                        <div class="ih-price">1 100 €</div>
                        <button class="widown-btn btn-primary btn-sm btn-upgrade-cpu" data-cpu="Intel Core i7-8700K (3.8 GHz)" data-cost="1100">
                            Améliorer CPU
                        </button>
                    </div>

                    <!-- Storage Upgrades -->
                    <div class="ih-card">
                        <h4>💾 SSD NVMe Ultra 2 To</h4>
                        <p>Démarrage ultra-rapide des systèmes d'exploitation virtualisés.</p>
                        <div class="ih-price">350 €</div>
                        <button class="widown-btn btn-primary btn-sm btn-upgrade-storage" data-storage="SSD NVMe M.2 2 To" data-cost="350">
                            Installer NVMe
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderLicensesTab() {
        const currentEd = window.gameEngine.osEdition;
        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Licences Officielles du Système d'Exploitation</h3>
                    <p>Fournies par <strong>Windown Companie</strong>. Choisissez votre niveau de sécurité et de fonctionnalités.</p>
                </div>

                <div class="ih-cards-grid">
                    <div class="ih-card ${currentEd === 'famille' ? 'card-current' : ''}">
                        <h4>🏠 Windown Édition Famille</h4>
                        <p>Version basique à bas coût. <strong>Attention :</strong> souvent oubliée par les mises à jour, accumule les failles de sécurité dans le temps et ne supporte pas les VM !</p>
                        <div class="ih-price">29 €</div>
                        <button class="widown-btn btn-sm btn-set-edition" data-edition="famille" data-cost="29" ${currentEd === 'famille' ? 'disabled' : ''}>
                            ${currentEd === 'famille' ? 'Licence Active' : 'Rétrograder'}
                        </button>
                    </div>

                    <div class="ih-card ${currentEd === 'normale' ? 'card-current' : ''}">
                        <h4>💻 Windown Édition Normale</h4>
                        <p>Version standard pour les particuliers et freelances. Mises à jour manuelles, protection antivirale classique.</p>
                        <div class="ih-price">89 €</div>
                        <button class="widown-btn btn-sm btn-set-edition" data-edition="normale" data-cost="89" ${currentEd === 'normale' ? 'disabled' : ''}>
                            ${currentEd === 'normale' ? 'Licence Active' : 'Acheter Licence Normale'}
                        </button>
                    </div>

                    <div class="ih-card card-featured ${currentEd === 'pro' ? 'card-current' : ''}">
                        <div class="ih-badge-star">RECOMMANDÉ</div>
                        <h4>🏢 Windown Édition Professionnelle (PRO)</h4>
                        <p>Mises à jour automatiques transparentes, sécurité noyau renforcée et <strong>débloque la virtualisation de VM dès Windown 9</strong> !</p>
                        <div class="ih-price">199 €</div>
                        <button class="widown-btn btn-success btn-sm btn-set-edition" data-edition="pro" data-cost="199" ${currentEd === 'pro' ? 'disabled' : ''}>
                            ${currentEd === 'pro' ? 'Licence PRO Active' : 'Mettre à Niveau vers PRO'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderRealEstateTab() {
        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Locaux & Sièges d'Entreprise</h3>
                    <p>Acquérez de plus grands espaces pour accueillir vos employés et installer des serveurs.</p>
                </div>

                <div class="ih-cards-grid">
                    ${window.gameEngine.realEstate.map(prop => `
                        <div class="ih-card ${prop.owned ? 'card-current' : ''}">
                            <h4>🏢 ${prop.name}</h4>
                            <p>Capacité : <strong>${prop.desks} postes de travail</strong> | Loyer : <strong>${prop.rent} € / cycle</strong></p>
                            <div class="ih-price">${prop.cost === 0 ? 'Inclus' : prop.cost.toLocaleString() + ' €'}</div>
                            <button class="widown-btn ${prop.owned ? 'btn-secondary' : 'btn-primary'} btn-sm btn-buy-prop" data-id="${prop.id}" ${prop.owned ? 'disabled' : ''}>
                                ${prop.owned ? 'Locaux Actuels' : 'Acheter & Emménager'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderStaffTab() {
        const currentProp = window.gameEngine.realEstate.find(p => p.owned) || window.gameEngine.realEstate[0];
        const totalStaff = window.gameEngine.staffList.reduce((acc, s) => acc + s.count, 0);

        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Ressources Humaines & Salariés</h3>
                    <p>Postes occupés : <strong>${totalStaff} / ${currentProp.desks} bureaux</strong> dans <em>${currentProp.name}</em>.</p>
                </div>

                <div class="ih-cards-grid">
                    ${window.gameEngine.staffList.map(staff => `
                        <div class="ih-card">
                            <h4>👔 ${staff.name} (Effectif : ${staff.count})</h4>
                            <p>Génère <strong>+${staff.revenue} €</strong> de chiffre d'affaires pour <strong>${staff.salary} €</strong> de salaire par cycle.</p>
                            <div class="ih-price">Salaire : ${staff.salary} € / cycle</div>
                            <button class="widown-btn btn-primary btn-sm btn-hire-staff" data-id="${staff.id}">
                                Recruter (+1)
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderBusinessTab() {
        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Rachat d'Entreprises Fonctionnelles</h3>
                    <p>Investissez dans des entreprises générant des dividendes passifs continus.</p>
                </div>

                <div class="ih-cards-grid">
                    ${window.gameEngine.businesses.map(b => `
                        <div class="ih-card ${b.owned ? 'card-current' : ''}">
                            <h4>${b.icon} ${b.name}</h4>
                            <p>${b.desc}</p>
                            <div class="ih-profit-box">Bénéfice : <strong>+${b.revenue.toLocaleString()} € / cycle</strong></div>
                            <div class="ih-price">${b.cost.toLocaleString()} €</div>
                            <button class="widown-btn ${b.owned ? 'btn-secondary' : 'btn-success'} btn-sm btn-buy-biz" data-id="${b.id}" ${b.owned ? 'disabled' : ''}>
                                ${b.owned ? 'Déjà Propriétaire' : 'Racheter l\'Entreprise'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderCryptoTab() {
        const crypto = window.gameEngine.crypto;
        const totalVal = Math.round(crypto.widCoin * crypto.price * 100) / 100;

        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Bourse Crypto - WidCoin (WDC)</h3>
                    <p>Marché décentralisé avec fluctuations de cours en temps réel.</p>
                </div>

                <div class="crypto-dashboard">
                    <div class="crypto-stat-card">
                        <span class="label">Cours Actuel WidCoin :</span>
                        <span class="val-big" id="crypto-live-price">${crypto.price.toFixed(2)} €</span>
                    </div>
                    <div class="crypto-stat-card">
                        <span class="label">Vos Avoirs WDC :</span>
                        <span class="val-big">${crypto.widCoin.toFixed(4)} WDC</span>
                        <small>Valorisation : ~${totalVal.toLocaleString()} €</small>
                    </div>
                </div>

                <div class="crypto-history-bar">
                    <span style="font-size:12px; color:#64748b;">Historique récent :</span>
                    <div class="crypto-sparkline">
                        ${crypto.history.map(p => `<span class="spark-bar" style="height:${Math.max(10, Math.min(45, (p - 80) * 0.4))}px;"></span>`).join('')}
                    </div>
                </div>

                <div class="crypto-trading-actions">
                    <div class="trade-box">
                        <h4>Acheter WidCoin</h4>
                        <div class="trade-btns">
                            <button class="widown-btn btn-sm btn-primary btn-trade-crypto" data-action="buy" data-amt="100">+100 €</button>
                            <button class="widown-btn btn-sm btn-primary btn-trade-crypto" data-action="buy" data-amt="500">+500 €</button>
                            <button class="widown-btn btn-sm btn-primary btn-trade-crypto" data-action="buy" data-amt="2000">+2 000 €</button>
                        </div>
                    </div>
                    <div class="trade-box">
                        <h4>Vendre WidCoin</h4>
                        <div class="trade-btns">
                            <button class="widown-btn btn-sm btn-secondary btn-trade-crypto" data-action="sell" data-amt="100">Vendre 100 €</button>
                            <button class="widown-btn btn-sm btn-secondary btn-trade-crypto" data-action="sell" data-amt="500">Vendre 500 €</button>
                            <button class="widown-btn btn-sm btn-secondary btn-trade-crypto" data-action="sell" data-amt="2000">Vendre 2 000 €</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAdsTab() {
        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Monétisation Publicitaire & Pop-ups</h3>
                    <p>Ajoutez des bannières sur les sites populaires ou lancez des sites de pop-ups agressifs toutes les 15 secondes pour du cash rapide.</p>
                </div>

                <div class="ih-cards-grid">
                    <!-- Clean Banner Ads -->
                    <div class="ih-card">
                        <h4>📢 Bannières Publicitaires Propres</h4>
                        <p>Placer des publicités discrètes sur vos créations web et sur les sites à fort trafic. Revenu passif régulier et pérenne.</p>
                        <div class="ih-profit-box">+120 € / cycle</div>
                        <button class="widown-btn ${window.gameEngine.cleanAdsActive ? 'btn-danger' : 'btn-success'} btn-sm btn-toggle-clean-ads">
                            ${window.gameEngine.cleanAdsActive ? 'Désactiver les Bannières' : 'Activer les Bannières Propres'}
                        </button>
                    </div>

                    <!-- Aggressive 15-second spam popup network -->
                    <div class="ih-card card-spam">
                        <div class="ih-badge-star" style="background:#dc2626;">HAUT RISQUE / COURT TERME</div>
                        <h4>⚡ Réseau de Pop-ups Spam (Toutes les 15s)</h4>
                        <p>Sites agressifs type <em>"Gagnez 1 000 000 € !"</em>. Génère beaucoup d'argent à très court terme (+280 €/cycle), mais devient vite non rentable suite au blacklistage si l'hébergement n'est pas résilié !</p>
                        <div class="ih-profit-box" style="color:#b91c1c;">+280 € au début puis chute</div>
                        <div class="spam-controls">
                            <button class="widown-btn btn-danger btn-sm btn-create-spam-site">Lancer un Site Pop-up 15s</button>
                        </div>
                        <div class="spam-active-list" style="margin-top:8px; font-size:12px;">
                            ${window.gameEngine.spamSites.map((s, idx) => `
                                <div style="display:flex; justify-content:space-between; margin-top:4px; padding:4px; background:#fee2e2; border-radius:4px;">
                                    <span>${s.name} (Cycles: ${s.cyclesRun || 0})</span>
                                    <button class="widown-btn btn-sm btn-abandon-spam" data-idx="${idx}">Résilier Hébergement</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBillsTab() {
        const prop = window.gameEngine.realEstate.find(p => p.owned) || window.gameEngine.realEstate[0];
        const rent = prop.rent;
        const power = 25 + (window.vmManagerApp && window.vmManagerApp.getActiveVMCount ? window.vmManagerApp.getActiveVMCount() * 8 : 0);
        const net = window.gameEngine.pcSpecs.ramGB >= 16 ? 80 : 40;
        let wages = 0;
        let staffRev = 0;
        window.gameEngine.staffList.forEach(s => {
            wages += s.count * s.salary;
            staffRev += s.count * s.revenue;
        });

        let bizRev = 0;
        window.gameEngine.businesses.forEach(b => { if (b.owned) bizRev += b.revenue; });

        const totalCharges = rent + power + net + wages;
        const totalIncome = staffRev + bizRev + (window.gameEngine.cleanAdsActive ? 120 : 0);
        const netResult = totalIncome - totalCharges;

        return `
            <div class="ih-pane">
                <div class="ih-pane-header">
                    <h3>Budget Périodique & Factures Récurrentes</h3>
                    <p>Débitées automatiquement toutes les 40 secondes lors de chaque cycle de gestion.</p>
                </div>

                <div class="bills-summary-table">
                    <table class="widown-table" style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="background:#f1f5f9; text-align:left;">
                                <th style="padding:8px;">Poste de Charge / Revenu</th>
                                <th style="padding:8px;">Montant / Cycle</th>
                                <th style="padding:8px;">Détails</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:8px;">🏢 Loyer Locaux</td>
                                <td style="padding:8px; color:#dc2626;">-${rent} €</td>
                                <td style="padding:8px;">${prop.name}</td>
                            </tr>
                            <tr>
                                <td style="padding:8px;">⚡ Électricité & Climatisation Datacenter</td>
                                <td style="padding:8px; color:#dc2626;">-${power} €</td>
                                <td style="padding:8px;">Base 25 € + 8 € par machine virtuelle active</td>
                            </tr>
                            <tr>
                                <td style="padding:8px;">🌐 Connexion Fibre Haut Débit</td>
                                <td style="padding:8px; color:#dc2626;">-${net} €</td>
                                <td style="padding:8px;">Ligne dédiée IP fixe sécurisée</td>
                            </tr>
                            <tr>
                                <td style="padding:8px;">👔 Salaires des Employés</td>
                                <td style="padding:8px; color:#dc2626;">-${wages} €</td>
                                <td style="padding:8px;">Rémunération de l'équipe</td>
                            </tr>
                            <tr style="background:#f0fdf4;">
                                <td style="padding:8px;">💼 Revenus Salariés & Entreprises</td>
                                <td style="padding:8px; color:#16a34a;">+${totalIncome} €</td>
                                <td style="padding:8px;">Chiffre d'affaires passif</td>
                            </tr>
                            <tr style="font-weight:bold; border-top:2px solid #cbd5e1;">
                                <td style="padding:8px;">BILAN NET DU CYCLE</td>
                                <td style="padding:8px; color:${netResult >= 0 ? '#16a34a' : '#dc2626'};">${netResult >= 0 ? '+' : ''}${netResult} €</td>
                                <td style="padding:8px;">Flux monétaire net crédité/débité</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    initEvents(winEl) {
        // Tab switching
        winEl.addEventListener('click', (e) => {
            const tabBtn = e.target.closest('.ih-tab-btn');
            if (tabBtn) {
                this.activeTab = tabBtn.dataset.tab;
                winEl.querySelectorAll('.ih-tab-btn').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
                const contentPane = winEl.querySelector('#ih-content-pane');
                if (contentPane) contentPane.innerHTML = this.renderActiveTab();
            }

            // Upgrade RAM
            const ramBtn = e.target.closest('.btn-upgrade-ram');
            if (ramBtn) {
                const gb = parseInt(ramBtn.dataset.gb);
                const cost = parseInt(ramBtn.dataset.cost);
                if (window.gameEngine.upgradeRAM(gb, cost)) {
                    this.updateContent(winEl);
                }
            }

            // Upgrade CPU
            const cpuBtn = e.target.closest('.btn-upgrade-cpu');
            if (cpuBtn) {
                const cpu = cpuBtn.dataset.cpu;
                const cost = parseInt(cpuBtn.dataset.cost);
                if (window.gameEngine.upgradeCPU(cpu, cost)) {
                    this.updateContent(winEl);
                }
            }

            // Upgrade Storage
            const storageBtn = e.target.closest('.btn-upgrade-storage');
            if (storageBtn) {
                const storage = storageBtn.dataset.storage;
                const cost = parseInt(storageBtn.dataset.cost);
                if (window.gameEngine.upgradeStorage(storage, cost)) {
                    this.updateContent(winEl);
                }
            }

            // Set OS Edition
            const edBtn = e.target.closest('.btn-set-edition');
            if (edBtn) {
                const ed = edBtn.dataset.edition;
                const cost = parseInt(edBtn.dataset.cost);
                if (window.gameEngine.setOSEdition(ed, cost)) {
                    this.updateContent(winEl);
                }
            }

            // Buy Real Estate
            const propBtn = e.target.closest('.btn-buy-prop');
            if (propBtn) {
                const propId = propBtn.dataset.id;
                if (window.gameEngine.buyRealEstate(propId)) {
                    this.updateContent(winEl);
                }
            }

            // Hire Staff
            const hireBtn = e.target.closest('.btn-hire-staff');
            if (hireBtn) {
                const staffId = hireBtn.dataset.id;
                if (window.gameEngine.hireStaff(staffId)) {
                    this.updateContent(winEl);
                }
            }

            // Buy Business
            const bizBtn = e.target.closest('.btn-buy-biz');
            if (bizBtn) {
                const bizId = bizBtn.dataset.id;
                if (window.gameEngine.buyBusiness(bizId)) {
                    this.updateContent(winEl);
                }
            }

            // Crypto Trading
            const cryptoBtn = e.target.closest('.btn-trade-crypto');
            if (cryptoBtn) {
                const action = cryptoBtn.dataset.action;
                const amt = parseInt(cryptoBtn.dataset.amt);
                if (window.gameEngine.tradeCrypto(action, amt)) {
                    this.updateContent(winEl);
                }
            }

            // Toggle Clean Ads
            const adsToggle = e.target.closest('.btn-toggle-clean-ads');
            if (adsToggle) {
                window.gameEngine.cleanAdsActive = !window.gameEngine.cleanAdsActive;
                window.gameEngine.showNotification('Monétisation Web', window.gameEngine.cleanAdsActive ? 'Bannières propres activées (+120 € / cycle)' : 'Bannières désactivées', 'info');
                this.updateContent(winEl);
            }

            // Create Spam Site
            const createSpamBtn = e.target.closest('.btn-create-spam-site');
            if (createSpamBtn) {
                const spamNames = ['Gagnez 1 000 000 € Express', 'Casino Roulette Gagnante 100%', 'iPhone Gratuit Concours Direct'];
                const randName = spamNames[Math.floor(Math.random() * spamNames.length)];
                window.gameEngine.spamSites.push({
                    name: randName,
                    active: true,
                    cyclesRun: 0
                });
                window.gameEngine.showNotification('Pop-up 15s Déployé !', `Le site "${randName}" affiche des pop-ups toutes les 15s. Attention à l'essoufflement !`, 'danger');
                this.updateContent(winEl);
            }

            // Abandon Spam Site
            const abandonBtn = e.target.closest('.btn-abandon-spam');
            if (abandonBtn) {
                const idx = parseInt(abandonBtn.dataset.idx);
                window.gameEngine.spamSites.splice(idx, 1);
                window.gameEngine.showNotification('Hébergement Résilié', 'Site de pop-up abandonné. Fin des frais d\'hébergement.', 'info');
                this.updateContent(winEl);
            }
        });

        // Crypto price live updates
        window.gameEngine.subscribe((type) => {
            if (type === 'CRYPTO_UPDATED' && this.activeTab === 'crypto') {
                const priceEl = winEl.querySelector('#crypto-live-price');
                if (priceEl) priceEl.textContent = `${window.gameEngine.crypto.price.toFixed(2)} €`;
            }
        });
    }

    updateContent(winEl) {
        const pane = winEl.querySelector('#ih-content-pane');
        if (pane) pane.innerHTML = this.renderActiveTab();
    }
}

window.investHubApp = new InvestHubApp();
