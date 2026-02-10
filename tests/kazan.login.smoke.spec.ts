import { test, expect } from "@playwright/test";
import { LoginModal } from "../pages/loginModal";
import { LandingPage } from "../pages/LandingPage";
import { HomePage } from "../pages/homePage";

test.describe ("Login tests KazanCasino - Smoke",()=>{

    let landingPage:LandingPage;
    let loginModal:LoginModal;
    let userHomePage:HomePage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.navigate();
        loginModal = await landingPage.openLogin();
    });

    test('Successful login in kazancasino @smoke', async ({page})=> {
        await loginModal.login('yulyjj20', 'Passwytjtynj!'); 
        userHomePage = new HomePage(page);
        const isLoggedIn = await userHomePage.isLoggedIn();
        
        await expect(isLoggedIn, 'Login failed').toBe(true);    
           
    });


    test('Invalid password - failed login kazancasino @smoke', async ({page})=> {
       
        await loginModal.login('yuliiaVVV', 'Passwyughygord01');
        const invalidPasswordMessage = await loginModal.getInvalidPasswordMessage();

        await expect(invalidPasswordMessage, 'Invalid password message is not visible').toBeVisible({ timeout: 5000 });
        
    });
});
