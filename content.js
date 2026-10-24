(() => {
  'use strict';

  const KEY = 'chatBelow';
  const MIN_CHAT_HEIGHT = 150; // px, damit der Chat nie komplett verschwindet
  const CHAT_COLUMN = '.channel-root__right-column';
  const CONTROLS = '.player-controls__right-control-group';
  const SCROLLER = '.root-scrollable__content';
  const root = document.documentElement;
  let active = false;

  // ---- Button ----------------------------------------------------------
  const btn = document.createElement('button');
  btn.id = 'cbt-toggle';
  btn.type = 'button';
  btn.title = 'Chat unter dem Video ein/aus';
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
      btn.textContent = active ? 'Chat: unten ✓' : 'Chat: rechts';
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

  // ---- Layout ----------------------------------------------------------
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
    if (avail > 0) root.style.setProperty('--cbt-w', avail + 'px');

    const bottom = Math.round(player.getBoundingClientRect().bottom);
    const top = Math.max(0, Math.min(bottom, window.innerHeight - MIN_CHAT_HEIGHT));
    root.style.setProperty('--cbt-top', top + 'px');

    const col = document.querySelector(CHAT_COLUMN);
    if (col) markChain(col);
    hideCollapseButton();
  }

  // Twitch vermisst den Player nur bei einem Fenster-resize neu.
  // Nach dem Umschalten (Platz der Chat-Spalte frei/belegt) deshalb selbst anstoßen.
  function nudgeLayout() {
    [0, 150, 500].forEach((ms) =>
      setTimeout(() => window.dispatchEvent(new Event('resize')), ms)
    );
  }

  function apply() {
    document.body.classList.toggle('cbt-active', active);
    update();
    nudgeLayout();
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
    if (area === 'sync' && changes[KEY] && !!changes[KEY].newValue !== active) {
      active = !!changes[KEY].newValue;
      apply();
    }
  });

  chrome.storage.sync.get({ [KEY]: false }).then((r) => {
    active = !!r[KEY];
    apply();
  });

  placeButton();
})();
