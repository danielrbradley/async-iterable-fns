import { skip, chain, toArray } from '../src/async-iterable-fns'

test('skipping none', async () => {
  expect(
    await toArray(
      skip(
        (async function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        0
      )
    )
  ).toEqual([1, 2, 3, 4])
})

test('skipping some', async () => {
  expect(
    await toArray(
      skip(
        (async function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        2
      )
    )
  ).toEqual([3, 4])
})

test('skipping all', async () => {
  expect(
    await toArray(
      skip(
        (async function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        4
      )
    )
  ).toEqual([])
})

test('skipping more than count', async () => {
  expect(
    await toArray(
      skip(
        (async function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        8
      )
    )
  ).toEqual([])
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield 1
        yield 2
        yield 3
        yield 4
      })()
    )
      .skip(2)
      .toArray()
  ).toEqual([3, 4])
})
