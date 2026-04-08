import { expect, test } from '../../fixtures/auth.fixture';
import { NavBar } from '../../page-objects/NavBar';
import { URLs } from '../../utils/urls';

test.describe('Navigation Bar Tests', () => {

    // Verify navigation bar menu items for logged-in user
    // Tests in CI should not intentionally fail as the app currently does not have the expected pages implemented, needs to be fixed in the app
    test('@smoke Verify navigation bar menu items redirect correctly', async ({ loginAs, page }) => {

        await loginAs('adminLogin');
        const nav = new NavBar(page);

        const menuItems = [
            { name: 'Home', url: URLs.homeURL, heading: 'Home' },
            { name: 'Products', url: URLs.productsURL, heading: 'Products' },
            { name: 'Contact', url: URLs.contactsURL, heading: 'Contact Us' },
        ];

        for (const item of menuItems) {
            await test.step(`Click "${item.name}" menu and verify page`, async () => {
                // Click menu
                await nav.clickMenu(item.name as keyof typeof nav.menus);

                // Assertions to verify correct page is loaded
                await expect(page).toHaveURL(item.url);
                await expect(page.locator('h1')).toHaveText(item.heading);
            });
        }


    });

});