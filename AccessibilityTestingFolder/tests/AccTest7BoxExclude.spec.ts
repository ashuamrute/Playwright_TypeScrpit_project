import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import { createHtmlReport } from 'axe-html-reporter';

test('test', { tag: '@access7'}, async ({ page },testInfo) => {
  await page.goto("https://app.box.com");
  // await page.locator("id=login-email").fill('qacult.demo@gmail.com');
  await page.getByLabel('Email Address', { exact: true }).fill('qacult.demo@gmail.com');

  await page.locator("id=login-submit").click();

  await page.locator("id=password-login").fill('testing123');
  await page.getByRole('button', { name: 'Log In' }).click();

  await page.locator("button[data-testid='new-item-menu-button']").waitFor();
  
  const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude("button[data-testid='new-item-menu-button']")
      .analyze();  // 4

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      });

      const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "BoxNewButtonExclude"
      },
    });
    expect(accessibilityScanResults.violations).toEqual([]); // 5
  // await page.close();

});