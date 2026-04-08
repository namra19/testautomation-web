import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail build on test.only in CI */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,

  /* Let Playwright choose optimal workers (based on CPU cores) */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter configuration */
 reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: false,    // captures attachments, steps automatically if present
      suiteTitle: true
    }],
  ],

  /* Shared test options */
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true,
    video: 'off',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },

  /* Browser projects for full coverage */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Start local server before tests */
  webServer: {
    command: 'npx serve -p 3000 build',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});