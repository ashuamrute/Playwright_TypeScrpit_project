import { test, expect } from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage'
import { DashboardPage } from '../PageObjects/DashboardPage';

const productName = 'iphone 13 pro'
const url = "https://rahulshettyacademy.com/client/"
const userEmail = "ashisham@gmail.com"
const userPassword = "Test@1ashish"
let loginPage;
let dashboardPage:any;

test.beforeEach(async ({ page }) => {

   loginPage = new LoginPage(page)
   dashboardPage = new DashboardPage(page)
   await loginPage.LaunchApp(url)
   await loginPage.validLogin(userEmail, userPassword)
})

test('Add product to cart', async()=>{
    await dashboardPage.SearchProduct(productName)
    await expect(dashboardPage.successConfirm).toContainText(' Product Added To Cart ')
    
})

test('View product', async()=>{
    await dashboardPage.SearchandViewProduct(productName)
    await expect(dashboardPage.ProductDisplay).toHaveText(productName)

})