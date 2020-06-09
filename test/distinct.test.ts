import { distinct, chain, toArray } from '../src/async-iterable-fns'

test('duplicates', async () => {
  expect(
    await toArray(
      distinct(
        (async function* () {
          yield 'bob'
          yield 'cat'
          yield 'bob'
          yield 'amy'
        })()
      )
    )
  ).toEqual(['bob', 'cat', 'amy'])
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
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
