import { sum } from '../src/async-iterable-fns'

test('numbers', async () => {
  expect(
    await sum(
      (async function* () {
        yield 21
        yield 2
        yield 18
      })()
    )
  ).toEqual(41)
})
