import { test, expect } from '@playwright/test';

test.describe('Example Test with Screenshot & Video', () => {

  test('should open Playwright website and check title', async ({ page }) => {
    // Rekam video otomatis
    await page.goto('https://playwright.dev/');

    // Assertion contoh
    await expect(page).toHaveTitle(/Playwright/);

    // Screenshot manual (selain screenshot otomatis saat fail)
    await page.screenshot({ path: `test-results/screenshot-home.png`, fullPage: true });
  });

  test('should fail to demonstrate report', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Ini akan FAIL karena title berbeda
    await expect(page).toHaveTitle(/Something Wrong/);
  });
});
