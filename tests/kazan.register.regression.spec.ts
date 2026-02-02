import { test, expect } from '@playwright/test';

test.describe ("Regression tests KazanCasino - Regression",()=>{

    test.beforeEach (async ({page})=>{
        await page.goto('https://kazancasino-stage.fsclub.tech/');        
        const registerButton=page.locator('.user-login-button #buttonHeaderRegister');
        await registerButton.click();
    });


    
    test ('Invalid password registration @regression', async ({page})=>{
      
        const iframe = page.frameLocator('#newRegistrationIframe');

        const emailInput=iframe.getByTestId('email');
        const passwordInput=iframe.getByTestId('password');
        const usernameInput=iframe.getByTestId('userName');
            
        await emailInput.fill('yuliia+0909@ventureslab.io');
        await passwordInput.fill('Password01');
        await usernameInput.click();

        const passwordError=iframe.getByTestId('input-password-error');
            
        await expect (passwordError, "Invalid password error is missing").toBeVisible();

    })

    

    test ('Underage user registration @regression', async ({page})=>{
      
        const iframe = page.frameLocator('#newRegistrationIframe');

        const emailInput=iframe.getByTestId('email');
        const passwordInput=iframe.getByTestId('password');
        const usernameInput=iframe.getByTestId('userName');
        const firstNameInput=iframe.getByTestId('firstName');
        const lastNameInput=iframe.getByTestId('lastName');
        const dateOfBirthInputMM=iframe.getByTestId('dateOfBirth-MM');
        const dateOfBirthInputDD=iframe.getByTestId('dateOfBirth-DD');
        const dateOfBirthInputYYYY=iframe.getByTestId('dateOfBirth-YYYY');
        
            
        await emailInput.fill('yuliia+0909@ventureslab.io');
        await passwordInput.fill('Password234234!');
        await usernameInput.fill('yuliia23');
        await firstNameInput.fill('yuli');
        await lastNameInput.fill('dor');
        await dateOfBirthInputDD.fill('09');
        await dateOfBirthInputMM.fill('11');
        await dateOfBirthInputYYYY.fill('2010');

        const dateOfBirthError=iframe.getByTestId('input-dateOfBirth-error');
            
        await expect (dateOfBirthError, "Underage user error is missing").toBeVisible();
         
    })


       test ('Password visibility @regression', async ({page})=>{
      
        const iframe = page.frameLocator('#newRegistrationIframe');
        const passwordInput=iframe.getByTestId('password');
        const passwordVisibilityToggle=iframe.getByTestId('password-visibility-toggle');
        const password='Password09#';
                     
        await passwordInput.fill(password);
        await passwordVisibilityToggle.click();
        await expect (iframe.getByTestId('password')).toHaveValue(password); 
        
        await passwordVisibilityToggle.click();
        
        await expect (passwordInput).toHaveAttribute('type', 'password');

    })

    test ('Refferal code availability @regression', async ({page})=>{

        const iframe = page.frameLocator('#newRegistrationIframe');

        const emailInput=iframe.getByTestId('email');
        const passwordInput=iframe.getByTestId('password');
        const usernameInput=iframe.getByTestId('userName');
        const firstNameInput=iframe.getByTestId('firstName');
        const lastNameInput=iframe.getByTestId('lastName');
        const dateOfBirthInputMM=iframe.getByTestId('dateOfBirth-MM');
        const dateOfBirthInputDD=iframe.getByTestId('dateOfBirth-DD');
        const dateOfBirthInputYYYY=iframe.getByTestId('dateOfBirth-YYYY');

        await emailInput.fill('yuliia+230403}@ventureslab.io');
        await passwordInput.fill('Password01!');
        await usernameInput.fill('yuliia0909');
        await firstNameInput.fill('yuliia');
        await lastNameInput.fill('dorosh');
        await dateOfBirthInputMM.fill('09');
        await dateOfBirthInputDD.fill('09');
        await dateOfBirthInputYYYY.fill('1992');

        const refferalCodeToggle=iframe.locator('.transition-transform');
        const refferalCodeInput=iframe.getByTestId('affiliateToken');
        const refferalCode='ABC123'

        await refferalCodeToggle.click();
        await refferalCodeInput.fill(refferalCode);

        await expect (refferalCodeInput).toHaveValue(refferalCode);

    })

    test ('Close registartion additional pop up @regression', async ({page})=>{

        const iframe = page.frameLocator('#newRegistrationIframe');
        const emailInput=iframe.getByTestId('email');
        const closeRegistrationButton=iframe.getByTestId('registration-close-button');

        await emailInput.fill('yuliia@abc.vv');
        await closeRegistrationButton.click();

        const exitButton= iframe.getByTestId('cancel-button');

        await expect (exitButton).toBeVisible();

    })


});