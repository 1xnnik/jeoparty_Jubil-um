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
  return boards[0].categories.slice(0, 4).some((category, index) => {
    const expected = defaultBoards[0].categories[index];
    if (category.name !== expected.name) return true;
    if (index === 0)
      return category.questions.some((q) => !q.reveal || !q.image);
    if (index === 1)
      return category.questions.some(
        (q) => !q.audio || q.answer.startsWith("OFFEN:"),
      );
    if (index === 3)
      return category.questions.some((q) => q.text.startsWith("VORLAGE"));
    return false;
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

export function hasPreviousBoardTwo(boards: Board[]) {
  return normalized([boards[1]]) === normalized([previousBoardTwo]) || normalized([boards[1]]) === normalized([incorrectBoardTwo]);
}
export function refreshBoardTwo(game: Game): Game {
  const newQuestions = defaultBoards[1].categories.flatMap(c => c.questions);
  const changedIds = new Set(game.boards[1].categories.flatMap(c => c.questions).filter(q => {
    const next = newQuestions.find(n => n.id === q.id);
    return !next || next.text !== q.text || next.answer !== q.answer || next.value !== q.value;
  }).map(q => q.id));
  return {...game,boards:[game.boards[0],structuredClone(defaultBoards[1])],played:game.played.filter(id => !changedIds.has(id)),active:game.active && changedIds.has(game.active) ? null : game.active};
}
