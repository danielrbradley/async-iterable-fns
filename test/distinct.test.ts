import { distinct, chain } from '../src/async-iterable-fns'

test('duplicates', () => {
  expect(
    Array.from(
      distinct(
        (function* () {
          yield 'bob'
          yield 'cat'
          yield 'bob'
          yield 'amy'
        })()
      )
    )
  ).toEqual(['bob', 'cat', 'amy'])
})

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield 'bob'
        yield 'cat'
        yield 'bob'
        yield 'amy'
      })()
    )
      .distinct()
      .toArray()
  ).toEqual(['bob', 'cat', 'amy'])
})
