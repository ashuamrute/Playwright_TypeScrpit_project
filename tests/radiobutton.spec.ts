import {test,expect} from '@playwright/test'

test('Radio button check', async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")
    await page.locator('input[value="standard"]').check()
    await page.locator('input[type="checkbox"]').first().check()
    await page.waitForTimeout(2000)
    await page.close()
})