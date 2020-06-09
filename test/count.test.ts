import { count, init, length } from '../src/async-iterable-fns'

test('zero length', async () => {
  expect(await count(init({ count: 0 }))).toEqual(0)
})

test('non-zero length', async () => {
  expect(await count(init({ count: 5 }))).toEqual(5)
})

test('chaining', async () => {
  expect(await init({ count: 5 }).count()).toEqual(5)
})

describe('length alias', () => {
  test('zero length', async () => {
    expect(await length(init({ count: 0 }))).toEqual(0)
  })

  test('non-zero length', async () => {
    expect(await length(init({ count: 5 }))).toEqual(5)
  })

  test('chaining', async () => {
    expect(await init({ count: 5 }).length()).toEqual(5)
  })
})
