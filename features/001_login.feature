Feature: OrangeHRM login

  Scenario: Successful login with valid credentials
    Given I am on the OrangeHRM login page
    When I enter username "Admin" and password "admin123"
    And I submit the login form
    Then I should be redirected to the OrangeHRM dashboard
    And I should see the Dashboard heading
    And I should see the authenticated side navigation

  Scenario: Login fails with invalid credentials
    Given I am on the OrangeHRM login page
    When I enter username "invalid-user" and password "invalid-password"
    And I submit the login form
    Then I should remain on the OrangeHRM login page
    And I should see an "Invalid credentials" alert
    And the login form should remain available
