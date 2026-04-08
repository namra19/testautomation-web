// import { defineConfig, devices } from '@playwright/test';


// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,

//   /* Opt out of parallel tests on CI. */
//   ...(process.env.CI ? { workers: 1 } : {}),
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: [
//     ['line'],
//     ['html'],
//     ['allure-playwright', { outputFolder: 'allure-results' }]
//   ],
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use:  {
//       //  ...devices['Desktop Chrome'],
//         baseURL: process.env.BASE_URL,
//         screenshot: 'only-on-failure',
//         trace: 'on-first-retry',
//         headless: true,
//         video: "retain-on-failure"
//       },
     

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     // {
//     //   name: 'firefox',
//     //   use: { ...devices['Desktop Firefox'] },
//     // },

//     // {
//     //   name: 'webkit',
//     //   use: { ...devices['Desktop Safari'] },
//     // },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],
//   workers:1,

//   /*  Start your local dev server automatically before tests */
//   webServer: {
//     command: 'npx serve -p 3000 build',   // start your JS website
//     port: 3000,                     // port your site runs on
//     reuseExistingServer: !process.env.CI, // reuse if already running locally
//     timeout: 120 * 1000,            // wait max 2 minutes for server to start
//   },
// });



// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   testDir: './tests',
  
//   /* Run tests in files in parallel */
//   fullyParallel: true,
  
//   /* Fail the build on CI if test.only is left in the source */
//   //forbidOnly: !!process.env.CI,
  
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,

//   /* Limit workers on CI */
//   workers: process.env.CI ? 1 : undefined,

//   /* Reporter configuration */
//   reporter: [
//     ['line'], 
//     ['html', { open: 'never' }], 
//     ['allure-playwright', { outputFolder: 'allure-results' }]
//   ],

//   /* Shared test options */
//   use: {
//     baseURL: process.env.BASE_URL,
//     screenshot: 'only-on-failure',
//     trace: 'on-first-retry',
//     headless: true,
//     //video: 'retain-on-failure',
//     // ...devices['Desktop Chrome'], // optional if you want default device
//   },

//   /* Browser projects */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//    // Uncomment if you want other browsers
//     // {
//     //   name: 'firefox',
//     //   use: { ...devices['Desktop Firefox'] },
//     // },
//     // {
//     //   name: 'webkit',
//     //   use: { ...devices['Desktop Safari'] },
//     // },
//   ],

//   /* Start local server before tests */
//   webServer: {
//     command: 'npx serve -p 3000 build', // serve your JS website
//     port: 3000,
//     reuseExistingServer: !process.env.CI,
//     timeout: 120 * 1000, // wait up to 2 minutes
//   },
// });


// playwright.config.ts
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
  workers: undefined, // or process.env.CI ? 4 : undefined for explicit number

  /* Reporter configuration */
 reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,    // captures attachments, steps automatically if present
      suiteTitle: true
    }],
  ],

  /* Shared test options */
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true,
    video: 'retain-on-failure',
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