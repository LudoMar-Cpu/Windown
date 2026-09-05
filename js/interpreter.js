// Typon Language Interpreter & Real Scripting Runtime
class TyponInterpreter {
    constructor() {
        this.installed = false;
        this.version = "1.0.4";
        this.libraries = {
            'systeme': true,
            'fichiers': true,
            'gui': false,
            'reseau': false,
            'crypto': false,
            'mobile': true,
            'ia': false
        };

        this.docs = {
            'importer': { signature: 'importer <bibliotheque>', desc: 'Charge un module (ex: `fichiers`, `systeme`, `reseau`, `crypto`, `gui`, `mobile`, `ia`).' },
            'afficher': { signature: 'afficher(valeur)', desc: 'Affiche du texte ou des variables dans la console de sortie.' },
            'entrer': { signature: 'entrer(invite)', desc: 'Demande à l\'utilisateur de saisir une valeur ou un montant.' },
            'classe': { signature: 'classe NomClasse:\n    definir methode(self, arg):', desc: 'Déclare une classe Objet avec des méthodes et constructeur (Windown 10+).' },
            'lister': { signature: 'lister(chemin_dossier)', desc: 'Renvoie la liste des noms de fichiers d\'un répertoire.' },
            'deplacer': { signature: 'deplacer(source, destination)', desc: 'Déplace un fichier vers un nouveau dossier.' },
            'supprimer': { signature: 'supprimer(chemin_fichier)', desc: 'Supprime un fichier ou un répertoire.' },
            'creer_dossier': { signature: 'creer_dossier(chemin)', desc: 'Crée un nouveau sous-dossier s\'il n\'existe pas.' },
            'classer_dossier': { signature: 'classer_dossier(chemin)', desc: 'Trie automatiquement les fichiers (PDF, Images, Archives, Textes) selon leur extension.' },
            'lire_fichier': { signature: 'lire_fichier(chemin)', desc: 'Lit et renvoie le contenu texte d\'un fichier.' },
            'ecrire_fichier': { signature: 'ecrire_fichier(chemin, texte)', desc: 'Écrit du contenu dans un fichier texte.' },
            'pour': { signature: 'pour <element> dans <liste>:', desc: 'Boucle parcourant chaque élément d\'une liste.' },
            'tant_que': { signature: 'tant_que <condition>:', desc: 'Boucle s\'exécutant tant que la condition est vraie.' },
            'si': { signature: 'si <condition>:', desc: 'Exécute le bloc suivant si la condition est remplie.' },
            'sinon': { signature: 'sinon:', desc: 'Branche par défaut si la condition `si` est fausse.' },
            'definir': { signature: 'definir nom_fonction(params):', desc: 'Déclare une nouvelle fonction réutilisable.' },
            'se_termine_par': { signature: 'texte.se_termine_par(".ext")', desc: 'Vérifie si le texte se termine par le suffixe.' },
            'contient': { signature: 'texte.contient("mot")', desc: 'Vérifie si le texte contient une sous-chaîne.' },
            'creer_fenetre': { signature: 'gui.creer_fenetre(titre, message)', desc: 'Ouvre une fenêtre graphique personnalisée sur Widown !' },
            'mobile.creer_app': { signature: 'mobile.creer_app(nom, theme)', desc: 'Initialise un projet d\'application mobile pour le Widown Store.' },
            'mobile.ajouter_vue': { signature: 'mobile.ajouter_vue(nom, type)', desc: 'Ajoute une vue ou un onglet à l\'application mobile.' },
            'scanner_mac': { signature: 'reseau.scanner_mac(adresse_mac)', desc: 'Scanne et ping une machine distante par son adresse MAC.' },
            'ia.generer_script': { signature: 'ia.generer_script(consigne)', desc: 'Génère du code Typon complet avec le modèle neuronal Widown 11.' }
        };
    }

    isInstalled() {
        return this.installed;
    }

    install() {
        this.installed = true;
    }

    unlockLibrary(lib) {
        this.libraries[lib] = true;
    }

    // Flexible Parser and Execution Engine
    async execute(code, logsCallback) {
        if (!this.installed) {
            logsCallback("ERREUR CRITIQUE : L'interpréteur 'Typon' n'est pas installé sur votre station Widown.", 'error');
            logsCallback("Veuillez télécharger et installer Typon.xey depuis le site web officiel.", 'error');
            return { success: false, error: 'Typon not installed' };
        }

        if (!code || !code.trim()) {
            logsCallback("[Typon] Le fichier est vide. Écrivez des instructions pour commencer.", 'error');
            return { success: false, error: 'Empty script' };
        }

        logsCallback(`[Typon v${this.version}] Compilation du script...`, 'info');
        await new Promise(r => setTimeout(r, 150));

        const lines = code.split('\n');
        const variables = {};
        const classes = {};
        let filesMoved = 0;
        let filesDeleted = 0;

        try {
            for (let i = 0; i < lines.length; i++) {
                let rawLine = lines[i];
                let line = rawLine.trim();
                if (!line || line.startsWith('#') || line.startsWith('//')) continue;

                // 1. Module Imports
                if (line.startsWith('importer ')) {
                    const lib = line.replace('importer ', '').trim().replace(/['";]/g, '');
                    if (this.libraries[lib] === false) {
                        logsCallback(`[ERREUR Ligne ${i+1}] Bibliothèque '${lib}' non débloquée ! Allez dans TheTree.xey pour l'acquérir.`, 'error');
                        return { success: false, error: `Module manquant : ${lib}` };
                    }
                    logsCallback(`[MODULE] Bibliothèque '${lib}' chargée avec succès.`, 'success');
                    await new Promise(r => setTimeout(r, 80));
                    continue;
                }

                // 1.5 OOP Class Definition (Windown 10+)
                if (line.startsWith('classe ') && line.endsWith(':')) {
                    const className = line.replace('classe ', '').replace(':', '').trim();
                    classes[className] = { methods: {}, properties: {} };
                    logsCallback(`[POO] Déclaration de la classe '${className}'...`, 'info');
                    
                    while (i + 1 < lines.length && (lines[i+1].startsWith('    ') || lines[i+1].startsWith('\t') || !lines[i+1].trim())) {
                        i++;
                        const innerLine = lines[i].trim();
                        if (!innerLine || innerLine.startsWith('#')) continue;
                        if (innerLine.startsWith('definir ') && innerLine.endsWith(':')) {
                            const methMatch = innerLine.match(/definir\s+(\w+)\((.*?)\):/);
                            if (methMatch) {
                                const methName = methMatch[1];
                                const params = methMatch[2].split(',').map(p => p.trim());
                                classes[className].methods[methName] = { params, body: [] };
                                logsCallback(`[POO]   + Méthode définie : ${className}.${methName}()`, 'info');
                            }
                        } else if (innerLine.startsWith('self.') && innerLine.includes('=')) {
                            const [k, v] = innerLine.replace('self.', '').split('=').map(s => s.trim());
                            classes[className].properties[k] = v;
                        }
                    }
                    continue;
                }

                // 2. Variable Assignment & Class Instantiation
                if (line.includes('=') && !line.includes('==') && !line.startsWith('si ') && !line.startsWith('pour ')) {
                    const parts = line.split('=');
                    const varName = parts[0].trim();
                    let rawVal = parts.slice(1).join('=').trim();

                    // Instantiation: obj = NomClasse(...)
                    const instMatch = rawVal.match(/^(\w+)\((.*?)\)$/);
                    if (instMatch && classes[instMatch[1]]) {
                        const cName = instMatch[1];
                        variables[varName] = {
                            __class__: cName,
                            ...JSON.parse(JSON.stringify(classes[cName].properties))
                        };
                        logsCallback(`[POO] Instance de '${cName}' initialisée -> objet '${varName}'`, 'success');
                        continue;
                    }

                    // Evaluate right-hand side
                    if (rawVal.startsWith('lister(')) {
                        const arg = this.extractArg(rawVal, variables);
                        const list = window.vfs.listDir(arg);
                        variables[varName] = list.map(item => item.name);
                        logsCallback(`[VFS] ${varName} = ${variables[varName].length} fichiers trouvés dans ${arg}`, 'info');
                    } else if (rawVal.startsWith('entrer(')) {
                        const promptMsg = this.extractArg(rawVal, variables) || "Entrez une valeur :";
                        let userIn = null;
                        try {
                            userIn = prompt(promptMsg, "1000");
                        } catch (e) {
                            userIn = "1000";
                        }
                        if (userIn === null || userIn.trim() === '') userIn = "1000";
                        variables[varName] = !isNaN(userIn) ? Number(userIn) : userIn;
                        logsCallback(`[SAISIE] ${varName} = ${variables[varName]}`, 'info');
                    } else if (rawVal.startsWith('"') || rawVal.startsWith("'")) {
                        variables[varName] = rawVal.replace(/^["']|["']$/g, '');
                    } else if (!isNaN(rawVal)) {
                        variables[varName] = Number(rawVal);
                    } else if (variables[rawVal] !== undefined) {
                        variables[varName] = variables[rawVal];
                    } else {
                        // Check for arithmetic expression (e.g. montant_ht * taux_tva or ht + tva)
                        let expr = rawVal;
                        for (let [k, v] of Object.entries(variables)) {
                            if (typeof v === 'number' || (!isNaN(v) && v !== '')) {
                                expr = expr.replace(new RegExp(`\\b${k}\\b`, 'g'), v);
                            }
                        }
                        // Only allow safe math tokens: numbers, +, -, *, /, %, (, ), ., spaces
                        if (/^[0-9+\-*/().%\s]+$/.test(expr)) {
                            try {
                                const calcRes = Function(`'use strict'; return (${expr})`)();
                                variables[varName] = typeof calcRes === 'number' ? Math.round(calcRes * 100) / 100 : calcRes;
                                logsCallback(`[CALCUL] ${varName} = ${variables[varName]} (issu de: ${rawVal})`, 'info');
                            } catch (e) {
                                variables[varName] = rawVal;
                            }
                        } else {
                            variables[varName] = rawVal;
                        }
                    }
                    continue;
                }

                // 3. Print / Afficher
                if (line.startsWith('afficher(')) {
                    let text = this.extractArg(line, variables);
                    // Replace var names in string
                    for (let [k, v] of Object.entries(variables)) {
                        if (typeof v === 'string' || typeof v === 'number') {
                            text = text.replace(new RegExp(`\\b${k}\\b`, 'g'), v);
                        }
                    }
                    logsCallback(`> ${text}`, 'stdout');
                    await new Promise(r => setTimeout(r, 50));
                    continue;
                }

                // 4. GUI Window Creation (typon.gui)
                if (line.includes('creer_fenetre(')) {
                    if (!this.libraries['gui']) {
                        logsCallback(`[ERREUR] Module 'gui' non débloqué dans TheTree.xey !`, 'error');
                        return { success: false, error: 'Module gui verrouille' };
                    }
                    const args = line.match(/creer_fenetre\((.*)\)/);
                    let title = "Application Typon GUI";
                    let msg = "Fenêtre créée depuis votre script !";
                    if (args && args[1]) {
                        const spl = args[1].split(',');
                        if (spl[0]) title = spl[0].replace(/['"]/g, '').trim();
                        if (spl[1]) msg = spl[1].replace(/['"]/g, '').trim();
                    }
                    window.windowManager.showModalAlert({
                        title: `✨ ${title}`,
                        message: msg,
                        type: 'info'
                    });
                    logsCallback(`[GUI] Fenêtre graphique '${title}' instanciée.`, 'success');
                    continue;
                }

                // 5. Automatic Folder Sorter (classer_dossier)
                if (line.includes('classer_dossier(')) {
                    let targetDir = this.extractArg(line, variables) || 'C:/Utilisateurs/Joueur/Documents';
                    logsCallback(`[AUTOMATISATION] Analyse et tri de '${targetDir}'...`, 'info');
                    await new Promise(r => setTimeout(r, 200));

                    const files = window.vfs.listDir(targetDir).filter(f => f.type === 'file');
                    if (files.length === 0) {
                        logsCallback(`[INFO] Aucun fichier non classé trouvé à la racine de ${targetDir}.`, 'info');
                    }

                    for (let file of files) {
                        let dest = '';
                        if (file.name.endsWith('.pdf')) dest = targetDir + '/PDF';
                        else if (file.name.endsWith('.png') || file.name.endsWith('.jpg')) dest = targetDir + '/Images';
                        else if (file.name.endsWith('.zip') || file.name.endsWith('.tar')) dest = targetDir + '/Archives';
                        else if (file.name.endsWith('.txt')) dest = targetDir + '/Textes';

                        if (dest) {
                            window.vfs.moveFile(file.path, dest);
                            logsCallback(`[TRI] Déplacement de '${file.name}' vers '${dest}/'`, 'success');
                            filesMoved++;
                            await new Promise(r => setTimeout(r, 100));
                        }
                    }
                    continue;
                }

                // 6. Manual Loops & Conditional Moves (pour / si / deplacer / supprimer)
                if (line.includes('deplacer(')) {
                    const match = line.match(/deplacer\((.*?),(.*?)\)/);
                    if (match) {
                        let src = match[1].trim();
                        let dst = match[2].trim().replace(/['"]/g, '');

                        // Process documents directory files matching extension
                        let rootDir = 'C:/Utilisateurs/Joueur/Documents';
                        const files = window.vfs.listDir(rootDir).filter(f => f.type === 'file');
                        for (let f of files) {
                            if ((src.includes('.pdf') && f.name.endsWith('.pdf')) ||
                                (src.includes('.png') && f.name.endsWith('.png')) ||
                                (src.includes('.zip') && f.name.endsWith('.zip')) ||
                                (src.includes('.txt') && f.name.endsWith('.txt')) ||
                                src.includes(f.name) || src === 'fichier' || src === 'f') {
                                window.vfs.moveFile(f.path, dst);
                                logsCallback(`[DÉPLACEMENT] ${f.name} -> ${dst}/`, 'success');
                                filesMoved++;
                            }
                        }
                    }
                    continue;
                }

                if (line.includes('supprimer(')) {
                    const targetFile = this.extractArg(line, variables);
                    window.vfs.deleteNode(targetFile);
                    logsCallback(`[SUPPRESSION] Fichier '${targetFile}' nettoyé.`, 'info');
                    filesDeleted++;
                    continue;
                }

                // 6.5 Mobile Module (mobile.creer_app / mobile.ajouter_vue)
                if (line.includes('mobile.creer_app(')) {
                    const arg = this.extractArg(line, variables) || 'Application Typon';
                    logsCallback(`[MOBILE SDK] Initialisation du package d'application : '${arg}'`, 'success');
                    if (window.gameEngine) {
                        window.gameEngine.lastMobileApp = { name: arg, views: [] };
                    }
                    continue;
                }

                if (line.includes('mobile.ajouter_vue(')) {
                    const arg = this.extractArg(line, variables) || 'VuePrincipale';
                    logsCallback(`[MOBILE SDK] Intégration de la vue/interface : '${arg}'`, 'info');
                    if (window.gameEngine && window.gameEngine.lastMobileApp) {
                        window.gameEngine.lastMobileApp.views.push(arg);
                    }
                    continue;
                }

                // 6.6 OOP Object Method Invocation (obj.methode(args))
                if (line.includes('.') && line.includes('(') && !line.startsWith('ia.') && !line.startsWith('mobile.') && !line.startsWith('gui.')) {
                    const methMatch = line.match(/^(\w+)\.(\w+)\((.*?)\)/);
                    if (methMatch) {
                        const objName = methMatch[1];
                        const mName = methMatch[2];
                        const mArgs = methMatch[3];
                        if (variables[objName] && variables[objName].__class__) {
                            logsCallback(`[POO] Appel de méthode : ${variables[objName].__class__}->${mName}(${mArgs})`, 'info');
                            continue;
                        }
                    }
                }

                // 7. AI Module (ia.generer_script)
                if (line.includes('ia.generer_script(')) {
                    if (!this.libraries['ia']) {
                        logsCallback(`[ERREUR] Module IA non disponible. Mettez à niveau vers Widown 11 pour activer l'IA neuronale !`, 'error');
                        return { success: false, error: 'Module IA requis' };
                    }
                    logsCallback(`[WIDOWN AI] Réseau neuronal activé. Traitement du pipeline autonome...`, 'success');
                    await new Promise(r => setTimeout(r, 300));
                }
            }

            logsCallback(`\n[SUCCÈS] Exécution terminée sans encombre (${filesMoved} fichiers déplacés, ${filesDeleted} supprimés).`, 'success');
            return { success: true, filesMoved, filesDeleted };
        } catch (err) {
            logsCallback(`[ERREUR CRITIQUE] ${err.message}`, 'error');
            return { success: false, error: err.message };
        }
    }

    extractArg(str, variables) {
        const match = str.match(/\((.*?)\)/);
        if (!match) return '';
        let inner = match[1].trim();
        if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
            return inner.slice(1, -1);
        }
        if (variables[inner] !== undefined) {
            return variables[inner];
        }
        return inner.replace(/['"]/g, '');
    }
}

window.typon = new TyponInterpreter();
