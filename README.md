# testautomation-web

This repository contains automated tests for a JavaScript Single Page Application.

## Framework Description
This is a robust **Playwright + TypeScript** test automation framework for end-to-end testing of web applications. The JavaScript Single Page Application (SPA) under test is included in this repository, so there is no need to set up the app separately. It follows modern automation best practices, ensuring reliability, maintainability, and scalability.

You can run the tests directly on the included application without setting up a separate server.

## Getting Started

### Pre-requisites
- Node.js  
- npm  
- Git  

### Installation
```bash
# Clone the repository
git clone https://github.com/namra19/testautomation-web.git
cd testautomation-web

# Install npm packages
npm install

# Install Playwright and required browsers
npm install playwright --save-dev
npx playwright install

# Install TypeScript
npm install typescript --save-dev
```

### Environment Setup

- Create a .env file in the root directory:
```bash
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=****
BASE_URL=http://localhost:3000/
USER1_EMAIL=******gmail.com
USER1_PASSWORD=******
USER2_EMAIL=******@growdev.com.br
USER2_PASSWORD=******
```

### Running Tests
```bash
# Run all tests (headless):

npx playwright test

# Run tests in headed mode for debugging:

npx playwright test --headed

# Run tests in Playwright UI mode:

npx playwright test --ui

# Run tests in a specific browser:

npx playwright test --project=firefox

# Run a specific test file:

npx playwright test tests/login.spec.ts
```

### Test Reports & Screenshots

- Screenshots are saved on test failures in test-results/.
- Generate and view Allure reports:
```bash
allure open allure-report

or serve locally:

npx serve allure-report
```

### Project Structure
```
├── playwright.yml.         # CI configuration
├── allure-reports/         # Allure reports
├── build.                  # Javascript application
├── fixtures/               # Reusable setup and teardown
├── page-objects/           # Page Object Models
├── tests/                  # Test files
│   ├── login.spec.ts       # Login test cases
│   ├── signout.spec.ts     # Signout test cases
│   ├──navigation.spec.ts   # Navigation test cases
    ├── session.spec.ts.    # Session management test cases
    ├── content.spec.ts.    # Content management test cases
├── utils/                  # Helper functions, Test Data and URLs
├── reports/                # Test reports
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
└── .env                    # Environment variables
```

### CI Integration

The test automation framework is fully integrated with **GitHub Actions**.  
- Tests run automatically on merge to main.
- Reports and test results can be downloaded from GitHub. 

## Test Coverage
- Login Tests: Positive and negative scenarios to validate authentication.
- Signout Tests: Ensure proper session termination.
- Navigation Tests: Check navigation menu links redirect correctly
- Session Management Tests: Validate session expiry and persistence on refresh.
- Content Validation Tests: Ensure main content is visible and home page is accessible.

## Notes
- Some tests may intentionally fail due to current application behavior mismatches.

## Framework Features
- Page Object Model (POM): Clean, maintainable, and reusable code structure.
- Allure Reporting: Generate comprehensive and interactive test reports.
- Parallel Testing: Run tests concurrently for faster execution.
- Cross-Browser Testing: Supports Chromium, Firefox, and WebKit.
- CI Integration: Seamlessly integrates with GitHub Actions for continuous testing.
- Test Tagging: Easily categorize and execute specific test groups (Smoke and Regression).
- Environment Configurations: Easily switch between different environments using .env files.
- Accessibility Testing: Validate web accessibility standards.
- Performance Testing: Measure performance metrics and identify bottlenecks.
- Functional Testing: Verify end-to-end application functionality.