import { test, expect } from '@playwright/test';

test('Cek halaman Wikipedia', async ({ page }) => {
  await page.goto('https://wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);

  await page.click('text=English');
  await expect(page).toHaveURL(/en.wikipedia.org/);

  const searchBox = page.locator('input[name="search"]');
  await expect(searchBox).toBeVisible();

  await searchBox.fill('Playwright');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/Playwright/);
});
