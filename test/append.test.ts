import { append, chain, toArray } from '../src/async-iterable-fns'

test('appends two iterators', async () => {
  expect(
    await toArray(
      append(
        (async function* () {
          yield 1
        })(),
        (async function* () {
          yield 2
        })()
      )
    )
  ).toEqual([1, 2])
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield 1
      })()
    )
      .append(
        (async function* () {
          yield 2
        })()
      )
      .toArray()
  ).toEqual([1, 2])
})
