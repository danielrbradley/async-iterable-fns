import { exists, chain } from '../src/async-iterable-fns'

test('matches non-existance', async () => {
  expect(
    await exists(
      (async function* (): AsyncIterable<number> {
        yield 1
        yield 2
      })(),
      (x) => x === 3
    )
  ).toEqual(false)
})

test('matches existance', async () => {
  expect(
    await exists(
      (async function* () {
        yield 1
        yield 2
      })(),
      (x) => x === 1
    )
  ).toEqual(true)
})

test('passes index', async () => {
  expect(
    await exists(
      (async function* () {
        yield 1
        yield 2
      })(),
      (x, index) => x === 2 && index === 1
    )
  ).toEqual(true)
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* (): AsyncIterable<number> {
        yield 1
        yield 2
      })()
    ).exists((x) => x === 3)
  ).toEqual(false)
})
