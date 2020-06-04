import { sort, chain } from '../src/async-iterable-fns'

test('numbers', () => {
  expect(Array.from(sort([21, 2, 18]))).toEqual([2, 18, 21])
})

test('strings', () => {
  expect(
    Array.from(
      sort(
        (function* () {
          yield 'cat'
          yield 'amy'
          yield 'bob'
        })()
      )
    )
  ).toEqual(['amy', 'bob', 'cat'])
})

test('with key selector', () => {
  expect(
    Array.from(
      sort(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    )
  ).toEqual([
    { name: 'bob', age: 2 },
    { name: 'cat', age: 18 },
    { name: 'amy', age: 21 },
  ])
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield 'cat'
        yield 'amy'
        yield 'bob'
      })()
    )
      .sort()
      .toArray()
  ).toEqual(['amy', 'bob', 'cat'])
})
