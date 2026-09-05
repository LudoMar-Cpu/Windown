// VirtualWidown.xey - Hypervisor & Multi-OS Virtual Machine Manager
class VMManagerApp {
    constructor() {
        this.vms = [
            { id: 'vm_obonto', name: 'Obonto Server 20.04 LTS', os: 'Obonto Linux', ramNeeded: 2, running: false, task: 'Micro-services Web & Hébergement Passif', revenue: 65, logs: ['[systemd] Started Obonto Daemon.', '[nginx] Listening on port 8080.'] },
            { id: 'vm_calis', name: 'Calis Linox Cyber-Audit', os: 'Calis Pentest', ramNeeded: 4, running: false, task: 'Sondes Automatisées de Vulnérabilités', revenue: 95, logs: ['[calis] Kernel loaded.', '[metasploit] Automation worker idle.'] },
            { id: 'vm_winxp', name: 'Windown XP Service Pack 3', os: 'Windown Legacy', ramNeeded: 1, running: false, task: 'Rétro-Ingénierie & Compatibilité', revenue: 40, logs: ['[ntoskrnl] Boot sequence complete.', '[explorer.exe] Sandbox desktop ready.'] }
        ];
    }

    getActiveVMCount() {
        return this.vms.filter(v => v.running).length;
    }

    open() {
        const osVer = window.gameEngine.osVersion;
        const osEd = window.gameEngine.osEdition;

        // Check prerequisites: Windown >= 9 and PRO Edition!
        const isSupportedOS = (typeof osVer === 'number' && osVer >= 9) || osVer === 'calis' || osVer === 'obonto';
        const isPro = osEd === 'pro';

        let bodyContent = '';

        if (!isSupportedOS || !isPro) {
            bodyContent = `
                <div class="vm-lock-screen">
                    <span class="vm-lock-icon">🔒</span>
                    <h3>VirtualWidown Hypervisor Verrouillé</h3>
                    <p>La technologie de virtualisation de processeur matériel (VT-x / Hyper-V) requiert :</p>
                    <ul class="vm-prereq-list">
                        <li class="${isSupportedOS ? 'valid' : 'invalid'}">
                            ${isSupportedOS ? '✅' : '❌'} Système d'Exploitation : <strong>Windown 9 ou supérieur</strong> (Actuellement : Windown ${osVer})
                        </li>
                        <li class="${isPro ? 'valid' : 'invalid'}">
                            ${isPro ? '✅' : '❌'} Licence Système : <strong>Édition Professionnelle (PRO)</strong> (Actuellement : ${osEd.toUpperCase()})
                        </li>
                    </ul>
                    <div style="margin-top:16px;">
                        <button class="widown-btn btn-primary" onclick="window.investHubApp.open();">Ouvrir InvestHub pour Obtenir la Licence PRO</button>
                    </div>
                </div>
            `;
        } else {
            const specs = window.gameEngine.pcSpecs;
            const activeCount = this.getActiveVMCount();

            bodyContent = `
                <div class="vm-dashboard">
                    <!-- Top Specs Banner -->
                    <div class="vm-specs-banner">
                        <div>
                            <strong>Station Hôte :</strong> ${specs.cpu} | <strong>RAM Physique :</strong> ${specs.ramGB} Go
                        </div>
                        <div class="vm-quota-badge ${activeCount >= specs.maxVMs ? 'quota-full' : ''}">
                            VMs Actives : <strong>${activeCount} / ${specs.maxVMs} max</strong>
                        </div>
                    </div>

                    <!-- Virtual Machines Grid -->
                    <div class="vm-grid">
                        ${this.vms.map(vm => `
                            <div class="vm-card ${vm.running ? 'vm-running' : ''}">
                                <div class="vm-card-header">
                                    <div class="vm-os-icon">${vm.os.includes('Linux') || vm.os.includes('Obonto') ? '🐧' : (vm.os.includes('Calis') ? '🐉' : '🪟')}</div>
                                    <div>
                                        <strong>${vm.name}</strong>
                                        <small>${vm.task}</small>
                                    </div>
                                    <span class="vm-status-pill ${vm.running ? 'running' : 'stopped'}">
                                        ${vm.running ? '🟢 EN COURS' : '⚪ ARRÊTÉE'}
                                    </span>
                                </div>

                                <div class="vm-card-body">
                                    <div class="vm-metric">Mémoire vRAM allouée : <strong>${vm.ramNeeded} Go</strong></div>
                                    <div class="vm-metric">Rendement passif : <strong>+${vm.revenue} € / cycle</strong></div>
                                    <div class="vm-log-box">
                                        <div class="log-title">Console Système (tty1) :</div>
                                        <div class="log-content">
                                            ${vm.logs.map(l => `<div>${l}</div>`).join('')}
                                        </div>
                                    </div>
                                </div>

                                <div class="vm-card-footer">
                                    <button class="widown-btn btn-sm ${vm.running ? 'btn-danger' : 'btn-success'} btn-toggle-vm" data-id="${vm.id}">
                                        ${vm.running ? '⏹️ Arrêter VM' : '▶️ Démarrer VM'}
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        window.windowManager.createWindow({
            id: 'vmmanager',
            title: 'VirtualWidown Hypervisor - Gestionnaire de Machines Virtuelles',
            icon: 'cmd',
            width: 860,
            height: 560,
            content: `<div class="vmmanager-container">${bodyContent}</div>`,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        winEl.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.btn-toggle-vm');
            if (toggleBtn) {
                const vmId = toggleBtn.dataset.id;
                const vm = this.vms.find(v => v.id === vmId);
                if (!vm) return;

                if (!vm.running) {
                    const activeCount = this.getActiveVMCount();
                    const maxVMs = window.gameEngine.pcSpecs.maxVMs;
                    if (activeCount >= maxVMs) {
                        window.gameEngine.showNotification('Limite Mémoire Atteinte !', `Votre configuration actuelle (${window.gameEngine.pcSpecs.ramGB} Go RAM) est limitée à ${maxVMs} VM simultanées. Augmentez la RAM dans InvestHub !`, 'danger');
                        return;
                    }
                    vm.running = true;
                    vm.logs.push(`[${new Date().toLocaleTimeString()}] Kernel booting on ${vm.ramNeeded}GB allocated vRAM...`);
                    vm.logs.push(`[${new Date().toLocaleTimeString()}] System online. Daemon task '${vm.task}' started.`);
                    window.soundFX.playSuccess();
                    window.gameEngine.showNotification('VM Démarrée', `${vm.name} est en cours d'exécution (+${vm.revenue} € / cycle).`, 'success');
                } else {
                    vm.running = false;
                    vm.logs.push(`[${new Date().toLocaleTimeString()}] ACPI shutdown signal received. VM halted.`);
                    window.soundFX.playClick();
                    window.gameEngine.showNotification('VM Arrêtée', `${vm.name} a été mise hors tension.`, 'info');
                }

                this.refresh(winEl);
            }
        });
    }

    refresh(winEl) {
        const container = winEl.querySelector('.vmmanager-container');
        if (container) {
            // Re-render
            const specs = window.gameEngine.pcSpecs;
            const activeCount = this.getActiveVMCount();
            container.innerHTML = `
                <div class="vm-dashboard">
                    <div class="vm-specs-banner">
                        <div>
                            <strong>Station Hôte :</strong> ${specs.cpu} | <strong>RAM Physique :</strong> ${specs.ramGB} Go
                        </div>
                        <div class="vm-quota-badge ${activeCount >= specs.maxVMs ? 'quota-full' : ''}">
                            VMs Actives : <strong>${activeCount} / ${specs.maxVMs} max</strong>
                        </div>
                    </div>

                    <div class="vm-grid">
                        ${this.vms.map(vm => `
                            <div class="vm-card ${vm.running ? 'vm-running' : ''}">
                                <div class="vm-card-header">
                                    <div class="vm-os-icon">${vm.os.includes('Linux') || vm.os.includes('Obonto') ? '🐧' : (vm.os.includes('Calis') ? '🐉' : '🪟')}</div>
                                    <div>
                                        <strong>${vm.name}</strong>
                                        <small>${vm.task}</small>
                                    </div>
                                    <span class="vm-status-pill ${vm.running ? 'running' : 'stopped'}">
                                        ${vm.running ? '🟢 EN COURS' : '⚪ ARRÊTÉE'}
                                    </span>
                                </div>

                                <div class="vm-card-body">
                                    <div class="vm-metric">Mémoire vRAM allouée : <strong>${vm.ramNeeded} Go</strong></div>
                                    <div class="vm-metric">Rendement passif : <strong>+${vm.revenue} € / cycle</strong></div>
                                    <div class="vm-log-box">
                                        <div class="log-title">Console Système (tty1) :</div>
                                        <div class="log-content">
                                            ${vm.logs.map(l => `<div>${l}</div>`).join('')}
                                        </div>
                                    </div>
                                </div>

                                <div class="vm-card-footer">
                                    <button class="widown-btn btn-sm ${vm.running ? 'btn-danger' : 'btn-success'} btn-toggle-vm" data-id="${vm.id}">
                                        ${vm.running ? '⏹️ Arrêter VM' : '▶️ Démarrer VM'}
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }
}

window.vmManagerApp = new VMManagerApp();
