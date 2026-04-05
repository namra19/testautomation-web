import { test } from '../../fixtures/auth.fixture';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Session Management Test', () => {

    test.beforeEach(async ({ loginAs }) => {
        await loginAs('adminLogin');
    });

    // Verify user remains logged in after page refresh
    test('Verify user remains logged in after page refresh', async ({ page }) => {
        const home = new HomePage(page);

        //Refresh page
        await page.reload();

        //Verify user is still logged in
        await home.verifyUserIsLoggedIn()
    });

    // Verify user is logged out after session expires
    test('Verify user is logged out after session expires', async ({ page }) => {
        const home = new HomePage(page);
        await home.verifyUserIsLoggedIn();

        //Simulate session expiration
        await page.context().clearCookies();
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        })

        //Refresh
        await page.reload();

        //Verify user is redirected to login page
        const loginPage = new LoginPage(page);
        await loginPage.assertLoginPageVisible()
    });


    // Multiple tabs session test
    // test('User session persists across multiple tabs', async ({ context }) => {

    //     const page1 = await context.newPage();
    //     const page2 = await context.newPage();

    //     // 👉 Login using page1 (IMPORTANT)
    //     const loginPage = new LoginPage(page1);
    //     await loginPage.navigate();
    //     await loginPage.login('admin@admin.com', '2020');

    //     const home1 = new HomePage(page1);
    //     await home1.verifyUserIsLoggedIn();

    //     // Open second tab
    //     await page2.goto('/');

    //     const home2 = new HomePage(page2);
    //     await home2.verifyUserIsLoggedIn();
    // });
});


