(() => {
  // Data
  const channel = 'TripleT3005';
  const channelAvatar = 'https://static-cdn.jtvnw.net/jtv_user_pictures/b92976e3-cab6-49dc-9366-2e70e38074ff-profile_image-300x300.png';
  const messages = [
    ['TripleT3005', '#00ff00', 'Welcome to the stream, everyone!'],
    ['PixelPanda', '#1e90ff', 'Hi from Berlin 👋'],
    ['NightOwl_92', '#ff7f50', 'What are we playing today?'],
    ['TripleT3005', '#00ff00', 'Building a new base first, then exploring'],
    ['CozyGamer', '#2e8b57', 'Sounds great'],
    ['Lumi_Light', '#daa520', 'That view is amazing'],
    ['PixelPanda', '#1e90ff', 'GG on the last round'],
    ['RetroRaccoon', '#ff69b4', 'Is the build going to be on the left or the right side?'],
    ['NightOwl_92', '#ff7f50', 'Left side for sure'],
    ['CozyGamer', '#2e8b57', 'Can we see the map later?'],
    ['TripleT3005', '#00ff00', 'Sure, after this part'],
    ['Lumi_Light', '#daa520', 'Love the music today'],
  ];
  const sidebarChannels = [
    ['MapleMoose', 'Just Chatting'],
    ['ByteKnight', 'Minecraft'],
    ['SunnySketch', 'Art'],
    ['RocketRiver', 'Rocket League'],
    ['QuietQuill', 'Writing & Reading'],
    ['NovaNoodle', 'Cooking'],
    ['TinyTitan', 'Strategy Games'],
    ['EchoFox', 'Music'],
    ['GlitchGarden', 'Indie Games'],
    ['PolarPixel', 'Retro'],
    ['AmberArcade', 'Racing'],
    ['VelvetVolt', 'Software & Development'],
  ];
  const avatarColors = ['#e76f51', '#2a9d8f', '#e9c46a', '#8ab17d', '#6d597a', '#457b9d', '#f4a261', '#b56576', '#3d405b', '#81b29a', '#e07a5f', '#5e60ce'];

  const scene = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b1f4b"/><stop offset=".55" stop-color="#6b4a9e"/><stop offset="1" stop-color="#f19a6b"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#sky)"/>
    <circle cx="1120" cy="560" r="120" fill="#ffd29b" opacity=".9"/>
    <path d="M0 620 L220 470 L380 560 L560 400 L760 560 L940 440 L1140 600 L1320 480 L1600 620 L1600 900 L0 900Z" fill="#3b2f63"/>
    <path d="M0 720 L180 620 L360 690 L540 590 L760 700 L980 610 L1200 710 L1420 630 L1600 700 L1600 900 L0 900Z" fill="#2a2148"/>
    <path d="M0 800 L260 740 L520 790 L800 730 L1080 800 L1340 750 L1600 790 L1600 900 L0 900Z" fill="#191431"/>
  </svg>`;

  const avatar = (name, color) => 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="${color}"/>` +
    `<text x="32" y="42" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">${name[0]}</text></svg>`
  );

  // Styles
  document.getElementById('cbt-staging')?.remove();
  const style = document.createElement('style');
  style.id = 'cbt-staging';
  style.textContent = `
    .persistent-player video { visibility: hidden !important; }
    .video-player__overlay, .video-player .tw-loading-spinner, .extension-view__iframe { opacity: 0 !important; }
    #cbt-demo-video {
      position: absolute; inset: 0; z-index: 0; pointer-events: none;
      background: center / cover no-repeat url("data:image/svg+xml,${encodeURIComponent(scene)}");
    }
    .chat-room__content > div:first-child,
    [class*="community-highlight"],
    [class*="pinned-chat"],
    .chat-scrollable-area__message-container > :not(#cbt-demo-chat) { display: none !important; }
    #cbt-demo-chat { padding: 10px 0; }
    #cbt-demo-chat div { padding: 5px 20px; font: 13px/20px Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif; color: #efeff1; }
    #cbt-demo-chat b { font-weight: 700; }
    .side-nav .primary-with-small-avatar__mini-avatar,
    [data-cbt-staging-hide],
    body.cbt-active .sticky-community-highlight.sticky-community-highlight { display: none !important; }
  `;
  document.head.appendChild(style);

  // Video
  const container = document.querySelector('.video-player__container') || document.querySelector('.persistent-player');
  if (container && !document.getElementById('cbt-demo-video')) {
    const video = document.createElement('div');
    video.id = 'cbt-demo-video';
    container.prepend(video);
  }

  // Chat
  const list = document.querySelector('.chat-scrollable-area__message-container');
  if (list) {
    document.getElementById('cbt-demo-chat')?.remove();
    const chat = document.createElement('div');
    chat.id = 'cbt-demo-chat';
    messages.forEach(([name, color, text]) => {
      const line = document.createElement('div');
      const user = document.createElement('b');
      user.style.color = color;
      user.textContent = name;
      line.append(user, ': ' + text);
      chat.appendChild(line);
    });
    list.appendChild(chat);
  }

  // Sidebar
  const cards = [...document.querySelectorAll('.side-nav .side-nav-card')].filter((card) => !card.parentElement?.closest('.side-nav-card'));
  cards.forEach((card, index) => {
    const [name, category] = sidebarChannels[index % sidebarChannels.length];
    const color = avatarColors[index % avatarColors.length];
    card.querySelectorAll('img').forEach((img) => {
      img.removeAttribute('srcset');
      img.src = avatar(name, color);
    });
    const texts = [...card.querySelectorAll('p, span, h3')].filter((el) =>
      el.children.length === 0 && el.textContent.trim() && !el.closest('[class*="tooltip"]'));
    let named = false;
    texts.forEach((el) => {
      const text = el.textContent.trim();
      if (/hype|stufe|level/i.test(text)) {
        let row = el;
        while (row.parentElement && row.parentElement.textContent.trim() === text) row = row.parentElement;
        row.setAttribute('data-cbt-staging-hide', '');
      } else if (/^[\d.,]+\s*(k|tsd\.?)?$/i.test(text)) {
        el.textContent = String(120 + ((index * 379) % 2400)).replace(/\B(?=(\d{3})+$)/g, '.');
      } else if (/^\+\d+$/.test(text)) {
        el.setAttribute('data-cbt-staging-hide', '');
      } else if (!named) {
        el.textContent = name;
        named = true;
      } else {
        el.textContent = category;
      }
    });
  });
  document.querySelectorAll('.side-nav img').forEach((img, index) => {
    if (img.src.startsWith('data:')) return;
    img.removeAttribute('srcset');
    img.src = avatar(sidebarChannels[index % sidebarChannels.length][0], avatarColors[index % avatarColors.length]);
  });

  // Channel info below the video
  const info = document.querySelector('.channel-info-content');
  if (info) {
    [...info.children].slice(1).forEach((el) => el.setAttribute('data-cbt-staging-hide', ''));
    const setText = (selector, text) => info.querySelectorAll(selector).forEach((el) => { el.textContent = text; });
    info.querySelectorAll('img.tw-image-avatar').forEach((img) => {
      img.removeAttribute('srcset');
      img.src = channelAvatar;
    });
    setText('h1', channel);
    setText('[data-a-target="stream-title"]', 'Building a cozy base today | !commands');
    setText('[data-a-target="stream-game-link"]', 'Just Chatting');
    setText('[data-a-target="animated-channel-viewers-count"]', '128');
    info.querySelectorAll('svg[aria-label]').forEach((svg) => {
      if (/verif/i.test(svg.getAttribute('aria-label'))) (svg.closest('.tw-svg') || svg).setAttribute('data-cbt-staging-hide', '');
    });
    info.querySelectorAll('.tw-tag').forEach((tag, index) => {
      if (index === 0) tag.textContent = 'English';
      else tag.setAttribute('data-cbt-staging-hide', '');
    });
  }

  // Page chrome
  const hideByText = (pattern) => {
    document.querySelectorAll('body *').forEach((el) => {
      if (el.children.length > 8 || !pattern.test(el.textContent || '')) return;
      const rect = el.getBoundingClientRect();
      if (rect.height > 20 && rect.height < 120) el.setAttribute('data-cbt-staging-hide', '');
    });
  };
  hideByText(/Join the Twitch community|Sign up to experience/);
  hideByText(/Animated Emotes can be disabled|Animierte Emotes/);
  hideByText(/^\s*(Slow Mode|Slow-Chat-Modus)\s*$/);
  document.querySelectorAll('.top-nav [class*="Badge"], .top-nav [class*="badge"]').forEach((el) => el.setAttribute('data-cbt-staging-hide', ''));
  document.querySelectorAll('[data-a-target="chat-scroller"] *').forEach((el) => {
    if (el.scrollHeight > el.clientHeight) el.scrollTop = el.scrollHeight;
  });

  document.title = channel + ' - Twitch';
})();
