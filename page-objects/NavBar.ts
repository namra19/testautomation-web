import { expect, Locator, Page } from '@playwright/test';

export class NavBar {
    readonly page: Page;
    readonly menus: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page; 
        this.menus = {
            Home: page.getByText('Home'),
            Products: page.getByText('Products'),
            Contact: page.getByText('Contact')
        };
    }

    //Click a Menu item
    async clickMenu(menuName: keyof typeof this.menus) {
        const menu = this.menus[menuName];
        if (!menu) throw new Error(`Menu item "${menuName}" not found in NavBar`);
        await menu.click();
    }

}