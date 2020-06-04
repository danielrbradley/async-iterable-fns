import { reverse, init, chain } from '../src/async-iterable-fns'

test('empty iterable', () => {
  expect(Array.from(reverse(init(0)))).toEqual([])
})

test('reversal', () => {
  expect(Array.from(reverse([8, 3, 5]))).toEqual([5, 3, 8])
})

test('chaining', () => {
  expect(chain([8, 3, 5]).reverse().toArray()).toEqual([5, 3, 8])
})
