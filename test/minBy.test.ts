import { minBy, chain } from '../src/async-iterable-fns'

test('finds min age', () => {
  expect(
    minBy(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual(2)
})

test('fails on empty collection', () => {
  expect(() => minBy([], (x) => x)).toThrow(`Can't find min of an empty collection`)
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })()
    ).minBy((x) => x.age)
  ).toEqual(2)
})
