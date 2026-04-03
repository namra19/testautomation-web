import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { users } from '../fixtures/users';
import { loginAsUser } from '../utils/utils';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    // Verify website is loaded successfully 
    test('Verify home page opens successfully', async ({ page }) => {
        await loginPage.verifyTitle('Single Page Application');
    });

    // Positive test: valid credentials for all users
    for (const userKey of Object.keys(users) as Array<keyof typeof users>) {
        test(`Login successfully as ${userKey}`, async ({ page }) => {
            await loginAsUser(page, userKey);
        });
    }

})
