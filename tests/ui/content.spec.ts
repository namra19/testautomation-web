import { expect, test } from '../../fixtures/auth.fixture';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Content Validation Test', () => {

  // Verify main content is visible and not empty after login
  test('@smoke Verify main content is visible and not empty after login', async ({ loginAs, page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginAs('adminLogin');
    const mainContent = homePage.mainContentLocator();

    await expect(mainContent).toBeVisible();
    const textContent: string | null = await mainContent.textContent();
    expect(textContent?.trim().length).toBeGreaterThan(0);

  });

});