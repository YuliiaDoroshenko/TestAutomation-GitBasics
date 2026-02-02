import { test, expect } from '@playwright/test';


//2.1
test('login in kazancasino', async ({page})=> {

  await page.goto('https://kazancasino-stage.fsclub.tech/');

  const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  const iframe = page.frameLocator('#newLoginIframe');

  const userNameFieldInput = iframe.getByTestId('userName');
  const passwordFieldInput = iframe.getByTestId('password');
  const submitButton = iframe.getByTestId('login-submit-button');


  await loginButton.click();
  await userNameFieldInput.fill('yuliia');
  await passwordFieldInput.fill('Password');

  await submitButton.click();

  const loggedUserName = page.getByTestId('loggedUserName');
  await expect(loggedUserName).toBeVisible();
  await expect(loggedUserName).toHaveText('yuliiad');

  await expect(loggedUserName, 'User profile name should be visible after login').toBeVisible({ timeout: 5000 });

});


//2.2


test('registration kazancasino', async({page})=>{
  await page.goto('https://kazancasino-stage.fsclub.tech/');

  const registerButton=page.locator('.user-login-button #buttonHeaderRegister');
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

  await registerButton.click();
  await emailInput.fill('yuliia+0909@ventureslab.io');
  await passwordInput.fill('Password01!');
  await usernameInput.fill('yuliia0909');
  await firstNameInput.fill('yuliia');
  await lastNameInput.fill('dorosh');
  await dateOfBirthInputMM.fill('09');
  await dateOfBirthInputDD.fill('09');
  await dateOfBirthInputYYYY.fill('1992');

  await addressInput.fill('sofia');
  await cityInput.fill('Sofia')
  await zipCodeInput.fill('87687rp');
  await countryDropDown.click();
  await iframe.getByRole('option', { name: 'Azerbaijan' }).click();
  await currencyCodeDropDown.click();
  await iframe.getByRole('option', { name: 'TRY' }).click()
  await phoneInput.fill('2131233');

  await checkboxTC.click();
  await checkboxAtestation.click();
  await bonusCheckbox.click();
  await submitRegistration.click();

  const sucessRegistrationIframe=page.frameLocator('#newRegistrationIframe');
  const buttonPlay=sucessRegistrationIframe.getByTestId('play-button');
  buttonPlay.click();



  const loggedUsername =page.getByTestId('loggedUserName')

  await expect (loggedUsername, "Failed").toBeVisible();

})


//2.3

test ('Invalid password registration', async ({page})=>{
   await page.goto('https://kazancasino-stage.fsclub.tech/');

  const registerButton=page.locator('.user-login-button #buttonHeaderRegister');
  const iframe = page.frameLocator('#newRegistrationIframe');

  const emailInput=iframe.getByTestId('email');
  const passwordInput=iframe.getByTestId('password');
  const passwordError=iframe.getByTestId('input-password-error');
  const usernameInput=iframe.getByTestId('userName');
 
  await registerButton.click();
  await emailInput.fill('yuliia+0909@ventureslab.io');
  await passwordInput.fill('Password01');
  await usernameInput.click();
  
  await expect (passwordError, "Password error not found").toBeVisible();

})

//2.4
test ('Invalid email registration', async ({page})=>{
   await page.goto('https://kazancasino-stage.fsclub.tech/');

  const registerButton=page.locator('.user-login-button #buttonHeaderRegister');
  const iframe = page.frameLocator('#newRegistrationIframe');

  const emailInput=iframe.getByTestId('email');
  const passwordInput=iframe.getByTestId('password');
  const emailError=iframe.getByTestId('input-email-error');
  
  await registerButton.click();
  await emailInput.fill('yuliia+ventureslab.io');
  await passwordInput.click();
  
  
  await expect (emailError, "Email error not found").toBeVisible();
})

//2.5
test('failed login invalid password kazancasino', async ({page})=> {

  await page.goto('https://kazancasino-stage.fsclub.tech/');

  const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  const iframe = page.frameLocator('#newLoginIframe');

  const userNameFieldInput = iframe.getByTestId('userName');
  const passwordFieldInput = iframe.getByTestId('password');
  const submitButton = iframe.getByTestId('login-submit-button');


  await loginButton.click();
  await userNameFieldInput.fill('yuliiad');
  await passwordFieldInput.fill('Password');

  await submitButton.click();

  const invalidPasswordAlert=iframe.getByTestId('alert-icon')

  await expect (invalidPasswordAlert).toBeVisible();    

});

//2.6
test('failed login invalid username kazancasino', async ({page})=> {

  await page.goto('https://kazancasino-stage.fsclub.tech/');

  const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  const iframe = page.frameLocator('#newLoginIframe');

  const userNameFieldInput = iframe.getByTestId('userName');
  const passwordFieldInput = iframe.getByTestId('password');
  const submitButton = iframe.getByTestId('login-submit-button');


  await loginButton.click();
  await userNameFieldInput.fill('fhbufhsdujf');
  await passwordFieldInput.fill('Password01');

  await submitButton.click();

  const invalidUsernameAlert=iframe.getByTestId('alert-icon')

  await expect (invalidUsernameAlert).toBeVisible();    

});

//2.7
test('navigate to casino kazancasino', async ({page})=> {
   await page.goto('https://kazancasino-stage.fsclub.tech/');
   
   const navigationCasino=page.locator('#navCasino');
   
   await navigationCasino.click();

   await expect (page).toHaveURL('https://kazancasino-stage.fsclub.tech/new/casino/');

});





