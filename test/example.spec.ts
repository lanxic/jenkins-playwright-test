import { test, expect } from '@playwright/test';

test('Wikipedia search works', async ({ page }) => {
  await page.goto('https://wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);
});
