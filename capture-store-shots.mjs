import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';

const outputDir = path.resolve('../../outputs/appstore-screenshots');
await fs.mkdir(outputDir, { recursive: true });
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

async function capture(name, width, height, scale, searchQuery = '') {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: scale,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('hvac_guest_entered', 'yes'));
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  if (searchQuery) {
    const input = page.locator('input[placeholder^="Tìm kiếm mã lỗi"]');
    await input.fill(searchQuery);
    await new Promise(resolve => setTimeout(resolve, 350));
  }
  await page.screenshot({ path: path.join(outputDir, name), fullPage: false });
  await page.close();
}

await capture('iphone-home.png', 402, 874, 3);
await capture('iphone-search-e1.png', 402, 874, 3, 'E1');
await capture('ipad-home.png', 1032, 1376, 2);
await capture('ipad-search-e1.png', 1032, 1376, 2, 'E1');
await browser.close();
console.log(outputDir);
