import { expect, test } from '../../fixtures/auth.fixture';
import { NavBar } from '../../page-objects/NavBar';
import { URLs } from '../../utils/urls';

test.describe('Navigation Bar Tests', () => {

    // Verify navigation bar menu items for logged-in user
    // Tests in CI should not intentionally fail as the app currently does not have the expected pages implemented, needs to be fixed in the app

    test('@smoke Verify navigation bar menu item home redirect correctly', async ({ loginAs, page }) => {
        await loginAs('adminLogin');
        const nav = new NavBar(page);
        await nav.clickMenu('Home');
        await expect(page).toHaveURL(URLs.homeURL);
        await expect(page.locator('h1')).toHaveText('Home');
    });

    test('@smoke Verify navigation bar menu item products redirect correctly', async ({ loginAs, page }) => {
        await loginAs('adminLogin');
        const nav = new NavBar(page);

        await nav.clickMenu('Products');
        await expect(page).toHaveURL(URLs.productsURL);
        await expect(page.locator('h1')).toHaveText('Products');
    });

    test('@smoke Verify navigation bar menu item contact redirect correctly', async ({ loginAs, page }) => {
        await loginAs('adminLogin');
        const nav = new NavBar(page);
        await nav.clickMenu('Contact');
        await expect(page).toHaveURL(URLs.contactsURL);
        await expect(page.locator('h1')).toHaveText('Contact Us');
    });     

});