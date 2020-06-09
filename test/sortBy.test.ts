import { sortBy, chain } from '../src/async-iterable-fns'

test('sorts by selected key', async () => {
  expect(
    await sortBy(
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
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })()
    ).sortBy((x) => x.age)
  ).toEqual([
    { name: 'bob', age: 2 },
    { name: 'cat', age: 18 },
    { name: 'amy', age: 21 },
  ])
})
