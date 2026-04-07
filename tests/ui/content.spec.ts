import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '../../fixtures/auth.fixture';
import { playAudit } from 'playwright-lighthouse';
import { chromium } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Content Validation Test', () => {

  // Verify main content is visible and not empty after login
  test('@smoke Verify main content is visible and not empty after login', async ({ loginAs, page }) => {
    const homePage = new HomePage(page);
    await loginAs('adminLogin');
    const mainContent = homePage.mainContentLocator();

    await expect(mainContent).toBeVisible();
    const textContent: string | null = await mainContent.textContent();
    expect(textContent?.trim().length).toBeGreaterThan(0);

  });


    test.only('Home page should have no accessibility violations', async ({ loginAs, page }) => {
          await loginAs('user1Login');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test.only('lighthouse audit', async ({ loginAs, page }) => {
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