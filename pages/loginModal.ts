import { Locator, Page } from "@playwright/test";
import { HomePage } from "./homePage";
import { RegisterModal } from "./registerModal";

const LOGIN_MODAL_SELECTORS = {
    iframe: 'iframe#newLoginIframe',
    invalidPasswordMessage: '.text-atoms-input-text-error',
    clearUsernameButton: '#userName + div',
    passwordVisibilityButton: '.text-atoms-input-icon-default'
};

const LOGIN_MODAL_TESTIDS = {
    userNameFieldInput: 'userName',
    passwordFieldInput: 'password',
    loginSubmitButton: 'login-submit-button',
    forgotPasswordEmailInput: 'identifier-input',
    resetPasswordSubmit: 'request-reset-button',
    clearCodeButton: 'clear-code-button',
    registerButton: 'register-button',
    resetPasswordButton: 'reset-password-button',
    resendCodeButton: 'resend-with-cooldown'
};


export class LoginModal{
    constructor(private page: Page) { } 

    private loginIframe() {
        return this.page.frameLocator(LOGIN_MODAL_SELECTORS.iframe);
    }   

    private readonly userNameFieldInput:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.userNameFieldInput);
    private readonly passwordFieldInput:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.passwordFieldInput);   
    private readonly loginSubmitButton:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.loginSubmitButton);
    private readonly invalidPasswordMessage:Locator = this.loginIframe().locator(LOGIN_MODAL_SELECTORS.invalidPasswordMessage);
    private readonly forgotPasswordEmailInput:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.forgotPasswordEmailInput); 
    private readonly resetPasswordSubmit:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.resetPasswordSubmit);
    private readonly clearUsernameButton:Locator = this.loginIframe().locator(LOGIN_MODAL_SELECTORS.clearUsernameButton);
    public readonly passwordVisibilityButton:Locator = this.loginIframe().locator(LOGIN_MODAL_SELECTORS.passwordVisibilityButton);
    private readonly clearCodeButton:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.clearCodeButton);
    private readonly registerButton:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.registerButton);   
    private readonly resetPasswordButton:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.resetPasswordButton); 
    private readonly resendCodeButton:Locator = this.loginIframe().getByTestId(LOGIN_MODAL_TESTIDS.resendCodeButton);

    async login(username: string, password: string){
        await this.userNameFieldInput.fill(username);
        await this.passwordFieldInput.fill(password);
        await this.loginSubmitButton.click();

    }

    async getInvalidPasswordMessage():Promise<Locator> {
        return this.invalidPasswordMessage;
    }

    async isPasswordMasked(): Promise<boolean> {
        return await this.passwordFieldInput.getAttribute('type') === 'password';
    }

    async goToRegistration(): Promise<RegisterModal> {
        await this.registerButton.click();

        return new RegisterModal(this.page);

    }

    async requestPasswordReset(email: string): Promise<void> {

        await this.resetPasswordButton.click();        
        await this.forgotPasswordEmailInput.fill(email);
        await this.resetPasswordSubmit.click();
    }

    async clearUsernameField(username:string): Promise<void> {
        await this.userNameFieldInput.fill(username);
        await this.clearUsernameButton.click();
    }

    async getUsernameValue(): Promise<string> {
        return await this.userNameFieldInput.inputValue();
    }

    async isResendCodeButtonVisible(): Promise<void> {
        await this.resendCodeButton.isVisible({ timeout: 20000 });
    }
}