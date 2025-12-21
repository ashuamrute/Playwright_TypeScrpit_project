import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage'

const data = JSON.parse(JSON.stringify(require('../Utils/logindata.json')))

let loginPage:any


test.beforeEach(async ({ page }) => {

   loginPage = new LoginPage(page)
   await loginPage.LaunchApp(data.url)
   
})

test('Login with valid credentials', async () => {

   await loginPage.validLogin(data.userEmail, data.userPassword)
   await expect(loginPage.HomePageIndetifier).toBeVisible()

})

test('Login with Invalid credentials', async () => {

   await loginPage.InvalidLogin(data.userEmail, data.invalidPassword)
   await expect(loginPage.ErrorMassgae).toHaveText(' Incorrect email or password. ')

})