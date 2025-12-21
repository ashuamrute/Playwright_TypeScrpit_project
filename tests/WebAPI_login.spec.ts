import {test, expect} from '@playwright/test'

const ProductName = 'iphone 13 pro'
const Email = 'ashisham@gmail.com'

test.beforeAll(async ({browser})=>{
    const context= await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder('email@example.com').fill('ashisham@gmail.com')
    await page.locator('#userPassword').fill('Test@1ashish')
    await page.locator('#login').click()
// we can handle the login scenarion by setting the token in local storage in app, 
    context.storageState({path:'state.jason'})
    context.close()

})
// we can handle the login scenarion by setting the token in local storage in app, 
// this will be useful if we have more testcases and login is common scenario for all

test('Add to cart flow by using the WebAPI for login step', async({browser})=>{
    // await page.goto("https://rahulshettyacademy.com/client/")
    // await page.getByPlaceholder('email@example.com').fill('ashisham@gmail.com')
    // await page.locator('#userPassword').fill('Test@1ashish')
    // await page.locator('#login').click()
    
    const context= await browser.newContext({storageState:'state.jason'})
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    await expect(page.getByRole('button',{name:'HOME'})).toBeVisible()
    const productslist= page.locator('div.card-body')
    const Count = await productslist.count()

    for(let i=0; i<Count;i++ ){
        const Product = (await productslist.nth(i).locator('b').textContent())?.trim()
        if(Product === ProductName ){
            await productslist.nth(i).getByRole('button',{name:' Add To Cart'}).click()

        }
    }
    await expect(page.locator('#toast-container')).toBeVisible()
    await expect(page.locator('button.btn-custom label')).toHaveText('1')
    await page.locator('[routerlink="/dashboard/cart"]').click()
    await expect(page.locator('div.cartSection h3')).toHaveText(ProductName)
    await page.getByRole('button',{name:'Checkout'}).click()
    await expect(page.locator('div.user__name.mt-5 label')).toHaveText(Email)
    await page.locator("//div[text()='CVV Code ']/parent::div/input").fill("111")
    await page.getByPlaceholder('Select Country').pressSequentially('ind')
    const dropdownValue= page.locator('.ta-results button')
    await dropdownValue.first().waitFor()
    const DropdownCount= await dropdownValue.count()

    for(let i=0; i<DropdownCount; i++){
        const dropdownCountry= (await dropdownValue.nth(i).textContent())?.trim()
        if(dropdownCountry === 'India'){
            await dropdownValue.nth(i).click()
            break
        }
    }
    await page.getByText('Place Order ').click()
    await expect(page.getByLabel('Order Placed Successfully')).toBeVisible()
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
    const orderID= await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    await console.log(orderID)
    await page.close()

})