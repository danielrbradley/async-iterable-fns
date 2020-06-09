import { toArray, chain, init } from '../src/async-iterable-fns'

test('constructs an array', async () => {
  async function* source() {
    yield 1
    yield 2
  }
  expect(await toArray(source())).toEqual([1, 2])
})

test('chaining', async () => {
  expect(await init(3).toArray()).toEqual([0, 1, 2])
})
