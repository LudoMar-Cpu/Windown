class VirtualFileSystem {
    constructor() {
        this.STORAGE_KEY = 'widown_os_vfs_v3';
        this.fs = {};
        this.testedScripts = {}; // Map of path -> { tested: boolean, lastTestedTime: number, contentHash: string }
        this.init();
    }

    init() {
        let saved = null;
        try {
            saved = localStorage.getItem(this.STORAGE_KEY) || sessionStorage.getItem(this.STORAGE_KEY);
        } catch (e) {}

        if (saved) {
            try {
                this.fs = JSON.parse(saved);
                this.ensureEssentialFiles();
                return;
            } catch (e) {
                console.error("VFS load error, resetting", e);
            }
        }
        this.resetToDefaults();
    }

    resetToDefaults() {
        this.fs = {
            'C:': {
                type: 'dir',
                name: 'C:',
                path: 'C:',
                children: {
                    'Utilisateurs': {
                        type: 'dir',
                        name: 'Utilisateurs',
                        path: 'C:/Utilisateurs',
                        children: {
                            'Joueur': {
                                type: 'dir',
                                name: 'Joueur',
                                path: 'C:/Utilisateurs/Joueur',
                                children: {
                                    'Bureau': {
                                        type: 'dir',
                                        name: 'Bureau',
                                        path: 'C:/Utilisateurs/Joueur/Bureau',
                                        children: {
                                            'Notes_Important.txt': {
                                                type: 'file',
                                                name: 'Notes_Important.txt',
                                                path: 'C:/Utilisateurs/Joueur/Bureau/Notes_Important.txt',
                                                content: "Bienvenue sur Widown 7 !\n\n1. Consultez Outlock pour vos contrats.\n2. Créez vos fichiers .ty dans CodeStud pour automatiser.\n3. Utilisez AnyWidown (HS) pour intervenir à distance.",
                                                size: '1.2 Ko',
                                                quarantined: false
                                            }
                                        }
                                    },
                                    'Documents': {
                                        type: 'dir',
                                        name: 'Documents',
                                        path: 'C:/Utilisateurs/Joueur/Documents',
                                        children: {
                                            'Rapport_Annuel_2024.pdf': {
                                                type: 'file',
                                                name: 'Rapport_Annuel_2024.pdf',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Rapport_Annuel_2024.pdf',
                                                content: '%PDF-1.4 Rapport financier et comptabilité.',
                                                size: '4.8 Mo',
                                                category: 'pdf'
                                            },
                                            'Facture_Serveur_01.pdf': {
                                                type: 'file',
                                                name: 'Facture_Serveur_01.pdf',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Facture_Serveur_01.pdf',
                                                content: '%PDF-1.4 Facture datacenter.',
                                                size: '850 Ko',
                                                category: 'pdf'
                                            },
                                            'Photo_Equipe_Vacances.png': {
                                                type: 'file',
                                                name: 'Photo_Equipe_Vacances.png',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Photo_Equipe_Vacances.png',
                                                content: '[Données PNG 1920x1080]',
                                                size: '3.2 Mo',
                                                category: 'images'
                                            },
                                            'Logo_Societe_HD.png': {
                                                type: 'file',
                                                name: 'Logo_Societe_HD.png',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Logo_Societe_HD.png',
                                                content: '[Données PNG Transparent]',
                                                size: '1.4 Mo',
                                                category: 'images'
                                            },
                                            'Sauvegarde_Clients_Mai.zip': {
                                                type: 'file',
                                                name: 'Sauvegarde_Clients_Mai.zip',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Sauvegarde_Clients_Mai.zip',
                                                content: '[Archive ZIP 54MB]',
                                                size: '54.0 Mo',
                                                category: 'archives'
                                            },
                                            'Backup_SiteWeb_Ancien.tar': {
                                                type: 'file',
                                                name: 'Backup_SiteWeb_Ancien.tar',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Backup_SiteWeb_Ancien.tar',
                                                content: '[Archive TAR 120MB]',
                                                size: '120.0 Mo',
                                                category: 'archives'
                                            },
                                            'Reunion_Briefing_Client.txt': {
                                                type: 'file',
                                                name: 'Reunion_Briefing_Client.txt',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Reunion_Briefing_Client.txt',
                                                content: 'Objectif : Automatiser le traitement des fichiers entrants.',
                                                size: '45 Ko',
                                                category: 'textes'
                                            },
                                            'Idees_Projets.txt': {
                                                type: 'file',
                                                name: 'Idees_Projets.txt',
                                                path: 'C:/Utilisateurs/Joueur/Documents/Idees_Projets.txt',
                                                content: '- Bot de surveillance\n- Typon GUI\n- Widown 11 IA',
                                                size: '22 Ko',
                                                category: 'textes'
                                            },
                                            'PDF': { type: 'dir', name: 'PDF', path: 'C:/Utilisateurs/Joueur/Documents/PDF', children: {} },
                                            'Images': { type: 'dir', name: 'Images', path: 'C:/Utilisateurs/Joueur/Documents/Images', children: {} },
                                            'Archives': { type: 'dir', name: 'Archives', path: 'C:/Utilisateurs/Joueur/Documents/Archives', children: {} },
                                            'Textes': { type: 'dir', name: 'Textes', path: 'C:/Utilisateurs/Joueur/Documents/Textes', children: {} }
                                        }
                                    },
                                    'Telechargements': {
                                        type: 'dir',
                                        name: 'Telechargements',
                                        path: 'C:/Utilisateurs/Joueur/Telechargements',
                                        children: {}
                                    },
                                    'Projets': {
                                        type: 'dir',
                                        name: 'Projets',
                                        path: 'C:/Utilisateurs/Joueur/Projets',
                                        children: {
                                            'trier_documents.ty': {
                                                type: 'file',
                                                name: 'trier_documents.ty',
                                                path: 'C:/Utilisateurs/Joueur/Projets/trier_documents.ty',
                                                content: 'importer fichiers\nclasser_dossier("C:/Utilisateurs/Joueur/Documents")\n',
                                                size: '1.0 Ko',
                                                quarantined: false
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'System32': {
                        type: 'dir',
                        name: 'System32',
                        path: 'C:/System32',
                        children: {
                            'widown_core.dll': { type: 'file', name: 'widown_core.dll', path: 'C:/System32/widown_core.dll', content: '[Kernel]', size: '14.5 Mo' },
                            'defender.xey': { type: 'file', name: 'defender.xey', path: 'C:/System32/defender.xey', content: '[Defender]', size: '8.2 Mo' }
                        }
                    },
                    'Quarantaine': {
                        type: 'dir',
                        name: 'Quarantaine',
                        path: 'C:/Quarantaine',
                        children: {}
                    }
                }
            }
        };
        this.save();
    }

    ensureEssentialFiles() {
        let projets = this.getNode('C:/Utilisateurs/Joueur/Projets');
        if (!projets || projets.type !== 'dir') {
            this.createDir('C:/Utilisateurs/Joueur/Projets');
            projets = this.getNode('C:/Utilisateurs/Joueur/Projets');
        }
        if (projets && projets.children) {
            // Guarantee that trier_documents.ty exists so player never loses their sorting script
            if (!projets.children['trier_documents.ty'] && !projets.children['trier_docs.ty'] && !projets.children['classer.ty']) {
                this.createFile(
                    'C:/Utilisateurs/Joueur/Projets/trier_documents.ty',
                    'importer fichiers\nclasser_dossier("C:/Utilisateurs/Joueur/Documents")\n'
                );
            }
        }
    }

    save() {
        try {
            const data = JSON.stringify(this.fs);
            try { localStorage.setItem(this.STORAGE_KEY, data); } catch (e) {}
            try { sessionStorage.setItem(this.STORAGE_KEY, data); } catch (e) {}
        } catch (e) {
            console.error("Failed to persist VFS", e);
        }
    }

    normalizePath(path) {
        if (!path) return 'C:/Utilisateurs/Joueur/Bureau';
        let p = path.replace(/\\/g, '/').replace(/\/+/g, '/');
        if (p.endsWith('/') && p.length > 3) p = p.slice(0, -1);
        if (!p.startsWith('C:')) p = 'C:/' + (p.startsWith('/') ? p.slice(1) : p);
        return p;
    }

    getNode(path) {
        path = this.normalizePath(path);
        if (path === 'C:' || path === 'C:/') return this.fs['C:'];

        const parts = path.split('/').filter(Boolean);
        let curr = this.fs['C:'];
        for (let i = 1; i < parts.length; i++) {
            if (!curr || !curr.children || !curr.children[parts[i]]) {
                return null;
            }
            curr = curr.children[parts[i]];
        }
        return curr;
    }

    listDir(path) {
        const node = this.getNode(path);
        if (!node || node.type !== 'dir') return [];
        return Object.values(node.children);
    }

    createFile(path, content = '', quarantined = false, size = '1.0 Ko') {
        path = this.normalizePath(path);
        const lastSlash = path.lastIndexOf('/');
        const dirPath = lastSlash <= 2 ? 'C:' : path.slice(0, lastSlash);
        const fileName = path.slice(lastSlash + 1);

        const dir = this.getNode(dirPath);
        if (!dir || dir.type !== 'dir') {
            return { success: false, error: 'Répertoire parent introuvable : ' + dirPath };
        }

        const newFile = {
            type: 'file',
            name: fileName,
            path: path,
            content: content,
            size: size,
            quarantined: !!quarantined,
            createdAt: new Date().toISOString()
        };

        dir.children[fileName] = newFile;
        this.save();
        return { success: true, file: newFile };
    }

    createDir(path) {
        path = this.normalizePath(path);
        const lastSlash = path.lastIndexOf('/');
        const parentPath = lastSlash <= 2 ? 'C:' : path.slice(0, lastSlash);
        const dirName = path.slice(lastSlash + 1);

        const parent = this.getNode(parentPath);
        if (!parent || parent.type !== 'dir') {
            return { success: false, error: 'Répertoire parent introuvable' };
        }

        if (parent.children[dirName]) {
            return { success: false, error: 'Un dossier ou fichier existe déjà avec ce nom' };
        }

        const newDir = {
            type: 'dir',
            name: dirName,
            path: path,
            children: {},
            createdAt: new Date().toISOString()
        };

        parent.children[dirName] = newDir;
        this.save();
        return { success: true, dir: newDir };
    }

    writeFile(path, content) {
        const node = this.getNode(path);
        if (!node) {
            return this.createFile(path, content);
        }
        if (node.type !== 'file') {
            return { success: false, error: "La cible n'est pas un fichier" };
        }
        if (node.quarantined) {
            return { success: false, error: "Le fichier est en quarantaine." };
        }
        node.content = content;
        node.size = `${(content.length / 1024 + 0.1).toFixed(1)} Ko`;
        this.save();
        return { success: true, file: node };
    }

    readFile(path) {
        const node = this.getNode(path);
        if (!node) return { success: false, error: 'Fichier non trouvé' };
        if (node.type !== 'file') return { success: false, error: "Ce n'est pas un fichier" };
        if (node.quarantined) return { success: false, error: "Fichier verrouillé par l'antivirus", quarantined: true };
        return { success: true, content: node.content, file: node };
    }

    moveFile(srcPath, destDirPath) {
        srcPath = this.normalizePath(srcPath);
        destDirPath = this.normalizePath(destDirPath);

        const file = this.getNode(srcPath);
        if (!file) return { success: false, error: 'Fichier source introuvable' };

        const destDir = this.getNode(destDirPath);
        if (!destDir || destDir.type !== 'dir') return { success: false, error: 'Dossier cible introuvable' };

        // Remove from old parent
        const srcLastSlash = srcPath.lastIndexOf('/');
        const srcParentPath = srcLastSlash <= 2 ? 'C:' : srcPath.slice(0, srcLastSlash);
        const srcParent = this.getNode(srcParentPath);
        if (srcParent && srcParent.children) {
            delete srcParent.children[file.name];
        }

        file.path = destDirPath + '/' + file.name;
        destDir.children[file.name] = file;
        this.save();
        return { success: true, file: file };
    }

    deleteNode(path) {
        path = this.normalizePath(path);
        const lastSlash = path.lastIndexOf('/');
        const parentPath = lastSlash <= 2 ? 'C:' : path.slice(0, lastSlash);
        const name = path.slice(lastSlash + 1);

        const parent = this.getNode(parentPath);
        if (parent && parent.children && parent.children[name]) {
            delete parent.children[name];
            this.save();
            return { success: true };
        }
        return { success: false, error: 'Élément introuvable' };
    }

    setQuarantine(path, isQuarantined) {
        const node = this.getNode(path);
        if (node && node.type === 'file') {
            node.quarantined = isQuarantined;
            this.save();
            return true;
        }
        return false;
    }

    checkDocumentsSorted() {
        const docDir = this.getNode('C:/Utilisateurs/Joueur/Documents');
        if (!docDir) return false;

        const files = Object.values(docDir.children).filter(item => item.type === 'file');
        if (files.length > 0) return false;

        const pdfFiles = this.listDir('C:/Utilisateurs/Joueur/Documents/PDF').filter(i => i.name.endsWith('.pdf'));
        const imgFiles = this.listDir('C:/Utilisateurs/Joueur/Documents/Images').filter(i => i.name.endsWith('.png') || i.name.endsWith('.jpg'));
        const arcFiles = this.listDir('C:/Utilisateurs/Joueur/Documents/Archives').filter(i => i.name.endsWith('.zip') || i.name.endsWith('.tar'));
        const txtFiles = this.listDir('C:/Utilisateurs/Joueur/Documents/Textes').filter(i => i.name.endsWith('.txt'));

        return pdfFiles.length >= 2 && imgFiles.length >= 2 && arcFiles.length >= 2 && txtFiles.length >= 2;
    }

    markScriptTested(path, content = null) {
        path = this.normalizePath(path);
        const fileNode = this.getNode(path);
        const fileContent = content !== null ? content : (fileNode ? fileNode.content : '');
        this.testedScripts[path] = {
            tested: true,
            timestamp: Date.now(),
            content: fileContent
        };
        // Also save by filename for convenience
        const fileName = path.split('/').pop();
        this.testedScripts[fileName] = this.testedScripts[path];
        return true;
    }

    isScriptTested(path) {
        path = this.normalizePath(path);
        const fileName = path.split('/').pop();
        const record = this.testedScripts[path] || this.testedScripts[fileName];
        if (!record || !record.tested) return false;

        // Verify if file was modified after testing
        const fileNode = this.getNode(path);
        if (fileNode && record.content !== undefined && record.content !== fileNode.content) {
            // Content changed after test!
            return false;
        }
        return true;
    }
}

window.vfs = new VirtualFileSystem();
