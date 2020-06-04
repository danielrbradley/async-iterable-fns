import { meanBy, chain } from '../src/async-iterable-fns'

test('finds mean age', () => {
  expect(
    meanBy(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
        yield { name: 'dot', age: 39 }
      })(),
      (x) => x.age
    )
  ).toEqual(20)
})

test('fails on empty collection', () => {
  expect(() => meanBy([], (x) => x)).toThrow(`Can't find mean of an empty collection`)
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
        yield { name: 'dot', age: 39 }
      })()
    ).meanBy((x) => x.age)
  ).toEqual(20)
})
