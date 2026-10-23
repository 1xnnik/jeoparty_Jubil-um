import { test, expect } from "@playwright/test";
test("manual scoring, undo, answered questions, persistence and board change", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".tile")).toHaveCount(25);
  await page
    .getByRole("button", { name: "Unser Jugendhaus, 300 Punkte", exact: true })
    .click();
  await expect(page.locator(".question-view")).toBeVisible();
  await page
    .getByRole("button", { name: "JZ Punkte hinzufügen", exact: true })
    .click();
  await expect(page.locator(".score").first()).toHaveText("300");
  await page
    .getByRole("button", { name: "Antwort anzeigen", exact: true })
    .click();
  await expect(page.locator(".answer")).toContainText("Eingetragener Verein");
  await expect(page.locator(".score").first()).toHaveText("300");
  await page
    .getByRole("button", { name: "JZ Punkte abziehen", exact: true })
    .click();
  await page
    .getByRole("button", { name: "JZ Punkte abziehen", exact: true })
    .click();
  await expect(page.locator(".score").first()).toHaveText("-300");
  await page.getByRole("button", { name: "↶ Rückgängig" }).click();
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
  await expect(page.locator(".category h3").first()).toHaveText(
    "40 Jahre zusammen",
  );
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
  await page.getByRole("textbox", { name: "Fragetext", exact: true }).fill("Wer feiert heute?");
  await page.getByRole("textbox", { name: "Antwort", exact: true }).fill("Wir alle!");
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
test("local-only assets, mobile layout and countdown", async ({ page }) => {
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
    .getByRole("button", { name: "Unser Jugendhaus, 100 Punkte", exact: true })
    .click();
  await page.getByLabel("Sekunden", { exact: true }).fill("1");
  await page
    .getByRole("button", { name: "Countdown starten", exact: true })
    .click();
  await expect(page.getByRole("timer")).toHaveText("0:00");
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

test('question export/import round trip and persistent local logo', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '✎ Frageneditor' }).click();
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'JSON exportieren' }).click();
  const download = await downloading;
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const data = JSON.parse(Buffer.concat(chunks).toString());
  expect(data.boards.flatMap((b: any) => b.categories.flatMap((c: any) => c.questions))).toHaveLength(50);
  data.boards[1].categories[0].name = 'Importierte Kategorie';
  data.boards[0].categories[0].questions[0].image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
  page.once('dialog', d => d.accept());
  await page.locator('input[type=file][accept="application/json,.json"]').setInputFiles({name:'fragen.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
  await expect(page.getByRole('status')).toContainText('50 Fragen importiert');
  await page.getByLabel('Originales Jugendhaus-Logo hochladen').setInputFiles({name:'logo.png',mimeType:'image/png',buffer:Buffer.from(data.boards[0].categories[0].questions[0].image.split(',')[1],'base64')});
  await expect(page.locator('.logo')).toHaveAttribute('src',/^data:image\/png;base64,/);
  await page.reload();
  await expect(page.locator('.logo')).toHaveAttribute('src',/^data:image\/png;base64,/);
  page.once('dialog', d => d.accept());
  await page.getByRole('button',{name:'Board 2',exact:true}).click();
  await expect(page.locator('.category h3').first()).toHaveText('Importierte Kategorie');
});
