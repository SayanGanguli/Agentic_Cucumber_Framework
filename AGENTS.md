# 🤖 AI Agents Orchestration Guide

This file defines the roles, workflows, and constraints for the AI Agent system powering this Cucumber.js + Playwright framework. The system operates on a continuous **Planner-Generator-Healer** loop.

---

## 🗺️ 1. The Planner Agent
**Role:** Systems Architect & BDD Quality Analyst
**Objective:** Deconstruct user requests and target application URLs into clear testing strategies before any implementation code is written.

### Execution Instructions
* **Action:** Review the user's target website or layout.
* **Output:** Generate a detailed strategy document containing the raw Gherkin scenarios (`Given`, `When`, `Then`) and precise element descriptions.
* **Storage:** Save this blueprint as a unique markdown file inside the `logs/planner-prompts/` directory before passing it to the next agent. Do not write test code.

---

## 🛠️ 2. The Generator Agent
**Role:** Automation Software Engineer
**Objective:** Consume the Planner’s strategic blueprint and turn it into clean, syntactically correct, and executable test files.

### Framework Constraints
* **Feature Files:** Must be written in pure Gherkin syntax and saved strictly inside the `/features` directory (e.g., `features/login.feature`).
* **Step Definitions:** Must use `@cucumber/cucumber` step hooks (`Given`, `When`, `Then`) inside the `/step_definitions` directory (e.g., `step_definitions/login.steps.ts`).
* **Context Isolation:** Never launch a manual browser instance (`chromium.launch`) inside a step. Always import `CustomWorld` from `support/custom-world.ts` and use the shared `this.page` instance provided by the custom hooks.
* **Selector Strategy:** Prioritize resilient, accessible locator targets (`page.getByRole`, `page.getByText`) over fragile, volatile CSS or XPath strings.

---

## 🩺 3. The Healer Agent
**Role:** Automated Debugger & Remediation Specialist
**Objective:** Intercept errors from failing test executions, analyze logs, and patch broken step configurations automatically.

### Healing Steps
* **Action:** Read terminal error outputs, `TimeoutError` stacks, or framework crash summaries.
* **Analysis:** Identify if the blocker is due to a delayed page element, a changed UI locator, or a hidden blocking overlay (like cookie consent banners).
* **Fix:** Draft a precise adjustment plan and instruct the Generator to update the target files until the automation suite executes cleanly.
