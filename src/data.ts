import { defaultBoards } from "./questions";
import logoUrl from "../media/logo.png";

export type Question = {
  id: string;
  value: number;
  text: string;
  answer: string;
  image?: string;
  video?: string;
  audio?: string;
  reveal?: boolean;
  revealSeconds?: number;
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
export function freshGame(): Game {
  return {
    boards: structuredClone(defaultBoards),
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
// Repair only the five previously shipped JPG placeholders; preserve custom images.
export function personImagePath(image?: string) {
  const names = ["leon", "matthias-steiner", "thomas-mueller", "wolfgang-grupp", "wolfgang-petry"];
  return names.some(name => image === `/media/personen/${name}.jpg`) ? image!.replace(/\.jpg$/, ".png") : image;
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
            if (q.reveal !== undefined && typeof q.reveal !== "boolean")
              throw Error("Bildenthüllung muss an oder aus sein.");
            if (
              q.revealSeconds !== undefined &&
              (!Number.isFinite(q.revealSeconds) ||
                q.revealSeconds < 5 ||
                q.revealSeconds > 180)
            )
              throw Error("Bildenthüllung benötigt 5 bis 180 Sekunden.");
            ids.add(q.id);
            for (const type of ["image", "video", "audio"] as const)
              if (q[type] && !validMedia(q[type]!, type))
                throw Error(
                  "Medien müssen eingebettete Dateien oder lokale /media/-Pfade sein.",
                );
            return {
              id: q.id,
              value: q.value,
              text: q.text,
              answer: q.answer,
              image: personImagePath(q.image),
              video: q.video,
              audio: q.audio,
              reveal: q.reveal,
              revealSeconds: q.revealSeconds,
            };
          }),
        };
      }),
    };
  });
}
export function validMedia(url: string, type: "image" | "video" | "audio") {
  if (typeof url !== "string") return false;
  return (
    (url.startsWith(`/media/`) && !url.includes("..") && !url.includes("\\")) ||
    new RegExp(`^data:${type}/[a-zA-Z0-9.+-]+;base64,`).test(url)
  );
}
