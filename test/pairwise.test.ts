import { pairwise, initRaw, init, toArray } from '../src/async-iterable-fns'

test('empty', async () => {
  expect(await toArray(pairwise(initRaw(0)))).toEqual([])
})

test('single item', async () => {
  expect(await toArray(pairwise(initRaw(1)))).toEqual([])
})

test('multiple items', async () => {
  expect(await toArray(pairwise(initRaw(3)))).toEqual([
    [0, 1],
    [1, 2],
  ])
})

test('chaining', async () => {
  expect(await init(3).pairwise().toArray()).toEqual([
    [0, 1],
    [1, 2],
  ])
})
