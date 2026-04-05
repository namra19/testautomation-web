import { expect, test } from '../../fixtures/auth.fixture';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Content Validation Test', () => {

    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ loginAs, page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginAs('adminLogin');
    });

    // Verify main content is visible and not empty after login
    test('Verify main content is visible and not empty after login', async ({ loginAs, page }) => {
      const mainContent = homePage.mainContentLocator();

      await expect(mainContent).toBeVisible();
      const textContent: string | null = await mainContent.textContent();
      expect(textContent?.trim().length).toBeGreaterThan(0);

    });

});