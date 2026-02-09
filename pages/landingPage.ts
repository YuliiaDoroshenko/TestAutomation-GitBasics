import { Locator, Page } from "@playwright/test";
import { RegisterModal } from "./registerModal";
import { BasePage } from "./basePage";
import { LoginModal } from "./loginModal";
import { log } from "node:console";

const LANDING_SELECTORs = {
    registerButton: '.register-button-holder #buttonHeaderRegister',
    loginButton: '.user-login-button #buttonHeaderLogin',
};


export class LandingPage extends BasePage{
    constructor(page: Page) {
        super(page);
    };

    async navigate() {
        await this.page.goto('https://kazancasino-stage.fsclub.tech');
    }

    private registerButton(): Locator {
        return this.page.locator(LANDING_SELECTORs.registerButton);
    }

    private loginButton(): Locator {
        return this.page.locator(LANDING_SELECTORs.loginButton);
    }

    async openRegister() : Promise<RegisterModal> {
        await this.registerButton().click();

        return new RegisterModal(this.page);
    }

    async openLogin() : Promise<LoginModal> {
        await this.loginButton().click();

        return new LoginModal(this.page);
    }

    async isRegisterButtonVisible(timeout = 5000): Promise<boolean> {
        try {
            await this.registerButton().waitFor({ state: 'visible', timeout });
            return true;
        } catch{
            return false;
        }
    }

    
}