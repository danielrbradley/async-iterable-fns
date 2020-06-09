import { maxBy, chain, init } from '../src/async-iterable-fns'

test('finds max age', async () => {
  expect(
    await maxBy(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual(21)
})

test('fails on empty collection', async () => {
  try {
    await maxBy(init(0), (x) => x)
    throw new Error()
  } catch (e) {
    expect(e.message).toEqual(`Can't find max of an empty collection`)
  }
})

test('chaining', async () => {
  expect(
    await chain(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })()
    ).maxBy((x) => x.age)
  ).toEqual(21)
})
