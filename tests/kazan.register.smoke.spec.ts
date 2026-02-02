import { test, expect } from "@playwright/test";


test.describe ("Regression tests KazanCasino - Smoke",()=>{

    test.beforeEach (async ({page})=>{
        await page.goto('https://kazancasino-stage.fsclub.tech/');        
        const registerButton=page.locator('.user-login-button #buttonHeaderRegister');
        await registerButton.click();
    });

    test('Successful registration kazancasino @smoke', async({page})=>{
   
        const iframe = page.frameLocator('#newRegistrationIframe');

        const emailInput=iframe.getByTestId('email');
        const passwordInput=iframe.getByTestId('password');
        const usernameInput=iframe.getByTestId('userName');
        const firstNameInput=iframe.getByTestId('firstName');
        const lastNameInput=iframe.getByTestId('lastName');
        const dateOfBirthInputMM=iframe.getByTestId('dateOfBirth-MM');
        const dateOfBirthInputDD=iframe.getByTestId('dateOfBirth-DD');
        const dateOfBirthInputYYYY=iframe.getByTestId('dateOfBirth-YYYY');


        const addressInput=iframe.getByTestId('address');
        const cityInput=iframe.getByTestId('city')
        const zipCodeInput=iframe.getByTestId('zipCode');
        const countryDropDown=iframe.getByTestId('userCountryCode');
        const currencyCodeDropDown=iframe.getByTestId('currencyCode')
        const phoneInput=iframe.getByTestId('phone');

        const checkboxTC=iframe.getByTestId('acceptTermsAndConditions');
        const checkboxAtestation=iframe.getByTestId('acceptAttestation');
        const bonusCheckbox=iframe.getByTestId('notifyForPromotionsAndBonuses');

        const submitRegistration=iframe.getByTestId('registration-submit-button');

        const randomNumber = Math.floor(Math.random() * 10000);
        const username = `yuliia_${randomNumber}`;
        const email = `yuliia_${randomNumber}@top.com`;

        
        await emailInput.fill(email);
        await passwordInput.fill('SuperPassword01#$');
        await usernameInput.fill(username);
        await firstNameInput.fill('yuliia');
        await lastNameInput.fill('dorosh');
        await dateOfBirthInputMM.fill('03');
        await dateOfBirthInputDD.fill('09');
        await dateOfBirthInputYYYY.fill('1999');

        await addressInput.fill('type');
        await cityInput.fill('Sofia')
        await zipCodeInput.fill('2323');
        await countryDropDown.click();
        await iframe.getByRole('option', { name: 'Azerbaijan' }).click();
        await currencyCodeDropDown.click();
        await iframe.getByRole('option', { name: 'TRY' }).click()

        const randomPhone = Math.floor(1000000 + Math.random() * 9000000).toString();
        await phoneInput.fill(randomPhone);

        await checkboxTC.click();
        await checkboxAtestation.click();
        await bonusCheckbox.click();
        await submitRegistration.click();

        const sucessRegistrationIframe=page.frameLocator('#newRegistrationIframe');
        const buttonPlay=sucessRegistrationIframe.getByTestId('play-button');
        buttonPlay.click();



        const loggedUsername =page.getByTestId('loggedUserName')

        await expect (loggedUsername, "Failed").toBeVisible({ timeout: 5000 });

    });


    test ('Invalid email registration @smoke', async ({page})=>{
             
        const iframe = page.frameLocator('#newRegistrationIframe');
        const emailInput=iframe.getByTestId('email');
        const passwordInput=iframe.getByTestId('password');
        const emailError=iframe.getByTestId('input-email-error');
               
        await emailInput.fill('yuliia+ventureslab.io');
        await passwordInput.click();
               
        await expect (emailError, "Email error not found").toBeVisible();
    });


})