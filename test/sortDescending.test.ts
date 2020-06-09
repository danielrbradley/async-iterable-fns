import { sortDescending, chain } from '../src/async-iterable-fns'

test('numbers', async () => {
  expect(
    await sortDescending(
      (async function* () {
        yield 21
        yield 2
        yield 18
      })()
    )
  ).toEqual([21, 18, 2])
})

test('strings', async () => {
  expect(
    await sortDescending(
      (async function* () {
        yield 'cat'
        yield 'amy'
        yield 'bob'
      })()
    )
  ).toEqual(['cat', 'bob', 'amy'])
})

test('with key selector', async () => {
  expect(
    await sortDescending(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual([
    { name: 'amy', age: 21 },
    { name: 'cat', age: 18 },
    { name: 'bob', age: 2 },
  ])
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield 'cat'
        yield 'amy'
        yield 'bob'
      })()
    ).sortDescending()
  ).toEqual(['cat', 'bob', 'amy'])
})
