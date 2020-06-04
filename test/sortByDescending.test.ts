import { sortByDescending, chain } from '../src/async-iterable-fns'

test('by selected key', () => {
  expect(
    Array.from(
      sortByDescending(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    )
  ).toEqual([
    { name: 'amy', age: 21 },
    { name: 'cat', age: 18 },
    { name: 'bob', age: 2 },
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
      .sortByDescending((x) => x.age)
      .toArray()
  ).toEqual([
    { name: 'amy', age: 21 },
    { name: 'cat', age: 18 },
    { name: 'bob', age: 2 },
  ])
})
