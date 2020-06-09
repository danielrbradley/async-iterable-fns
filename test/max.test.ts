import { max, init } from '../src/async-iterable-fns'

test('finds max', async () => {
  expect(
    await max(
      (async function* () {
        yield 2
        yield 21
        yield 18
      })()
    )
  ).toEqual(21)
})

test('fails on empty collection', async () => {
  try {
    await max(init(0))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(`Can't find max of an empty collection`)
  }
})
