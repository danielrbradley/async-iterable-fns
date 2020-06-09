import { groupBy, chain, toArray } from '../src/async-iterable-fns'

test('groups by key', async () => {
  expect(
    await groupBy(
      (async function* () {
        yield { name: 'amy', age: 1 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 2 }
      })(),
      (x) => x.age
    )
  ).toEqual(
    new Map([
      [1, [{ name: 'amy', age: 1 }]],
      [
        2,
        [
          { name: 'bob', age: 2 },
          { name: 'cat', age: 2 },
        ],
      ],
    ])
  )
})

test('groups by index', async () => {
  expect(
    await groupBy(
      (async function* () {
        yield { name: 'amy', age: 1 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 2 }
      })(),
      (x, index) => index % 2
    )
  ).toEqual(
    new Map([
      [
        0,
        [
          { name: 'amy', age: 1 },
          { name: 'cat', age: 2 },
        ],
      ],
      [1, [{ name: 'bob', age: 2 }]],
    ])
  )
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield { name: 'amy', age: 1 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 2 }
      })()
    ).groupBy((x) => x.age)
  ).toEqual(
    new Map([
      [1, [{ name: 'amy', age: 1 }]],
      [
        2,
        [
          { name: 'bob', age: 2 },
          { name: 'cat', age: 2 },
        ],
      ],
    ])
  )
})
