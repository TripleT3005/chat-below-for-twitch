const KEY = 'chatBelow';
const HEADER_KEY = 'headerMode';
const SIDEBAR_KEY = 'hideSidebar';
const HEADER_MODES = ['normal', 'transparent', 'hidden'];
const DEFAULTS = { [KEY]: false, [HEADER_KEY]: 'normal', [SIDEBAR_KEY]: false };

function iconPaths(on) {
  const s = on ? 'on' : 'off';
  return {
    16: `icons/icon-${s}-16.png`,
    32: `icons/icon-${s}-32.png`,
    48: `icons/icon-${s}-48.png`,
  };
}

function stateTitle(on) {
  return chrome.i18n.getMessage(on ? 'titleOn' : 'titleOff');
}

async function getState() {
  const r = await chrome.storage.sync.get({ [KEY]: false });
  return !!r[KEY];
}

async function updateIcon(on) {
  try {
    if (on === undefined) on = await getState();
    await chrome.action.setIcon({ path: iconPaths(on) });
  } catch (e) {
    console.warn('Could not update icon:', e);
  }
}

// Der Zustand liegt im Storage; alle Twitch-Tabs reagieren über storage.onChanged
async function toggle() {
  const on = !(await getState());
  await chrome.storage.sync.set({ [KEY]: on });
  updateIcon(on);
}

// ---- Context menu ----------------------------------------------------
async function createMenu() {
  const settings = await chrome.storage.sync.get(DEFAULTS);
  await new Promise((resolve) => chrome.contextMenus.removeAll(resolve));
  chrome.contextMenus.create({ id: 'header', title: chrome.i18n.getMessage('menuHeader'), contexts: ['action'] });
  HEADER_MODES.forEach((mode) => {
    chrome.contextMenus.create({
      id: `header-${mode}`,
      parentId: 'header',
      type: 'radio',
      title: chrome.i18n.getMessage(`menuHeader_${mode}`),
      checked: settings[HEADER_KEY] === mode,
      contexts: ['action'],
    });
  });
  chrome.contextMenus.create({
    id: SIDEBAR_KEY,
    type: 'checkbox',
    title: chrome.i18n.getMessage('menuHideSidebar'),
    checked: !!settings[SIDEBAR_KEY],
    contexts: ['action'],
  });
}

function updateMenuItem(id, checked) {
  chrome.contextMenus.update(id, { checked }, () => void chrome.runtime.lastError);
}

chrome.contextMenus.onClicked.addListener((info) => {
  const id = String(info.menuItemId);
  if (id.startsWith('header-')) {
    chrome.storage.sync.set({ [HEADER_KEY]: id.slice('header-'.length) });
  } else if (id === SIDEBAR_KEY) {
    chrome.storage.sync.set({ [SIDEBAR_KEY]: !!info.checked });
  }
});

// ---- Events ----------------------------------------------------------
chrome.action.onClicked.addListener(toggle);

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-chat-below') toggle();
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== 'state' || sender.tab?.id === undefined) return;
  chrome.action.setTitle({ tabId: sender.tab.id, title: stateTitle(!!message.active) }).catch(() => {});
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync') return;
  if (changes[KEY]) updateIcon(!!changes[KEY].newValue);
  if (changes[HEADER_KEY]) {
    updateMenuItem(`header-${changes[HEADER_KEY].newValue ?? 'normal'}`, true);
  }
  if (changes[SIDEBAR_KEY]) {
    updateMenuItem(SIDEBAR_KEY, !!changes[SIDEBAR_KEY].newValue);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  updateIcon();
  createMenu();
});
chrome.runtime.onStartup.addListener(() => updateIcon());
updateIcon();
