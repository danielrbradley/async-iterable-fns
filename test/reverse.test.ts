import { reverse, init, chain } from '../src/async-iterable-fns'

test('empty iterable', async () => {
  expect(await reverse(init(0))).toEqual([])
})

test('reversal', async () => {
  expect(
    await reverse(
      (async function* () {
        yield 8
        yield 3
        yield 5
      })()
    )
  ).toEqual([5, 3, 8])
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield 8
        yield 3
        yield 5
      })()
    ).reverse()
  ).toEqual([5, 3, 8])
})
