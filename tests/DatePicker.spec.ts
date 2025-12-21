import test, { expect, Locator } from "@playwright/test";

test('Select date from calendar', { tag: "@DatePicker" }, async ({ page }) => {
    await page.goto("https://jqueryui.com/datepicker/");
    const iFrame = page.frameLocator('.demo-frame');
    // Hardcode date select
    await iFrame.locator('[id="datepicker"]').fill('10/21/2025');

    // Selectind dynamic date
    // await iFrame.locator('[id="datepicker"]').click();
    // await iFrame.locator('.ui-datepicker-today').click();

    // Selecting past Date
    // await iFrame.locator('[id="datepicker"]').click();
    // await iFrame.locator('[title="Prev"]').click();
    // await iFrame.locator('text="25"').click();

    // Selecting future Date
    await iFrame.locator('[id="datepicker"]').click();
    await iFrame.locator('[title="Next"]').click();
    await iFrame.locator('text="25"').click();
});