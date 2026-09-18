import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { CustomWorld } from '../support/custom-world';

const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

Given('I am on the OrangeHRM login page', async function (this: CustomWorld) {
  await this.page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
  await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

When('I enter username {string} and password {string}', async function (
  this: CustomWorld,
  username: string,
  password: string,
) {
  await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
});

When('I submit the login form', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('I should be redirected to the OrangeHRM dashboard', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/web\/index\.php\/dashboard\/index/);
});

Then('I should see the Dashboard heading', async function (this: CustomWorld) {
  await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

Then('I should see the authenticated side navigation', async function (this: CustomWorld) {
  await expect(this.page.getByRole('navigation', { name: 'Sidepanel' })).toBeVisible();
});

Then('I should remain on the OrangeHRM login page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/web\/index\.php\/auth\/login/);
});

Then('I should see an {string} alert', async function (this: CustomWorld, message: string) {
  await expect(this.page.getByRole('alert').getByText(message, { exact: true })).toBeVisible();
});

Then('the login form should remain available', async function (this: CustomWorld) {
  await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
});
