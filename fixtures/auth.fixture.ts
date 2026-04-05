import { LoginPage } from '../page-objects/LoginPage';
import { users } from '../utils/testData';
import { test as base, Page } from '@playwright/test'

type UserKey = keyof typeof users;

type Fixtures = {
    loginAs: (user: UserKey) => Promise<void>;
    pageAfterLogin: Page;
};

export const test = base.extend<Fixtures>({
    loginAs: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await use(async (userKey, customPage = page) => {
            const user = users[userKey];
            await loginPage.navigate();
            await loginPage.login(user.email, user.password);
        });
    }
});

export const expect = base.expect;