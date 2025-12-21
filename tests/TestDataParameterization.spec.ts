import {expect, test} from "@playwright/test";
[
    {name:'standard_user', expected:'secret_sauce'},
    {name:'locked_out_user', expected:'secret_sauce'},
    {name:'problem_user', expected:'secret_sauce'},
    {name:'performance_glitch_user', expected:'secret_sauce'},
].forEach(({name, expected})=> {
    // test(`login and logout with different ${name} and ${expected}`,{tag:"@dataProviderTest"},async({page})=>{
    // await page.goto("https://www.saucedemo.com/v1/index.html");
    // await expect.soft(page).toHaveTitle('Swag Labs');
    // await page.getByPlaceholder('Username').fill(`${name}`);
    // await page.getByPlaceholder('Password').fill(`${expected}`);

    test(`login and logout with different ${name} and ${expected}`,{tag:"@dataProviderTest"},async({page})=>{
    await page.goto("https://www.saucedemo.com/v1/index.html");
    await expect.soft(page).toHaveTitle('Swag Labs');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole("button",{name:'Login'}).click();
    await page.getByText('Open Menu').click();
    await page.getByText('Logout').hover();
    await page.getByText('Logout').click();
    await page.close();

});
});
