import type { Board } from "./data";
export const defaultBoards: Board[] = [
  {
    name: "Board 1",
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
        name: "Wahr oder Falsch?",
        questions: [
          {
            id: "1-1-0",
            value: 100,
            text: "Wahr oder Falsch: Fledermäuse sind blind.",
            answer:
              "Falsch. Fledermäuse können sehen; viele nutzen zusätzlich Echoortung.",
          },
          {
            id: "1-1-1",
            value: 200,
            text: "Wahr oder Falsch: Eine Erdbeere ist botanisch eine Nuss-Sammelfrucht.",
            answer:
              "Wahr. Die kleinen Körnchen auf der Oberfläche sind die eigentlichen Nüsschen.",
          },
          {
            id: "1-1-2",
            value: 300,
            text: "Wahr oder Falsch: Ein Blitz kann an derselben Stelle nur einmal einschlagen.",
            answer:
              "Falsch. Blitze können mehrfach an derselben Stelle einschlagen.",
          },
          {
            id: "1-1-3",
            value: 400,
            text: "Wahr oder Falsch: Auf der Venus dauert eine Drehung um die eigene Achse länger als ein Umlauf um die Sonne.",
            answer:
              "Wahr. Etwa 243 Erdtage Rotation gegenüber etwa 225 Erdtagen Umlauf.",
          },
          {
            id: "1-1-4",
            value: 500,
            text: "Wahr oder Falsch: Haie existierten schon vor den ersten Bäumen.",
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
            text: "In welchem Jahr betrat erstmals ein Mensch den Mond?",
            answer: "1969",
          },
          {
            id: "1-2-1",
            value: 200,
            text: "In welchem Jahr fand die deutsche Wiedervereinigung statt?",
            answer: "1990",
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
            text: "In welchem Jahr wurde das erste Video auf YouTube hochgeladen?",
            answer: "2005",
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
            text: "Wie heißt der Hobbit, der den Einen Ring zum Schicksalsberg bringen soll?",
            answer: "Frodo Beutlin",
          },
          {
            id: "1-3-1",
            value: 200,
            text: "In welchem Film wird ein Junge namens Kevin zu Hause vergessen?",
            answer: "Kevin – Allein zu Haus",
          },
          {
            id: "1-3-2",
            value: 300,
            text: "Welche Farbe hat die Pille, die Neo in „Matrix“ nimmt, um die Wahrheit zu erfahren?",
            answer: "Rot",
          },
          {
            id: "1-3-3",
            value: 400,
            text: "Wie heißt der fiktive afrikanische Staat aus „Black Panther“?",
            answer: "Wakanda",
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
            text: "Wie heißt die Linie zwischen beleuchteter und unbeleuchteter Seite eines Planeten oder Mondes?",
            answer: "Terminator / Tag-Nacht-Grenze",
          },
        ],
      },
    ],
  },
  {
    name: "Board 2",
    categories: [
      {
        name: "Wer ist das?",
        questions: [
          {
            id: "0-0-0",
            value: 100,
            text: "Wer ist diese Person?",
            answer: "Matthias Steiner",
            image: "/media/personen/matthias-steiner.png",
            reveal: true,
            revealSeconds: 10,
          },
          {
            id: "0-0-1",
            value: 200,
            text: "Wer ist diese Person?",
            answer: "Wolfgang Grupp",
            image: "/media/personen/wolfgang-grupp.png",
            reveal: true,
            revealSeconds: 10,
          },
          {
            id: "0-0-2",
            value: 300,
            text: "Wer ist diese Person?",
            answer: "Thomas Müller",
            image: "/media/personen/thomas-mueller.png",
            reveal: true,
            revealSeconds: 10,
          },
          {
            id: "0-0-3",
            value: 400,
            text: "Wer ist diese Person?",
            answer: "Wolfgang Petry",
            image: "/media/personen/wolfgang-petry.png",
            reveal: true,
            revealSeconds: 10,
          },
          {
            id: "0-0-4",
            value: 500,
            text: "Wer ist diese Person?",
            answer: "Leon",
            image: "/media/personen/leon.png",
            reveal: true,
            revealSeconds: 10,
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
            answer: "Don’t Stop Believin’ – Journey",
            audio: "/media/songs/song-5.mp3",
          },
          {
            id: "0-1-1",
            value: 200,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "I Want to Break Free – Queen",
            audio: "/media/songs/song-2.mp3",
          },
          {
            id: "0-1-2",
            value: 300,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "Lay All Your Love on Me – ABBA",
            audio: "/media/songs/song-4.mp3",
          },
          {
            id: "0-1-3",
            value: 400,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "They Don’t Care About Us – Michael Jackson",
            audio: "/media/songs/song-3.mp3",
          },
          {
            id: "0-1-4",
            value: 500,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "Party Rock Anthem – LMFAO feat. Lauren Bennett & GoonRock",
            audio: "/media/songs/song-1.mp3",
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
            text: "Wie lange brauchte Eliud Kipchoge für seinen Marathonlauf in Wien 2019?",
            answer:
              "1:59:40,2 Stunden. Sonderlauf unter optimierten Bedingungen, kein offizieller Wettkampf-Weltrekord.",
          },
        ],
      },
      {
        name: "Jugendhaus-Geschichte",
        questions: [
          {
            id: "0-3-0",
            value: 100,
            text: "In welchem Jahr wurde das Jugendhaus renoviert?",
            answer: "2015",
          },
          {
            id: "0-3-1",
            value: 200,
            text: "Die wievielte Karibische Nacht fand 2022 statt?",
            answer: "Die 20. Karibische Nacht",
          },
          {
            id: "0-3-2",
            value: 300,
            text: "In welchem Jahr gab es bei der Karibischen Nacht mit rund 900 Gästen einen Besucherrekord?",
            answer: "2022",
          },
          {
            id: "0-3-3",
            value: 400,
            text: "Wer war 2007 Vorstand des Jugendhauses?",
            answer: "Sonja Schramm",
          },
          {
            id: "0-3-4",
            value: 500,
            text: "Wie viele Mitglieder hat das Jugendhaus? (± 1 Mitglied)",
            answer: "131 Mitglieder. Akzeptiert: 130 bis 132 Mitglieder.",
          },
        ],
      },
      {
        name: "Was passiert in Imnau?",
        questions: [
          {
            id: "0-4-0",
            value: 100,
            text: "Welcher Fluss fließt durch Bad Imnau?",
            answer: "Eyach",
          },
          {
            id: "0-4-1",
            value: 200,
            text: "Wie heißt die bekannte Mineralwasserquelle in Bad Imnau, die nach einem griechischen Gott benannt ist?",
            answer: "Apollo-Quelle",
          },
          {
            id: "0-4-2",
            value: 300,
            text: "In welchem Jahr verlor Bad Imnau seinen Status als Kurort?",
            answer: "2022",
          },
          {
            id: "0-4-3",
            value: 400,
            text: "In welchem Jahr hat das Hallenbad in Bad Imnau geschlossen?",
            answer: "2022",
          },
          {
            id: "0-4-4",
            value: 500,
            text: "Wann wurde der Fürstenbau in Imnau erbaut?",
            answer: "1733",
          },
        ],
      },
    ],
  },
];
