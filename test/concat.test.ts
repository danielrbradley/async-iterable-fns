import { concat, toArray } from '../src/async-iterable-fns'

test('iterable of various types', async () => {
  expect(
    await toArray(
      concat(
        (function* () {
          yield (function* (): Iterable<number> {
            yield 1
            yield 2
          })()
          yield (async function* () {
            yield 3
            yield 4
          })()
          yield [5]
        })()
      )
    )
  ).toEqual([1, 2, 3, 4, 5])
})

test('async iterable of various types', async () => {
  expect(
    await toArray(
      concat(
        (async function* () {
          yield (function* () {
            yield 1
            yield 2
          })()
          yield (async function* () {
            yield 3
            yield 4
          })()
          yield [5]
        })()
      )
    )
  ).toEqual([1, 2, 3, 4, 5])
})
