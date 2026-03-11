import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import { writeFile } from 'fs/promises';

test.describe('bbc page', () => { // 2
  test('accessibility issues',{tag:"@access2"}, async ({ page },testInfo) => {
    await page.goto('https://www.abplive.com/'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();  // 4

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      });
      
      await writeFile('accessibility-report.json', JSON.stringify(accessibilityScanResults.violations, null, 2));

    expect.soft(accessibilityScanResults.violations).toEqual([]); // 5
    await page.close();
  });
});