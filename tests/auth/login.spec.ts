import { LoginPage } from '../../page-objects/LoginPage';
import { test, expect } from '../../fixtures/auth.fixture';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from '../../page-objects/HomePage';


test.describe('Login Tests', () => {

    let loginPage: LoginPage;
    let homePage: HomePage;

    //Runs before each test to initialize page objects
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
    });

    // Verify website is loaded successfully 
    test('@smoke Verify home page opens successfully', async ({ page }) => {
        await loginPage.navigate();
        await expect(page).toHaveTitle('Single Page Application')
        await expect(loginPage.getHeroTextLocator()).toBeVisible();
        console.log('Home page loaded successfully with title: ' + await page.title());
    });

    //Valid login - admin
    test('@smoke Admin Login with valid credentials', async ({ loginAs }) => {
        await loginAs('adminLogin');
        expect(await homePage.userIcon.isVisible());
        expect(await homePage.navigationBar.isVisible());
        expect(await homePage.getMainContentLocator().isVisible());
        console.log('Admin logged in successfully');
    });

    // Valid login - user 1 
    test('@regression User1 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user1Login');
        expect(await homePage.userIcon.isVisible());
        expect(await homePage.navigationBar.isVisible());
        expect(await homePage.getMainContentLocator().isVisible());
        console.log('User1 logged in successfully');
    });

    // Valid login - user 2
    test('@regression User2 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user2Login');
        expect(await homePage.userIcon.isVisible());
        expect(await homePage.navigationBar.isVisible());
        expect(await homePage.getMainContentLocator().isVisible());
        console.log('User2 logged in successfully');
    });

    //Negative tests for login
    test('@regression Login with invalid credentials', async ({ loginAs }) => {
        await loginAs('invalidEmail');
        await loginPage.getLoginButtonLocator().isVisible();

        console.log('Login failed as expected with invalid email');
        //Tests in CI should not intentionally fail as error message is not visible, needs to be fixed in the app
        await expect(loginPage.getErrorMessageLocator()).toBeVisible();
        await expect(loginPage.getErrorMessageLocator()).toHaveText('Please enter valid email')
    });

    test('@regression Login with empty credentials', async ({ loginAs }) => {
        await loginAs('emptyCredentials');
        await loginPage.getLoginButtonLocator().isVisible();

        console.log('Login failed as expected with empty credentials');

        //Tests in CI should not intentionally fail as error message is not visible, needs to be fixed in the app
        await expect(loginPage.getErrorMessageLocator()).toBeVisible();
        await expect(loginPage.getErrorMessageLocator()).toHaveText('Please enter valid email')
    });

    test('@regression Login with credentials of invalid format', async ({ loginAs }) => {
        await loginAs('invalidFormat');
        await loginPage.getLoginButtonLocator().isVisible();

        console.log('Login failed as expected with invalid email and password format');

        //Tests in CI should not intentionally fail as error message is not visible, needs to be fixed in the app
        await expect(loginPage.getErrorMessageLocator()).toBeVisible();
        await expect(loginPage.getErrorMessageLocator()).toHaveText('Please enter valid email')
    });

    //Accessibility test for login page
    test('@regression login page should have no accessibility violations', async ({ page }) => {
        await loginPage.navigate();
        console.log('Running accessibility scan on login page');
        const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

});
