// Window Manager for Widown OS
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindowId = null;
        this.highestZ = 100;
        this.desktop = null;
        this.taskbarApps = null;
    }

    init() {
        this.desktop = document.getElementById('desktop');
        this.taskbarApps = document.getElementById('taskbar-apps');
    }

    createWindow({ id, title, icon, width = 680, height = 450, x = 120, y = 80, content, onOpen, onClose }) {
        if (this.windows.has(id)) {
            this.restoreWindow(id);
            this.bringToFront(id);
            return this.windows.get(id);
        }

        // Offset new windows slightly
        const count = this.windows.size;
        const posX = Math.min(window.innerWidth - width - 20, Math.max(20, x + count * 30));
        const posY = Math.min(window.innerHeight - height - 60, Math.max(20, y + count * 25));

        const winEl = document.createElement('div');
        winEl.className = 'widown-window aero-glass';
        winEl.id = `win-${id}`;
        winEl.style.width = `${width}px`;
        winEl.style.height = `${height}px`;
        winEl.style.left = `${posX}px`;
        winEl.style.top = `${posY}px`;
        winEl.style.zIndex = ++this.highestZ;

        winEl.innerHTML = `
            <div class="window-titlebar">
                <div class="window-title">
                    <span class="window-icon app-icon-${icon}"></span>
                    <span class="window-title-text">${title}</span>
                </div>
                <div class="window-controls">
                    <button class="win-btn win-minimize" title="Réduire">🗕</button>
                    <button class="win-btn win-maximize" title="Agrandir">🗖</button>
                    <button class="win-btn win-close" title="Fermer">✕</button>
                </div>
            </div>
            <div class="window-body">
                ${content || ''}
            </div>
            <div class="win-resize-handle"></div>
        `;

        this.desktop.appendChild(winEl);

        // Taskbar button
        const taskBtn = document.createElement('div');
        taskBtn.className = 'taskbar-item active';
        taskBtn.id = `task-btn-${id}`;
        taskBtn.innerHTML = `
            <span class="task-icon app-icon-${icon}"></span>
            <span class="task-title">${title}</span>
        `;
        taskBtn.onclick = () => this.toggleWindowFromTaskbar(id);
        this.taskbarApps.appendChild(taskBtn);

        const winData = {
            id,
            el: winEl,
            taskBtn,
            title,
            icon,
            isMaximized: false,
            isMinimized: false,
            prevRect: null,
            onClose
        };

        this.windows.set(id, winData);
        this.setupWindowEvents(winData);
        this.bringToFront(id);

        window.soundFX.playOpen();

        if (onOpen) onOpen(winEl);
        return winData;
    }

    setupWindowEvents(winData) {
        const { el, id } = winData;
        const titlebar = el.querySelector('.window-titlebar');
        const minBtn = el.querySelector('.win-minimize');
        const maxBtn = el.querySelector('.win-maximize');
        const closeBtn = el.querySelector('.win-close');
        const resizeHandle = el.querySelector('.win-resize-handle');

        el.addEventListener('mousedown', () => this.bringToFront(id));

        minBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.minimizeWindow(id);
        });

        maxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMaximize(id);
        });

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeWindow(id);
        });

        // Dragging
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        titlebar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-controls')) return;
            if (winData.isMaximized) return;

            isDragging = true;
            this.bringToFront(id);
            startX = e.clientX;
            startY = e.clientY;
            startLeft = el.offsetLeft;
            startTop = el.offsetTop;

            const onMouseMove = (ev) => {
                if (!isDragging) return;
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;
                el.style.left = `${Math.max(0, Math.min(window.innerWidth - 80, startLeft + dx))}px`;
                el.style.top = `${Math.max(0, Math.min(window.innerHeight - 80, startTop + dy))}px`;
            };

            const onMouseUp = () => {
                isDragging = false;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });

        // Resizing
        if (resizeHandle) {
            let isResizing = false;
            let initW, initH, initX, initY;

            resizeHandle.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                if (winData.isMaximized) return;

                isResizing = true;
                this.bringToFront(id);
                initW = el.offsetWidth;
                initH = el.offsetHeight;
                initX = e.clientX;
                initY = e.clientY;

                const onResizeMove = (ev) => {
                    if (!isResizing) return;
                    const nw = Math.max(340, initW + (ev.clientX - initX));
                    const nh = Math.max(220, initH + (ev.clientY - initY));
                    el.style.width = `${nw}px`;
                    el.style.height = `${nh}px`;
                };

                const onResizeUp = () => {
                    isResizing = false;
                    window.removeEventListener('mousemove', onResizeMove);
                    window.removeEventListener('mouseup', onResizeUp);
                };

                window.addEventListener('mousemove', onResizeMove);
                window.addEventListener('mouseup', onResizeUp);
            });
        }
    }

    bringToFront(id) {
        const win = this.windows.get(id);
        if (!win) return;

        this.highestZ += 2;
        win.el.style.zIndex = this.highestZ;
        this.activeWindowId = id;

        this.windows.forEach((w) => {
            w.el.classList.remove('active-window');
            w.taskBtn.classList.remove('active');
        });

        win.el.classList.add('active-window');
        win.taskBtn.classList.add('active');
    }

    minimizeWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        win.isMinimized = true;
        win.el.classList.add('minimized');
        win.taskBtn.classList.remove('active');
        window.soundFX.playClick();
    }

    restoreWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        win.isMinimized = false;
        win.el.classList.remove('minimized');
        this.bringToFront(id);
    }

    toggleWindowFromTaskbar(id) {
        const win = this.windows.get(id);
        if (!win) return;

        if (win.isMinimized) {
            this.restoreWindow(id);
        } else if (this.activeWindowId === id) {
            this.minimizeWindow(id);
        } else {
            this.bringToFront(id);
        }
    }

    toggleMaximize(id) {
        const win = this.windows.get(id);
        if (!win) return;

        if (win.isMaximized) {
            // Restore
            win.isMaximized = false;
            win.el.classList.remove('maximized');
            if (win.prevRect) {
                win.el.style.width = win.prevRect.w;
                win.el.style.height = win.prevRect.h;
                win.el.style.left = win.prevRect.l;
                win.el.style.top = win.prevRect.t;
            }
        } else {
            // Maximize
            win.prevRect = {
                w: win.el.style.width,
                h: win.el.style.height,
                l: win.el.style.left,
                t: win.el.style.top
            };
            win.isMaximized = true;
            win.el.classList.add('maximized');
            win.el.style.left = '0px';
            win.el.style.top = '0px';
            win.el.style.width = '100vw';
            win.el.style.height = 'calc(100vh - 42px)';
        }
        window.soundFX.playClick();
    }

    closeWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        if (win.onClose) win.onClose();
        win.el.remove();
        win.taskBtn.remove();
        this.windows.delete(id);
        window.soundFX.playClick();
    }

    showModalAlert({ title, message, type = 'warning', buttons = ['OK'], onAction }) {
        const modal = document.createElement('div');
        modal.className = 'widown-modal-overlay';
        modal.style.zIndex = ++this.highestZ + 50;

        window.soundFX.playVirusAlert();

        modal.innerHTML = `
            <div class="widown-modal-box aero-glass">
                <div class="modal-header">
                    <span class="modal-icon ${type}"></span>
                    <strong>${title}</strong>
                </div>
                <div class="modal-content">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    ${buttons.map((b, idx) => `<button class="widown-btn modal-btn" data-index="${idx}">${b}</button>`).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelectorAll('.modal-btn').forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.dataset.index, 10);
                modal.remove();
                if (onAction) onAction(buttons[idx]);
            };
        });
    }
}

window.windowManager = new WindowManager();
