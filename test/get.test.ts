import { get, chain } from '../src/async-iterable-fns'

test('finds match', async () => {
  expect(
    await get(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'bob'
    )
  ).toEqual({ name: 'bob', id: 2 })
})

test('throws when not found', async () => {
  try {
    await get(
      (async function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'cat'
    )
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual('Element not found matching criteria')
  }
})

test('finds by index', async () => {
  expect(
    await get(
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
    ).get((x) => x.name === 'bob')
  ).toEqual({ name: 'bob', id: 2 })
})
