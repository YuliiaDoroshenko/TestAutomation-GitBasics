import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { RegisterModal } from '../pages/registerModal';

test.describe("Regression Tests - KazanCasino Registration", () => {
    let landingPage: LandingPage;
    let registerModal: RegisterModal;

    test.beforeEach (async ({page})=>{
        landingPage=new LandingPage(page);
        await landingPage.navigate();        
        registerModal=await landingPage.openRegister();            
    });

    test("Invalid password registration @regression", async ({ page }) => {
        await registerModal.fillPassword("Password");
        
        const invalidPasswordMessage = await registerModal.getPasswordErrorMessage();
        await expect(invalidPasswordMessage, "Invalid password error should be visible").toBeVisible();
    });

    test ('Underage user registration @regression', async ({page})=>{
        await registerModal.fillDateOfBirth("09", "09", "2010");
        const underageError = await registerModal.getUnderageUserErrorMessage();

        await expect(underageError, "User age check has failed").toBeVisible();
    })


    test ('Password visibility @regression', async ({page})=>{
       await registerModal.fillPassword("Password123545161@@");
       await registerModal.togglePasswordVisibility();
       const isPasswordVisible = await registerModal.isPasswordVisible();

       await expect(isPasswordVisible, "Password is still masked").toBeTruthy();   
        
    })

    test ('Refferal code availability @regression', async ({page})=>{

        await registerModal.fillEmail('test@example.com');
        await registerModal.fillPassword('Password123!');
        await registerModal.fillUsername('yuliia');
        await registerModal.fillFirstName('Test');
        await registerModal.fillLastName('test');
        await registerModal.fillDateOfBirth('01', '01', '1990');
        
        const refCodeValue = 'code123';
        await registerModal.addReferralCode(refCodeValue);
        const referralCodeInput = await registerModal.getReferralCodeInput();

        await expect(referralCodeInput, "Referral code input should have value").toHaveValue(refCodeValue);

    })

    test ('Close registration additional pop up @regression', async ({page})=>{

        await registerModal.fillEmail('test@sasd.dads');
        await registerModal.closeRegistrationModal();
        const backOnLandingPage = await landingPage.isRegisterButtonVisible();

        await expect(backOnLandingPage, 'Registration modal was not closed properly').toBeTruthy();
    })


});