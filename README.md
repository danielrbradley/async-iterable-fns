# Iterable Functions

[![npm version](https://badge.fury.io/js/async-iterable-fns.svg)](https://badge.fury.io/js/async-iterable-fns)
[![GitHub issues](https://img.shields.io/github/issues/danielrbradley/async-iterable-fns.svg)](https://github.com/danielrbradley/async-iterable-fns/issues)
[![TypeDoc docs](https://img.shields.io/badge/TypeDoc-docs-lightgrey.svg)](https://www.danielbradley.net/async-iterable-fns/)
[![Travis](https://img.shields.io/travis/danielrbradley/async-iterable-fns.svg)](https://travis-ci.org/danielrbradley/async-iterable-fns)
[![Coveralls](https://img.shields.io/coveralls/danielrbradley/async-iterable-fns.svg)](https://coveralls.io/github/danielrbradley/async-iterable-fns)
[![Dev Dependencies](https://david-dm.org/danielrbradley/async-iterable-fns/dev-status.svg)](https://david-dm.org/danielrbradley/async-iterable-fns?type=dev)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Really simple functions for working with iterable types, inspired by F#'s seq module design.

## Features

- Full type-safety with TypeScript
- Zero dependency
- Pure functions

## Installation

Add package using NPM or yarn

```bash
npm i --save async-iterable-fns
```

```bash
yarn add async-iterable-fns
```

You can import the top level modules directly:

```javascript
import { groupBy } from 'async-iterable-fns'
```

## Examples

Calculating primes lazily with iterators can either be done by calling each of the basic functions:

```javascript
import { count, initRaw, map, filter } from '../src/async-iterable-fns'

const range = initRaw({ from: 1, to: 100 })
const mapped = map(range, (x) => ({
  x,
  factors: filter(initRaw({ from: 1, to: x }), (y) => x % y === 0),
}))
const filtered = filter(mapped, (num) => count(num.factors) === 2)
const primes = map(filtered, (num) => num.x)
```

or can utilise the `chain` methods:

```javascript
import { init } from 'async-iterable-fns'

const primes = init({ from: 1, to: 100 })
  .map((x) => ({
    x,
    factors: init({ from: 1, to: x }).filter((y) => x % y === 0),
  }))
  .filter((num) => num.factors.count() === 2)
  .map((num) => num.x)

for (const prime of primes) {
  console.log(prime)
}
```

Grouping numbers into odd and even buckets

```javascript
import { init, toArray } from 'async-iterable-fns'

const oddAndEven = init({ from: 1, to: 25 })
  .groupBy((i) => (i % 2 === 0 ? 'even' : 'odd'))
  .map(([key, values]) => [key, toArray(values)])
```

## NPM scripts

- `yarn test`: Run test suite
- `yarn start`: Run `yarn build` in watch mode
- `yarn test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `yarn test:prod`: Run linting and generate coverage
- `yarn build`: Generate bundles and typings, create docs
- `yarn lint`: Lints code
- `yarn commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
