import {test,expect} from '@playwright/test'

test('Drag and Drop check', async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")
    await page.locator('#draggable').dragTo(page.locator('#droppable'))
    await page.close()
})