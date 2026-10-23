# Jubiläums-Jeopardy · Jugendhaus Bad Imnau

Lokale React-/TypeScript-Anwendung für die Moderation am Laptop und Präsentation auf dem Beamer. Zwei Boards mit je fünf Kategorien und fünf Fragen; Punkte werden ausschließlich manuell vergeben.

## Starten

Node.js 22.12+ oder 24 und npm verwenden.

```sh
npm ci --cache /workspace/.npm-cache
npm run dev
```

Für einen lokalen Rechner kann `--cache /workspace/.npm-cache` entfallen. Die im Terminal angezeigte Adresse im Browser öffnen. Beamer auf Bildschirmspiegelung stellen und „Vollbild“ wählen.

```sh
npm run build
npm run preview
```

Nach der Installation benötigt das laufende Spiel keine Internetverbindung. Alle Schriften, Fragen und Medien sind lokal. Nach einem Neustart muss der lokale Server wieder gestartet werden; die Anwendung ist kein installierbares PWA.

## Veranstaltung vorbereiten

1. Unter **Teams** zwei bis sechs Teamnamen einstellen.
2. Im **Frageneditor** alle Fragen prüfen. Vereinsfragen sind ausdrücklich Vorlagen und müssen mit echten Vereinsgeschichten ergänzt werden.
3. Das Original-Logo aus `media/logo.png` ist fest eingebunden und funktioniert auch offline. Bereits gespeicherte Spiele mit dem alten Platzhalter übernehmen es automatisch. Ein optionaler Logo-Upload im Editor überschreibt das Standardlogo nur im aktuellen Browser. Logos bleiben unverzerrt und auf allen Ansichten sichtbar.
4. Fragen als JSON exportieren und separat sichern. JSON enthält beide Boards und eingebettete Medien, aber keine Teams, Punkte oder Logo.
5. Ein komplettes Testspiel auf dem Veranstaltungsgerät durchführen und Beamer prüfen.

## Bedienung

- Ein Punktefeld öffnet die Frage. Die Antwort lässt sich separat anzeigen und verbergen.
- **+ / −** ändern ausschließlich das gewählte Team um den aktiven Fragewert. Ohne aktive Frage gilt der ausgewählte Punkteschritt. Negative Punkte sind erlaubt.
- **Zum Board** markiert die Frage als gespielt. Das Öffnen oder Anzeigen der Antwort vergibt keine Punkte.
- Board 2 übernimmt alle Punktestände; ein vorzeitiger Wechsel fragt nach.
- Die Anwendung hat keinen Timer und keinen Sound. Eingebettete Videos werden dauerhaft stumm wiedergegeben.
- Spielstand wird nach Änderungen automatisch gespeichert. **Speichern** bestätigt das explizit, **Fortsetzen** lädt den letzten lokalen Stand. Beim Neuladen wird auch eine aktive Frage wieder geöffnet; die Antwortanzeige startet zurückgesetzt.
- **Neues Spiel** setzt erst nach Bestätigung Punkte und gespielte Fragen zurück; Teams, Fragen und Logo bleiben erhalten.

## Medien und JSON

Bilder und kurze Videos bis 2 MB lassen sich einbetten. LocalStorage hat browserabhängig meist nur wenige MB Kapazität. Eine Warnung zeigt Speicherfehler an; dann Medien reduzieren und exportieren. Für größere Dateien `public/media/` anlegen und z. B. `/media/foto.jpg` bzw. `/media/film.mp4` im Editor eintragen. Diese Dateien zusammen mit dem Projekt weitergeben. Externe URLs werden beim Import abgelehnt. MP4/H.264 und PNG/JPEG sind für Veranstaltungslaptops empfehlenswert.

JSON-Schema (vollständig: zwei Boards, je fünf Kategorien, je fünf Fragen):

```json
{"boards":[{"name":"Board 1","categories":[{"name":"Kategorie","questions":[{"id":"0-0-0","value":100,"text":"Frage?","answer":"Antwort","image":"/media/foto.jpg"}]}]}]}
```

Dies ist nur ein Schema-Ausschnitt. Zum Erstellen einer vollständigen Datei zuerst die vorhandenen 50 Fragen exportieren. IDs müssen global eindeutig sein, Punktwerte positive ganze Zahlen. Beim Import werden gespielte Felder zurückgesetzt; Punkte bleiben erhalten.

LocalStorage ist an Browser und Serveradresse gebunden. Browserdaten nicht löschen; im privaten Modus ist Speicherung möglicherweise nicht dauerhaft. Fragenexport ersetzt keine Sicherung von Team-Punkteständen.

## Prüfung

```sh
npm run build
npx playwright test
```

Die Browserprüfungen verwenden Chromium unter `/usr/bin/chromium`. Auf anderen Geräten den Pfad in `playwright.config.ts` anpassen oder `executablePath` entfernen und `npx playwright install chromium` ausführen. Die Tests decken manuelle Punkte, Speicherung, Boardwechsel, Editor, Importfehler, Reset-Bestätigung, die reduzierte Oberfläche und mobiles Layout ab.
