import { collect, chain, toArray, init } from '../src/async-iterable-fns'

test('collect iterables', async () => {
  expect(
    await toArray(
      collect(init({ from: 1, to: 2 }), function* (x) {
        yield x
        yield x
      })
    )
  ).toEqual([1, 1, 2, 2])
})

test('collect async iterables', async () => {
  expect(
    await toArray(
      collect(init({ from: 1, to: 2 }), async function* (x) {
        yield x
        yield x
      })
    )
  ).toEqual([1, 1, 2, 2])
})

test('collect arrays', async () => {
  expect(await toArray(collect(init({ from: 1, to: 2 }), (x) => [x, x]))).toEqual([1, 1, 2, 2])
})

test('with index', async () => {
  expect(
    await toArray(
      collect(init({ from: 1, to: 2 }), function* (x, index) {
        yield x
        yield x + index
      })
    )
  ).toEqual([1, 1, 2, 3])
})

test('chaining', async () => {
  expect(
    await init({ from: 1, to: 2 })
      .collect(function* (x) {
        yield x
        yield x
      })
      .toArray()
  ).toEqual([1, 1, 2, 2])
})
