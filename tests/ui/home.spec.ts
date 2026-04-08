import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '../../fixtures/auth.fixture';
import { playAudit } from 'playwright-lighthouse';
import { chromium } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Home Page Content Validation Tests', () => {

  // Verify main content is visible and not empty after login
  test('@smoke Verify main content of home page is visible and not empty after login', async ({ loginAs, page }) => {
    const homePage = new HomePage(page);
    await loginAs('adminLogin');
    const mainContent = homePage.getMainContentLocator();

    await expect(mainContent).toBeVisible();
    const textContent: string | null = await mainContent.textContent();
    expect(textContent?.trim().length).toBeGreaterThan(0);
  });


  // Accessibility test for home page
    test('@regression Home page should have no accessibility violations', async ({ loginAs, page }) => {
        await loginAs('user1Login');
        const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    
    // Lighthouse audit for home page
    test('@regression lighthouse audit', async ({ loginAs, page }) => {
        const port = 9222;

        const browser = await chromium.launch({
          headless: true,
          args: [`--remote-debugging-port=${port}`],
        });
        await loginAs('user1Login');
        const context = await browser.newContext();

        // wait for page to fully settle
        await page.waitForLoadState('networkidle');

        await playAudit({
          page,
          port,
          thresholds: {
            performance: 80,
            accessibility: 90,
          },
        });

        await browser.close();
      });
    
});