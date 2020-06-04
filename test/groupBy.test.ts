import { groupBy, chain } from '../src/async-iterable-fns'

test('groups by key', () => {
  expect(
    Array.from(
      groupBy(
        (function* () {
          yield { name: 'amy', age: 1 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 2 }
        })(),
        (x) => x.age
      )
    )
  ).toEqual([
    [1, [{ name: 'amy', age: 1 }]],
    [
      2,
      [
        { name: 'bob', age: 2 },
        { name: 'cat', age: 2 },
      ],
    ],
  ])
})

test('groups by index', () => {
  expect(
    Array.from(
      groupBy(
        (function* () {
          yield { name: 'amy', age: 1 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 2 }
        })(),
        (x, index) => index % 2
      )
    )
  ).toEqual([
    [
      0,
      [
        { name: 'amy', age: 1 },
        { name: 'cat', age: 2 },
      ],
    ],
    [1, [{ name: 'bob', age: 2 }]],
  ])
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield { name: 'amy', age: 1 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 2 }
      })()
    )
      .groupBy((x) => x.age)
      .toArray()
  ).toEqual([
    [1, [{ name: 'amy', age: 1 }]],
    [
      2,
      [
        { name: 'bob', age: 2 },
        { name: 'cat', age: 2 },
      ],
    ],
  ])
})
