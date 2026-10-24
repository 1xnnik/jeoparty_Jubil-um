import { test, expect } from "@playwright/test";
test("manual scoring, answered questions, persistence and board change", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".tile")).toHaveCount(25);
  await page
    .getByRole("button", { name: "Kreuz & quer, 300 Punkte", exact: true })
    .click();
  await expect(page.locator(".question-view")).toBeVisible();
  await page
    .getByRole("button", { name: "JZ Punkte hinzufügen", exact: true })
    .click();
  await expect(page.locator(".score").first()).toHaveText("300");
  await page
    .getByRole("button", { name: "Antwort anzeigen", exact: true })
    .click();
  await expect(page.locator(".answer")).toContainText("World Wide Web");
  await expect(page.locator(".score").first()).toHaveText("300");
  await page
    .getByRole("button", { name: "JZ Punkte abziehen", exact: true })
    .click();
  await page
    .getByRole("button", { name: "JZ Punkte abziehen", exact: true })
    .click();
  await expect(page.locator(".score").first()).toHaveText("-300");
  await page
    .getByRole("button", { name: "JZ Punkte hinzufügen", exact: true })
    .click();
  await expect(page.locator(".score").first()).toHaveText("0");
  await page.getByRole("button", { name: "Zum Board ✓" }).click();
  await expect(page.locator(".played")).toHaveCount(1);
  await page
    .getByRole("combobox", { name: "Punkteschritt" })
    .selectOption("500");
  await page
    .getByRole("button", { name: "JZ Punkte hinzufügen", exact: true })
    .click();
  await page.reload();
  await expect(page.locator(".score").first()).toHaveText("500");
  await expect(page.locator(".played")).toHaveCount(1);
  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Board 2", exact: true }).click();
  await expect(page.locator(".category h3").first()).toHaveText("Schätz mal!");
  await expect(page.locator(".score").first()).toHaveText("500");
  const footer = await page.locator(".scoreboard").boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(1081);
});
test("editor, teams, JSON import validation and reset safety", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "♙ Teams" }).click();
  await page.getByLabel("Team 1", { exact: true }).fill("JUGEND");
  await page.getByRole("button", { name: "+ Team hinzufügen" }).click();
  await expect(page.locator(".team-card")).toHaveCount(5);
  await page.getByRole("button", { name: "✎ Frageneditor" }).click();
  await page.getByLabel("Kategoriename").fill("Unsere Geschichten");
  await page
    .getByRole("textbox", { name: "Fragetext", exact: true })
    .fill("Wer feiert heute?");
  await page
    .getByRole("textbox", { name: "Antwort", exact: true })
    .fill("Wir alle!");
  await page
    .locator('input[type=file][accept="application/json,.json"]')
    .setInputFiles({
      name: "bad.json",
      mimeType: "application/json",
      buffer: Buffer.from("{}"),
    });
  await expect(page.getByRole("status")).toContainText("Import fehlgeschlagen");
  await page.getByRole("button", { name: "▦ Spielboard" }).click();
  await page
    .getByRole("button", {
      name: "Unsere Geschichten, 100 Punkte",
      exact: true,
    })
    .click();
  await expect(page.locator(".question-view h2")).toHaveText(
    "Wer feiert heute?",
  );
  await page
    .getByRole("button", { name: "Antwort anzeigen", exact: true })
    .click();
  await expect(page.locator(".answer")).toContainText("Wir alle!");
  await page
    .getByRole("button", { name: "JUGEND Punkte hinzufügen", exact: true })
    .click();
  page.once("dialog", (d) => d.dismiss());
  await page.getByRole("button", { name: "Neues Spiel", exact: true }).click();
  await expect(page.locator(".score").first()).toHaveText("100");
  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Neues Spiel", exact: true }).click();
  await expect(page.locator(".score").first()).toHaveText("0");
  await expect(page.locator(".category h3").first()).toHaveText(
    "Unsere Geschichten",
  );
});
test("local-only assets, mobile layout and reduced question controls", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (
      !r.url().startsWith("http://127.0.0.1:5173") &&
      !r.url().startsWith("data:")
    )
      external.push(r.url());
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Kreuz & quer, 100 Punkte", exact: true })
    .click();
  await expect(page.getByRole("timer")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Sound|Countdown|Rückgängig/ }),
  ).toHaveCount(0);
  await expect(
    page.getByText("Das Jubiläums Jeoparty", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Vier Jahrzehnte.", { exact: false }),
  ).toHaveCount(0);
  await expect(
    page.getByText("Bühne frei für euer Wissen.", { exact: true }),
  ).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await expect(
    page.getByRole("button", { name: "JZ Punkte hinzufügen", exact: true }),
  ).toBeInViewport();
  expect(external).toEqual([]);
  await page.screenshot({ path: "/tmp/jeopardy-mobile.png", fullPage: true });
});

test("question export/import round trip and persistent local logo", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "✎ Frageneditor" }).click();
  const downloading = page.waitForEvent("download");
  await page.getByRole("button", { name: "JSON exportieren" }).click();
  const download = await downloading;
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const data = JSON.parse(Buffer.concat(chunks).toString());
  expect(
    data.boards.flatMap((b: any) =>
      b.categories.flatMap((c: any) => c.questions),
    ),
  ).toHaveLength(50);
  data.boards[1].categories[0].name = "Importierte Kategorie";
  data.boards[0].categories[0].questions[0].image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=";
  page.once("dialog", (d) => d.accept());
  await page
    .locator('input[type=file][accept="application/json,.json"]')
    .setInputFiles({
      name: "fragen.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(data)),
    });
  await expect(page.getByRole("status")).toContainText("50 Fragen importiert");
  await page.getByLabel("Originales Jugendhaus-Logo hochladen").setInputFiles({
    name: "logo.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      data.boards[0].categories[0].questions[0].image.split(",")[1],
      "base64",
    ),
  });
  await expect(page.locator(".logo")).toHaveAttribute(
    "src",
    /^data:image\/png;base64,/,
  );
  await page.reload();
  await expect(page.locator(".logo")).toHaveAttribute(
    "src",
    /^data:image\/png;base64,/,
  );
  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Board 2", exact: true }).click();
  await expect(page.locator(".category h3").first()).toHaveText(
    "Importierte Kategorie",
  );
});

test("person pictures reveal slowly, pause, restart and show the answer without scoring", async ({
  page,
}) => {
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
    "base64",
  );
  await page.route("**/media/personen/**", (route) =>
    route.fulfill({ contentType: "image/png", body: png }),
  );
  await page.clock.install();
  await page.goto("/");
  await page
    .getByRole("button", { name: "Wer ist das?, 500 Punkte", exact: true })
    .click();
  const picture = page.getByAltText("Gesuchte Person");
  await expect(picture).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Enthüllung pausieren", exact: true }),
  ).toBeEnabled();
  await page.clock.runFor(10000);
  const blur = () =>
    picture.evaluate((el) =>
      Number(getComputedStyle(el).filter.match(/[\d.]+/)?.[0]),
    );
  const partial = await blur();
  expect(partial).toBeLessThan(40);
  expect(partial).toBeGreaterThan(30);
  await page
    .getByRole("button", { name: "Enthüllung pausieren", exact: true })
    .click();
  const paused = await blur();
  await page.clock.runFor(10000);
  expect(await blur()).toBeCloseTo(paused, 1);
  await page
    .getByRole("button", { name: "Bild zurücksetzen", exact: true })
    .click();
  expect(await blur()).toBe(45);
  await page
    .getByRole("button", { name: "Bild langsam enthüllen", exact: true })
    .click();
  await page.clock.runFor(61000);
  expect(await blur()).toBe(0);
  await page
    .getByRole("button", { name: "Antwort anzeigen", exact: true })
    .click();
  await expect(page.locator(".answer")).toContainText("Leon");
  await expect(page.locator(".score").first()).toHaveText("0");
  await page.getByRole("button", { name: "Zum Board ✓" }).click();
  await page
    .getByRole("button", { name: "Wer ist das?, 100 Punkte", exact: true })
    .click();
  expect(await blur()).toBeGreaterThan(40);
});

test("local audio plays only on request and stops on closing the question", async ({
  page,
}) => {
  // A generated silent WAV exercises the player without distributing music.
  const samples = 44100 * 3;
  const wav = Buffer.alloc(44 + samples * 2);
  wav.write("RIFF", 0);
  wav.writeUInt32LE(wav.length - 8, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(44100, 24);
  wav.writeUInt32LE(88200, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(samples * 2, 40);
  await page.route("**/media/songs/**", (route) =>
    route.fulfill({ contentType: "audio/wav", body: wav }),
  );
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Was ist das für ein Song?, 100 Punkte",
      exact: true,
    })
    .click();
  const audio = page.locator("audio");
  expect(
    await audio.evaluate((el: HTMLAudioElement) => el.paused),
  ).toBeTruthy();
  await audio.evaluate((el: HTMLAudioElement) => el.play());
  expect(await audio.evaluate((el: HTMLAudioElement) => el.paused)).toBeFalsy();
  await page.getByRole("button", { name: "Zum Board ✓" }).click();
  await expect(audio).toHaveCount(0);
  await expect(page.locator(".score").first()).toHaveText("0");
});

test("new question set preserves saved edits until confirmed and exports media settings", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "JZ Punkte hinzufügen", exact: true })
    .click();
  await page.getByRole("button", { name: "✎ Frageneditor" }).click();
  await page.getByLabel("Kategoriename").fill("Eigene Fragen");
  page.once("dialog", (d) => d.dismiss());
  await page
    .getByRole("button", { name: "Neue Jubiläumsfragen laden", exact: true })
    .click();
  await expect(page.getByLabel("Kategoriename")).toHaveValue("Eigene Fragen");
  page.once("dialog", (d) => d.accept());
  await page
    .getByRole("button", { name: "Neue Jubiläumsfragen laden", exact: true })
    .click();
  await expect(page.getByLabel("Kategoriename")).toHaveValue("Wer ist das?");
  await expect(page.locator(".score").first()).toHaveText("100");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "JSON exportieren" }).click();
  const stream = await (await pending).createReadStream();
  const chunks: Buffer[] = [];
  for await (const c of stream) chunks.push(Buffer.from(c));
  const data = JSON.parse(Buffer.concat(chunks).toString());
  expect(
    data.boards[0].categories[0].questions.map((q: any) => q.answer),
  ).toEqual([
    "Matthias Steiner",
    "Wolfgang Grupp",
    "Thomas Müller",
    "Wolfgang Petry",
    "Leon",
  ]);
  expect(data.boards[0].categories[0].questions[0].revealSeconds).toBe(60);
  expect(
    data.boards[0].categories[1].questions.filter((q: any) => q.audio),
  ).toHaveLength(5);
  page.once("dialog", (d) => d.accept());
  await page
    .locator('input[type=file][accept="application/json,.json"]')
    .setInputFiles({
      name: "questions.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(data)),
    });
  await expect(page.getByRole("status")).toContainText("50 Fragen importiert");
  await expect(
    page.getByLabel("Bild langsam enthüllen", { exact: true }),
  ).toBeChecked();
  data.boards[0].categories[1].questions[0].audio =
    "https://example.com/song.mp3";
  await page
    .locator('input[type=file][accept="application/json,.json"]')
    .setInputFiles({
      name: "external.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(data)),
    });
  await expect(page.getByRole("status")).toContainText("Import fehlgeschlagen");
});

test("legacy default save automatically gets music, reveal and history without losing points", async ({
  page,
}) => {
  const { legacyBoards } = await import("../src/legacyQuestions");
  await page.addInitScript((boards) => {
    localStorage.setItem(
      "bad-imnau-jeopardy-v1",
      JSON.stringify({
        boards,
        teams: [
          { id: "a", name: "ALTE TEAMS", score: 700 },
          { id: "b", name: "GAST", score: -200 },
        ],
        board: 1,
        played: ["0-0-0"],
        active: null,
        step: 200,
        history: [],
        logo: "/logo.svg",
      }),
    );
  }, legacyBoards);
  await page.goto("/");
  await expect(page.locator(".category h3").nth(1)).toHaveText(
    "Was ist das für ein Song?",
  );
  await expect(page.locator(".score").first()).toHaveText("700");
  await page
    .getByRole("button", {
      name: "Was ist das für ein Song?, 500 Punkte",
      exact: true,
    })
    .click();
  await expect(page.locator("audio")).toHaveAttribute(
    "src",
    "/media/songs/song-5.mp3",
  );
  await page.getByRole("button", { name: "Zum Board ✓" }).click();
  await page
    .getByRole("button", {
      name: "Jugendhaus-Geschichte, 200 Punkte",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Antwort anzeigen", exact: true })
    .click();
  await expect(page.locator(".answer")).toContainText("2015");
  expect(
    await page.evaluate(
      () =>
        !!localStorage.getItem("bad-imnau-jeopardy-v1-before-question-update"),
    ),
  ).toBeTruthy();
});

test("custom old save offers a visible update and backs up edits before replacement", async ({
  page,
}) => {
  const { legacyBoards } = await import("../src/legacyQuestions");
  const boards = structuredClone(legacyBoards);
  boards[0].categories[0].questions[0].text = "Meine eigene Frage";
  await page.addInitScript((boards) => {
    localStorage.setItem(
      "bad-imnau-jeopardy-v1",
      JSON.stringify({
        boards,
        teams: [
          { id: "a", name: "MEIN TEAM", score: 900 },
          { id: "b", name: "ZWEITES TEAM", score: 0 },
        ],
        board: 0,
        played: [],
        active: null,
        step: 100,
        history: [],
        logo: "/logo.svg",
      }),
    );
  }, boards);
  await page.goto("/");
  await expect(
    page.getByRole("region", { name: "Neue Fragen verfügbar" }),
  ).toBeVisible();
  page.once("dialog", (d) => d.accept());
  await page
    .getByRole("button", {
      name: "Musik-, Bild- und Jugendhaus-Fragen laden",
      exact: true,
    })
    .click();
  await expect(page.locator(".category h3").first()).toHaveText("Wer ist das?");
  await expect(page.locator(".score").first()).toHaveText("900");
  expect(
    await page.evaluate(
      () =>
        JSON.parse(
          localStorage.getItem("bad-imnau-jeopardy-v1-before-question-update")!,
        ).boards[0].categories[0].questions[0].text,
    ),
  ).toBe("Meine eigene Frage");
});
