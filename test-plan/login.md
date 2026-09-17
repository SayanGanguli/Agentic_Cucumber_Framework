# Planner Blueprint: OrangeHRM Login

## Target
- URL: `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`
- Page title: `OrangeHRM`
- Authentication destination after successful login: `/web/index.php/dashboard/index`

## Scenarios (high-level)

1. **Successful login with the published demo credentials**
   - Enter `Admin` in the Username field and `admin123` in the Password field.
   - Submit the login form.
   - Confirm navigation to the dashboard route and verify the `Dashboard` heading is present.
   - Confirm the authenticated shell is visible, such as the `Sidepanel` navigation or the `Search` textbox.

2. **Invalid username and password**
   - Enter credentials that are not valid for the demo account.
   - Submit the form.
   - Confirm the user remains on the login route.
   - Confirm an accessible alert reports `Invalid credentials` and the login form remains available.

3. **Submit with both fields empty**
   - Submit the form without entering any values.
   - Confirm both Username and Password fields show required-field feedback.
   - Confirm no dashboard navigation occurs.

4. **Submit with only the username populated**
   - Enter a value in Username and leave Password empty.
   - Submit the form.
   - Confirm Password shows required-field feedback and the user remains on the login page.

5. **Submit with only the password populated**
   - Leave Username empty and enter a value in Password.
   - Submit the form.
   - Confirm Username shows required-field feedback and the user remains on the login page.

6. **Password input is protected**
   - Focus the Password field and enter a value.
   - Confirm the control is a password input and does not expose the entered value as plain text.

7. **Forgot-password entry point**
   - Select `Forgot your password?`.
   - Confirm navigation to the password-reset flow or the reset form presented by the application.

## Element Map

| Element | Preferred Playwright locator | Expected purpose or state |
|---|---|---|
| Login page heading | `page.getByRole('heading', { name: 'Login' })` | Confirms the login view is rendered. |
| Username field | `page.getByRole('textbox', { name: 'Username' })` | Accepts the account username; initially empty and focused on first load. |
| Password field | `page.getByRole('textbox', { name: 'Password' })` | Accepts the password; should be masked. |
| Login button | `page.getByRole('button', { name: 'Login' })` | Submits the authentication form. |
| Required validation feedback | `page.getByText('Required', { exact: true })` | Appears beside each empty required field after submission. Scope to the relevant field container when asserting one field. |
| Invalid-credentials alert | `page.getByRole('alert').getByText('Invalid credentials', { exact: true })` | Appears after rejected credentials. A broader alternative is `page.getByRole('alert')`. |
| Forgot-password control | `page.getByText('Forgot your password?', { exact: true })` | Opens the password-reset flow. |
| Login page URL | `page` URL assertion for `/web/index.php/auth/login` | Confirms rejected or incomplete submissions do not authenticate. |
| Dashboard heading | `page.getByRole('heading', { name: 'Dashboard' })` | Confirms successful authentication and dashboard rendering. |
| Authenticated side navigation | `page.getByRole('navigation', { name: 'Sidepanel' })` | Confirms the authenticated application shell is present. |
| Dashboard search field | `page.getByRole('textbox', { name: 'Search' })` | Additional authenticated-shell check. |
| Demo credential text | `page.getByText('Username : Admin', { exact: true })` and `page.getByText('Password : admin123', { exact: true })` | Informational page content; useful for verifying the demo page fixture, not an authentication result. |

## Notes and Assumptions

- The page currently exposes the demo credentials in instructional text. Tests should use those values only for the successful-login scenario and should not derive credentials from the DOM in a production-style test.
- The initial live page rendered accessible roles for the two inputs, the Login button, and the Login heading, so role/name locators are preferred over CSS classes or generated attributes.
- Empty submission produced one `Required` message for each empty field.
- Invalid credentials produced an accessible alert with the exact text `Invalid credentials` and retained the login form.
- The successful login check reached `/web/index.php/dashboard/index` and rendered the `Dashboard` heading.
- Authentication state should be isolated between scenarios. Start each scenario at the login URL or clear the browser context so a prior successful login cannot affect later checks.
- The forgot-password destination was not followed during this review; assert its actual reset route or heading after the first implementation run.
- Because this is a shared public demo environment, network readiness and account availability can vary. Use navigation waits and avoid assertions tied to volatile dashboard widgets.
