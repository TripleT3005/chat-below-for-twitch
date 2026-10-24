# Chrome Web Store – Eintrag

## Paket
- ZIP aus dem neuesten GitHub-Release hochladen, nicht neu packen

## Store-Eintrag (Store listing)

**Kategorie:** Functionality & UI
**Sprache (Standard):** English, zusätzlich Deutsch anlegen

### Beschreibung – English
```
Watching Twitch in a narrow window? Chat Below for Twitch moves the chat from the side to below the video with one click. Ideal when your monitor is split into two or three windows side by side.

Features
• Toggle with the chat button in the video's control bar or the extension icon in the browser toolbar
• The video uses the full window width, the chat fills the space below it
• Drag the line between video and chat to change the split – down to just the chat header row; double-click resets it
• A running hype train is shown compactly in the chat header row
• Right-click the extension icon to hide the header bar or make it transparent, and to hide the left sidebar
• Only active on stream pages – the rest of Twitch stays unchanged
• Theatre mode and fullscreen keep working as usual
• The setting is remembered for all Twitch tabs; with browser sync enabled also on your other computers
• Available in English and German

Privacy
The extension only changes how the Twitch page is laid out. It does not read or send any data, has no access to your Twitch account and makes no external requests.

Website: https://ckass.de/chat-below-for-twitch/
Open source: https://github.com/TripleT3005/chat-below-for-twitch

Not affiliated with or endorsed by Twitch. Twitch is a trademark of Twitch Interactive, Inc.
```

### Beschreibung – Deutsch
```
Twitch in einem schmalen Fenster? Chat Below for Twitch verschiebt den Chat per Klick von der Seite unter das Video. Ideal, wenn der Monitor in zwei oder drei Fenster nebeneinander aufgeteilt ist.

Funktionen
• Umschalten über den Chat-Button in der Steuerleiste des Videos oder das Erweiterungssymbol in der Browserleiste
• Das Video nutzt die volle Fensterbreite, der Chat füllt den Platz darunter
• Die Linie zwischen Video und Chat lässt sich ziehen – bis nur noch die Chat-Kopfzeile sichtbar ist; Doppelklick setzt sie zurück
• Ein laufender Hypetrain wird kompakt in der Kopfzeile des Chats angezeigt
• Per Rechtsklick auf das Erweiterungssymbol lässt sich die Kopfleiste ausblenden oder transparent schalten und die linke Seitenleiste ausblenden
• Nur auf Stream-Seiten aktiv – der Rest von Twitch bleibt unverändert
• Kino-Modus und Vollbild funktionieren weiterhin wie gewohnt
• Die Einstellung gilt für alle Twitch-Tabs; mit aktivierter Browser-Synchronisierung auch auf deinen anderen Computern
• Auf Deutsch und Englisch verfügbar

Datenschutz
Die Erweiterung ändert nur die Anordnung der Twitch-Seite. Sie liest und sendet keine Daten, hat keinen Zugriff auf dein Twitch-Konto und stellt keine externen Anfragen.

Website: https://ckass.de/chat-below-for-twitch/
Open Source: https://github.com/TripleT3005/chat-below-for-twitch

Nicht mit Twitch verbunden und nicht von Twitch unterstützt. Twitch ist eine Marke von Twitch Interactive, Inc.
```

### Grafiken
- Händlersymbol (128 × 128): `../icons/icon-on-128.png`
- Screenshots (1280 × 800, 24 Bit ohne Alpha): `../screenshots/01` bis `05`, als globale und lokalisierte Screenshots
- Kleine Werbekachel (440 × 280): `images/promo-small-440x280.png`
- Große Werbekachel (1400 × 560), Werbevideo: leer lassen

### Weitere Felder
- Offizielle URL: ckass.de, sobald die Domain in der Google Search Console bestätigt ist, sonst „Keine“
- URL der Startseite: https://ckass.de/chat-below-for-twitch/
- Support-URL: https://github.com/TripleT3005/chat-below-for-twitch/issues
- Mature content: Nein

## Datenschutz (Privacy practices)

**Single purpose:**
```
Rearranges Twitch stream pages so that the chat is shown below the video instead of next to it, for narrow or side-by-side browser windows. Optional display settings (divider position, hiding the header bar or left sidebar) only serve this layout.
```

**Begründung `storage`:**
```
Stores the user's settings (chat below on/off, divider position, header bar and sidebar options) in chrome.storage.sync so they apply to all Twitch tabs and the user's other browsers.
```

**Begründung `contextMenus`:**
```
Adds the display options (header bar: show/transparent/hide, hide left sidebar) to the right-click menu of the extension's toolbar icon.
```

**Begründung Host-Berechtigung (`https://www.twitch.tv/*`):**
```
The content script changes the layout of Twitch stream pages (moves the chat below the video). It only adjusts CSS and element positions on the page; it does not read, store or transmit any page content or user data.
```

**Remote Code:** „No, I am not using remote code.“

**Datennutzung:** Keine Kategorie ankreuzen (es werden keine Nutzerdaten erhoben). Die drei Bestätigungen am Ende ankreuzen.

**Datenschutzerklärung (URL):** https://ckass.de/chat-below-for-twitch/#privacy

## Verteilung
- Sichtbarkeit: Öffentlich (oder zuerst „Nicht gelistet“ zum Testen)
- Regionen: Alle
- Preis: Kostenlos
