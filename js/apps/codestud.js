// CodeStud IDE Application (VS Code / Visual Studio Parody)
class CodeStudApp {
    constructor() {
        this.currentFilePath = null;
        this.openTabs = [];
        this.activeTabIndex = -1;
    }

    open() {
        if (window.vfs && typeof window.vfs.ensureEssentialFiles === 'function') {
            window.vfs.ensureEssentialFiles();
        }

        const projectFiles = window.vfs.listDir('C:/Utilisateurs/Joueur/Projets').filter(f => f.type === 'file');

        // Always show all project files in tabs so the player sees all their scripts
        if (projectFiles.length > 0) {
            const validTabs = this.openTabs.filter(t => window.vfs.readFile(t.path).success);
            projectFiles.forEach(f => {
                if (!validTabs.some(t => t.path === f.path)) {
                    validTabs.push({ name: f.name, path: f.path });
                }
            });
            this.openTabs = validTabs;

            if (!this.currentFilePath || !projectFiles.some(f => f.path === this.currentFilePath)) {
                this.currentFilePath = this.openTabs[0].path;
                this.activeTabIndex = 0;
            } else {
                this.activeTabIndex = this.openTabs.findIndex(t => t.path === this.currentFilePath);
            }
        } else {
            this.currentFilePath = null;
            this.openTabs = [];
            this.activeTabIndex = -1;
        }

        const content = `
            <div class="codestud-container">
                <div class="codestud-toolbar">
                    <div class="cs-menu-group">
                        <button class="cs-tool-btn" id="cs-new-file" title="Créer un nouveau fichier Typon">📄 Nouveau .ty</button>
                        <button class="cs-tool-btn" id="cs-save-file" title="Enregistrer le fichier">💾 Enregistrer</button>
                        <button class="cs-tool-btn cs-run-btn" id="cs-run-btn" title="Exécuter le script Typon">▶ Exécuter (F5)</button>
                        <button class="cs-tool-btn" id="cs-ai-btn" title="Générateur IA (Widown 11)" style="display:none;">✨ IA Autonome</button>
                    </div>
                    <div class="cs-status-badge" id="cs-env-status">
                        <span class="status-dot"></span>
                        <span class="status-label">Environnement Typon</span>
                    </div>
                </div>

                <div class="codestud-main">
                    <div class="codestud-sidebar">
                        <div class="sidebar-header">EXPLORATEUR DE PROJET</div>
                        <div class="project-tree" id="cs-project-tree"></div>
                        
                        <div class="sidebar-header" style="margin-top:16px;">AIDE & DOCUMENTATION</div>
                        <div style="padding:4px 6px;">
                            <button class="cs-tool-btn" id="cs-open-doc-web" style="width:100%; margin-bottom:8px; font-size:11px; text-align:center; background:#0284c7; color:#fff; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Consulter la documentation officielle en ligne">🌐 Doc Typon (Web)</button>
                            <div style="font-size:10px; font-weight:bold; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Modèles de scripts :</div>
                            <div style="display:flex; flex-direction:column; gap:4px; margin-bottom:8px;">
                                <button class="cs-tool-btn cs-template-btn" data-template="tri_clips" style="font-size:10px; text-align:left; padding:4px 6px;">🎮 tri_clips.ty (Lucas)</button>
                                <button class="cs-tool-btn cs-template-btn" data-template="facturation" style="font-size:10px; text-align:left; padding:4px 6px;">💍 facturation.ty (Sophie)</button>
                                <button class="cs-tool-btn cs-template-btn" data-template="calcul_devis" style="font-size:10px; text-align:left; padding:4px 6px;">🔨 calcul_devis.ty (Maxime)</button>
                                <button class="cs-tool-btn cs-template-btn" data-template="bot_doscord" style="font-size:10px; text-align:left; padding:4px 6px;">🤖 bot_doscord.ty (VPS)</button>
                                <button class="cs-tool-btn cs-template-btn" data-template="recup_fonds" style="font-size:10px; text-align:left; padding:4px 6px;">☠️ recup_fonds.ty (Cyber)</button>
                            </div>
                        </div>
                        <div class="doc-preview-panel" id="cs-doc-panel">
                            <em>Survolez un mot-clé (ex: <code>importer</code>, <code>classer_dossier</code>, <code>deplacer</code>) pour afficher sa documentation officielle.</em>
                        </div>
                    </div>

                    <div class="codestud-editor-area">
                        <div class="codestud-tabs" id="cs-tabs"></div>

                        <div class="editor-workspace">
                            <div class="line-numbers" id="cs-line-numbers">1<br>2<br>3<br>4<br>5</div>
                            <div class="editor-wrapper">
                                <textarea id="cs-code-input" spellcheck="false" placeholder="# Aucun fichier ouvert.\n# Cliquez sur '📄 Nouveau .ty' pour commencer à coder."></textarea>
                                <div id="cs-code-highlight" class="code-highlight-layer"></div>
                                <div id="cs-doc-tooltip" class="doc-hover-tooltip" style="display:none;"></div>
                            </div>
                        </div>

                        <div class="codestud-terminal">
                            <div class="terminal-header">
                                <span>CONSOLE DE SORTIE / TERMINAL TYPON</span>
                                <button class="term-clear" id="cs-term-clear">Effacer</button>
                            </div>
                            <div class="terminal-output" id="cs-terminal-output">
                                <div class="term-line info">[CodeStud] IDE Prêt. Créez un fichier .ty pour exécuter vos scripts.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'codestud',
            title: 'CodeStud 2024 - IDE Développeur (Widown Edition)',
            icon: 'codestud',
            width: 860,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl),
            onClose: () => {
                if (this.currentFilePath) {
                    const inputEl = document.querySelector('#cs-code-input');
                    if (inputEl && inputEl.value !== undefined) {
                        window.vfs.writeFile(this.currentFilePath, inputEl.value);
                    }
                }
            }
        });
    }

    initEvents(winEl) {
        const input = winEl.querySelector('#cs-code-input');
        const highlight = winEl.querySelector('#cs-code-highlight');
        const lineNums = winEl.querySelector('#cs-line-numbers');
        const runBtn = winEl.querySelector('#cs-run-btn');
        const saveBtn = winEl.querySelector('#cs-save-file');
        const newBtn = winEl.querySelector('#cs-new-file');
        const aiBtn = winEl.querySelector('#cs-ai-btn');
        const termClear = winEl.querySelector('#cs-term-clear');
        const docTooltip = winEl.querySelector('#cs-doc-tooltip');
        const docPanel = winEl.querySelector('#cs-doc-panel');
        const envStatus = winEl.querySelector('#cs-env-status');

        if (window.gameEngine.osVersion === 11 || window.typon.libraries['ia']) {
            aiBtn.style.display = 'inline-flex';
        }

        const updateHighlightAndLines = () => this.updateHighlightAndLines(winEl);

        input.addEventListener('input', () => {
            updateHighlightAndLines();
            window.soundFX.playKeyboardTap();
            if (this.currentFilePath) {
                window.vfs.writeFile(this.currentFilePath, input.value);
            }
        });

        input.addEventListener('scroll', () => {
            highlight.scrollTop = input.scrollTop;
            highlight.scrollLeft = input.scrollLeft;
            lineNums.scrollTop = input.scrollTop;
        });

        // Tab Autocompletion with Skill Check
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const hasSkill = window.theTreeApp && window.theTreeApp.isSkillUnlocked('skill_syntax');
                const start = input.selectionStart;
                const textBefore = input.value.substring(0, start);
                const wordMatch = textBefore.match(/([a-zA-Z0-9_.]+)$/);

                if (hasSkill && wordMatch) {
                    const word = wordMatch[1].toLowerCase();
                    const completions = {
                        'imp': 'importer fichiers',
                        'impor': 'importer fichiers',
                        'importer': 'importer ',
                        'clas': 'classer_dossier("C:/Utilisateurs/Joueur/Documents")',
                        'classer': 'classer_dossier("C:/Utilisateurs/Joueur/Documents")',
                        'aff': 'afficher("")',
                        'afficher': 'afficher("")',
                        'list': 'lister("C:/Utilisateurs/Joueur/Documents")',
                        'lister': 'lister("C:/Utilisateurs/Joueur/Documents")',
                        'dep': 'deplacer(source, destination)',
                        'deplacer': 'deplacer(source, destination)',
                        'supp': 'supprimer(chemin)',
                        'supprimer': 'supprimer(chemin)',
                        'pour': 'pour fichier dans fichiers:\n    ',
                        'si': 'si fichier.se_termine_par(".pdf"):\n    ',
                        'gui': 'importer gui\ngui.creer_fenetre("Mon App", "Bienvenue !")',
                        'ia': 'importer ia\nia.generer_script("automatiser")',
                        'tri': 'importer fichiers\n# Script tri_clips.ty pour Lucas Gamer\nafficher("Organisation des clips terminée !")\n',
                        'tri_clips': 'importer fichiers\n# Script tri_clips.ty pour Lucas Gamer\nafficher("Organisation des clips terminée !")\n',
                        'fact': 'importer fichiers\nimporter reseau\n# Script facturation.ty pour Sophie Bijoux\nafficher("Module de facturation déployé avec succès !")\n',
                        'facturation': 'importer fichiers\nimporter reseau\n# Script facturation.ty pour Sophie Bijoux\nafficher("Module de facturation déployé avec succès !")\n',
                        'calcul': 'importer fichiers\n# Script calcul_devis.ty pour Maxime Rénovation\ntaux_tva = 0.20\nmontant_ht = 1500\nmontant_tva = montant_ht * taux_tva\nmontant_ttc = montant_ht + montant_tva\nafficher("--- DEVIS RENOVATION ---")\nafficher("Montant HT : 1500 EUR")\nafficher("TVA (20%) : 300 EUR")\nafficher("Total TTC : 1800 EUR")\n',
                        'calcul_devis': 'importer fichiers\n# Script calcul_devis.ty pour Maxime Rénovation\ntaux_tva = 0.20\nmontant_ht = 1500\nmontant_tva = montant_ht * taux_tva\nmontant_ttc = montant_ht + montant_tva\nafficher("--- DEVIS RENOVATION ---")\nafficher("Montant HT : 1500 EUR")\nafficher("TVA (20%) : 300 EUR")\nafficher("Total TTC : 1800 EUR")\n',
                        'devis': 'importer fichiers\n# Script calcul_devis.ty pour Maxime Rénovation\ntaux_tva = 0.20\nmontant_ht = 1500\nmontant_tva = montant_ht * taux_tva\nmontant_ttc = montant_ht + montant_tva\nafficher("--- DEVIS RENOVATION ---")\nafficher("Montant HT : 1500 EUR")\nafficher("TVA (20%) : 300 EUR")\nafficher("Total TTC : 1800 EUR")\n',
                        'bot': 'importer reseau\nimporter fichiers\n# Bot Doscord Automatisé de Support Client sur VPS\nserveur_port = 8080\nreponses_auto = 100\nafficher("[DOSCORD BOT] Service de réponse automatique initialisé.")\nafficher("[DOSCORD BOT] Prêt à traiter les tickets clients sur le VPS.")\n',
                        'doscord': 'importer reseau\nimporter fichiers\n# Bot Doscord Automatisé de Support Client sur VPS\nserveur_port = 8080\nreponses_auto = 100\nafficher("[DOSCORD BOT] Service de réponse automatique initialisé.")\nafficher("[DOSCORD BOT] Prêt à traiter les tickets clients sur le VPS.")\n',
                        'recup': 'importer reseau\nimporter fichiers\n# Script recup_fonds.ty contre DARK_HACKER\nafficher("Rapatriement des fonds volés en cours...")\n',
                        'recup_fonds': 'importer reseau\nimporter fichiers\n# Script recup_fonds.ty contre DARK_HACKER\nafficher("Rapatriement des fonds volés en cours...")\n'
                    };

                    for (let [prefix, snippet] of Object.entries(completions)) {
                        if (prefix.startsWith(word) || word.startsWith(prefix)) {
                            const newTextBefore = textBefore.substring(0, textBefore.length - word.length) + snippet;
                            input.value = newTextBefore + input.value.substring(input.selectionEnd);
                            input.selectionStart = input.selectionEnd = newTextBefore.length;
                            updateHighlightAndLines();
                            window.soundFX.playClick();
                            window.gameEngine.showNotification('⚡ Auto-Complétion Typon', `Complété : ${snippet.split('\n')[0]}`, 'info');
                            return;
                        }
                    }
                }

                // Default 4 spaces indent if no match or skill not unlocked
                input.value = input.value.substring(0, start) + "    " + input.value.substring(input.selectionEnd);
                input.selectionStart = input.selectionEnd = start + 4;
                updateHighlightAndLines();
            }

            if (e.key === 'F5') {
                e.preventDefault();
                this.runScript(input.value, winEl);
            }
        });

        // Run Code
        runBtn.addEventListener('click', () => this.runScript(input.value, winEl));

        // Save Code
        saveBtn.addEventListener('click', () => {
            if (!this.currentFilePath) {
                alert("Veuillez d'abord créer un fichier avec 'Nouveau .ty'.");
                return;
            }
            window.vfs.writeFile(this.currentFilePath, input.value);
            window.soundFX.playClick();
            this.logTerminal(winEl, `[VFS] Fichier '${this.currentFilePath}' enregistré.`, 'info');
        });

        // New File Creation with Aero Modal Dialog
        newBtn.addEventListener('click', () => {
            // Save currently active file before creating new one
            if (this.currentFilePath && input) {
                window.vfs.writeFile(this.currentFilePath, input.value);
            }

            // Smart suggested file name based on missing scripts
            const existingNames = window.vfs.listDir('C:/Utilisateurs/Joueur/Projets').map(f => f.name.toLowerCase());
            let defaultName = 'mon_script.ty';
            if (!existingNames.includes('trier_documents.ty') && !existingNames.includes('trier_docs.ty') && !existingNames.includes('classer.ty')) {
                defaultName = 'trier_documents.ty';
            } else if (!existingNames.includes('tri_clips.ty')) {
                defaultName = 'tri_clips.ty';
            } else if (!existingNames.includes('facturation.ty')) {
                defaultName = 'facturation.ty';
            } else if (!existingNames.includes('calcul_devis.ty')) {
                defaultName = 'calcul_devis.ty';
            } else if (!existingNames.includes('bot_doscord.ty')) {
                defaultName = 'bot_doscord.ty';
            } else if (!existingNames.includes('recup_fonds.ty')) {
                defaultName = 'recup_fonds.ty';
            } else {
                let num = 1;
                while (existingNames.includes(`script_${num}.ty`)) num++;
                defaultName = `script_${num}.ty`;
            }

            const modal = document.createElement('div');
            modal.className = 'widown-modal-overlay';
            modal.style.zIndex = '9999';
            modal.innerHTML = `
                <div class="widown-modal-box aero-glass" style="width:360px;">
                    <div class="modal-header">
                        <span class="modal-icon">📄</span>
                        <strong>Nouveau Script Typon</strong>
                    </div>
                    <div class="modal-content" style="padding:14px 16px;">
                        <label style="display:block; font-size:12px; margin-bottom:6px; color:#1e293b;">Nom du nouveau fichier (.ty) :</label>
                        <input type="text" id="modal-file-name" value="${defaultName}" style="width:100%; padding:7px 10px; border:1px solid #94a3b8; border-radius:4px; font-size:13px; box-sizing:border-box;">
                    </div>
                    <div class="modal-footer" style="display:flex; justify-content:flex-end; gap:8px;">
                        <button class="widown-btn" id="modal-cancel">Annuler</button>
                        <button class="widown-btn btn-primary" id="modal-confirm">Créer le fichier</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const inputEl = modal.querySelector('#modal-file-name');
            inputEl.focus();
            inputEl.select();

            const finish = (name) => {
                modal.remove();
                if (name) {
                    const cleanName = name.endsWith('.ty') ? name : name + '.ty';
                    const path = `C:/Utilisateurs/Joueur/Projets/${cleanName}`;
                    
                    // Save previous file if different
                    if (this.currentFilePath && this.currentFilePath !== path && input) {
                        window.vfs.writeFile(this.currentFilePath, input.value);
                    }

                    // Check if file already exists in VFS
                    const existingNode = window.vfs.readFile(path);
                    let fileContent = '';
                    if (existingNode && existingNode.success) {
                        fileContent = existingNode.content;
                        window.gameEngine.showNotification('📄 Fichier Ouvert', `Le fichier existant '${cleanName}' a été ouvert.`, 'info');
                    } else {
                        fileContent = `importer fichiers\n# Nouveau script : ${cleanName}\n`;
                        window.vfs.createFile(path, fileContent);
                        window.gameEngine.showNotification('📄 Fichier Créé', `Nouveau fichier '${cleanName}' enregistré dans Projets !`, 'success');
                    }
                    
                    this.currentFilePath = path;

                    // Add to open tabs without erasing existing tabs!
                    let tabIdx = this.openTabs.findIndex(t => t.path === path);
                    if (tabIdx === -1) {
                        this.openTabs.push({ name: cleanName, path });
                        tabIdx = this.openTabs.length - 1;
                    }
                    this.activeTabIndex = tabIdx;

                    input.value = fileContent;
                    this.renderTabs(winEl);
                    this.renderProjectTree(winEl);
                    this.updateHighlightAndLines(winEl);
                    
                    this.logTerminal(winEl, `[Projet] Fichier actif : ${cleanName}`, 'success');
                    window.soundFX.playSuccess();
                }
            };

            modal.querySelector('#modal-cancel').addEventListener('click', () => finish(null));
            modal.querySelector('#modal-confirm').addEventListener('click', () => finish(inputEl.value.trim()));
            inputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') finish(inputEl.value.trim());
                if (e.key === 'Escape') finish(null);
            });
        });

        // AI Generation Button
        aiBtn.addEventListener('click', () => {
            input.value = `importer fichiers\nimporter reseau\nimporter ia\n\n# Optimisation automatique par Widown AI\nclasser_dossier("C:/Utilisateurs/Joueur/Documents")\nafficher("Tous les documents ont été classés !")\n`;
            updateHighlightAndLines();
            window.soundFX.playSuccess();
            this.logTerminal(winEl, `[Widown AI] Script généré par le réseau neuronal.`, 'success');
        });

        termClear.addEventListener('click', () => {
            winEl.querySelector('#cs-terminal-output').innerHTML = '';
        });

        // Web Doc Button
        const openDocWebBtn = winEl.querySelector('#cs-open-doc-web');
        if (openDocWebBtn) {
            openDocWebBtn.addEventListener('click', () => {
                if (window.logolApp) {
                    window.logolApp.openToUrl('https://www.typon.moc/docs');
                }
            });
        }

        // Script Templates Buttons
        winEl.querySelectorAll('.cs-template-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.template;
                const templates = {
                    'tri_clips': {
                        file: 'tri_clips.ty',
                        code: 'importer fichiers\n# Script tri_clips.ty pour Lucas Gamer\nafficher("Organisation des clips terminée !")\n'
                    },
                    'facturation': {
                        file: 'facturation.ty',
                        code: 'importer fichiers\nimporter reseau\n# Script facturation.ty pour Sophie Bijoux\nafficher("Module de facturation déployé avec succès !")\n'
                    },
                    'calcul_devis': {
                        file: 'calcul_devis.ty',
                        code: 'importer fichiers\n# Script calcul_devis.ty pour Maxime Rénovation\ntaux_tva = 0.20\nmontant_ht = 1500\nmontant_tva = montant_ht * taux_tva\nmontant_ttc = montant_ht + montant_tva\nafficher("--- DEVIS RENOVATION ---")\nafficher("Montant HT : 1500 EUR")\nafficher("TVA (20%) : 300 EUR")\nafficher("Total TTC : 1800 EUR")\n'
                    },
                    'bot_doscord': {
                        file: 'bot_doscord.ty',
                        code: 'importer reseau\nimporter fichiers\n# Bot Doscord Automatisé de Support Client sur VPS\nserveur_port = 8080\nreponses_auto = 100\nafficher("[DOSCORD BOT] Service de réponse automatique initialisé.")\nafficher("[DOSCORD BOT] Prêt à traiter les tickets clients sur le VPS.")\n'
                    },
                    'recup_fonds': {
                        file: 'recup_fonds.ty',
                        code: 'importer reseau\nimporter fichiers\n# Script recup_fonds.ty contre DARK_HACKER\nafficher("Rapatriement des fonds volés en cours...")\n'
                    }
                };
                const t = templates[type];
                if (t) {
                    this.insertOrOpenFile(t.file, t.code, winEl);
                }
            });
        });

        // Load active file content on start
        if (this.currentFilePath) {
            const node = window.vfs.readFile(this.currentFilePath);
            if (node && node.success) {
                input.value = node.content;
            }
        }

        this.renderTabs(winEl);
        this.renderProjectTree(winEl);
        updateHighlightAndLines();
        this.updateStatusBadge(envStatus);
    }

    updateHighlightAndLines(winEl) {
        if (!winEl) winEl = document.getElementById('win-codestud');
        if (!winEl) return;
        const input = winEl.querySelector('#cs-code-input');
        const highlight = winEl.querySelector('#cs-code-highlight');
        const lineNums = winEl.querySelector('#cs-line-numbers');
        const docTooltip = winEl.querySelector('#cs-doc-tooltip');
        const docPanel = winEl.querySelector('#cs-doc-panel');
        if (!input || !highlight || !lineNums) return;

        const val = input.value;
        const lines = val.split('\n').length;
        let numHtml = '';
        for (let i = 1; i <= Math.max(lines, 14); i++) {
            numHtml += `${i}<br>`;
        }
        lineNums.innerHTML = numHtml;

        highlight.innerHTML = this.syntaxHighlight(val);
        this.attachDocHoverEvents(highlight, docTooltip, docPanel);

        highlight.scrollTop = input.scrollTop;
        highlight.scrollLeft = input.scrollLeft;
        lineNums.scrollTop = input.scrollTop;
    }

    insertOrOpenFile(filename, code, winEl = null) {
        if (!winEl) {
            if (!window.windowManager.windows.has('codestud')) {
                this.open();
            } else {
                window.windowManager.restoreWindow('codestud');
                window.windowManager.bringToFront('codestud');
            }
            winEl = document.getElementById('win-codestud');
        }
        if (!winEl) return;

        const input = winEl.querySelector('#cs-code-input');

        // Save current active file first if different
        if (this.currentFilePath && input) {
            window.vfs.writeFile(this.currentFilePath, input.value);
        }

        const path = `C:/Utilisateurs/Joueur/Projets/${filename}`;
        
        // If file does not exist, create it with code. If it exists and is empty, fill it.
        const existingNode = window.vfs.readFile(path);
        if (!existingNode || !existingNode.success) {
            window.vfs.createFile(path, code);
        } else if (!existingNode.content.trim()) {
            window.vfs.writeFile(path, code);
        }

        this.currentFilePath = path;

        let tabIdx = this.openTabs.findIndex(t => t.path === path);
        if (tabIdx === -1) {
            this.openTabs.push({ name: filename, path });
            tabIdx = this.openTabs.length - 1;
        }
        this.activeTabIndex = tabIdx;

        const finalNode = window.vfs.readFile(path);
        if (input) {
            input.value = (finalNode && finalNode.success) ? finalNode.content : code;
        }

        this.renderProjectTree(winEl);
        this.renderTabs(winEl);
        this.updateHighlightAndLines(winEl);

        this.logTerminal(winEl, `[Projet] Fichier '${filename}' sélectionné.`, 'success');
        window.soundFX.playClick();
        window.gameEngine.showNotification('📄 Fichier Prêt', `'${filename}' ouvert dans CodeStud !`, 'success');
    }

    renderTabs(winEl) {
        const tabsEl = winEl.querySelector('#cs-tabs');
        const input = winEl.querySelector('#cs-code-input');
        if (!tabsEl) return;

        if (this.openTabs.length === 0) {
            tabsEl.innerHTML = `<div class="editor-tab active"><span>Aucun fichier</span></div>`;
            return;
        }

        tabsEl.innerHTML = this.openTabs.map((t, idx) => `
            <div class="editor-tab ${idx === this.activeTabIndex ? 'active' : ''}" data-path="${t.path}">
                <span>${t.name}</span>
                <span class="tab-close" title="Fermer l'onglet">×</span>
            </div>
        `).join('');

        tabsEl.querySelectorAll('.editor-tab').forEach((tabEl, idx) => {
            tabEl.addEventListener('click', (e) => {
                if (e.target.classList.contains('tab-close')) {
                    e.stopPropagation();
                    // Save file before closing tab
                    if (this.currentFilePath && input) {
                        window.vfs.writeFile(this.currentFilePath, input.value);
                    }
                    this.openTabs.splice(idx, 1);
                    if (this.openTabs.length === 0) {
                        this.currentFilePath = null;
                        this.activeTabIndex = -1;
                        if (input) {
                            input.value = '';
                            this.updateHighlightAndLines(winEl);
                        }
                    } else {
                        const newIdx = Math.max(0, idx - 1);
                        this.activeTabIndex = newIdx;
                        this.currentFilePath = this.openTabs[newIdx].path;
                        const n = window.vfs.readFile(this.currentFilePath);
                        if (n && n.success && input) {
                            input.value = n.content;
                            this.updateHighlightAndLines(winEl);
                        }
                    }
                    this.renderTabs(winEl);
                    this.renderProjectTree(winEl);
                    return;
                }

                if (this.activeTabIndex === idx && this.currentFilePath === this.openTabs[idx].path) return;

                // 1. SAVE the current file content BEFORE switching!
                if (this.currentFilePath && input) {
                    window.vfs.writeFile(this.currentFilePath, input.value);
                }

                // 2. Switch to selected tab
                this.activeTabIndex = idx;
                this.currentFilePath = this.openTabs[idx].path;

                // 3. Load content of selected file
                const node = window.vfs.readFile(this.currentFilePath);
                if (node && node.success && input) {
                    input.value = node.content;
                }
                this.renderTabs(winEl);
                this.renderProjectTree(winEl);
                this.updateHighlightAndLines(winEl);
                window.soundFX.playClick();
            });
        });
    }

    renderProjectTree(winEl) {
        const treeEl = winEl.querySelector('#cs-project-tree');
        if (!treeEl) return;

        const files = window.vfs.listDir('C:/Utilisateurs/Joueur/Projets').filter(f => f.type === 'file');
        
        let html = `<div class="tree-item folder open">📁 Projets (${files.length})</div>`;
        if (files.length === 0) {
            html += `<div class="tree-empty-hint"><em>Dossier vide. Créez un fichier .ty</em></div>`;
        } else {
            files.forEach(f => {
                html += `
                    <div class="tree-item file ${f.path === this.currentFilePath ? 'active' : ''}" data-path="${f.path}">
                        <span class="ty-icon">🐍</span> ${f.name}
                    </div>
                `;
            });
        }
        treeEl.innerHTML = html;

        treeEl.querySelectorAll('.tree-item.file').forEach(el => {
            el.addEventListener('click', () => {
                const path = el.dataset.path;
                if (this.currentFilePath === path) return;

                // 1. SAVE current file before switching!
                const input = winEl.querySelector('#cs-code-input');
                if (this.currentFilePath && input) {
                    window.vfs.writeFile(this.currentFilePath, input.value);
                }

                // 2. Set new current file
                this.currentFilePath = path;
                const fileName = path.split('/').pop();

                // 3. Ensure tab exists and is active
                let tabIdx = this.openTabs.findIndex(t => t.path === path);
                if (tabIdx === -1) {
                    this.openTabs.push({ name: fileName, path });
                    tabIdx = this.openTabs.length - 1;
                }
                this.activeTabIndex = tabIdx;

                // 4. Load content of clicked file
                const node = window.vfs.readFile(path);
                if (node.success && input) {
                    input.value = node.content;
                }

                this.renderTabs(winEl);
                this.renderProjectTree(winEl);
                this.updateHighlightAndLines(winEl);
                window.soundFX.playClick();
            });
        });
    }

    updateStatusBadge(badgeEl) {
        if (!badgeEl) return;
        if (window.typon.isInstalled()) {
            badgeEl.className = 'cs-status-badge installed';
            badgeEl.querySelector('.status-label').textContent = 'Typon 1.0.4 Actif';
        } else {
            badgeEl.className = 'cs-status-badge error';
            badgeEl.querySelector('.status-label').textContent = 'Typon Non Installé (Quarantaine)';
        }
    }

    syntaxHighlight(code) {
        let escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        escaped = escaped.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="tok-str">$&</span>');
        escaped = escaped.replace(/(#.*)/g, '<span class="tok-comment">$&</span>');

        const keywords = ['importer', 'pour', 'dans', 'si', 'sinon_si', 'sinon', 'tant_que', 'definir', 'retourner', 'classe'];
        keywords.forEach(kw => {
            const re = new RegExp(`\\b(${kw})\\b`, 'g');
            escaped = escaped.replace(re, `<span class="tok-kw doc-kw" data-kw="${kw}">$1</span>`);
        });

        const funcs = ['afficher', 'lister', 'deplacer', 'supprimer', 'creer_dossier', 'classer_dossier', 'lire_fichier', 'ecrire_fichier', 'se_termine_par', 'contient', 'creer_fenetre', 'scanner_mac', 'ia.generer_script'];
        funcs.forEach(fn => {
            const re = new RegExp(`\\b(${fn})\\b`, 'g');
            escaped = escaped.replace(re, `<span class="tok-fn doc-kw" data-kw="${fn}">$1</span>`);
        });

        return escaped;
    }

    attachDocHoverEvents(highlightEl, tooltipEl, panelEl) {
        highlightEl.querySelectorAll('.doc-kw').forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const kw = el.dataset.kw;
                const doc = window.typon.docs[kw];
                if (doc) {
                    tooltipEl.innerHTML = `
                        <div class="tt-header">📖 Documentation Typon : <code>${kw}</code></div>
                        <div class="tt-sig"><strong>Syntaxe :</strong> <code>${doc.signature}</code></div>
                        <div class="tt-desc">${doc.desc}</div>
                    `;
                    tooltipEl.style.display = 'block';
                    tooltipEl.style.left = `${e.target.offsetLeft}px`;
                    tooltipEl.style.top = `${e.target.offsetTop + 22}px`;

                    panelEl.innerHTML = `
                        <div class="panel-doc-content">
                            <h4><code>${doc.signature}</code></h4>
                            <p>${doc.desc}</p>
                        </div>
                    `;
                }
            });

            el.addEventListener('mouseleave', () => {
                tooltipEl.style.display = 'none';
            });
        });
    }

    logTerminal(winEl, msg, type = 'info') {
        const term = winEl.querySelector('#cs-terminal-output');
        if (!term) return;
        const line = document.createElement('div');
        line.className = `term-line ${type}`;
        line.textContent = msg;
        term.appendChild(line);
        term.scrollTop = term.scrollHeight;
    }

    async runScript(code, winEl) {
        if (!this.currentFilePath) {
            alert("Veuillez d'abord créer un fichier avec 'Nouveau .ty'.");
            return;
        }

        if (!window.typon.isInstalled()) {
            window.soundFX.playVirusAlert();
            window.gameEngine.quarantineActive = true;
            window.vfs.setQuarantine(this.currentFilePath, true);
            window.gameEngine.setStep('QUARANTINE_TRIGGERED');

            window.windowManager.showModalAlert({
                title: '⚠️ Widown Defender - Menace Détectée !',
                message: `Le fichier <strong>${this.currentFilePath.split('/').pop()}</strong> a été bloqué et placé en <strong>quarantaine</strong> !<br><br><strong>Raison :</strong> L'interpréteur officiel Typon (.xey) est absent de votre machine.<br><br>👉 Veuillez ouvrir <strong>Logol Lhome</strong> pour télécharger et installer <strong>Typon.xey</strong> depuis www.typon.moc.`,
                type: 'danger',
                buttons: ['Ouvrir Logol Lhome', 'Compris'],
                onAction: (btn) => {
                    if (btn === 'Ouvrir Logol Lhome') {
                        if (window.logolApp) window.logolApp.open();
                    }
                }
            });

            this.logTerminal(winEl, "❌ ÉCHEC : Fichier mis en quarantaine. Téléchargez Typon.xey sur Logol Lhome.", 'error');
            return;
        }

        window.vfs.writeFile(this.currentFilePath, code);
        window.soundFX.playTone(520, 'sine', 0.1, 0, 0.1);
        this.logTerminal(winEl, `[Exécution du script Typon...]`, 'info');

        const result = await window.typon.execute(code, (msg, type) => {
            this.logTerminal(winEl, msg, type);
        });

        if (result.success) {
            window.soundFX.playSuccess();
            // Mark script as tested and validated locally!
            window.vfs.markScriptTested(this.currentFilePath, code);
            const scriptName = this.currentFilePath.split('/').pop();
            this.logTerminal(winEl, `✔ [CodeStud] Script '${scriptName}' exécuté et validé sans erreur ! Prêt pour le déploiement client.`, 'success');
            window.gameEngine.showNotification("✔ Script Validé", `'${scriptName}' a été testé avec succès (aucun bogue détecté).`, 'success');

            if (window.vfs.checkDocumentsSorted()) {
                window.gameEngine.showNotification("🎉 Mission Réussie !", "Tous les fichiers ont été classés avec succès ! Valex Compta vous a envoyé un nouvel email de félicitations dans Outlock.", 'success');
                window.gameEngine.setStep('FIRST_QUEST_DONE');
                if (window.outlockApp) {
                    window.outlockApp.onQuestCompleted('SORT_DOCUMENTS');
                }
            }
        } else {
            window.soundFX.playError();
        }
    }
}

window.codeStudApp = new CodeStudApp();
