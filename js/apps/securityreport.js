// SecReport.xey - Windown Security Report & Bug Bounty Program by Windown Companie
class SecurityReportApp {
    constructor() {
        this.selectedFlawId = 'CVE-WIN-RING0-ZERO-DAY';
        this.scanning = false;
        this.scanProgress = 0;

        this.vulnerabilities = [
            {
                id: 'CVE-WIN-7-GDI',
                os: 'Widown 7',
                title: 'Dépassement de Tampon GDI Aero Glass',
                severity: 'Modérée (CVSS 5.8)',
                bounty: 3000,
                desc: 'Un débordement de mémoire dans le pilote d\'affichage Aero permet un crash système ou déni de service local.',
                hexDump: '0x00401A20: 89 45 FC 8B 4D FC 51 E8 ?? ?? ?? ?? 83 C4 04',
                cveCode: 'STACK_CORRUPTION_AERO_DWM'
            },
            {
                id: 'CVE-WIN-8-UAC',
                os: 'Widown 8',
                title: 'Contournement Sandbox Modern UI & UAC Bypass',
                severity: 'Élevée (CVSS 7.6)',
                bounty: 8500,
                desc: 'Une faille dans le courtier d\'autorisations des applications tuiles permet d\'exécuter des binaires non signés.',
                hexDump: '0x7FF60012: 48 89 5C 24 08 57 48 83 EC 20 48 8B D9 E8 B4 FF',
                cveCode: 'UAC_PRIVILEGE_ELEVATION_TOKEN'
            },
            {
                id: 'CVE-WIN-9-SMB',
                os: 'Widown 9',
                title: 'Exécution de Code à Distance SMBv2 (RCE)',
                severity: 'Critique (CVSS 8.9)',
                bounty: 20000,
                desc: 'Injection de paquets malveillants sur le port réseau 445 déclenchant l\'exécution arbitraire au niveau noyau.',
                hexDump: '0x80540028: FE 53 4D 42 40 00 00 00 00 00 00 00 01 00 00 00',
                cveCode: 'REMOTE_KERNEL_CODE_INJECTION'
            },
            {
                id: 'CVE-WIN-10-SPOOL',
                os: 'Widown 10',
                title: 'Élévation SYSTEM via Spooler d\'Impression',
                severity: 'Critique (CVSS 9.2)',
                bounty: 45000,
                desc: 'Abus des pilotes d\'imprimantes point-and-print permettant d\'obtenir les pleins droits NT AUTHORITY\\SYSTEM.',
                hexDump: '0x7FFE0300: 48 8B C4 48 89 58 08 48 89 68 10 48 89 70 18 57',
                cveCode: 'SYSTEM_ELEVATION_PRINT_DRIVER'
            },
            {
                id: 'CVE-WIN-RING0-ZERO-DAY',
                os: 'Widown 7 à 11 (Universel)',
                title: 'Zero-Day Kernel Ring-0 Execution Bypass (Faille Ultime)',
                severity: 'EXTRÊMEMENT DANGEREUX (CVSS 10.0)',
                bounty: 100000,
                desc: 'Faille de conception zero-day omniprésente dans la table des descripteurs globaux (GDT) et le gestionnaire d\'interruption du noyau NT. Permet la prise de contrôle furtive et absolue de n\'importe quelle machine au monde sans aucun mot de passe.',
                hexDump: '0xFFFFF800: FA 0F 01 10 48 C7 C0 00 00 00 00 0F 22 D8 FB 90',
                cveCode: 'RING0_KERNEL_MASTER_EXPLOIT_ZERO_DAY'
            }
        ];
    }

    open() {
        const content = `
            <div class="security-report-container">
                <div class="sec-report-header">
                    <div class="sec-brand">
                        <span class="sec-logo">🛡️</span>
                        <div>
                            <strong>Windown Security Report v4.2</strong>
                            <small>Programme Officiel Bug Bounty & Audit Noyau - Windown Companie</small>
                        </div>
                    </div>
                    <div class="sec-bounty-badge">
                        <span>Prime Ultime Zero-Day :</span>
                        <strong>100 000 €</strong>
                    </div>
                </div>

                <div class="sec-report-body">
                    <!-- Flaw List Navigation -->
                    <div class="flaw-sidebar">
                        <div class="sidebar-title">Vulnérabilités de l'OS (7 à 11)</div>
                        <div class="flaw-list" id="flaw-list-items">
                            ${this.renderFlawList()}
                        </div>
                    </div>

                    <!-- Flaw Details & Submission Box -->
                    <div class="flaw-content-pane" id="flaw-details-pane">
                        ${this.renderFlawDetails()}
                    </div>
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'secreport',
            title: 'Windown Security Report - Audit Failles Noyau (Windown Companie)',
            icon: 'shield',
            width: 860,
            height: 560,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    renderFlawList() {
        return this.vulnerabilities.map(flaw => {
            const reported = window.gameEngine.reportedFlaws.includes(flaw.id);
            const isSelected = flaw.id === this.selectedFlawId;
            const isUltimate = flaw.bounty === 100000;

            return `
                <div class="flaw-item ${isSelected ? 'active' : ''} ${isUltimate ? 'ultimate-flaw' : ''}" data-id="${flaw.id}">
                    <div class="flaw-item-top">
                        <span class="flaw-os">${flaw.os}</span>
                        <span class="flaw-status ${reported ? 'reported' : 'ready'}">${reported ? '✅ Payé' : 'À Soumettre'}</span>
                    </div>
                    <div class="flaw-item-title">${flaw.title}</div>
                    <div class="flaw-item-bounty">${flaw.bounty.toLocaleString()} €</div>
                </div>
            `;
        }).join('');
    }

    renderFlawDetails() {
        const flaw = this.vulnerabilities.find(f => f.id === this.selectedFlawId);
        if (!flaw) return '';

        const reported = window.gameEngine.reportedFlaws.includes(flaw.id);
        const isUltimate = flaw.bounty === 100000;

        return `
            <div class="flaw-detail-card ${isUltimate ? 'card-ultimate' : ''}">
                <div class="detail-header">
                    <div>
                        <div class="detail-os">${flaw.os}</div>
                        <h3>${flaw.title}</h3>
                    </div>
                    <div class="severity-box ${isUltimate ? 'sev-apocalyptic' : 'sev-critical'}">
                        ${flaw.severity}
                    </div>
                </div>

                <div class="detail-desc">
                    <p>${flaw.desc}</p>
                </div>

                <div class="detail-technical-box">
                    <strong>Analyse Mémoire Kernel & Traces Hexadécimales :</strong>
                    <pre><code>IDENTIFIANT : ${flaw.cveCode}\nOFFSET NOYAU : ${flaw.hexDump}</code></pre>
                </div>

                <div class="detail-footer">
                    <div class="bounty-reward-box">
                        <span class="label">Montant Récompense Windown Companie :</span>
                        <span class="val">${flaw.bounty.toLocaleString()} €</span>
                    </div>

                    ${reported ? `
                        <div class="already-reported-tag">
                            ✅ Faille validée & Prime de ${flaw.bounty.toLocaleString()} € versée au compte !
                        </div>
                    ` : `
                        <button class="widown-btn ${isUltimate ? 'btn-danger' : 'btn-primary'} btn-submit-flaw" data-id="${flaw.id}">
                            📨 Soumettre le Rapport à Windown Companie (${flaw.bounty.toLocaleString()} €)
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    initEvents(winEl) {
        winEl.addEventListener('click', (e) => {
            const item = e.target.closest('.flaw-item');
            if (item) {
                this.selectedFlawId = item.dataset.id;
                this.updateUI(winEl);
            }

            const submitBtn = e.target.closest('.btn-submit-flaw');
            if (submitBtn) {
                const flaw = this.vulnerabilities.find(f => f.id === submitBtn.dataset.id);
                if (flaw) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = '⏳ Analyse & Vérification par Windown Companie...';
                    setTimeout(() => {
                        window.gameEngine.reportZeroDayFlaw(flaw);
                        this.updateUI(winEl);
                    }, 1400);
                }
            }
        });
    }

    updateUI(winEl) {
        const listEl = winEl.querySelector('#flaw-list-items');
        if (listEl) listEl.innerHTML = this.renderFlawList();

        const paneEl = winEl.querySelector('#flaw-details-pane');
        if (paneEl) paneEl.innerHTML = this.renderFlawDetails();
    }
}

window.securityReportApp = new SecurityReportApp();
