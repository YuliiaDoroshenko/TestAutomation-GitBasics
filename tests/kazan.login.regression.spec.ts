import { test, expect } from '@playwright/test';

test.describe ("Login tests KazanCasino - Regression",()=>{

    test.beforeEach (async ({page})=>{
        await page.goto('https://kazancasino-stage.fsclub.tech/');
        const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
        await loginButton.click();

    });


    test('Invalid username - failed login kazancasino @regression', async ({page})=> {

        const iframe = page.frameLocator('#newLoginIframe');
        const userNameFieldInput = iframe.getByTestId('userName');
        const passwordFieldInput = iframe.getByTestId('password');
        const submitButton = iframe.getByTestId('login-submit-button');
        
        await userNameFieldInput.fill('fhbufhsdujf');
        await passwordFieldInput.fill('Password01');
        await submitButton.click();

        const invalidPasswordMessage=iframe.locator('.text-on-surface-error')

        await expect (invalidPasswordMessage).toBeVisible();      

    });


    test('Password visibility @regression', async({page})=>{
        const loginIframe = page.frameLocator('#newLoginIframe');
        const passwordFieldInput = loginIframe.getByTestId('password');

        await passwordFieldInput.fill('Password01');
        await expect (passwordFieldInput).toHaveAttribute('type', 'password');

    })

    test('Switch to registartion from login @regression', async ({page})=> {

        const loginIframe = page.frameLocator('#newLoginIframe');
        const createAccountButton=loginIframe.getByTestId('register-button')
        await createAccountButton.click();
         
        const registartionIframe=page.frameLocator('#newRegistrationIframe')

        await expect ((registartionIframe).getByTestId('email')).toBeVisible(); 

    });

    test('Forgot password from login @regression', async ({page})=> {

        const loginIframe = page.frameLocator('#newLoginIframe');
        const forgotPassswordButton=loginIframe.getByTestId('reset-password-button')
        await forgotPassswordButton.click();

        const forgotPasswordEmailInput=loginIframe.getByTestId('identifier-input');
        forgotPasswordEmailInput.fill('yuliia@ventureslab.io')         
        
        const resetPasswordSubmit=loginIframe.getByTestId('request-reset-button');
        resetPasswordSubmit.click();
        
        await expect ((loginIframe).getByTestId('clear-code-button')).toBeVisible({timeout:10000});

    });

    test ('Clear username field @regression', async ({page})=>{

        const iframe = page.frameLocator('#newLoginIframe');
        const userNameFieldInput = iframe.getByTestId('userName');
        const clearUsername=iframe.locator('#userName + div')
        const username='yuliiadorosh'

        await userNameFieldInput.fill('username');
                
        await clearUsername.click();
        await expect (userNameFieldInput).toHaveAttribute('value', '');
        


    })


})