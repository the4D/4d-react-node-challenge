import { test, expect } from '@playwright/test';

test.describe('Results Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/results');
    });

    test('should display the results page title', async ({ page }) => {
        await expect(page.getByText('Document Management System', { exact: true }))
            .toBeVisible();
    });
});