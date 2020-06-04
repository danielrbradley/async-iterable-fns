import { every, chain } from '../src/async-iterable-fns'

test('matches existance', () => {
  expect(
    every(
      (function* () {
        yield 2
        yield 4
      })(),
      (x) => x % 2 === 0
    )
  ).toEqual(true)
})

test('matches non-existance', () => {
  expect(
    every(
      (function* () {
        yield 1
        yield 2
      })(),
      (x) => x === 2
    )
  ).toEqual(false)
})

test('passes index', () => {
  expect(
    every(
      (function* () {
        yield 1
        yield 2
      })(),
      (x, index) => index < 2
    )
  ).toEqual(true)
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield 2
        yield 4
      })()
    ).every((x) => x % 2 === 0)
  ).toEqual(true)
})
