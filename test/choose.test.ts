import { choose, chain } from '../src/async-iterable-fns'

it('chooses defined values', () => {
  expect(Array.from(choose([1, 2, 3], (x) => (x % 2 === 1 ? x * 2 : undefined)))).toEqual([2, 6])
})

it('chooses with index', () => {
  expect(Array.from(choose([1, 2, 3], (x, index) => (index % 2 === 0 ? x * 2 : x)))).toEqual([
    2,
    2,
    6,
  ])
})

test('chaining', () => {
  expect(
    chain([1, 2, 3])
      .choose((x) => (x % 2 === 1 ? x * 2 : undefined))
      .toArray()
  ).toEqual([2, 6])
})
