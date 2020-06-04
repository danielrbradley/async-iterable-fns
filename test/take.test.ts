import { take, initInfinite, initInfiniteRaw } from '../src/async-iterable-fns'

test('taking some', () => {
  expect(Array.from(take(initInfiniteRaw(), 3))).toEqual([0, 1, 2])
})

test('chaining', () => {
  expect(initInfinite().take(3).toArray()).toEqual([0, 1, 2])
})
