
# FurnishCrafts - Testing and CI/CD


## Table of Contents

- [Introduction](#introduction)
- [Testing Setup](#testing-setup)
    - [Introduction](#introduction)
    - [BDD Style Descriptions](#bdd-style-descriptions)
    - [Testing Strategy](#testing-strategy)
    - [Why Babel?](#why-babel)
        - [Configuration](#configuration)
            - [Babel Configuration](#babel-configuration)
            - [Jest Configuration](#jest-configuration)
    - [Running Tests](#running-tests)
        - [Test Coverage](#test-coverage)
- [CI/CD Pipeline](#cicd-pipeline)
    - [GitHub Actions Setup](#github-actions-setup)
    - [Continuous Integration Workflow](#continuous-integration-workflow)


---

## Introduction

This project serves as the backend for FurnishCrafts, a furniture management and ordering system. The backend is built using Node.js and Express, and it connects to a PostgreSQL database.

## Testing Setup

### Introduction

In this project, we are using `Jest` as our testing framework. Since the project is built using ES Modules (`import/export` syntax), we need to configure `Jest` to support this module type.

### BDD Style Descriptions

Our test suite follows a BDD (Behavior-Driven Development) style for test descriptions. This approach emphasizes writing tests in a natural language format, focusing on the behavior of the system. We utilize the "Given-When-Then" structure, which enhances clarity and readability, making the tests easier to understand and maintain.

### Testing Strategy

Some of our service tests may seem to cover straightforward code, such as methods that primarily interact with repositories without significant business logic. However, we include these tests intentionally to support robust regression testing. By testing even simple services, we ensure that any changes in dependent modules are quickly detected, helping to maintain code stability as the project evolves.

### Why Babel?

`Jest` does not natively support ES Modules without additional configuration. To enable the use of ES Modules in our tests, we use `Babel`. `Babel` allows us to transform our ES Modules code into a format that `Jest` can process.

#### Configuration

In our project, we have made the following configurations to set up `Jest` for working with ES Modules:

##### Babel Configuration

`Babel`: We installed `babel-jest` and configured Babel to transform our ES Modules code into CommonJS, which is compatible with `Jest`.

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

To enable Jest to work with ES Modules and other modern JavaScript syntax, you need to set up Babel. Create a `.babelrc` file in the root directory of your project (if you don't have one already) with the following content:

```json
{
  "presets": ["@babel/preset-env"]
}
```

##### Jest Configuration

- In our `package.json`, we added a `jest` section to define the transform configuration:

```json
  "jest": {
        "transform": {
          "^.+\.[t|j]sx?$": "babel-jest"
        }
      }
```

- Alternatively, you can create a jest.config.js file to specify the transform rules and set the testEnvironment to 'node':

```javascript
  export default {
        transform: {
          "^.+\.[t|j]sx?$": "babel-jest"
        },
        testEnvironment: 'node'
      };
```

**ES Modules in Tests**: Thanks to Babel, you can continue to use `import` statements in your tests without having to rewrite them as `require`.

By following this setup, we ensure that our tests run smoothly while still using modern JavaScript features like ES Modules. This configuration allows Jest to handle our project's code effectively, whether it's written in ES Modules or other modern JavaScript syntax.

### Running Tests

You can run tests using the following commands:

- Run all tests:

```bash
npm test
```

- Run a specific suite, for example, only services:

```bash
npm run UT-services
```

- Run tests for a specific service:

```bash
npm run UT-elements-service
```

- Run tests with coverage:

```bash
npm test -- --coverage
```

### Test Coverage

Using the `--coverage` flag will generate a detailed report showing which parts of the codebase are covered by tests. The coverage report is shown in the terminal and can be opened in a browser for detailed analysis.

---
## CI/CD Pipeline

### GitHub Actions Setup

We have integrated a Continuous Integration/Continuous Deployment (CI/CD) pipeline using GitHub Actions. This pipeline automatically runs tests, lints the code, and checks for any potential issues whenever new code is pushed to the repository or a pull request is opened.

### Continuous Integration Workflow

The CI/CD process is defined in the `.github/workflows/ci.yml` file. This file includes steps to:

- **Install Dependencies**: Ensures that all necessary packages and dependencies are installed in the environment.
- **Run ESLint**: Checks the codebase for any linting errors according to the ESLint configuration.
- **Run Tests**: Executes all unit tests to verify that the code changes do not break any functionality.

Here’s an overview of the key components:

- **Node.js Version**: The CI pipeline uses Node.js version 22, aligning with the development environment.
- **ESLint**: Ensures code quality and consistency across the codebase.
- **Jest**: Runs all unit tests and generates a coverage report.

#### Environment Variables and Secrets

Sensitive data, such as database credentials, is stored securely in GitHub Secrets. These secrets are referenced in the workflow to ensure a secure CI/CD process.

To add or manage secrets:
- Navigate to **Settings** → **Secrets and variables** → **Actions** on GitHub.
- Add your secrets under **Repository secrets** to ensure they are available during the CI/CD process.

### Running the CI/CD Pipeline

To trigger the CI/CD pipeline manually, you can push changes to the repository or create a pull request. The pipeline will automatically execute the defined workflow and provide feedback on any issues directly in the pull request.



[Back to Main README](../../../README.md)
