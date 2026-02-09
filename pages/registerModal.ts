import { FrameLocator, Locator, Page } from "@playwright/test";
import { time } from "node:console";
import { exit } from "node:process";
 
const REGISTER_MODAL_SELECTORS = {
    registerIframe: 'iframe#newRegistrationIframe',
    userCountryCodeSelect: '[data-testid="userCountryCode"] select',
    referralCodeToggle: '.transition-transform',
};
 
const REGISTER_MODAL_TESTIDS = {
    email: 'email',
    password: 'password',
    userName: 'userName',
    firstName: 'firstName',
    lastName: 'lastName',
    dateOfBirthMM: 'dateOfBirth-MM',
    dateOfBirthDD: 'dateOfBirth-DD',
    dateOfBirthYYYY: 'dateOfBirth-YYYY',
    address: 'address',
    city: 'city',
    zipCode: 'zipCode',
    phone: 'phone',
    acceptTermsAndConditions: 'acceptTermsAndConditions',
    acceptAttestation: 'acceptAttestation',
    acceptPromotionsInformation: 'notifyForPromotionsAndBonuses',
    registrationSubmitButton: 'registration-submit-button',
    emailErrorMessage: 'input-email-error',
    passwordErrorMessage: 'input-password-error',
    underageUserErrorMessage: 'input-dateOfBirth-error',
    passwordVisibilityToggle: 'password-visibility-toggle',
    referralCodeInput: 'affiliateToken',
    closeRegistrationButton: 'registration-close-button',
    exitButton: 'cancel-button',
    playButton: 'play-button'
};
 
export class RegisterModal {
    constructor(private page: Page) { }
 
    private registerIframe() : FrameLocator {
        return this.page.frameLocator(REGISTER_MODAL_SELECTORS.registerIframe);
    }
 
    private readonly emailField : Locator = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.email);
    private readonly passwordInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.password);
    private readonly usernameFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.userName);
    private readonly firstNameFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.firstName);
    private readonly lastNameFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.lastName);
    private readonly birthdayMonthFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.dateOfBirthMM);
    private readonly birthdayDayFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.dateOfBirthDD);
    private readonly birthdayYearFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.dateOfBirthYYYY);
    private readonly addressInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.address);
    private readonly cityfieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.city);
    private readonly zipCodeFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.zipCode);
    private readonly countryDropdown : Locator  = this.registerIframe().locator(REGISTER_MODAL_SELECTORS.userCountryCodeSelect);
    private readonly phoneFieldInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.phone);
    private readonly termsCheckbox : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.acceptTermsAndConditions);
    private readonly promotionsCheckbox : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.acceptPromotionsInformation); 
    private readonly infoCheckbox : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.acceptAttestation);
    private readonly createAccountButton : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.registrationSubmitButton);
    private readonly emailErrorMessage : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.emailErrorMessage);
    private readonly passwordErrorMessage : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.passwordErrorMessage);
    private readonly underageUserErrorMessage : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.underageUserErrorMessage);
    private readonly passwordVisibilityToggle : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.passwordVisibilityToggle);
    private readonly referralCodeInput : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.referralCodeInput);
    private readonly referralCodeToggle : Locator  = this.registerIframe().locator(REGISTER_MODAL_SELECTORS.referralCodeToggle);
    private readonly closeRegistrationButton : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.closeRegistrationButton);    
    private readonly exitButton : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.exitButton);    
    private readonly playButton : Locator  = this.registerIframe().getByTestId(REGISTER_MODAL_TESTIDS.playButton);  

    async registerUser(
        email: string,
        password:  string,
        username: string,
        firstName: string,
        lastName: string,
        birthMonth: string,
        birthDay: string,
        birthYear: string,
        address: string,
        city: string,
        zipCode: string,
        countryCode: string,
        phone: string
    ) {
        await this.fillRegistrationFormField(
            email,
            password,
            username,
            firstName,
            lastName,
            birthMonth,
            birthDay,
            birthYear,
            address,
            city,
            zipCode,
            countryCode,
            phone
        );
 
        await this.submitForm();
    }
 
    async fillRegistrationFormField(
        email: string,
        password:  string,
        username: string,
        firstName: string,
        lastName: string,
        birthMonth: string,
        birthDay: string,
        birthYear: string,
        address: string,
        city: string,
        zipCode: string,
        countryCode: string,
        phone: string
    ) {
        await this.emailField.fill(email);
        await this.passwordInput.fill(password);
        await this.usernameFieldInput.fill(username);
        await this.firstNameFieldInput.fill(firstName);
        await this.lastNameFieldInput.fill(lastName);
        await this.birthdayMonthFieldInput.fill(birthMonth);
        await this.birthdayDayFieldInput.fill(birthDay);
        await this.birthdayYearFieldInput.fill(birthYear);
        await this.addressInput.fill(address);
        await this.cityfieldInput.fill(city);
        await this.zipCodeFieldInput.fill(zipCode);
        await this.countryDropdown.selectOption(countryCode);
        await this.phoneFieldInput.fill(phone);
        await this.termsCheckbox.check();
        await this.infoCheckbox.check();
        await this.promotionsCheckbox.check();
    }

    async submitForm(): Promise<void> {
        await this.createAccountButton.click();
    }

    async proceedToPlay(): Promise<void> {
        await this.playButton.click({ timeout: 5000 });
    }

    async getEmailErrorMessage(): Promise<Locator> {
        return this.emailErrorMessage;
    }

    async getPasswordErrorMessage(): Promise<Locator> {
        return this.passwordErrorMessage;
    }

    async getUnderageUserErrorMessage(): Promise<Locator> {
        return this.underageUserErrorMessage;
    }

    async getReferralCodeInput(): Promise<Locator> {
        return this.referralCodeInput;
    }

    async togglePasswordVisibility(): Promise<void> {
        await this.passwordVisibilityToggle.click();
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameFieldInput.fill(username);
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameFieldInput.fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.lastNameFieldInput.fill(lastName);
    }

    async fillDateOfBirth(month: string, day: string, year: string): Promise<void> {
        await this.birthdayMonthFieldInput.fill(month);
        await this.birthdayDayFieldInput.fill(day);
        await this.birthdayYearFieldInput.fill(year);
    }

    async fillAddress(address: string): Promise<void> {
        await this.addressInput.fill(address);
    }

    async fillCity(city: string): Promise<void> {
        await this.cityfieldInput.fill(city);
    }

    async fillZipCode(zipCode: string): Promise<void> {
        await this.zipCodeFieldInput.fill(zipCode);
    }

    async selectCountry(countryCode: string): Promise<void> {
        await this.countryDropdown.selectOption(countryCode);
    }

    async fillPhone(phone: string): Promise<void> {
        await this.phoneFieldInput.fill(phone);
    }

    async acceptTermsAndConditions(): Promise<void> {
        await this.termsCheckbox.check();
    }

    async acceptAttestation(): Promise<void> {
        await this.infoCheckbox.check();
    }

    async fillReferralCode(code: string): Promise<void> {
        await this.referralCodeInput.fill(code);
    }

    async isPasswordVisible(): Promise<boolean> {
        return await this.passwordInput.getAttribute('type') === 'text';
    }
    async addReferralCode(code:string): Promise<void> {
        await this.referralCodeToggle.click();
        await this.referralCodeInput.fill(code);
    }

    async closeRegistrationModal(): Promise<void> {
        await this.closeRegistrationButton.click();
        await this.exitButton.click();
    }
}
