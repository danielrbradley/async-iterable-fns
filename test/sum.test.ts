import { sum } from '../src/async-iterable-fns'

test('numbers', () => {
  expect(
    sum(
      (function* () {
        yield 21
        yield 2
        yield 18
      })()
    )
  ).toEqual(41)
})
