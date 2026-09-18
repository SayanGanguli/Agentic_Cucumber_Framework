import { After, Before } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import type { CustomWorld } from './custom-world';

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.context.close();
  await this.browser.close();
});
