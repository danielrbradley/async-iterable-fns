import { choose, chain, toArray, init } from '../src/async-iterable-fns'

it('chooses defined values', async () => {
  expect(
    await toArray(choose(init({ from: 1, to: 3 }), (x) => (x % 2 === 1 ? x * 2 : undefined)))
  ).toEqual([2, 6])
})

it('chooses with index', async () => {
  expect(
    await toArray(choose(init({ from: 1, to: 3 }), (x, index) => (index % 2 === 0 ? x * 2 : x)))
  ).toEqual([2, 2, 6])
})

test('chaining', async () => {
  expect(
    await init({ from: 1, to: 3 })
      .choose((x) => (x % 2 === 1 ? x * 2 : undefined))
      .toArray()
  ).toEqual([2, 6])
})
