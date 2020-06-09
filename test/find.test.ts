import { find, chain } from '../src/async-iterable-fns'

test('finds match', async () => {
  expect(
    await find(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'bob'
    )
  ).toEqual({ name: 'bob', id: 2 })
})

test('async match', async () => {
  expect(
    await find(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      async (x) => x.name === 'bob'
    )
  ).toEqual({ name: 'bob', id: 2 })
})

test('returns undefined when not found', async () => {
  expect(
    await find(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'cat'
    )
  ).toBeUndefined()
})

test('finds by index', async () => {
  expect(
    await find(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x, index) => index === 1
    )
  ).toEqual({ name: 'bob', id: 2 })
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })()
    ).find((x) => x.name === 'bob')
  ).toEqual({ name: 'bob', id: 2 })
})

test('chaining async', async () => {
  expect(
    await chain(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })()
    ).find(async (x) => x.name === 'bob')
  ).toEqual({ name: 'bob', id: 2 })
})
