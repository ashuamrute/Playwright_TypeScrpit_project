import { test, expect } from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage'
import { DashboardPage } from '../PageObjects/DashboardPage';

const data = JSON.parse(JSON.stringify(require('../Utils/logindata.json')))

let loginPage;
let dashboardPage:any;

test.beforeEach(async ({ page }) => {

   loginPage = new LoginPage(page)
   dashboardPage = new DashboardPage(page)
   await loginPage.LaunchApp(data.url)
   await loginPage.validLogin(data.userEmail, data.userPassword)
})

test('Add product to cart', async()=>{
    await dashboardPage.SearchProduct(data.productName)
    await expect(dashboardPage.successConfirm).toHaveText(' Product Added To Cart ')
    
})

test('View product', async()=>{
    await dashboardPage.SearchandViewProduct(data.productName)
    await expect(dashboardPage.ProductDisplay).toHaveText(data.productName)

})