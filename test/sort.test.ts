import { sort, chain } from '../src/async-iterable-fns'

test('numbers', async () => {
  expect(
    await sort(
      (async function* () {
        yield 21
        yield 2
        yield 18
      })()
    )
  ).toEqual([2, 18, 21])
})

test('strings', async () => {
  expect(
    await sort(
      (async function* () {
        yield 'cat'
        yield 'amy'
        yield 'bob'
      })()
    )
  ).toEqual(['amy', 'bob', 'cat'])
})

test('with key selector', async () => {
  expect(
    await sort(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual([
    { name: 'bob', age: 2 },
    { name: 'cat', age: 18 },
    { name: 'amy', age: 21 },
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
    ).sort()
  ).toEqual(['amy', 'bob', 'cat'])
})
