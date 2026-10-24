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
            answer: "Party Rock Anthem – LMFAO feat. Lauren Bennett & GoonRock",
            audio: "/media/songs/song-1.mp3",
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
            answer: "They Don’t Care About Us – Michael Jackson",
            audio: "/media/songs/song-3.mp3",
          },
          {
            id: "0-1-3",
            value: 400,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "Lay All Your Love on Me – ABBA",
            audio: "/media/songs/song-4.mp3",
          },
          {
            id: "0-1-4",
            value: 500,
            text: "Welcher Song läuft hier? Nennt Titel und Interpret.",
            answer: "Don’t Stop Believin’ – Journey",
            audio: "/media/songs/song-5.mp3",
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
            text: "Wie viele Mitglieder hat das Jugendhaus? (Stand: bitte vor dem Spiel ergänzen.)",
            answer: "131 Mitglieder",
          },
          {
            id: "0-3-1",
            value: 200,
            text: "In welchem Jahr wurde das Jugendhaus renoviert?",
            answer: "2015",
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
            text: "Die wievielte Karibische Nacht fand 2022 statt?",
            answer: "Die 20. Karibische Nacht",
          },
          {
            id: "0-3-4",
            value: 500,
            text: "Wer war 2007 Vorstand des Jugendhauses?",
            answer: "Sonja Schramm",
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
            text: "Wie lang ist die längere Seite eines DIN-A4-Blattes in Zentimetern?",
            answer: "29,7 Zentimeter",
          },
          {
            id: "1-0-1",
            value: 200,
            text: "Wie viele Zähne hat ein vollständiges Erwachsenengebiss inklusive aller Weisheitszähne?",
            answer: "32 Zähne",
          },
          {
            id: "1-0-2",
            value: 300,
            text: "Wie viele Liter passen in einen Kubikmeter?",
            answer: "1.000 Liter",
          },
          {
            id: "1-0-3",
            value: 400,
            text: "Wie viel Prozent der trockenen Luft sind ungefähr Stickstoff?",
            answer: "Rund 78 Prozent",
          },
          {
            id: "1-0-4",
            value: 500,
            text: "Wie weit ist der Mond im Mittel von der Erde entfernt?",
            answer: "Ungefähr 384.400 Kilometer",
          },
        ],
      },
      {
        name: "Wahr oder Quatsch?",
        questions: [
          {
            id: "1-1-0",
            value: 100,
            text: "Wahr oder Quatsch: Ein Kilogramm Gold wiegt mehr als ein Kilogramm Federn.",
            answer: "Quatsch. Beide wiegen ein Kilogramm.",
          },
          {
            id: "1-1-1",
            value: 200,
            text: "Wahr oder Quatsch: Bananen zählen botanisch zu den Beeren.",
            answer: "Wahr. Bananen sind botanisch Beeren.",
          },
          {
            id: "1-1-2",
            value: 300,
            text: "Wahr oder Quatsch: Wild lebende Pinguine kommen am Nordpol vor.",
            answer: "Quatsch. Am Nordpol leben keine wilden Pinguine.",
          },
          {
            id: "1-1-3",
            value: 400,
            text: "Wahr oder Quatsch: Schall kann sich durch ein vollkommenes Vakuum ausbreiten.",
            answer: "Quatsch. Schall benötigt ein Medium, zum Beispiel Luft oder Wasser.",
          },
          {
            id: "1-1-4",
            value: 500,
            text: "Wahr oder Quatsch: Reines Wasser hat bei etwa 4 °C seine größte Dichte.",
            answer: "Wahr. Die größte Dichte liegt bei ungefähr 4 °C.",
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
            text: "In welchem Jahr wurde Google gegründet?",
            answer: "1998",
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
            text: "In welchem Jahr kamen die ersten kommerziellen Audio-CDs in Japan auf den Markt?",
            answer: "1982",
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
            text: "Wie heißt das Raumschiff von Ellen Ripleys Besatzung im ersten „Alien“-Film von 1979?",
            answer: "Nostromo",
          },
        ],
      },
      {
        name: "Kurios, aber wahr",
        questions: [
          {
            id: "1-4-0",
            value: 100,
            text: "Welches Tier ist auf dem Logo der Automarke Ferrari zu sehen?",
            answer: "Ein Pferd",
          },
          {
            id: "1-4-1",
            value: 200,
            text: "Welches Lebensmittel wird von Bienen aus Nektar hergestellt?",
            answer: "Honig",
          },
          {
            id: "1-4-2",
            value: 300,
            text: "Welches Metall ist bei gewöhnlicher Raumtemperatur von 20 °C flüssig?",
            answer: "Quecksilber",
          },
          {
            id: "1-4-3",
            value: 400,
            text: "Wie heißt der einzige Knochen des menschlichen Körpers, der mit keinem anderen Knochen direkt gelenkig verbunden ist?",
            answer: "Das Zungenbein",
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
];
