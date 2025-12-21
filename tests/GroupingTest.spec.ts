import { test,expect } from "@playwright/test";

test.describe('Grouping tests', {tag:"@group"},() => {
  test("Demo test",{tag:"@Box"},async ({page})=>{
    await page.goto("https://app.box.com");
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Box | Login');
    await page.close();
});
test("Demo test 2",{tag:"@Google"},async ({page})=>{
    await page.goto("https://google.com");
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle(/Google/);
    await page.close();
});
test("Demo test 3",{tag:"@OrangeHrm"},async ({page})=>{
    await page.goto("https://www.orangehrm.com/");
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle(/Human Resources Management Software | HRMS | OrangeHRM/);
    await page.close();
});
 
});



