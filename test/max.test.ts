import { max } from '../src/async-iterable-fns'

test('finds max', () => {
  expect(
    max(
      (function* () {
        yield 2
        yield 21
        yield 18
      })()
    )
  ).toEqual(21)
})

test('fails on empty collection', () => {
  expect(() => max([])).toThrow(`Can't find max of an empty collection`)
})
