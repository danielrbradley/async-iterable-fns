import { exists, chain } from '../src/async-iterable-fns'

test('matches non-existance', () => {
  expect(
    exists(
      (function* (): Generator<number> {
        yield 1
        yield 2
      })(),
      (x) => x === 3
    )
  ).toEqual(false)
})

test('matches existance', () => {
  expect(
    exists(
      (function* () {
        yield 1
        yield 2
      })(),
      (x) => x === 1
    )
  ).toEqual(true)
})

test('passes index', () => {
  expect(
    exists(
      (function* () {
        yield 1
        yield 2
      })(),
      (x, index) => x === 2 && index === 1
    )
  ).toEqual(true)
})

test('chaining', () => {
  expect(
    chain(
      (function* (): Generator<number> {
        yield 1
        yield 2
      })()
    ).exists((x) => x === 3)
  ).toEqual(false)
})
