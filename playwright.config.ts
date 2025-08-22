import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    headless: true,   // kalau mau lihat browser ganti ke false
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
