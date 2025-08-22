import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    trace: 'on-first-retry',        // simpan trace kalau test fail
    screenshot: 'only-on-failure',  // screenshot otomatis kalau fail
    video: 'retain-on-failure',     // simpan video hanya kalau fail
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
