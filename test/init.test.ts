import { initRaw, init } from '../src/async-iterable-fns'

test('empty', () => {
  expect(Array.from(initRaw(0))).toEqual([])
})

test('just count', () => {
  expect(Array.from(initRaw(5))).toEqual([0, 1, 2, 3, 4])
})

test('from-to', () => {
  expect(Array.from(initRaw({ from: 1, to: 3 }))).toEqual([1, 2, 3])
})

test('from-to-same', () => {
  expect(Array.from(initRaw({ from: 1, to: 1 }))).toEqual([1])
})

test('from-to fractional-increment', () => {
  expect(Array.from(initRaw({ from: 1, to: 2, increment: 0.5 }))).toEqual([1, 1.5, 2])
})

test('from-to overshooting-increment', () => {
  expect(Array.from(initRaw({ from: 1, to: 2, increment: 5 }))).toEqual([1])
})

test('from positive to negative', () => {
  expect(Array.from(initRaw({ from: 1, to: -1 }))).toEqual([1, 0, -1])
})

test('from negative to positive', () => {
  expect(Array.from(initRaw({ from: -1, to: 1 }))).toEqual([-1, 0, 1])
})

test('from positive to negative with fractional increment', () => {
  expect(Array.from(initRaw({ from: 1, to: -1, increment: -0.5 }))).toEqual([1, 0.5, 0, -0.5, -1])
})

test('from-to zero increment fails', () => {
  expect(() => Array.from(initRaw({ from: 1, to: 2, increment: 0 }))).toThrow(
    'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
  )
})

test('from-to negative fails', () => {
  expect(() => Array.from(initRaw({ from: 1, to: 2, increment: -0.1 }))).toThrow(
    'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
  )
})

test('from-to negative crossing zero fails', () => {
  expect(() => Array.from(initRaw({ from: -1, to: 1, increment: -1 }))).toThrow(
    'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
  )
})

test('from-to reversed fails', () => {
  expect(() => Array.from(initRaw({ from: 2, to: 1, increment: 1 }))).toThrow(
    'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
  )
})

test('from-to reversed crossing zero fails', () => {
  expect(() => Array.from(initRaw({ from: 1, to: -1, increment: 0.1 }))).toThrow(
    'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
  )
})

test('count prop', () => {
  expect(Array.from(initRaw({ count: 5 }))).toEqual([0, 1, 2, 3, 4])
})

test('start-count', () => {
  expect(Array.from(initRaw({ start: 3, count: 5 }))).toEqual([3, 4, 5, 6, 7])
})

test('count-increment', () => {
  expect(Array.from(initRaw({ count: 5, increment: 3 }))).toEqual([0, 3, 6, 9, 12])
})

test('chaining', () => {
  expect(init({ from: 1, to: -1, increment: -0.5 }).toArray()).toEqual([1, 0.5, 0, -0.5, -1])
})
