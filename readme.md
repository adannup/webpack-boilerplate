## Eslint rules examples:

- [rules explained by Shopify](https://github.com/Shopify/javascript)

## Eslint rules error:

- [Eslint class-methods.use-this](https://eslint.org/docs/rules/class-methods-use-this)
- [[Discussion] class-methods-use-this](https://github.com/Shopify/javascript/issues/263)

## TypeScript Install:

- [typeScriptLang](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
- [pluralSight](https://www.pluralsight.com/guides/react-typescript-webpack)

## Config ESLINT + typeScript + Prettier:

Steps to follow to config ESLINT + Prettier + typeScript.
Related: https://medium.com/@cosmvs/painless-migration-from-tslint-to-eslint-for-react-with-typescript-4befb4918ba8

## Notes:

#### TypeScript Issues:

- [hot.module](https://github.com/vitaliy-bobrov/angular-hot-loader/issues/5)
- [hot-module](https://github.com/webpack-contrib/webpack-hot-middleware/issues/89)

# Test Setup
## [Jest](https://jestjs.io/docs/en/tutorial-react)

### Installation
If you have an existing application you'll need to install a few packages to make everything work well together. We are using the `babel-jest` package and the `react` babel preset to transform our code inside of the test environment. Also see using babel.

Run
```sh
$ npm i --sav-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```

Your `package.json` should look something like this (where `<current-version>` is the actual latest version number for the package). Please add the scripts and jest configuration entries:

```json
// package.json
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "@babel/preset-env": "<current-version>",
    "@babel/preset-react": "<current-version>",
    "babel-jest": "<current-version>",
    "jest": "<current-version>",
    "react-test-renderer": "<current-version>"
  },
  "scripts": {
    "test": "jest"
  }
```

```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
```

### [Eslint](https://github.com/jest-community/eslint-plugin-jest#readme)
Run

```sh
$ npm install --sav-dev eslint eslint-plugin-jest
```

This plugin exports a recommended configuration that enforces good testing practices.

To enable this configuration use the extends property in your `.eslintrc` config file:

```json
{
  "extends": ["plugin:jest/recommended"]
}
```

### Configure Enzyme adapter

```js
// jest.config.js
module.exports = {
  setupTestFrameworkScriptFile: "<rootDir>/setupTests.ts"
}
```

This tells Jest to run setupTest.ts every time it's launched.

> [setupFilesAfterEnv](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)
> A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed. Since `setupFiles` executes before the test framework is installed in the environment, this script file presents you the opportunity of running some code immediately after the test framework has been installed in the environment.

> If you want a path to be relative to the root directory of your project, please include <rootDir> inside a path's string, like "<rootDir>/a-configs-folder".

### [Using with webpack](https://jestjs.io/docs/en/webpack)

#### Handling Static Assets

Next, let's configure Jest to gracefully handle asset files such as stylesheets and images. Usually, these files aren't particularly useful in tests so we can safely mock them out. However, if you are using CSS Modules then it's better to mock a proxy for your className lookups.

```js
// jest.config.js
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
}
```

And the mock files themselves:

```js
// __mocks__/styleMock.js
module.exports = {};
```

```js
// __mocks__/fileMock.js
module.exports = 'test-file-stub';
```

Without this configuration you'll get an error like this:

```sh
SyntaxError: Unexpected token '{'

      2 | import Header from '../Header';
      3 | 
    > 4 | import './App.scss';
        | ^
      5 | 
      6 | const App = () => (
      7 |   <div>
```

### [Using TypeScript](https://jestjs.io/docs/en/getting-started#using-typescript)
Jest supports TypeScript, via Babel. First, make sure you followed the instructions on using Babel above. Next, install the `@babel/preset-typescript` via `npm`:

```sh
$ npm i --save-dev @babel/preset-typescript
```

Then add `@babel/preset-typescript` to the list of presets in your `babel.config.js.`

```js
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
+    '@babel/preset-typescript',
  ],
};
```

## [Enzyme](https://enzymejs.github.io/enzyme/#installation)

To get started with enzyme, you can simply install it via npm. You will need to install enzyme along with an Adapter corresponding to the version of react (or other UI Component library) you are using. For instance, if you are using enzyme with React 16, you can run:

```sh
$ npm i --save-dev enzyme enzyme-adapter-react-16
```

Finally, you need to configure enzyme to use the adapter you want it to use. To do this, you can use the top level `configure(...)` API.

```js
// setupTests.js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

### [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json#readme)

Convert Enzyme wrappers to a format compatible with Jest snapshot testing.

Install
```sh
$ npm install --save-dev enzyme-to-json
```

The serializer is the recommended way to use `enzyme-to-json`, the installation and usage of it is very easy and allows you to write clean and simple snapshot tests.

In order to use the serializer, just add this line to your Jest configuration:

```js
// jest.config.js
"snapshotSerializers": ["enzyme-to-json/serializer"]
```

#### Before:

```jsx
expect(wrapper).toMatchInlineSnapshot(`ShallowWrapper {}`);
```

#### After:
```jsx
expect(wrapper).toMatchInlineSnapshot(`
    <h1>
        hello world
    </h1>
`);
```