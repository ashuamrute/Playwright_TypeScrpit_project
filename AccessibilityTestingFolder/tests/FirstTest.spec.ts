import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1


test.describe('bbc page', () => { // 2
  test('accessibility issues',{tag:"@access1"}, async ({ page }) => {
    await page.goto("https://playwright.dev"); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();  // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});