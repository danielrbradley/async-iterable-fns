import { map, init } from '../src/async-iterable-fns'

test('maps empty collection', () => {
  expect(Array.from(map(init(0), (x) => x))).toEqual([])
})

test('maps items', () => {
  expect(Array.from(map(init({ start: 1, count: 2 }), (x) => x * 2))).toEqual([2, 4])
})

test('can map with index', () => {
  expect(Array.from(map(init({ start: 1, count: 2 }), (x, index) => index))).toEqual([0, 1])
})

test('chaining', () => {
  expect(
    init({ start: 1, count: 2 })
      .map((x) => x * 2)
      .toArray()
  ).toEqual([2, 4])
})
