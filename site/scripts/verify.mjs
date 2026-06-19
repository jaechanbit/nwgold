import { chromium } from "playwright";

const url = process.env.SITE_URL ?? "http://127.0.0.1:4321/";
const browser = await chromium.launch({ headless: true });
const results = [];

for (const width of [390, 768, 1080]) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const layout = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  if (layout.scrollWidth > layout.innerWidth) {
    throw new Error(`${width}px에서 가로 넘침 발생: ${layout.scrollWidth}px`);
  }
  if (errors.length) throw new Error(`${width}px 브라우저 오류: ${errors.join(" | ")}`);

  if (width === 390) {
    await page.locator(".menu-button").click();
    if ((await page.locator(".menu-button").getAttribute("aria-expanded")) !== "true") {
      throw new Error("모바일 메뉴가 열리지 않음");
    }
  }

  await page.locator('.filter-button[data-filter="순금"]').click();
  const visibleGoldProducts = await page.locator('.product-card[data-category="순금"]:not([hidden])').count();
  const visibleOtherProducts = await page.locator('.product-card:not([data-category="순금"]):not([hidden])').count();
  if (visibleGoldProducts !== 2 || visibleOtherProducts !== 0) {
    throw new Error(`${width}px 상품 필터 결과가 올바르지 않음`);
  }

  await page.getByRole("button", { name: "순금 체인 팔찌 상세 보기", exact: true }).click();
  if (!(await page.locator("[data-product-dialog]").isVisible())) {
    throw new Error(`${width}px 상품 상세창이 열리지 않음`);
  }

  results.push({ width, layout, errors, interactions: "passed" });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
