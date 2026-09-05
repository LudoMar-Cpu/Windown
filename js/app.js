// Main Desktop Application & OS Boot Manager for Widown
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Modules
    window.windowManager.init();
    window.clipper.init();

    // Elements
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');
    const startBtn = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const clockEl = document.getElementById('taskbar-clock');
    const moneyEl = document.getElementById('tray-money');
    const spEl = document.getElementById('tray-sp');

    // Update In-Game Chronological Clock & Calendar
    if (window.gameEngine && typeof window.gameEngine.updateClockDisplay === 'function') {
        window.gameEngine.updateClockDisplay();
    }

    // Start Boot Sequence
    function runBootSequence() {
        const startBootBtn = document.getElementById('start-boot-btn');
        if (startBootBtn) {
            startBootBtn.addEventListener('click', () => {
                startBootBtn.style.display = 'none';
                document.getElementById('boot-animation-box').style.display = 'flex';
                window.soundFX.playBootSound();

                setTimeout(() => {
                    bootScreen.classList.add('fade-out');
                    setTimeout(() => {
                        bootScreen.style.display = 'none';
                        onDesktopReady();
                    }, 800);
                }, 3200);
            });
        }
    }

    function onDesktopReady() {
        if (window.outlockApp) window.outlockApp.updateGlobalBadges();
        window.gameEngine.showNotification('Bienvenue sur Widown 7', 'Station de travail prête. Vérifiez Outlock pour vos missions.', 'info');
        window.gameEngine.updateClipperState();
    }

    // Toggle Start Menu
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = startMenu.classList.contains('open');
        startMenu.classList.toggle('open', !isOpen);
        startBtn.classList.toggle('active', !isOpen);
        window.soundFX.playClick();
    });

    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
            startMenu.classList.remove('open');
            startBtn.classList.remove('active');
        }
    });

    // App Launchers Registry
    const appLaunchers = {
        'codestud': () => window.codeStudApp.open(),
        'outlock': () => window.outlockApp.open(),
        'browser': () => window.logolApp.open(),
        'thetree': () => window.theTreeApp.open(),
        'anywidown': () => window.anyWidownApp.open(),
        'explorer': () => window.explorerApp.open(),
        'cmd': () => window.terminalApp.open(),
        'ftnwork': () => window.ftnWorkApp && window.ftnWorkApp.open(),
        'pilewilla': () => window.pileWillaApp && window.pileWillaApp.open(),
        'netsim': () => window.netSimApp && window.netSimApp.open(),
        'socialnet': () => window.socialNetApp && window.socialNetApp.open(),
        'store': () => window.widownStoreApp && window.widownStoreApp.open(),
        'myaistudio': () => window.myAIStudioApp && window.myAIStudioApp.open(),
        'darkhacker': () => window.darkHackerSuiteApp && window.darkHackerSuiteApp.open(),
        'investhub': () => window.investHubApp && window.investHubApp.open(),
        'cyberdefense': () => window.cyberDefenseApp && window.cyberDefenseApp.open(),
        'secreport': () => window.securityReportApp && window.securityReportApp.open(),
        'vmmanager': () => window.vmManagerApp && window.vmManagerApp.open(),
        'clipper-toggle': () => window.clipper.toggleBubble(),
        'upgrade-os': () => {
            if (window.gameEngine.osVersion === 7) {
                window.gameEngine.upgradeOS(8);
            } else if (window.gameEngine.osVersion === 8) {
                window.gameEngine.upgradeOS(9);
            } else if (window.gameEngine.osVersion === 9) {
                window.gameEngine.upgradeOS(10);
            } else if (window.gameEngine.osVersion === 10) {
                window.gameEngine.upgradeOS(11);
            } else if (window.gameEngine.osVersion === 11) {
                window.gameEngine.upgradeOS('calis');
            } else {
                window.gameEngine.upgradeOS(7);
            }
        }
    };

    // Desktop Icons
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const app = icon.dataset.app;
            if (appLaunchers[app]) appLaunchers[app]();
        });
        // Mobile/Single tap fallback
        icon.addEventListener('click', () => {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
        });
    });

    // Start Menu Items
    document.querySelectorAll('.start-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const app = item.dataset.app;
            if (appLaunchers[app]) {
                appLaunchers[app]();
                startMenu.classList.remove('open');
                startBtn.classList.remove('active');
            }
        });
    });

    // Quick Taskbar Pinned Icons
    document.querySelectorAll('.pinned-task-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const app = btn.dataset.app;
            if (appLaunchers[app]) appLaunchers[app]();
        });
    });

    // Update Stats in System Tray
    window.gameEngine.subscribe((type, data) => {
        if (type === 'STATS_CHANGED') {
            if (moneyEl) moneyEl.textContent = `${data.money} €`;
            if (spEl) spEl.textContent = `${data.sp} SP`;
        }
    });

    // Run boot
    runBootSequence();
});
