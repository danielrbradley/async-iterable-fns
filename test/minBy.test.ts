import { minBy, chain, init } from '../src/async-iterable-fns'

test('finds min age', async () => {
  expect(
    await minBy(
      (async function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual(2)
})

test('fails on empty collection', async () => {
  try {
    await minBy(init(0), (x) => x)
  } catch (e) {
    expect(e.message).toEqual(`Can't find min of an empty collection`)
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
    ).minBy((x) => x.age)
  ).toEqual(2)
})
