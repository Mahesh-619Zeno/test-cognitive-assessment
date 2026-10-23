import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  setup.setTimeout(5 * 60 * 1000); // 5 minutes

  await page.goto('https://dev.appmod.ai/login');

  console.log('Complete Google login manually in the browser.');

  await page.waitForTimeout(120000);

  await page.context().storageState({
    path: authFile,
  });

  console.log('Authentication state saved.');
});
