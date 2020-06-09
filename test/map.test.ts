import { map, init, toArray } from '../src/async-iterable-fns'

test('maps empty collection', async () => {
  expect(await toArray(map(init(0), (x) => x))).toEqual([])
})

test('maps items', async () => {
  expect(await toArray(map(init({ start: 1, count: 2 }), (x) => x * 2))).toEqual([2, 4])
})

test('maps async', async () => {
  expect(await toArray(map(init({ start: 1, count: 2 }), async (x) => x * 2))).toEqual([2, 4])
})

test('can map with index', async () => {
  expect(await toArray(map(init({ start: 1, count: 2 }), (x, index) => index))).toEqual([0, 1])
})

test('chaining', async () => {
  expect(
    await init({ start: 1, count: 2 })
      .map((x) => x * 2)
      .toArray()
  ).toEqual([2, 4])
})

test('chaining async', async () => {
  expect(
    await init({ start: 1, count: 2 })
      .map(async (x) => x * 2)
      .toArray()
  ).toEqual([2, 4])
})
