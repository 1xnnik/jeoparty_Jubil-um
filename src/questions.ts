import type { Board } from "./data";

export const defaultBoards: Board[] = [
  {
    name: "Board 1",
    categories: [
      {
        name: "Wer ist das?",
        questions: [
          {
            id: "0-0-0",
            value: 100,
            text: "Wer ist diese Person?",
            answer: "Matthias Steiner",
            image: "/media/personen/matthias-steiner.jpg",
            reveal: true,
            revealSeconds: 60,
          },
          {
            id: "0-0-1",
            value: 200,
            text: "Wer ist diese Person?",
            answer: "Wolfgang Grupp",
            image: "/media/personen/wolfgang-grupp.jpg",
            reveal: true,
            revealSeconds: 60,
          },
          {
            id: "0-0-2",
            value: 300,
            text: "Wer ist diese Person?",
            answer: "Thomas Müller",
            image: "/media/personen/thomas-mueller.jpg",
            reveal: true,
            revealSeconds: 60,
          },
          {
            id: "0-0-3",
            value: 400,
            text: "Wer ist diese Person?",
            answer: "Wolfgang Petry",
            image: "/media/personen/wolfgang-petry.jpg",
            reveal: true,
            revealSeconds: 60,
          },
          {
            id: "0-0-4",
            value: 500,
            text: "Wer ist diese Person?",
            answer: "Leon",
            image: "/media/personen/leon.jpg",
            reveal: true,
            revealSeconds: 60,
          },
        ],
      },
      {
        name: "Was ist das für ein Song?",
        questions: [
          {
            id: "0-1-0",
            value: 100,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "OFFEN: Titel und Interpret von Song 1 eintragen.",
            audio: "/media/songs/song-1.mp3",
          },
          {
            id: "0-1-1",
            value: 200,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "OFFEN: Titel und Interpret von Song 2 eintragen.",
            audio: "/media/songs/song-2.mp3",
          },
          {
            id: "0-1-2",
            value: 300,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "OFFEN: Titel und Interpret von Song 3 eintragen.",
            audio: "/media/songs/song-3.mp3",
          },
          {
            id: "0-1-3",
            value: 400,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "OFFEN: Titel und Interpret von Song 4 eintragen.",
            audio: "/media/songs/song-4.mp3",
          },
          {
            id: "0-1-4",
            value: 500,
            text: "Musik-Bonus: Welche Band besang 1982 den „Sternenhimmel“?",
            answer: "Hubert Kah",
          },
        ],
      },
      {
        name: "Sport, aber wild",
        questions: [
          {
            id: "0-2-0",
            value: 100,
            text: "In welcher Sportart kann man einen „Alley-oop“ sehen?",
            answer: "Basketball",
          },
          {
            id: "0-2-1",
            value: 200,
            text: "Was wird beim Curling mit den Besen vor dem Stein bearbeitet?",
            answer: "Das Eis",
          },
          {
            id: "0-2-2",
            value: 300,
            text: "Wie heißt die Sportart, die Schach und Boxen kombiniert?",
            answer: "Schachboxen / Chessboxing",
          },
          {
            id: "0-2-3",
            value: 400,
            text: "Ein Fußballer wirft den Ball beim Einwurf direkt ins gegnerische Tor. Zählt das Tor?",
            answer:
              "Nein. Aus einem Einwurf kann kein direktes Tor erzielt werden.",
          },
          {
            id: "0-2-4",
            value: 500,
            text: "Wie viele Hindernisse müssen Läufer beim 3.000-Meter-Hindernislauf insgesamt überwinden, inklusive Wassergräben?",
            answer: "35: 28 normale Hindernisse und 7 Wassergräben.",
          },
        ],
      },
      {
        name: "Jugendhaus-Geschichte",
        questions: [
          {
            id: "0-3-0",
            value: 100,
            text: "VORLAGE · Wann wurde das Jugendhaus gegründet?",
            answer:
              "OFFEN: Gründungsjahr anhand eurer Vereinsunterlagen eintragen.",
          },
          {
            id: "0-3-1",
            value: 200,
            text: "VORLAGE · Wann war diese legendäre Jugendhaus-Party?",
            answer:
              "OFFEN: Konkrete Party und richtiges Jahr ergänzen; optional Foto hinzufügen.",
          },
          {
            id: "0-3-2",
            value: 300,
            text: "VORLAGE · Wann fand diese Renovierung statt?",
            answer:
              "OFFEN: Renovierung und richtiges Jahr ergänzen; optional Foto hinzufügen.",
          },
          {
            id: "0-3-3",
            value: 400,
            text: "VORLAGE · Wann war dieser gemeinsame Ausflug?",
            answer:
              "OFFEN: Ausflug und richtiges Jahr ergänzen; optional Foto hinzufügen.",
          },
          {
            id: "0-3-4",
            value: 500,
            text: "VORLAGE · Wann wurde dieses Jugendhaus-Foto aufgenommen?",
            answer:
              "OFFEN: Historisches Foto hinzufügen und richtiges Jahr eintragen.",
          },
        ],
      },
      {
        name: "Kreuz & quer",
        questions: [
          {
            id: "0-4-0",
            value: 100,
            text: "Welcher Planet hat den markanten, von der Erde aus sichtbaren Ring?",
            answer: "Saturn",
          },
          {
            id: "0-4-1",
            value: 200,
            text: "Welches Land hat die Hauptstadt Ottawa?",
            answer: "Kanada",
          },
          {
            id: "0-4-2",
            value: 300,
            text: "Was bedeutet „www“ in einer Internetadresse?",
            answer: "World Wide Web",
          },
          {
            id: "0-4-3",
            value: 400,
            text: "Welches chemische Element hat das Symbol K?",
            answer: "Kalium",
          },
          {
            id: "0-4-4",
            value: 500,
            text: "Welches ist der flächenmäßig größte Binnenstaat der Erde?",
            answer: "Kasachstan",
          },
        ],
      },
    ],
  },
  {
    name: "Board 2",
    categories: [
      {
        name: "Schätz mal!",
        questions: [
          {
            id: "1-0-0",
            value: 100,
            text: "Wie viele Tasten hat ein gewöhnliches Klavier?",
            answer: "88",
          },
          {
            id: "1-0-1",
            value: 200,
            text: "Wie viele Minuten hat eine Woche?",
            answer: "10.080",
          },
          {
            id: "1-0-2",
            value: 300,
            text: "Wie viele Kilometer ist ein Marathon lang?",
            answer: "42,195 Kilometer",
          },
          {
            id: "1-0-3",
            value: 400,
            text: "Wie viele Knochen hat ein erwachsener Mensch normalerweise?",
            answer: "206",
          },
          {
            id: "1-0-4",
            value: 500,
            text: "Wie viele Kilometer pro Sekunde legt Licht im Vakuum ungefähr zurück?",
            answer: "Etwa 300.000 km/s (genau 299.792,458 km/s).",
          },
        ],
      },
      {
        name: "Wahr oder Quatsch?",
        questions: [
          {
            id: "1-1-0",
            value: 100,
            text: "Wahr oder Quatsch: Fledermäuse sind blind.",
            answer:
              "Quatsch. Fledermäuse können sehen; viele nutzen zusätzlich Echoortung.",
          },
          {
            id: "1-1-1",
            value: 200,
            text: "Wahr oder Quatsch: Eine Erdbeere ist botanisch eine Nuss-Sammelfrucht.",
            answer:
              "Wahr. Die kleinen Körnchen auf der Oberfläche sind die eigentlichen Nüsschen.",
          },
          {
            id: "1-1-2",
            value: 300,
            text: "Wahr oder Quatsch: Ein Blitz kann an derselben Stelle nur einmal einschlagen.",
            answer:
              "Quatsch. Blitze können mehrfach an derselben Stelle einschlagen.",
          },
          {
            id: "1-1-3",
            value: 400,
            text: "Wahr oder Quatsch: Auf der Venus dauert eine Drehung um die eigene Achse länger als ein Umlauf um die Sonne.",
            answer:
              "Wahr. Etwa 243 Erdtage Rotation gegenüber etwa 225 Erdtagen Umlauf.",
          },
          {
            id: "1-1-4",
            value: 500,
            text: "Wahr oder Quatsch: Haie existierten schon vor den ersten Bäumen.",
            answer:
              "Wahr. Haie gibt es seit über 400 Millionen Jahren, Bäume erst seit etwa 385 Millionen Jahren.",
          },
        ],
      },
      {
        name: "Damals & heute",
        questions: [
          {
            id: "1-2-0",
            value: 100,
            text: "In welchem Jahr fiel die Berliner Mauer?",
            answer: "1989",
          },
          {
            id: "1-2-1",
            value: 200,
            text: "In welchem Jahr wurde Deutschland im eigenen Land Fußball-Weltmeister der Männer: 1954, 1974 oder 1990?",
            answer: "1974",
          },
          {
            id: "1-2-2",
            value: 300,
            text: "In welchem Jahr wurde das erste iPhone vorgestellt?",
            answer: "2007",
          },
          {
            id: "1-2-3",
            value: 400,
            text: "In welchem Jahr wurde der Euro als Bargeld eingeführt?",
            answer: "2002",
          },
          {
            id: "1-2-4",
            value: 500,
            text: "In welchem Jahr ging die erste SMS auf die Reise?",
            answer: "1992",
          },
        ],
      },
      {
        name: "Filmreif",
        questions: [
          {
            id: "1-3-0",
            value: 100,
            text: "Wie heißt der Cowboy in „Toy Story“?",
            answer: "Woody",
          },
          {
            id: "1-3-1",
            value: 200,
            text: "In welcher Filmreihe heißt es „Möge die Macht mit dir sein“?",
            answer: "Star Wars",
          },
          {
            id: "1-3-2",
            value: 300,
            text: "Welcher Film erzählt die Geschichte von Jack und Rose auf einem Schiff?",
            answer: "Titanic",
          },
          {
            id: "1-3-3",
            value: 400,
            text: "Welche Filmfigur sagt „Ich bin dein Vater“ zu Luke Skywalker?",
            answer: "Darth Vader",
          },
          {
            id: "1-3-4",
            value: 500,
            text: "Wie heißt das Hotel in Stanley Kubricks „Shining“?",
            answer: "Overlook Hotel",
          },
        ],
      },
      {
        name: "Kurios, aber wahr",
        questions: [
          {
            id: "1-4-0",
            value: 100,
            text: "Welches Tier hat drei Herzen?",
            answer: "Ein Oktopus",
          },
          {
            id: "1-4-1",
            value: 200,
            text: "Welches Säugetier kann aktiv fliegen?",
            answer: "Die Fledermaus",
          },
          {
            id: "1-4-2",
            value: 300,
            text: "Welche Farbe hat die Haut eines Eisbären unter dem Fell?",
            answer: "Schwarz",
          },
          {
            id: "1-4-3",
            value: 400,
            text: "Welcher Vogel kann rückwärts fliegen?",
            answer: "Der Kolibri",
          },
          {
            id: "1-4-4",
            value: 500,
            text: "Wie nennt man die Angst vor der Zahl 13?",
            answer: "Triskaidekaphobie",
          },
        ],
      },
    ],
  },
];
