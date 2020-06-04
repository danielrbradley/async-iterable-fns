import { filter, init } from '../src/async-iterable-fns'

test('can filter empty collection', () => {
  expect(Array.from(filter(init(0), (x) => true))).toEqual([])
})

test('can filter out everything', () => {
  expect(Array.from(filter(init(2), (x) => false))).toEqual([])
})

test('can filters based on criteria', () => {
  expect(Array.from(filter(init({ start: 1, count: 2 }), (x) => x % 2 === 0))).toEqual([2])
})

test('can filters based on index', () => {
  function* source() {
    yield 1
    yield 2
    yield 15
    yield 7
  }
  expect(Array.from(filter(source(), (x, index) => index % 2 === 0))).toEqual([1, 15])
})

test('chaining', () => {
  expect(
    init({ start: 1, count: 2 })
      .filter((x) => x % 2 === 0)
      .toArray()
  ).toEqual([2])
})
