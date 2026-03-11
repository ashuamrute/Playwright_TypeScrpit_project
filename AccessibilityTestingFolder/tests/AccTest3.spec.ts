import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import * as fs from 'fs';
import * as path from 'path';
import { createHtmlReport } from 'axe-html-reporter';
// import fs from 'fs';

test.describe('bbc page', () => { // 2
  test('accessibility issues',{tag:"@access3"}, async ({ page },testInfo) => {
    await page.goto('https://www.caterpillar.com/en/company.html'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page })
      // .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();  // 4

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      });
      
      const timestamp: string = new Date().toISOString().replace(/[:.]/g, '-');

      const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "CaterpillarHomepage"
      },
    });
    
    expect.soft(accessibilityScanResults.violations).toEqual([]); // 5
  });
});