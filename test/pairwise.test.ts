import { pairwise, initRaw, init } from '../src/async-iterable-fns'

test('empty', () => {
  expect(Array.from(pairwise(initRaw(0)))).toEqual([])
})

test('single item', () => {
  expect(Array.from(pairwise(initRaw(1)))).toEqual([])
})

test('multiple items', () => {
  expect(Array.from(pairwise(initRaw(3)))).toEqual([
    [0, 1],
    [1, 2],
  ])
})

test('chaining', () => {
  expect(init(3).pairwise().toArray()).toEqual([
    [0, 1],
    [1, 2],
  ])
})
