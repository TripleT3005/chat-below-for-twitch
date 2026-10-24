# Microsoft Edge Add-ons – Eintrag

## Konto (einmalig: Partner Center → Account settings → Programs → Microsoft Edge → Get started)
- Account type: Individual (kostenlos, nachträglich nicht änderbar)
- Herausgeber-Anzeigename: TripleT3005
- Kontakt-E-Mail: dev@ckass.de

## 1. Paket
- Microsoft Edge → Overview → „Create new extension“ bzw. bei Updates „Packages → Replace“: ZIP aus dem neuesten GitHub-Release

## 2. Verfügbarkeit
- Sichtbarkeit: Öffentlich (oder „Ausgeblendet“ zum Testen, nur per Link auffindbar)
- Märkte: Alle

## 3. Eigenschaften
- Kategorie: Entertainment
- Datenschutzrichtlinie erforderlich: Nein (es werden keine personenbezogenen Daten erhoben)
- URL der Datenschutzrichtlinie (trotzdem eintragen): https://ckass.de/chat-below-for-twitch/#privacy
- Website-URL: https://ckass.de/chat-below-for-twitch/
- Support-Kontakt: https://github.com/TripleT3005/chat-below-for-twitch/issues
- Inhalte für Erwachsene: Nein

## 4. Store-Einträge (je Sprache: English, Deutsch)
- Beschreibung: aus CHROME.md (Englisch bzw. Deutsch) – nennt keine anderen Browser, das ist bei Edge Pflicht
- Store-Logo (300 × 300): `images/store-logo-300.png`
- Kleine Werbekachel (440 × 280): `images/promo-small-440x280.png`
- Screenshots (1280 × 800): `../screenshots/01` bis `05`
- Große Werbekachel, YouTube-Video: leer lassen

### Suchbegriffe (max. 7)
```
twitch
chat
split screen
side by side
stream layout
chat below video
narrow window
```

## 5. Übermittlungsoptionen → Hinweise für die Zertifizierung
```
No account or login is needed. To test:
1. Open any live channel on https://www.twitch.tv (for example from https://www.twitch.tv/directory/all).
2. Click the chat icon in the video's control bar (bottom right of the player) or click the extension's toolbar icon. The chat moves below the video.
3. Drag the line between video and chat to change the split; double-click it to reset.
4. Right-click the toolbar icon for the display options (header bar show/transparent/hide, hide left sidebar).
The extension only changes the layout of Twitch stream pages. It does not collect or transmit any data and makes no network requests.
```

## Datenschutz (Privacy)
- Single purpose, Begründungen für `storage` und `contextMenus`: wie in CHROME.md (eine Host-Berechtigung fragt Edge nicht ab)
- Remote code: No
- Data usage: nichts ankreuzen, die drei Bestätigungen ankreuzen
- Privacy policy URL: https://ckass.de/chat-below-for-twitch/#privacy
