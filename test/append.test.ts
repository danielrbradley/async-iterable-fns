import { append, chain } from '../src/async-iterable-fns'

test('appends two iterators', () => {
  expect(
    Array.from(
      append(
        (function* () {
          yield 1
        })(),
        (function* () {
          yield 2
        })()
      )
    )
  ).toEqual([1, 2])
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield 1
      })()
    )
      .append(
        (function* () {
          yield 2
        })()
      )
      .toArray()
  ).toEqual([1, 2])
})
