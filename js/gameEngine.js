// Game Engine & Story Progression Manager for Widown OS
class GameEngine {
    constructor() {
        this.osVersion = 7;
        this.money = 50;
        this.skillPoints = 0;
        this.currentStep = 'WELCOME';
        this.verifExtensionInstalled = false;
        this.quarantineActive = false;
        this.activeContractId = null; // The contract currently followed by the player
        this.isEmployedAtFortynite = false;
        this.fortyniteHostile = false;

        // In-game Chronological Time Engine (starts 22 Oct 2009 - Win 7 Release)
        this.gameDate = new Date(2009, 9, 22, 9, 0, 0); // 22 Octobre 2009 09:00
        this.timeSpeedMinutesPerSec = 5; // Natural flow
        this.listeners = [];
        this.aiNewsTriggered = false;

        // PC Hardware Specifications
        this.pcSpecs = {
            cpu: 'Intel Core 2 Duo E8400 (3.0 GHz)',
            cpuLevel: 1,
            ramGB: 4,
            maxVMs: 1,
            storage: 'Disque Dur HDD 250 Go SATA',
            storageLevel: 1
        };

        // OS Edition & Licenses
        this.osEdition = 'pro'; // 'famille', 'normale', 'pro'
        this.familleFlawsAccumulated = 0;

        // Financial & Recurring Expenses Engine
        this.expenses = {
            rent: 50,
            power: 25,
            internet: 40,
            staff: 0
        };

        this.realEstate = [
            { id: 'chambre', name: 'Chambre Étudiante (1 poste)', rent: 50, desks: 1, owned: true, cost: 0 },
            { id: 'garage', name: 'Garage Aménagé (3 postes)', rent: 150, desks: 3, owned: false, cost: 5000 },
            { id: 'coworking', name: 'Plateau Coworking (8 postes)', rent: 400, desks: 8, owned: false, cost: 20000 },
            { id: 'immeuble', name: 'Immeuble Tech HQ (25 postes)', rent: 1500, desks: 25, owned: false, cost: 100000 }
        ];

        this.staffList = [
            { id: 'junior_dev', name: 'Développeur Junior', salary: 350, revenue: 550, count: 0 },
            { id: 'sec_auditor', name: 'Auditeur Cybersécurité', salary: 600, revenue: 1000, count: 0 },
            { id: 'accountant', name: 'Gestionnaire Comptable', salary: 450, revenue: 700, count: 0 }
        ];

        this.businesses = [
            { id: 'cyber_cafe', name: 'CyberCafé Le Modem Bleu', cost: 8000, revenue: 650, icon: '☕', owned: false, desc: 'Revenu passif via les clients locaux et forfaits LAN.' },
            { id: 'cloud_vps', name: 'Hébergeur Cloud SARL', cost: 25000, revenue: 2400, icon: '🖧', owned: false, desc: 'Location de serveurs VPS et infogérance réseau.' },
            { id: 'audit_firm', name: 'Cabinet Audit Zero-Day Inc.', cost: 75000, revenue: 8000, icon: '🛡️', owned: false, desc: 'Prestations de sécurité offensive pour grands groupes.' }
        ];

        // Crypto Trading (WidCoin)
        this.crypto = {
            widCoin: 0,
            price: 135.50,
            history: [120, 125, 122, 130, 128, 135.5]
        };

        // Website Ads & Popups
        this.cleanAdsActive = false;
        this.adRevenuePerCycle = 0;
        this.spamSites = []; // 15-second popup generation sites

        // Cyber Attacks & Defense
        this.aiAutoDefense = false;
        this.activeAttacks = [];
        this.resolvedAttacks = [];
        this.nextAttackTimer = 60; // seconds

        // Zero-Day Flaws Database (Windown Security Report)
        this.reportedFlaws = [];

        this.initTimeEngine();
        this.initEconomyEngine();
    }

    initTimeEngine() {
        setInterval(() => {
            this.gameDate.setMinutes(this.gameDate.getMinutes() + this.timeSpeedMinutesPerSec);
            this.updateClockDisplay();

            // Breaking GenAI News toward 2019/2020
            if (this.gameDate.getFullYear() >= 2019 && !this.aiNewsTriggered) {
                this.aiNewsTriggered = true;
                this.showNotification('📰 FLASH INFO TECH (2019/2020)', 'Révolution IA : Les modèles de langage arrivent ! Le futur Widown 11 sera dédié à l\'IA !', 'info');
                if (window.outlockApp) {
                    window.outlockApp.addCustomEmail({
                        id: 'mail_ai_revolution_2020',
                        sender: 'Tech Hebdo <redaction@tech-hebdo.wid>',
                        subject: '📰 BREAKING : Révolution de l\'IA Générative et Annonce Secrète de Widown 11',
                        body: `
                            <div style="background:#1e3a8a; color:#ffffff; padding:12px; border-radius:6px; margin-bottom:12px;">
                                <div style="font-size:14px; font-weight:bold;">📰 TECH CHRONICLES HEBDO - ÉDITION SPÉCIALE 2020</div>
                                <small>L'intelligence artificielle transforme le développement informatique</small>
                            </div>
                            <h3>Les Modèles Génératifs bousculent l'industrie logicielle</h3>
                            <p>Des laboratoires de pointe viennent de dévoiler les premiers réseaux de neurones capables d'écrire du code Typon et d'exécuter des pipelines d'automatisation complexes en quelques secondes.</p>
                            <p>Selon des sources internes, le groupe Widown prépare la sortie imminente de <strong>Widown 11</strong>, un système d'exploitation entièrement articulé autour de l'IA générative, de la vente de clés API et des datacenters autonomes.</p>
                            <div style="background:#eff6ff; border:1px solid #3b82f6; padding:10px; border-radius:6px; color:#1e40af; font-size:12px; margin:10px 0;">
                                💡 <strong>Anticipation :</strong> Les développeurs sont invités à préparer l'acquisition de serveurs pour la transition vers Widown 11 !
                            </div>
                        `
                    });
                }
            }
        }, 1000);
    }

    advanceTimeDays(days) {
        this.gameDate.setDate(this.gameDate.getDate() + days);
        this.updateClockDisplay();
    }

    updateClockDisplay() {
        const clockEl = document.getElementById('taskbar-clock');
        if (!clockEl) return;

        const hours = String(this.gameDate.getHours()).padStart(2, '0');
        const minutes = String(this.gameDate.getMinutes()).padStart(2, '0');
        const day = String(this.gameDate.getDate()).padStart(2, '0');
        const month = String(this.gameDate.getMonth() + 1).padStart(2, '0');
        const year = this.gameDate.getFullYear();

        clockEl.innerHTML = `
            <div class="clock-time">${hours}:${minutes}</div>
            <div class="clock-date">${day}/${month}/${year}</div>
        `;
    }

    subscribe(fn) {
        this.listeners.push(fn);
    }

    notify(type, data) {
        this.listeners.forEach(fn => fn(type, data));
    }

    showNotification(title, message, icon = 'info') {
        window.soundFX.playNotification();
        const container = document.getElementById('notification-tray');
        if (!container) return;

        const notif = document.createElement('div');
        notif.className = 'widown-toast slide-in';
        notif.innerHTML = `
            <div class="toast-header">
                <span class="toast-icon ${icon}"></span>
                <strong>${title}</strong>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        container.appendChild(notif);

        setTimeout(() => {
            notif.classList.add('fade-out');
            setTimeout(() => notif.remove(), 400);
        }, 6000);
    }

    setStep(step) {
        this.currentStep = step;
        this.notify('STEP_CHANGED', step);
        this.updateClipperState();
    }

    setActiveContract(contractId) {
        this.activeContractId = contractId;
        this.notify('CONTRACT_CHANGED', contractId);
        window.soundFX.playSuccess();

        // Update Clipper
        if (window.clipper && window.anyWidownApp) {
            const client = window.anyWidownApp.clients.find(c => c.id === contractId);
            if (client) {
                window.clipper.sayForClient(client);
            }
        }
    }

    addReward(money, sp) {
        this.money += money;
        this.skillPoints += sp;
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        window.soundFX.playSuccess();
        this.showNotification('🎉 Récompense Reçue !', `+${money} € & +${sp} Points de Compétence (SP)`, 'success');
    }

    updateClipperState() {
        if (!window.clipper) return;
        switch (this.currentStep) {
            case 'WELCOME':
                window.clipper.say("Bonjour ! Je suis Clipper 📎 votre assistant Widown. Vous avez des demandes de contrats dans **Outlock** ! Cliquez dessus pour accepter votre première mission.");
                break;
            case 'EMAIL_OPENED':
                window.clipper.say("Vous devez trier le dossier **Documents** ! Ouvrez **CodeStud**, créez un fichier `.ty` et tapez `classer_dossier(\"C:/Utilisateurs/Joueur/Documents\")` !");
                break;
            case 'QUARANTINE_TRIGGERED':
                window.clipper.say("⚠️ Widown Defender a bloqué le fichier car **l'interpréteur Typon.xey n'est pas encore installé** ! Ouvrez **Logol Lhome** pour le chercher sur le web.");
                break;
            case 'SEARCHING_WEB':
                window.clipper.say("Attention aux faux sites dangereux ! Activez l'extension **Verif** dans le navigateur pour repérer le site officiel certifié **www.typon.moc** (99% de sécurité).");
                break;
            case 'TYPON_READY':
                window.clipper.say("Super ! Typon est installé. Retournez dans **CodeStud**. Appuyez sur **F5** pour exécuter le script de tri !");
                break;
            case 'FIRST_QUEST_DONE':
                window.clipper.say("Bravo ! Vos documents sont triés ! Allez dans **Outlock** pour accepter de nouveaux contrats (Papy Michel, Lucas...) puis ouvrez **AnyWidown**.");
                break;
            case 'WIDOWN_11_READY':
                window.clipper.say("🚀 Widown 11 est actif ! L'intelligence artificielle neuronale est débloquée.");
                break;
        }
    }

    upgradeOS(newVer) {
        this.osVersion = newVer;
        document.body.className = `os-widown-${newVer}`;
        
        const clipperEl = document.getElementById('clipper-container');

        if (newVer === 8) {
            this.gameDate = new Date(2012, 9, 26, 10, 0, 0); // 26 Octobre 2012
            window.soundFX.playSuccess();
            this.showNotification('🏢 Windown 8 Entreprise Déployé (2012)', 'Interface Modern UI active. Clipper a été désactivé par la politique de sécurité d\'entreprise.', 'info');
            if (clipperEl) clipperEl.style.display = 'none';
        } else if (newVer === 9) {
            this.gameDate = new Date(2014, 3, 15, 11, 0, 0); // 15 Avril 2014
            window.soundFX.playSuccess();
            this.showNotification('🌐 Windown 9 Édition Réseau (2014)', 'Administration réseau, simulateur NetSim, routeurs et caméras IP débloqués !', 'info');
            if (clipperEl) clipperEl.style.display = 'none';
        } else if (newVer === 10) {
            this.gameDate = new Date(2015, 6, 29, 10, 0, 0); // 29 Juillet 2015
            window.soundFX.playSuccess();
            this.showNotification('💻 Widown 10 Pro Déployé (2015)', 'Développement mobile, POO poussée, Store et réseaux sociaux débloqués !', 'info');
            if (clipperEl) clipperEl.style.display = 'block';
        } else if (newVer === 11) {
            this.gameDate = new Date(2021, 9, 5, 14, 0, 0); // 5 Octobre 2021
            window.soundFX.playWin11Boot();
            this.showNotification('✨ Widown 11 Révolution IA (2021)', 'Design Fluent activé, MyAI Studio, vente API et Data-Centers débloqués !', 'success');
            if (clipperEl) clipperEl.style.display = 'block';
            if (window.typon && typeof window.typon.unlockLibrary === 'function') {
                window.typon.unlockLibrary('ia');
            }
            this.setStep('WIDOWN_11_READY');
        } else if (newVer === 'obonto' || newVer === 'calis') {
            window.soundFX.playVirusAlert();
            this.showNotification('☠️ OS Clandestin Infiltré', `${newVer === 'calis' ? 'Calis Linox Premium' : 'Obonto Server'} actif. Mode Dark Hacking engagé.`, 'danger');
            if (clipperEl) clipperEl.style.display = 'none';
        } else {
            window.soundFX.playSuccess();
            this.showNotification(`Widown ${newVer}`, 'Mise à niveau du système terminée.', 'info');
        }
        this.updateClockDisplay();
        this.notify('OS_UPGRADED', newVer);
    }

    initEconomyEngine() {
        // Crypto market fluctuation ticker (every 5 seconds)
        setInterval(() => {
            const deltaPercent = (Math.random() * 8 - 3.8) / 100; // -3.8% to +4.2%
            this.crypto.price = Math.max(10, Math.round((this.crypto.price * (1 + deltaPercent)) * 100) / 100);
            this.crypto.history.push(this.crypto.price);
            if (this.crypto.history.length > 20) this.crypto.history.shift();
            this.notify('CRYPTO_UPDATED', this.crypto);
        }, 5000);

        // Economic & Billing Cycle (every 40 seconds)
        setInterval(() => {
            this.processBillingCycle();
        }, 40000);

        // Cyber Incident Generator (every 55 seconds)
        setInterval(() => {
            this.checkAndGenerateIncident();
        }, 55000);
    }

    processBillingCycle() {
        // Calculate Expenses
        const currentProp = this.realEstate.find(p => p.owned) || this.realEstate[0];
        let rent = currentProp.rent;
        let power = 25; // Base
        if (window.vmManagerApp && window.vmManagerApp.getActiveVMCount) {
            power += window.vmManagerApp.getActiveVMCount() * 8; // 8€ per active VM
        }
        let internet = this.pcSpecs.ramGB >= 16 ? 80 : 40; // High speed if high tier
        let wages = 0;
        let staffIncome = 0;
        this.staffList.forEach(s => {
            wages += s.count * s.salary;
            staffIncome += s.count * s.revenue;
        });

        // Calculate Business Dividends
        let businessIncome = 0;
        this.businesses.forEach(b => {
            if (b.owned) businessIncome += b.revenue;
        });

        // Ad Revenues
        let adIncome = 0;
        if (this.cleanAdsActive) {
            adIncome += 120; // Stable passive revenue
        }
        this.spamSites.forEach(s => {
            if (s.active) {
                // High short-term yield, decaying over cycles
                s.cyclesRun = (s.cyclesRun || 0) + 1;
                if (s.cyclesRun <= 3) {
                    adIncome += 280; // High cash
                } else if (s.cyclesRun <= 6) {
                    adIncome += 70; // Saturated
                } else {
                    adIncome -= 50; // Blacklisted domain hosting loss!
                }
            }
        });

        const totalIncome = staffIncome + businessIncome + adIncome;
        const totalExpenses = rent + power + internet + wages;
        const netFlow = totalIncome - totalExpenses;

        this.money += netFlow;
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });

        // Update UI Badges
        const trayMoney = document.getElementById('tray-money');
        if (trayMoney) trayMoney.textContent = `${this.money.toLocaleString()} €`;

        if (netFlow >= 0) {
            this.showNotification('💼 Bilan Financier Périodique', `Bénéfice Net : +${netFlow} € (Revenus: ${totalIncome}€ | Charges: ${totalExpenses}€)`, 'success');
        } else {
            this.showNotification('📉 Prélèvement des Charges', `Déficit Net : ${netFlow} € (Loyer, Électricité, Salaires déduits)`, 'info');
            if (this.money < 0) {
                this.showNotification('⚠️ Découvert Bancaire !', 'Votre solde est négatif ! Réalisez des contrats ou vendez des actifs.', 'danger');
            }
        }

        // Famille Edition Vulnerability Check
        if (this.osEdition === 'famille' && Math.random() < 0.4) {
            this.familleFlawsAccumulated++;
            this.showNotification('⚠️ Widown Update : Édition Famille', 'Votre édition Famille ne dispose pas des correctifs critiques. Risque accru d\'attaques !', 'danger');
        }
    }

    checkAndGenerateIncident() {
        if (this.activeAttacks.length >= 3) return;

        const targets = [
            { name: 'Site E-Commerce Sophie Bijoux', type: 'site', url: 'www.sophie-bijoux.moc', owner: 'Sophie' },
            { name: 'Cabinet Médical SantéPlus (Sas Urgence)', type: 'reseau', ip: '192.168.1.100', owner: 'Dr. Vasseur' },
            { name: 'Serveur de Jeu Lucas Gamer', type: 'serveur', ip: '82.165.42.10', owner: 'Lucas' },
            { name: 'Serveur VPS PileWilla (Bots Joueur)', type: 'bot', ip: '51.38.12.80', owner: 'Vous' },
            { name: 'Portail Web du Joueur', type: 'site', url: 'www.mon-site-dev.wid', owner: 'Vous' }
        ];

        const target = targets[Math.floor(Math.random() * targets.length)];
        const attackTypes = [
            { name: 'DDoS SYN Flood Massif', port: 80, clue: 'Paquets SYN avec TTL 128 et taille fixe 64 octets venant d\'un botnet.' },
            { name: 'Injection SQL & Extraction Base', port: 443, clue: 'Payload contenant des motifs UNION SELECT et chaîne hexadécimale.' },
            { name: 'Brute Force SSH / Telnet', port: 22, clue: 'Trafic répétitif avec flags FIN-ACK anormaux et requêtes par seconde > 400.' }
        ];
        const attack = attackTypes[Math.floor(Math.random() * attackTypes.length)];

        // Generate 4 candidate IPs (1 real attacker, 3 legitimate/spoofed CDN)
        const attackerIP = `185.${Math.floor(Math.random()*200+20)}.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}`;
        const candidateIPs = [
            { ip: attackerIP, isAttacker: true, packets: Math.floor(Math.random()*15000 + 8000), geo: 'Zone Non Régulée (Tor Relay)', ttl: 128, flag: 'SUSPECT' },
            { ip: '142.250.179.14', isAttacker: false, packets: 120, geo: 'CDN Cache GooGoo', ttl: 54, flag: 'NORMAL' },
            { ip: '151.101.65.140', isAttacker: false, packets: 85, geo: 'CloudProxy France', ttl: 56, flag: 'NORMAL' },
            { ip: '104.16.132.229', isAttacker: false, packets: 210, geo: 'Passerelle DNS Sécurisée', ttl: 58, flag: 'NORMAL' }
        ];
        // Shuffle candidate IPs
        candidateIPs.sort(() => Math.random() - 0.5);

        const incident = {
            id: 'inc_' + Date.now(),
            target: target.name,
            targetOwner: target.owner,
            attackType: attack.name,
            port: attack.port,
            clue: attack.clue,
            bounty: Math.floor(Math.random() * 1200 + 800),
            attackerIP: attackerIP,
            candidates: candidateIPs,
            timestamp: new Date().toLocaleTimeString()
        };

        // If AI Auto Defense is ON, automatically block in 1.2s!
        if (this.aiAutoDefense) {
            setTimeout(() => {
                this.money += incident.bounty;
                this.resolvedAttacks.push(incident);
                this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
                this.showNotification('🤖 Cyber-Défense IA (1.2s)', `Intrusion sur ${incident.target} neutralisée ! IP ${attackerIP} bannie (+${incident.bounty} €).`, 'success');
                window.soundFX.playSuccess();
            }, 1200);
            return;
        }

        this.activeAttacks.push(incident);
        this.notify('INCIDENT_CREATED', incident);
        window.soundFX.playVirusAlert();
        this.showNotification('🚨 ALERTE CYBERATTAQUE !', `${incident.target} est sous attaque (${incident.attackType}). Ouvrez CyberDefense.xey !`, 'danger');

        if (window.outlockApp) {
            window.outlockApp.addCustomEmail({
                id: incident.id,
                sender: `${incident.targetOwner} <sos@alerte-cyber.wid>`,
                subject: `🚨 URGENT : Attaque en cours sur notre infrastructure !`,
                body: `
                    <div style="background:#dc2626; color:#ffffff; padding:12px; border-radius:6px; margin-bottom:12px;">
                        <strong>SOS CYBERSÉCURITÉ : INTRUSION EN COURS</strong>
                    </div>
                    <p>Notre système <strong>${incident.target}</strong> subit une attaque massive : <strong>${incident.attackType}</strong> sur le port <strong>${incident.port}</strong> !</p>
                    <p>Indice de nos sondes réseau : <em>${incident.clue}</em></p>
                    <p>Ouvrez le logiciel <strong>CyberDefense.xey</strong> pour identifier l'adresse IP de l'agresseur et la bannir dans le pare-feu !</p>
                    <p>Prime de neutralisation : <strong>${incident.bounty} €</strong></p>
                `
            });
        }
    }

    resolveIncident(incidentId, selectedIP) {
        const idx = this.activeAttacks.findIndex(i => i.id === incidentId);
        if (idx === -1) return { success: false, msg: 'Incident déjà traité ou introuvable.' };

        const inc = this.activeAttacks[idx];
        if (inc.attackerIP === selectedIP) {
            this.activeAttacks.splice(idx, 1);
            this.resolvedAttacks.push(inc);
            this.money += inc.bounty;
            this.skillPoints += 15;
            this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
            window.soundFX.playSuccess();
            this.showNotification('🛡️ Attaque Neutralisée !', `IP ${selectedIP} bloquée définitivement dans le pare-feu. Prime reçue : +${inc.bounty} € !`, 'success');
            return { success: true, bounty: inc.bounty };
        } else {
            window.soundFX.playError();
            this.money = Math.max(0, this.money - 200);
            this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
            this.showNotification('❌ Erreur de Blocage', `L'IP ${selectedIP} est un serveur légitime ! L'attaque continue (-200 € de pénalité).`, 'danger');
            return { success: false, msg: 'Mauvaise adresse IP sélectionnée !' };
        }
    }

    toggleAIAutoDefense() {
        this.aiAutoDefense = !this.aiAutoDefense;
        if (this.aiAutoDefense) {
            this.showNotification('🤖 Cyber-Défense IA Activée', 'Votre IA analyse désormais les paquets et bloque les attaques en 1 seconde automatiquement !', 'success');
            // Auto resolve existing active attacks
            while (this.activeAttacks.length > 0) {
                const inc = this.activeAttacks.shift();
                this.money += inc.bounty;
                this.resolvedAttacks.push(inc);
            }
            this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        } else {
            this.showNotification('🛡️ Cyber-Défense IA Désactivée', 'Mode d\'intervention manuel réactivé.', 'info');
        }
        this.notify('AI_DEFENSE_TOGGLED', this.aiAutoDefense);
        return this.aiAutoDefense;
    }

    // Hardware Upgrades
    upgradeRAM(newGB, cost) {
        if (this.money < cost) {
            this.showNotification('Fonds insuffisants', `Il vous faut ${cost} € pour installer ${newGB} Go de RAM.`, 'danger');
            return false;
        }
        this.money -= cost;
        this.pcSpecs.ramGB = newGB;
        // RAM limits VM slots: 4GB = 1 VM, 8GB = 2 VMs, 16GB = 4 VMs, 32GB = 6 VMs, 64GB = 10 VMs
        if (newGB <= 4) this.pcSpecs.maxVMs = 1;
        else if (newGB <= 8) this.pcSpecs.maxVMs = 2;
        else if (newGB <= 16) this.pcSpecs.maxVMs = 4;
        else if (newGB <= 32) this.pcSpecs.maxVMs = 6;
        else this.pcSpecs.maxVMs = 10;

        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.notify('HARDWARE_UPGRADED', this.pcSpecs);
        this.showNotification('⚡ Matériel Amélioré', `Mémoire vive étendue à ${newGB} Go ! Capacité VM portée à ${this.pcSpecs.maxVMs} machines.`, 'success');
        return true;
    }

    upgradeCPU(cpuName, cost) {
        if (this.money < cost) {
            this.showNotification('Fonds insuffisants', `Il vous faut ${cost} € pour ce processeur.`, 'danger');
            return false;
        }
        this.money -= cost;
        this.pcSpecs.cpu = cpuName;
        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.notify('HARDWARE_UPGRADED', this.pcSpecs);
        this.showNotification('⚡ Processeur Amélioré', `CPU remplacé par : ${cpuName} !`, 'success');
        return true;
    }

    upgradeStorage(storageName, cost) {
        if (this.money < cost) {
            this.showNotification('Fonds insuffisants', `Il vous faut ${cost} € pour ce stockage.`, 'danger');
            return false;
        }
        this.money -= cost;
        this.pcSpecs.storage = storageName;
        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.notify('HARDWARE_UPGRADED', this.pcSpecs);
        this.showNotification('💾 Stockage Amélioré', `Stockage migré vers : ${storageName} !`, 'success');
        return true;
    }

    setOSEdition(edition, cost) {
        if (this.money < cost) {
            this.showNotification('Fonds insuffisants', `Il vous faut ${cost} € pour cette licence OS.`, 'danger');
            return false;
        }
        this.money -= cost;
        this.osEdition = edition;
        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.showNotification('📜 Licence OS Enregistrée', `Édition activée : Windown ${this.osVersion} ${edition.toUpperCase()}.`, 'success');
        return true;
    }

    buyRealEstate(propId) {
        const prop = this.realEstate.find(p => p.id === propId);
        if (!prop) return false;
        if (this.money < prop.cost) {
            this.showNotification('Fonds insuffisants', `Il vous faut ${prop.cost} € pour acquérir ces locaux.`, 'danger');
            return false;
        }
        this.money -= prop.cost;
        this.realEstate.forEach(p => p.owned = false);
        prop.owned = true;
        this.expenses.rent = prop.rent;
        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.showNotification('🏢 Emménagement Confirmé !', `Vous occupez désormais : ${prop.name} (Capacité : ${prop.desks} postes).`, 'success');
        return true;
    }

    hireStaff(staffId) {
        const staff = this.staffList.find(s => s.id === staffId);
        if (!staff) return false;
        const currentProp = this.realEstate.find(p => p.owned) || this.realEstate[0];
        const totalHired = this.staffList.reduce((acc, s) => acc + s.count, 0);

        if (totalHired >= currentProp.desks) {
            this.showNotification('Locaux saturés !', `Votre local actuel ne dispose que de ${currentProp.desks} postes. Achetez de nouveaux locaux !`, 'danger');
            return false;
        }

        staff.count++;
        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.showNotification('👔 Recrutement Réussi', `Nouveau salarié embauché : ${staff.name} (Génère +${staff.revenue} € pour ${staff.salary} € de salaire).`, 'success');
        return true;
    }

    buyBusiness(bizId) {
        const biz = this.businesses.find(b => b.id === bizId);
        if (!biz || biz.owned) return false;
        if (this.money < biz.cost) {
            this.showNotification('Fonds insuffisants', `Il vous faut ${biz.cost} € pour racheter cette entreprise.`, 'danger');
            return false;
        }
        this.money -= biz.cost;
        biz.owned = true;
        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.showNotification('🎉 Entreprise Rachetée !', `Félicitations, vous êtes propriétaire de "${biz.name}" ! Bénéfice passif : +${biz.revenue} € par cycle.`, 'success');
        return true;
    }

    tradeCrypto(action, amountEuro) {
        if (action === 'buy') {
            if (this.money < amountEuro) {
                this.showNotification('Fonds insuffisants', 'Solde insuffisant pour cet achat crypto.', 'danger');
                return false;
            }
            const coinAmount = amountEuro / this.crypto.price;
            this.money -= amountEuro;
            this.crypto.widCoin += coinAmount;
            window.soundFX.playSuccess();
            this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
            this.showNotification('📈 Ordre d\'Achat Exécuté', `Acheté : ${coinAmount.toFixed(4)} WidCoin pour ${amountEuro} € (Cours: ${this.crypto.price} €).`, 'info');
            return true;
        } else if (action === 'sell') {
            const coinAmount = amountEuro / this.crypto.price;
            if (this.crypto.widCoin < coinAmount) {
                this.showNotification('Portefeuille insuffisant', 'Vous n\'avez pas assez de WidCoin à vendre.', 'danger');
                return false;
            }
            this.crypto.widCoin -= coinAmount;
            this.money += amountEuro;
            window.soundFX.playSuccess();
            this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
            this.showNotification('📉 Ordre de Vente Exécuté', `Vendu : ${coinAmount.toFixed(4)} WidCoin contre ${amountEuro} € !`, 'success');
            return true;
        }
    }

    reportZeroDayFlaw(flaw) {
        if (this.reportedFlaws.includes(flaw.id)) {
            this.showNotification('Déjà soumis', 'Cette vulnérabilité a déjà été signalée à Windown Companie.', 'info');
            return false;
        }
        this.reportedFlaws.push(flaw.id);
        this.money += flaw.bounty;
        this.skillPoints += 50;
        window.soundFX.playSuccess();
        this.notify('STATS_CHANGED', { money: this.money, sp: this.skillPoints });
        this.showNotification('🏆 BOUNTY OFFICIEL VALIDÉ !', `Windown Companie vous a versé ${flaw.bounty.toLocaleString()} € pour la faille "${flaw.title}" !`, 'success');
        return true;
    }

    triggerCyberAttack(reason) {
        window.soundFX.playVirusAlert();
        this.showNotification('🚨 CYBERATTAQUE FORTYNITE !', reason, 'danger');
        
        if (window.windowManager) {
            window.windowManager.showModalAlert({
                title: '🚨 INTRUSION RÉSEAU DÉTECTÉE - FORTYNITE SÉCURITÉ',
                message: `<strong>ALERTE ROUGE :</strong> Une sonde offensive émise par la cellule Fortynite a détecté une faille dans vos flux réseau !<br><br>
                <strong>Détail :</strong> ${reason}<br><br>
                💡 <em>Recommandation : N'utilisez jamais de protocoles obsolètes ou non chiffrés (comme HS simple sur port 80). Utilisez toujours le protocole HSS sécurisé sur le port 22 !</em>`,
                type: 'danger'
            });
        }
    }
}

window.gameEngine = new GameEngine();
