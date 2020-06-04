import { toArray, chain } from '../src/async-iterable-fns'

test('constructs an array', () => {
  function* source() {
    yield 1
    yield 2
  }
  expect(toArray(source())).toEqual([1, 2])
})

test('chaining', () => {
  function* source() {
    yield 1
    yield 2
  }
  expect(chain(source()).toArray()).toEqual([1, 2])
})
