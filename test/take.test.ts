import { take, initInfinite, initInfiniteRaw, toArray } from '../src/async-iterable-fns'

test('taking some', async () => {
  expect(await toArray(take(initInfiniteRaw(), 3))).toEqual([0, 1, 2])
})

test('chaining', async () => {
  expect(await initInfinite().take(3).toArray()).toEqual([0, 1, 2])
})
