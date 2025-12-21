import { test, Page, expect } from "@playwright/test";

test('Box note Script', { tag: "@ScreenshotCompare" }, async ({ page }) => {
    await page.goto("https://app.box.com");
   
    // await expect.soft(page.locator("button[aria-label='New']"), "New Button is disabled").toBeEnabled();
    const timestamp = Date.now();
    //  take screenshot
    const scrhot =await page.screenshot();

    //  take and save screenshot full page
    // await page.screenshot({ path: `images/test_${timestamp}.png`, fullPage: true });

    // Elemenet screenshot
    // await page.locator('.header').screenshot({ path: 'screenshot.png' });

    // await page.screenshot({ path: 'images/test.png', fullPage: true });

  //  Screenshot comparison
//   await expect(page).toHaveScreenshot('test_1760546646183.png');
    // Screenshot comparison (static name)
  await expect(page).toHaveScreenshot();
});