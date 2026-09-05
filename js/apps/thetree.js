// TheTree.xey - Skill Tree with 2 SP Autofill Skill & History Skills
class TheTreeApp {
    constructor() {
        this.nodes = [
            // Row 1 : Outils & Productivité
            {
                id: 'skill_syntax',
                name: 'Auto-Complétion Typon (Touche Tab)',
                desc: 'Permet de compléter instantanément les mots-clés et fonctions avec la touche Tab dans CodeStud.',
                cost: 1,
                unlocked: false,
                category: 'dev',
                requires: []
            },
            {
                id: 'skill_history',
                name: 'Historique Terminal (Flèches Haut/Bas)',
                desc: 'Permet de naviguer dans l\'historique des commandes dans AnyWidown HS et cmd.xey avec les flèches du clavier.',
                cost: 1,
                unlocked: false,
                category: 'dev',
                requires: []
            },
            {
                id: 'skill_autofill',
                name: 'Remplissage Auto des Identifiants (2 SP)',
                desc: 'Pré-remplit automatiquement l\'adresse MAC, le port et les mots de passe des clients dans AnyWidown.',
                cost: 2,
                unlocked: false,
                category: 'dev',
                requires: []
            },
            {
                id: 'skill_lib_gui',
                name: 'Module Typon.GUI',
                desc: 'Permet de concevoir des fenêtres graphiques personnalisées avec `creer_fenetre(...)`.',
                cost: 1,
                unlocked: false,
                category: 'dev',
                requires: [],
                onUnlock: () => window.typon.unlockLibrary('gui')
            },
            // Row 2 : Réseau & Sécurité
            {
                id: 'skill_lib_reseau',
                name: 'Module Typon.Réseau & HSS',
                desc: 'Débloque le protocole chiffré HSS (Port 22 SSH) dans AnyWidown pour les contrats sécurisés.',
                cost: 2,
                unlocked: false,
                category: 'lib',
                requires: [],
                onUnlock: () => window.typon.unlockLibrary('reseau')
            },
            {
                id: 'skill_security_shield',
                name: 'Pare-Feu Anti-Phishing',
                desc: 'Détection automatique des faux liens et mise en spam des emails de phishing dans Outlock.',
                cost: 2,
                unlocked: false,
                category: 'sec',
                requires: ['skill_syntax'],
                onUnlock: () => {
                    const win = document.getElementById('win-outlock');
                    if (win && window.outlockApp) {
                        window.outlockApp.renderEmailView(win);
                    }
                }
            },
            // Row 3 : Avancé & Crypto
            {
                id: 'skill_lib_crypto',
                name: 'Module Typon.Crypto',
                desc: 'Algorithmes de chiffrement AES et sécurité bancaire / médicale.',
                cost: 3,
                unlocked: false,
                category: 'lib',
                requires: ['skill_lib_reseau'],
                onUnlock: () => window.typon.unlockLibrary('crypto')
            },
            {
                id: 'skill_vm_sandbox',
                name: 'Sandbox Virtuelle (VM)',
                desc: 'Environnement isolé pour tester les scripts suspects.',
                cost: 3,
                unlocked: false,
                category: 'sec',
                requires: ['skill_security_shield']
            },
            // Row 4 : Phase IA & Widown 11
            {
                id: 'skill_phase_ia',
                name: '✨ Phase IA Neuronale (Widown 11)',
                desc: 'Modèle d\'intelligence artificielle pour générer et automatiser le code en langage naturel.',
                cost: 5,
                unlocked: false,
                category: 'ai',
                requires: ['skill_lib_crypto', 'skill_vm_sandbox'],
                onUnlock: () => {
                    window.gameEngine.upgradeOS(11);
                }
            }
        ];
    }

    open() {
        const content = `
            <div class="thetree-container">
                <div class="thetree-header">
                    <div class="tree-title-group">
                        <h2>🌳 TheTree.xey - Arbre Technologique</h2>
                        <span class="tree-subtitle">Dépensez vos Points de Compétence (SP) pour débloquer l'autocomplétion, le remplissage auto et de nouveaux modules</span>
                    </div>
                    <div class="tree-points-badge">
                        <span class="sp-icon">⚡</span>
                        <span>Points Disponibles : <strong id="tree-available-sp">${window.gameEngine.skillPoints}</strong> SP</span>
                    </div>
                </div>

                <div class="thetree-grid" id="thetree-grid"></div>

                <div class="thetree-footer">
                    <div class="category-legend">
                        <span class="leg-item"><span class="leg-dot dot-dev"></span> Développement & Confort</span>
                        <span class="leg-item"><span class="leg-dot dot-lib"></span> Bibliothèques Typon & Réseau</span>
                        <span class="leg-item"><span class="leg-dot dot-sec"></span> Cyber-Sécurité</span>
                        <span class="leg-item"><span class="leg-dot dot-ai"></span> Phase IA</span>
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'thetree',
            title: 'TheTree.xey - Arbre de Compétences & Modules',
            icon: 'thetree',
            width: 820,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        this.renderTree(winEl);
        window.gameEngine.subscribe((type, data) => {
            if (type === 'STATS_CHANGED') {
                const spEl = winEl.querySelector('#tree-available-sp');
                if (spEl) spEl.textContent = data.sp;
                this.renderTree(winEl);
            }
        });
    }

    isSkillUnlocked(skillId) {
        const node = this.nodes.find(n => n.id === skillId);
        return node ? node.unlocked : false;
    }

    canUnlock(node) {
        if (node.unlocked) return false;
        if (window.gameEngine.skillPoints < node.cost) return false;
        return node.requires.every(reqId => {
            const reqNode = this.nodes.find(n => n.id === reqId);
            return reqNode && reqNode.unlocked;
        });
    }

    unlockNode(nodeId, winEl) {
        const node = this.nodes.find(n => n.id === nodeId);
        if (!node || !this.canUnlock(node)) return;

        window.gameEngine.skillPoints -= node.cost;
        node.unlocked = true;
        window.soundFX.playSuccess();

        if (node.onUnlock) node.onUnlock();

        window.gameEngine.showNotification('✨ Compétence Débloquée !', `${node.name} est maintenant actif sur votre système.`, 'success');

        const spEl = winEl.querySelector('#tree-available-sp');
        if (spEl) spEl.textContent = window.gameEngine.skillPoints;

        this.renderTree(winEl);
    }

    renderTree(winEl) {
        const grid = winEl.querySelector('#thetree-grid');
        if (!grid) return;

        grid.innerHTML = this.nodes.map(node => {
            const canBuy = this.canUnlock(node);
            return `
                <div class="tree-node-card cat-${node.category} ${node.unlocked ? 'unlocked' : ''} ${canBuy ? 'purchasable' : 'locked'}">
                    <div class="node-badge-row">
                        <span class="node-cat-badge">${node.category.toUpperCase()}</span>
                        <span class="node-cost ${node.unlocked ? 'free' : ''}">${node.unlocked ? 'ACQUIS' : `${node.cost} SP`}</span>
                    </div>
                    <h3 class="node-title">${node.name}</h3>
                    <p class="node-desc">${node.desc}</p>
                    
                    <div class="node-action">
                        ${node.unlocked ? `
                            <button class="node-btn active" disabled>✓ Débloqué</button>
                        ` : `
                            <button class="node-btn ${canBuy ? 'buyable' : 'disabled'}" data-id="${node.id}" ${canBuy ? '' : 'disabled'}>
                                ${canBuy ? `⚡ Débloquer (${node.cost} SP)` : '🔒 Verrouillé'}
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        grid.querySelectorAll('.node-btn.buyable').forEach(btn => {
            btn.addEventListener('click', () => {
                this.unlockNode(btn.dataset.id, winEl);
            });
        });
    }
}

window.theTreeApp = new TheTreeApp();
