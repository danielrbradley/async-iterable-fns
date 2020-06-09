import { min, init } from '../src/async-iterable-fns'

test('finds min', async () => {
  expect(
    await min(
      (async function* () {
        yield 21
        yield 2
        yield 18
      })()
    )
  ).toEqual(2)
})

test('fails on empty collection', async () => {
  try {
    await min(init(0))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(`Can't find min of an empty collection`)
  }
})
