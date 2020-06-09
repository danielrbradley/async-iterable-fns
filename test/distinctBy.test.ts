import { distinctBy, chain, toArray } from '../src/async-iterable-fns'

test('ignores duplicates', async () => {
  expect(
    await toArray(
      distinctBy(
        (async function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
          yield { name: 'bob', id: 3 }
          yield { name: 'cat', id: 3 }
        })(),
        (x) => x.name
      )
    )
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 2 },
    { name: 'cat', id: 3 },
  ])
})

test('using index', async () => {
  expect(
    await toArray(
      distinctBy(
        (async function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
          yield { name: 'bob', id: 3 }
          yield { name: 'cat', id: 3 }
        })(),
        (x, index) => Math.floor(index / 2)
      )
    )
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 3 },
  ])
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
        yield { name: 'bob', id: 3 }
        yield { name: 'cat', id: 3 }
      })()
    )
      .distinctBy((x) => x.name)
      .toArray()
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 2 },
    { name: 'cat', id: 3 },
  ])
})
