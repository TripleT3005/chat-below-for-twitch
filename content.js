(() => {
  'use strict';

  const KEY = 'chatBelow';
  const RATIO_KEY = 'videoHeightRatio';
  const HEADER_KEY = 'headerMode';
  const SIDEBAR_KEY = 'hideSidebar';
  const DEFAULT_CHAT_HEIGHT = 150;
  const FALLBACK_HEADER_HEIGHT = 40;
  const MIN_VIDEO_HEIGHT = 120;
  const DIVIDER_HEIGHT = 8;
  const ASPECT_RATIO = 16 / 9;
  const CHAT_COLUMN = '.channel-root__right-column';
  const CONTROLS = '.player-controls__right-control-group';
  const SCROLLER = '.root-scrollable__content';
  const root = document.documentElement;
  let active = false;
  let videoRatio = null;

  // ---- Button ----------------------------------------------------------
  const btn = document.createElement('button');
  btn.id = 'cbt-toggle';
  btn.type = 'button';
  btn.title = chrome.i18n.getMessage('buttonTitle');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  });

  function chatIcon() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('fill', 'currentColor');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', 'M2 3h16v10H9l-4 4v-4H2V3z');
    svg.appendChild(path);
    return svg;
  }

  function renderButton() {
    btn.classList.toggle('cbt-on', active);
    if (btn.classList.contains('cbt-in-player')) {
      if (!btn.firstElementChild) btn.replaceChildren(chatIcon());
    } else {
      btn.textContent = chrome.i18n.getMessage(active ? 'buttonOn' : 'buttonOff');
    }
  }

  // Bevorzugt in der Player-Leiste, sonst als schwebender Button
  function placeButton() {
    const group = document.querySelector(CONTROLS);
    if (group) {
      if (btn.parentElement !== group) {
        btn.className = 'cbt-in-player';
        btn.replaceChildren();
        group.prepend(btn);
      }
    } else if (btn.parentElement !== document.body) {
      btn.className = 'cbt-floating';
      btn.replaceChildren();
      document.body.appendChild(btn);
    }
    btn.hidden = !findPlayer();
    renderButton();
  }

  // ---- Divider ---------------------------------------------------------
  const divider = document.createElement('div');
  divider.id = 'cbt-divider';
  divider.title = chrome.i18n.getMessage('dividerTitle');
  let dragging = false;

  function placeDivider() {
    if (!divider.isConnected) document.body.appendChild(divider);
  }

  function ratioFromPointer(clientY) {
    const player = findPlayer();
    if (!player) return videoRatio;
    const height = clientY - player.getBoundingClientRect().top - DIVIDER_HEIGHT / 2;
    return Math.max(MIN_VIDEO_HEIGHT, height) / window.innerHeight;
  }

  divider.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragging = true;
    divider.classList.add('cbt-dragging');
    divider.setPointerCapture(e.pointerId);
  });

  divider.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    videoRatio = ratioFromPointer(e.clientY);
    scheduleUpdate();
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    divider.classList.remove('cbt-dragging');
    chrome.storage.sync.set({ [RATIO_KEY]: videoRatio }).catch(() => {});
  }

  divider.addEventListener('pointerup', endDrag);
  divider.addEventListener('pointercancel', endDrag);

  divider.addEventListener('dblclick', () => {
    videoRatio = null;
    scheduleUpdate();
    chrome.storage.sync.remove(RATIO_KEY).catch(() => {});
  });

  // ---- Layout ----------------------------------------------------------
  function minChatHeight() {
    const header = document.querySelector(CHAT_COLUMN + ' .stream-chat-header');
    return header ? Math.ceil(header.getBoundingClientRect().height) : FALLBACK_HEADER_HEIGHT;
  }

  function findPlayer() {
    return document.querySelector('.persistent-player') || document.querySelector('video');
  }

  // Elemente zwischen Chat und Spalte markieren, damit sie die volle Breite nutzen
  function markChain(col) {
    let el = col.querySelector('.stream-chat, .video-chat');
    while (el && el !== col) {
      if (!el.hasAttribute('data-cbt-fill')) el.setAttribute('data-cbt-fill', '');
      el = el.parentElement;
    }
  }

  function markStreamPreview(col) {
    const video = col.querySelector('video');
    if (!video) return;
    let el = video;
    while (el.parentElement && el.parentElement !== col && !el.parentElement.querySelector('.chat-scrollable-area__message-container, .chat-input')) {
      el = el.parentElement;
    }
    if (!el.hasAttribute('data-cbt-preview')) el.setAttribute('data-cbt-preview', '');
  }

  // Fallback: Einklappen-Knopf über das Label finden (falls sich data-a-target ändert)
  function hideCollapseButton() {
    const area = document.querySelector('.right-column') || document;
    area.querySelectorAll('button[aria-label]').forEach((b) => {
      if (/^(einklappen|collapse)/i.test(b.getAttribute('aria-label') || '')) {
        b.setAttribute('data-cbt-hide', '');
      }
    });
  }

  // Video beobachten: ändert sich seine Größe (Spalte weg -> volle Breite), neu berechnen
  const resizeObs = new ResizeObserver(() => scheduleUpdate());
  let observedPlayer = null;
  function observePlayer(p) {
    if (observedPlayer === p) return;
    resizeObs.disconnect();
    if (p) resizeObs.observe(p);
    observedPlayer = p;
  }

  function update() {
    placeButton();
    const player = findPlayer();
    observePlayer(player);
    if (!active || !player) return;

    // Seite oben festhalten, damit die Video-Unterkante stabil bleibt
    const scroller = document.querySelector(SCROLLER);
    if (scroller && scroller.scrollTop !== 0) scroller.scrollTop = 0;

    // Verfügbare Breite = Breite des Seitenbereichs (ohne Seitenleiste)
    const avail = scroller ? scroller.clientWidth : 0;
    const playerTop = player.getBoundingClientRect().top;
    const chatHeight = videoRatio ? minChatHeight() : DEFAULT_CHAT_HEIGHT;
    let maxHeight = window.innerHeight - playerTop - DIVIDER_HEIGHT - chatHeight;
    if (videoRatio) maxHeight = Math.min(maxHeight, videoRatio * window.innerHeight);
    maxHeight = Math.max(MIN_VIDEO_HEIGHT, maxHeight);
    if (avail > 0) {
      const width = Math.round(Math.min(avail, maxHeight * ASPECT_RATIO));
      root.style.setProperty('--cbt-w', width + 'px');
      root.style.setProperty('--cbt-left', Math.round((avail - width) / 2) + 'px');
    }

    const bottom = Math.round(player.getBoundingClientRect().bottom);
    const top = Math.max(0, Math.min(bottom, window.innerHeight - chatHeight - DIVIDER_HEIGHT));
    root.style.setProperty('--cbt-top', top + 'px');
    placeDivider();

    const col = document.querySelector(CHAT_COLUMN);
    if (col) {
      markChain(col);
      markStreamPreview(col);
    }
    hideCollapseButton();
    markPageFrame();
  }

  function markPageFrame() {
    const nav = document.querySelector('.top-nav');
    if (nav && nav.offsetHeight > 0) root.style.setProperty('--cbt-nav-h', nav.offsetHeight + 'px');

    const main = document.querySelector('.twilight-main');
    const sidebar = document.querySelector('.side-nav, #side-nav, [data-a-target^="side-nav-bar"]');
    if (!main || !sidebar || main.contains(sidebar)) return;
    let el = sidebar;
    while (el.parentElement && !el.parentElement.contains(main)) el = el.parentElement;
    if (!el.hasAttribute('data-cbt-sidebar')) el.setAttribute('data-cbt-sidebar', '');
  }

  // Twitch vermisst den Player nur bei einem Fenster-resize neu.
  // Nach dem Umschalten (Platz der Chat-Spalte frei/belegt) deshalb selbst anstoßen.
  function nudgeLayout() {
    [0, 150, 500].forEach((ms) =>
      setTimeout(() => window.dispatchEvent(new Event('resize')), ms)
    );
  }

  function headerMode() {
    if (document.body.classList.contains('cbt-header-hidden')) return 'hidden';
    if (document.body.classList.contains('cbt-header-transparent')) return 'transparent';
    return 'normal';
  }

  function applyDisplayOptions(settings) {
    const mode = settings[HEADER_KEY];
    document.body.classList.toggle('cbt-header-hidden', mode === 'hidden');
    document.body.classList.toggle('cbt-header-transparent', mode === 'transparent');
    document.body.classList.toggle('cbt-sidebar-hidden', !!settings[SIDEBAR_KEY]);
  }

  function apply() {
    document.body.classList.toggle('cbt-active', active);
    update();
    nudgeLayout();
    chrome.runtime.sendMessage({ type: 'state', active }).catch(() => {});
  }

  function toggle() {
    active = !active;
    apply();
    chrome.storage.sync.set({ [KEY]: active }).catch(() => {});
  }

  // Updates gebündelt pro Frame
  let queued = false;
  function scheduleUpdate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  }

  window.addEventListener('resize', scheduleUpdate);

  // Twitch ist eine SPA; Änderungen im Chat selbst ignorieren (sehr häufig)
  new MutationObserver((mutations) => {
    const relevant = mutations.some((m) => {
      const el = m.target.nodeType === 1 ? m.target : m.target.parentElement;
      return !(el && el.closest && el.closest('.chat-room, .stream-chat, .video-chat'));
    });
    if (relevant) scheduleUpdate();
  }).observe(document.body, { childList: true, subtree: true });

  // Sicherheitsnetz: Twitch verschiebt den Player teils nur per transform
  setInterval(() => { if (active) update(); }, 500);

  // ---- Sync mit Storage (Toolbar-Icon, Tastenkürzel, andere Tabs) ------
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    if (changes[RATIO_KEY] && !dragging) {
      videoRatio = changes[RATIO_KEY].newValue ?? null;
      scheduleUpdate();
    }
    if (changes[HEADER_KEY] || changes[SIDEBAR_KEY]) {
      applyDisplayOptions({
        [HEADER_KEY]: changes[HEADER_KEY] ? changes[HEADER_KEY].newValue : headerMode(),
        [SIDEBAR_KEY]: changes[SIDEBAR_KEY] ? changes[SIDEBAR_KEY].newValue : document.body.classList.contains('cbt-sidebar-hidden'),
      });
      if (active) nudgeLayout();
    }
    if (changes[KEY] && !!changes[KEY].newValue !== active) {
      active = !!changes[KEY].newValue;
      apply();
    }
  });

  chrome.storage.sync.get({ [KEY]: false, [RATIO_KEY]: null, [HEADER_KEY]: 'normal', [SIDEBAR_KEY]: false }).then((r) => {
    active = !!r[KEY];
    videoRatio = r[RATIO_KEY];
    applyDisplayOptions(r);
    apply();
  });

  placeButton();
})();
