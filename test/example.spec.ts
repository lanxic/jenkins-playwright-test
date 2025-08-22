import { test, expect } from '@playwright/test';

test('Cek halaman Wikipedia', async ({ page }) => {
  // buka website
  await page.goto('https://wikipedia.org');

  // cek judul halaman
  await expect(page).toHaveTitle(/Wikipedia/);

  // klik link English
  await page.click('text=English');

  // cek URL berubah ke en.wikipedia.org
  await expect(page).toHaveURL(/en.wikipedia.org/);

  // cek ada search box
  const searchBox = page.locator('input[name="search"]');
  await expect(searchBox).toBeVisible();

  // isi search box dan tekan Enter
  await searchBox.fill('Playwright');
  await page.keyboard.press('Enter');

  // cek halaman hasil pencarian
  await expect(page).toHaveURL(/Playwright/);
});
