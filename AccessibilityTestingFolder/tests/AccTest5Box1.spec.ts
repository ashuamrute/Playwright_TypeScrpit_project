import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import { writeFile } from 'fs/promises';
import { createHtmlReport } from 'axe-html-reporter';
import fs from 'fs';

test.describe('box test', () => { // 2
  test('accessibility issues',{tag:"@access5"}, async ({ page },testInfo) => {
    await page.goto('https://app.box.com'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();  // 4

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      });

      const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "BoxLoginpage"
      },
    });
    //  if (!fs.existsSync("build/reports/accessibility-report.html")) {
    //   fs.mkdirSync("build/reports", {
    //     recursive: true,
    //   });
    // }
    // fs.writeFileSync("build/reports/accessibility-report.html", reportHTML);
    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});