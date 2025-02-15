import { browser, $ as $wdio, $$ as $$wdio } from '@wdio/globals';
import { expect } from '@wdio/globals';

describe('Results Page', () => {
    beforeEach(async () => {
        await browser.url('/results');
    });

    it('should display the search input', async () => {
        const searchInput = await $wdio('input[placeholder="Search by exact name..."]');
        await expect(searchInput).toBeDisplayed();
    });

});