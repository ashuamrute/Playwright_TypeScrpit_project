import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage'

const url = "https://rahulshettyacademy.com/client/"
const userEmail = "ashisham@gmail.com"
const userPassword = "Test@1ashish"
const InvalidPassword = "Test@1234"
let loginPage:any


test.beforeEach(async ({ page }) => {

   loginPage = new LoginPage(page)
   await loginPage.LaunchApp(url)
   
})

test('Login with valid credentials', async () => {

   await loginPage.validLogin(userEmail, userPassword)
   await expect(loginPage.HomePageIndetifier).toBeVisible()

})

test('Login with Invalid credentials', async () => {

   await loginPage.InvalidLogin(userEmail, InvalidPassword)
   await expect(loginPage.ErrorMassgae).toHaveText(' Incorrect email or password. ')

})