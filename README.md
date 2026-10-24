# Jubiläums-Jeopardy · Jugendhaus Bad Imnau

Lokale React-/TypeScript-Anwendung für die Moderation am Laptop und Präsentation auf dem Beamer. Zwei Boards mit je fünf Kategorien und fünf Fragen; Punkte werden ausschließlich manuell vergeben.

## Windows: Start und Stop per Doppelklick

ZIP vollstaendig entpacken und Node.js 24 installieren. Dann **Start.bat** doppelklicken. Beim ersten Start werden die Abhaengigkeiten automatisch installiert (Internet erforderlich), danach oeffnet sich das Spiel im Browser. Das Konsolenfenster schliesst sich bei Erfolg automatisch; der Server laeuft im Hintergrund weiter.

**Stop.bat** beendet nur den mit Start.bat gestarteten Server dieses Projektordners. Browser-Spielstaende bleiben erhalten. Ein erneuter Start oeffnet ein bereits laufendes Spiel, statt einen zweiten Server zu starten. Bei Fehlern bleibt das Fenster offen; weitere Details stehen in `.jeopardy-runtime/server.log`. Falls bereits ein manuell gestarteter Server Port 5173 belegt, diesen zuerst mit Strg+C in seinem Terminal beenden.

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
2. Im **Frageneditor** alle Fragen prüfen. Die Jugendhaus-Antworten stammen aus euren Angaben; bei der Mitgliederfrage vor dem Spiel den Bezugszeitpunkt ergänzen.
3. Das Original-Logo aus `media/logo.png` ist fest eingebunden und funktioniert auch offline. Bereits gespeicherte Spiele mit dem alten Platzhalter übernehmen es automatisch. Ein optionaler Logo-Upload im Editor überschreibt das Standardlogo nur im aktuellen Browser. Logos bleiben unverzerrt und auf allen Ansichten sichtbar.
4. Fragen als JSON exportieren und separat sichern. JSON enthält beide Boards und eingebettete Medien, aber keine Teams, Punkte oder Logo.
5. Ein komplettes Testspiel auf dem Veranstaltungsgerät durchführen und Beamer prüfen.

## Bedienung

- Ein Punktefeld öffnet die Frage. Die Antwort lässt sich separat anzeigen und verbergen.
- **+ / −** ändern ausschließlich das gewählte Team um den aktiven Fragewert. Ohne aktive Frage gilt der ausgewählte Punkteschritt. Negative Punkte sind erlaubt.
- **Zum Board** markiert die Frage als gespielt. Das Öffnen oder Anzeigen der Antwort vergibt keine Punkte.
- Board 2 übernimmt alle Punktestände; ein vorzeitiger Wechsel fragt nach.
- Es gibt keinen Countdown und keine Spielsounds. Nur MP3-Fragen spielen nach manuellem Play Musik ab; Videos bleiben stumm.
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

## Neues Jubiläums-Fragenset

Board 1: **Wer ist das?**, **Was ist das für ein Song?**, **Sport, aber wild**, **Jugendhaus-Geschichte**, **Kreuz & quer**.
Board 2: **Schätz mal!**, **Wahr oder Quatsch?**, **Damals & heute**, **Filmreif**, **Kurios, aber wahr**.

Bereits gespeicherte Fragen werden nicht überschrieben. Im Frageneditor zuerst JSON exportieren und anschließend **Neue Jubiläumsfragen laden** wählen. Eine Sicherheitsabfrage schützt eigene Fragen; Teamnamen und Punktestände bleiben erhalten, gespielte Felder werden zurückgesetzt. Neue Browser starten direkt mit dem neuen Set.

### Personenrunde

100 Punkte: Matthias Steiner, 200: Wolfgang Grupp, 300: Thomas Müller, 400: Wolfgang Petry, 500: Leon. Originalfotos unter `public/media/personen/` ergänzen (Dateinamen siehe dortige README) oder im Editor hochladen. Die Chatbilder waren nicht als Dateien verfügbar und sind daher noch nicht eingebunden. Fehlende Bilder werden im Spiel deutlich gemeldet.

Jedes Bild startet nach dem Laden stark verschwommen und wird automatisch über 60 Sekunden scharf. Der Moderator kann die Enthüllung pausieren, fortsetzen oder zurücksetzen. Nach dem Zurücksetzen beginnt die Enthüllung erst beim erneuten Start. **Antwort anzeigen** zeigt die Person sofort scharf und blendet den Namen ein; Punkte bleiben ausschließlich manuell. Im Editor sind Bildenthüllung und Dauer (5–180 Sekunden) je Frage einstellbar. Beim Schließen oder Neuladen beginnt das Bild wieder verschwommen.

### Fünf MP3-Fragen

Alle fünf Songs sind als echte MP3s unter `public/media/songs/song-1.mp3` bis `song-5.mp3` eingebunden: LMFAO, Queen, Michael Jackson, ABBA und Journey. Titel und Interpreten aller fünf Fragen sind eingetragen. Es werden keine Songs aus dem Internet geladen. Alle fünf Punktefelder verwenden eine MP3-Datei. MP3-Fragen besitzen einen lokalen Player mit Play, Pause und Seek; kein Autoplay. Auch Audio-Pfade und eingebettete Audiodateien bleiben im JSON-Export erhalten. Medien unter public/media müssen separat mitgegeben werden.

### Wann war das?

Die fünf Jugendhaus-Fragen verwenden eure Angaben: 131 Mitglieder (Bezugszeitpunkt noch im Editor ergänzen), Renovierung 2015, Besucherrekord bei der Karibischen Nacht 2022 mit rund 900 Gästen, 20. Karibische Nacht im Jahr 2022 sowie Sonja Schramm als Vorstand 2007.
