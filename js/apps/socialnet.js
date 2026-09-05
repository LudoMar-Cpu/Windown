// SocialNet.xey - Réseaux Sociaux Époque 2015-2020 (Lumina, Vanish, Loopr, NexusWall)
class SocialNetApp {
    constructor() {
        this.currentNetwork = 'lumina'; // 'lumina', 'vanish', 'loopr', 'nexuswall'
        this.followers = 128;
        this.likesTotal = 450;
        this.userPosts = [];
        
        this.feeds = {
            lumina: [
                {
                    id: 'lum_1',
                    author: 'dev_aesthetic_paris',
                    avatar: '☕',
                    tagline: 'Tech Lead @ Station-F',
                    caption: 'Setup du matin avant de compiler en Typon 2.0 ✨ Double écran incurvé & café corsé. #devlife #typon #coder',
                    imageText: '🖥️ CODESTUD v2.0 | BUILD SUCCESSFUL [100%]',
                    likes: 1420,
                    comments: [
                        { author: 'sarah_code', text: 'Incroyable setup ! Quel thème pour l\'IDE ?' },
                        { author: 'typon_guru', text: 'La POO en Typon a changé ma vie 🙌' }
                    ],
                    liked: false
                },
                {
                    id: 'lum_2',
                    author: 'cyber_security_daily',
                    avatar: '🛡️',
                    tagline: 'Veille Vulnérabilités & Dark Web',
                    caption: '⚠️ Vague massive de ransomwares signalée sur les vieux parcs XP et Windown 7. Pensez à activer le Pare-Feu et migrer vers Windown 10 !',
                    imageText: '🔒 SECURITY ALERT : PATCH YOUR ROUTERS',
                    likes: 3890,
                    comments: [
                        { author: 'admin_sys', text: 'On a encore des serveurs 2008 en prod au secours...' }
                    ],
                    liked: false
                }
            ],
            vanish: [
                {
                    id: 'van_1',
                    author: 'lucas_streamer',
                    avatar: '🎮',
                    streak: 412,
                    story: 'En direct sur Twitch ! Le bot PileWilla gère les dons en direct sur le VPS, trop cheaté 🔥',
                    time: 'Il y a 14 min'
                },
                {
                    id: 'van_2',
                    author: 'sophie_crea',
                    avatar: '💍',
                    streak: 189,
                    story: 'La nouvelle boutique en ligne tourne à merveille grâce au script de facturation sécurisée !',
                    time: 'Il y a 32 min'
                }
            ],
            loopr: [
                {
                    id: 'loop_1',
                    author: '@typon_hacks',
                    sound: '🎵 CyberBeat 2018 - Remix Bass Boosted',
                    title: '3 astuces secrètes en Typon que les profs ne disent JAMAIS 🤫 #coding #typon #tips',
                    views: '245.8K',
                    likes: 34200,
                    liked: false
                },
                {
                    id: 'loop_2',
                    author: '@future_ai_insider',
                    sound: '🎵 Synthwave Chillwave - 2019 AI Special',
                    title: '🚨 BREAKING : Des labos secrets préparent des réseaux de neurones capables d\'écrire du code tout seuls d\'ici 2021... #AI #windown11 #futur',
                    views: '890.1K',
                    likes: 112000,
                    liked: false
                }
            ],
            nexuswall: [
                {
                    id: 'nex_1',
                    group: '👥 Communauté : Développeurs Typon & SysAdmins France',
                    author: 'Jean-Marc Dupont',
                    avatar: '👨‍💼',
                    time: 'Hier à 18:42',
                    content: 'Bonjour à tous. Quelqu\'un a des retours sur l\'utilisation des classes POO en Typon 2.0 pour les applications mobiles sur le Widown Store ? Est-ce que les performances sont au rendez-vous par rapport à Windown 8 ?',
                    likes: 48,
                    commentsCount: 23
                },
                {
                    id: 'nex_2',
                    group: '👥 Communauté : Entraide Informatique & Dépannage Réseau',
                    author: 'Dr. Vasseur',
                    avatar: '🩺',
                    time: 'Il y a 2 heures',
                    content: 'Un grand merci au technicien qui a remis en état la baie réseau et les caméras de la clinique SantéPlus avec NetSim ! Tout refonctionne à merveille.',
                    likes: 92,
                    commentsCount: 8
                }
            ]
        };
    }

    open() {
        const content = `
            <div class="socialnet-container">
                <!-- Navigation Tabs -->
                <div class="socialnet-sidebar">
                    <div class="socialnet-brand">
                        <span class="brand-icon">🌐</span>
                        <span class="brand-title">SocialNet</span>
                        <span class="brand-version">2016 Pro</span>
                    </div>

                    <div class="socialnet-user-card">
                        <div class="user-avatar">💻</div>
                        <div class="user-info">
                            <strong id="sn-username">@Dev_Hero</strong>
                            <small id="sn-followers">${this.followers} abonnés</small>
                        </div>
                    </div>

                    <div class="socialnet-nav">
                        <button class="sn-nav-btn ${this.currentNetwork === 'lumina' ? 'active' : ''}" data-net="lumina">
                            <span>📸</span> Lumina
                        </button>
                        <button class="sn-nav-btn ${this.currentNetwork === 'vanish' ? 'active' : ''}" data-net="vanish">
                            <span>👻</span> Vanish
                        </button>
                        <button class="sn-nav-btn ${this.currentNetwork === 'loopr' ? 'active' : ''}" data-net="loopr">
                            <span>🎵</span> Loopr
                        </button>
                        <button class="sn-nav-btn ${this.currentNetwork === 'nexuswall' ? 'active' : ''}" data-net="nexuswall">
                            <span>👥</span> NexusWall
                        </button>
                    </div>

                    <div class="socialnet-post-box">
                        <label>📢 Publier une annonce / statut :</label>
                        <textarea id="sn-post-text" placeholder="Partagez votre nouvelle appli mobile, un bot ou une réflexion..."></textarea>
                        <button class="widown-btn btn-primary" id="btn-sn-publish">🚀 Publier (+Abonnés)</button>
                    </div>
                </div>

                <!-- Feed Area -->
                <div class="socialnet-feed-area" id="socialnet-feed-container">
                    <!-- Populated dynamically -->
                </div>
            </div>
        `;

        window.windowManager.createWindow({
            id: 'socialnet',
            title: '🌐 SocialNet Suite (Lumina, Vanish, Loopr, NexusWall) - 2016/2020',
            icon: 'browser',
            width: 860,
            height: 600,
            content: content,
            onOpen: (winEl) => this.initEvents(winEl)
        });
    }

    initEvents(winEl) {
        this.renderFeed(winEl);

        // Network switcher buttons
        winEl.querySelectorAll('.sn-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                winEl.querySelectorAll('.sn-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentNetwork = btn.dataset.net;
                this.renderFeed(winEl);
            });
        });

        // Publish Post button
        const publishBtn = winEl.querySelector('#btn-sn-publish');
        const postInput = winEl.querySelector('#sn-post-text');
        if (publishBtn && postInput) {
            publishBtn.addEventListener('click', () => {
                const text = postInput.value.trim();
                if (!text) {
                    alert('Veuillez saisir un texte avant de publier !');
                    return;
                }

                // Follower & like boost based on mobile app / bot mentions
                let gain = Math.floor(Math.random() * 45) + 20;
                if (text.toLowerCase().includes('mobile') || text.toLowerCase().includes('app')) gain += 150;
                if (text.toLowerCase().includes('ia') || text.toLowerCase().includes('ai')) gain += 280;

                this.followers += gain;
                this.likesTotal += gain * 4;

                const newPost = {
                    id: 'user_' + Date.now(),
                    author: 'Dev_Hero (Vous)',
                    avatar: '💻',
                    content: text,
                    likes: gain * 3,
                    time: 'À l\'instant'
                };

                this.userPosts.unshift(newPost);
                postInput.value = '';

                window.soundFX.playSuccess();
                window.gameEngine.showNotification('🌐 Post Publié sur SocialNet !', `Votre publication est devenue virale ! +${gain} abonnés gagnés.`, 'success');

                const folEl = winEl.querySelector('#sn-followers');
                if (folEl) folEl.textContent = `${this.followers} abonnés`;

                this.renderFeed(winEl);
            });
        }
    }

    renderFeed(winEl) {
        const container = winEl.querySelector('#socialnet-feed-container');
        if (!container) return;

        if (this.currentNetwork === 'lumina') {
            container.innerHTML = `
                <div class="sn-feed-header">
                    <h2>📸 Lumina Visual Feed</h2>
                    <span class="feed-subtitle">Créations, setups épurés et design d'interfaces</span>
                </div>
                ${this.userPosts.length > 0 ? `
                    <div class="sn-user-posts-section">
                        <h4>Vos Publications Récentes :</h4>
                        ${this.userPosts.map(p => `
                            <div class="sn-post-card my-post">
                                <div class="sn-card-head">
                                    <span class="sn-avatar">${p.avatar}</span>
                                    <strong>${p.author}</strong>
                                    <small>${p.time}</small>
                                </div>
                                <p class="sn-post-body">${p.content}</p>
                                <div class="sn-card-actions">
                                    <span>❤️ ${p.likes} J'aime</span>
                                    <span>💬 12 Commentaires</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${this.feeds.lumina.map(item => `
                    <div class="sn-post-card">
                        <div class="sn-card-head">
                            <span class="sn-avatar">${item.avatar}</span>
                            <div>
                                <strong>${item.author}</strong>
                                <small>${item.tagline}</small>
                            </div>
                        </div>
                        <div class="sn-card-media">
                            <div class="fake-photo-placeholder">${item.imageText}</div>
                        </div>
                        <div class="sn-card-actions">
                            <button class="sn-like-btn ${item.liked ? 'liked' : ''}" data-id="${item.id}">
                                ${item.liked ? '❤️' : '🤍'} ${item.likes} J'aime
                            </button>
                        </div>
                        <p class="sn-caption"><strong>${item.author}</strong> ${item.caption}</p>
                        <div class="sn-comments-list">
                            ${item.comments.map(c => `
                                <div class="sn-comment"><strong>${c.author} :</strong> ${c.text}</div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            `;
        } else if (this.currentNetwork === 'vanish') {
            container.innerHTML = `
                <div class="sn-feed-header">
                    <h2>👻 Vanish Stories Éphémères</h2>
                    <span class="feed-subtitle">Publications et coulisses à disparition automatique sous 24h</span>
                </div>
                <div class="snap-stories-grid">
                    ${this.feeds.vanish.map(s => `
                        <div class="snap-story-card">
                            <div class="snap-header">
                                <span class="snap-avatar">${s.avatar}</span>
                                <div>
                                    <strong>${s.author}</strong>
                                    <span class="snap-streak">🔥 ${s.streak} Flammes</span>
                                </div>
                            </div>
                            <div class="snap-body">
                                <p>${s.story}</p>
                            </div>
                            <div class="snap-time">${s.time}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (this.currentNetwork === 'loopr') {
            container.innerHTML = `
                <div class="sn-feed-header">
                    <h2>🎵 Loopr FYP (Flux Algorithmique)</h2>
                    <span class="feed-subtitle">Clips courts, astuces de programmation et micro-démos en boucle</span>
                </div>
                <div class="tiktik-feed">
                    ${this.feeds.loopr.map(t => `
                        <div class="tiktik-video-card">
                            <div class="tiktik-screen">
                                <div class="tiktik-overlay">
                                    <div class="tiktik-author">${t.author}</div>
                                    <div class="tiktik-title">${t.title}</div>
                                    <div class="tiktik-sound">${t.sound}</div>
                                </div>
                                <div class="tiktik-actions-bar">
                                    <button class="tiktik-action-btn ${t.liked ? 'liked' : ''}" data-id="${t.id}">
                                        ❤️<br><span>${t.likes}</span>
                                    </button>
                                    <button class="tiktik-action-btn">💬<br><span>1.4K</span></button>
                                    <button class="tiktik-action-btn">↗️<br><span>Partager</span></button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (this.currentNetwork === 'nexuswall') {
            container.innerHTML = `
                <div class="sn-feed-header">
                    <h2>👥 NexusWall Communautés</h2>
                    <span class="feed-subtitle">Groupes professionnels, retours d'expérience et actualités</span>
                </div>
                ${this.feeds.nexuswall.map(fb => `
                    <div class="fb-post-card">
                        <div class="fb-group-badge">${fb.group}</div>
                        <div class="sn-card-head">
                            <span class="sn-avatar">${fb.avatar}</span>
                            <div>
                                <strong>${fb.author}</strong>
                                <small>${fb.time}</small>
                            </div>
                        </div>
                        <p class="sn-post-body">${fb.content}</p>
                        <div class="sn-card-actions">
                            <button class="sn-like-btn">👍 ${fb.likes} J'aime</button>
                            <button class="sn-like-btn">💬 ${fb.commentsCount} Commentaires</button>
                        </div>
                    </div>
                `).join('')}
            `;
        }

        // Like button clicks
        container.querySelectorAll('.sn-like-btn, .tiktik-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const post = this.feeds.lumina.find(p => p.id === id) || this.feeds.loopr.find(p => p.id === id);
                if (post) {
                    post.liked = !post.liked;
                    post.likes += post.liked ? 1 : -1;
                    window.soundFX.playClick();
                    this.renderFeed(winEl);
                }
            });
        });
    }
}

window.socialNetApp = new SocialNetApp();
