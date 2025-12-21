import { expect, test} from '@playwright/test'
import { TIMEOUT } from 'dns'

test('login test', async({page})=>{
    await page.goto("https://www.flipkart.com/")
    const title = await page.title();
    console.log(title);
    await expect (page).toHaveTitle(/Online Shopping India Mobile/)
    await page.waitForTimeout(5000)
    await page.close()
});