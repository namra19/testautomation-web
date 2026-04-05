import { test } from '../../fixtures/auth.fixture';
import { NavBar } from '../../page-objects/NavBar';
import { URLs } from '../../utils/urls';

test.describe('Navigation Bar Tests', () => {

    // Verify navigation bar menu items for logged-in user
    test('Verify navigation bar menu items redirect correctly', async ({ loginAs, page  }) => {

        await loginAs('adminLogin');

        const nav = new NavBar(page);

        await nav.clickMenu('Home', URLs.homeURL);
        await nav.clickMenu('Products', URLs.productsURL);
        await nav.clickMenu('Contact', URLs.contactsURL);
    });

});