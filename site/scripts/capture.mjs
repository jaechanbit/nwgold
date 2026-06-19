import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "screenshots");
const url = process.env.SITE_URL ?? "http://127.0.0.1:4321/";

await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function capture(name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.setDefaultTimeout(15_000);
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.evaluate(async () => {
    const step = Math.max(400, Math.floor(window.innerHeight * 0.75));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2_000);

  await page.screenshot({ path: path.join(output, `${name}-full.png`), fullPage: true, animations: "disabled", timeout: 90_000 });
  await page.screenshot({ path: path.join(output, `${name}-top.png`), animations: "disabled", timeout: 30_000 });

  return {
    name,
    viewport,
    pageSize: await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    })),
    errors,
  };
}

const results = [];
const target = process.env.CAPTURE ?? "all";
if (target === "all" || target === "desktop") {
  results.push(await capture("desktop", { width: 1080, height: 800 }));
}
if (target === "all" || target === "mobile") {
  results.push(await capture("mobile", { width: 390, height: 844 }));
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
