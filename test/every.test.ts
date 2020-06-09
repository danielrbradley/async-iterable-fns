import { every, chain } from '../src/async-iterable-fns'

test('matches existance', async () => {
  expect(
    await every(
      (async function* () {
        yield 2
        yield 4
      })(),
      (x) => x % 2 === 0
    )
  ).toEqual(true)
})

test('matches non-existance', async () => {
  expect(
    await every(
      (async function* () {
        yield 1
        yield 2
      })(),
      (x) => x === 2
    )
  ).toEqual(false)
})

test('passes index', async () => {
  expect(
    await every(
      (async function* () {
        yield 1
        yield 2
      })(),
      (x, index) => index < 2
    )
  ).toEqual(true)
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield 2
        yield 4
      })()
    ).every((x) => x % 2 === 0)
  ).toEqual(true)
})
