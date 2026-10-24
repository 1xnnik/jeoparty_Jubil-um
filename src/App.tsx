import React, { useEffect, useRef, useState } from "react";
import {
  freshGame,
  validateBoards,
  validMedia,
  type Game,
  type Question,
} from "./data";
import { QuestionMedia } from "./QuestionMedia";
import { Scoreboard } from "./Scoreboard";
const KEY = "bad-imnau-jeopardy-v1";
function load(): Game {
  try {
    const s = localStorage.getItem(KEY);
    if (s) {
      const g = JSON.parse(s);
      validateBoards(g.boards);
      if (
        !Array.isArray(g.teams) ||
        g.teams.length < 2 ||
        g.teams.length > 6 ||
        g.teams.some(
          (t: Game["teams"][number]) =>
            typeof t.name !== "string" || !Number.isSafeInteger(t.score),
        )
      )
        throw Error();
      if (
        !Array.isArray(g.played) ||
        !Array.isArray(g.history) ||
        ![0, 1].includes(g.board)
      )
        throw Error();
      return {
        ...freshGame(),
        ...g,
        logo: !g.logo || g.logo === "/logo.svg" ? freshGame().logo : g.logo,
      };
    }
  } catch {
    /* Invalid saved state falls back to a fresh game. */
  }
  return freshGame();
}
export default function App() {
  const [game, setGame] = useState<Game>(load),
    [screen, setScreen] = useState<"play" | "editor" | "teams">("play"),
    [answer, setAnswer] = useState(false),
    [notice, setNotice] = useState(""),
    [editBoard, setEditBoard] = useState(0),
    [editCategory, setEditCategory] = useState(0),
    [editQuestion, setEditQuestion] = useState(0),
    [storageError, setStorageError] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);
  const active = game.boards
    .flatMap((b) => b.categories.flatMap((c) => c.questions))
    .find((q) => q.id === game.active);
  const board = game.boards[game.board],
    complete = board.categories.every((c) =>
      c.questions.every((q) => game.played.includes(q.id)),
    );
  function save(g: Game, explicit = false) {
    try {
      localStorage.setItem(KEY, JSON.stringify(g));
      setStorageError(false);
      if (explicit) setNotice("Spielstand gespeichert.");
    } catch {
      setStorageError(true);
    }
  }
  useEffect(() => {
    save(game);
  }, [game]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(t);
  }, [notice]);
  function changeScore(id: string, sign: number) {
    const delta = (active?.value ?? game.step) * sign;
    setGame((g) => ({
      ...g,
      teams: g.teams.map((t) =>
        t.id === id ? { ...t, score: t.score + delta } : t,
      ),
      history: [...g.history, { team: id, delta }],
    }));
  }
  function open(q: Question) {
    setGame((g) => ({ ...g, active: q.id }));
    setAnswer(false);
  }
  function close() {
    if (active)
      setGame((g) => ({
        ...g,
        active: null,
        played: [...new Set([...g.played, active.id])],
      }));
    setAnswer(false);
  }
  function reset() {
    if (
      confirm(
        "Neues Spiel starten? Alle Punkte und gespielten Felder werden zurückgesetzt. Fragen, Teams und Logo bleiben erhalten.",
      )
    ) {
      setGame((g) => ({
        ...g,
        teams: g.teams.map((t) => ({ ...t, score: 0 })),
        board: 0,
        played: [],
        active: null,
        history: [],
      }));
      setScreen("play");
    }
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setNotice("Vollbild ist in diesem Browser nicht verfügbar.");
    }
  }
  function exportJSON() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify({ boards: game.boards }, null, 2)], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "jugendhaus-fragen.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  async function importJSON(file?: File) {
    if (!file) return;
    try {
      const boards = validateBoards(JSON.parse(await file.text()));
      if (
        confirm(
          "Fragen ersetzen? Gespielte Felder werden zurückgesetzt; Team-Punkte bleiben erhalten.",
        )
      ) {
        setGame((g) => ({ ...g, boards, played: [], active: null }));
        setNotice("50 Fragen importiert.");
      }
    } catch (e) {
      setNotice(`Import fehlgeschlagen: ${(e as Error).message}`);
    }
    if (importRef.current) importRef.current.value = "";
  }
  const selected =
    game.boards[editBoard].categories[editCategory].questions[editQuestion];
  function editQ(p: Partial<Question>) {
    setGame((g) => ({
      ...g,
      boards: g.boards.map((b, bi) =>
        bi === editBoard
          ? {
              ...b,
              categories: b.categories.map((c, ci) =>
                ci === editCategory
                  ? {
                      ...c,
                      questions: c.questions.map((q, qi) =>
                        qi === editQuestion ? { ...q, ...p } : q,
                      ),
                    }
                  : c,
              ),
            }
          : b,
      ),
    }));
  }
  async function media(
    file: File | undefined,
    type: "image" | "video" | "audio" | "logo",
  ) {
    if (!file) return;
    if (
      !file.type.startsWith(
        type === "video" ? "video/" : type === "audio" ? "audio/" : "image/",
      )
    ) {
      setNotice("Bitte eine passende Mediendatei auswählen.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setNotice(
        "Datei zu groß zum Einbetten (max. 2 MB). Größere Medien unter public/media ablegen und lokalen Pfad eintragen.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (type === "logo")
        setGame((g) => ({ ...g, logo: String(reader.result) }));
      else editQ({ [type]: String(reader.result) });
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="app">
      <header>
        <div className="edition">
          JUBILÄUMS-EDITION <span>•</span> 40 JAHRE
        </div>
        <img className="logo" src={game.logo} alt="Jugendhaus Bad Imnau" />
        <div className="header-tools">
          <button onClick={() => void fullscreen()} title="Vollbildmodus">
            ⛶ <span>Vollbild</span>
          </button>
        </div>
        <h1>40 JAHRE JUGENDHAUS BAD IMNAU</h1>
      </header>
      <nav>
        <div className="tabs">
          <button
            className={screen === "play" ? "selected" : ""}
            onClick={() => setScreen("play")}
          >
            ▦ Spielboard
          </button>
          <button
            className={screen === "teams" ? "selected" : ""}
            onClick={() => setScreen("teams")}
          >
            ♙ Teams
          </button>
          <button
            className={screen === "editor" ? "selected" : ""}
            onClick={() => setScreen("editor")}
          >
            ✎ Frageneditor
          </button>
        </div>
        <div className="actions">
          <button onClick={() => save(game, true)}>Speichern</button>
          <button
            onClick={() => {
              setGame(load());
              setScreen("play");
              setNotice("Gespeichertes Spiel fortgesetzt.");
            }}
          >
            Fortsetzen
          </button>
          <button onClick={reset}>Neues Spiel</button>
        </div>
      </nav>
      {storageError && (
        <div className="warning" role="alert">
          Speichern fehlgeschlagen: Browserspeicher voll oder nicht verfügbar.
          Medien verkleinern und Fragen als JSON exportieren. Dieses Spiel
          bleibt nur bis zum Neuladen erhalten.
        </div>
      )}
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
      <main className={screen === "play" && !active ? "play-main" : ""}>
        {screen === "play" && (
          <>
            <div className="board-heading">
              <div>
                <div className="eyebrow">Das Jubiläums Jeoparty</div>
              </div>
              <div className="board-switch">
                {game.boards.map((b, i) => (
                  <button
                    key={i}
                    disabled={!!active}
                    aria-label={b.name}
                    className={game.board === i ? "selected" : ""}
                    onClick={() => {
                      if (
                        i === 1 &&
                        !complete &&
                        game.board === 0 &&
                        !confirm(
                          "Board 1 ist noch nicht vollständig gespielt. Trotzdem zu Board 2 wechseln?",
                        )
                      )
                        return;
                      setGame((g) => ({ ...g, board: i }));
                    }}
                  >
                    {b.name}
                    <span>{i === 0 ? "I" : "II"}</span>
                  </button>
                ))}
              </div>
            </div>
            {active ? (
              <section className="question-view" aria-label="Aktuelle Frage">
                <div className="question-meta">
                  <span>
                    {
                      board.categories.find((c) =>
                        c.questions.some((q) => q.id === active.id),
                      )?.name
                    }
                  </span>
                  <strong>{active.value} PUNKTE</strong>
                </div>
                <h2>{active.text}</h2>
                <QuestionMedia
                  key={`${active.id}-${active.image}-${active.audio}`}
                  question={active}
                  showAnswer={answer}
                />
                {answer && (
                  <div className="answer">
                    <small>DIE ANTWORT</small>
                    <p>{active.answer}</p>
                  </div>
                )}
                <div className="question-controls">
                  <button className="gold" onClick={() => setAnswer((v) => !v)}>
                    {answer ? "Antwort verbergen" : "Antwort anzeigen"}
                  </button>
                  <button onClick={close}>Zum Board ✓</button>
                </div>
              </section>
            ) : (
              <>
                <section className="board" aria-label={board.name}>
                  {board.categories.map((c, i) => (
                    <div className="category" key={i}>
                      <h3>{c.name}</h3>
                      {c.questions.map((q) => (
                        <button
                          key={q.id}
                          className={`tile ${game.played.includes(q.id) ? "played" : ""}`}
                          disabled={game.played.includes(q.id)}
                          onClick={() => open(q)}
                          aria-label={`${c.name}, ${q.value} Punkte${game.played.includes(q.id) ? ", gespielt" : ""}`}
                        >
                          {game.played.includes(q.id) ? (
                            <span className="check">✓</span>
                          ) : (
                            q.value
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
                </section>
                <div className="board-footer">
                  <span>
                    <i />{" "}
                    {
                      board.categories
                        .flatMap((c) => c.questions)
                        .filter((q) => game.played.includes(q.id)).length
                    }{" "}
                    von 25 Fragen gespielt
                  </span>
                  <span>
                    {complete
                      ? "Board abgeschlossen — bereit für die nächste Runde!"
                      : "Wählt ein Punktefeld. Schreibt Geschichte."}
                  </span>
                </div>
              </>
            )}
          </>
        )}
        {screen === "teams" && (
          <section className="panel">
            <div className="eyebrow">GEMEINSAM SPIELEN</div>
            <h2>Eure Teams. Euer Abend.</h2>
            <p>
              Zwei bis sechs Teams. Namen können jederzeit geändert werden,
              Punkte bleiben erhalten.
            </p>
            <div className="team-editor">
              {game.teams.map((t, i) => (
                <div key={t.id}>
                  <label>
                    Team {i + 1}
                    <input
                      maxLength={24}
                      value={t.name}
                      onChange={(e) =>
                        setGame((g) => ({
                          ...g,
                          teams: g.teams.map((team) =>
                            team.id === t.id
                              ? { ...team, name: e.target.value }
                              : team,
                          ),
                        }))
                      }
                    />
                  </label>
                  <button
                    disabled={game.teams.length <= 2 || !!active}
                    onClick={() => {
                      if (confirm(`${t.name} samt Punkten entfernen?`))
                        setGame((g) => ({
                          ...g,
                          teams: g.teams.filter((x) => x.id !== t.id),
                          history: g.history.filter((x) => x.team !== t.id),
                        }));
                    }}
                  >
                    Entfernen
                  </button>
                </div>
              ))}
            </div>
            <button
              className="gold"
              disabled={game.teams.length >= 6 || !!active}
              onClick={() =>
                setGame((g) => ({
                  ...g,
                  teams: [
                    ...g.teams,
                    {
                      id: crypto.randomUUID(),
                      name: `Team ${g.teams.length + 1}`,
                      score: 0,
                    },
                  ],
                }))
              }
            >
              + Team hinzufügen
            </button>
            <button onClick={() => setScreen("play")}>Zurück zum Spiel</button>
          </section>
        )}
        {screen === "editor" && (
          <section className="panel editor">
            <div className="editor-heading">
              <div>
                <div className="eyebrow">DER ABEND IST EUER</div>
                <h2>Fragen & Geschichten</h2>
              </div>
              <div>
                <button onClick={exportJSON}>JSON exportieren</button>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Neue Jubiläumsfragen laden? Eigene Fragen werden ersetzt. Bitte vorher als JSON exportieren. Punkte bleiben erhalten, gespielte Felder werden zurückgesetzt.",
                      )
                    ) {
                      setGame((g) => ({
                        ...g,
                        boards: freshGame().boards,
                        played: [],
                        active: null,
                      }));
                      setAnswer(false);
                      setNotice("Neues Jubiläums-Fragenset geladen.");
                    }
                  }}
                >
                  Neue Jubiläumsfragen laden
                </button>
                <button onClick={() => importRef.current?.click()}>
                  JSON importieren
                </button>
                <input
                  ref={importRef}
                  hidden
                  type="file"
                  accept="application/json,.json"
                  onChange={(e) => void importJSON(e.target.files?.[0])}
                />
              </div>
            </div>
            <p>
              Vor der Veranstaltung alle Fragen und Medien prüfen. Bei der
              Mitgliederfrage bitte den Bezugszeitpunkt ergänzen; bei den Songs
              fehlt noch die abspielbare Journey-Datei (Song 5).
            </p>
            <div className="editor-selects">
              <label>
                Board
                <select
                  value={editBoard}
                  onChange={(e) => setEditBoard(Number(e.target.value))}
                >
                  {game.boards.map((b, i) => (
                    <option key={i} value={i}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Kategorie
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(Number(e.target.value))}
                >
                  {game.boards[editBoard].categories.map((c, i) => (
                    <option key={i} value={i}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Frage
                <select
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(Number(e.target.value))}
                >
                  {game.boards[editBoard].categories[
                    editCategory
                  ].questions.map((q, i) => (
                    <option key={i} value={i}>
                      {i + 1} · {q.value} Punkte
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="edit-grid">
              <label>
                Kategoriename
                <input
                  value={game.boards[editBoard].categories[editCategory].name}
                  onChange={(e) =>
                    setGame((g) => ({
                      ...g,
                      boards: g.boards.map((b, i) =>
                        i === editBoard
                          ? {
                              ...b,
                              categories: b.categories.map((c, j) =>
                                j === editCategory
                                  ? { ...c, name: e.target.value }
                                  : c,
                              ),
                            }
                          : b,
                      ),
                    }))
                  }
                />
              </label>
              <label>
                Punkte
                <input
                  type="number"
                  min="1"
                  max="100000"
                  value={selected.value}
                  onChange={(e) =>
                    editQ({
                      value: Math.min(
                        100000,
                        Math.max(1, Math.round(Number(e.target.value))),
                      ),
                    })
                  }
                />
              </label>
              <label>
                Fragetext
                <textarea
                  rows={3}
                  value={selected.text}
                  onChange={(e) => editQ({ text: e.target.value })}
                />
              </label>
              <label>
                Antwort
                <textarea
                  rows={3}
                  value={selected.answer}
                  onChange={(e) => editQ({ answer: e.target.value })}
                />
              </label>
              <label className="reveal-option">
                Bild langsam enthüllen
                <input
                  type="checkbox"
                  checked={selected.reveal ?? false}
                  onChange={(e) => editQ({ reveal: e.target.checked })}
                />
              </label>
              {selected.reveal && (
                <label>
                  Enthüllungsdauer in Sekunden
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={selected.revealSeconds ?? 60}
                    onChange={(e) =>
                      editQ({
                        revealSeconds: Math.max(
                          5,
                          Math.min(180, Number(e.target.value)),
                        ),
                      })
                    }
                  />
                </label>
              )}
              {(["image", "video", "audio"] as const).map((type) => (
                <div key={type}>
                  <label>
                    {type === "image"
                      ? "Bild"
                      : type === "audio"
                        ? "MP3 / Audio"
                        : "Video"}{" "}
                    lokal hinzufügen
                    <input
                      type="file"
                      accept={`${type}/*`}
                      onChange={(e) => void media(e.target.files?.[0], type)}
                    />
                  </label>
                  <label>
                    Oder lokaler Pfad (public/media)
                    <input
                      placeholder={`/media/${type === "image" ? "foto.jpg" : type === "audio" ? "song.mp3" : "film.mp4"}`}
                      defaultValue={
                        selected[type]?.startsWith("/media/")
                          ? selected[type]
                          : ""
                      }
                      key={`${selected.id}-${type}`}
                      onBlur={(e) => {
                        if (!e.target.value) return;
                        if (validMedia(e.target.value, type))
                          editQ({ [type]: e.target.value });
                        else setNotice("Nur lokale /media/-Pfade erlaubt.");
                      }}
                    />
                  </label>
                  {selected[type] && (
                    <button onClick={() => editQ({ [type]: undefined })}>
                      Medium entfernen
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="logo-editor">
              <label>
                Originales Jugendhaus-Logo hochladen
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => void media(e.target.files?.[0], "logo")}
                />
              </label>
              <p>
                Das Logo wird lokal gespeichert und auf allen Ansichten
                angezeigt. Standardmäßig ist das Jugendhaus-Logo aus
                media/logo.png fest eingebunden. Ein Upload ersetzt es nur in
                diesem Browser.
              </p>
            </div>
          </section>
        )}
      </main>
      <Scoreboard
        game={game}
        active={active}
        storageError={storageError}
        setGame={setGame}
        changeScore={changeScore}
      />
    </div>
  );
}
