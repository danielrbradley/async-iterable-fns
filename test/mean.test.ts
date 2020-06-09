import { mean, init } from '../src/async-iterable-fns'

test('finds mean', async () => {
  expect(
    await mean(
      (async function* () {
        yield 21
        yield 2
        yield 18
        yield 39
      })()
    )
  ).toEqual(20)
})

test('fails on empty collection', async () => {
  try {
    await mean(init(0))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(`Can't find mean of an empty collection`)
  }
})
