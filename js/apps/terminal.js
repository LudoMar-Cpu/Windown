// Terminal / Invite de commande (cmd.xey) for Widown OS
class TerminalApp {
    constructor() {
        this.currentDir = 'C:/Utilisateurs/Joueur';
        this.history = [];
        this.historyIndex = -1;
    }

    open() {
        const content = `
            <div class="cmd-container">
                <div class="cmd-screen" id="cmd-screen">
                    <div class="cmd-banner">
                        Widown [Version 7.1.7601 SP1]<br>
                        (c) 2024 Widown Corporation. Tous droits réservés.<br><br>
                        Tapez <strong>help</strong> pour afficher la liste des commandes.
                    </div>
                    <div id="cmd-history"></div>
                    <div class="cmd-input-line">
                        <span class="cmd-prompt" id="cmd-prompt-text">C:\\Utilisateurs\\Joueur&gt;</span>
                        <input type="text" class="cmd-input" id="cmd-input-field" autofocus spellcheck="false" autocomplete="off">
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'terminal',
            title: 'Invite de commandes (cmd.xey)',
            icon: 'cmd',
            width: 700,
            height: 440,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        const input = winEl.querySelector('#cmd-input-field');
        const screen = winEl.querySelector('#cmd-screen');
        const historyEl = winEl.querySelector('#cmd-history');
        const promptEl = winEl.querySelector('#cmd-prompt-text');

        input.focus();
        screen.addEventListener('click', () => input.focus());

        input.addEventListener('keydown', async (e) => {
            const hasHistorySkill = window.theTreeApp && window.theTreeApp.isSkillUnlocked('skill_history');

            if (e.key === 'ArrowUp') {
                if (hasHistorySkill && this.history.length > 0) {
                    e.preventDefault();
                    if (this.historyIndex > 0) this.historyIndex--;
                    else this.historyIndex = this.history.length - 1;
                    input.value = this.history[this.historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                if (hasHistorySkill && this.history.length > 0) {
                    e.preventDefault();
                    if (this.historyIndex < this.history.length - 1) {
                        this.historyIndex++;
                        input.value = this.history[this.historyIndex] || '';
                    } else {
                        this.historyIndex = -1;
                        input.value = '';
                    }
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.handleTabCompletion(input);
            } else if (e.key === 'Enter') {
                const cmd = input.value.trim();
                input.value = '';
                if (cmd) {
                    this.history.push(cmd);
                    this.historyIndex = this.history.length;
                    await this.processCommand(cmd, historyEl, promptEl);
                }
                screen.scrollTop = screen.scrollHeight;
            }
        });
    }

    handleTabCompletion(input) {
        const val = input.value;
        const commands = ['dir', 'cd', 'typon', 'cls', 'ipconfig', 'traceroute', 'tracert', 'tree', 'help', 'exit'];

        if (!val.includes(' ')) {
            const match = commands.find(c => c.startsWith(val.toLowerCase()));
            if (match) {
                input.value = match + ' ';
                window.soundFX.playClick();
                return;
            }
        }

        const parts = val.split(' ');
        if (parts.length >= 2) {
            const prefix = parts[1].toLowerCase();
            const items = window.vfs.listDir(this.currentDir);
            const match = items.find(i => i.name.toLowerCase().startsWith(prefix));
            if (match) {
                input.value = `${parts[0]} ${match.name}`;
                window.soundFX.playClick();
            }
        }
    }

    async processCommand(cmd, historyEl, promptEl) {
        const line = document.createElement('div');
        line.className = 'cmd-line-entry';
        line.innerHTML = `<span class="cmd-prompt">${promptEl.textContent}</span> <span>${cmd}</span>`;
        historyEl.appendChild(line);

        const out = document.createElement('div');
        out.className = 'cmd-output-block';

        const args = cmd.split(' ').filter(Boolean);
        const action = args[0].toLowerCase();

        switch (action) {
            case 'help':
                out.innerHTML = `
COMMANDES DISPONIBLES :<br>
  <strong>dir</strong>          : Liste le contenu et la taille de chaque fichier.<br>
  <strong>cd &lt;dossier&gt;</strong>   : Change de répertoire courant.<br>
  <strong>typon run &lt;f&gt;</strong>  : Exécute un script Typon.<br>
  <strong>ipconfig</strong>      : Affiche l'adresse IP et la passerelle réseau.<br>
  <strong>traceroute &lt;h&gt;</strong>  : Trace les sauts réseau et localise une cible IP/MAC.<br>
  <strong>tree</strong>          : Affiche l'arborescence des dossiers.<br>
  <strong>cls</strong>           : Efface l'écran.<br>
  <strong>exit</strong>          : Ferme l'invite de commande.
                `;
                break;

            case 'cls':
            case 'clear':
                historyEl.innerHTML = '';
                return;

            case 'dir':
            case 'ls':
                const items = window.vfs.listDir(this.currentDir);
                let dirOut = ` Le volume dans le lecteur C n'a pas de nom.<br>`;
                dirOut += ` Répertoire de ${this.currentDir.replace(/\//g, '\\')}<br><br>`;
                
                let totalSize = 0;
                let fileCount = 0;
                let dirCount = 0;

                items.forEach(i => {
                    const tag = i.type === 'dir' ? '&lt;REP&gt;        ' : `${(i.size || '1.0 Ko').padStart(12, ' ')}  `;
                    if (i.type === 'dir') dirCount++;
                    else fileCount++;
                    dirOut += `04/09/2026  12:00    ${tag}  ${i.name}<br>`;
                });

                dirOut += `<br>        ${fileCount} fichier(s)<br>        ${dirCount} répertoire(s)<br>`;
                out.innerHTML = dirOut;
                break;

            case 'cd':
                const target = args[1] || '';
                if (target === '..') {
                    const last = this.currentDir.lastIndexOf('/');
                    if (last > 2) this.currentDir = this.currentDir.slice(0, last);
                } else if (target) {
                    const nextPath = `${this.currentDir}/${target}`.replace('//', '/');
                    const node = window.vfs.getNode(nextPath);
                    if (node && node.type === 'dir') {
                        this.currentDir = nextPath;
                    } else {
                        out.innerHTML = `Le chemin d'accès spécifié est introuvable.`;
                    }
                }
                promptEl.textContent = this.currentDir.replace(/\//g, '\\') + '>';
                break;

            case 'typon':
                if (args[1] === 'run') {
                    const file = args[2] || 'mon_script.ty';
                    const fullPath = file.includes('/') ? file : `C:/Utilisateurs/Joueur/Projets/${file}`;
                    const node = window.vfs.readFile(fullPath);
                    if (!node.success) {
                        out.innerHTML = `Erreur : Fichier '${file}' introuvable dans les Projets.`;
                    } else {
                        await window.typon.execute(node.content, (msg, type) => {
                            out.innerHTML += `<div>${msg}</div>`;
                        });
                    }
                } else {
                    out.innerHTML = `Typon Runtime v${window.typon.version} (Widown Edition). Tapez <strong>typon run &lt;fichier.ty&gt;</strong> pour exécuter.`;
                }
                break;

            case 'ipconfig':
                out.innerHTML = `
Carte réseau Widown Ethernet 0 :<br>
   Adresse IPv4. . . . . . . . . . . . . .: 192.168.1.10<br>
   Masque de sous-réseau . . . . . . . . . : 255.255.255.0<br>
   Passerelle par défaut . . . . . . . . . : 192.168.1.1<br>
   DNS Sécurisé. . . . . . . . . . . . . .: 8.8.8.8
                `;
                break;

            case 'traceroute':
            case 'tracert':
            case 'ping':
                const host = (args[1] || '').toLowerCase();
                if (host.includes('banque') || host.includes('fraude') || host.includes('dark') || (window.clipper && window.clipper.isHackerMode)) {
                    window.soundFX.playNotification();
                    out.innerHTML = `
<div style="color:#38bdf8;">
Détermination de l'itinéraire vers connexion.banque-widown-fraude.xyz [192.168.66.66]<br>
avec un maximum de 30 sauts :<br><br>
  1    &lt;1 ms    &lt;1 ms    &lt;1 ms  192.168.1.1 (Routeur Passerelle)<br>
  2    14 ms    12 ms    13 ms  10.4.0.254 (Noeud FAI Widown Fibre)<br>
  3    32 ms    29 ms    31 ms  core-transit-backbone.net [78.109.12.1]<br>
  4    71 ms    68 ms    74 ms  proxy-darknet-tor-exit.onion [185.220.101.5]<br>
  5    95 ms    91 ms    89 ms  <strong>192.168.66.66 [DARK_HACKER_VAULT]</strong><br><br>
</div>
<div style="background:#1e1e38; border:1px solid #38bdf8; padding:10px; border-radius:6px; color:#f1f5f9; font-size:12px;">
  <strong style="color:#4ade80;">🎯 CIBLE PIRATE IDENTIFIÉE AVEC SUCCÈS !</strong><br>
  -----------------------------------------------------------------<br>
  • Nom d'hôte      : <strong>DARK_HACKER (Serveur Clandestin)</strong><br>
  • Adresse MAC     : <code>DE:AD:BE:EF:13:37</code><br>
  • Port Ouvert     : <code>22</code> (Protocole Chiffré HSS SSH)<br>
  • Identifiants    : Utilisateur: <code>admin</code> | Mot de passe: <code>hacked2024</code><br>
  -----------------------------------------------------------------<br>
  👉 <em>Ouvrez <strong>AnyWidown</strong>, activez l'onglet <strong>HSS (Port 22)</strong> et connectez-vous avec l'adresse MAC <code>DE:AD:BE:EF:13:37</code> pour contre-attaquer !</em>
</div>
`;
                } else if (host) {
                    out.innerHTML = `
Envoi d'une requête 'ping' sur ${host} :<br>
Réponse de ${host} : octets=32 temps=18 ms TTL=56<br>
Réponse de ${host} : octets=32 temps=17 ms TTL=56<br>
Statistiques Ping : 2 reçus, 0 perdus.
`;
                } else {
                    out.innerHTML = `Usage : traceroute &lt;adresse_ou_domaine&gt; (ex: traceroute connexion.banque-widown-fraude.xyz)`;
                }
                break;

            case 'exit':
                window.windowManager.closeWindow('terminal');
                return;

            default:
                out.innerHTML = `'${action}' n'est pas reconnu en tant que commande interne ou externe. Tapez <strong>help</strong>.`;
                break;
        }

        historyEl.appendChild(out);
    }
}

window.terminalApp = new TerminalApp();
