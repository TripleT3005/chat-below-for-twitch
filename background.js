const KEY = 'chatBelow';

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

chrome.action.onClicked.addListener(toggle);

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-chat-below') toggle();
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== 'state' || sender.tab?.id === undefined) return;
  chrome.action.setTitle({ tabId: sender.tab.id, title: stateTitle(!!message.active) }).catch(() => {});
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes[KEY]) updateIcon(!!changes[KEY].newValue);
});

chrome.runtime.onInstalled.addListener(() => updateIcon());
chrome.runtime.onStartup.addListener(() => updateIcon());
updateIcon();
