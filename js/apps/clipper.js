// Clipper Assistant - The Interactive Helper that Accompanies the Player on Every Contract
class ClipperAssistant {
    constructor() {
        this.container = null;
        this.bubbleText = null;
        this.bubble = null;
        this.avatar = null;
        this.activeContract = null;
        this.isHackerMode = false;
    }

    init() {
        this.container = document.getElementById('clipper-container');
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="clipper-speech-bubble" id="clipper-bubble">
                <div class="bubble-header">
                    <strong id="clipper-header-title">📎 Clipper</strong>
                    <button class="bubble-close" id="clipper-hide-btn" title="Masquer">✕</button>
                </div>
                <div class="bubble-content" id="clipper-text">
                    Bonjour ! Je suis Clipper votre assistant Widown. Je vous accompagne sur tous vos contrats pour vous guider pas à pas !
                </div>
                <div class="bubble-actions">
                    <button class="clipper-btn-hint" id="clipper-btn-hint">💡 Guide-moi pour mon contrat !</button>
                    <button class="clipper-btn-hint clipper-btn-doc" id="clipper-btn-doc" title="Consulter la documentation officielle en ligne">🌐 Doc Typon (Web)</button>
                </div>
            </div>

            <div class="clipper-avatar" id="clipper-avatar" title="Cliquer pour parler à Clipper">
                <svg class="clipper-svg" viewBox="0 0 100 120" width="80" height="96">
                    <path class="paperclip-metal" d="M30,100 L30,40 C30,20 70,20 70,40 L70,85 C70,98 45,98 45,85 L45,45 C45,35 60,35 60,45 L60,80" 
                          fill="none" stroke="#d0d6e2" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="paperclip-highlight" d="M32,98 L32,40 C32,23 68,23 68,40 L68,83 C68,95 47,95 47,83 L47,45 C47,38 58,38 58,45 L58,78" 
                          fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
                    
                    <g class="clipper-eyes">
                        <ellipse cx="44" cy="40" rx="9" ry="12" fill="#ffffff" stroke="#2c3e50" stroke-width="2" />
                        <ellipse cx="64" cy="40" rx="9" ry="12" fill="#ffffff" stroke="#2c3e50" stroke-width="2" />
                        <circle class="pupil-left" cx="46" cy="40" r="4.5" fill="#111111" />
                        <circle class="pupil-right" cx="66" cy="40" r="4.5" fill="#111111" />
                        <path class="brow-left" d="M36,25 Q44,20 52,24" fill="none" stroke="#2c3e50" stroke-width="2.5" stroke-linecap="round" />
                        <path class="brow-right" d="M58,24 Q66,20 74,25" fill="none" stroke="#2c3e50" stroke-width="2.5" stroke-linecap="round" />
                    </g>
                </svg>
            </div>
        `;

        this.bubble = this.container.querySelector('#clipper-bubble');
        this.bubbleText = this.container.querySelector('#clipper-text');
        this.avatar = this.container.querySelector('#clipper-avatar');

        this.avatar.addEventListener('click', () => {
            this.toggleBubble();
            this.playAnimation('bounce');
        });

        this.container.querySelector('#clipper-hide-btn').addEventListener('click', () => {
            this.bubble.style.display = 'none';
        });

        this.container.querySelector('#clipper-btn-hint').addEventListener('click', () => {
            this.giveContextualHint();
        });

        const docBtn = this.container.querySelector('#clipper-btn-doc');
        if (docBtn) {
            docBtn.addEventListener('click', () => {
                if (window.logolApp) window.logolApp.openToUrl('https://www.typon.moc/docs');
            });
        }

        this.bubble.addEventListener('click', (e) => {
            const docLink = e.target.closest('.clipper-doc-link');
            if (docLink) {
                e.preventDefault();
                if (window.logolApp) window.logolApp.openToUrl('https://www.typon.moc/docs');
            }
        });
    }

    say(textHtml) {
        if (!this.bubbleText || !this.bubble) return;
        this.bubbleText.innerHTML = textHtml.replace(/\n/g, '<br>');
        this.bubble.style.display = 'block';
        window.soundFX.playClipper();
        this.playAnimation('talk');
    }

    triggerPhishingEvent() {
        this.say(`😱 **OH NON ! Tu t'es fait avoir par du phishing !**<br><br>L'adresse <code>banque-widown-fraude.xyz</code> n'était pas officielle... Ça aurait été bien mieux avec le **Pare-Feu Anti-Phishing** de TheTree.xey !<br><br>Mais ne panique pas, c'est pas grave... **il y a un moyen de récupérer tout cet argent !**`);
        this.playAnimation('bounce');

        setTimeout(() => {
            this.activateHackerMode();
        }, 3200);
    }

    activateHackerMode() {
        this.isHackerMode = true;
        if (this.container) this.container.classList.add('clipper-hacker-mode');
        window.soundFX.playVirusAlert();

        const titleEl = document.getElementById('clipper-header-title');
        if (titleEl) titleEl.innerHTML = '☠️ Clipper (Mode Hacker)';

        this.say(`🔴 **JE PASSE EN MODE HACKER !**<br><br>Le pirate a laissé des traces lors de la transaction frauduleuse. On va hacker sa propre machine pour lui reprendre chaque centime !<br><br>👉 **Étape 1 :** Ouvre l'invite de commandes **cmd.xey** et tape :<br><code>traceroute connexion.banque-widown-fraude.xyz</code><br>pour identifier son adresse MAC !<br><br>👉 **Étape 2 :** Connecte-toi à sa machine dans **AnyWidown** !`);
        this.playAnimation('talk');
    }

    deactivateHackerMode() {
        this.isHackerMode = false;
        if (this.container) this.container.classList.remove('clipper-hacker-mode');
        window.soundFX.playSuccess();

        const titleEl = document.getElementById('clipper-header-title');
        if (titleEl) titleEl.innerHTML = '📎 Clipper (Expert Cyber)';

        this.say(`🎉 **VICTOIRE ÉPIQUE DANS LA GUERRE DES HACKERS !**<br><br>Non seulement nous avons récupéré tes 1 250 € volés, mais nous avons empoché 1 500 € de prime pirate et 6 SP !<br><br>Tu as neutralisé toutes ses contre-attaques. Tout Widown OS est fier de toi !`);
        this.playAnimation('bounce');
    }

    sayForClient(client) {
        this.activeContract = client.id;
        if (client.id === 'cli_michel') {
            this.say(`👴 **Mission Papy Michel :**<br>
Vous êtes connecté sur son PC !<br>
1. Tapez <code>cd Photos_Et_Poubelles</code><br>
2. Tapez <code>ls</code> pour voir les fichiers.<br>
3. Supprimez les fichiers temporaires avec :<br>
<code>rm cache_temp_01.tmp</code><br>
<code>rm cache_temp_02.tmp</code><br>
<code>rm virus_faux_guide.tmp</code>`);
        } else if (client.id === 'cli_lucas') {
            this.say(`🎮 **Mission Lucas Gamer :**<br>
1. Ouvre **CodeStud**, clique sur **Nouveau .ty** et crée <code>tri_clips.ty</code>.<br>
2. Écris ce script d'automatisation des clips :<br>
<pre style="background:#0f172a; color:#38bdf8; padding:6px 10px; border-radius:6px; font-family:Consolas,monospace; font-size:11px; margin:6px 0; border:1px solid #334155; text-align:left; user-select:all;">importer fichiers
afficher("Organisation des clips terminée !")</pre>
*(💡 Astuce : tape <code>tri</code> puis <b>Tab</b> dans CodeStud pour l'auto-compléter !)*<br>
3. Clique sur **Enregistrer**.<br>
4. Dans **AnyWidown**, tape <code>cd Captures_Jeux</code> et <code>rm temp_render.tmp</code>.<br>
5. Tape <code>cd /Scripts</code> puis téléverse ton script : <code>upload tri_clips.ty</code> !<br><br>
📖 <a href="#" class="clipper-doc-link" style="color:#0284c7; font-weight:bold; text-decoration:underline;">Consulter la doc officielle sur Typon.moc/docs</a>`);
        } else if (client.id === 'cli_sophie') {
            this.say(`💍 **Mission Sophie Bijoux :**<br>
1. Ouvre **CodeStud**, clique sur **Nouveau .ty** et crée <code>facturation.ty</code>.<br>
2. Écris le script de facturation sécurisée :<br>
<pre style="background:#0f172a; color:#38bdf8; padding:6px 10px; border-radius:6px; font-family:Consolas,monospace; font-size:11px; margin:6px 0; border:1px solid #334155; text-align:left; user-select:all;">importer fichiers
importer reseau
afficher("Module de facturation déployé avec succès !")</pre>
*(💡 Astuce : tape <code>fact</code> puis <b>Tab</b> dans CodeStud pour l'auto-compléter !)*<br>
3. Clique sur **Enregistrer** dans CodeStud.<br>
4. Dans **AnyWidown**, connecte-toi en **HSS** sur le port 22.<br>
5. Tape <code>cd /Securite</code> puis téléverse : <code>upload facturation.ty</code> !<br><br>
📖 <a href="#" class="clipper-doc-link" style="color:#0284c7; font-weight:bold; text-decoration:underline;">Consulter la doc officielle sur Typon.moc/docs</a>`);
        } else if (client.id === 'cli_maxime') {
            this.say(`🔨 **Mission Maxime Rénovation :**<br>
1. Ouvre **CodeStud**, clique sur **Nouveau .ty** et nomme-le <code>calcul_devis.ty</code>.<br>
2. Écris le script avec les variables et le calcul :<br>
<pre style="background:#0f172a; color:#38bdf8; padding:6px 10px; border-radius:6px; font-family:Consolas,monospace; font-size:11px; margin:6px 0; border:1px solid #334155; text-align:left; user-select:all;">importer fichiers
taux_tva = 0.20
montant_ht = 1500
montant_tva = montant_ht * taux_tva
montant_ttc = montant_ht + montant_tva
afficher("--- DEVIS RENOVATION ---")
afficher("Montant HT : 1500 EUR")
afficher("TVA (20%) : 300 EUR")
afficher("Total TTC : 1800 EUR")</pre>
*(💡 Astuce : tape <code>calcul</code> ou <code>devis</code> puis <b>Tab</b> dans CodeStud !)*<br>
3. ⚠️ **Très important :** Appuie sur **F5 (Exécuter)** pour tester le script localement ! Maxime refuse tout script non certifié.<br>
4. Dans **AnyWidown**, connecte-toi en **HSS**, tape <code>cd /Comptabilite</code> puis <code>upload calcul_devis.ty</code> !<br><br>
📖 <a href="#" class="clipper-doc-link" style="color:#0284c7; font-weight:bold; text-decoration:underline;">Consulter la doc officielle sur Typon.moc/docs</a>`);
        } else if (client.id === 'cli_dark_hacker') {
            this.say(`☠️ **GUERRE CYBER CONTRE DARK_HACKER :**<br>
1. Tape <code>cd Defenses_Parefeu</code> puis <code>rm counter_attack.bot</code> pour briser sa contre-attaque !<br>
2. Dans **CodeStud**, crée <code>recup_fonds.ty</code> avec ce script de rapatriement :<br>
<pre style="background:#0f172a; color:#ff4d6d; padding:6px 10px; border-radius:6px; font-family:Consolas,monospace; font-size:11px; margin:6px 0; border:1px solid #dc2626; text-align:left; user-select:all;">importer reseau
importer fichiers
afficher("Rapatriement des fonds volés en cours...")</pre>
*(💡 Astuce : tape <code>recup</code> puis <b>Tab</b> dans CodeStud !)*<br>
3. Enregistre le fichier, puis tape <code>cd /Butin_Vols</code> et <code>upload recup_fonds.ty</code> !`);
        }
    }

    toggleBubble() {
        if (!this.bubble) return;
        this.bubble.style.display = (this.bubble.style.display === 'none') ? 'block' : 'none';
    }

    playAnimation(type) {
        if (!this.avatar) return;
        this.avatar.classList.add(`anim-${type}`);
        setTimeout(() => this.avatar.classList.remove(`anim-${type}`), 800);
    }

    giveContextualHint() {
        // If in Hacker Mode
        if (this.isHackerMode) {
            this.say(`🔴 **Consignes de la Cyber-Guerre :**<br>
1. Ouvre **cmd.xey** et tape :<br>
<code>traceroute connexion.banque-widown-fraude.xyz</code><br>
2. Ouvre **AnyWidown** et connecte-toi à **DARK_HACKER** (Port 22 HSS, user: <code>admin</code>, pass: <code>hacked2024</code>).<br>
3. Neutralise <code>counter_attack.bot</code> dans <code>/Defenses_Parefeu</code> et téléverse <code>recup_fonds.ty</code> dans <code>/Butin_Vols</code> !`);
            return;
        }

        // If connected to remote client in AnyWidown
        if (window.anyWidownApp && window.anyWidownApp.activeSession) {
            this.sayForClient(window.anyWidownApp.activeSession.client);
            return;
        }

        const isSorted = window.vfs.checkDocumentsSorted();
        if (!isSorted) {
            this.say(`📁 **Mission 1 (Valex Compta) :**<br>
1. Ouvre **CodeStud** sur le bureau.<br>
2. Clique sur **📄 Nouveau .ty** pour créer un script.<br>
3. Tape :<br>
<pre style="background:#0f172a; color:#38bdf8; padding:6px 10px; border-radius:6px; font-family:Consolas,monospace; font-size:11px; margin:4px 0; text-align:left;">importer fichiers
classer_dossier("C:/Utilisateurs/Joueur/Documents")</pre>
4. Appuie sur **F5** pour exécuter !<br><br>
📖 <a href="#" class="clipper-doc-link" style="color:#0284c7; font-weight:bold; text-decoration:underline;">Voir la doc Typon complète</a>`);
            return;
        }

        this.say(`⭐ **Prochains Contrats :**<br>
Ouvre **AnyWidown** sur le bureau pour intervenir chez :<br>
• **Lucas Gamer** (script <code>tri_clips.ty</code> dans <code>/Scripts</code>)<br>
• **Sophie Bijoux** (script <code>facturation.ty</code> dans <code>/Securite</code>)<br><br>
💡 Dans CodeStud, tape <code>tri</code> ou <code>fact</code> puis <b>Tab</b> pour le code !<br>
📖 Besoin d'aide ? Ouvre la <a href="#" class="clipper-doc-link" style="color:#0284c7; font-weight:bold; text-decoration:underline;">Documentation Officielle Typon (typon.moc/docs)</a> !`);
    }
}

window.clipper = new ClipperAssistant();
