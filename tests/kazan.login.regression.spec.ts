import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginModal } from '../pages/loginModal';
import { HomePage } from '../pages/homePage';

test.describe ("Login tests KazanCasino - Regression",()=>{

    let landingPage:LandingPage;
    let loginModal:LoginModal;
    let userHomePage:HomePage;
   
       
    test.beforeEach (async ({page})=>{
        const landingPage=new LandingPage(page);
        await landingPage.navigate();        
        loginModal=await landingPage.openLogin();
          
    });


    test("Invalid username - failed login kazancasino @regression", async ({ page }) => {
        await loginModal.login('eruwytu','Password44!');
        const invalidLoginMessage = await loginModal.getInvalidPasswordMessage();

        await expect(invalidLoginMessage, "Invalid login error message is NOT visible").toBeVisible({ timeout: 5000 });
    });



    test("Password visibility @regression", async ({ page }) => {
        
        await loginModal.login('eruwytu','Password44!');
        const isPasswordMasked = await loginModal.isPasswordMasked();

        await expect(isPasswordMasked, "Password value is visible!").toBe(true);
    });




    test("Switch to registration from login @regression", async ({ page }) => {
        
        const registerModal = await loginModal.goToRegistration();

        await expect(registerModal, "The user is not navigated to registration modal").toBe(true);
    });


    test("Forgot password from login @regression", async ({ page }) => {
        await loginModal.requestPasswordReset('yuliia@ventureslab.io');
        const isResendButtonVisible = await loginModal.isResendCodeButtonVisible();
        
        await expect(isResendButtonVisible, "Reset code has not been sent").toBe(true);        
          
    });


    test("Clear username field @regression", async ({ page }) => {
       
        await loginModal.clearUsernameField('yuliiaVVV');

        const usernameValue = await loginModal.getUsernameValue();
        await expect(usernameValue, "Username field should be cleared").toBe('');
    });

});
