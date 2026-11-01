# Changelog

All notable changes to Chat Below for Twitch, grouped by version in the style of [Keep a Changelog](https://keepachangelog.com/). The section of each version is used as its release notes (tag `v<version>`). Changes on `main` that are not released yet are collected under [Unreleased] and move into the section of the next version.

Alle wichtigen Änderungen an Chat Below for Twitch, gegliedert nach Version im Stil von [Keep a Changelog](https://keepachangelog.com/de/). Der Abschnitt einer Version wird als ihre Release-Notizen verwendet (Tag `v<Version>`). Änderungen auf `main`, die noch nicht veröffentlicht sind, stehen unter [Unreleased] und wandern mit der nächsten Version in deren Abschnitt.

## [Unreleased]

## [1.4.8] – 2026-10-24

### English

#### Added
- The browser's extensions page shows a "Website" link to https://ckass.de/chat-below-for-twitch/.

### Deutsch

#### Neu
- Die Erweiterungsseite des Browsers zeigt einen Link „Website“ zu https://ckass.de/chat-below-for-twitch/.

## [1.4.7] – 2026-10-24

### English

#### Changed
- The large icon has the padding the Chrome Web Store expects, so it appears as large as the icons of other extensions.

### Deutsch

#### Geändert
- Das große Icon hat den Rand, den der Chrome Web Store erwartet, und wirkt so groß wie die Icons anderer Erweiterungen.

## [1.4.6] – 2026-10-24

### English

#### Changed
- The layout and the display options only apply on a channel's stream page; the home page, the directory and channel subpages such as About or Clips look as usual. The button in the player only appears on stream pages.

#### Fixed
- Channel subpages are no longer broken.
- Fullscreen from the player works again with the chat below the video.

### Deutsch

#### Geändert
- Das Layout und die Anzeigeoptionen gelten nur noch auf der Stream-Seite eines Kanals; Startseite, Verzeichnis und Kanal-Unterseiten wie „Info“ oder „Clips“ sehen normal aus. Der Knopf im Player erscheint nur auf Stream-Seiten.

#### Behoben
- Kanal-Unterseiten sind nicht mehr verschoben.
- Vollbild aus dem Player funktioniert wieder, während der Chat unter dem Video steht.

## [1.4.5] – 2026-10-24

### English

#### Fixed
- Theatre mode no longer breaks the layout: while the chat is below the video, theatre mode is left automatically and its button and Alt+T are disabled.
- In player fullscreen the extension steps aside and restores its layout afterwards.

### Deutsch

#### Behoben
- Der Kinomodus bringt das Layout nicht mehr durcheinander: Solange der Chat unter dem Video steht, wird er automatisch verlassen, sein Knopf und Alt+T sind dann abgeschaltet.
- Im Vollbild des Players tritt die Erweiterung zurück und stellt ihr Layout danach wieder her.

## [1.4.4] – 2026-10-24

### English

#### Fixed
- During ad breaks the small stream preview above the chat keeps its normal size instead of being stretched to the full width.

### Deutsch

#### Behoben
- In Werbepausen behält die kleine Stream-Vorschau über dem Chat ihre normale Größe, statt auf die volle Breite gezogen zu werden.

## [1.4.3] – 2026-10-24

### English

#### Changed
- The purple of the "on" icon differs slightly from Twitch's brand color.

### Deutsch

#### Geändert
- Das Lila des „Ein“-Icons weicht leicht von der Markenfarbe von Twitch ab.

## [1.4.2] – 2026-10-24

### English

#### Fixed
- The transparent header bar shows the video behind it again; since 1.4.1 it looked opaque and covered the top of the video.

### Deutsch

#### Behoben
- Die transparente Kopfzeile zeigt wieder das Video dahinter; seit 1.4.1 wirkte sie deckend und verdeckte den oberen Rand des Videos.

## [1.4.1] – 2026-10-24

### English

#### Fixed
- With a transparent header bar the left sidebar stays below it and no longer overlaps its buttons.
- Hiding the left sidebar works more reliably.

### Deutsch

#### Behoben
- Bei transparenter Kopfzeile bleibt die linke Seitenleiste darunter und überdeckt ihre Knöpfe nicht mehr.
- Das Ausblenden der linken Seitenleiste funktioniert zuverlässiger.

## [1.4.0] – 2026-10-24

### English

#### Added
- Right-click the extension icon to show, hide or make the header bar transparent and to hide the left sidebar. The options apply to all Twitch tabs while the chat is below the video.

### Deutsch

#### Neu
- Ein Rechtsklick auf das Erweiterungs-Icon blendet die Kopfzeile ein, aus oder macht sie transparent und blendet die linke Seitenleiste aus. Die Optionen gelten in allen Twitch-Tabs, solange der Chat unter dem Video steht.

## [1.3.2] – 2026-10-24

### English

#### Changed
- A running hype train is shown as a single line in the chat header row, so the chat can always be shrunk down to its header.

### Deutsch

#### Geändert
- Ein laufender Hype Train erscheint einzeilig in der Kopfzeile des Chats, sodass sich der Chat immer bis auf seine Kopfzeile verkleinern lässt.

## [1.3.1] – 2026-10-24

### English

#### Changed
- With a custom split the chat can be shrunk down to its header row; while a hype train is running, its banner stays visible.

### Deutsch

#### Geändert
- Mit eigener Aufteilung lässt sich der Chat bis auf seine Kopfzeile verkleinern; während eines Hype Trains bleibt dessen Banner sichtbar.

## [1.3.0] – 2026-10-24

### English

#### Added
- Drag the line between video and chat to change the split; double-click resets it. The split applies to all Twitch tabs.

### Deutsch

#### Neu
- Die Linie zwischen Video und Chat lässt sich ziehen, um die Aufteilung zu ändern; ein Doppelklick setzt sie zurück. Die Aufteilung gilt in allen Twitch-Tabs.

## [1.2.0] – 2026-10-24

### English

#### Added
- The extension is available in English and German, depending on the browser language.

### Deutsch

#### Neu
- Die Erweiterung gibt es auf Englisch und Deutsch, je nach Sprache des Browsers.

## [1.1.3] – 2026-10-24

### English

#### Added
- Each release has a `.sha256` file and a link to a VirusTotal scan.

#### Fixed
- The on/off tooltip of the toolbar icon only appears on Twitch tabs; other websites show the plain name.

### Deutsch

#### Neu
- Jedes Release hat eine `.sha256`-Datei und einen Link zu einem VirusTotal-Scan.

#### Behoben
- Der Ein/Aus-Tooltip des Toolbar-Icons erscheint nur noch in Twitch-Tabs; andere Websites zeigen nur den Namen.

## [1.1.2] – 2026-10-24

### English

#### Added
- First release: moves the Twitch chat below the video, toggled via a button in the player bar, the toolbar icon or a keyboard shortcut. The video uses the full window width, and the setting is remembered for all Twitch tabs.

### Deutsch

#### Neu
- Erstes Release: verschiebt den Twitch-Chat unter das Video, umschaltbar über einen Knopf in der Player-Leiste, das Toolbar-Icon oder ein Tastenkürzel. Das Video nutzt die volle Fensterbreite, die Einstellung gilt für alle Twitch-Tabs.
