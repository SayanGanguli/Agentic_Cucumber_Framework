module.exports = {
  default: {
    requireModule: ['tsx/cjs'],
    require: [
      'step_definitions/**/*.ts',
      'support/**/*.ts',
    ],
    paths: [
      'features/**/*.feature',
    ],
    format: [
      'progress',
      'html:test-results/cucumber/index.html',
      'json:test-results/cucumber/cucumber.json',
    ],
    timeout: 30000,
    publishQuiet: true,
  },
};