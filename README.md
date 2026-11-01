# <img src="icons/icon-on-128.png" alt="" width="40" height="40" align="center"> Chat Below for Twitch

<!-- web:skip -->
[English](#english) · [Deutsch](#deutsch)
<!-- /web:skip -->

## English

Browser extension for Chrome and Edge that moves the Twitch chat below the video with one click.
Useful when the monitor is split into two or three windows side by side.

> Feedback and bug reports are welcome as [issues](../../issues). Not affiliated with or endorsed by Twitch. Twitch is a trademark of Twitch Interactive, Inc.

<p>
  <img src="screenshots/01-chat-below.png" alt="Twitch chat below the video" width="49%">
  <img src="screenshots/02-without-extension.png" alt="Without the extension: chat next to the video" width="49%">
  <img src="screenshots/03-resize-divider.png" alt="Drag the divider to resize, header bar transparent" width="49%">
  <img src="screenshots/04-narrow-window.png" alt="Narrow window with header bar and sidebar hidden" width="49%">
  <img src="screenshots/05-compact-chat.png" alt="Chat shrunk down to its header row" width="49%">
</p>

### Features
- Toggle via the chat button in the video's control bar (next to settings and fullscreen) or via the extension icon in the browser toolbar
- Optional keyboard shortcut, configurable at `chrome://extensions/shortcuts` (Edge: `edge://extensions/shortcuts`)
- The video uses the full window width, the chat fills the space below it (at least 150 px)
- A running hype train is shown compactly in the chat header row
- Right-click the extension icon to hide the header bar or make it transparent, and to hide the left sidebar (applies while the chat is below the video)
- Drag the line between video and chat to change the split, down to just the chat header; double-click resets it
- Only active on stream pages; fullscreen keeps working, theatre mode is left while the chat is below the video
- The setting is remembered for all Twitch tabs; with browser sync enabled it also applies on your other computers
- Available in English and German, depending on the browser language

### Installation
- **Chrome:** [Chrome Web Store](https://chromewebstore.google.com/detail/chat-below-for-twitch/jfdcnglmpjdiofdlapohkchhhmkjffog)
- **Edge:** Edge Add-ons (coming soon)

Manual install from ZIP:
1. Download the latest ZIP from [Releases](../../releases) and extract it
2. Open `chrome://extensions` (Edge: `edge://extensions`)
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extracted folder

Changes are listed in the [changelog](CHANGELOG.md).

### Usage
1. Open a stream on `www.twitch.tv`.
2. Click the chat button in the video's control bar (next to settings and fullscreen) or the extension icon in the browser toolbar. The chat moves below the video; another click moves it back to the right. If the control bar is not available, a floating button "Chat: right" / "Chat: below ✓" is shown instead. The extension icon shows the state: purple with the chat at the bottom while it is on, grey with the chat on the right while it is off.
3. Drag the line between video and chat to change the split, down to just the chat header row. Double-click the line to reset it.
4. Right-click the extension icon for more options: **Header bar** → **Show**, **Transparent** or **Hide**, and **Hide left sidebar**. They apply while the chat is below the video.

The browser suggests the keyboard shortcut Alt+Shift+C for toggling; it can be changed or removed at `chrome://extensions/shortcuts` (Edge: `edge://extensions/shortcuts`).

### How it works
A content script with a stylesheet runs on `www.twitch.tv` and adds the chat button to the player. When the layout is turned on and a stream page is open (not in fullscreen), it marks the page with a CSS class: the video is sized to the full width of the page area at 16:9, as far as the space above the chat allows, and the chat column is placed below it with the divider in between. Twitch is a single-page app, so the script watches page changes and the window size and recalculates the layout. While the chat is below the video, theatre mode is left automatically and its button and Alt+T are disabled, because both would break the layout.

A small background service worker handles the extension icon, the keyboard shortcut and the right-click menu. The state is kept in the browser's sync storage; every open Twitch tab reacts to changes there, so all tabs follow the same setting.

### Privacy
The extension only changes how Twitch stream pages are laid out. It does not collect, read or send any personal data, has no access to your Twitch account and makes no external requests.

Your settings (chat below on/off, divider position, header bar and sidebar options) are stored with the browser's own storage. With browser sync enabled, your browser syncs them across your devices; the extension itself does not transmit them anywhere.

Permissions: `storage` to remember the settings, `contextMenus` for the right-click menu of the icon and access to `www.twitch.tv` to change the page layout.

<!-- web:skip -->

### Building
The extension needs no build step; the release ZIP contains `manifest.json`, `background.js`, `content.js`, `content.css`, `icons`, `_locales` and `LICENSE`. For the checks install the development tools with `npm ci` (Node.js 24); `npm run format:check`, `npm run lint` and `npm test` check formatting, lint and tests, `npm run format` fixes the formatting. None of these tools is part of the extension.

A release is created automatically when a new version in `manifest.json` reaches `main`. Each version needs a section with English and German notes in [CHANGELOG.md](CHANGELOG.md), which becomes the release notes; tests and pipeline fail without it. Changes without a new version are collected under `[Unreleased]`; a release fails while that section still has entries.

<!-- /web:skip -->

### License
[MIT](LICENSE)

## Deutsch

Browser-Erweiterung für Chrome und Edge, die den Twitch-Chat per Klick unter das Video verschiebt.
Praktisch, wenn der Monitor in zwei oder drei Fenster nebeneinander aufgeteilt ist.

> Rückmeldungen und Fehlerberichte gern als [Issue](../../issues). Keine Verbindung zu Twitch und nicht von Twitch unterstützt. Twitch ist eine Marke von Twitch Interactive, Inc.

<p>
  <img src="screenshots/01-chat-below.png" alt="Twitch chat below the video" width="49%">
  <img src="screenshots/02-without-extension.png" alt="Without the extension: chat next to the video" width="49%">
  <img src="screenshots/03-resize-divider.png" alt="Drag the divider to resize, header bar transparent" width="49%">
  <img src="screenshots/04-narrow-window.png" alt="Narrow window with header bar and sidebar hidden" width="49%">
  <img src="screenshots/05-compact-chat.png" alt="Chat shrunk down to its header row" width="49%">
</p>

### Funktionen
- Umschalten über den Chat-Button in der Steuerleiste des Videos (neben Einstellungen und Vollbild) oder über das Erweiterungssymbol oben in der Browserleiste
- Optionales Tastenkürzel, einstellbar unter `chrome://extensions/shortcuts` (Edge: `edge://extensions/shortcuts`)
- Das Video nutzt die volle Fensterbreite, der Chat füllt den Platz darunter (mindestens 150 px)
- Ein laufender Hypetrain wird kompakt in der Kopfzeile des Chats angezeigt
- Per Rechtsklick auf das Erweiterungssymbol lässt sich die Kopfleiste ausblenden oder transparent schalten und die linke Seitenleiste ausblenden (gilt, solange der Chat unter dem Video ist)
- Die Linie zwischen Video und Chat lässt sich ziehen, um die Aufteilung zu ändern, bis nur noch die Chat-Kopfzeile sichtbar ist; Doppelklick setzt sie zurück
- Nur auf Stream-Seiten aktiv; Vollbild funktioniert weiterhin, der Kinomodus wird verlassen, solange der Chat unter dem Video ist
- Die Einstellung gilt für alle Twitch-Tabs; mit aktivierter Browser-Synchronisierung auch auf deinen anderen Computern
- Auf Deutsch und Englisch verfügbar, abhängig von der Sprache des Browsers

### Installation
- **Chrome:** [Chrome Web Store](https://chromewebstore.google.com/detail/chat-below-for-twitch/jfdcnglmpjdiofdlapohkchhhmkjffog)
- **Edge:** Edge Add-ons (bald verfügbar)

Manuelle Installation aus der ZIP-Datei:
1. Die neueste ZIP-Datei unter [Releases](../../releases) herunterladen und entpacken
2. `chrome://extensions` öffnen (Edge: `edge://extensions`)
3. „Entwicklermodus“ aktivieren
4. „Entpackte Erweiterung laden“ und den entpackten Ordner auswählen

Änderungen stehen im [Changelog](CHANGELOG.md).

### Bedienung
1. Einen Stream auf `www.twitch.tv` öffnen.
2. Auf den Chat-Button in der Steuerleiste des Videos (neben Einstellungen und Vollbild) oder auf das Erweiterungssymbol in der Browserleiste klicken. Der Chat wandert unter das Video, ein weiterer Klick holt ihn wieder nach rechts. Ist die Steuerleiste nicht verfügbar, erscheint stattdessen ein schwebender Button „Chat: rechts“ / „Chat: unten ✓“. Das Erweiterungssymbol zeigt den Zustand: lila mit dem Chat unten, solange es eingeschaltet ist, grau mit dem Chat rechts, solange es aus ist.
3. Die Linie zwischen Video und Chat ziehen, um die Aufteilung zu ändern, bis nur noch die Kopfzeile des Chats sichtbar ist. Ein Doppelklick auf die Linie setzt sie zurück.
4. Ein Rechtsklick auf das Erweiterungssymbol bietet weitere Optionen: **Kopfleiste** → **Anzeigen**, **Transparent** oder **Ausblenden** sowie **Linke Seitenleiste ausblenden**. Sie gelten, solange der Chat unter dem Video ist.

Der Browser schlägt zum Umschalten das Tastenkürzel Alt+Umschalt+C vor; ändern oder entfernen lässt es sich unter `chrome://extensions/shortcuts` (Edge: `edge://extensions/shortcuts`).

### Funktionsweise
Ein Content-Script mit Stylesheet läuft auf `www.twitch.tv` und fügt dem Player den Chat-Button hinzu. Ist das Layout eingeschaltet und eine Stream-Seite geöffnet (nicht im Vollbild), markiert es die Seite mit einer CSS-Klasse: Das Video wird im Format 16:9 auf die volle Breite des Seitenbereichs gebracht, soweit der Platz über dem Chat reicht, und die Chat-Spalte darunter angeordnet, mit der Trennlinie dazwischen. Twitch ist eine Single-Page-App, deshalb beobachtet das Script Änderungen an der Seite und die Fenstergröße und berechnet das Layout neu. Solange der Chat unter dem Video ist, wird der Kinomodus automatisch verlassen, sein Knopf und Alt+T sind dann abgeschaltet, weil beide das Layout durcheinanderbringen würden.

Ein kleiner Service Worker im Hintergrund kümmert sich um das Erweiterungssymbol, das Tastenkürzel und das Rechtsklick-Menü. Der Zustand liegt im synchronisierten Speicher des Browsers; jeder geöffnete Twitch-Tab reagiert auf Änderungen dort, sodass alle Tabs derselben Einstellung folgen.

### Datenschutz
Die Erweiterung ändert nur die Anordnung von Twitch-Stream-Seiten. Sie erhebt, liest und sendet keine personenbezogenen Daten, hat keinen Zugriff auf dein Twitch-Konto und stellt keine externen Anfragen.

Deine Einstellungen (Chat unten an/aus, Position der Trennlinie, Optionen für Kopf- und Seitenleiste) werden im Speicher des Browsers abgelegt. Ist die Browser-Synchronisierung aktiv, gleicht dein Browser sie zwischen deinen Geräten ab; die Erweiterung selbst überträgt sie nirgendwohin.

Berechtigungen: `storage`, um die Einstellungen zu speichern, `contextMenus` für das Rechtsklick-Menü des Symbols und Zugriff auf `www.twitch.tv`, um die Anordnung der Seite zu ändern.

<!-- web:skip -->

### Bauen
Die Erweiterung braucht keinen Build-Schritt; die Release-ZIP enthält `manifest.json`, `background.js`, `content.js`, `content.css`, `icons`, `_locales` und `LICENSE`. Für die Prüfungen die Entwicklungswerkzeuge mit `npm ci` installieren (Node.js 24); `npm run format:check`, `npm run lint` und `npm test` prüfen Formatierung, Lint und Tests, `npm run format` korrigiert die Formatierung. Keines dieser Werkzeuge ist Teil der Erweiterung.

Ein Release entsteht automatisch, sobald eine neue Version in `manifest.json` auf `main` landet. Jede Version braucht einen Abschnitt mit englischen und deutschen Notizen in [CHANGELOG.md](CHANGELOG.md), der zu den Release-Notizen wird; ohne ihn schlagen Tests und Pipeline fehl. Änderungen ohne neue Version stehen unter `[Unreleased]`; ein Release schlägt fehl, solange dieser Abschnitt noch Einträge hat.

<!-- /web:skip -->

### Lizenz
[MIT](LICENSE)
