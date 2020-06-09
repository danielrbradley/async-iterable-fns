import { filter, init, toArray } from '../src/async-iterable-fns'

test('can filter empty collection', async () => {
  expect(await toArray(filter(init(0), (x) => true))).toEqual([])
})

test('can filter out everything', async () => {
  expect(await toArray(filter(init(2), (x) => false))).toEqual([])
})

test('can filters based on criteria', async () => {
  expect(await toArray(filter(init({ start: 1, count: 2 }), (x) => x % 2 === 0))).toEqual([2])
})

test('can filters based on index', async () => {
  async function* source() {
    yield 1
    yield 2
    yield 15
    yield 7
  }
  expect(await toArray(filter(source(), (x, index) => index % 2 === 0))).toEqual([1, 15])
})

test('can filter async', async () => {
  expect(
    await toArray(
      filter(init({ start: 1, count: 2 }), (x) => new Promise((resolve) => resolve(x % 2 === 0)))
    )
  ).toEqual([2])
})

test('chaining', async () => {
  expect(
    await init({ start: 1, count: 2 })
      .filter((x) => x % 2 === 0)
      .toArray()
  ).toEqual([2])
})

test('chaining async', async () => {
  expect(
    await init({ start: 1, count: 2 })
      .filter(async (x) => x % 2 === 0)
      .toArray()
  ).toEqual([2])
})
