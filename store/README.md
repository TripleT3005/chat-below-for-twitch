# Store-Unterlagen

Unterlagen für den Chrome Web Store und Microsoft Edge Add-ons. Der Ordner gehört nicht zur Erweiterung und ist nicht Teil der Release-ZIP.

| Datei | Inhalt |
|---|---|
| `CHROME.md` | Eintrag, Texte und Datenschutz-Angaben für den Chrome Web Store |
| `EDGE.md` | Eintrag, Suchbegriffe und Prüfhinweis für Edge Add-ons |
| `screenshot-staging.js` | Ersetzt auf einer Twitch-Seite Video, Chat und Seitenleiste durch neutrale Inhalte |
| `raw/` | Screenshots ohne Bildunterschrift (Ausgangsmaterial) |
| `add-captions.ps1` | Erzeugt aus `raw/` die Screenshots mit Bildunterschrift in `../screenshots/` |
| `store-logo.ps1` | Zeichnet das Store-Logo `images/store-logo-300.png` (für Edge) |
| `promo-tile.ps1` | Erzeugt die kleine Werbekachel `images/promo-small-440x280.png` |

## Format
- Screenshots: 1280 × 800, PNG mit 24 Bit ohne Alpha (Chrome lehnt Bilder mit Alphakanal ab)
- Chrome: bis zu 5 Screenshots, Händlersymbol 128 × 128 aus `../icons/icon-on-128.png`
- Edge: bis zu 6 Screenshots, Store-Logo 300 × 300

## Screenshots neu erstellen

### Vorbereitung (einmalig)
1. Neueste Version der Erweiterung installieren
2. DevTools öffnen (F12) → Sources → Snippets → „New snippet“ → Inhalt von `screenshot-staging.js` einfügen, als „Staging“ speichern
3. Gerätesymbolleiste (Strg+Umschalt+M) → „Responsive“ → 1280 × 800 einstellen, Zoom 100 %

### Ablauf pro Screenshot
1. Beliebigen Live-Kanal öffnen (F5)
2. Einstellung der Erweiterung wie in der Liste setzen (Rechtsklick auf das Symbol, Trennlinie ziehen)
3. Snippet ausführen (Strg+Enter im Snippet)
4. Maus aus dem Video nehmen, damit keine Player-Steuerung eingeblendet ist
5. Strg+Umschalt+P → „Capture screenshot“ und unter dem Namen aus der Liste in `raw/` speichern

Das Skript ändert nur die Anzeige im aktuellen Tab. Nach F5 ist alles wieder normal. Wird die Seite neu aufgebaut (z. B. Seitenleiste), das Snippet einfach erneut ausführen.

### Liste (Reihenfolge = Reihenfolge im Store)
| Datei | Einstellungen | Bildunterschrift |
|---|---|---|
| `01-chat-below.png` | Chat unten, Kopfleiste anzeigen, Seitenleiste ausgeklappt, Trennlinie etwa in der Mitte | Twitch chat below the video – made for side-by-side windows |
| `02-without-extension.png` | Erweiterung aus | Without the extension: chat next to the video |
| `03-resize-divider.png` | Trennlinie weit oben, Maus über der Linie (lila Griff), Kopfleiste transparent | Drag the divider to resize – header bar transparent via right-click |
| `04-narrow-window.png` | Schmales Fenster (hochkant), Kopfleiste und Seitenleiste ausgeblendet | Narrow window: header bar and sidebar hidden for maximum space |
| `05-compact-chat.png` | Trennlinie ganz unten | Shrink the chat down to its header row |

### Bildunterschriften einbauen
```
powershell -ExecutionPolicy Bypass -File store/add-captions.ps1
```
Die Texte stehen oben im Skript. Hochkant aufgenommene Bilder werden automatisch passend eingesetzt.
