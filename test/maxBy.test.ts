import { maxBy, chain } from '../src/async-iterable-fns'

test('finds max age', () => {
  expect(
    maxBy(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual(21)
})

test('fails on empty collection', () => {
  expect(() => maxBy([], (x) => x)).toThrow(`Can't find max of an empty collection`)
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })()
    ).maxBy((x) => x.age)
  ).toEqual(21)
})
