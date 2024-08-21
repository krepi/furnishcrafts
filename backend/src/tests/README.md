[Back to Main README](../../../README.md)


# Testing Setup

## Introduction

In this project, we are using `Jest` as our testing framework. Since the project is built using ES Modules (`import/export` syntax), we need to configure `Jest` to support this module type.

## BDD Style Descriptions
Our test suite follows a BDD (Behavior-Driven Development) style for test descriptions. This approach emphasizes writing tests in a natural language format, focusing on the behavior of the system. We utilize the "Given-When-Then" structure, which enhances clarity and readability, making the tests easier to understand and maintain.

## Testing Strategy
Some of our service tests may seem to cover straightforward code, such as methods that primarily interact with repositories without significant business logic. However, we include these tests intentionally to support robust regression testing. By testing even simple services, we ensure that any changes in dependent modules are quickly detected, helping to maintain code stability as the project evolves.

## Why Babel?

`Jest` does not natively support ES Modules without additional configuration. To enable the use of ES Modules in our tests, we use `Babel`. `Babel` allows us to transform our ES Modules code into a format that `Jest` can process.

### Configuration

In our project, we have made the following configurations to set up `Jest` for working with ES Modules:

#### Babel Configuration

`Babel`: We installed `babel-jest` and configured Babel to transform our ES Modules code into CommonJS, which is compatible with `Jest`.

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env 
```

To enable Jest to work with ES Modules and other modern JavaScript syntax, you need to set up Babel. Create a `.babelrc` file in the root directory of your project or tested part e.g /backend (if you don't have one already) with the following content:

```json
{
  "presets": ["@babel/preset-env"]
}
```
#### Jest Configuration:

- In our `package.json`, we added a `jest` section to define the transform configuration:
```json
  "jest": {
        "transform": {
          "^.+\\.[t|j]sx?$": "babel-jest"
        }
      }
```
- Alternatively, you can create a jest.config.js file to specify the transform rules and set the testEnvironment to 'node':

```javascript
  export default {
        transform: {
          "^.+\\.[t|j]sx?$": "babel-jest"
        },
        testEnvironment: 'node'
      };
```

**ES Modules in Tests**: Thanks to Babel, you can continue to use `import` statements in your tests without having to rewrite them as `require`.

By following this setup, we ensure that our tests run smoothly while still using modern JavaScript features like ES Modules. This configuration allows Jest to handle our project's code effectively, whether it's written in ES Modules or other modern JavaScript syntax.


[Back to Main README](../../../README.md)