import logoUrl from "../media/logo.png";

export type Question = {
  id: string;
  value: number;
  text: string;
  answer: string;
  image?: string;
  video?: string;
};
export type Category = { name: string; questions: Question[] };
export type Board = { name: string; categories: Category[] };
export type Team = { id: string; name: string; score: number };
export type Game = {
  boards: Board[];
  teams: Team[];
  board: number;
  played: string[];
  active: string | null;
  step: number;
  history: { team: string; delta: number }[];
  logo: string;
};
const samples = [
  [
    "Unser Jugendhaus",
    "Bad Imnau & Umgebung",
    "Musik durch die Jahre",
    "Film & Fernsehen",
    "Bunt gemischt",
  ],
  [
    "40 Jahre zusammen",
    "Wissen & Staunen",
    "Sport & Spiel",
    "Erinnerungen",
    "Das große Finale",
  ],
];
const trivia: [string, string][][] = [
  [
    ["Wie heißt unser Jugendhaus mit Ortsnamen?", "Jugendhaus Bad Imnau"],
    ["Welches Jubiläum feiern wir heute?", "40 Jahre Jugendhaus Bad Imnau"],
    ["Wofür steht die Abkürzung „e. V.“?", "Eingetragener Verein"],
    [
      "Vereinsvorlage: Welche Veranstaltung ist bei euch Tradition?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Wer war bei der Gründung dabei?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
  ],
  [
    ["In welchem Bundesland liegt Bad Imnau?", "Baden-Württemberg"],
    ["Zu welcher Stadt gehört Bad Imnau?", "Haigerloch"],
    ["Wie heißt die Landeshauptstadt von Baden-Württemberg?", "Stuttgart"],
    ["Welcher Fluss fließt durch Bad Imnau?", "Die Eyach"],
    ["Wie heißt der Landkreis, zu dem Haigerloch gehört?", "Zollernalbkreis"],
  ],
  [
    ["Welche Band sang „Dancing Queen“?", "ABBA"],
    ["Welches Instrument hat normalerweise 88 Tasten?", "Das Klavier"],
    ["Wer sang „99 Luftballons“?", "Nena"],
    ["Welche Band veröffentlichte „Bohemian Rhapsody“?", "Queen"],
    [
      "Wie heißen die vier Mitglieder der Beatles mit Vornamen?",
      "John, Paul, George und Ringo",
    ],
  ],
  [
    ["Wie heißt der Zauberschüler mit der Blitznarbe?", "Harry Potter"],
    ["Welcher Film spielt auf dem Planeten Pandora?", "Avatar"],
    ["Wie heißt der Cowboy in „Toy Story“?", "Woody"],
    ["Welcher Schauspieler spielt Jack in „Titanic“?", "Leonardo DiCaprio"],
    ["Wie heißt der Regisseur von „Jurassic Park“ (1993)?", "Steven Spielberg"],
  ],
  [
    ["Wie viele Seiten hat ein Würfel?", "Sechs"],
    ["Welcher Planet wird der rote Planet genannt?", "Mars"],
    ["Wie viele Minuten hat ein Tag?", "1.440"],
    ["Welches chemische Symbol steht für Gold?", "Au"],
    ["Wie viele Herzen hat ein Oktopus?", "Drei"],
  ],
  [
    [
      "Vereinsvorlage: Wie lautet euer liebster Jugendhaus-Spruch?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Welcher Song darf bei euch nie fehlen?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Was war euer lustigster Ausflug?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Welche Renovierung ist besonders in Erinnerung geblieben?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Welche Geschichte muss heute erzählt werden?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
  ],
  [
    ["Wie viele Beine haben Insekten?", "Sechs"],
    ["Was ist die Hauptstadt von Portugal?", "Lissabon"],
    ["Welches ist das größte Säugetier?", "Der Blauwal"],
    ["Wie viele Knochen hat ein erwachsener Mensch normalerweise?", "206"],
    ["In welcher Einheit wird elektrischer Widerstand gemessen?", "Ohm"],
  ],
  [
    ["Wie viele Spieler stehen pro Fußballteam regulär auf dem Feld?", "Elf"],
    ["Wie viele Ringe hat das olympische Symbol?", "Fünf"],
    [
      "Wie heißt ein Punkt ohne gegnerische Ballberührung beim Tennisaufschlag?",
      "Ass",
    ],
    ["Wie lang ist ein Marathon?", "42,195 Kilometer"],
    ["Wie viele Felder hat ein Schachbrett?", "64"],
  ],
  [
    [
      "Vereinsvorlage: Wer kennt das älteste Jugendhaus-Foto?",
      "Lokales Foto ergänzen und Antwort eintragen.",
    ],
    [
      "Vereinsvorlage: Welches Motto hatte eure letzte Party?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Wie hieß ein früherer Treffpunkt?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Welches Ereignis hat euch zusammengeschweißt?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
    [
      "Vereinsvorlage: Was wünscht ihr dem Jugendhaus für die Zukunft?",
      "Vor dem Spiel im Editor ergänzen.",
    ],
  ],
  [
    ["Wie viele Jahre sind vier Jahrzehnte?", "40"],
    ["Wie viele Bundesländer hat Deutschland?", "16"],
    ["Wie heißt die kleinste Primzahl?", "2"],
    ["Welches Land hat die Hauptstadt Reykjavík?", "Island"],
    ["Wie lautet die römische Zahl für 40?", "XL"],
  ],
];
export function freshGame(): Game {
  return {
    boards: samples.map((names, b) => ({
      name: `Board ${b + 1}`,
      categories: names.map((name, c) => ({
        name,
        questions: trivia[b * 5 + c].map(([text, answer], q) => ({
          id: `${b}-${c}-${q}`,
          value: (q + 1) * 100,
          text,
          answer,
        })),
      })),
    })),
    teams: ["JZ", "EDE", "CAPO", "ROBBI"].map((name, i) => ({
      id: `team-${i}`,
      name,
      score: 0,
    })),
    board: 0,
    played: [],
    active: null,
    step: 100,
    history: [],
    logo: logoUrl,
  };
}
export function validateBoards(input: unknown): Board[] {
  const boards = (input as { boards?: unknown })?.boards ?? input;
  if (!Array.isArray(boards) || boards.length !== 2)
    throw Error("Genau zwei Boards werden benötigt.");
  const ids = new Set<string>();
  return boards.map((b: Board) => {
    if (
      !b ||
      typeof b.name !== "string" ||
      !Array.isArray(b.categories) ||
      b.categories.length !== 5
    )
      throw Error("Jedes Board braucht einen Namen und fünf Kategorien.");
    return {
      name: b.name,
      categories: b.categories.map((c) => {
        if (
          !c ||
          typeof c.name !== "string" ||
          !Array.isArray(c.questions) ||
          c.questions.length !== 5
        )
          throw Error("Jede Kategorie braucht einen Namen und fünf Fragen.");
        return {
          name: c.name,
          questions: c.questions.map((q) => {
            if (
              !q ||
              typeof q.id !== "string" ||
              !q.id ||
              ids.has(q.id) ||
              !Number.isSafeInteger(q.value) ||
              q.value <= 0 ||
              typeof q.text !== "string" ||
              typeof q.answer !== "string"
            )
              throw Error(
                "Fragen benötigen eindeutige IDs, positive ganze Punktewerte, Frage und Antwort.",
              );
            ids.add(q.id);
            for (const type of ["image", "video"] as const)
              if (q[type] && !validMedia(q[type]!, type))
                throw Error(
                  "Medien müssen eingebettete Dateien oder lokale /media/-Pfade sein.",
                );
            return {
              id: q.id,
              value: q.value,
              text: q.text,
              answer: q.answer,
              image: q.image,
              video: q.video,
            };
          }),
        };
      }),
    };
  });
}
export function validMedia(url: string, type: "image" | "video") {
  return (
    (url.startsWith(`/media/`) && !url.includes("..") && !url.includes("\\")) ||
    new RegExp(`^data:${type}/[a-zA-Z0-9.+-]+;base64,`).test(url)
  );
}
