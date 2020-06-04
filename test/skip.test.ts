import { skip, chain } from '../src/async-iterable-fns'

test('skipping none', () => {
  expect(
    Array.from(
      skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        0
      )
    )
  ).toEqual([1, 2, 3, 4])
})

test('skipping some', () => {
  expect(
    Array.from(
      skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        2
      )
    )
  ).toEqual([3, 4])
})

test('skipping all', () => {
  expect(
    Array.from(
      skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        4
      )
    )
  ).toEqual([])
})

test('skipping more than count', () => {
  expect(
    Array.from(
      skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        8
      )
    )
  ).toEqual([])
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield 1
        yield 2
        yield 3
        yield 4
      })()
    )
      .skip(2)
      .toArray()
  ).toEqual([3, 4])
})
