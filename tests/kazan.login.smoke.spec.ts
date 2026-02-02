import {test, expect} from "@playwright/test";

test.describe ("Login tests KazanCasino - Smoke",()=>{

    test.beforeEach (async ({page})=>{
        await page.goto('https://kazancasino-stage.fsclub.tech/');
        const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
        await loginButton.click();

    });

    test('Successful login in kazancasino @smoke', async ({page})=> {
        
        const iframe = page.frameLocator('#newLoginIframe');
        const userNameFieldInput = iframe.getByTestId('userName');
        const passwordFieldInput = iframe.getByTestId('password');
        const submitButton = iframe.getByTestId('login-submit-button');


        await userNameFieldInput.fill('yuliia');
        await passwordFieldInput.fill('Password');
        await submitButton.click();

        const loggedUserName = page.getByTestId('loggedUserName');
        await expect(loggedUserName).toBeVisible();
        await expect(loggedUserName).toHaveText('yuliia');

        await expect(loggedUserName, 'User profile name should be visible after login').toBeVisible({ timeout: 5000 });

    });


    test('Invalid password - failed login kazancasino @smoke', async ({page})=> {

        const iframe = page.frameLocator('#newLoginIframe');
        const userNameFieldInput = iframe.getByTestId('userName');
        const passwordFieldInput = iframe.getByTestId('password');
        const submitButton = iframe.getByTestId('login-submit-button');
        
        await userNameFieldInput.fill('yuliiad');
        await passwordFieldInput.fill('Pass577656');
        await submitButton.click();

        const invalidPasswordMessage=iframe.locator('.text-on-surface-error')

        await expect (invalidPasswordMessage).toBeVisible();    

    });

























});