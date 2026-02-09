import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { RegisterModal } from "../pages/registerModal";
import { HomePage } from "../pages/homePage";

test.describe ("Regression tests KazanCasino - Smoke",()=>{
let landingPage:LandingPage;
let registerModal:RegisterModal;
let homePage:HomePage;

    test.beforeEach (async ({page})=>{
        landingPage=new LandingPage(page);
        await landingPage.navigate();        
        registerModal=await landingPage.openRegister();            
    });
    

    test('Successful registration kazancasino @smoke', async({page})=>{
        await registerModal.registerUser(
            "test@fgb.com",
            "Password123!",
            "testqa324",
            "Test",
            "Userrrrrr",
            "01",  
            "08",
            "1990",
            "Test St 55",
            "testcity",
            "12345",
            "AU",
            "654765"        

        );
       
        await registerModal.proceedToPlay();
        homePage = new HomePage(page);
        const isLoggedIn = await homePage.isLoggedIn(); 

        await expect (isLoggedIn, "Failed registartion").toBe(true);

    });


    test ('Invalid email registration @smoke', async ({page})=>{
        await registerModal.fillEmail('yuliia+sdfsdf.fff');
        const invalidEmailError = await registerModal.getEmailErrorMessage();
                         
        await expect (invalidEmailError, "Invalid email error is not found").toBeVisible();
    });

});