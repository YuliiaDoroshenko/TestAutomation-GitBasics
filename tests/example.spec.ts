import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test ('homepage title', async ({page})=>{
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page).toHaveTitle('The Internet');

});


test('successful login', async ({page})=>{
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', {name: 'Form Authentication'}).click();
  let username = page.getByRole('textbox', { name: 'Username' });
  let password = page.getByRole('textbox', { name: 'Password' });
  let loginButton=page.getByRole('button', { name: ' Login' });

  await username.fill('tomsmith');  
  await password.fill('SuperSecretPassword!');
  await loginButton.click();

  let successMessage=page.getByText('You logged into a secure area!');

  await expect(successMessage).toBeVisible();
});

//1.1

test('failed forgot password', async ({page})=>{
  await page.goto ('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Forgot Password' }).click();
  let email=page.getByRole('textbox', { name: 'E-mail' });

  await email.fill('yuliia@ventureslab.io');  
  await page.getByRole('button', { name: 'Retrieve password' }).click();

   let failureMessage=page.getByText('Internal Server Error');
   await expect(failureMessage).toBeVisible();
})


//1.2
test('checkboxes', async ({page})=>{
  await page.goto ('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Checkboxes' }).click();

  let checkbox2=page.getByRole('checkbox').nth(1);
  await expect(checkbox2).toBeChecked();

})


//1.3

test('dropdown option', async ({page})=>{
  await page.goto ('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown' }).click();

  let dropDown = page.locator('#dropdown');
  await dropDown.selectOption('1');
  await expect(dropDown).toHaveValue('1');

  await dropDown.selectOption('2');
  await expect(dropDown).toHaveValue('2');
})


//1.4
test ('drag and drop', async ({page})=>{
  await page.goto ('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' }).click()
  let sectorA=page.locator('#column-a');
  let sectorB=page.locator('#column-b');

  await sectorA.dragTo(sectorB);

  await expect(sectorA).toHaveText('B');
  await expect(sectorB).toHaveText('A');

})

//1.5
test ('hover', async ({page})=>{
  await page.goto ('https://the-internet.herokuapp.com/');
  let menuItemHover= page.getByRole('link', { name: 'Hovers' });
  console.log(menuItemHover);
  await menuItemHover.click();

  let image2 = page.getByRole('img', { name: 'User Avatar' }).nth(1);
  await image2.hover();

  let message2=page.getByText('name: user2') 
 
  await expect (message2).toBeVisible();
})


