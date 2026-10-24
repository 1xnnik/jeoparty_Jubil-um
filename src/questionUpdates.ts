import { priorStandardBoards } from "./priorStandardBoards";
import { incorrectBoardTwo } from "./incorrectBoardTwo";
import { previousBoardTwo } from "./previousBoardTwo";
import type { Board, Game } from "./data";
import { defaultBoards } from "./questions";
import { legacyBoards } from "./legacyQuestions";
export const SAVE_KEY = "bad-imnau-jeopardy-v1";
export const BACKUP_KEY = `${SAVE_KEY}-before-question-update`;
function normalized(boards: Board[]) {
  return JSON.stringify(
    boards.map((b) => ({
      name: b.name,
      categories: b.categories.map((c) => ({
        name: c.name,
        questions: c.questions.map((q) => ({
          id: q.id,
          value: q.value,
          text: q.text,
          answer: q.answer,
          image: q.image ?? null,
          video: q.video ?? null,
          audio: q.audio ?? null,
          reveal: q.reveal ?? false,
          revealSeconds: q.revealSeconds ?? 60,
        })),
      })),
    })),
  );
}
export function isOriginalQuestionSet(boards: Board[]) {
  return normalized(boards) === normalized(legacyBoards);
}
export function needsQuestionUpdate(boards: Board[]) {
  const categories = boards.flatMap((b) => b.categories);
  return defaultBoards
    .flatMap((b) => b.categories)
    .some((expected) => {
      const category = categories.find(
        (c) => c.questions[0]?.id === expected.questions[0].id,
      );
      if (!category || category.name !== expected.name) return true;
      if (expected.questions.some((q) => q.audio))
        return category.questions.some(
          (q) => !q.audio || q.answer.startsWith("OFFEN:"),
        );
      if (expected.questions.some((q) => q.reveal))
        return category.questions.some((q) => !q.reveal || !q.image);
      return category.questions.some((q) => q.text.startsWith("VORLAGE"));
    });
}
export function updatedGame(game: Game): Game {
  return {
    ...game,
    boards: structuredClone(defaultBoards),
    board: 0,
    active: null,
    played: [],
  };
}

// Match shipped categories exactly. Edited categories remain untouched.
export function migrateStandardBoards(game: Game): Game | null {
  const shipped = [
    ...priorStandardBoards,
    previousBoardTwo,
    incorrectBoardTwo,
  ].flatMap((b) => b.categories);
  const targets = defaultBoards.flatMap((b) => b.categories);
  const normalizeCategory = (category: Board["categories"][number]) =>
    normalized([{ name: "", categories: [category] }]);
  const boards = game.boards.map((board) => ({
    ...board,
    categories: board.categories.map((category) => {
      const oldMarathonText = "Wie schnell wurde die Marathondistanz beim Sub-2-Stunden-Lauf von Eliud Kipchoge 2019 in Wien bewältigt?";
      if (category.questions.some(q => q.id === "0-2-4" && q.text === oldMarathonText)) {
        const updatedQuestion = targets.flatMap(c => c.questions).find(q => q.id === "0-2-4")!;
        return {...category, questions:category.questions.map(q => q.id === "0-2-4" && q.text === oldMarathonText ? {...q,text:updatedQuestion.text} : q)};
      }
      if (
        !shipped.some(
          (old) => normalizeCategory(old) === normalizeCategory(category),
        )
      )
        return category;
      const next = targets.find(
        (c) => c.questions[0].id === category.questions[0]?.id,
      );
      return next ? structuredClone(next) : category;
    }),
  }));
  const oldOrder =
    boards[0].categories[0].questions[0]?.id === "0-0-0" &&
    boards[1].categories[0].questions[0]?.id === "1-0-0";
  if (oldOrder) boards.reverse();
  boards.forEach((b, i) => {
    b.name = `Board ${i + 1}`;
  });
  if (normalized(boards) === normalized(game.boards)) return null;
  const newQuestions = boards.flatMap((b) =>
    b.categories.flatMap((c) => c.questions),
  );
  const changed = new Set(
    game.boards
      .flatMap((b) => b.categories.flatMap((c) => c.questions))
      .filter((q) => {
        const next = newQuestions.find((n) => n.id === q.id);
        return (
          !next ||
          next.text !== q.text ||
          next.answer !== q.answer ||
          next.audio !== q.audio ||
          next.image !== q.image ||
          next.value !== q.value
        );
      })
      .map((q) => q.id),
  );
  const active = game.active && !changed.has(game.active) ? game.active : null;
  const activeBoard = active
    ? boards.findIndex((b) =>
        b.categories.some((c) => c.questions.some((q) => q.id === active)),
      )
    : -1;
  return {
    ...game,
    boards,
    active,
    board: activeBoard >= 0 ? activeBoard : oldOrder ? 0 : game.board,
    played: game.played.filter((id) => !changed.has(id)),
  };
}
