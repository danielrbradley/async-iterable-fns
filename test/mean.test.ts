import { mean } from '../src/async-iterable-fns'

test('finds mean', () => {
  expect(
    mean(
      (function* () {
        yield 21
        yield 2
        yield 18
        yield 39
      })()
    )
  ).toEqual(20)
})

test('fails on empty collection', () => {
  expect(() => mean([])).toThrow(`Can't find mean of an empty collection`)
})
