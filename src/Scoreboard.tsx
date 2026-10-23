import type { Game, Question } from "./data";
import type { Dispatch, SetStateAction } from "react";
type Props = {
  game: Game;
  active?: Question;
  storageError: boolean;
  setGame: Dispatch<SetStateAction<Game>>;
  changeScore: (id: string, sign: number) => void;
};
export function Scoreboard({
  game,
  active,
  storageError,
  setGame,
  changeScore,
}: Props) {
  return (
    <footer className="scoreboard">
      <div className="score-heading">
        <div>
          <span className="eyebrow">PUNKTESTÄNDE</span>
        </div>
        <div className="score-tools">
          {active ? (
            <span>
              Aktuelle Frage: <strong>{active.value} Punkte</strong>
            </span>
          ) : (
            <label>
              Punkteschritt{" "}
              <select
                aria-label="Punkteschritt"
                value={game.step}
                onChange={(e) =>
                  setGame((g) => ({ ...g, step: Number(e.target.value) }))
                }
              >
                {[100, 200, 300, 400, 500].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
          )}

        </div>
      </div>
      <div
        className="team-cards"
        style={{
          gridTemplateColumns: `repeat(${game.teams.length}, minmax(0, 1fr))`,
        }}
      >
        {game.teams.map((t, i) => (
          <article className="team-card" key={t.id}>
            <div className="team-name">
              <span
                className="team-dot"
                style={{
                  background: [
                    "#cba34c",
                    "#7ba9c9",
                    "#a68ac9",
                    "#74aa8c",
                    "#d58274",
                    "#c79ac4",
                  ][i],
                }}
              />
              {t.name || `Team ${i + 1}`}
            </div>
            <div className="score" key={t.score}>
              {t.score.toLocaleString("de-DE")}
            </div>
            <div className="score-buttons">
              <button
                className="plus"
                aria-label={`${t.name} Punkte hinzufügen`}
                onClick={() => changeScore(t.id, 1)}
              >
                +
              </button>
              <button
                className="minus"
                aria-label={`${t.name} Punkte abziehen`}
                onClick={() => changeScore(t.id, -1)}
              >
                −
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="bottom-line">
        <span>
          {storageError ? "⚠ Nicht gespeichert" : "● Lokal gespeichert"}
        </span>
      </div>
    </footer>
  );
}
