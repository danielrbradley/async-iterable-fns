import { sortBy, chain } from '../src/async-iterable-fns'

test('sorts by selected key', () => {
  expect(
    Array.from(
      sortBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    )
  ).toEqual([
    { name: 'bob', age: 2 },
    { name: 'cat', age: 18 },
    { name: 'amy', age: 21 },
  ])
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })()
    )
      .sortBy((x) => x.age)
      .toArray()
  ).toEqual([
    { name: 'bob', age: 2 },
    { name: 'cat', age: 18 },
    { name: 'amy', age: 21 },
  ])
})
