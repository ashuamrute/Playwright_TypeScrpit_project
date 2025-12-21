import {test,expect} from '@playwright/test'

test('upload file test', async ({page})=>{
    await page.goto("https://cgi-lib.berkeley.edu/ex/fup.html")
    await page.locator("[name='upfile']").setInputFiles("tests\\Files\\Sample.txt")
    await page.locator("[type='text']").fill("file uploaded")
    await page.locator('[type="submit"]').click()
    const textpresent=await page.getByText("File Upload Results").isVisible()
    expect(textpresent).toBeTruthy()
    await page.close()
})


