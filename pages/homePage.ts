import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

const LANDING_TESTIDS = {
    loggedUserName: 'loggedUserName',
}

 

export class HomePage extends BasePage{
    constructor(page: Page) {
        super(page);
    }   

    private readonly loggedUserName: Locator = this.page.getByTestId(LANDING_TESTIDS.loggedUserName);  

    async navigate() {
        await this.page.goto('https://kazancasino-stage.fsclub.tech/home');
    }

    async isLoggedIn(): Promise<boolean> {
        const loggedUserName = this.page.getByTestId(LANDING_TESTIDS.loggedUserName);
        try{
            await expect(loggedUserName).toBeVisible({ timeout: 5000 });
            return true;
        } catch {
        return false;       
        }
    }
}