import { concat } from '../src/async-iterable-fns'

test('nested iterators', () => {
  expect(
    Array.from(
      concat(
        (function* () {
          yield (function* () {
            yield 1
            yield 2
          })()
          yield (function* () {
            yield 3
            yield 4
          })()
          yield [5]
        })()
      )
    )
  ).toEqual([1, 2, 3, 4, 5])
})
