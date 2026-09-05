// File Explorer & Notepad for Widown OS
class ExplorerApp {
    constructor() {
        this.currentPath = 'C:/Utilisateurs/Joueur/Documents';
    }

    open(initialPath) {
        if (initialPath) this.currentPath = initialPath;

        const content = `
            <div class="explorer-container">
                <div class="explorer-toolbar">
                    <div class="nav-controls">
                        <button class="nav-btn" id="exp-back" title="Retour">◀</button>
                        <button class="nav-btn" id="exp-up" title="Dossier parent">▲</button>
                    </div>
                    <div class="breadcrumb-bar">
                        <span class="folder-crumb-icon">📁</span>
                        <input type="text" class="path-input" id="exp-path-input" value="${this.currentPath}">
                    </div>
                    <div class="exp-actions">
                        <button class="widown-btn btn-sm" id="exp-new-folder">+ Nouveau Dossier</button>
                        <button class="widown-btn btn-sm" id="exp-refresh">⟳</button>
                    </div>
                </div>

                <div class="explorer-main">
                    <div class="explorer-sidebar">
                        <div class="side-nav-group">
                            <div class="side-nav-title">FAVORIS</div>
                            <div class="side-nav-item" data-path="C:/Utilisateurs/Joueur/Bureau">🖥️ Bureau</div>
                            <div class="side-nav-item" data-path="C:/Utilisateurs/Joueur/Documents">📁 Documents</div>
                            <div class="side-nav-item" data-path="C:/Utilisateurs/Joueur/Telechargements">📥 Téléchargements</div>
                            <div class="side-nav-item" data-path="C:/Utilisateurs/Joueur/Projets">💻 Projets Typon</div>
                            <div class="side-nav-item" data-path="C:/Quarantaine">☣️ Quarantaine</div>
                        </div>
                    </div>

                    <div class="explorer-view-pane" id="exp-files-grid">
                        <!-- Populated by JS -->
                    </div>
                </div>

                <div class="explorer-statusbar">
                    <span id="exp-item-count">0 éléments</span>
                    <span id="exp-selected-info"></span>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'explorer',
            title: 'Explorateur de fichiers Widown',
            icon: 'explorer',
            width: 760,
            height: 480,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        const pathInput = winEl.querySelector('#exp-path-input');
        const btnUp = winEl.querySelector('#exp-up');
        const btnRefresh = winEl.querySelector('#exp-refresh');
        const btnNewFolder = winEl.querySelector('#exp-new-folder');

        this.renderFolder(winEl);

        btnUp.addEventListener('click', () => {
            const lastSlash = this.currentPath.lastIndexOf('/');
            if (lastSlash > 2) {
                this.currentPath = this.currentPath.slice(0, lastSlash);
                pathInput.value = this.currentPath;
                this.renderFolder(winEl);
            }
        });

        btnRefresh.addEventListener('click', () => this.renderFolder(winEl));

        pathInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.currentPath = pathInput.value.trim();
                this.renderFolder(winEl);
            }
        });

        btnNewFolder.addEventListener('click', () => {
            const name = prompt("Nom du nouveau dossier :", "Nouveau Dossier");
            if (name) {
                window.vfs.createDir(`${this.currentPath}/${name}`);
                this.renderFolder(winEl);
            }
        });

        winEl.querySelectorAll('.side-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.currentPath = item.dataset.path;
                pathInput.value = this.currentPath;
                this.renderFolder(winEl);
            });
        });
    }

    renderFolder(winEl) {
        const grid = winEl.querySelector('#exp-files-grid');
        const countEl = winEl.querySelector('#exp-item-count');
        if (!grid) return;

        const items = window.vfs.listDir(this.currentPath);
        if (countEl) countEl.textContent = `${items.length} élément(s)`;

        if (items.length === 0) {
            grid.innerHTML = `<div class="empty-folder-msg">Ce dossier est vide.</div>`;
            return;
        }

        grid.innerHTML = items.map(item => {
            let icon = '📄';
            if (item.type === 'dir') icon = '📁';
            else if (item.name.endsWith('.pdf')) icon = '📕';
            else if (item.name.endsWith('.png') || item.name.endsWith('.jpg')) icon = '🖼️';
            else if (item.name.endsWith('.zip') || item.name.endsWith('.tar')) icon = '📦';
            else if (item.name.endsWith('.ty')) icon = '🐍';
            else if (item.name.endsWith('.xey')) icon = '⚙️';

            return `
                <div class="file-grid-item ${item.quarantined ? 'quarantined' : ''}" data-path="${item.path}" data-type="${item.type}">
                    <div class="file-icon">${icon}</div>
                    <div class="file-name" title="${item.name}">${item.name}</div>
                    ${item.quarantined ? '<span class="quarantine-tag">Bloqué</span>' : ''}
                </div>
            `;
        }).join('');

        grid.querySelectorAll('.file-grid-item').forEach(el => {
            el.addEventListener('dblclick', () => {
                const path = el.dataset.path;
                const type = el.dataset.type;

                if (type === 'dir') {
                    this.currentPath = path;
                    const pathInput = winEl.querySelector('#exp-path-input');
                    if (pathInput) pathInput.value = path;
                    this.renderFolder(winEl);
                } else {
                    this.openFile(path);
                }
            });
        });
    }

    openFile(path) {
        const node = window.vfs.getNode(path);
        if (!node) return;

        if (node.quarantined) {
            window.soundFX.playVirusAlert();
            window.windowManager.showModalAlert({
                title: '⛔ Fichier en Quarantaine',
                message: `Le fichier <strong>${node.name}</strong> a été bloqué par Widown Defender car aucun interpréteur vérifié n'a validé ce format.<br><br>Installez <strong>Typon.xey</strong> depuis <strong>Logol Lhome</strong>.`,
                type: 'danger'
            });
            return;
        }

        if (node.name.endsWith('.ty')) {
            if (window.codeStudApp) window.codeStudApp.open();
        } else if (node.name.endsWith('.txt')) {
            this.openNotepad(path);
        } else if (node.name.endsWith('.xey')) {
            if (window.logolApp) window.logolApp.runInstallerWizard(node.name);
        } else {
            // Preview
            window.windowManager.showModalAlert({
                title: `Aperçu de ${node.name}`,
                message: `<div class="file-preview-content"><pre>${node.content || '[Contenu binaire]'}</pre></div>`,
                type: 'info'
            });
        }
    }

    openNotepad(path) {
        const file = window.vfs.readFile(path);
        const fileName = path.split('/').pop();

        const content = `
            <div class="notepad-container">
                <div class="notepad-toolbar">
                    <button class="widown-btn btn-sm" id="np-save">💾 Enregistrer</button>
                </div>
                <textarea class="notepad-textarea" id="np-text">${file.success ? file.content : ''}</textarea>
            </div>
        `;

        window.windowManager.createWindow({
            id: `notepad-${fileName}`,
            title: `${fileName} - Bloc-Notes Widown`,
            icon: 'notepad',
            width: 500,
            height: 380,
            content: content,
            onOpen: (winEl) => {
                const saveBtn = winEl.querySelector('#np-save');
                const text = winEl.querySelector('#np-text');
                saveBtn.addEventListener('click', () => {
                    window.vfs.writeFile(path, text.value);
                    window.soundFX.playClick();
                    window.gameEngine.showNotification('💾 Fichier Enregistré', `${fileName} a été sauvegardé.`, 'info');
                });
            }
        });
    }
}

window.explorerApp = new ExplorerApp();
