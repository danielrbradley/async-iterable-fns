import { initRaw, init, toArray } from '../src/async-iterable-fns'

test('empty', async () => {
  expect(await toArray(initRaw(0))).toEqual([])
})

test('just count', async () => {
  expect(await toArray(initRaw(5))).toEqual([0, 1, 2, 3, 4])
})

test('from-to', async () => {
  expect(await toArray(initRaw({ from: 1, to: 3 }))).toEqual([1, 2, 3])
})

test('from-to-same', async () => {
  expect(await toArray(initRaw({ from: 1, to: 1 }))).toEqual([1])
})

test('from-to fractional-increment', async () => {
  expect(await toArray(initRaw({ from: 1, to: 2, increment: 0.5 }))).toEqual([1, 1.5, 2])
})

test('from-to overshooting-increment', async () => {
  expect(await toArray(initRaw({ from: 1, to: 2, increment: 5 }))).toEqual([1])
})

test('from positive to negative', async () => {
  expect(await toArray(initRaw({ from: 1, to: -1 }))).toEqual([1, 0, -1])
})

test('from negative to positive', async () => {
  expect(await toArray(initRaw({ from: -1, to: 1 }))).toEqual([-1, 0, 1])
})

test('from positive to negative with fractional increment', async () => {
  expect(await toArray(initRaw({ from: 1, to: -1, increment: -0.5 }))).toEqual([
    1,
    0.5,
    0,
    -0.5,
    -1,
  ])
})

test('from-to zero increment fails', async () => {
  try {
    await toArray(initRaw({ from: 1, to: 2, increment: 0 }))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  }
})

test('from-to negative fails', async () => {
  try {
    await toArray(initRaw({ from: 1, to: 2, increment: -0.1 }))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  }
})

test('from-to negative crossing zero fails', async () => {
  try {
    await toArray(initRaw({ from: -1, to: 1, increment: -1 }))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  }
})

test('from-to reversed fails', async () => {
  try {
    await toArray(initRaw({ from: 2, to: 1, increment: 1 }))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  }
})

test('from-to reversed crossing zero fails', async () => {
  try {
    await toArray(initRaw({ from: 1, to: -1, increment: 0.1 }))
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  }
})

test('count prop', async () => {
  expect(await toArray(initRaw({ count: 5 }))).toEqual([0, 1, 2, 3, 4])
})

test('start-count', async () => {
  expect(await toArray(initRaw({ start: 3, count: 5 }))).toEqual([3, 4, 5, 6, 7])
})

test('count-increment', async () => {
  expect(await toArray(initRaw({ count: 5, increment: 3 }))).toEqual([0, 3, 6, 9, 12])
})

test('chaining', async () => {
  expect(await init({ from: 1, to: -1, increment: -0.5 }).toArray()).toEqual([1, 0.5, 0, -0.5, -1])
})
